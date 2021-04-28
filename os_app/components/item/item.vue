<template>
	<view class="item">
		<view class="item_left">
			<image src="../../static/images/imhg.jpeg" mode="aspectFill" lazy-load='true' />
		</view>
		<view class="item_right">
			<view class="item_right_name">
				名字
			</view>
			<view class="item_right_time">
				2000.20.20~2100.90.90
			</view>
			<view class="item_right_num">
				<image src="../../static/images/imhg.jpeg" mode="scaleToFill"/>
				<view>
					敬香数：
				</view>
				<view>
					10000000000000
				</view>
			</view>
			<view class="item_right_num">
				<image src="../../static/images/imhg.jpeg" mode="scaleToFill"/>
				<view>
					关注数：
				</view>
				<view>
					10000000000000
				</view>
			</view>
			<view class="item_right_num">
				<image src="../../static/images/imhg.jpeg" mode="scaleToFill"/>
				<view>
					发表人：
				</view>
				<view>
					诸葛孔明
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "item",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	.item {
		display: flex;
		padding:20rpx;
		align-items:center;
		border-bottom: 1px solid #F5F5F5;
		.item_left {
			width: 200rpx;
			height: 280rpx;
			flex-shrink: 0;
			
			image{
				width: 100%;
				height: 100%;
				border-radius: 6px;	
			}
		}
		.item_right {
			flex: 1;
			margin-left: 50rpx;
			
			.item_right_name{
				font-weight: bold;
				font-size: 40rpx;
				margin: 20rpx 0;
			}
			.item_right_num{
				display: flex;
				align-items: center;
				image{
					width: 30rpx;
					height: 30rpx;
					margin-right: 20rpx;
				}
			}
			.item_right_time,.item_right_num{
				margin-bottom: 20rpx;
				color: #666666;
				font-size: 26rpx;
			}
		}
	}
</style>
