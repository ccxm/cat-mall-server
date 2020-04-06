import { Request, Response, NextFunction } from 'express'
import { accountSchema } from '../models/userModel'
import { IAccount, IAccountOrderParam, IPayAuthParam } from '../public/accountInterfaces'
import { ISaveOrderItem } from './../public/orderInterfaces'
import { checkCodeIsExist } from './emailController'
import { config } from '../config/base'
import { createUuid } from '../utils/utils'
import { paymentState, rechargeList } from './../config/constant'
import { statusCode } from '../config/statusCode'
import * as md5 from 'md5'
import * as resFunc from '../public/resFunc'
import * as mongoose from 'mongoose'

const accountModel = mongoose.model('accounts', accountSchema)

export const createUserInOrder = async (account: IAccount, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        accountModel.create(account).then(doc => {
            console.log(doc)
            resolve(true)
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 更新支付密码，6位数字
export const updatePaykey = async (req: Request, res: Response, next: NextFunction) => {
    if (!await checkCodeIsExist(req, next, true)) {
        resFunc.appoint(statusCode.INVALID_VERIFY_CODE, res)
        return
    }
    accountModel.updateOne({ userId: req.body.userId }, { paykey: md5(req.body.paykey) }).then(doc => {
        if (doc.n) {
            resFunc.success({}, res, '更新密码成功')
        } else {
            resFunc.appoint(statusCode.UPDATE_PAYKEY_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 保存订单
export const saveOrder = async (orderItem: ISaveOrderItem, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        accountModel.updateOne({ userId: orderItem.userId }, {
            $push: {
                orderList: {
                    orderId: orderItem.orderId,
                    totalAmount: orderItem.totalAmount,
                    paymentState: orderItem.paymentState
                }
            }
        }).then((doc: any) => {
            if (doc.n) {
                resolve(true)
            } else {
                resFunc.appoint(statusCode.SAVE_ORDER_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 检查密码是否正确
export const checkPaykeyIsValid = async (param: IPayAuthParam, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        accountModel.findOne({userId: param.userId,paykey: md5(param.paykey)}, {userId: true}).then(doc => {
            if(doc) {
                resolve(true)
            } else {
                resFunc.appoint(statusCode.PAYKEY_INVALID, res)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

export const pay = async (param: IAccountOrderParam, res: Response, next: NextFunction) => {
    return new Promise(async resolve => {
        const result: any = await _getTheOrder(param, res, next)
        if (result.err) {
            resolve(config.RESOLVE_ERROR)
            return
        }
        accountModel.findOneAndUpdate({ userId: param.userId, 'orderList.orderId': param.orderId }, {
            $inc: { balance: -1 * result.orderList.totalAmount },
            $set: {
                'orderList.$.paymentState': paymentState.SUCCESSED
            }
        }, {
            new : true, fields: {_id: false, balance: true}
        }).then(doc => {
            if (doc) {
                resolve(doc)
            }else {
                resFunc.appoint(statusCode.UPDATE_BALANCE_NULL, res)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 删除订单
export const deleteTheOrder = (param: IAccountOrderParam, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        accountModel.updateOne({userId: param.userId, 'orderList.orderId': param.orderId}, {
            $set: {'orderList.$.isDeleted': true}
        }).then(doc => {
            console.log(doc)
            if(doc.n) {
                resolve(true)
            }else {
                resFunc.appoint(statusCode.DELETE_USER_ORDER_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 充值
export const recharge = async (req: Request, res: Response, next: NextFunction) => {
    if (!await checkCodeIsExist(req, next, true)) {
        resFunc.appoint(statusCode.INVALID_VERIFY_CODE, res)
        return
    }
    const result: any = await queryBlance(req, res, next, true)
    if(result.err) {
        return
    }
    if(result.balance + rechargeList[req.body.rechargeKey] > config.MAX_BALANCE) {
        resFunc.appoint(statusCode.BEYOND_MAX_BALANCE, res)
        return
    }
    accountModel.findOneAndUpdate({userId: req.body.userId}, {
        $inc: {
            balance: rechargeList[req.body.rechargeKey]
        }
    }, {
        new: true,
        fields: {
            _id: false,
            balance: true
        }
    }).then((doc: any) => {
        if(doc) {
            resFunc.success(doc, res, '充值成功')
        }else {
            resFunc.appoint(statusCode.RECHARGE_NULL, res)
        }
    }).catch(err => {
        console.error(err)
        next(err)
    })
}

// 获取充值列表
export const getRechargeList = (req: Request, res: Response, next: NextFunction) => {
    resFunc.success({rechargeList}, res, '获取充值列表成功')
}

export const _getTheOrder = (param: IAccountOrderParam, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        accountModel.aggregate([
            { $match: { userId: param.userId } },
            { $unwind: '$orderList' },
            { $match: { 'orderList.orderId': param.orderId } },
            { $project: { _id: false, orderList: true, balance: true } },
            // {$group: {_id:"$_id",balance: '$balance',order: {$push: '$orderList'}}}
        ]).then((doc: any) => {
            console.log(doc[0])
            if (!doc[0]) {
                resFunc.appoint(statusCode.FIND_ORDER_NULL, res)
                resolve(config.RESOLVE_ERROR)
                return
            }
            // 如果不是未支付状态，则不能支付
            if (doc[0].orderList.paymentState !== paymentState.UNPAID || doc[0].orderList.isDeleted) {
                resFunc.appoint(statusCode.ORDER_STATE_HAS_PAID, res)
                resolve(config.RESOLVE_ERROR)
                return
            }
            // 如果余额不足， 则提示余额不足
            if (doc[0].balance < doc[0].orderList.totalAmount) {
                resFunc.appoint(statusCode.BALANCE_IS_LESS, res)
                resolve(config.RESOLVE_ERROR)
                return
            }
            resolve(doc[0])
        }).catch(err => {
            // next(err)
            console.log(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 查询余额
export const queryBlance = (req: Request, res: Response, next: NextFunction, queryOnly:boolean = false) => {
    return new Promise(resolve => {
        accountModel.findOne({userId: req.body.userId}, {_id: false, balance: true}).then((doc:any) => {
            if(doc) {
                if(!queryOnly) {
                    resFunc.success(doc, res, '查询余额成功')
                    return
                }
                resolve(doc)
            }else {
                resFunc.appoint(statusCode.BALANCE_NOT_FOUND, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 检查是否已经设置了支付密码
export const checkIsSetPayKey = (req: Request, res: Response, next: NextFunction) => {
    accountModel.findOne({userId: req.body.userId}, {
        _id: false,
        paykey: true
    }).then((doc: any) => {
        resFunc.success({hasPaykey: doc.paykey ? true : false}, res, '检查支付密码成功')
    }).catch(err => {
        console.error(err)
        next(err)
    })
}