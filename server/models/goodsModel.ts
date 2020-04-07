import * as mongoose from 'mongoose'
import { IGoods, IComment } from '../interfaces/publicInterfaces'

export const goodsSchema = new mongoose.Schema({
    goodsId: {
        type: String,
        unique: true
    },
    goodsName: String,
    originalPrice: Number,
    discountPrice: Number,
    memberPrice: Number,
    inventory: Number,
    masterImg: String,
    // 销量
    saleVolume: {
        type: Number,
        default: 0
    },
    goodsInfo: {
        intro: String, // 介绍
        address: String, // 原产地
        postage: Number, // 邮费
        imgList: Array, // 商品图片
        videoUrl: String, // 视频路径
    },
    likeNum: Number, // 点赞的数量
},{ timestamps: true, versionKey: false })

export const commentSchema = new mongoose.Schema({
    goodsId: {
        type: String,
        unique: true
    },
    briefList: [{
        brief: String,
        color: String,
		userIdList: Array,
        likeNum: {
            type: Number,
            default: 1
        }
    }], // 短评列表
    commentList: [{
        userId: String,
        userInfo: {
            nickName: String,
            gender: Number,
            avatarUrl: String
        },
        list: [{
            comment: String,
            likeNum: {
                type: Number,
                default: 0
            },
            unLikeNum: {
                type: Number,
                default: 0
            },
            createAt: Date
        }]
    }], // 评论列表
},{ timestamps: true, versionKey: false })

export const goodItem: IGoods = {
    goodsId: '0',
    goodsName: '短虎斑',
    originalPrice: 9900,
    discountPrice: 8888,
    memberPrice: 888,
    inventory: 100,
    saleVolume: 0,
    masterImg: 'https://img.alicdn.com/imgextra/i1/3360749321/O1CN01Bpuvdi2Ij4HxrK82f_!!3360749321.jpg',
    goodsInfo: {
        intro: '宠爱天下090 美短虎斑猫宠物猫活体美国短毛猫银虎斑纯种虎斑幼崽',
        address: '安徽淮南',
        postage: 88.88,
        imgList: [
            'https://img.alicdn.com/imgextra/i1/3360749321/O1CN01Bpuvdi2Ij4HxrK82f_!!3360749321.jpg',
            'https://img.alicdn.com/imgextra/i4/3360749321/O1CN01LZM6xU2Ij4HxKNh0a_!!0-item_pic.jpg',
            'https://img.alicdn.com/imgextra/i3/3360749321/O1CN012oXFje2Ij4HyoMZSh_!!3360749321.jpg',
            'https://img.alicdn.com/imgextra/i3/3360749321/O1CN01F2s0De2Ij4Hwd94nt_!!3360749321.jpg',
            'https://img.alicdn.com/imgextra/i1/3360749321/O1CN01cSxN9c2Ij4HooMzSo_!!3360749321.jpg'
        ],
        videoUrl: 'https://tbm-auth.alicdn.com/e99361edd833010b/VKuebnAmdQAikQN6yru/dteJk8wEoYRX5t9v68k_236214188485_sd_hq.mp4?auth_key=1577605131-0-0-2eb95a8e957af345c3b86661734e77e8'
    },
    likeNum: 0
}

export const commentItem: IComment = {
    goodsId: '1',
    briefList: [{
        userId: '183321824211',
        brief: '这只猫好好看',
        likeNum: 0,
        color: '#666666'
    }],
    commentList: []
}