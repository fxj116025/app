<template>
	<scroll-view class="memorial_hall_home" scroll-y='true' @scrolltolower='scrollBottom'>
		<view>
			<!-- 头部搜索固定 -->
			<view class="sticky_box">
				<view class="memorial_header_input">
					<view class="input_icon">
						<uni-icons type="search" size="20"></uni-icons>
					</view>
					<input type="text" v-model="searchText" placeholder="查找纪念馆" />
					<view class="input_btn" @click="search_memorial">
						搜索
					</view>
				</view>
			</view>



			<!-- 轮播 -->
			<swiper circular='true' class="swiper_box">
				<swiper-item class="swiper_item" v-for="(v,i) of swiperList" :key='v.id'>
					<image :src="v.lunbo_image" mode="aspectFill" />
				</swiper-item>
			</swiper>


			<!-- 列表 -->
			<view class="list">
				<view class="list_title">
					<uni-icons type="map" size="24"></uni-icons>
					<view class="list_title_text">
						推荐
					</view>
				</view>
				<Item v-for="(v,i) of list" :key='i' :obj="v" />
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>

	</scroll-view>
</template>

<script>
	import item from '../../components/item/item.vue';
	import {
		home_memorials,
		home_swiper
	} from '../../common/http.js'
	export default {
		data() {
			return {
				searchText: '',
				more: 'more', //more/loading/noMore
				list: [],
				pageIndex: 1,
				pageSize: 10,
				is_all: false,
				swiperList:[]
			}
		},
		components: {
			Item: item
		},
		mounted(){
			this.init()
			this.get_swiper()
		},
		methods: {
			init() {
				let sendData = {
					page: this.pageIndex,
					pagesize: this.pageSize,
					keywords: this.searchText,
					recommend: 1
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
			// 上拉加载更多
			scrollBottom() {
				if (this.is_all) {
					return
				}
				this.more = 'loading';
				this.pageIndex += 1
				this.init()
			},
			// 获取轮播
			get_swiper() {
				home_swiper({}, (res) => {
					this.swiperList = res.data
				})
			},
			//搜索
			search_memorial() {
				this.is_all = false
				this.pageIndex = 1
				this.list = []
				this.more = 'more'
				this.init()
			}
		}
	}
</script>

<style lang="scss">
	.memorial_hall_home {
		height: 100vh;
		width: 100%;
		background-color: #fff;

		.memorial_header_input {
			width: 90%;
			padding: 20rpx 0 10rpx 0;
			position: relative;

			input {
				width: 100%;
				height: 70rpx;
				background-color: #F5F5F5;
				border-radius: 20px;
				box-sizing: border-box;
				padding: 0 120rpx 0 60rpx;
			}

			.input_icon,
			.input_btn {
				height: 70rpx;
				top: 54%;
				transform: translateY(-50%);
				position: absolute;
			}

			.input_icon {
				display: flex;
				align-items: center;
				left: 10rpx;
			}

			.input_btn {
				right: 0;
				background-color: #3D3E4E;
				border-radius: 0 20px 20px 0;
				color: #fff;
				width: 150rpx;
				text-align: center;
				line-height: 70rpx;
				color: 30rpx;
			}
		}

		.swiper_box {
			width: 100%;
			height: 340rpx;

			.swiper_item {
				// background-color: #007AFF;
				image {
					width: 100%;
					height: 100%;
				}
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

				.list_title_text {
					font-size: 35rpx;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
