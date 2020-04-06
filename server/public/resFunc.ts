import {statusCode} from '../config/statusCode'
import * as interf from './interfaces'
import {Request, Response, NextFunction} from 'express'

export const success = (data: object, res: Response, msg?:string):void => {
    const temp:interf.IResponse = {
        code: statusCode.SUCCESS.code,
        msg: msg || statusCode.SUCCESS.msg,
        data
    }
    res.json(temp)
}

// 回复指定内容
export const appoint = (target: any,res: Response, data:object = {}):void => {
    const temp:interf.IResponse = {
        code: target.code,
        msg: target.msg,
        data
    }
    res.json(temp)
}