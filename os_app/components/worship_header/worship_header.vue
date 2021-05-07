<template>
	<view class="worship_header" :style="'background-image:url(' + bgImg + ')'">
		<!-- 顶上按钮 -->
		<view class="top_btn">
			<view class="top_btn_yy">
				<image :src="YY" :class="is_play ? 'active_yy' : ''" @click="is_music" />
			</view>
			<view class="top_btn_num">
				<image src="../../static/images/fx2.png" />
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
</template>

<script>
	import {
		imaga64
	} from '../../common/base64.js';

	import yy from '../../static/images/yy2.png';
	import jyy from '../../static/images/jyy2.png';
	// import fx from ''
	export default {
		name: 'worship_header',
		props: {
			info: {
				type: Object,
				required: true
			}
		},
		data() {
			return {
				type: -1,
				bgImg: '',
				imgTop: 225,
				infotop: 500,
				leftBtn: '#3D3E4E',
				YY: yy,
				is_play: true,
				innerAudioContext: null,
				left: [{
						title: '敬香',
						icon: '../../static/images/jx2.png'
					},
					{
						title: '蜡烛',
						icon: '../../static/images/lz.png'
					},
					{
						title: '花圈',
						icon: '../../static/images/hq.png'
					},
					{
						title: '扫墓',
						icon: '../../static/images/sm.png'
					},
				]
			};
		},
		mounted() {



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
			}
		},
		watch: {
			info(data) {
				console.log(data)
				if (data.background_music) {
					this.innerAudioContext = uni.createInnerAudioContext();
					this.innerAudioContext.autoplay = true;
					this.innerAudioContext.loop = true;
					this.innerAudioContext.src = data.background_music
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
</style>
