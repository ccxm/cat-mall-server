import {RouterBase} from './routerBase'
import * as goodsControllers from '../controllers/goodsControllers'

export class GoodsRouter extends RouterBase  {
    constructor(app: any) {
        super(app, '/goods')
    }

    addRouter(): void {
        this.router.get('/goods-list',goodsControllers.getGoodsList)
        this.router.get('/goods-detail',goodsControllers.getGoodsDetail)
        // this.router.post('/goods-like', goodsControllers.likeGoods)
        this.router.get('/get-more-goods-list', goodsControllers.getMoreGoodsList)
        this.router.get('/goods-info-list', goodsControllers.getGoodsInfoList)
    }
}