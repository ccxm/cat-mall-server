import { Request, Response, NextFunction } from 'express'
import { userSchema } from './../models/userModel'
import { createUuid } from '../public/utils'
import { ICheckFieldResponse, ILikeGoodsRes } from '../interfaces/publicInterfaces'
import { statusCode } from './../config/statusCode'
import { IUser } from '../interfaces/publicInterfaces'
import { checkCodeIsExist } from './emailController'
import { createUserInOrder } from './accountControllers'
import { ILikeComment, IUserLikeComment } from '../interfaces/commentInterfaces'
import { ILoginDoc, ILoginRes, IUserInfo, IUserInfoRes } from '../interfaces/userInterfaces'
import { likeGoods } from './goodsControllers'
import * as jwt from 'jsonwebtoken'
import * as md5 from 'md5'
import * as resFunc from './../public/resFunc'
import * as mongoose from 'mongoose'
import { config } from '../config/base'
import { _deleteFile } from './uploadControllers'
import { commentLikeState, defaultImageList } from './../config/constant'

const userModel = mongoose.model('user-infos', userSchema)

export const login = async (req: Request, res: Response, next: NextFunction) => {
    userModel.findOne(
        { email: req.body.email, password: md5(req.body.password) },
        { userId: true, email: true, userInfo: true, _id: false }
    ).then(async (doc: any) => {
        if (doc) {
            const temp: ILoginRes = {
                userId: doc.userId,
                userInfo: {
                    email: doc.email,
                    nickName: doc.userInfo.nickName,
                    gender: doc.userInfo.gender,
                    avatarUrl: doc.userInfo.avatarUrl
                },
                token: 'Bearer ' + _createToken(doc.userId)
            }
            resFunc.success(temp, res, '登录成功')
        } else {
            resFunc.appoint(statusCode.LOGIN_FAIL, res)
        }
    }).catch((err: any) => {
        next(err)
    })
    console.log(req.body)
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body.email, req.body.password)
    const isExist: boolean = await _findTheFieldIsExit('email', req.body.email, next) as boolean
    if (isExist) {
        resFunc.appoint(statusCode.EMAIL_BEEN_USED, res)
        return
    }
    if (!await checkCodeIsExist(req, next, true)) {
        resFunc.appoint(statusCode.INVALID_VERIFY_CODE, res)
        return
    }
    const userId: string = createUuid()
    const temp: IUser = {
        userId,
        email: req.body.email,
        nickName: req.body.email,
        password: md5(req.body.password),
        userInfo: {
            nickName: req.body.email,
            gender: 0,
            avatarUrl: config.DEFAULT_IMAGES_PATH + defaultImageList[Math.floor(Math.random() * 10)] + '.png',
            tempUrl: ''
        }
    }
    userModel.create(temp).then(async doc => {
        console.log(doc)
        // 创建用户的订单表
        const createUserResult: any = await createUserInOrder({
            userId,
            email: temp.email,
            balance: config.DEFAULT_BALANCE
        }, res, next)
        if (createUserResult.err) {
            return
        }
        resFunc.success({ userId }, res, '注册成功')
    }).catch(err => {
        next(err)
    })
}

// 检验某个字段是否可用
export const checkFieldCanUse = async (req: Request, res: Response, next: NextFunction) => {
    const isExist: boolean = await _findTheFieldIsExit(req.body.field, req.body.value, next) as boolean
    const temp: ICheckFieldResponse = {
        canUse: !isExist,
        field: req.body.field,
        value: req.body.value
    }
    resFunc.success(temp, res, '检查成功')
}

// 更新用户信息
export const updateUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    const temp: IUserInfo = {
        nickName: req.body.nickName,
        gender: req.body.gender,
        avatarUrl: req.body.avatarUrl,
        tempUrl: ''
    }
    const result: any = await _getAvatarUrl(req.body.userId, res, next)
    if (result.err) {
        return
    } else {
        console.log('开始删除')
        _deleteFile(result)
    }
    userModel.findOneAndUpdate(
        { userId: req.body.userId },
        { nickName: req.body.nickName, userInfo: temp },
        { new: true, fields: { _id: false, userInfo: true, email: true } }
    ).then((doc: any) => {
        console.log(doc)
        if (doc) {
            const docRes: IUserInfoRes = {
                email: doc.email,
                nickName: doc.userInfo.nickName,
                gender: doc.userInfo.gender,
                avatarUrl: doc.userInfo.avatarUrl
            }
            resFunc.success(docRes, res, '更新用户信息成功')
        } else {
            resFunc.appoint(statusCode.UPDATE_MSG_NO_EXIST, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 修改账号密码
export const modifyPassword = async (req: Request, res: Response, next: NextFunction) => {
    if (!await checkCodeIsExist(req, next, true)) {
        resFunc.appoint(statusCode.INVALID_VERIFY_CODE, res)
        return
    }
    userModel.updateOne({ email: req.body.email }, { password: md5(req.body.password) }).then(doc => {
        console.log(doc)
        resFunc.success({}, res, '密码修改成功，请重新登录')
    }).catch(err => {
        next(err)
    })
}

// 检查某个字段是否存在
export const _findTheFieldIsExit = async (field: string, value: any, next: NextFunction) => {
    return new Promise((resolve) => {
        userModel.findOne({ [field]: value }, { [field]: true, _id: false }).then((res: any) => {
            console.log(res)
            // 不存在或者是字段相等都不能使用
            if (!res || res[field] === value) {
                resolve(false)
            } else {
                resolve(true)
            }
        }).catch(err => {
            next(err)
        })
    })
}

// 检查是否已经对商品点赞
export const checkIsLiked = async (req: Request, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        userModel.findOne({ userId: req.body.userId }, { _id: false, goodsLikeList: true }).then((doc: any) => {
            if (doc) {
                const likeList: Array<string> = doc.goodsLikeList
                let condition = null, isAdd = false
                if (likeList.includes(req.body.goodsId)) {
                    condition = { $pull: { goodsLikeList: req.body.goodsId } }
                } else {
                    condition = { $push: { goodsLikeList: req.body.goodsId } }
                    isAdd = true
                }
                userModel.updateOne({ userId: req.body.userId }, condition).then(doc1 => {
                    if (doc1.n) {
                        resolve({
                            isAdd
                        })
                    } else {
                        resFunc.appoint(statusCode.UPDATE_LIKE_NULL, res)
                        resolve({
                            err: true
                        })
                    }
                }).catch(err => {
                    next(err)
                    resolve({
                        err: true
                    })
                })
            } else {
                resFunc.appoint(statusCode.FIND_LIKE_NULL, res)
                resolve({
                    err: true
                })
            }
        }).catch(err => {
            next(err)
            resolve({
                err: true
            })
        })
    })
}

// 获取点赞列表
export const getGoodsLikeList = async (req: Request, res: Response, next: NextFunction) => {
    userModel.findOne({ userId: req.body.userId }, {
        _id: false,
        goodsLikeList: true
    }).then(doc => {
        if (doc) {
            resFunc.success(doc, res, '获取商品点赞列表成功')
        } else {
            resFunc.appoint(statusCode.GET_LIKE_LIST_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 获取评论点赞列表
export const getCommentLikeList = async (req: Request, res: Response, next: NextFunction) => {
    userModel.findOne({ userId: req.body.userId }, {
        _id: false,
        commentLikeList: true
    }).then(doc => {
        if (doc) {
            resFunc.success(doc, res, '获取评论点赞列表成功')
        } else {
            resFunc.appoint(statusCode.GET_COMMENT_LIKE_LIST_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 给评论点赞
export const userLikeForComment = async (param: ILikeComment, res: Response, next: NextFunction) => {
    const result: any = await _checkCommentIsExist(param, res, next)
    console.log('是否已经点赞')
    console.log(result)
    if (result.err) {
        return
    }
    if (!result.commentLikeList) {
        return await _addComment(param, res, next)
    } else {
        return await _updateComment(param, res, next, result.commentLikeList[0])
    }
}

// 获取用户信息
export const getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        userModel.findOne({ userId: req.body.userId }, {
            _id: false,
            userInfo: true
        }).then((doc: any) => {
            if (doc) {
                resolve(doc.userInfo)
            } else {
                resFunc.appoint(statusCode.GET_USERINFO_NULL, res)
                resolve({
                    err: true
                })
            }
        }).catch(err => {
            next(err)
            resolve({
                err: true
            })
        })
    })
}

// 点赞
export const likeForGoods = (req: Request, res: Response, next: NextFunction) => {
    likeGoods(req, res, next)
}

// 更新用户头像
export const updateAvatarUrl = (avatarUrl: string, userId: string, res: Response, next: NextFunction) => {
    console.log(avatarUrl, userId)
    return new Promise(resolve => {
        userModel.findOneAndUpdate({ userId }, {
            $set: {
                'userInfo.tempUrl': avatarUrl
            }
        }, {
            fields: {
                _id: false,
                'userInfo.tempUrl': true
            }
        }).then((doc: any) => {
            console.log(doc)
            if (!doc) {
                resolve(config.RESOLVE_ERROR)
                resFunc.appoint(statusCode.UPDATE_AVATARURL_NULL, res)
                return
            } else {
                resolve(doc.userInfo)
                resFunc.success({ avatarUrl }, res, '上传头像成功')
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 新增评论
const _addComment = async (param: ILikeComment, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        userModel.updateOne({ userId: param.userId }, {
            $push: {
                commentLikeList: {
                    commentId: param.commentId,
                    commentListId: param.commentListId,
                    likeState: param.likeState
                }
            }
        }).then(doc => {
            if (doc.n) {
                resolve({
                    isUpdate: false,
                    likeState: param.likeState
                })
            } else {
                resFunc.appoint(statusCode.ADD_COMMENT_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 更新评论
const _updateComment = async (param: ILikeComment, res: Response, next: NextFunction, preLike: IUserLikeComment) => {
    console.log(param, preLike)
    if (param.likeState === preLike.likeState) {
        resFunc.appoint(statusCode.COMMENT_REPEAT_NULL, res)
        return config.RESOLVE_ERROR
    }
    return new Promise(resolve => {
        // let state = ''
        // if (param.likeState === commentLikeState.LIKE) {
        //     state = commentLikeState.UNLIKE
        // }
        // if (param.likeState === commentLikeState.UNLIKE) {
        //     state = commentLikeState.LIKE
        // }
        userModel.updateOne({ userId: param.userId, 'commentLikeList.commentListId': param.commentListId }, {
            'commentLikeList.$.likeState': param.likeState
        }).then(doc => {
            if (doc.n) {
                resolve({
                    isUpdate: true,
                    likeState: param.likeState
                })
            } else {
                resFunc.appoint(statusCode.UPDATE_USER_COMMENT_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 判断评论是否已经存在
const _checkCommentIsExist = async (param: ILikeComment, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        userModel.findOne({
            userId: param.userId,
            'commentLikeList.commentId': param.commentId,
            'commentLikeList.commentListId': param.commentListId
        }, {
            _id: false,
            commentLikeList: { $elemMatch: { commentListId: param.commentListId } }
        }).then(doc => {
            if (doc) {
                resolve(doc)
            } else {
                resolve({
                    commentLikeList: false
                })
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

const _createToken = (userId: string): string => {
    return jwt.sign({
        userId
    }, config.JWT_SERCRET, {
        expiresIn: config.JWT_EXPIRES_TIME
    })
}

const _getAvatarUrl = (userId: string, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        userModel.findOne({ userId }, {
            _id: false,
            'userInfo.avatarUrl': true
        }).then((doc: any) => {
            resolve(doc ? doc.userInfo.avatarUrl : '')
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

