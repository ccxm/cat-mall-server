import { Request, Response, NextFunction } from 'express'
import { goodsSchema, commentSchema, goodItem } from '../models/goodsModel'
import { statusCode } from './../config/statusCode'
import { sortTypeList, PRICE_RANGE, SORT_TYPE } from './../config/constant'
import { IGetGoodsListParam, ILikeGoodsRes } from '../interfaces/publicInterfaces'
import { IAccountOrderParam } from '../interfaces/accountInterfaces'
import { getOrderDetail } from './orderControllers'
import { checkIsLiked } from './userController'
import { config } from './../config/base'
import * as resFunc from './../public/resFunc'
import * as mongoose from 'mongoose'

const goodsModel = mongoose.model('goods', goodsSchema)

// 获取商品列表
export const getGoodsList = async (req: Request, res: Response, next: NextFunction) => {
    const temp: IGetGoodsListParam = {
        currentPage: parseInt(req.body.currentPage) || 0,
        pagingSize: parseInt(req.body.pagingSize) || config.GOODS_PAGING_SIZE,
        sortType: SORT_TYPE[req.body.sortType],
        priceRange: req.body.priceRange
    }
    console.log(PRICE_RANGE[temp.priceRange].start, PRICE_RANGE[temp.priceRange].limit)
    goodsModel.find({
        originalPrice: {
            $gte: PRICE_RANGE[temp.priceRange].start,
            $lt: PRICE_RANGE[temp.priceRange].limit
        }
    }, {
        _id: false,
        goodsInfo: false,
        updatedAt: false,
        createdAt: false
    }).sort({ originalPrice: temp.sortType })
        .skip(temp.currentPage * temp.pagingSize)
        .limit(temp.pagingSize)
        .then(doc => {
            if (doc) {
                resFunc.success({ goodsList: doc }, res, '获取商品列表成功')
            } else {
                resFunc.success({ goodsList: [] }, res, '暂无更多商品')
            }
        }).catch(err => {
            next(err)
        })
}

// 获取商品详情
export const getGoodsDetail = async (req: Request, res: Response, next: NextFunction) => {
    goodsModel.findOne({ goodsId: req.body.goodsId }, {
        _id: false,
        goodsId: true,
        goodsName: true,
        goodsInfo: true,
        inventory: true,
        originalPrice: true,
        memberPrice: true,
        discountPrice: true,
        likeNum: true,
        saleVolume: true
    }).then(doc => {
        if (doc) {
            resFunc.success(doc, res, '获取商品详情成功')
        } else {
            resFunc.appoint(statusCode.GET_GOODS_DETAIL_NULL, res)
        }
    })
}

// 判断商品是否存在
export const checkGoodsIsExist = async (goodsId: string, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        goodsModel.findOne({ goodsId }, { _id: false, goodsId: true }).then((doc: any) => {
            if (doc) {
                resolve(doc.goodsId)
            } else {
                resFunc.appoint(statusCode.FIND_GOODSID_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 获取商品基本信息列表
export const getGoodsInfoList = async (req: Request, res: Response, next: NextFunction) => {
    goodsModel.find({ goodsId: { $in: req.body.goodsIdList } }, {
        _id: false,
        goodsId: true,
        goodsName: true,
        originalPrice: true,
        discountPrice: true,
        memberPrice: true,
        inventory: true,
        masterImg: true
    }).then(doc => {
        resFunc.success({
            goodsInfoList: doc
        }, res, '获取商品基本信息列表成功')
    }).catch(err => {
        next(err)
    })
}

// 获取商品的基本信息
export const getGoodsInfo = async (orderList: Array<Object>, res: Response, next: NextFunction) => {
    return new Promise(resolve => {
        goodsModel.find({ goodsId: { $in: _getGoodsIdList(orderList) } }, {
            _id: false,
            goodsId: true,
            goodsName: true,
            originalPrice: true,
            discountPrice: true,
            memberPrice: true,
            inventory: true,
            masterImg: true,
            'goodsInfo.intro': true
        }).then(async (doc: any) => {
            console.log(doc)
            if (doc) {
                const result: any = await _checkGoodsNumAndExist(doc, orderList, res)
                console.log(result)
                if (result.err) {
                    resolve(config.RESOLVE_ERROR)
                    return
                } else {
                    resolve({
                        goodsList: doc
                    })
                }
            } else {
                resFunc.appoint(statusCode.FIND_GOODS_INFO_NULL, res)
                resolve(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
        })
    })
}

// 减库存
export const reduceInventory = async (list: Array<Object>, res: Response, next: NextFunction) => {
    console.log(list)
    return new Promise(async resolve => {
        let temp: any = await getGoodsInfo(list, res, next)
        if (temp.err) {
            resolve(config.RESOLVE_ERROR)
            return
        }
        let arr = []
        console.log('orderList', list)
        list.forEach(item => {
            console.log(item)
            arr.push(_updateInventory(item, res, next))
        })
        Promise.all(arr).then(result => {
            console.log(result)
            resolve({
                orderList: temp.goodsList
            })
        }).catch(err => {
            console.log(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 给商品点赞
export const likeGoods = async (req: Request, res: Response, next: NextFunction) => {
    const likeState: any = await checkIsLiked(req, res, next)
    if (likeState.err) {
        return
    }
    const condition = { $inc: { likeNum: likeState.isAdd ? 1 : -1 } }
    goodsModel.findOneAndUpdate({ goodsId: req.body.goodsId }, condition, {
        new: true,
        fields: {
            _id: false,
            likeNum: true
        }
    }).then((doc: any) => {
        if (doc) {
            const temp: ILikeGoodsRes = {
                goodsId: req.body.goodsId,
                likeNum: doc.likeNum,
                likeState: likeState.isAdd
            }
            resFunc.success(temp, res, `${likeState.isAdd ? '点赞' : '取消点赞'}成功`)
        } else {
            resFunc.appoint(statusCode.UPDATE_GOODS_LIKE_NULL, res)
        }
    }).catch(err => {
        next(err)
    })
}

// 随机查询，获取更多商品记录
export const getMoreGoodsList = async (req: Request, res: Response, next: NextFunction) => {
    goodsModel.find({}, {
        _id: false,
        goodsId: true,
        goodsName: true,
        originalPrice: true,
        masterImg: true,
    }).then((doc: any) => {
        if (doc) {
            resFunc.success({
                moreGoodsList: _getRandomArr(doc, parseInt(req.body.maxLength) || config.RANDOM_LEN)
            }, res, '获取更多商品列表成功')
        } else {
            resFunc.appoint(statusCode.UNKNOWN_ERROR, res)
        }
    }).catch(err => {
        next(err)
    })
}

export const updateGoodsInfo = (goodsItem: any) => {
    goodsModel.updateOne({goodsId: goodsItem.goodsId}, {
        $set: {
            goodsName: goodsItem.goodsName,
            originalPrice: goodsItem.originalPrice,
            discountPrice: goodsItem.discountPrice,
            memberPrice: goodsItem.memberPrice,
            masterImg: goodsItem.masterImg,
            'goodsInfo.intro': goodsItem.intro,
            'goodsInfo.address': goodsItem.address,
            'goodsInfo.imgList': goodsItem.imgList
        }
    }).then(doc => {
        console.log(doc)
        if(doc.n) {
            console.log('更新成功')
        }
    }).catch(err => {
        console.log(err)
    })
}

const _getRandomArr = (arr: Array<Object>, randomLen: number): Array<Object> => {
    const temp = []
    while (temp.length < randomLen) {
        temp.push(arr[Math.floor(Math.random() * arr.length)])
    }
    return temp
}

// 获取商品id列表
const _getGoodsIdList = (orderList: Array<Object>): Array<String> => {
    let temp = []
    orderList.forEach((item: any) => {
        temp.push(item.goodsId)
    })
    return temp
}

const _checkGoodsNumAndExist = async (goodsList: Array<Object>, orderList: Array<Object>, res: Response) => {
    const goodsIdList = _getGoodsIdList(orderList)
    let errMsg = ''
    // 查找商品是否和下单的数目是否相同
    if (goodsList.length !== orderList.length) {
        orderList.forEach((item: any) => {
            if (!goodsIdList.includes(item.goodsId)) {
                errMsg += `${item.goodsId}此商品不存在；`
            }
        })
        if (errMsg) {
            resFunc.appoint(statusCode.FIND_GOODS_INFO_NULL, res, {
                detail: errMsg
            })
            return config.RESOLVE_ERROR
        }
    }
    // 查找库存是否充足
    goodsList.forEach((item: any) => {
        orderList.forEach((item1: any) => {
            if (item.inventory < item1.purchaseNum) {
                errMsg += `${item1.goodsId}库存不足`
            }
        })
    })
    if (errMsg) {
        resFunc.appoint(statusCode.INVENTORY_IS_LOWS, res, {
            detail: errMsg
        })
        return config.RESOLVE_ERROR
    } else {
        return true
    }
}

// 更新库存, 还没解决库存回滚的问题
const _updateInventory = (param: any, res: Response, next: NextFunction) => {
    console.log('goodsItem', param)
    return new Promise((resolve, reject) => {
        goodsModel.findOneAndUpdate({ goodsId: param.goodsId }, {
            $inc: {
                inventory: -1 * param.purchaseNum
            }
        }, {
            new: true, fields: { _id: false, inventory: true }
        }).then((doc: any) => {
            console.log('doc', doc)
            if (doc && doc.inventory >= 0) {
                resolve(true)
            } else {
                resFunc.appoint(statusCode.INVENTORY_IS_LOWS, res)
                reject(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            reject(config.RESOLVE_ERROR)
        })
    })
}

// 增加销量
const _addSaleVolume = (goodsList: Array<any>, res: Response, next: NextFunction) => {
    const arr: Array<any> = []
    return new Promise(resolve => {
        goodsList.forEach(item => {
            arr.push(_updateSaleVolumeInDB(item, res, next))
        })
        Promise.all(arr).then(() => {
            resolve(true)
        }).catch(err => {
            console.error(err)
            resolve(config.RESOLVE_ERROR)
        })
    })
}

// 在数据库更新销量
const _updateSaleVolumeInDB = (goodsDetail: any, res: Response, next: NextFunction) => {
    return new Promise((resolve, reject) => {
        goodsModel.updateOne({ goodsId: goodsDetail.goodsId }, {
            $inc: {
                saleVolume: goodsDetail.purchaseNum
            }
        }).then(doc => {
            if (doc.n) {
                resolve(true)
            } else {
                resFunc.appoint(statusCode.UPDATE_SALE_VOLUME_FAILD, res)
                reject(config.RESOLVE_ERROR)
            }
        }).catch(err => {
            next(err)
            reject(config.RESOLVE_ERROR)
        })
    })
}

// 更新销量
export const updateSaleVolume = async (param: IAccountOrderParam, res: Response, next: NextFunction) => {
    const result: any = await getOrderDetail(param.orderId, res, next)
    if (result.err) {
        return config.RESOLVE_ERROR
    }
    const addVolumeRes: any = await _addSaleVolume(result, res, next)
    if (addVolumeRes.err) {
        return config.RESOLVE_ERROR
    }
    return true
}


