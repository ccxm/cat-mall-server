import * as express from 'express'
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from 'express'
import { parseReqParam, testWithRules } from './middlewares/middleware'
import { config } from './config/base'
import { UserRouter } from './routers/userRouter'
import { PublicRouter } from './routers/publicRouter'
import { GoodsRouter } from './routers/goodsRouter'
import { CommentRouter } from './routers/commentRouter'
import { AccountRouter } from './routers/accountRouter'
import { OrderRouter } from './routers/orderRouter'
import { CartRouter } from './routers/cartRouter'
import { failResponse } from './interfaces/initInterface'
import { statusCode } from './config/statusCode'
import * as expressJwt from 'express-jwt'
import * as resFunc from './public/resFunc'
import './config/connectDB'
import './interfaces/publicInterfaces'

const app = express()

app.listen(config.PORT, (req: Request, res: Response, next: NextFunction) => {
    console.log('程序已启动')
})

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//设置允许跨域访问该服务.
app.all('*', function (req: Request, res: Response, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*')
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', '*')
    res.header('Access-Control-Allow-Methods', '*')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()
})

app.use(expressJwt({
    secret: config.JWT_SERCRET
}).unless({
    path: ['/user/login', '/user/register', /^\/goods/, '/public/get-verify-code']
}))

// 自定义中间件
app.use(parseReqParam)
app.use(testWithRules)

app.get('/', (req: Request, res: Response) => {
    res.end('helloworld')
})

// 实例化路由
new UserRouter(app)
new PublicRouter(app)
new GoodsRouter(app)
new CommentRouter(app)
new AccountRouter(app)
new OrderRouter(app)
new CartRouter(app)

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log('监听到出错')
    console.log(err)
    if (err.name === 'UnauthorizedError') {
        res.status(401)
        resFunc.appoint(statusCode.UNAUTHORIZED, res)
        return
    }
    if (process.env.NODE_ENV === 'development') {
        // failResponse.data = {
        //     err
        // }
        // res.json(failResponse)
        resFunc.appoint(statusCode.FAIL, res, err)
    } else {
        failResponse.data = {
            error: '发生未知错误，请重试'
        }
        res.json(failResponse)
    }
})

