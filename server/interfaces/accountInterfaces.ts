export interface IAccount {
    userId: string
    email: string
    balance: number
}

export interface IAccountOrderParam {
    userId: string
    orderId: string
}

// 检验支付密码是否正确
export interface IPayAuthParam {
    userId: string,
    paykey: string
}