/**
 * @api {put} /account/paykey       更新支付密码
 * @apiVersion 1.0.0
 * @apiName UpdatePaykey
 * @apiGroup Account
 *
 * @apiParam {String} email          邮箱
 * @apiParam {String} paykey         支付密码
 * @apiParam {String} verifyCode     验证码
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "email": "123456@qq.com",
 *    "paykey": "123456", 
 *    "verifyCode": "123456"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

 /**
 * @api {get} /account/balance       获取账户余额
 * @apiVersion 1.0.0
 * @apiName GetBalance
 * @apiGroup Account
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 * 
 * @apiSuccess {Number} balance       余额
 */

  /**
 * @api {get} /account/recharge-list       获取充值列表
 * @apiVersion 1.0.0
 * @apiName GetRechargeList
 * @apiGroup Account
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "rechargeList": {
 *          "littler": 88,
 *          "little": 188,
 *          "custom": 288,
 *          "more": 588,
 *          "evenMore": 888,
 *          "most": 1000
 *      }
 * }
 * 
 * @apiSuccess {Object} rechargeList             充值的列表，列表的每一项是充值的key，账户余额的最大值不能超过100000
 * @apiSuccess {Number} rechargeList.littler     最小的
 * @apiSuccess {Number} rechargeList.little      较小的
 * @apiSuccess {Number} rechargeList.custom      正常的
 * @apiSuccess {Number} rechargeList.more        大的
 * @apiSuccess {Number} rechargeList.evenMore    较大的
 * @apiSuccess {Number} rechargeList.most        最大的
 * 
 */

   /**
 * @api {put} /account/recharge                 充值
 * @apiVersion 1.0.0
 * @apiName Recharge
 * @apiGroup Account
 * 
 * 
 * @apiParam {String} rechargeKey    充值面值的key，取值为：["littler","little","custom","more", "evenMore", "most"]
 * @apiParam {String} verifyCode     验证码
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "rechargeKey": "custom", 
 *    "verifyCode": "123456"
 * }
 * 
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *     "balance": 12345
 * }
 * 
 * @apiSuccess {Number}   balance  账户余额 
 * 
 */