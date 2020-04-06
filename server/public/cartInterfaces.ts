export interface IUpdateCart {
    userId: string
    goodsId: string
    goodsNum: number
}

export interface ICartQueryParam {
    userId: string
    goodsId: string
}

export interface IGetCartList {
    userId: string
    pageSize: number
    curPage: number
}

export interface IGetCartRes {
    listLength: number
    curPage: number
    cartList: Array<any>
}