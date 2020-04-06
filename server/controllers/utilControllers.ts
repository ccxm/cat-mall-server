import { NextFunction } from 'express'
import { IAutoIdParam } from './../public/interfaces'
import * as mongoose from 'mongoose'

export const autoId = async (model: mongoose.Model<mongoose.Document, {}>, params: IAutoIdParam, next: NextFunction) => {
    return new Promise(resolve => {
        model.findOneAndUpdate(params.query,
            { $inc: { [params.field]: 1 } },
            {
                new: true, fields: { _id: false, addressCurrentId: true }
            }).then((doc: any) => {
                console.log(doc)
                if (doc) {
                    resolve(doc.addressCurrentId)
                } else {
                    resolve('null')
                }
            }).catch(err => {
                console.log(err)
                next(err)
                resolve(false)
            })
    })
}