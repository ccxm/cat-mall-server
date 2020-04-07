import * as mongoose from 'mongoose'
import { config } from './base'
import * as test from './../controllers/commentControllers'
import {create} from './../controllers/createGoods'
import {_getTheOrder} from './../controllers/accountControllers'
import {updateGoodsInfo} from './../controllers/goodsControllers'
import {goods} from './../data/data'

mongoose.set('useCreateIndex', true)
mongoose.set('useFindAndModify', false)
mongoose.connect(`mongodb://account:pwd@localhost/cat-mall?authSource=admin`,
    { useNewUrlParser: true, useUnifiedTopology: true })
const connection: any = mongoose.connection

connection.on('error', (error: any) => {
    console.log('连接数据库出错')
    console.log(error)
})

connection.once('open', () => {
    console.log('连接数据库成功')
    // goods.forEach(item => {
    //     updateGoodsInfo(item)
    // })
    // test.getComment()
    // create()
    // _getTheOrder({
    //     userId: '154638793538',
    //     orderId: '2020558238869199'
    // })
})

export default connection
