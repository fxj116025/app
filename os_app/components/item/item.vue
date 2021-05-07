<template>
	<view class="item" @click="grief_home(obj.id)">
		<view class="item_left">
			<image :src="obj.gone_user_avatar" mode="aspectFill" lazy-load='true' />
		</view>
		<view class="item_right">
			<view class="item_right_name">
				{{obj.gone_user_name}}
			</view>
			<view class="item_right_time">
				{{obj.gone_user_years}}
			</view>
			<view class="item_right_num">
				<image src="../../static/images/jx_num.png" mode="scaleToFill"/>
				<view>
					敬香数：
				</view>
				<view>
					{{obj.action.jx}}
				</view>
			</view>
			<view class="item_right_num">
				<image src="../../static/images/gz_num.png" mode="scaleToFill"/>
				<view>
					关注数：
				</view>
				<view>
					{{obj.action.gz}}
				</view>
			</view>
			<view class="item_right_num">
				<image src="../../static/images/fb_iocn.png" mode="scaleToFill"/>
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
		},
		props:{
			'obj':{
				type:Object,
				required:true
			}
		},
		methods:{
			grief_home(id){
				uni.navigateTo({
					url:'../../pages/grief_home/grief_home?id='+id
				})
			}
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
			width: 215rpx;
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
