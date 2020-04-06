const axios = require('axios')

axios.post('http://127.0.0.1:3000/user/update_userinfo',{
    "userId": "1",
	userInfo: {
		nickName: "cxm",
		gender: "",
		avatarUrl: "http://cxm.png"
	}
}).then(res => {
    console.log(res)
})