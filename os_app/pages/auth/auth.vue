<template>
	<view>
		  <view class='headView'>
			    <view class='headImageView'>
				<!--       <image class='headImage' src='/pages/imageSource/IMG_3456.png' mode='scaleToFill'></image> -->
				   
			</view>
			    <view class='titleText'>申请获取以下权限</view>
			    <view class='contentText'>获得您的公开信息(昵称,头像,手机等)</view>
			    <button class='authBtn' type='primary' open-type='getUserProfile' @click='bindGetUserInfo'>授权登录</button>
			  </view>
	</view>


</template>

<script>
	import {
		login,
	} from '../../common/http.js';

	export default {
		data() {
			return {
				canIUse: true,
				code: '',
				share_user_id: '',
				enter_type: '',
				p_id:''
			};
		},
		methods: {
			bindGetUserInfo() {
				let _this = this

				uni.getSetting({
					success(res) {
						console.log(res)
					},
					fail(req) {
						console.log('失败')
						console.log(req)
					}
				})

				uni.getUserProfile({
					desc: '您的公开信息（昵称、头像等）',
					success(res) {
						let sendData = {
							code: _this.code,
							signature: res.signature,
							rawData: res.rawData,
							encryptedData: res.encryptedData,
							iv: res.iv,
							share_user_id: _this.share_user_id,
							enter_type: _this.enter_type
						}
						login(sendData, (res) => {
							uni.setStorageSync('userInfo', res.data.userinfo);
							uni.setStorageSync('user_id', res.data.userinfo.user_id);
							uni.setStorageSync('token', res.data.userinfo.token);
							uni.showToast({
								title: '登陆成功',
								icon: 'success',
								duration: 2000
							})
							// if(_this.share_user_id){

							// }
							if(_this.p_id){
								uni.reLaunch({
									url: '../index/index?gid='+_this.p_id
								})
							}else{
								uni.reLaunch({
									url: '../index/index'
								})
							}
							
						})
					},
					fail(req) {
						uni.showToast({
							title: '用户拒绝授权',
							icon: 'none',
							duration: 2000
						})
					}
				})

			},
			onLoad(ops) {
				if (ops.uid) {
					this.share_user_id = ops.uid
				}
				if(ops.gid){
					this.p_id= ops.gid
				}
				uni.login({
					success: (info) => {
						this.code = info.code
					}
				})

			}
		},
	}
</script>

<style>
	.headView {

		margin: 90rpx 50rpx 90rpx 50rpx;
		/*上右下左*/

	}

	.headImageView {

		display: block;

		margin-left: 25px;

		margin-top: 25px;

		margin-right: 25px;

		margin-bottom: 0px;

		height: 50px;

	}

	.headImage {

		display: flex;

		width: 50px;

		height: 50px;

	}

	.titleText {

		margin-left: 25px;

		margin-top: 25px;

		margin-bottom: 10px;

		font-size: 14px;

		color: #020e0f;

		text-align: center;

	}

	.contentText {

		margin-left: 25px;

		margin-top: 0px;

		margin-bottom: 0px;

		font-size: 14px;

		color: #666;

		text-align: center;

	}

	.authBtn {

		margin-top: 35px;

		margin-left: 25px;

		margin-right: 25px;

		height: 45px;

		font-size: 17.5px;

	}
</style>
