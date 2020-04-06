 /**
 * @api {post} /user/check-field-can-use 检查某字段是否可用
 * @apiVersion 1.0.1
 * @apiName CheckFieldCanUse
 * @apiGroup Public
 *
 * @apiParam {String} field          字段
 * @apiParam {String} value          值, 可取值为'nickName', 'email'
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        canUse: true,
 *        filed: "nickName",
 *        value: "cxm",
 *     }
 * @apiSuccess {Boolean} canUse 是否可以使用
 * @apiSuccess {String} filed          字段
 * @apiSuccess {String} value          值
 *
 */

  /**
 * @api {post} /public/get-verify-code 获取验证码
 * @apiVersion 1.0.1
 * @apiName GetVerifyCode
 * @apiGroup Public
 *
 * @apiParam {String} email          邮箱，开始必须是一个或者多个单词字符或者是-，加上@，然后又是一个或者多个单词字符或者是-。然后是点“.”和单词字符和-的组合，可以有一个或者多个组合。
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */
