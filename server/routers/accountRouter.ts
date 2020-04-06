import {RouterBase} from './routerBase'
import * as accountControllers from '../controllers/accountControllers'

export class AccountRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/account')
    }

    addRouter(): void {
        this.router.put('/paykey', accountControllers.updatePaykey)
        this.router.get('/balance', accountControllers.queryBlance)
        this.router.put('/recharge', accountControllers.recharge)
        this.router.get('/recharge-list',accountControllers.getRechargeList)
        this.router.get('/check-has-paykey', accountControllers.checkIsSetPayKey)
    }
}