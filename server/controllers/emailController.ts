import { Request, Response, NextFunction } from 'express'
import { emailSchema } from '../models/userModel'
import { IEmail} from '../interfaces/publicInterfaces'
import { createVerifyCode, jointVerifyCode, deepCopy } from '../public/utils'
import { config } from '../config/base'
import * as nodemailer from 'nodemailer'
import * as md5 from 'md5'
import * as resFunc from './../public/resFunc'
import * as mongoose from 'mongoose'

const emailModel:mongoose.Model<mongoose.Document, {}> = mongoose.model('emails', emailSchema)
const transport = nodemailer.createTransport(config.EMAIL_TRANSPORT)

export const getVerifyCode = async (req: Request, res: Response, next: NextFunction) => {
    let emailRes: IEmail = {
        email: '',
        verifyCode: ''
    }
    // 先删除旧的验证码，然后生成新想验证码
    if(!await _delVerifyCode(req, next)) {
        return
    }
    const verifyCode: string = String(createVerifyCode())
    const temp: IEmail = {
        verifyCode: md5(verifyCode),
        email: req.body.email
    }
    emailModel.create(temp).then(async doc => {
        console.log(doc)
        emailRes.email = temp.email
        emailRes.verifyCode = verifyCode
        if (!await _sendMail(emailRes, next)) {
            return
        }
        resFunc.success({}, res, '验证码发送成功')
    }).catch(err => {
        next(err)
    })
}

export const checkVerifyCode = async (req: Request, res: Response, next: NextFunction) => {
    return await checkCodeIsExist(req, next, true)
}

const _sendMail = async (emailRes: IEmail, next: NextFunction) => {
    return new Promise(resolve => {
        const mailOptions = deepCopy(config.EMAIL_OPTIONS)
        // mailOptions.text = jointVerifyCode(emailRes.verifyCode)
        mailOptions.to = emailRes.email
        mailOptions.text = jointVerifyCode(emailRes.verifyCode)
        console.log(mailOptions)
        transport.sendMail(mailOptions).then(res => {
            resolve(true)
        }).catch(err => {
            next(err)
            resolve(false)
        })
    })
}

/**
 * @param isCheckCode // 是否查找验证码，如果不是，则是判断该邮箱是否已经获取了验证码
 */

export const checkCodeIsExist = (req: Request, next: NextFunction, isCheckCode: boolean = false) => {
    console.log(req.body)
    const condition: object = isCheckCode ? { email: req.body.email, verifyCode: md5(req.body.verifyCode) } :
        { email: req.body.email }
    return new Promise(resolve => {
        emailModel.findOne(condition, { _id: false, email: true, verifyCode: true }).then(doc => {
            console.log(doc)
            resolve(doc)
        }).catch(err => {
            next(err)
            resolve(false)
        })
    })
}

const _delVerifyCode = (req: Request, next: NextFunction) => {
    return new Promise(resolve => {
        emailModel.deleteOne({ email: req.body.email }).then(doc => {
            resolve(true)
        }).catch(err => {
            next(err)
            resolve(false)
        })
    })
}