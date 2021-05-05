<template>
	<scroll-view class="pensive_home" scroll-y='true' @scrolltolower='scrollBottom'>
		<worship />

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
			<view class="worship_list">
				<view class="worship_item" v-for="(v, i) of worshipList" :key="i">
					<view class="item">
						<view class="item_top flex_box">
							<view class="item_top_left"><image src="../../static/images/imhg.jpeg" mode="aspectFill" /></view>
							<view class="item_top_right flex_box">
								<view class="item_right_top">{{ v.name }}</view>
								<view class="item_right_bottom flex_box">
									<view class="item_right_bottom_item">
										<image src="../../static/images/list_jx.png" />
										<view class="item_right_bottom_title">敬香</view>
									</view>
									<view class="item_right_bottom_item">
										<image src="../../static/images/list_hq.png" />
										<view class="item_right_bottom_title">花圈</view>
									</view>
									<view class="item_right_bottom_item">
										<image src="../../static/images/list_lz.png" />
										<view class="item_right_bottom_title">蜡烛</view>
									</view>
								</view>
							</view>
						</view>

						<view class="item_center">{{ v.tetx }}</view>

						<view class="item_bottom">{{ v.time }}为逝者祭拜</view>
					</view>

					<view class="segmentation" />
				</view>
				<uni-load-more :status="more"></uni-load-more>
			</view>
			
		</view>
		
		<!-- 顶部 -->
		<view class="send_grief flex_box">
			<view class="btn" @click="go_grief">
				寄哀思
			</view>
		</view>
	</scroll-view>
</template>

<script>
import worship from '../../components/worship_header/worship_header.vue';
export default {
	data() {
		return {
			list: [
				{
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
			worshipList: [
				{
					name: '大哥',
					tetx: '大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥大哥',
					time: '2021年04月03日 11:04:25'
				}
			]
		};
	},
	methods:{
		// 上拉加载更多
		scrollBottom() {
			if (this.worshipList.length >= 10) {
				this.more = 'noMore'
			} else {
				this.more = 'loading'
				setTimeout(() => {
					this.more = 'more';
				}, 1000)
			
			}
		},
		// 去寄哀思、
		go_grief(){
			uni.navigateTo({
				url:'../grief/grief'
			})
		}
	},
	components: {
		worship
	}
};
</script>

<style lang="scss">
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
								.item_right_bottom_item {
									margin-right: 25rpx;
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
	.send_grief{
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
		.btn{
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
