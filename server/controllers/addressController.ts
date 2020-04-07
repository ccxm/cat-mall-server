import { Request, Response, NextFunction } from 'express'
import { userSchema } from './../models/userModel'
import { autoId } from './utilControllers'
import { statusCode } from './../config/statusCode'
import { IAddAddressItem, IAddressItem } from '../interfaces/publicInterfaces'
import * as resFunc from './../public/resFunc'
import * as mongoose from 'mongoose'
import { config } from './../config/base'

const userModel = mongoose.model('user-infos', userSchema)

export const getAddress = async (req: Request, res: Response, next: NextFunction) => {
    userModel.findOne({ userId: req.body.userId }, { _id: false, addressList: true }).then(doc => {
        if (doc) {
            resFunc.success(_replaceIdToAddressId(doc), res, '获取收获地址成功')
        } else {
            resFunc.success([], res, '暂无收获地址')
        }
    }).catch(err => {
        next(err)
    })
}

export const addAddress = async (req: Request, res: Response, next: NextFunction) => {
    const addressId = await autoId(userModel, {
        query: { userId: req.body.userId },
        field: 'addressCurrentId'
    }, next)
    console.log(addressId)
    if (!addressId) {
        return
    }
    if (addressId === 'null') {
        resFunc.appoint(statusCode.ADD_ADDRESS_NULL, res)
        return
    }
    const addressItem: IAddressItem = {
        name: req.body.name,
        phone: req.body.phone,
        detailedAddress: req.body.detailedAddress,
        completedAddress: req.body.completedAddress,
        addressTable: req.body.addressTable,
        addressId: addressId as number
    }
    console.log(addressItem)
    userModel.updateOne({ userId: req.body.userId }, {
        $push: {
            addressList: addressItem
        }
    }).then(doc => {
        console.log(doc)
        if (doc.n) {
            resFunc.success({}, res, '新增收获地址成功')
        } else {
            resFunc.appoint(statusCode.ADD_ADDRESS_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
    const addressItem = req.body
    userModel.updateOne({ userId: req.body.userId, "addressList._id": mongoose.Types.ObjectId(addressItem.addressId) }, {
        $set: {
            'addressList.$.name': addressItem.name,
            'addressList.$.phone': addressItem.phone,
            'addressList.$.detailedAddress': addressItem.detailedAddress,
            'addressList.$.completedAddress': addressItem.completedAddress,
            'addressList.$.addressTable': addressItem.addressTable
        }
    }).then(doc => {
        console.log(doc)
        if (doc.n) {
            resFunc.success({}, res, '更新地址成功')
        } else {
            resFunc.appoint(statusCode.UPDATE_ADDRESS_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    userModel.updateOne({ userId: req.body.userId,"addressList._id": req.body.addressId }, {
        $pull: {
            addressList: {
                _id: mongoose.Types.ObjectId(req.body.addressId)
            }
        }
    }).then(doc => {
        console.log(doc)
        if(doc.n) {
            resFunc.success({}, res, '删除地址成功')
        }else {
            resFunc.appoint(statusCode.DELETE_ADDRESS_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 获取某一地址
export const getTheAddress = (addressId: string, userId: string, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        userModel.findOne({userId, 'addressList._id': mongoose.Types.ObjectId(addressId)}, {
            _id: false,
            addressList: {
                $elemMatch: {_id: mongoose.Types.ObjectId(addressId)}
            }
        }).then((doc: any) => {
            console.log(doc)
            if(doc) {
                resolve({
                    address: {
                        name: doc.addressList[0].name,
                        phone: doc.addressList[0].phone,
                        completedAddress: doc.addressList[0].completedAddress
                    }
                })
            }else {
                resolve(config.RESOLVE_ERROR)
                resFunc.appoint(statusCode.FIND_THE_ADDRESS_NULL, res)
            }
        }).catch(err => {
            console.error(err)
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 替换_id为addressId
const _replaceIdToAddressId = (doc:any):object => {
    return JSON.parse(JSON.stringify(doc).replace(/_id/g, 'addressId'))
}

// getTheAddress('5e34f505c1211d4128de9ac9', '154638793538').then(res => {
//     console.log(res)
// })