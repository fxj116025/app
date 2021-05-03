<template>
	<view class="grief_home">
		<view class="grief_home_title">
			<view class="grief_home_title_text">
				爱上覅哇后hi哦啊是否会瓦房hi哦啊和覅哦啊是佛i啊爱上覅哦啊是佛i
			</view>
			<view class="grief_home_title_music">
				<image :src="y"/>
			</view>
			<view class="grief_home_title_share">
				<image src="../../static/images/fx.png"/>
			</view>
		</view>
		<!-- 内容 -->
		<view class="grief_home_content">
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
			</view>
			
			<view >
				asfasfa
			</view>
			<view >
				asfasfa
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
						12431241人
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
						1241241人
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
			<view class="footer_icon">
				<image src="../../static/images/jx.png"></image>
				<view>
					关注
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import yy1 from '../../static/images/yy.png'
	import yy2 from '../../static/images/jyy.png'
	export default {
		data() {
			return {
				y:yy1
			};
		},
		methods:{
			jx(){
				uni.navigateTo({
					url:'../pensive_home/pensive_home'
				})
			}
		}
	}
</script>

<style lang="scss">
.grief_home{
	// height: 100vh;
	min-height: 100vh;
	background-color: #F5F5F5;
	.grief_home_title{
		display: flex;
		align-items:center;
		box-sizing: border-box;
		padding: 20rpx;
		.grief_home_title_text{
			flex:1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			// margin-right: 20rpx;
			font-size: 32rpx;
		}
		.grief_home_title_music{
			margin: 0 40rpx;
		}
		.grief_home_title_music,.grief_home_title_share{
			flex-shrink: 0;
			width: 40rpx;
			height: 40rpx;
			
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.grief_home_content{
		box-sizing: border-box;
		padding: 0 20rpx 0rpx 20rpx;
	}
	.num_box{
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
		padding-bottom: 120rpx;
		padding-top: 0;
		.icon1{
			position: relative;
			image{
				width: 345rpx;
				height: 195rpx;
			}
			.num_info{
				position: absolute;
				top: 50%;
				left: 20rpx;
				transform: translateY(-50%);
				color: #fff;
				text-align: center;
				.num_title{
					font-size: 36rpx;
					font-weight: bold;
				}
				.num{
					margin-top: 5rpx;
					font-size: 26rpx;
				}
			}
		}
	}
	.grief_home_footer{
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
		.footer_icon{
			background-color: #8C8D9F;
			width: 300rpx;
			height: 80rpx;
			border-radius: 25px;
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fff;
			font-size: 34rpx;
			image{
				width: 40rpx;
				height: 40rpx;
				margin-right: 20rpx;
			}
		}
	}
}
</style>
