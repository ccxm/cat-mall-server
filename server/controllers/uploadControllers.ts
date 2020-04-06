import { Request, Response, NextFunction } from 'express'
import * as path from 'path'
import * as fs from 'fs'
import * as multer from 'multer'
import * as UUID from 'uuid'
import { updateAvatarUrl } from './userController'
import { _decodeToken } from './../middlewares/middleware'
import { config } from './../config/base'

//设置保存规则
const storage = multer.diskStorage({
    //destination：字段设置上传路径，可以为函数
    destination: path.resolve(__dirname, config.STATIC_IMAGES_PATH + config.CUSTOM_IMAGES_PATH),

    //filename：设置文件保存的文件名
    filename: function(req, file, cb) {
        const extName:string = file.originalname.slice(file.originalname.lastIndexOf('.'))
        const fileName:string = UUID.v1()
        cb(null, fileName + extName)
    }
})

//设置过滤规则（可选）
const imageFilter = (req: Request, file:any, cb:any) => {
    const acceptableMime:Array<string> = ['image/jpeg', 'image/png', 'image/jpg', 'image/gif']
    //微信公众号只接收上述四种类型的图片
    if(acceptableMime.includes(file.mimetype)){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const imageLimit = {
    fieldSize: 500
}

//创建 multer 实例
export const imageUploader = multer({ 
    storage: storage,
    fileFilter: imageFilter,
    limits: imageLimit
}).array('photos', 1)    //定义表单字段、数量限制

export const uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    req.body.userId = _decodeToken(req)
    console.log(req.body)
    const result:any = await updateAvatarUrl( config.CUSTOM_IMAGES_PATH + req.files[0].filename, req.body.userId, res, next)
    if(result.err) {
        _deleteFile(req.files[0].path)
    }else {
        _deleteFile(path.resolve(__dirname, config.STATIC_IMAGES_PATH + result.tempUrl))
    }
    console.log(req.files)
}

export const _deleteFile = (path: string) => {
    console.log(path)
    if(_checkFileIsExist(path) && path.indexOf(config.DEFAULT_IMAGES_PATH) === -1) {
        fs.unlinkSync(path)
        console.log('删除成功')
    }
}

const _checkFileIsExist = (path: string) => {
    return fs.existsSync(path)
}

// router.post('/image', imageUploader, function(req, res, next) {
//     //req.files中保存文件信息，如下
//     // [ { fieldname: 'photos',
//     //    originalname: 'p8U85lWN0XyYcel_avatar_uploaded1439700817.69.jpg',
//     //    encoding: '7bit',
//     //    mimetype: 'image/jpeg',
//     //    destination: 'E:\\mine\\wechat\\upload',
//     //    filename: 'b585c040-0a6f-11e9-bbb6-fdcabd365420.jpg',
//     //    path:
//     //     'E:\\mine\\wechat\\upload\\b585c040-0a6f-11e9-bbb6-fdcabd365420.jpg',
//     //    size: 16536 } ]
//     console.log(req.files);
// })