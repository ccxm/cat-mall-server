import { Request, Response, NextFunction } from 'express'
import { getUserInfo, userLikeForComment } from './userController'
import { commentSchema } from '../models/goodsModel'
import { statusCode } from './../config/statusCode'
import { IUpdateCommentParam, IBriefItem, IError } from '../interfaces/publicInterfaces'
import { IGetComment, IGetCommentRes, ILikeComment, ICommentNum } from '../interfaces/commentInterfaces'
import { config } from './../config/base'
import { commentLikeState } from './../config/constant'
import * as resFunc from './../public/resFunc'
import * as mongoose from 'mongoose'

const commentModel = mongoose.model('comments', commentSchema)

// 写短评
export const writeBrief = async (req: Request, res: Response, next: NextFunction) => {
    const temp: IBriefItem = {
        userId: req.body.userId,
        brief: req.body.brief,
        color: req.body.color
    }
    const result: any = await _checkBriefIsExist(req, res, next)
    if (result.err) {
        return
    }
    let condition = {}, query = {}
    if (result) {
        query = { goodsId: req.body.goodsId, 'briefList.brief': temp.brief }
        condition = {
            $inc: { 'briefList.$.likeNum': 1 },
            $set: { 'briefList.$.color': temp.color },
            $addToSet: { 'briefList.$.userIdList': temp.userId }
        }
    } else {
        query = { goodsId: req.body.goodsId }
        condition = {
            $push: {
                briefList: {
                    brief: temp.brief,
                    color: temp.color,
                    userIdList: [temp.userId]
                }
            }
        }
    }
    commentModel.findOneAndUpdate(query, condition, {
        new: true, fields: {
            _id: false,
            'briefList.userIdList': false,
            // 'briefList._id': false,
            briefList: { $elemMatch: { brief: temp.brief } },
        }
    }).then((doc: any) => {
        if (doc) {
            const briefItem = doc.briefList[0]
            resFunc.success({
                briefItem: JSON.parse(JSON.stringify(briefItem).replace(/_id/g, 'briefId'))
            }, res, '发表短评成功')
        } else {
            resFunc.appoint(statusCode.WRITE_BRIEF_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 获取短评列表
export const getBriefList = async (req: Request, res: Response, next: NextFunction) => {
    commentModel.findOne({ goodsId: req.body.goodsId }, {
        _id: false,
        'briefList.userIdList': false,
        commentList: false,
        goodsId: false,
        createdAt: false,
        updatedAt: false
    }).then(doc => {
        if (doc) {
            let str: string = JSON.stringify(doc)
            str = str.replace(/_id/g, 'briefId')
            resFunc.success(JSON.parse(str), res, '获取短评列表成功')
        } else {
            resFunc.appoint(statusCode.FIND_BRIEF_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 查找短评是否存在
export const _checkBriefIsExist = (req: Request, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        // console.log(param)
        commentModel.findOne({ goodsId: req.body.goodsId, 'briefList.brief': req.body.brief }, {
            _id: false,
            goodsId: true
        }).then(doc => {
            console.log(doc)
            if (doc) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 给短评点赞
export const likeOnBrief = async (req: Request, res: Response, next: NextFunction) => {
    commentModel.findOneAndUpdate({
        goodsId: req.body.goodsId,
        'briefList._id': mongoose.Types.ObjectId(req.body.briefId)
    }, {
        $inc: {
            'briefList.$.likeNum': 1
        }
    }, {
        new: true, fields: {
            _id: false,
            'briefList.userIdList': false,
            // 'briefList.brief': false,
            briefList: { $elemMatch: { _id: mongoose.Types.ObjectId(req.body.briefId) } },
        }
    }).then((doc: any) => {
        if (doc) {
            let temp = JSON.parse(JSON.stringify(doc).replace(/_id/g, 'briefId'))
            resFunc.success({
                briefItem: temp.briefList[0]
            }, res, '给短评点赞成功')
        }
    }).catch(err => {
        next(err)
    })
}

// 写评论
export const writeComment = async (req: Request, res: Response, next: NextFunction) => {
    // 判断是否已经评论过
    const isCommented: any = await _checkIsCommented(req, next)
    if (isCommented.err) {
        return
    }
    let userInfo: any, condition: object
    const updateParam: IUpdateCommentParam = {
        goodsId: req.body.goodsId,
        userId: req.body.userId,
        rate: req.body.rate,
        commentListItem: {
            comment: req.body.comment,
            createAt: Date.now()
        }
    }
    // 如果还未评论，则先获取头像
    if (!isCommented) {
        userInfo = await getUserInfo(req, res, next)
        if (userInfo.err) {
            return
        }
        updateParam.userInfo = userInfo
        _createNewComment(updateParam, res, next)
    } else {
        // 已经评论过，则追加评论
        _addNewComment(updateParam, res, next)
    }
}

// 获取评论列表
export const getCommentList = (req: Request, res: Response, next: NextFunction) => {
    const param: IGetComment = {
        goodsId: req.body.goodsId,
        pageSize: parseInt(req.body.pageSize) || config.COMMENT_PAGE_SIZE,
        curPage: parseInt(req.body.curPage) || config.DEFAULT_PAGE
    }
    commentModel.aggregate([
        { $match: { goodsId: req.body.goodsId } },
        // {$project: {'commentList.commentId': '$commentList._id'}},
        {
            $project: {
                _id: false, commentList: { $slice: ['$commentList', param.curPage * param.pageSize, param.pageSize] },
                listLength: { $size: '$commentList' }
            }
        },
        // {$unwind: '$commentList'},
        { $project: { 'commentList.userId': false } },
        // {$project: {commentList: true}}
    ]).then((doc: any) => {
        console.log(doc)
        const temp: IGetCommentRes = {
            totalCommentNum: doc[0].listLength,
            curPage: param.curPage,
            commentList: _modifyKey(doc[0].commentList)
        }
        resFunc.success(temp, res, '获取评论列表成功')
    }).catch(err => {
        next(err)
    })
}

// 给评论点赞
export const likeForComment = async (req: Request, res: Response, next: NextFunction) => {
    const param: ILikeComment = {
        goodsId: req.body.goodsId,
        commentId: req.body.commentId,
        commentListId: req.body.commentListId,
        likeState: req.body.likeState,
        userId: req.body.userId
    }
    const result: any = await _checkCommentIsExist(param, res, next)
    if (result.err) {
        return
    }
    const userLikeResult: any = await userLikeForComment(param, res, next)
    if (userLikeResult.err) {
        return
    }
    let condition = {}
    if (!userLikeResult.isUpdate) {
        if (userLikeResult.likeState === commentLikeState.LIKE) {
            condition = { $inc: { 'commentList.$[a].list.$[b].likeNum': 1 } }
            result.likeNum++
        } else {
            condition = { $inc: { 'commentList.$[a].list.$[b].unLikeNum': 1 } }
            result.unLikeNum++
        }
    } else {
        if (userLikeResult.likeState === commentLikeState.LIKE) {
            condition = {
                $inc: {
                    'commentList.$[a].list.$[b].likeNum': 1,
                    'commentList.$[a].list.$[b].unLikeNum': -1
                }
            }
            result.likeNum++
            result.unLikeNum--
        } else {
            condition = {
                $inc: {
                    'commentList.$[a].list.$[b].likeNum': -1,
                    'commentList.$[a].list.$[b].unLikeNum': 1
                }
            }
            result.likeNum--
            result.unLikeNum++
        }
    }
    commentModel.updateOne({
        goodsId: param.goodsId,
        'commentList._id': param.commentId,
        'commentList.list._id': param.commentListId
    }, condition, {
        arrayFilters: [{
            "a._id": param.commentId
        }, {
            'b._id': param.commentListId
        }]
    }).then(doc => {
        console.log(doc)
        resFunc.success({
            goodsId: param.goodsId,
            ...result
        }, res, '给评论点赞成功')
    }).catch(err => {
        next(err)
    })
}

// 检查评论是否存在
const _checkCommentIsExist = (param: ILikeComment, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        commentModel.aggregate([
            { $match: { goodsId: param.goodsId } },
            { $unwind: '$commentList' },
            { $unwind: '$commentList.list' },
            {
                $match: {
                    'commentList._id': mongoose.Types.ObjectId(param.commentId),
                    'commentList.list._id': mongoose.Types.ObjectId(param.commentListId),
                }
            },
            { $project: { _id: false, 'commentList.list.likeNum': true, 'commentList.list.unLikeNum': true } },
        ]).then(doc => {
            console.log(doc)
            if (doc[0].commentList) {
                resolve(doc[0].commentList.list)
            } else {
                resFunc.appoint(statusCode.FIND_COMMENT_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 修改评论的key，将_id换成commentId和commentListId
const _modifyKey = (arr: Array<any>) => {
    arr.forEach(item => {
        item['commentId'] = item._id
        delete item['_id']
    })
    let str = JSON.stringify(arr).replace(/_id/g, 'commentListId')
    return JSON.parse(str)
}

const _createNewComment = async (param: IUpdateCommentParam, res: Response, next: NextFunction) => {
    commentModel.updateOne({ goodsId: param.goodsId }, {
        $push: {
            commentList: {
                $each: [{
                    userId: param.userId,
                    userInfo: param.userInfo,
                    rate: param.rate,
                    list: [param.commentListItem]
                }],
                $position: 0
            }
        }
    }).then(doc => {
        console.log(doc)
        if (doc.n) {
            resFunc.success({}, res, '评论成功')
        } else {
            resFunc.appoint(statusCode.WRITE_COMMENT_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

const _addNewComment = async (param: IUpdateCommentParam, res: Response, next: NextFunction) => {
    commentModel.updateOne({ goodsId: param.goodsId, 'commentList.userId': param.userId }, {
        $push: {
            'commentList.$.list': {
                $each: [param.commentListItem],
                $position: 0
            }
        },
        $set: {
            'commentList.$.rate': param.rate
        }
    }).then(doc => {
        console.log(doc)
        if (doc.n) {
            resFunc.success({}, res, '评论成功')
        } else {
            resFunc.appoint(statusCode.WRITE_COMMENT_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 检查是否已经评论
const _checkIsCommented = (req: Request, next: NextFunction) => {
    return new Promise(resolve => {
        commentModel.findOne({ goodsId: req.body.goodsId, 'commentList.userId': req.body.userId }, {
            _id: false,
            userId: true
        }).then((doc: any) => {
            console.log(doc)
            if (doc) {
                resolve(true)
            } else {
                resolve(false)
            }
        }).catch(err => {
            next(err)
            resolve({
                err: true
            })
        })
    })
}