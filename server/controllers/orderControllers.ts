import { Request, Response, NextFunction } from 'express'
import { orderSchema } from '../models/orderModel'
import * as IOrder from '../interfaces/orderInterfaces'
import { reduceInventory } from './goodsControllers'
import { createOrderId } from '../public/utils'
import { paymentState } from './../config/constant'
import { config } from '../config/base'
import { saveOrder, pay ,deleteTheOrder, checkPaykeyIsValid} from './accountControllers'
import { updateSaleVolume } from './goodsControllers'
import { getTheAddress } from './addressController'
import {_findTheFieldIsExit} from './userController'
import { IAccountOrderParam } from '../interfaces/accountInterfaces'
import { statusCode } from '../config/statusCode'
import * as resFunc from './../public/resFunc'
import * as mongoose from 'mongoose'

const orderModel = mongoose.model('orders', orderSchema)

/** 创建订单
 * 1、查找有没有库存
 * 2、写入订单表中
 */
export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    // const isExist: boolean = await _findTheFieldIsExit('userId', req.body.userId, next) as boolean
    // if(!isExist) {
    //     resFunc.appoint(statusCode.FIND_USER_IN_ORDER_NULL, res)
    //     return
    // }
    const param: IOrder.IReqOrderParam = req.body
    const result: any = await reduceInventory(param.orderList, res, next)
    if (result.err) {
        return
    }
    const getAddressRes: any = await getTheAddress(param.addressId, param.userId, res, next)
    if(getAddressRes.err) {
        return
    }
    let temp: Array<IOrder.IOrderListItem> = []
    let totalAmount: number = 0
    param.orderList.forEach(item => {
        result.orderList.forEach((item1: any) => {
            if (item.goodsId === item1.goodsId) {
                temp.push({
                    goodsId: item1.goodsId,
                    goodsName: item1.goodsName,
                    purchaseNum: item.purchaseNum,
                    originalPrice: item1.originalPrice,
                    totalPrice: item1.originalPrice * item.purchaseNum,
                    discountPrice: item1.discountPrice,
                    masterImg: item1.masterImg,
                    intro: item1.goodsInfo.intro
                })
                totalAmount += item1.originalPrice * item.purchaseNum
            }
        })
    })
    const orderId = createOrderId()
    const orderParam: IOrder.IOrderItem = {
        orderId,
        addressId: param.addressId,
        totalAmount,
        totalNum: temp.length,
        userId: param.userId,
        goodsList: temp,
        address: getAddressRes.address,
        paymentState: paymentState.UNPAID
    }
    orderModel.create(orderParam).then(async doc => {
        const result1: any = await saveOrder({
            orderId: orderParam.orderId,
            userId: orderParam.userId,
            totalAmount: orderParam.totalAmount,
            paymentState: orderParam.paymentState
        }, res, next)
        if (result1.err) {
            return
        }
        resFunc.success({
            orderId,
            totalAmount
        }, res, '创建订单成功，请支付')
    }).catch(err => {
        next(err)
    })
}

// 支付订单
export const payForOrder = async (req: Request, res: Response, next: NextFunction) => {
    const param: IAccountOrderParam = {
        userId: req.body.userId,
        orderId: req.body.orderId
    }
    // 检查密码是否正确
    const isKeyValid:any = await checkPaykeyIsValid({
        userId: req.body.userId,
        paykey: req.body.paykey
    }, res, next)
    if(isKeyValid.err) {
        return
    }
    const result: any = await pay(param, res, next)
    if (result.err) {
        return
    }
    // 更新销量
    const updateSaleVolumeRes: any = await updateSaleVolume(param, res, next) 
    if(updateSaleVolumeRes.err) {
        return
    }
    orderModel.updateOne({ userId: param.userId, orderId: param.orderId },{
            paymentState: paymentState.SUCCESSED
        }).then(doc => {
            if(doc.n) {
                resFunc.success(result, res, '支付成功， 欢迎下次再来')
            }else {
                resFunc.appoint(statusCode.UPDATE_PAYMENT_NULL, res)
            }
        }).catch(err => {
            next(err)
        })
}

// 获取用户的订单
export const getOrderList = async (req: Request, res: Response, next: NextFunction) => {
    const temp:IOrder.IGetOrderList = {
        userId: req.body.userId,
        currentPage: parseInt(req.body.currentPage) || 0,
        pageSize: parseInt(req.body.pagingSize) || config.ORDER_PAGE_SIZE,
    }
    orderModel.find({userId: req.body.userId, isDeleted: false}, {
        _id: false,
        userId: false,
        updatedAt: false,
        isDeleted: false
    }).sort({ createdAt: -1 })
    .skip(temp.currentPage * temp.pageSize)
    .limit(temp.pageSize).then(doc => {
        resFunc.success({orderList: doc}, res, '获取订单列表成功')
    }).catch(err => {
        next(err)
    })
}

// 删除订单
export const deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    const result:any = await deleteTheOrder({
        orderId: req.body.orderId,
        userId: req.body.userId
    }, res, next)
    if(result.err) {
        return
    }
    orderModel.updateOne({userId: req.body.userId, orderId: req.body.orderId},{isDeleted: true}).then(doc => {
        if(doc.n) {
            resFunc.success({}, res, '删除订单成功')
        }else {
            resFunc.appoint(statusCode.DELETE_ORDER_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 获取订单详情
export const getOrderDetail = async (orderId: string, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        orderModel.findOne({orderId}, {
            _id: false,
            goodsList: true
        }).then((doc: any) => {
            console.log('订单详情', doc)
            if(!doc.goodsList[0]) {
                resFunc.appoint(statusCode.ORDER_NOT_FOUND, res)
                resolve(config.RESOLVE_ERROR)
                return
            }
            resolve(doc.goodsList)
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}