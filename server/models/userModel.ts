import * as mongoose from 'mongoose'

export const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: String,
    nickName: String,
    paymentCode: String, // 支付密码
    addressCurrentId: Number, // 地址自增的id
    addressList: [{
        name: String,
        phone: String,
        detailedAddress: String,
        completedAddress: String,
        addressTable: {
            province: {
                value: String,
                label: String,
            }, 
            city: {
                value: String,
                label: String,
            }, 
            area: {
                value: String,
                label: String,
            }
        }
    }],
    userInfo: {
        nickName: String,
        gender: Number,
        avatarUrl: String,
        tempUrl: String
    },
    goodsLikeList: Array, // 商品点赞列表
    briefLikeList: Array, // 给短评点赞
    commentLikeList: [{
        commentId: String,
        commentListId: String,
        likeState: String
    }]
}, { timestamps: true, versionKey: false })

export const emailSchema = new mongoose.Schema({
    verifyCode: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    updatedAt: { type: Date, index: { expires: 300 } }
}, { timestamps: true, versionKey: false })

export const accountSchema = new mongoose.Schema({
    userId: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    paykey: {
        type: String,
        minlength: 6,
        maxlength: 6
    }, // 支付密码
    balance: {
        type: Number,
        default: 10000,
        min: 0,
        max: 100000
    }, // 余额
    orderList: [{
        orderId: String,
        totalAmount: Number,
        paymentState: String,
        isDeleted: {
            type: Boolean,
            default: false
        }
    }],
    cartList: [{  // _id为：cardListItemId
        goodsId: String,
        goodsNum: Number, // 该商品的数量
    }],
    discountList: [{
        discountId: Number,
        discountPrice: Number, // 优惠金额
        discountRange: Object, // 适用范围
        indate: Object,  // 有效期
    }] // 优惠券列表
}, { timestamps: true, versionKey: false })