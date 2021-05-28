<template>
	<view class="grief">
		<!-- 头部输入 -->
		<view class="header_title">寄哀思：</view>
		<textarea v-model.trim="grief" placeholder="抒写您的哀思" class="grief-input" />

		<!-- 祭品 -->
		<view class="header_title title">
			<view>祭品：</view>
			<view class="jip">祭品</view>
		</view>
		<!-- 列表 -->
		<view class="jip_list">
			<oblation v-for="(v,i) of pitchoOblation" :key='i' :info="v" />
			<view class="add_box">
				<image src="../../static/images/add.png" mode="aspectFill" @click="add" class="add_img" />
			</view>

		</view>

		<!-- 确认 -->
		<view class="sendGrief" @click="sendGrief">
			寄哀思
		</view>

		<!-- 弹窗 -->
		<uni-popup ref="popup" type="bottom">
			<view class="popup_box">
				<!-- 头部 -->
				<view class="popup_header">
					<view class="popup_header_item" @click="cutTab(1)">
						<view class="popup_header_title" :class="tab==1?'activeTab':''">
							祭祀用品
						</view>
						<view :class="tab==1?'xian':''" class="x" />

					</view>
					<view class="popup_header_item" @click="cutTab(2)">
						<view class="popup_header_title" :class="tab==1?'':'activeTab'">
							祭祀食品
						</view>
						<view :class="tab==1?'':'xian'" class="x" />
					</view>
				</view>

				<!-- 用品列表 -->
				<swiper class="swiper_box" @change='swiper_change' :current='tab-1'>
					<swiper-item class="swiper_item">
						<scroll-view class="swiper_item_scroll" scroll-y="true">
							<view class="scroll_box">
								<oblation v-for='(v,i) of oblationList1' :is_add="true" :info="v"
									@select_item='select_item'
									:add='pitchoOblation.findIndex((val) => v.id == val.id)!=-1' :key='i' />
							</view>
						</scroll-view>
					</swiper-item>
					<swiper-item class="swiper_item">
						<scroll-view class="swiper_item_scroll" scroll-y="true">
							<view class="scroll_box">
								<oblation v-for='(v,i) of oblationList2' :is_add="true" :info="v" :key='i'
									@select_item='select_item'
									:add='pitchoOblation.findIndex((val) => v.id == val.id)!=-1' />
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>


				<!-- 购买 -->
				<view class="pay">
					<view class="pay_btn" @click="purchase">
						立即购买
					</view>
				</view>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import oblation from '../../components/oblation/oblation.vue'
	import {
		sacrifice,
		memorialSorrow,
		execJobs
	} from '../../common/http.js'
	export default {
		data() {
			return {
				grief: '',
				oblationList: [],
				tab: 1,
				oblationList1: [],
				oblationList2: [],
				pitchoOblation: [],
				id: '',
			};
		},
		components: {
			oblation
		},
		mounted() {
			for (let i = 0; i < 2; i++) {
				this.getOblation(i)
			}

		},
		onLoad(ops) {
			this.id = ops.id
		},
		methods: {
			add() {
				this.$refs.popup.open()
			},
			cutTab(num) {
				this.tab = num
			},
			swiper_change(e) {
				this.tab = e.detail.current + 1
			},
			//获取祭品
			getOblation(i) {
				let sendData = {
					type: i
				}
				sacrifice(sendData, (res) => {
					if (i === 0) {
						this.oblationList1 = res.data
					} else {
						this.oblationList2 = res.data
					}
				})
			},
			//选择祭品
			select_item(item) {
				let i = this.pitchoOblation.findIndex((val) => item.id == val.id)
				if (i != -1) {
					this.pitchoOblation.splice(i, 1)
				} else {
					this.pitchoOblation.push(item)
				}

			},
			//确认祭品
			purchase() {
				this.$refs.popup.close()
			},
			// 寄哀思
			sendGrief() {
				if (!this.grief&&this.pitchoOblation.length===0) {
					uni.showToast({
						title: '请选择祭品或留言',
						icon: 'none',
						duration: 2000
					})
					return
				}
				let list = this.pitchoOblation.map(val => val.id).join(','),
					sendData = {
						memorial_id: this.id,
						content: this.grief,
						sacrifice_ids: list
					}

				memorialSorrow(sendData, (res) => {
					// console.log(res)
					uni.showToast({
						title: '留言成功',
						icon: 'none',
						duration: 2000
					})
					if (this.pitchoOblation.length > 0) {
						execJobs({
							job_name: 'jb'
						}, (res) => {
							console.log(res)
						})
					}

					setTimeout(() => {
						uni.navigateBack({
							delta: 1
						})
					}, 1000)
				})
				// console.log(sendData)
			}
		}
	};
</script>

<style lang="scss">
	.grief {
		min-height: 100vh;
		background-color: #f5f5f5;

		.header_title {
			font-size: 32rpx;
			color: #333;
			box-sizing: border-box;
			padding: 25rpx;
			font-weight: bolder;
		}

		.grief-input {
			background-color: #fff;
			width: 100%;
			box-sizing: border-box;
			padding: 25rpx;
			height: 380rpx;
		}

		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.jip {
				background-color: #FF9E13;
				color: #fff;
				border-radius: 20px;
				width: 140rpx;
				text-align: center;
				line-height: 64rpx;
				font-weight: 500;
			}
		}

		.jip_list {
			background-color: #fff;
			display: grid;
			flex-wrap: wrap;
			box-sizing: border-box;
			padding: 20rpx;
			grid-template-columns: repeat(4, 1fr);

			// justify-content: space-between;
			.add_box {
				width: calc((100vw - 40rpx) /4);
				margin-top: 10rpx;

				.add_img {
					margin: 0 auto;
					display: block;
					width: 140rpx;
					height: 140rpx;
					border: 1px solid transparent;
				}
			}

		}

		.sendGrief {
			background-color: #3D3E4E;
			color: #fff;
			width: 80%;
			line-height: 100rpx;
			text-align: center;
			margin: 100rpx auto 50rpx auto;
			border-radius: 5px;
		}

		.popup_box {
			background-color: #FFFFFF;
			border-radius: 10px 10px 0 0;
			width: 100%;

			.popup_header {
				display: flex;
				align-items: center;
				width: 100%;
				border-bottom: 1px solid #F5F5F5;
				padding: 30rpx 0 15rpx 0;

				.popup_header_item {
					width: 50%;
					text-align: center;
					color: #3D3E4E;
					font-size: 28rpx;

					.activeTab {
						color: #FF9E13;
					}

					.x {
						margin: 0 auto;
						height: 4px;
						width: 60rpx;
						margin-top: 15rpx;
					}

					.xian {
						background-color: #FF9E13;
					}
				}
			}

			.swiper_box {
				height: 800rpx;
				width: 100%;

				.swiper_item {
					height: 800rpx;
					width: 100%;

					.swiper_item_scroll {
						width: 100%;
						height: 800rpx;

						.scroll_box {
							width: 100%;
							background-color: #fff;
							display: grid;
							box-sizing: border-box;
							padding: 20rpx;
							overflow-y: auto;
							grid-template-columns: repeat(4, 1fr);
						}
					}

					// grid-template-rows: auto auto auto auto;
				}
			}

			.pay {
				height: 110rpx;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 100%;

				.pay_btn {
					width: 80%;
					height: 85rpx;
					border-radius: 20px;
					background-color: #FF9E13;
					font-size: 30rpx;
					color: #fff;
					text-align: center;
					line-height: 85rpx;
				}
			}
		}
	}
</style>
