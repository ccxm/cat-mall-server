/**
 * @api {get} /goods/goods-list 获取商品列表
 * @apiVersion 1.0.0
 * @apiName GetGoodsList
 * @apiGroup Goods
 *
 * @apiParam {String} priceRange     价格范围，可取值：[ 'ALL', 'CHEEPER', 'CHEEP', 'EXPENSIVE', 'EXPENSIVER' ]
 * @apiParam {Number} currentPage    当前的页码，从0开始
 * @apiParam {Number} pagingSize     分页的大小，默认为6
 * @apiParam {String} sortType       排序的类型，可取值：[ 'ASC', 'DESC' ]
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "priceRange": "ALL",
 *    "currentPage": 0,
 *    "pagingSize": 6,
 *    "sortType": "ASC"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    goodsList: []
 * }
 *
 * @apiSuccess {Object[]} goodsList       商品列表
 */

 /**
 * @api {get} /goods/goods-detail    获取商品详情
 * @apiVersion 1.0.0
 * @apiName GetGoodsDetail
 * @apiGroup Goods
 *
 * @apiParam {String} goodsId       商品id   
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": '123456'
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "goodsName": "叮当猫",
 *   "originalPrice": 1785,
 *   "discountPrice": 1775,
 *   "memberPrice": 1765,
 *   "inventory": 100
 *   "goodsInfo": {
 *     "imgList": [
 *         "https://img.alicdn.com/imgextra/i1/3360749321/O1CN01Bpuvdi2Ij4HxrK82f_!!3360749321.jpg",
 *         "https://img.alicdn.com/imgextra/i4/3360749321/O1CN01LZM6xU2Ij4HxKNh0a_!!0-item_pic.jpg",
 *         "https://img.alicdn.com/imgextra/i3/3360749321/O1CN012oXFje2Ij4HyoMZSh_!!3360749321.jpg",
 *         "https://img.alicdn.com/imgextra/i3/3360749321/O1CN01F2s0De2Ij4Hwd94nt_!!3360749321.jpg",
 *         "https://img.alicdn.com/imgextra/i1/3360749321/O1CN01cSxN9c2Ij4HooMzSo_!!3360749321.jpg"
 *     ],
 *       "intro": "宠爱天下090 美短虎斑猫宠物猫活体美国短毛猫银虎斑纯种虎斑幼崽",
 *       "address": "安徽淮南",
 *       "postage": 88.88,
 *       "videoUrl": "https://tbm-auth.alicdn.com/e99361edd833010b/VKuebnAmdQAikQN6yru/dteJk8wEoYRX5t9v68k_236214188485_sd_hq.mp4?auth_key=1577605131-0-0-2eb95a8e957af345c3b86661734e77e8"
 *    },
 * }
 *
 * @apiSuccess {String} goodsName                 商品名字
 * @apiSuccess {Number} inventory                 库存量
 * @apiSuccess {Number} originalPrice             商品的原价
 * @apiSuccess {Number} discountPrice             商品的优惠价
 * @apiSuccess {Number} memberPrice               商品的会员价
 * @apiSuccess {Object} goodsInfo                 商品信息
 * @apiSuccess {String[]} goodsInfo.imgList       商品图片列表
 * @apiSuccess {String} goodsInfo.intro           商品介绍
 * @apiSuccess {String} goodsInfo.address         商品图片
 * @apiSuccess {String} goodsInfo.postage         商品邮费
 * @apiSuccess {String} goodsInfo.videoUrl        商品视频链接
 */

  /**
 * @api {get} /goods/get-more-goods-list    获取更多商品详情
 * @apiVersion 1.0.1
 * @apiName GetMoreGoodsList
 * @apiGroup Goods
 *
 * @apiParam {Number} [maxLength]       获取商品的最大长度  
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "maxLength": 6
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "moreGoodsList": []
 * }
 *
 * @apiSuccess {Object[]}   moreGoodsList                    更多商品的列表
 * @apiSuccess {Object}     moreGoodsListItem                商品列表的每一项，实际中没有这个字段
 * @apiSuccess {String}     moreGoodsListItem.goodsId        商品id
 * @apiSuccess {String}     moreGoodsListItem.goodsName      商品名字
 * @apiSuccess {Number}     moreGoodsListItem.originalPrice  商品的原价
 * @apiSuccess {String}     moreGoodsListItem.masterImg      商品的主图
 */

   /**
 * @api {get} /goods/goods-info-list    批量商品基本信息
 * @apiVersion 1.0.0
 * @apiName GetGoodsInfoList
 * @apiGroup Goods
 *
 * @apiParam {String[]} goodsIdList            商品id列表 
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *     "goodsIdList": ["100001"]
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *   "goodsInfoList": [
 *      {
 *        "goodsId": "100001",
 *        "goodsName": "叮当猫",
 *        "originalPrice": 1785,
 *        "discountPrice": 1775,
 *        "memberPrice": 1765,
 *        "inventory": 85,
 *        "masterImg": "https://img.alicdn.com/imgextra/i1/3360749321/O1CN01Bpuvdi2Ij4HxrK82f_!!3360749321.jpg"
 *   }]
 * }
 *
 * @apiSuccess {Object[]}   goodsInfoList                    商品基本信息列表
 * @apiSuccess {Object}     goodsInfoListItem                商品基本信息列表的每一项，实际中不存在这个字段
 * @apiSuccess {String}     goodsInfoListItem.goodsId        商品id
 * @apiSuccess {String}     goodsInfoListItem.goodsName      商品名字
 * @apiSuccess {Number}     goodsInfoListItem.originalPrice  商品的原价
 * @apiSuccess {Number}     goodsInfoListItem.discountPrice  商品的优惠价
 * @apiSuccess {Number}     goodsInfoListItem.memberPrice    商品的会员价
 * @apiSuccess {Number}     goodsInfoListItem.inventory      商品的库存
 * @apiSuccess {Number}     goodsInfoListItem.likeNum        商品的点赞的数量
 * @apiSuccess {String}     goodsInfoListItem.masterImg      商品的主图
 */

