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
					<view class="input_btn">
						搜索
					</view>
				</view>
			</view>
			
			
			
			<!-- 轮播 -->
			<swiper circular='true' class="swiper_box">
				<swiper-item class="swiper_item">
					图片1
				</swiper-item>
				<swiper-item class="swiper_item">
					图片2
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
				<Item v-for="(v,i) of list" :key='i' />
			</view>
			<uni-load-more :status="more"></uni-load-more>
		</view>
		
	</scroll-view>
</template>

<script>
	import item from '../../components/item/item.vue';
	export default {
		data() {
			return {
				searchText: '',
				more: 'more', //more/loading/noMore
				list: [{
						name: '名字',
						time: '2000.20.20~2100.90.90',
						joss: 10000,
						attention: 10000000,
						utterer: '五月阿松大'
					},
					{
						name: '名字',
						time: '2000.20.20~2100.90.90',
						joss: 10000,
						attention: 10000000,
						utterer: '五月阿松大'
					},
					{
						name: '名字',
						time: '2000.20.20~2100.90.90',
						joss: 10000,
						attention: 10000000,
						utterer: '五月阿松大'
					},
					{
						name: '名字',
						time: '2000.20.20~2100.90.90',
						joss: 10000,
						attention: 10000000,
						utterer: '五月阿松大'
					},
				]
			}
		},
		components: {
			Item: item
		},
		methods: {
			// 上拉加载更多
			scrollBottom() {
				console.log(0)
				if (this.list.length >= 10) {
					this.more = 'noMore'
				} else {
					this.more = 'loading'
					setTimeout(() => {
						this.more = 'more';
						let L = JSON.parse(JSON.stringify(this.list))
						this.list = this.list.concat(L);
					}, 1000)

				}
			},
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
				background-color: #007AFF;
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
