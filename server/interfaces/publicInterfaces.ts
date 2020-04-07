export interface IResponse {
    code: number
    msg: string
    data: object
}

// 检查某个字段是否可用
export interface ICheckField {
    field: String
    value: String
}

// 检查某个字段是否可用的返回值
export interface ICheckFieldResponse extends ICheckField {
    canUse: Boolean
}

// 详细信息
export interface userInfo {
    nickName: string
    gender: number
    avatarUrl: string
    tempUrl: string
}

export interface IUser {
    userId: string
    email: string
    password?: string
    nickName?: string
    paymentCode?: string // 支付密码
    address?: Array<Object>
    userInfo?: userInfo
}

export interface IEmail {
    verifyCode: string
    email: string
}

export interface IGoods {
    goodsId: string
    goodsName: string
    originalPrice: number
    discountPrice: number
    memberPrice: number
    goodsInfo: IGoodsInfo
    likeNum: number
    inventory: number
    saleVolume: number
    masterImg: string
}

export interface IGoodsInfo {
    intro: string,
    address: string,
    postage: number,
    imgList: Array<string>,
    videoUrl: string
}

export interface IBriefItem {
    userId: string
    brief: string
    color: string
    likeNum?: number
}

// 个人评论列表的每一项
export interface ICommentListItem {
    comment: string
    likeNum?: number
    unlikeNum?: number
    createAt: number
}

// 评论的每一项
export interface ICommentItem {
    userId: string
    userInfo: userInfo
    list: Array<ICommentListItem>
}

export interface IComment {
    goodsId: string
    briefList: Array<IBriefItem>,
    commentList: Array<ICommentItem>
}

// 参数校验的返回值
export interface IParamsCheckRes {
    emptyResultStr: string
    illegalResultStr: string
    result: string
}

// 自增id传入的值
export interface IAutoIdParam {
    query: object
    field: string
}

// 新增地址项
export interface IAddAddressItem {
    name: string,
    phone: string,
    detailedAddress: string,
    completedAddress: string,
    addressTable: {
        province: {
            value: string,
            label: string,
        },
        city: {
            value: string,
            label: string,
        },
        area: {
            value: string,
            label: string,
        }
    }
}

// 地址项
export interface IAddressItem extends IAddAddressItem {
    addressId: Number
}

/**************商品接口****************/
export interface IGetGoodsListParam {
    priceRange: string,
    currentPage: number,
    pagingSize: number,
    sortType: string
}

export interface ILikeGoodsRes {
    goodsId: string
    likeNum: number
    likeState: boolean // 点赞状态，true:点赞，false:取消点赞
}

export interface IUpdateCommentParam {
    goodsId: string
    userId: string
    rate: number
    userInfo?: object
    commentListItem: ICommentListItem
}

export interface IError {
    err: boolean
}

export interface IReqToken {
    userId: string
    iat: number
    exp: number
}