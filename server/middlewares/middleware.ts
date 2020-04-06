import { Request, Response, NextFunction } from 'express'
import { config } from './../config/base'
import { rules } from './../public/rules'
import { IParamsCheckRes } from './../public/interfaces'
import { appoint } from './../public/resFunc'
import { statusCode } from './../config/statusCode'
import { IReqToken } from './../public/interfaces'
import * as jwt from 'jsonwebtoken'

// 解析请求参数，所有参数都在params里拿到
export const parseReqParam = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'GET') {
        req.body = req.query
    }
    req.body.userId = _decodeToken(req)
    console.log(req.method)
    console.log(req.path)
    if (req.method !== 'OPTIONS') {
        console.log(req.body)
        next()
    } else {
        res.end('')
    }
}

// 通过规则检验参数，如判断请求参数不能为空
export const testWithRules = (req: Request, res: Response, next: NextFunction): void => {
    const reqObj = req.body,
        testObj = _getTestObj(req)
    // console.log(testObj)
    const detail: string = _checkParamIsEmpty(reqObj, testObj).result
    // console.log(detail)
    // 如果校验结果为空，则说明该值存在
    if (!detail) {
        next()
    } else {
        console.log(detail)
        appoint(statusCode.EMPTY_PARAM, res, {
            detail: detail
        })
    }
}

const _checkParamIsEmpty = (reqObj: object, testObj: object): IParamsCheckRes => {
    let emptyResultStr: string = ''  // 检验结果
    let illegalResultStr: string = ''
    // 第一层检验，判断是否为空
    for (let key in testObj) {
        if (testObj[key] === 'optional' && !reqObj[key]) {
            continue
        }
        // '' 判断值是否为空
        if (!reqObj[key] && (typeof reqObj[key] !== 'number' && typeof reqObj[key] !== 'boolean')) {
            emptyResultStr += key + config.EMPTY_PARAM_TIP + '；'
            continue
        }
        if (Object.prototype.toString.call(testObj[key]) === '[object Array]'
            && Object.prototype.toString.call(testObj[key][0]) === '[object Object]') {
            reqObj[key].forEach((item: any) => {
                const temp: IParamsCheckRes = _checkParamIsEmpty(item, testObj[key][0])
                emptyResultStr += temp.emptyResultStr
                illegalResultStr += temp.illegalResultStr
            })
            continue
        }
        // [] 判断是否满足该值
        if (testObj[key] && reqObj[key] && Object.prototype.toString.call(testObj[key]) === '[object Array]') {
            illegalResultStr += _checkIsAccordWithCustom(reqObj[key], testObj[key], key)
            continue
        }
        // () 判断是否符合函数里面的值
        if (Object.prototype.toString.call(testObj[key]) === '[object Function]') {
            illegalResultStr += testObj[key](reqObj[key], key)
            continue
        }
        // {} 递归判断里面的值
        if (Object.prototype.toString.call(testObj[key]) === '[object Object]') {
            const temp: IParamsCheckRes = _checkParamIsEmpty(reqObj[key], testObj[key])
            emptyResultStr += temp.emptyResultStr
            illegalResultStr += temp.illegalResultStr
        }
    }
    return {
        emptyResultStr,
        illegalResultStr,
        result: emptyResultStr + illegalResultStr
    }
}

// 用自定义规则检验
const _checkIsAccordWithCustom = (reqObj: any, testObj: any, key: string): string => {
    let resultStr: string = ''  // 检验结果
    if (Object.prototype.toString.call(testObj) === '[object Array]') {
        if (!testObj.includes(reqObj)) {
            resultStr = `${key}=${reqObj}此值不合法；`
        }
    }
    return resultStr
}

// 合成restful的地址，如address的，在地址前面加上http动词
const _getTestObj = (req: Request): object => {
    if(req.path in rules) {
        return rules[req.path]
    }
    const lastIndex = req.path.lastIndexOf('/')  // 找出最后一个/的位置，以便插入谓语动词
    let path = req.path
    path = path.substring(0, lastIndex + 1) + req.method.toLowerCase() + '-' + path.substring(lastIndex + 1)
    return rules[path] || {}
}

export const _decodeToken = (req: Request): string => {
    if(req.headers.authorization) {
        console.log(req.headers.authorization)
        console.log(jwt.decode(req.headers.authorization.replace('Bearer ', '')))
        const temp:IReqToken = jwt.decode(req.headers.authorization.replace('Bearer ', '')) as IReqToken
        return temp.userId
    }
    return ''
}
