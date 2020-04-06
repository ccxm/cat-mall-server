/**
 * @api {get} /user/address 获取地址
 * @apiVersion 1.0.2
 * @apiName GetAddress
 * @apiGroup Address
 * 
 * @apiHeader {String} Authorization token
 * 
 * @apiParamExample {json} Request-Example:
 * {}
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    addressList: []
 * }
 *
 * @apiSuccess {Object[]} addressList       地址列表
 */

 /**
 * @api {post} /user/address 新增地址
 * @apiVersion 1.0.4
 * @apiName AddAddress
 * @apiGroup Address
 * 
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} userId                         用户id
 * @apiParam {String} name                           收货人的名字  
 * @apiParam {String} phone                          收货人的电话号码
 * @apiParam {String} detailedAddress                收货人的详细地址
 * @apiParam {String} completedAddress               收货人的完整地址
 * @apiParam {Object} addressTable                   地址列表
 * @apiParam {Object} addressTable.province          省
 * @apiParam {String} addressTable.province.value    省的代码
 * @apiParam {String} addressTable.province.label    省的名字
 * @apiParam {Object} addressTable.city              市
 * @apiParam {String} addressTable.city.value        市的代码
 * @apiParam {String} addressTable.city.label        市的名字
 * @apiParam {Object} addressTable.area              区
 * @apiParam {String} addressTable.area.value        区的代码
 * @apiParam {String} addressTable.area.label        区的名字
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "张三",
 *    "phone": "12345678910",
 *    "detailedAddress": "黄土高原",
 *    "completedAddress": "北京市市辖区东城区黄土高原",
 *    "addressTable": {
 *        "province": {
 *        "value": "110000",
 *        "label": "北京市"
 *     }, 
 *       "city": {
 *         "value": "110100", 
 *         "label": "市辖区"
 *     },
 *       "area": {
 *         "value": "110101", 
 *         "label": "东城区"
 *      }
 *    }
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

 /**
 * @api {put} /user/address          修改地址
 * @apiVersion 1.0.2
 * @apiName ModifyAddress
 * @apiGroup Address
 * 
 * @apiHeader {String} Authorization token
 *
 * @apiParam {String} addressId                      用户id
 * @apiParam {String} name                           收货人的名字  
 * @apiParam {String} phone                          收货人的电话号码
 * @apiParam {String} detailedAddress                收货人的详细地址
 * @apiParam {String} completedAddress               收货人的完整地址
 * @apiParam {Object} addressTable                   地址列表
 * @apiParam {Object} addressTable.province          省
 * @apiParam {String} addressTable.province.value    省的代码
 * @apiParam {String} addressTable.province.label    省的名字
 * @apiParam {Object} addressTable.city              市
 * @apiParam {String} addressTable.city.value        市的代码
 * @apiParam {String} addressTable.city.label        市的名字
 * @apiParam {Object} addressTable.area              区
 * @apiParam {String} addressTable.area.value        区的代码
 * @apiParam {String} addressTable.area.label        区的名字
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "name": "张三",
 *    "addressId": "5e3774f7d5666a299cc16613",
 *    "phone": "12345678910",
 *    "detailedAddress": "黄土高原",
 *    "completedAddress": "北京市市辖区东城区黄土高原",
 *    "addressTable": {
 *        "province": {
 *        "value": "110000",
 *        "label": "北京市"
 *     }, 
 *       "city": {
 *         "value": "110100", 
 *         "label": "市辖区"
 *     },
 *       "area": {
 *         "value": "110101", 
 *         "label": "东城区"
 *      }
 *    }
 * }
 * 
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

 /**
 * @api {delete} /user/address       删除地址
 * @apiVersion 1.0.2
 * @apiName DeleteAddress
 * @apiGroup Address
 * 
 * @apiHeader {String} Authorization token
 *
 * @apiParam {Number} addressId      待删除的地址的id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "addressId": ""
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 *
 */
