import {statusCode} from '../config/statusCode'
import * as interf from './publicInterfaces'

export const successResponse:interf.IResponse = {
    code: statusCode.SUCCESS.code,
    msg: statusCode.SUCCESS.msg,
    data: {}
}

export const failResponse:interf.IResponse = {
    code: statusCode.FAIL.code,
    msg: statusCode.FAIL.msg,
    data: {}
}

export const emptyResponse:interf.IResponse = {
    code: statusCode.EMPTY_PARAM.code,
    msg: statusCode.EMPTY_PARAM.msg,
    data: {}
}

export const illegalResponse:interf.IResponse = {
    code: statusCode.ILLEGAL_VALUE.code,
    msg: statusCode.ILLEGAL_VALUE.msg,
    data: {}
}
