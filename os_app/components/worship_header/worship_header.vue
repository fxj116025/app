<template>
	<view class="worship_header" :style="'background-image:url('+bgImg+')'">
		<image src="../../static/images/header.png" mode="aspectFill" class="icon"/>
		<view class="info">
			<view class="name">
				撒娇哈佛
			</view>
			<view class="sex">
				男
			</view>
			<view class="time">
				1990-1990
			</view>
		</view>
	</view>
</template>

<script>
	import {
		imaga64
	} from '../../common/base64.js'
	export default {
		name: "worship_header",
		data() {
			return {
				bgImg: ''
			};
		},
		mounted() {
			switch (this.ty) {
				case 1:
					this.bgImg = imaga64.bg1
					break;
				case 2:
					this.bgImg = imaga64.bg2
					break;
				case 3:
					this.bgImg = imaga64.bg3
					break;
				default:
					this.bgImg = imaga64.bg1
					break;
			}
		},
		props: {
			ty: {
				type: Number,
				default: 3
			}
		}
	}
</script>

<style lang="scss">
	.worship_header {
		width: 100%;
		height: 700rpx;
		background-repeat: no-repeat;
		background-size: 100% 100%;
		position: relative;
		
		.icon,.info {
			position: absolute;
			left: 50%;
			transform: translateX(-50%);
		}
		.icon{
			top: 225rpx;
			width: 165rpx;
			height: 195rpx;
		}
		.info{
			top: 500rpx;
			text-align-last: center;
			color: #fff;
			.name{
				font-size: 34rpx;
			}
			.sex{
				font-size: 26rpx;
				margin: 5rpx 0;
			}
		}
	}
</style>
