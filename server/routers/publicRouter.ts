import {RouterBase} from './routerBase'
import * as emailController from '../controllers/emailController'
import { uploadImage,imageUploader } from '../controllers/uploadControllers'

export class PublicRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/public')
    }

    addRouter(): void {
        this.router.post('/get-verify-code', emailController.getVerifyCode)
        this.router.post('/upload-image', imageUploader, uploadImage)
    }
}