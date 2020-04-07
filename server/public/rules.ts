import {
    fieldList,
    genderList,
    priceRangeList,
    sortTypeList,
    commentLikeStateList,
    rechargeKeys
} from './../config/constant'
import {
    testEmail,
    testPassword,
    testVerifyCode,
    testAddressId,
    test_id,
    testNumber,
    test_color,
    test_rate
} from './utils'

/**
 * 检验规则
 * 1、'' 判断是否为空
 * 2、[] 判断是否符合数组里面的值
 * 3、{} 递归判断对象里面的值是否为空
 * 4、() 判断是否符合函数里面的值
 * 5、optional 可选择的
 * 6、[{}] 递归数组判断对象里面的值是否为空
 */

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
    '/user/get-address': {
        userId: ''
    },
    '/user/post-address': {
        userId: '',
        name: '',
        phone: '',
        detailedAddress: '',
        completedAddress: '',
        addressTable: {
            province: {
                value: '',
                label: '',
            },
            city: {
                value: '',
                label: '',
            },
            area: {
                value: '',
                label: '',
            }
        }
    },
    '/user/put-address': {
        userId: '',
        addressId: test_id,
        name: '',
        phone: '',
        detailedAddress: '',
        completedAddress: '',
        addressTable: {
            province: {
                value: '',
                label: '',
            },
            city: {
                value: '',
                label: '',
            },
            area: {
                value: '',
                label: '',
            }
        }
    },
    '/user/delete-address': {
        userId: '',
        addressId: ''
    },
    '/user/goods-like-list': {
        userId: ''
    },
    '/user/comment-like-list': {
        userId: ''
    },
    '/user/goods-like': {
        userId: '',
        goodsId: ''
    },
    '/goods/goods-list': {
        priceRange: priceRangeList,
        currentPage: '',
        pagingSize: '',
        sortType: sortTypeList
    },
    '/goods/goods-detail': {
        goodsId: ''
    },
    '/goods/goods-info-list': {
        goodsIdList: ''
    },
    '/goods/get-more-goods-list': {
        maxLength: 'optional'
    },
    '/comment/comment-list': {
        goodsId: '',
        pageSize: 'optional',
        curPage: 'optional'
    },
    '/comment/write-comment': {
        userId: '',
        goodsId: '',
        comment: '',
        rate: test_rate
    },
    '/comment/brief-list': {
        goodsId: ''
    },
    '/comment/write-brief': {
        goodsId: '',
        userId: '',
        brief: '',
        color: test_color
    },
    '/comment/like-for-comment': {
        goodsId: '',
        userId: '',
        commentId: test_id,
        commentListId: test_id,
        likeState: commentLikeStateList
    },
    '/comment/like-for-brief': {
        goodsId: '',
        briefId: ''
    },
    '/account/paykey': {
        userId: '',
        email: testEmail,
        paykey: testVerifyCode,
        verifyCode: testVerifyCode
    },
    '/account/account': {
        userId: '',
    },
    '/account/recharge': {
        userId: '',
        rechargeKey: rechargeKeys,
        verifyCode: testVerifyCode
    },
    '/order/create-order': {
        userId: '',
        addressId: test_id,
        orderList: [{
            goodsId: '',
            purchaseNum: ''
        }]
    },
    '/order/pay-for-order': {
        userId: '',
        orderId: '',
        paykey: ''
    },
    '/order/order-list': {
        userId: '',
        currentPage: 'optional',
        pageSize: 'optional'
    },
    '/order/delete-order': {
        userId: '',
        orderId: ''
    },
    '/cart/get-cart': {
        userId: '',
        pageSize: 'optional',
        curPage: 'optional'
    },
    '/cart/put-cart': {
        userId: '',
        goodsId: '',
        goodsNum: ''  // 添加的数量
    },
    '/cart/post-cart': {
        userId: '',
        goodsId: '',
        goodsNum: ''  // 添加的数量
    },
    '/cart/delete-cart': {
        userId: '',
        goodsId: ''
    },
})