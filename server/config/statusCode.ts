/**
 * 2: userController
 * 3: goodsController
 * 5: commentController
 * 6: accountController
 * 7: orderController
 * 8: cartController
 */
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
    EMAIL_BEEN_USED: {
        code: 20401,
        msg: '该邮箱已被注册'
    },
    NICKNAME_BEEN_USED: {
        code: 20402,
        msg: '该昵称已被注册'
    },
    INVALID_VERIFY_CODE: {
        code: 20403,
        msg: '验证码不正确，请重新输入'
    },
    ADD_ADDRESS_NULL: {
        code: 20404,
        msg: '用户不存在，新增地址失败'
    },
    UPDATE_ADDRESS_NULL: {
        code: 20405,
        msg: '该地址信息不存在，更新地址失败'
    },
    DELETE_ADDRESS_NULL: {
        code: 20406,
        msg: '该地址信息不存在，删除地址失败'
    },
    UPDATE_LIKE_NULL: {
        code: 20407,
        msg: '点赞信息不存在，请重试'
    },
    FIND_LIKE_NULL: {
        code: 20408 ,
        msg: '用户不存在，点赞失败'
    },
    GET_LIKE_LIST_NULL: {
        code: 20409,
        msg: '用户不存在，获取商品点赞列表失败'
    },
    GET_USERINFO_NULL: {
        code: 20410,
        msg: '用户不存在，获取用户信息失败'
    },
    GET_COMMENT_LIKE_LIST_NULL: {
        code: 20411,
        msg: '用户不存在，获取评论点赞列表失败'
    },
    UPDATE_AVATARURL_NULL: {
        code: 20412,
        msg: '用户不存在，上传头像失败'
    },
    GET_GOODS_DETAIL_NULL: {
        code: 30401,
        msg: '该商品信息不存在'
    },
    UPDATE_GOODS_LIKE_NULL: {
        code: 30402,
        msg: '点赞商品不存在，点赞失败'
    },
    GET_COMMENT_LIST_NULL: {
        code: 30403,
        msg: '该商品不存在，获取评论列表失败'
    },
    WRITE_COMMENT_NULL: {
        code: 50401,
        msg: '该商品不存在，评论失败'
    },
    WRITE_BRIEF_NULL: {
        code: 50402,
        msg: '该商品不存在，短评失败'
    },
    FIND_BRIEF_NULL: {
        code: 50403,
        msg: '该商品不存在，获取短评列表失败'
    },
    FIND_COMMENT_NULL: {
        code: 50404,
        msg: '该商品或评论不存在，给评论点赞失败'
    },
    ADD_COMMENT_NULL: {
        code: 50405,
        msg: '该用户不存在，给评论点赞失败'
    },
    COMMENT_REPEAT_NULL: {
        code: 50406,
        msg: '您已点过赞，无需重复操作，给评论点赞失败'
    },
    UPDATE_USER_COMMENT_NULL: {
        code: 50407,
        msg: '用户或评论不存在，给评论点赞失败'
    },
    LIKE_FOR_BRIEF_NULL: {
        code: 50408,
        msg: '商品或短评不存在，给短评点赞失败'
    },
    UPDATE_PAYKEY_NULL: {
        code: 60401,
        msg: '用户不存在，更新密码失败'
    },
    RECHARGE_NULL: {
        code: 60402,
        msg: '用户不存在，充值失败'
    },
    BEYOND_MAX_BALANCE: {
        code: 60403,
        msg: '超出最大限额，余额最大限额为10万'
    },
    UNKNOWN_ERROR: {
        code: 99999,
        msg: '发生未知错误，请重试'
    },
    FIND_GOODS_INFO_NULL: {
        code: 70401,
        msg: '商品不存在，获取商品信息失败'
    },
    INVENTORY_IS_LOWS: {
        code: 70402,
        msg: '库存不足，创建订单失败'
    },
    SAVE_ORDER_NULL: {
        code: 70403,
        msg: '用户不存在，创建订单失败'
    },
    FIND_ORDER_NULL: {
        code: 70404,
        msg: '订单不存在，支付失败'
    },
    ORDER_STATE_HAS_PAID: {
        code: 70405,
        msg: '该订单已支付，支付失败'
    },
    BALANCE_IS_LESS: {
        code: 70406,
        msg: '余额不足，支付失败'
    },
    UPDATE_BALANCE_NULL: {
        code: 70407,
        msg: '用户或订单不存在，支付失败'
    },
    UPDATE_PAYMENT_NULL: {
        code: 70408,
        msg: '用户或订单不存在，支付失败'
    },
    FIND_USER_IN_ORDER_NULL: {
        code: 70409,
        msg: '用户不存在，创建订单失败'
    },
    DELETE_USER_ORDER_NULL: {
        code: 70410,
        msg: '用户或订单不存在，删除订单失败'
    },
    DELETE_ORDER_NULL: {
        code: 70411,
        msg: '用户或订单不存在，删除订单失败'
    },
    PAYKEY_INVALID: {
        code: 70412,
        msg: '支付密码不正确，请重试'
    },
    BALANCE_NOT_FOUND: {
        code: 70413,
        msg: '用户不存在，请重试'
    },
    ORDER_NOT_FOUND: {
        code: 70414,
        msg: '订单不存在，请重试'
    },
    UPDATE_SALE_VOLUME_FAILD: {
        code: 70415,
        msg: '更新销量失败，请重试'
    },
    FIND_THE_ADDRESS_NULL: {
        code: 70416,
        msg: '地址不存在，创建订单失败'
    },
    FIND_GOODSID_NULL: {
        code: 80401,
        msg: '该商品不存在，加入购物车失败'
    },
    ADD_CARTLIST_NULL: {
        code: 80402,
        msg: '用户不存在，加入购物车失败'
    },
    UPDATE_CARTLIST_NULL: {
        code: 80403,
        msg: '用户不存在，更新购物车失败'
    },
    DELETE_GOODS_IN_CART_NULL: {
        code: 80405,
        msg: '该用户或者购物车订单不存在，删除购物车失败'
    }
})