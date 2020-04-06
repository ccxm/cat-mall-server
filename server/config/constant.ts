export enum GENDER {
    MAN,
    WOMAN
}

export const SORT_TYPE = Object.freeze({
    ASC: 1,
    DESC: -1
})

const MAX_PRICE: number = 1000000000
export const PRICE_RANGE = Object.freeze({
    ALL: {
        start: 0,
        limit: MAX_PRICE
    },
    CHEEPER: {
        start: 0,
        limit: 100
    },
    CHEEP: {
        start: 100,
        limit: 500
    },
    EXPENSIVE: {
        start: 500,
        limit: 1000
    },
    EXPENSIVER: {
        start: 1000,
        limit: MAX_PRICE
    }
})

export const paymentState = Object.freeze({
    UNPAID: 'UNPAID',
    SUCCESSED: 'SUCCESSED',
    FAILED: 'FAILED'
})

export const rechargeList = Object.freeze({
    littler: 88,
    little: 188,
    custom: 288,
    more: 588,
    evenMore: 888,
    most: 1000
})

// 评论点赞
export const commentLikeState = Object.freeze({
    LIKE: 'LIKE',
    UNLIKE: 'UNLIKE'
})

// 要检测的对象的值
export const fieldList: string[] = ['nickName', 'email']
export const genderList: number[] = [GENDER.MAN, GENDER.WOMAN]
export const priceRangeList: string[] = Object.keys(PRICE_RANGE)
export const sortTypeList: string[] = Object.keys(SORT_TYPE)
export const commentLikeStateList: string[] = Object.keys(commentLikeState)
export const rechargeKeys: string[] = Object.keys(rechargeList)
export const defaultImageList:number[] = [
    177170005439,
    948370005441,
    267570005442,
    512670005442,
    367970005442,
    994970005443,
    828470005443,
    746970005444,
    375370005444,
    597170005445,
]