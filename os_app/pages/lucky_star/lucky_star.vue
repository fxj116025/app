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
				<view class="lucky_star_pay">
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
						{{toDayGetIntegral}}
					</view>
				</view>
			</uni-list-item>
			<uni-list-item>
				<view class="row_icon" slot='header'>
					<image src="../../static/images/imhg.jpeg" mode="aspectFill" />
				</view>
				<view class="row_info" slot='body'>
					<view class="row_info_top">
						登录
					</view>
					<view class="row_info_center">
						1福星/每日首次登录
					</view>
					<view class="row_info_bottom">
						已获0福星/每日上限1福星
					</view>
				</view>
			</uni-list-item>
		</uni-list>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				luckyStarNum: 0,
				toDayGetIntegral: 0
			};
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
		.row_icon{
			width: 70rpx;
			height: 70rpx;
			image{
				height: 100%;
				width: 100%;
				border-radius: 50%;
			}
		}
		.row_info{
			.row_info_top{
				font-weight: bold;
				color: #333;
			}
			font-size: 32rpx;
			margin-left: 20rpx;
			.row_info_center{
				// margin: 1rpx 0 10rpx 0;
			}
			.row_info_center,.row_info_bottom{
				font-size: 24rpx;
				color: #666;
			}
		}
		
	}
</style>
