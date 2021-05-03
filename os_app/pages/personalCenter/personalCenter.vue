<template>
	<view class="personalCenter">
		<view class="personalCenter_info">
			<view class="person_portrait">
				<image :src="info.avatar" mode="aspectFill" />
				<view class="person_name">
					{{info.nickname}}
				</view>
			</view>

			<view class="sign_in">
				<view class="sign_in_btn">
					<image src="../../static/images/imhg.jpeg" />
					<view>
						签到
					</view>
				</view>
				<view class="sign_in_num">
					签到{{info.sign_days}}天
				</view>
			</view>
		</view>
		<view class="segmentation_center">

		</view>

		<!-- 菜单 -->
		<uni-list>
			<uni-list-item ellipsis='1'
				thumb='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				:clickable='true' :title="'福星：'+info.bless" to='../lucky_star/lucky_star'>
				<view class="go_look" slot='footer'>
					去看看
				</view>
			</uni-list-item>
			<uni-list-item ellipsis='1'
				thumb='https://vkceyugu.cdn.bspapp.com/VKCEYUGU-dc-site/460d46d0-4fcc-11eb-8ff1-d5dcf8779628.png'
				:clickable='true' title="我关注的纪念馆" link to='../attention/attention' />
		</uni-list>
	</view>
</template>

<script>
	import {
		userInfo
	} from '../../common/http.js';
	export default {
		data() {
			return {
				sign_num: 0,
				lucky_star_num: 0,
				info: null
			}
		},
		mounted() {
			this.getUserInfo()
		},
		methods: {
			// 获取个人信息
			getUserInfo() {
				userInfo({}, (res) => {
					this.info = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	.personalCenter {
		.personalCenter_info {
			height: 400rpx;
			background-color: #3D3E4E;
			width: 100%;
			display: flex;
			justify-content: center;
			position: relative;

			.person_portrait {
				box-sizing: border-box;
				padding-top: 70rpx;

				image {
					width: 160rpx;
					height: 160rpx;
					border-radius: 50%;
					display: block;
					margin: 0 auto 25rpx auto;
				}

				.person_name {
					font-weight: bold;
					font-size: 40rpx;
					color: #fff;
				}
			}

			.sign_in {
				position: absolute;
				right: 30rpx;
				top: 50rpx;

				.sign_in_btn {
					width: 170rpx;
					height: 60rpx;
					border-radius: 20px;
					background-color: #54567E;
					display: flex;
					align-items: center;
					justify-content: space-between;
					box-sizing: border-box;
					padding: 0 30rpx;
					color: #fff;
					font-size: 25rpx;
					white-space: nowrap;

					image {
						width: 32rpx;
						height: 32rpx;
					}
				}

				.sign_in_num {
					text-align: center;
					color: #fff;
					margin-top: 10rpx;
					font-size: 24rpx;
				}
			}
		}

		.segmentation_center {
			width: 100%;
			height: 30rpx;
			background-color: #F5F5F5;
		}

		.go_look {
			padding: 10rpx 25rpx;
			color: #fff;
			border-radius: 20px;
			background-color: #3D3E4E;
			display: flex;
			align-items: center;
			font-size: 26rpx;
		}
	}
</style>
