
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

// 任务公共接口
function execJobs(data,callback){
	postRequest('/user/execJobs', data).then((res) => {
		callback(res)
	})
}

// 用户行为
function memorialAction(data,callback){
	postRequest('/memorial/action', data).then((res) => {
		callback(res)
	})
}



// 任务列表
function blessJobs(data,callback){
	postRequest('/user/blessJobs', data).then((res) => {
		callback(res)
	})
}
// 祭品列表
function sacrifice(data,callback){
	postRequest('/memorial/sacrifice', data).then((res) => {
		callback(res)
	})
}


// 纪念馆主页Html
function memorial_detail(data,callback){
	postRequest('/memorial/detail', data).then((res) => {
		callback(res)
	})
}
// 纪念馆数据
function staticDetail(data,callback){
	postRequest('/memorial/staticDetail', data).then((res) => {
		callback(res)
	})
}
// 纪念馆留言
function memorialSorrow(data,callback){
	postRequest('/memorial/sorrow', data).then((res) => {
		callback(res)
	})
}

// 关注的纪念馆
function userMyFocus(data,callback){
	postRequest('/user/myFocus', data).then((res) => {
		callback(res)
	})
}

// 支付配置
function getPayConf(data,callback){
	postRequest('/recharge_log/getPayConf', data).then((res) => {
		callback(res)
	})
}
// 充值
function recharge(data,callback){
	postRequest('/recharge_log/createOrder', data).then((res) => {
		callback(res)
	})
}






export {
	login,
	home_swiper,
	notice,
	home_memorials,
	userInfo,
	execJobs,
	blessJobs,
	sacrifice,
	memorial_detail,
	staticDetail,
	memorialSorrow,
	userMyFocus,
	memorialAction,
	recharge,
	getPayConf
}
