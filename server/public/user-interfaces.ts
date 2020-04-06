export interface IUserInfo {
    nickName: string
    gender: number
    avatarUrl: string
    tempUrl?: string
}

export interface IUserInfoRes extends IUserInfo{
    email: string
}

export type ILoginDoc = {
    userId: string
    userInfo: IUserInfoRes
}

export type ILoginRes = ILoginDoc & {
    token: string
}

