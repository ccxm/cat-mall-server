# 猫咪商城服务端说明文档

## 项目地址

预览地址：https://mall.cxmmao.com/#/

接口文档：https://mall.cxmmao.com/cat-mall-api-doc/

前端源码：https://github.com/ccxm/cat-mall

体验账号：1532917281@qq.com，123456 

(ps: 此账号是真实的邮箱，要用到验证码的地方还是要自己注册一个账号哦)

## 简介

该项目为猫咪商城的后台，使用node.js+typescript+mongodb+jwt来开发。由于初次使用typescript，而且商城项目的逻辑较为复杂，其中有什么不足的地方，欢迎大家指出来哦。

## 项目结构
```txt
.
├── apicoc                                       // 接口文档目录
|   | 
│   ├── build                                    // 接口文档打包后的目录
|   | 
|   └── api                                      // 接口目录
|   |   └── account.js                           // 账号接口
|   |   └── address.js                           // 地址接口
|   |   └── cart.js                              // 购物车接口
|   |   └── comment.js                           // 评论接口
|   |   └── goods.js                             // 商品接口
|   |   └── order.js                             // 订单接口
|   |   └── public.js                            // 公共接口
|   |   └── user.js                              // 用户接口
|   | 
├── build                                        // 项目打包的目录
|   | 
├── server                                       // 源码目录
|   | 
│   ├── config                                   // 配置文件的目录
|   |   └── base.ts                              // 基本配置，包括端口、数据库的配置
|   |   └── connectDB.ts                         // 连接数据库
|   |   └── constant.ts                          // 常量表
|   |   └── statusCode.ts                        // 请求返回的状态码
|   | 
│   ├── controllers                              // 控制器
|   |   └── accountControllers.ts                // 账号
|   |   └── addressController.ts                 // 地址
|   |   └── cartControllers.ts                   // 购物车
|   |   └── commentControllers.ts                // 评论
|   |   └── createGoods.ts                       // 生成商品
|   |   └── emailController.ts                   // 邮件
|   |   └── goodsControllers.ts                  // 商品
|   |   └── orderControllers.ts                  // 订单
|   |   └── publicController.ts                  // 公共接口
|   |   └── uploadControllers.ts                 // 上传文件接口
|   |   └── userController.ts                    // 用户
|   |   └── utilControllers.ts                   // 工具类
|   | 
│   ├── data                                     // 数据库的数据文件
|   |   └── data.backup.ts                       // 备份文件
|   |   └── data.ts                              // 数据文件
|   | 
│   ├── interfaces                               // 定义接口的目录
|   |   └── accountInterfaces.ts                 // 用户
|   |   └── cartInterfaces.ts                    // 购物车
|   |   └── commentInterfaces.ts                 // 评论
|   |   └── initInterface.ts                     // 初始化函数的接口
|   |   └── orderInterfaces.ts                   // 订单
|   |   └── publicInterfaces.ts                  // 公共
|   |   └── userInterfaces.ts                    // 用户
|   | 
│   ├── middlewares                              // 中间件目录
|   |   └── middlewares.ts                       // 中间件，处理请求参数，以及参数的校验
|   | 
│   ├── models                                   // 数据库模型目录
|   |   └── goodsModel.ts                        // 商品模型
|   |   └── orderModel.ts                        // 订单模型
|   |   └── userModel.ts                         // 用户模型
|   | 
│   ├── public                                   // 公共函数，工具类目录
|   |   └── resFunc.ts                           // 返回函数
|   |   └── rules.ts                             // 参数校验工具
|   |   └── utils.ts                             // 工具类
|   | 
│   ├── routers                                  // 路由目录
|   |   └── accountRouter.ts                     // 账号
|   |   └── cartRouter.ts                        // 购物车
|   |   └── commentRouter.ts                     // 评论
|   |   └── goodsRouter.ts                       // 商品
|   |   └── orderRouter.ts                       // 订单
|   |   └── publicRouter.ts                      // 公共接口
|   |   └── routerBase.ts                        // 路由的抽象类
|   |   └── userRouter.ts                        // 用户
|   | 
│   ├── server.ts                                // 入口函数
.

```

## 响应数据格式
响应状态码

> * 10000  请求成功
> * 49999  token不存在或者已过期，请重新登录
> * 40009  请求参数不正确，请校验

响应格式
```javascript
{
    code: 10000  // 响应状态码
    data: {}     // 响应的数据
    msg: ""      // 备注信息
}
```

`user/login` 成功响应
```javascript
{
    "code": 10000,
    "msg": "登录成功",
    "data": {
        "userId": "459116560457",
        "userInfo": {
            "email": "1532917281@qq.com",
            "nickName": "cxmmao",
            "gender": 0,
            "avatarUrl": "default-avatar-url/367970005442.png"
        },
        "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0NTkxMTY1NjA0NTciLCJpYXQiOjE1ODYyNzI1MjYsImV4cCI6MTU4NjM1ODkyNn0.75d7X-qSlMtOHsr0z4jnEmOf_C5YO28eQelCSFQMO78"
    }
}
```

`goods/goods-list` 请求参数不正确
```javascript
{
    "code": 40009,
    "msg": "请求参数不正确，请校验",
    "data": {
        "detail": "priceRange不能为空；currentPage不能为空；pagingSize不能为空；sortType不能为空；"
    }
}
```

`comment/write-comment` token不存在或者已过期，请重新登录
```
{
    "code": 49999,
    "msg": "token不存在或者已过期，请重新登录",
    "data": {}
}
```


## 关键代码的讲解

### 路由的封装
`routerBase.ts` 路由的抽象类
```javascript
import {Router} from 'express'

export abstract class RouterBase {
    public router:Router
    constructor(app: any, path:string) {
        this.router = Router()
        this.addRouter()
        this.useRouter(app, path)
    }

    // 添加路由
    abstract addRouter():void

    // 使用路由
    useRouter(app: any,path:string):void {
        app.use(path, this.router)
    }
}
```

为了方便代码的管理，将不同的模块写到不同个路由中去，因此抽象出来一个路由类，所有的路由都实例化这个抽象类。例如

`cartRouter.ts` 购物车路由
```javascript
import {RouterBase} from './routerBase'
import * as cartControllers from '../controllers/cartControllers'

export class CartRouter extends RouterBase  {  // 继承同一个路由类
    constructor(app: any) {
        super(app, '/cart')  // 调用抽象类的构造函数
    }

    addRouter(): void {
        this.router.get('/cart', cartControllers.getCartList)  // 具体路由
        this.router.post('/cart', cartControllers.addToCart)
        this.router.put('/cart', cartControllers.updateCart)
        this.router.delete('/cart', cartControllers.deleteCart)
        this.router.get('/cart-length', cartControllers.getCartLength)
    }
}
```

`server.ts`

```javascript
// 实例化路由
new UserRouter(app)
new PublicRouter(app)
new GoodsRouter(app)
new CommentRouter(app)
new AccountRouter(app)
new OrderRouter(app)
new CartRouter(app)
```

### 统一出错状态码
`statusCode.ts`
```
export const statusCode = Object.freeze({
    SUCCESS: {
        code: 10000,
        msg: '成功'
    },
    UNAUTHORIZED: {
        code: 49999,
        msg: 'token不存在或者已过期，请重新登录'
    },
    ILLEGAL_VALUE: {
        code: 40099,
        msg: '请求的值不合法'
    },
    EMPTY_PARAM: {
        code: 40009,
        msg: '请求参数不正确，请校验'
    },
    FAIL: {
        code: 40999,
        msg: '请求失败'
    },
    // 更新信息不存在
    UPDATE_MSG_NO_EXIST: {
        code: 10601,
        msg: '该信息不存在，更新失败'
    },
    LOGIN_FAIL: {
        code: 20444,
        msg: '账号或密码不正确'
    },
    // ...更多看代码
})
```
为每个错误都定义了状态码，方便出错时快速定位问题

### 自定义参数校验中间件

#### 处理请求参数
`middlewares.ts`
```javascript
// 解析请求参数，所有参数都在params里拿到
export const parseReqParam = (req: Request, res: Response, next: NextFunction): void => {
    if (req.method === 'GET') {
        req.body = req.query
    }
    req.body.userId = _decodeToken(req)  // 解析userId
    if (req.method !== 'OPTIONS') {
        next()  // 向下执行
    } else {
        res.end('')  // 如果是options请求，直接返回
    }
}
```
**get请求参数在query中，而post在body中，为了统一参数，统一将参数放在`req.params`中**

#### 校验请求参数
`rules.ts`  校验规则
```javascript
// 路由与请求参数项对应
export const rules = Object.freeze({
    '/user/check-field-can-use': {
        field: fieldList,
        value: ''
    },
    '/user/register': {
        email: testEmail,
        password: testPassword,
        verifyCode: testVerifyCode
    },
    '/user/login': {
        email: testEmail,
        password: testPassword
    },
    '/user/update-user-info': {
        userId: '',
        nickName: '',
        gender: genderList,
        avatarUrl: ''
    },
    '/public/get-verify-code': {
        email: testEmail
    },
    '/user/reset-password': {
        email: testEmail,
        password: testPassword,
        verifyCode: testVerifyCode
    },
})
```
`middlewares.ts`
```javascript
const _checkParamIsEmpty = (reqObj: object, testObj: object): IParamsCheckRes => {
    let emptyResultStr: string = ''  // 检验结果
    let illegalResultStr: string = ''
    // 第一层检验，判断是否为空
    for (let key in testObj) {
        if (testObj[key] === 'optional' && !reqObj[key]) {
            continue
        }
        // '' 判断值是否为空
        if (!reqObj[key] && (typeof reqObj[key] !== 'number' && typeof reqObj[key] !== 'boolean')) {
            emptyResultStr += key + config.EMPTY_PARAM_TIP + '；'
            continue
        }
        // 递归检查对象数组
        if (Object.prototype.toString.call(testObj[key]) === '[object Array]'
            && Object.prototype.toString.call(testObj[key][0]) === '[object Object]') {
            reqObj[key].forEach((item: any) => {
                const temp: IParamsCheckRes = _checkParamIsEmpty(item, testObj[key][0])
                emptyResultStr += temp.emptyResultStr
                illegalResultStr += temp.illegalResultStr
            })
            continue
        }
        // [] 判断是否满足该值
        if (testObj[key] && reqObj[key] && Object.prototype.toString.call(testObj[key]) === '[object Array]') {
            illegalResultStr += _checkIsAccordWithCustom(reqObj[key], testObj[key], key)
            continue
        }
        // () 判断是否符合函数里面的值
        if (Object.prototype.toString.call(testObj[key]) === '[object Function]') {
            illegalResultStr += testObj[key](reqObj[key], key)
            continue
        }
        // {} 递归判断里面的值
        if (Object.prototype.toString.call(testObj[key]) === '[object Object]') {
            const temp: IParamsCheckRes = _checkParamIsEmpty(reqObj[key], testObj[key])
            emptyResultStr += temp.emptyResultStr
            illegalResultStr += temp.illegalResultStr
        }
    }
    return {
        emptyResultStr,
        illegalResultStr,
        result: emptyResultStr + illegalResultStr
    }
}
```
**参数校验规则**
> * 检验规则
> * '' 判断是否为空
> * [] 判断是否符合数组里面的值
> * {} 递归判断对象里面的值是否为空
> * () 判断是否符合函数里面的值
> * optional 可选择的
> * [{}] 递归数组判断对象里面的值是否为空

ps：虽然检验函数有点绕，但是却十分简洁

#### 统一响应函数

`resFunc.ts`  响应函数
```javascript
// 成功的响应
export const success = (data: object, res: Response, msg?:string):void => {
    const temp:interf.IResponse = {
        code: statusCode.SUCCESS.code,
        msg: msg || statusCode.SUCCESS.msg,
        data
    }
    res.json(temp)
}

// 回复指定内容
export const appoint = (target: any,res: Response, data:object = {}):void => {
    const temp:interf.IResponse = {
        code: target.code,
        msg: target.msg,
        data
    }
    res.json(temp)
}
```
响应示例
```javascript
// 成功响应
resFunc.success(docRes, res, '更新用户信息成功') 
resFunc.success({
    orderId,
    totalAmount
}, res, '创建订单成功，请支付')
// 错误的响应
resFunc.appoint(statusCode.UPDATE_MSG_NO_EXIST, res) 
resFunc.appoint(statusCode.WRITE_BRIEF_NULL, res)
```
**通过统一的响应，前端可以得到数据结构的一致，方便对接接口，同时简化了服务端的代码**

## 赞赏作者续费服务器~~
支付宝 | 微信
------|------
![img-alipay](https://raw.githubusercontent.com/ccxm/md-image-store/master/donate-qrcode/alipy.png)|![imag-wechat](https://raw.githubusercontent.com/ccxm/md-image-store/master/donate-qrcode/wechat.png)

觉得写得还不错的记得给个star哦，持续更新~






