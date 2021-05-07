/* 
 @author fxj 
			2021-04-27
 @version v0.1
 */

const APP_URL = 'https://t.mem.wmys9.com'

//GET请求封装
function getRequest(url, data) {
	return promise = new Promise((resolve, reject) => {
		let postData = data;
		if (uni.getStorageSync('token')) {
			postData.token = uni.getStorageSync('token')
		}
		uni.request({
			url: APP_URL + url,
			data: postData,
			method: "GET",
			dataType: 'json',
			header: {
				'content-type': 'application/json'
			},
			success: function(res) {
				if (res.statusCode === 200 && res.data.code === 1) {
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.msg || '请求失败',
						icon: 'none',
						duration: 2000
					})
				}
			},
			error: function(e) {
				uni.showToast({
					title: '网络错误',
					icon: 'none',
					duration: 2000
				})
			}
		});
	});
}


//post请求封装
function postRequest(url, data) {
	uni.showLoading({
		title: '加载中',
		mask: true
	});
	return new Promise((resolve, reject) => {
		var postData = data;
		if (uni.getStorageSync('token')) {
			postData.token = uni.getStorageSync('token')
		}
		uni.request({
			url: APP_URL + url,
			data: postData,
			method: 'POST',
			header: {
				'content-type': 'application/x-www-form-urlencoded',
			},
			success: function(res) {
				uni.hideLoading()
				if (res.statusCode === 200 && res.data.code === 1) {
					resolve(res.data);
				} else {
					uni.showToast({
						title: res.data.msg || '请求失败',
						icon: 'none',
						duration: 2000
					})
				}
			},
			error: function(e) {
				uni.showToast({
					title: '网络错误',
					icon: 'none',
					duration: 2000
				})
			}
		})
	});
}


export {
	postRequest,
	getRequest
}
