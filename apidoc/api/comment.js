/**
 * @api {post} /comment/write-comment   写评论
 * @apiHeader {String} Authorization
 * @apiVersion 1.0.2
 * @apiName WriteComment
 * @apiGroup Comment
 *
 * @apiParam {String} goodsId        商品id
 * @apiParam {String} comment        评论
 * @apiParam {Number} rate           评论的等级，为1~5
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "123456",
 *    "comment": "好好玩" ,
 *    "rate": 5
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {}
 */

 /**
 * @api {get} /comment/comment-list        获取评论列表
 * @apiVersion 1.0.1
 * @apiName GetCommentList
 * @apiGroup Comment
 *
 * @apiParam {String} goodsId                   用户id
 * @apiParam {Number} [pageSize]                分页的大小，默认为6
 * @apiParam {Number} [curPage]                 当前页，默认为0
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "100001",
 *    "pageSize": 10,
 *    "curPage": 0
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "totalCommentNum": 1,
 *    "curPage": 0,
 *    "commentList": [
 *        "commentId": "5e621ae5df80bf7ca0dbfb9e"
 *         "list": [{
 *             "comment": "我也要买一只哦"
 *             "commentListId": "5e65c78bdf80bf7ca0dbfba1"
 *             "createAt": "2020-03-09T04:35:23.544Z"
 *             "likeNum": 1
 *             "unLikeNum": 0
 *        }],
 *        "userInfo": {
 *             "avatarUrl": "https://wx.qlogo.cn/mmopen/vi_32/QOLWiasJQNXsx8kfqV7nWtZbJb8r1yg0hujfHlZV2ZbNjh0Qc112Y5WrjVUnJUc9qVugWU1uP6bMqMmsjfhotDg/132"
 *             "gender": 0
 *             "nickName": "cxmmao"
 *         }
 *    ]
 * }
 * 
 * @apiSuccess {Number} totalCommentNum                         评论的总数量
 * @apiSuccess {Number} curPage                                 当前页码
 * @apiSuccess {Object[]} commentList                           评论列表
 * @apiSuccess {Object} commentListItem                         评论列表的每一项，实际中不存在
 * @apiSuccess {String} commentListItem.commentId               评论的id
 * @apiSuccess {Number} commentListItem.userInfo                评论者的用户信息
 * @apiSuccess {String} commentListItem.userInfo.avatarUrl      头像
 * @apiSuccess {Number} commentListItem.userInfo.gender         性别
 * @apiSuccess {Number} commentListItem.userInfo.nickName       昵称
 * @apiSuccess {Number} commentListItem.list                    评论列表下的具体评论列表
 * @apiSuccess {Object} commentListItem.list.item               评论列表下的具体评论列表的每一项，实际中不存在
 * @apiSuccess {String} commentListItem.list.item.comment       评论的内容
 * @apiSuccess {String} commentListItem.list.item.commentListId 评论内容的id
 * @apiSuccess {String} commentListItem.list.item.createAt      评论的时间
 * @apiSuccess {Number} commentListItem.list.item.likeNum       喜欢的数量
 * @apiSuccess {Number} commentListItem.list.item.unLikeNum     不喜欢的数量
 */

  /**
 * @api {post} /comment/like-for-comment        给评论点赞
 * @apiVersion 1.0.0
 * @apiName LikeForComment
 * @apiGroup Comment
 *
 * @apiParam {String} goodsId                   商品id
 * @apiParam {String} userId                    用户id
 * @apiParam {String} commentId                 评论的id
 * @apiParam {String} commentListId             评论列表id
 * @apiParam {String} likeState                 点赞的状态
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "100001",
 *    "userId": "123456789012",
 *    "commentId": "5e199bea3f4a8362f8b381fd",
 *    "commentListId": "5e199bea3f4a8362f8b381fe",
 *    "likeState": "LIKE"
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "goodsId": "100001",
 *    "likeNum": 1,
 *    "unLikeNum": 0
 * }
 * 
 * @apiSuccess {String} goodsId                 商品的id
 * @apiSuccess {Number} likeNum                 喜欢的数量
 * @apiSuccess {Number} unLikeNum               不喜欢的数量
 */

 /**
 * @api {post} /comment/like-for-brief          给短评点赞
 * @apiVersion 1.0.0
 * @apiName LikeForBrief
 * @apiGroup Comment
 *
 * @apiParam {String} goodsId                   商品id
 * @apiParam {String} briefId                   短评id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "100001",
 *    "briefId": "5e199bea3f4a8362f8b381fd",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "briefItem":  {
 *        "briefId": "5e61c2c0c0236f7570c25981",
 *        "brief": "好好玩" 
 *        "color": "#ffffff",
 *        "likeNum": 1
 *    }
 * }
 * 
 * @apiSuccess {Object}     briefItem            短评对象
 * @apiSuccess {String}     briefItem.briefId    用户id
 * @apiSuccess {String}     briefItem.brief      短评
 * @apiSuccess {String}     briefItem.color      短评的颜色
 * @apiSuccess {Number}     briefItem.likeNum    点赞的数量
 */

 /**
 * @api {post} /comment/write-brief   写短评
 * @apiHeader {String} Authorization
 * @apiVersion 1.0.1
 * @apiName WriteBrief
 * @apiGroup Comment
 *
 * @apiParam {String} goodsId        商品id
 * @apiParam {String} brief          短评
 * @apiParam {String} color          短评的颜色
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "123456",
 *    "brief": "好好玩" 
 *    "color": "#ffffff"
 * }
 * 
 * @apiSuccess {Object}     briefItem            短评对象
 * @apiSuccess {String}     briefItem.briefId    用户id
 * @apiSuccess {String}     briefItem.brief      短评
 * @apiSuccess {String}     briefItem.color      短评的颜色
 * @apiSuccess {Number}     briefItem.likeNum    点赞的数量
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "briefItem":  {
 *        "briefId": "5e61c2c0c0236f7570c25981",
 *        "brief": "好好玩" 
 *        "color": "#ffffff",
 *        "likeNum": 1
 *    }
 * }
 */

  /**
 * @api {get} /comment/brief-list   获取短评列表
 * @apiHeader {String} Authorization
 * @apiVersion 1.0.1
 * @apiName GetBriefList
 * @apiGroup Comment
 *
 * @apiParam {String} goodsId        商品id
 * 
 * @apiParamExample {json} Request-Example:
 * {
 *    "goodsId": "123456",
 * }
 *
 * @apiSuccessExample Success-Response:
 * HTTP/1.1 200 OK
 * {
 *    "briefList": [{
 *       "brief": "这只猫好好看"
 *       "briefId": "5e11dd33cc1dc5142c64ea47"
 *       "likeNum": 0
 *       "color": "#ffffff"
 *    }]
 * }
 * 
 * @apiSuccess {Object[]}   briefList                    短评列表
 * @apiSuccess {Object}     briefListListItem            短评列表的每一项，实际中没有这个字段
 * @apiSuccess {String}     briefListListItem.userId     用户id
 * @apiSuccess {String}     briefListListItem.brief      短评
 * @apiSuccess {String}     briefListListItem.color      点赞的颜色
 * @apiSuccess {Number}     briefListListItem.likeNum    点赞的数量
 */

