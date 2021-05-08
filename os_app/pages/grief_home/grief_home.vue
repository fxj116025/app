<template>
	<view class="grief_home">
		<view class="grief_home_title" v-if="info.gone_user_details">
			<view class="grief_home_title_text">
				{{info.gone_user_details[0].content}}
			</view>
			<view class="grief_home_title_music">
				<image :src="ifplay?'../../static/images/yy.png':'../../static/images/jyy.png'" @click="playMusic" />
			</view>
			<view class="grief_home_title_share" @click="openShare">
				<image src="../../static/images/fx.png" />
			</view>
		</view>
		<!-- 内容 -->
		<view class="grief_home_content">
			<view class="item" v-for="(v,i) of info.gone_user_details" :key='i'>
				<view class="item_title" v-if="v.type=='title'&&i!=0">
					<view class="shu" />
					<view>
						{{v.content}}
					</view>
				</view>
				<view class="item_content" v-if="v.type=='content'">
					{{v.content}}
				</view>
				<view class="item_image" v-if="v.type=='image'">
					<template v-if="Object.prototype.toString.call(v.content) === '[object Array]'">
						<image :src="j" mode="widthFix" v-for="(j,t) of v.content" :key='t' />
					</template>
					<template v-else>
						<image :src="v.content" mode="widthFix" />
					</template>
				</view>
				<view class="item_vedio" v-if="v.type=='vedio'">
					<template v-if="Object.prototype.toString.call(v.content) === '[object Array]'">
						<video :src="j" v-for="(j,t) of v.content" :key='t' />
					</template>
					<template v-else>
						<video :src="v.content" />
					</template>

				</view>
			</view>
		</view>

		<!-- 数量 -->
		<view class="num_box">
			<view class="icon1">
				<image src="../../static/images/jx1.png" mode="aspectFit" />
				<view class="num_info">
					<view class="num_title">
						敬香
					</view>
					<view class="num">
						{{info.actions.jx}}人
					</view>
				</view>
			</view>
			<view class="icon1">
				<image src="../../static/images/ma1.png" mode="aspectFit" />
				<view class="num_info">
					<view class="num_title">
						默哀
					</view>
					<view class="num">
						{{info.actions.ma}}人
					</view>
				</view>
			</view>
		</view>
		<!-- 固定底部 -->
		<view class="grief_home_footer">
			<view class="footer_icon" @click="jx">
				<image src="../../static/images/jx.png"></image>
				<view>
					敬香
				</view>
			</view>
			<view class="footer_icon" @click="attention">
				<image src="../../static/images/jx.png"></image>
				<view>
					关注
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="share_box">
				<view class="share_box-top">
					<view class="fx_box">
						<image src="../../static/images/fenxiang.png" />
						<view class="fx_text">
							微信好友
						</view>
						<button type="primary" open-type="share"></button>
					</view>
					<view class="fx_box">
						<image src="../../static/images/fx1.png" @click="share_link" />
						<view class="fx_text">
							分享链接
						</view>
					</view>
				</view>
				<view class="segmentation" />
				<view class="share_box-bottom" @click="cancelShare">
					取消分享
				</view>
			</view>
		</uni-popup>
		<!-- <audio v-if="info.background_music" :src="info.background_music" loop='true' id="my_audio"></audio> -->
	</view>
</template>

<script>
	import {
		memorial_detail,
		memorialAction,
		execJobs
	} from '../../common/http.js'
	export default {
		data() {
			return {
				id: '',
				info: {},
				ifplay: true,
				innerAudioContext: null,
				aplay: null
			};
		},
		methods: {
			jx() {
				uni.navigateTo({
					url: '../pensive_home/pensive_home?id=' + this.id
				})
			},
			// 控制音乐
			playMusic() {
				this.ifplay = !this.ifplay
				if (this.ifplay) {
					this.innerAudioContext.play();
				} else {
					this.innerAudioContext.pause();
				}

			},
			// 关注
			attention() {
				let sendData = {
					memorial_id: this.id,
					action: 'gz'
				}
				memorialAction(sendData, (res) => {
					uni.showToast({
						title: '关注成功',
						icon: 'none',
						duration: 2000
					})
					execJobs({
						job_name: 'gz'
					}, (res) => {
						console.log(res)
					})
				})
			},
			// 打开分享
			openShare() {
				this.$refs.popup.open()
			},
			// 取消分享
			cancelShare() {
				this.$refs.popup.close()
			},
			// 链接
			share_link() {
				// uni.share({

				// })
			},
			
		},
		onLoad(option) {
			this.id = option.id
			let sendData = {
				memorial_id: option.id
			}
			memorial_detail(sendData, (res) => {
				this.info = res.data
				execJobs({
					job_name: 'gkjng'
				}, (res) => {
					console.log(res)
				})
			})
		},
		onShareAppMessage(res) {
			execJobs({
				job_name: 'fx'
			}, (res) => {
				console.log(res)
			})
		},
		mounted() {
			this.$nextTick(function() {
				this.innerAudioContext = uni.createInnerAudioContext();
				this.innerAudioContext.autoplay = true;
				this.innerAudioContext.loop = true;
				this.innerAudioContext.src = this.info.background_music
			})
		}
	}
</script>

<style lang="scss">
	.grief_home {
		// height: 100vh;
		min-height: 100vh;
		background-color: #fff;

		.grief_home_title {
			display: flex;
			align-items: center;
			box-sizing: border-box;
			padding: 20rpx;

			.grief_home_title_text {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
				// margin-right: 20rpx;
				font-size: 36rpx;
				font-weight: bold;
			}

			.grief_home_title_music {
				margin: 0 40rpx;
			}

			.grief_home_title_music,
			.grief_home_title_share {
				flex-shrink: 0;
				width: 40rpx;
				height: 40rpx;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.grief_home_content {
			box-sizing: border-box;

			// padding: 0 20rpx 0rpx 20rpx;
			.item_image {
				width: 100%;

				image {
					width: 100%;
				}
			}

			.item_title {
				// border-left: 5px solid #3D3E4E;
				display: flex;
				font-weight: bold;
				font-size: 38rpx;
				margin: 50rpx 0;

				.shu {
					width: 6px;
					height: 36rpx;
					background-color: #3D3E4E;
					margin-top: 8rpx;
					margin-right: 15rpx;
				}
			}

			.item_content {
				color: #333;
				font-size: 28rpx;
				margin: 50rpx 0;
			}

			.item_title,
			.item_content {
				box-sizing: border-box;
				padding: 0 20rpx;
			}

			.item_vedio {
				vedio {
					width: 100%;
				}
			}

			.item_image,
			.item_vedio {
				box-sizing: border-box;
				padding: 0 20rpx;
			}
		}

		.num_box {
			display: flex;
			align-items: center;
			justify-content: space-between;
			box-sizing: border-box;
			padding: 20rpx;
			padding-bottom: 120rpx;
			padding-top: 0;
			background-color: #f5f5f5;

			.icon1 {
				position: relative;

				image {
					width: 345rpx;
					height: 195rpx;
				}

				.num_info {
					position: absolute;
					top: 50%;
					left: 20rpx;
					transform: translateY(-50%);
					color: #fff;
					text-align: center;

					.num_title {
						font-size: 36rpx;
						font-weight: bold;
					}

					.num {
						margin-top: 5rpx;
						font-size: 26rpx;
					}
				}
			}
		}

		.grief_home_footer {
			position: fixed;
			left: 0;
			bottom: 0;
			background-color: #fff;
			width: 100%;
			height: 120rpx;
			z-index: 1;
			box-sizing: border-box;
			padding: 0 50rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.footer_icon {
				background-color: #8C8D9F;
				width: 300rpx;
				height: 80rpx;
				border-radius: 25px;
				display: flex;
				align-items: center;
				justify-content: center;
				color: #fff;
				font-size: 34rpx;

				image {
					width: 40rpx;
					height: 40rpx;
					margin-right: 20rpx;
				}
			}
		}

		.share_box {
			width: 100%;
			background-color: #fff;
			border-radius: 15px 15px 0 0;
			font-size: 30rpx;
			color: #333;

			// height: 200rpx;
			.share_box-top {
				display: flex;
				align-items: center;
				justify-content: space-around;
				text-align: center;
				padding: 60rpx 30rpx 30rpx 30rpx;

				.fx_box {
					position: relative;

					button {
						position: absolute;
						top: 0;
						left: 0;
						width: 140rpx;
						height: 140rpx;
						opacity: 0;
					}
				}

				image {
					display: block;
					margin: 0 auto;
					width: 140rpx;
					height: 140rpx;
					margin-bottom: 30rpx;
				}

			}

			.share_box-bottom {
				line-height: 100rpx;
				text-align: center;
			}
		}
	}
</style>
