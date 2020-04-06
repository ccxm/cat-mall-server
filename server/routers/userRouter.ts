import {RouterBase} from './routerBase'
import * as userController from './../controllers/userController'
import * as addressController from './../controllers/addressController'

export class UserRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/user')
    }

    addRouter(): void {
        this.router.post('/login',userController.login)
        this.router.post('/register',userController.register)
        this.router.post('/check-field-can-use', userController.checkFieldCanUse)
        this.router.post('/update-user-info', userController.updateUserInfo)
        this.router.post('/reset-password', userController.modifyPassword)
        this.router.get('/address',addressController.getAddress)
        this.router.post('/address', addressController.addAddress)
        this.router.put('/address', addressController.updateAddress)
        this.router.delete('/address',addressController.deleteAddress)
        this.router.get('/goods-like-list', userController.getGoodsLikeList)
        this.router.post('/goods-like', userController.likeForGoods)
        this.router.get('/comment-like-list', userController.getCommentLikeList)
    }
}