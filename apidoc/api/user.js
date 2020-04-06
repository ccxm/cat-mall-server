/**
 * @apiDefine UserNotFoundError
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */

/**
 * @api {post} /user/register 注册
 * @apiVersion 1.0.1
 * @apiName Register
 * @apiGroup User
 *
 * @apiParam {String} email          邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。
 * @apiParam {String} password       密码，只能输入6-20个字母、数字、下划线
 * @apiParam {String} verifyCode     验证码，六位数字组成
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "userId": "123456789",
 *    "password": "123456",
 *    "verifyCode": "123456"
 * }
 *
 * @apiSuccess {String} userId                   用户id
 * @apiSuccess {String} token                    字符串
 * @apiSuccess {Object} userInfo                 用户的基本信息
 * @apiSuccess {String} userInfo.nickName        用户的基本信息
 * @apiSuccess {String} userInfo.gender          用户的基本信息
 * @apiSuccess {String} userInfo.avatarUrl       用户的基本信息
 */

 /**
 * @api {post} /user/login          登录
 * @apiVersion 1.0.3
 * @apiName Login
 * @apiGroup User
 *
 * @apiParam {String} email          邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。
 * @apiParam {String} password       密码，只能输入6-20个字母、数字、下划线  
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "userId": "123456789",
 *    "password": "123456"
 * }
 *
 * @apiSuccess {String} userId                   用户id
 * @apiSuccess {String} token                    字符串
 * @apiSuccess {Object} userInfo                 用户的基本信息
 * @apiSuccess {String} userInfo.nickName        用户的基本信息
 * @apiSuccess {String} userInfo.gender          用户的基本信息
 * @apiSuccess {String} userInfo.avatarUrl       用户的基本信息
 */

 /**
 * @api {post} /user/reset-password 修改密码
 * @apiVersion 1.0.2
 * @apiName ResetPassword
 * @apiGroup User
 *
 * @apiParam {String} verifyCode     验证码，六位数字组成 
 * @apiParam {String} email          邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。
 * @apiParam {String} password       密码，只能输入6-20个字母、数字、下划线  
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "verifyCode": "123456",
 *    "email": "123@qq.com",
 *    "password": "123456"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 * 
 * @apiSuccess {String} userId                   用户id
 * @apiSuccess {String} token                    字符串
 * @apiSuccess {Object} userInfo                 用户的基本信息
 * @apiSuccess {String} userInfo.nickName        用户的基本信息
 * @apiSuccess {String} userInfo.gender          用户的基本信息
 * @apiSuccess {String} userInfo.avatarUrl       用户的基本信息
 *
 */

  /**
 * @api {post} /user/update-user-info 更新用户信息
 * @apiHeader {String} Authorization
 * @apiVersion 1.0.2
 * @apiName UpdateUserInfo
 * @apiGroup User
 *
 * @apiParam {String} nickName       用户昵称
 * @apiParam {Number} gender         用户性别，0：男，1：女
 * @apiParam {String} avatarUrl      用户头像
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "nickName": "cxm",
 *     "gender": 0,
 *     "avatarUrl": "http://cxm.png"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "email": "123@qq.com"
 *     "nickName": "cxm",
 *     "gender": 0,
 *     "avatarUrl": "http://cxm.png"
 * }
 *
 * @apiSuccess {String} email          邮箱
 * @apiSuccess {String} nickName       用户昵称
 * @apiSuccess {Number} gender         用户性别，0：男，1：女
 * @apiSuccess {String} avatarUrl      用户头像
 */

  /**
 * @api {get} /user/goods-like-list   获取商品点赞列表
 * @apiVersion 1.0.0
 * @apiName GetGoodsLikeList
 * @apiGroup User
 *
 * @apiParam {String} userId         用户id
 *
 * @apiParamExample {json} Request-Example:
 * HTTP/1.1 200 OK
 * {
 *    "userId": "123456789"
 * }
 *
 * @apiSuccess {String[]} goodsLikeList     点赞数组
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "goodsLikeList": ["100001"]
 * }
 */

   /**
 * @api {post} /user/goods-like    给商品点赞
 * @apiVersion 1.0.1
 * @apiName GoodsLike
 * @apiGroup User
 *
 * @apiParam {String} goodsId       商品id  
 * @apiParam {String} userId        用户id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "123456"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "goodsId": "123456"
 *   "likeNum": 10
 *   "likeState": true
 * }
 *
 * @apiSuccess {String}   goodsId       商品id 
 * @apiSuccess {Number}   likeNum       点赞的数量
 * @apiSuccess {Boolean}  likeState     点赞状态，true:点赞，false:取消点赞
 */

 /**
 * @api {get} /user/comment-like-list    获取评论点赞列表
 * @apiHeader {String} Authorization
 * @apiVersion 1.0.0
 * @apiName GetCommentLikeList
 * @apiGroup User
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "goodsId": "123456"
 *   "likeNum": 10
 *   "likeState": true
 * }
 *
 * @apiSuccess {String}   goodsId       商品id 
 * @apiSuccess {Number}   likeNum       点赞的数量
 * @apiSuccess {Boolean}  likeState     点赞状态，true:点赞，false:取消点赞
 */
