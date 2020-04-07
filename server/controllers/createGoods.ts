import { goodsSchema, commentSchema, goodItem, commentItem } from '../models/goodsModel'
import { createVerifyCode, deepCopy } from '../public/utils'
import { IGoods, IComment } from '../interfaces/publicInterfaces'
import *  as mongoose from 'mongoose'

const goodsModel = mongoose.model('goods', goodsSchema)
const commentModel = mongoose.model('comments', commentSchema)
let id = 100001

const goodsNameList: string[] = ['叮当猫', '加菲猫', '波斯猫', '胖橘猫', '小奶猫', '黑猫', '白猫', '红猫', '米粒', '丑小喵']

export const createGoods = async (index: number) => {
    const goodsId: string = String(id++)
    const tempGoods: IGoods = deepCopy(goodItem)
    const tempComment: IComment = deepCopy(commentItem)
    tempGoods.goodsId = goodsId
    tempGoods.goodsName = goodsNameList[index % 10]
    const price = Math.floor(Math.random() * 2000)
    tempGoods.originalPrice = price
    tempGoods.memberPrice = price - 20
    tempGoods.discountPrice = price - 10
    tempComment.goodsId = goodsId
    goodsModel.create(tempGoods).then(res => {
        console.log(res)
        console.log('创建商品成功')
    }).catch(err => {
        console.log(err)
        console.log('创建商品失败')
    })
    commentModel.create(tempComment).then(res => {
        console.log(res)
        console.log('创建评论成功')
    }).catch(err => {
        console.log(err)
        console.log('创建评论失败')
    })
}

export const create = () => {
    for (let i = 0; i < 20; i++) {
        createGoods(i)
    }
}
