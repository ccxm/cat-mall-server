/**
 * @api {post} /order/create-order     创建订单
 * @apiVersion 1.0.1
 * @apiName CreateOrder
 * @apiGroup Order
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} addressId        收获地址id
 * @apiParam {Object[]} orderList      订单列表
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "userId": "123456789012",
 *    "addressId": "5e3774f7d5666a299cc16613",
 *    "orderList": [{
 *         "goodsId": "100001",
           "purchaseNum": 1
 *     }],
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

 /**
 * @api {post} /order/pay-for-order     支付订单
 * @apiVersion 1.0.2
 * @apiName PayForOrder
 * @apiGroup Order
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} orderId        订单id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "orderId": "2020558238869199",
 *    "paykey": "123456"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "balance": 9999999
 * }
 * 
 * @apiSuccess {Number} balance       余额
 */

 /**
 * @api {get} /order/order-list   查找订单列表
 * @apiVersion 1.0.2
 * @apiName GetOrderList
 * @apiGroup Order
 * @apiHeader {String} Authorization token
 *
 * @apiParam {Number} [pageSize]         分页的大小，默认为6
 * @apiParam {Number} [currentPage]      当前页，默认为0
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "userId": "123456789012",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "orderList": [{
 *          "orderId": "2020006621685460",
 *           "totalAmount": 1785,
 *           "totalNum": 1,
 *           "goodsList": [
 *               {
 *                  "_id": "5e1347153c69a349cc115c98",
 *                   "goodsId": "100001",
 *                   "goodsName": "叮当猫",
 *                   "purchaseNum": 1,
 *                   "unitPrice": 1785,
 *                   "totalPrice": 1785,
 *                   "discountPrice": 0,
 *                   "masterImg": "https://img.alicdn.com/imgextra/i1/3360749321/O1CN01Bpuvdi2Ij4HxrK82f_!!3360749321.jpg"
 *               }
 *           ],
 *           "paymentState": "UNPAID"
 *     }]
 * }
 * 
 * @apiSuccess {Object[]} orderList                                            订单列表
 * @apiSuccess {Object}   orderList.orderListItem                              订单列表的每一项，实际中不存在
 * @apiSuccess {String}   orderList.orderListItem.orderId                      订单id
 * @apiSuccess {Number}   orderList.orderListItem.totalAmount                  订单总金额
 * @apiSuccess {Number}   orderList.orderListItem.totalNum                     订单中商品的数量
 * @apiSuccess {String}   orderList.orderListItem.paymentState                 订单的状态
 * @apiSuccess {Object[]} orderList.orderListItem.goodsList                    订单中的商品列表
 * @apiSuccess {Object}   orderList.orderListItem.goodsListItem                商品列表的每一项，实际中不存在
 * @apiSuccess {String}   orderList.orderListItem.goodsListItem._id            商品列表中的索引
 * @apiSuccess {String}   orderList.orderListItem.goodsListItem.goodsId        商品id
 * @apiSuccess {String}   orderList.orderListItem.goodsListItem.goodsName      商品名字
 * @apiSuccess {String}   orderList.orderListItem.goodsListItem.intro          商品介绍
 * @apiSuccess {Number}   orderList.orderListItem.goodsListItem.purchaseNum    购买的数量
 * @apiSuccess {Number}   orderList.orderListItem.goodsListItem.originalPrice  单价
 * @apiSuccess {Number}   orderList.orderListItem.goodsListItem.totalPrice     合计
 * @apiSuccess {Number}   orderList.orderListItem.goodsListItem.discountPrice  优惠价格
 * @apiSuccess {String}   orderList.orderListItem.goodsListItem.masterImg      主图
 * @apiSuccess {Number}   orderList.orderListItem.address                      收货地址对象 
 * @apiSuccess {Number}   orderList.orderListItem.address.name                 收货人名字
 * @apiSuccess {String}   orderList.orderListItem.address.phone                收货人电话号码
 * @apiSuccess {String}   orderList.orderListItem.address.completedAddress     收货人完整地址
 */

 /**
 * @api {delete} /order/order       删除订单
 * @apiVersion 1.0.1
 * @apiName DeleteOrder
 * @apiGroup Order
 *
 * @apiHeader {String} Authorization token
 * 
 * @apiParam {String} orderId        订单id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "userId": "123456789012",
 *    "orderList": "2020558238869199"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */