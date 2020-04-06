export const config = {
    PORT: 3000,
    DB_URL: 'cat-mall',
    JWT_SERCRET: 'cxm',
    STATIC_IMAGES_PATH: '/static/cat-mall/images/',
    CUSTOM_IMAGES_PATH: 'avatar-url/',
    DEFAULT_IMAGES_PATH: 'default-avatar-url/',
    JWT_EXPIRES_TIME: 24 * 60 * 60 * 1,
    EMPTY_PARAM_TIP: '不能为空',
    MAX_BALANCE: 100000,
    DEFAULT_BALANCE: 10000,
    GOODS_PAGING_SIZE: 6,
    CART_PAGEING_SIZE: 6,
    ORDER_PAGE_SIZE: 6,
    COMMENT_PAGE_SIZE: 10,
    DEFAULT_PAGE: 0,
    RANDOM_LEN: 4, // 随机数组的长度
    EMAIL_TRANSPORT: {
        transport: 'SMTP',
        host: 'smtp.163.com',
        secureConnection: true,
        port: 465,
        // auth: {
        //     user: '1532917281@qq.com',
        //     pass: 'hkxngfubltybijbj'
        // }
        auth: {
            user: 'Cxmmao@163.com',
            pass: 'cxmdyt19979'
        }
    },
    EMAIL_OPTIONS: {
        from: 'Cxmmao@163.com',
        to: 'cxmmao_04@163.com',
        subject: 'Cxm 注册验证码',
        text: '',
    },
    RESOLVE_ERROR: {
        err: true
    }
}
