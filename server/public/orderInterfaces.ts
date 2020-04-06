export interface IOrderListItem {
    goodsId: string
    goodsName: string
    masterImg: String
    originalPrice: number
    purchaseNum: number // 购买数量
    totalPrice: number // 总金额
    discountPrice: number // 优惠金额
    intro: string
}

// export interface IOrderItem {
//     userId: String,
//     totalNum: Number,
//     list: Array<IOrderListItem>
// }

export interface IReqOrderListItem {
    goodsId: string,
    purchaseNum: number
}

export interface IReqOrderParam {
    userId: string
    addressId: string
    orderList: Array<IReqOrderListItem>
}

export interface IOrderItem {
    orderId: string
    addressId: string
    paymentState: string
    userId: string
    totalNum: number
    totalAmount: number
    address: object
    goodsList: Array<IOrderListItem>
}

// 保存订单的接口
export interface ISaveOrderItem {
    userId: string,
    orderId: string,
    totalAmount: number,
    paymentState: string
}

export interface IGetOrderList {
    userId: string
    currentPage: number
    pageSize: number
}