import { register } from "server/controllers/userController"
const YEAR = new Date().getFullYear()

// 生成用户id
export const createUuid = (len: number = 12): string => {
    const timestamp: string = new Date().valueOf().toString()
    const MAX_LENGTH: number = len - 8
    let uuid: number[] = [], temp: string = ''
    for (let i = 0; i < MAX_LENGTH; i++) {
        uuid[i] = Math.floor(Math.random() * 10)
    }
    temp = uuid.join('')
    temp += timestamp.substring(5,timestamp.length)
    return temp
}

// 生成订单id
export const createOrderId = (): string => {
    return YEAR + createUuid()
}

// 生成6位验证码
export const createVerifyCode = (len:number = 6): number => {
    let str:string = ''
    for(let i = 0;i < len;i++) {
        if(!i) {
            str += Math.ceil(Math.random() * 9)
        }else {
            str += Math.floor(Math.random() * 10)
        }
    }
    return parseInt(str)
}

// 验证邮箱
export const testEmail = (email: string, key?:string): string => {
    const reg: RegExp = /[\w]+(\.[\w]+)*@[\w]+(\.[\w])+/
    if (reg.test(email)) {
        return ''
    } else {
        return '邮箱格式不正确；'
    }
}

// 验证密码
export const testPassword = (password: string,key?:string): string => {
    const reg: RegExp = /^(\w){6,20}$/
    if (reg.test(password)) {
        return ''
    } else {
        return '密码格式不正确；'
    }
}

// 验证验证码
export const testVerifyCode = (verifyCode: string,key?:string): string => {
    const reg: RegExp = /^[0-9]{6}$/
    if (reg.test(verifyCode)) {
        return ''
    } else {
        return `${key}格式不正确；`
    }
}

// 验证地址id，必须为整型
export const testAddressId = (addressId:any,key?:string): string => {
    if(typeof addressId === 'number' && addressId > 0) {
        return ''
    } else {
        return `${key}格式不正确；`
    }
}

// 验证数据库的_id
export const test_id = (_id: string, key?: string): string => {
    const reg:RegExp = /^[0-9a-fA-F]{24}$/
    if(reg.test(_id)) {
        return ''
    } else {
        return `${key}格式不正确，必须为16进制的24位字符串；`
    }
}

// 验证颜色
export const test_color = (color: string, key?: string): string => {
    const reg:RegExp = /^\#[0-9a-fA-F]{6}$/
    if(reg.test(color)) {
        return ''
    }else {
        return `${key}格式不正确，必须为16进制的颜色代码；`
    }
}

// 颜色评论的星星
export const test_rate = (rate: number, key?: string): string => {
    const reg:RegExp = /^[1-5]{1}$/
    if(reg.test(String(rate))) {
        return ''
    }else {
        return `${key}格式不正确，必须为1~5的整数；`
    }
}

// 验证参数是否为数字
export const testNumber = (param:any, key?:string):string => {
    // 如果一个数转成整型后与原来相等，则也为整型
    if(typeof param === 'number' && param === Math.floor(param)) {
        return ''
    } else {
        return `${key}必须为整型；`
    }
}

// 拼接验证码
export const jointVerifyCode = (code: string): string => {
    return `${code}`
}

// 深拷贝
export const deepCopy = (obj: object) => JSON.parse(JSON.stringify(obj))
