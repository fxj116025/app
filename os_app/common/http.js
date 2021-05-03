
/* 
 @author fxj 
			2021-04-27
 @version v0.1
 */

import {
	postRequest,
	getRequest
} from './request.js';


//授权登录
function login(data, callback) {
	postRequest('/user/miniLogin', data).then((res) => {
		callback(res)
	})
}

// 首页轮播请求
function home_swiper(data, callback) {
	postRequest('/index/lunbotu', data).then((res) => {
		callback(res)
	})
}

// 首页公告
function notice(data, callback){
	postRequest('/index/notice', data).then((res) => {
		callback(res)
	})
}

// 首页纪念馆
function home_memorials(data, callback) {
	postRequest('/index/memorial', data).then((res) => {
		callback(res)
	})
}
// 个人中心用户信息
function userInfo(data,callback){
	postRequest('/user/personalInfo', data).then((res) => {
		callback(res)
	})
}







export {
	login,
	home_swiper,
	notice,
	home_memorials,
	userInfo
}
