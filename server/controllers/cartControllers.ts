import { Request, Response, NextFunction } from 'express'
import { accountSchema } from '../models/userModel'
import { config } from '../config/base'
import { IUpdateCart, ICartQueryParam, IGetCartList, IGetCartRes } from './../public/cartInterfaces'
import { checkGoodsIsExist } from './goodsControllers'
import { statusCode } from '../config/statusCode'
import * as resFunc from '../public/resFunc'
import * as mongoose from 'mongoose'

const accountModel = mongoose.model('accounts', accountSchema)

export const getCartList = (req: Request, res: Response, next: NextFunction) => {
    const param: IGetCartList = {
        userId: req.body.userId,
        pageSize: parseInt(req.body.pageSize) || config.CART_PAGEING_SIZE,
        curPage: parseInt(req.body.curPage) || config.DEFAULT_PAGE
    }
    accountModel.aggregate([
        { $match: { userId: param.userId } },
        {
            $project: {
                _id: false, cartList: { $slice: ['$cartList', param.curPage * param.pageSize, param.pageSize] },
                listLength: { $size: '$cartList' }
            }
        },
        // {$unwind: '$cartList'},
        { $project: { _id: false, 'cartList._id': false } },
        // {$group: {_id:"$_id",cartList: {$push: '$cartList'}}},
        // {$project: {cartList: true, listLength: {$size: '$cartList'}}},
        // {$group: '$cartList'}
    ]).then((doc: any) => {
        console.log(doc)
        const temp:IGetCartRes = {
            listLength: doc[0].listLength,
            curPage: param.curPage,
            cartList: doc[0].cartList
        }
        resFunc.success(temp, res, '获取购物车列表成功')
    }).catch(err => {
        next(err)
    })
}

export const getCartLength = (req: Request, res: Response, next: NextFunction) => {
    accountModel.aggregate([
        {$match: {userId: req.body.userId}},
        {$project: {_id: false, cartLength: {$size: '$cartList'}}}
    ]).then((doc: any) => {
        resFunc.success({cartLength: doc[0].cartLength}, res, '获取购物车长度成功')
    }).catch(err => {
        next(err)
    })
}

export const updateCart = (req: Request, res: Response, next: NextFunction) => {
    _operateCart(req, false, res, next)
}

export const addToCart = (req: Request, res: Response, next: NextFunction) => {
    const param: ICartQueryParam = {
        goodsId: req.body.goodsId,
        userId: req.body.userId
    }
    accountModel.findOne({ userId: param.userId, 'cartList.goodsId': param.goodsId }, {
        _id: false,
        userId: true,
        cartList: true
    }).then(doc => {
        console.log(doc)
        if (doc) {
            _operateCart(req, false, res, next)
        } else {
            _operateCart(req, true, res, next)
        }
    }).catch(err => {
        next(err)
    })
}

export const deleteCart = (req: Request, res: Response, next: NextFunction) => {
    accountModel.updateOne({ userId: req.body.userId }, {
        $pull: {
            cartList: {
                goodsId: req.body.goodsId
            }
        }
    }).then(doc => {
        if (doc.n) {
            resFunc.success({}, res, '删除购物车成功')
        } else {
            resFunc.appoint(statusCode.DELETE_GOODS_IN_CART_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

const _operateCart = async (req: Request, isAdd: boolean, res: Response, next: NextFunction) => {
    const result: any = await checkGoodsIsExist(req.body.goodsId, res, next)
    if (result.err) {
        return
    }
    const opearteFunc = isAdd ? _add : _update
    opearteFunc(req, res, next).then(doc => {
        console.log(doc)
        if (doc.n) {
            resFunc.success({}, res, isAdd ? '加入购物车成功' : '更新购物车成功')
        } else {
            resFunc.appoint(isAdd ? statusCode.ADD_CARTLIST_NULL : statusCode.UPDATE_CARTLIST_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

const _add = (req: Request, res: Response, next: NextFunction) => {
    const param: IUpdateCart = {
        userId: req.body.userId,
        goodsId: req.body.goodsId,
        goodsNum: req.body.goodsNum
    }
    return accountModel.updateOne({ userId: param.userId }, {
        $push: {
            cartList: {
                goodsId: param.goodsId,
                goodsNum: param.goodsNum
            }
        }
    })
}

const _update = (req: Request, res: Response, next: NextFunction) => {
    const param: IUpdateCart = {
        userId: req.body.userId,
        goodsId: req.body.goodsId,
        goodsNum: req.body.goodsNum
    }
    return accountModel.updateOne({ userId: param.userId, 'cartList.goodsId': param.goodsId }, {
        $set: {
            'cartList.$.goodsNum': param.goodsNum
        }
    })
}