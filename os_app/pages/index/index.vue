<template v-if="token">
	<scroll-view class="home_content" scroll-y='true' @scrolltolower='scrollBottom'>
		<!-- 自定义头部 -->
		<uni-nav-bar title="首页" fixed='true' statusBar='true'>
			<view class="left_icon" slot="left" @click="go_center">
				<image src="../../static/images/person_icon.png"></image>
			</view>
		</uni-nav-bar>

		<!-- 轮播 -->
		<swiper circular='true' class="swiper_box">
			<swiper-item class="swiper_item" v-for="(v,i) of swiperList" :key='v.id'>
				<image :src="v.lunbo_image" mode="aspectFill" />
			</swiper-item>
		</swiper>

		<!-- 公告 -->
		<view class="home_notice">
			<swiper circular='true' class="home_notice_box" autoplay='true' vertical='true'>
				<swiper-item class="home_notice_item" v-for="(v,i) of noticeList" :key='v.id'>
					<image src="../../static/images/notice_icon.png"></image>
					{{v.content}}
				</swiper-item>
			</swiper>
		</view>
		<view class="segmentation">
		</view>

		<!-- 标题 -->
		<view class="home_title" @click="go_memorial">
			<image src="../../static/images/memorial_icon.png"></image>
			<view>
				纪念馆
			</view>
		</view>
		<view class="segmentation">
		</view>
		<!-- 列表 -->
		<view class="list">
			<view class="list_title">
				<image src="../../static/images/new_iocn.png" />
				<view class="list_title_text">
					最新发布
				</view>
			</view>
			<view v-for="(v,i) of list" :key='i'>
				<Item :obj="v" />
			</view>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</scroll-view>
</template>

<script>
	import item from '../../components/item/item.vue';
	import {
		home_swiper,
		notice,
		home_memorials,
		execJobs
	} from '../../common/http.js';
	export default {
		data() {
			return {
				swiperList: [], //轮播
				noticeList: [], //公告
				more: 'more', //more/loading/noMore
				pageIndex: 1,
				pageSize: 10,
				total: 0,
				list: [],
				token: '',
				is_all: false, //
				toDay: ''
			}
		},
		components: {
			Item: item
		},
		mounted() {
			this.token = uni.getStorageSync('token')
			if (!this.token) {
				uni.reLaunch({
					url: '../auth/auth',
				})
			} else {
				this.get_swiper()
				this.get_notice()
				this.get_memorials()
			}
		},
		methods: {
			// // 登录任务
			// login_task() {
			// 	var day2 = new Date();
			// 	day2.setTime(day2.getTime());
			// 	var s2 = day2.getFullYear() + "-" + (day2.getMonth() + 1) + "-" + day2.getDate();
			// 	this.toDay = new Date();
			// 	console.log(s2)
			// },
			// 上拉加载更多
			scrollBottom() {
				if (this.is_all) {
					return
				}
				this.more = 'loading';
				this.pageIndex += 1
				this.get_memorials()
			},
			// 获取轮播
			get_swiper() {
				home_swiper({}, (res) => {
					this.swiperList = res.data
				})
			},
			// 获取公告
			get_notice() {
				notice({}, (res) => {
					console.log(res)
					this.noticeList = res.data
				})
			},
			// 获取纪念馆
			get_memorials() {
				let sendData = {
					page: this.pageIndex,
					pagesize: this.pageSize
				}
				home_memorials(sendData, (res) => {
					if (res.data.length === 0) {
						this.is_all = true
						this.more = 'noMore'
					} else {
						for (let v in res.data) {
							this.list.push(res.data[v])
							this.more = 'more'
						}
					}

				})
			},
			// 去纪念馆
			go_memorial(id) {
				uni.navigateTo({
					url: '../memorial_hall/memorial_hall'
				})
			},
			// 去个人中心
			go_center() {
				uni.navigateTo({
					url: '../personalCenter/personalCenter'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home_content {
		height: 100vh;
		background: #fff;

		.left_icon {
			display: flex;
			align-items: center;

			image {
				width: 60rpx;
				height: 60rpx;
			}
		}

		.swiper_box {
			width: 100%;
			height: 340rpx;

			.swiper_item {
				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		.home_notice {
			.home_notice_box {
				box-sizing: border-box;
				width: 100%;
				padding: 0 30rpx;
				height: 70rpx;
				line-height: 70rpx;

				.home_notice_item {
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					display: flex;
					align-items: center;

					image {
						width: 40rpx;
						height: 40rpx;
						margin-right: 20rpx;
					}
				}
			}
		}

		.home_title {
			width: 100%;
			background-color: #fff;
			height: 140rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 50rpx;
			font-weight: bold;

			image {
				width: 62rpx;
				height: 62rpx;
				margin-right: 20rpx;
			}
		}

		.list {
			.list_title {
				color: #333333;
				display: flex;
				align-items: center;
				height: 100rpx;
				border-bottom: 1px solid #F5F5F5;
				box-sizing: border-box;
				padding-left: 20rpx;

				image {
					width: 55rpx;
					height: 55rpx;
				}

				.list_title_text {
					font-size: 35rpx;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
