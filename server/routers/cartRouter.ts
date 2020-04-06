import {RouterBase} from './routerBase'
import * as cartControllers from '../controllers/cartControllers'

export class CartRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/cart')
    }

    addRouter(): void {
        this.router.get('/cart', cartControllers.getCartList)
        this.router.post('/cart', cartControllers.addToCart)
        this.router.put('/cart', cartControllers.updateCart)
        this.router.delete('/cart', cartControllers.deleteCart)
        this.router.get('/cart-length', cartControllers.getCartLength)
    }
}