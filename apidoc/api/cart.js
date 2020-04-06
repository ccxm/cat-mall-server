/**
 * @api {get} /cart/cart             获取购物车列表
 * @apiVersion 1.0.1
 * @apiName GetCartList
 * @apiGroup Cart
 *
 * @apiParam {String} userId         用户id
 * @apiParam {Number} [pageSize]     分页的大小，默认为6
 * @apiParam {Number} [curPage]      当前页，默认为0
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "userId": "123456789012",
 *    "pageSize": 6,
 *    "curPage": 0
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "listLength": 13,
 *    "curPage": 0,
 *    "cartList": [
 *        "goodsId": "100004",
 *        "goodsNum": 1
 *    ]
 * }
 * 
 * @apiSuccess {Number} listLength              购物车列表的长度
 * @apiSuccess {Number} curPage                 当前页码
 * @apiSuccess {Object[]} cartList              购物车列表
 * @apiSuccess {Object} cartListItem            购物车列表的每一项，实际中不存在
 * @apiSuccess {String} cartListItem.goodsId    商品id
 * @apiSuccess {Number} cartListItem.goodsNum   购物车的数量
 */

/**
 * @api {post} /cart/cart           加入购物车
 * @apiVersion 1.0.0
 * @apiName AddToCart
 * @apiGroup Cart
 *
 * @apiParam {String} userId         用户id
 * @apiParam {String} goodsId        商品id
 * @apiParam {Number} goodsNum       商品数量
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "userId": "123456789012",
 *    "goodsId": "123456",
 *    "goodsNum": 1
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

 /**
 * @api {put} /cart/cart           更新购物车
 * @apiVersion 1.0.0
 * @apiName UpdateCart
 * @apiGroup Cart
 *
 * @apiParam {String} userId         用户id
 * @apiParam {String} goodsId        商品id
 * @apiParam {Number} goodsNum       商品数量
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "userId": "123456789012",
 *    "goodsId": "123456",
 *    "goodsNum": 1
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

  /**
 * @api {delete} /cart/cart          从删除购物车商品
 * @apiVersion 1.0.0
 * @apiName DeleteFromCart
 * @apiGroup Cart
 *
 * @apiParam {String} userId         用户id
 * @apiParam {String} goodsId        商品id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "userId": "123456789012",
 *    "goodsId": "123456",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */
