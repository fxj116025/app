<template>
	<!-- <scroll-view class="pensive_home" scroll-y='true' @scrolltolower='scrollBottom'> -->
	<view class="pensive_home">
		<!-- 头部 -->
		<view class="worship_header" :style="'background-image:url(' + bgImg + ')'">
			<!-- 顶上按钮 -->
			<view class="top_btn">
				<view class="top_btn_yy">
					<image :src="YY" :class="is_play ? 'active_yy' : ''" @click="is_music" />
				</view>
				<view class="top_btn_num">
					<image src="../../static/images/fx2.png"/>
					<view class="fx_num">{{info.user_bless}}</view>
				</view>
			</view>

			<!-- 左边 -->
			<view class="left_col">
				<view class="left_col_row" v-for="(v, i) of left" :key="i" :style="{backgroundColor:leftBtn}">
					<image :src="v.icon" />
					<view class="text">{{ v.title }}</view>
				</view>
			</view>
			<!-- 头像 -->
			<image :src="info.gone_user_avatar" mode="aspectFill" class="icon" :style="{top:imgTop+'rpx'}" />

			<!-- 信息 -->
			<view class="info" :style="{top:infotop+'rpx'}">
				<view class="name">{{info.gone_user_name}}</view>
				<view class="sex">{{info.gender===0?'女':'男'}}</view>
				<view class="time">{{info.gone_user_years}}</view>
			</view>
		</view>

		<view class="comment">
			<!-- 数量 -->
			<view class="worship_num">
				<view class="worship_item" v-for="(v, i) of list" :key="i">
					<view class="worship_item_num">{{ v.num }}</view>
					<view class="worship_item_title">{{ v.title }}</view>
				</view>
			</view>
			<view class="segmentation" />

			<!-- 祭拜列表 -->
			<view class="worship_list" v-if="info.sorrows">
				<view class="worship_item" v-for="(v, i) of info.sorrows" :key="i">
					<view class="item">
						<view class="item_top flex_box">
							<view class="item_top_left">
								<image :src="v.user.avatar" mode="aspectFill" />
							</view>
							<view class="item_top_right flex_box">
								<view class="item_right_top">{{ v.user.nickname }}</view>
								<view class="item_right_bottom flex_box">
									<view class="item_right_bottom_item" v-for="(j,t) of v.sacrifices" :key='t'>
										<image :src="j.image" />
										<view class="item_right_bottom_title">{{j.name}}</view>
									</view>
								</view>
							</view>
						</view>

						<view class="item_center">{{ v.content }}</view>

						<view class="item_bottom">{{ format(v.createtime) }}为逝者祭拜</view>
					</view>

					<view class="segmentation" />
				</view>
				<!-- <uni-load-more :status="more"></uni-load-more> -->
			</view>

		</view>

		<!-- 底部 -->
		<view class="send_grief flex_box">
			<view class="send_grief_btn" @click="go_grief">
				寄哀思
			</view>
		</view>
	<!-- </scroll-view> -->
	</view>
</template>

<script>
	import {
		staticDetail
	} from '../../common/http.js'
	import {
		imaga64
	} from '../../common/base64.js';

	import yy from '../../static/images/yy2.png';
	import jyy from '../../static/images/jyy2.png';
	export default {
		data() {
			return {
				id: '',
				info: {},
				list: [{
						title: '敬香',
						num: 0
					},
					{
						title: '蜡烛',
						num: 0
					},
					{
						title: '花圈',
						num: 0
					},
					{
						title: '扫墓',
						num: 0
					}
				],
				more: 'more', //more/loading/noMore
				type: -1,
				bgImg: '',
				imgTop: 225,
				infotop: 500,
				leftBtn: '#3D3E4E',
				YY: yy,
				is_play: true,
				innerAudioContext: null,
				// left: [{
				// 		title: '敬香',
				// 		icon: '../../static/images/jx2.png'
				// 	},
				// 	{
				// 		title: '蜡烛',
				// 		icon: '../../static/images/lz.png'
				// 	},
				// 	{
				// 		title: '花圈',
				// 		icon: '../../static/images/hq.png'
				// 	},
				// 	{
				// 		title: '扫墓',
				// 		icon: '../../static/images/sm.png'
				// 	},
				// ]
			};
		},
		methods: {
			is_music() {
				this.is_play = !this.is_play;
				this.is_play ? this.YY = yy : this.YY = jyy
				if (this.is_play) {
					this.innerAudioContext.play();
				} else {
					this.innerAudioContext.pause();
				}
			},
			// 上拉加载更多
			scrollBottom() {},
			// 去寄哀思、
			go_grief() {
				uni.navigateTo({
					url: '../grief/grief?id=' + this.id
				})
			},

			format(time) {
				let date = new Date(time * 1000);
				let Y = date.getFullYear() + '-';
				let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
				let D = date.getDate() + ' ';
				let h = (date.getHours() < 10 ? '0' + (date.getHours()) : date.getHours()) + ':';
				let m = (date.getMinutes() < 10 ? '0' + (date.getMinutes()) : date.getMinutes()) + ':';
				let s = (date.getSeconds() < 10 ? '0' + (date.getSeconds()) : date.getSeconds());
				return (Y + M + D + h + m + s);
			},

		},
		onHide() {
			if (this.innerAudioContext) {
				this.innerAudioContext.stop()
			}
		},
		destroyed() {
			if (this.innerAudioContext) {
				this.innerAudioContext.stop()
			}
		},
		onShow() {
			staticDetail({
				memorial_id: this.id
			}, (res) => {
				this.info = res.data
				this.list[0].num = res.data.actions.jx
				this.list[1].num = res.data.actions.lz
				this.list[2].num = res.data.actions.hq
				this.list[3].num = res.data.actions.sm
			})
		},
		onLoad(ops) {
			this.id = ops.id
		},
		components: {
			// worship
		},
		watch: {
			info(data) {
				if (data.background_music) {
					this.$nextTick(function() {
						if (this.innerAudioContext) {
							this.innerAudioContext.destroy()
						}
						this.innerAudioContext = uni.createInnerAudioContext();
						this.innerAudioContext.autoplay = true;
						this.innerAudioContext.loop = true;
						this.innerAudioContext.src = data.background_music
						// this.innerAudioContext.src = 'http://antiserver.kuwo.cn/anti.s?useless=/resource/&format=mp3&rid=MUSIC_149779983&response=res&type=convert_url&'
						this.is_play = true
						this.YY = yy
					})

				}
				this.type = data.cover_image_type

				switch (this.type) {
					case 1:
						this.bgImg = imaga64.bg1;
						this.imgTop = 225;
						this.infotop = 425;;
						this.leftBtn = '#3D3E4E';
						break;
					case 2:
						this.bgImg = imaga64.bg2;
						this.imgTop = 140;
						this.infotop = 350;;
						this.leftBtn = 'rgba(50,79,121,.8)';
						break;
					case 3:
						this.bgImg = imaga64.bg3;
						this.imgTop = 225;
						this.infotop = 500;
						this.leftBtn = '#3D3E4E';
						break;
					default:
						this.bgImg = imaga64.bg1;
						this.imgTop = 225;
						this.infotop = 425;;
						this.leftBtn = '#3D3E4E';
						break;
				}
			}
		}
	};
</script>

<style lang="scss">
	@-webkit-keyframes animal {
		0% {
			transform: rotate(-360deg);
			-ms-transform: rotate(-360deg);
			-webkit-transform: rotate(-360deg);
		}

		100% {
			transform: rotate(0deg);
			-ms-transform: rotate(0deg);
			-webkit-transform: rotate(0deg);
		}
	}

	.worship_header {
		width: 100%;
		height: 700rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;

		.top_btn {
			display: flex;
			box-sizing: border-box;
			padding: 25rpx 50rpx;
			width: 100%;
			justify-content: space-between;

			.active_yy {
				-webkit-animation: animal 3s infinite linear;
				-webkit-transform-origin: center center;
				-ms-transform-origin: center center;
				transform-origin: center center;
			}

			.fx_num {
				margin-top: 10rpx;
				font-size: 29rpx;
				text-align: center;
				color: #fff;
			}

			image {
				display: block;
				margin: 0 auto;
				width: 65rpx;
				height: 65rpx;
			}
		}

		.left_col {
			margin-left: 20rpx;

			.left_col_row {
				width: 150rpx;
				height: 83rpx;
				display: flex;
				align-items: center;
				color: #fff;
				font-size: 28rpx;
				// background-color: #;
				border-radius: 6px;
				margin-top: 20rpx;
				box-sizing: border-box;
				padding: 0 20rpx 0 10rpx;
				justify-content: space-between;

				image {
					width: 55rpx;
					height: 55rpx;
				}
			}
		}

		.icon,
		.info {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}

		.icon {
			// top: 225rpx;
			width: 165rpx;
			height: 195rpx;
		}

		.info {
			// top: 500rpx;
			text-align-last: center;
			color: #fff;

			.name {
				font-size: 32rpx;
			}

			.sex {
				font-size: 24rpx;
				margin: 2rpx 0;
			}

			.time {
				font-size: 30rpx;
			}
		}
	}

	.pensive_home {
		height: 100vh;
		box-sizing: border-box;
		padding-bottom: 110rpx;

		.flex_box {
			display: flex;
		}

		.comment {
			// padding-top:700rpx;
			position: relative;
			width: 100%;
			background-color: #fff;
			border-radius: 20px 20px 0 0;
			top: -25rpx;

			.worship_num {
				display: flex;
				align-items: center;
				padding: 30rpx 0 20rpx 0;

				.worship_item {
					width: calc(100% / 4);
					text-align: center;

					.worship_item_num {
						font-size: 36rpx;
						color: #ff9e13;
					}

					.worship_item_title {
						margin-top: 5rpx;
						font-size: 26rpx;
						color: #333;
					}
				}
			}

			.worship_list {
				.worship_item {
					.item {
						box-sizing: border-box;
						padding: 25rpx;

						.item_top {
							.item_top_left {
								margin-right: 40rpx;

								image {
									border-radius: 50%;
									width: 150rpx;
									height: 150rpx;
								}
							}

							.item_top_right {
								flex-direction: column;
								justify-content: space-between;

								.item_right_top {
									font-size: 36rpx;
									color: #333333;
									font-weight: bold;
								}

								.item_right_bottom {
									flex-wrap: wrap;
									margin-top: 5rpx;

									.item_right_bottom_item {
										flex-shrink: 0;
										margin-right: 25rpx;
										margin-bottom: 5rpx;

										.item_right_bottom_title {
											color: #333333;
											font-size: 26rpx;
										}

										image {
											display: block;
											margin: 0 auto;
											width: 40rpx;
											height: 40rpx;
										}
									}
								}
							}
						}

						.item_center {
							margin-top: 20rpx;
							color: #333;
							font-size: 30rpx;
						}

						.item_bottom {
							border-top: 1px solid #f5f5f5;
							margin-top: 20rpx;
							padding-top: 20rpx;
							color: #666666;
							font-size: 26rpx;
						}
					}
				}
			}
		}

		.send_grief {
			width: 100%;
			height: 110rpx;
			background-color: #fff;
			z-index: 1;
			position: fixed;
			align-items: center;
			justify-content: center;
			bottom: 0;
			left: 0;
			border-top: 1px solid #F5F5F5;
			.send_grief_btn {
				text-align: center;
				color: #fff;
				background-color: #FF9E13;
				width: 85%;
				height: 90rpx;
				line-height: 90rpx;
				border-radius: 25px;
			}
		}
	}
</style>
