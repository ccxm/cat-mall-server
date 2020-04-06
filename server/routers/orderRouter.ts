import {RouterBase} from './routerBase'
import * as orderControllers from '../controllers/orderControllers'

export class OrderRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/order')
    }

    addRouter(): void {
        this.router.post('/create-order', orderControllers.createOrder)
        this.router.post('/pay-for-order', orderControllers.payForOrder)
        this.router.get('/order-list', orderControllers.getOrderList)
        this.router.delete('/order', orderControllers.deleteOrder)
    }
}