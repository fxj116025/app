<template>
	<view class="lucky_star">
		<view class="personalCenter_info">
			<view class="person_portrait">
				<view class="lucky_star_num">
					{{luckyStarNum}}
				</view>
				<view class="lucky_star_text">
					当前福星
				</view>
				<view class="lucky_star_pay" @click="open_pay">
					充值福星
				</view>
			</view>
		</view>

		<!-- 菜单 -->
		<uni-list>
			<uni-list-item ellipsis='1'>
				<view class="task_text" slot='header'>
					做任务领积分
				</view>
				<view class="toDayIntegral" slot='footer'>
					<view>
						今日已获得福星：
					</view>
					<view class="integral_num">
						{{toDay_num}}
					</view>
				</view>
			</uni-list-item>

			<uni-list-item v-for="(v,i) of list.user_jobs" :key='i'>
				<view class="row_icon" slot='header'>
					<image :src="'../../static/images/'+i+'_icon.png'" mode="aspectFill" />
				</view>
				<view class="row_info" slot='body'>
					<view class="row_info_top">
						{{v.job_name}}
					</view>
					<view class="row_info_center">
						{{v.everytime_job_bless}}福星/
						<text v-if="i=='dl'">每日首次登录</text>
						<text v-if="i=='jax'">每日寄一句哀思</text>
						<text v-if="i=='gkjng'">每日有效观看一个纪念馆</text>
						<text v-if="i=='fx'">每日分享一个纪念馆</text>
						<text v-if="i=='gz'">每日关注一个纪念馆</text>
						<text v-if="i=='jb'">每日祭拜一个纪念馆</text>
						<text v-if="i=='yqhy'">每邀请一个好友</text>
						<text v-if="i=='qd'">每签到一天</text>
					</view>
					<view class="row_info_bottom">
						已获{{v.everyday_obtained_bless}}福星/每日上限{{v.everyday_bless_uplimit}}福星
					</view>
				</view>
				<view class="row_btn_box" slot='footer'>
					<view class="row_btn" v-if="v.everyday_obtained_bless==v.everyday_bless_uplimit">
						已完成
					</view>
					<view class="row_btn" v-else @click="task(i)">
						<text v-if="i=='dl'">未完成</text>
						<text v-if="i=='jax'">去寄语</text>
						<text v-if="i=='gkjng'">去观看</text>
						<text v-if="i=='fx'">去分享</text>
						<text v-if="i=='gz'">未完成</text>
						<text v-if="i=='jb'">去寄语</text>
						<text v-if="i=='yqhy'">去邀请</text>
						<text v-if="i=='qd'">去签到</text>
					</view>
				</view>
			</uni-list-item>

		</uni-list>
		<!-- 弹出层 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<!-- 头部 -->
				<view class="popup_header">
					<view class="popup_header_icon" @click="closePop">
						<uni-icons type="arrowleft" size="24" />
					</view>

					<view class="popup_header_text">
						充值福星
					</view>
				</view>
				<!-- 充值选项 -->
				<view class="commodity_box">
					<!-- 标题 -->
					<view class="commodity_box_title">
						购买数量
					</view>
					<!-- 列表 -->
					<view class="commodity_list">
						<view class="commodity_item" :class="selectRecharge==i?'commodity_item_active':''"
							v-for="(v,i) of rechargeList" :key='i' @click="selectPrice(i)">
							<view class="commodity_num">
								{{v.bless_num}}福星
							</view>
							<view class="commodity_price">
								售价￥{{v.amount}}
							</view>
						</view>
					</view>
					<view class="segmentation">

					</view>

					<!-- 自定义数量 -->
					<view class="custom_num_box">
						<!-- 标题 -->
						<view class="commodity_box_title">
							更多数量
						</view>
						<!-- 输入框 -->
						<view class="custom_num_input">
							<input type="text" v-model="recharge_num" @input="input_price" />
						</view>
						<view class="custom_num_hint">
							人民币与福星的充值比例 1：100
						</view>
					</view>

					<!-- 支付按钮 -->
					<view class="buy_box">
						<view class="buy_btn" @click="atOnce_pay">
							立即支付（￥{{returnFloat}}）
						</view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>


</template>

<script>
	import {
		blessJobs,
		userInfo,
		recharge,
		getPayConf,
		execJobs,
		qr_code
	} from '../../common/http.js'
	export default {
		data() {
			return {
				luckyStarNum: 0,
				toDayGetIntegral: 0,
				selectRecharge: 0,
				select_num: 0,
				recharge_num: '',
				list: {},
				rechargeList: [],

			};
		},
		methods: {
			// 获取个人信息
			getUserInfo() {
				userInfo({}, (res) => {
					this.luckyStarNum = res.data.bless
				})
			},
			// 打开充值弹出
			open_pay() {
				this.selectRecharge = 0;
				this.recharge_num = '';
				this.select_num = this.rechargeList[0].amount
				this.$refs.popup.open()
			},
			// 关闭弹窗
			closePop() {
				this.$refs.popup.close()
			},
			//选择金额
			selectPrice(i) {
				this.selectRecharge = i
				this.select_num = this.rechargeList[i].amount
			},
			// 输入金额
			input_price() {
				this.selectRecharge = -1
			},
			// 获取支付配置
			getPay() {
				getPayConf({}, (res) => {
					console.log(res)
					this.rechargeList = res.data
				})
			},
			// 支付
			atOnce_pay() {
				let num = '',
					id = '',
					_this = this
				if (this.selectRecharge != -1) {
					// num = this.rechargeList[this.selectRecharge].bless_num
					id = this.rechargeList[this.selectRecharge].id
				} else {
					num = this.recharge_num
				}
				let sendData = {
					amount: num,
					pay_conf_id: id,
					remark: ''
				}
				recharge(sendData, (res) => {
					uni.showLoading({
						title: '支付中',
						mask: true
					});
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: String(res.data.timeStamp),
						nonceStr: res.data.nonceStr,
						package: res.data.package,
						signType: res.data.signType,
						paySign: res.data.paySign,
						success(res) {
							uni.showModal({
								content: '充值成功',
								showCancel: false
							})
							_this.getUserInfo()
							_this.closePop()
						},
						fail(req) {
							uni.showToast({
								title: '支付失败',
								icon: 'none',
								duration: 2000
							})
						},
						complete() {
							uni.hideLoading()
						}
					})

				})

				// uni.showToast({
				// 	title: '本次购买' + num + '个,需要支付' + this.returnFloat + '元,id为' + id,
				// 	icon: 'none',
				// 	duration: 5000
				// })
			},
			init() {
				blessJobs({}, (res) => {
					// console.log(res)
					this.list = res.data
					// for (let v in res.data.user_jobs) {
					// 	this.list.push(res.data.user_jobs[v])
					// }
				})
			},
			// 做任务
			task(type) {
				// execJobs()
				console.log(type)
				switch (type) {
					case 'gkjng':
					case 'jax':
					case 'fx':
					case 'gz':
					case 'jb':
						uni.navigateTo({
							url: '../memorial_hall/memorial_hall'
						})
						break;
					case 'qd':
						uni.navigateTo({
							url: '../personalCenter/personalCenter'
						})
						break;
					case 'yqhy':
						let sendData = {
							page: 'pages/index/index?uid=' + uni.getStorageSync('user_id'),
							width: '300',
						}
						qr_code(sendData, (res) => {
							uni.downloadFile({
								url: res.data.qrcode_url,
								success(img_res) {
									if (img_res.statusCode === 200) {
										let path = img_res.tempFilePath
										uni.saveImageToPhotosAlbum({
											filePath: path,
											success(down_res) {
												uni.showToast({
													title: '二维码保存成功',
													duration: 2000,
													icon: 'success'
												})
											},
											fail(req) {
												uni.showToast({
													title: '操作失败',
													duration: 2000,
													icon: 'none'
												})
											}
										})
									} else {
										uni.showToast({
											title: '操作失败',
											duration: 2000,
											icon: 'none'
										})
									}
								},
								fail(req) {
									uni.showToast({
										title: '操作失败',
										duration: 2000,
										icon: 'none'
									})
								}
							})

						})
						break;
					default:
						break;
				}
			}
		},
		mounted() {
			this.getUserInfo()
			this.init()
			this.getPay()
			// this.$refs.popup.open()
		},
		computed: {
			returnFloat() {
				let f
				if (this.selectRecharge != -1) {
					f = Number(this.select_num);
				} else {
					f = Number(this.recharge_num / 100);
				}
				f = Math.floor(f * 100) / 100;
				let s = f.toString();
				let rs = s.indexOf('.');
				if (rs < 0) {
					rs = s.length;
					s += '.';
				}
				while (s.length <= rs + 2) {
					s += '0';
				}
				return s
			},
			toDay_num() {
				let num = 0
				for (let i in this.list.user_jobs) {
					num += Number(this.list.user_jobs[i].everyday_obtained_bless)
				}
				return num
			}
		}
	}
</script>

<style lang="scss">
	// 渐变 左到右
	@function gradual($color1, $color2) {
		@return linear-gradient(to right, $color1, $color2);
	}

	.lucky_star {
		.personalCenter_info {
			height: 400rpx;
			background-color: #F5F5F5;
			width: 100%;
			display: flex;
			justify-content: center;

			.person_portrait {
				box-sizing: border-box;
				padding-top: 80rpx;
				color: #333;
				text-align: center;

				.lucky_star_num {
					font-size: 100rpx;
					font-weight: bolder;
				}

				.lucky_star_text {
					font-size: 24rpx;
					margin: 15rpx 0 30rpx 0;
				}

				.lucky_star_pay {
					width: 200rpx;
					height: 70rpx;
					border-radius: 20px;
					line-height: 70rpx;
					color: #fff;
					font-size: 24rpx;
					background: gradual(#FF8000, #FF3734);
				}
			}
		}

		.task_text {
			font-size: 34rpx;
			font-weight: bold;
		}

		.toDayIntegral {
			display: flex;
			align-items: center;
			font-size: 26rpx;

			.integral_num {
				font-weight: bold;
				color: #FF9E13;
			}
		}

		.row_icon {
			display: flex;
			align-items: center;

			image {
				width: 100rpx;
				height: 100rpx;
				border-radius: 50%;
			}
		}

		.row_info {
			.row_info_top {
				font-weight: bold;
				color: #333;
			}

			font-size: 32rpx;
			margin-left: 30rpx;

			.row_info_center {
				// margin: 1rpx 0 10rpx 0;
			}

			.row_info_center,
			.row_info_bottom {
				font-size: 24rpx;
				color: #666;
			}
		}

		.row_btn_box {
			position: absolute;
			right: 30rpx;
			top: 50%;
			transform: translateY(-50%);

			display: flex;
			align-items: center;

			.row_btn {
				background: gradual(#FF9155, #FFC36C);
				padding: 12rpx 35rpx;
				color: #fff;
				font-size: 26rpx;
				border-radius: 20px;
			}
		}

		.popup_box {
			width: 100%;
			background-color: #fff;
			border-radius: 10px 10px 0 0;

			.popup_header {
				position: relative;
				height: 100rpx;
				text-align: center;
				border-bottom: 1px solid #F5F5F5;

				.popup_header_icon {
					position: absolute;
					left: 20rpx;
					top: 50%;
					transform: translateY(-50%);
				}

				.popup_header_text {
					// height: 100%;
					line-height: 100rpx;
				}
			}

			.commodity_box_title {
				font-size: 26rpx;
				color: #333333;
			}

			.commodity_box {
				box-sizing: border-box;
				padding: 20rpx;

				.commodity_list {
					display: flex;
					flex-wrap: wrap;
					align-items: center;
					justify-content: space-between;
					padding-bottom: 20rpx;

					.commodity_item {
						box-sizing: border-box;
						border: 1px solid #C1C1C1;
						border-radius: 10px;
						padding: 20rpx;
						width: calc((100% - 40rpx) / 3);
						margin-top: 20rpx;

						.commodity_num {
							color: #3D3E4E;
							font-size: 36rpx;
							margin-bottom: 5rpx;
							font-weight: bolder;
						}

						.commodity_price {
							color: #3D3E4E;
							font-size: 26rpx;
							text-indent: 10rpx;
						}
					}

					.commodity_item_active {
						background: gradual(#FF8000, #FF3734);
						border: none;

						view {
							color: #fff !important;
						}
					}
				}

				.custom_num_box {
					padding-top: 20rpx;

					.custom_num_input {
						input {
							margin-top: 20rpx;
							height: 60rpx;
							border: none;
							border-bottom: 1px solid #C1C1C1;
							font-size: 42rpx;
						}
					}

					.custom_num_hint {
						color: #666;
						font-size: 26rpx;
						margin-top: 10rpx;
					}
				}

				.buy_box {
					display: flex;
					align-items: center;
					justify-content: center;
					width: 100%;
					margin-top: 80rpx;

					.buy_btn {
						width: 90%;
						background-color: #FF9E13;
						border-radius: 20px;
						text-align: center;
						color: #fff;
						font-size: 30rpx;
						line-height: 80rpx;
					}
				}
			}
		}
	}
</style>
