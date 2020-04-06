import * as mongoose from 'mongoose'

export const orderSchema = new mongoose.Schema({
    orderId: String,
    addressId: String,
    userId: String,
    totalNum: Number,
    totalAmount: Number,
    paymentState: String,
    goodsList: [{
        // _id为：orderListItemId
        goodsId: String,
        goodsName: String,
        masterImg: String,
        unitPrice: Number,
        purchaseNum: Number, // 购买数量
        totalPrice: Number, // 总金额
        discountPrice: Number, // 优惠金额
        intro: String
    }],
    address: Object,
    isDeleted: {
        type: Boolean,
        default: false
    } 
}, { timestamps: true, versionKey: false })

// const temp: IOrderItem = {
//     userId: '1',
//     totalNum: 1,
//     list: [{  // _id为：orderListItemId
//         goodsId: 'String',
//         goodsName: 'String',
//         unitPrice: 1,
//         purchaseNum: 1, // 购买数量
//         totalPrice: 1, // 总金额
//         discountPrice: 1, // 优惠金额
//     }]
// }