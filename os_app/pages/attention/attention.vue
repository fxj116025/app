<template>
	<scroll-view class="attention" scroll-y='true' @scrolltolower='scrollBottom' v-if="is_show">
		<view class="segmentation">

		</view>
		<!-- 列表 -->
		<view class="list" v-if="list.length>0">
		<!-- <view class="list" v-if="false"> -->
			<Item v-for="(v,i) of list" :key='i' :obj="v" />
			<uni-load-more :status="more"></uni-load-more>
		</view>
		<view class="nodata" v-else>
			<image src="../../static/images/nomsg.png" />
			<view class="noText">
				暂无数据
			</view>
		</view>
	</scroll-view>
</template>

<script>
	import item from '../../components/item/item.vue';
	import {
		userMyFocus
	} from '../../common/http.js'
	export default {
		components: {
			Item: item
		},
		data() {
			return {
				more: 'more', //more/loading/noMore
				pageIndex: 1,
				pageSize: 10,
				list: [],
				is_all: false,
				is_show: false
			};
		},
		mounted() {
			this.init()
		},
		methods: {
			init() {
				let sendData = {
					page: this.pageIndex,
					page_size: this.pageSize,
				}
				userMyFocus(sendData, (res) => {
					if (res.data.length === 0) {
						this.is_all = true
						this.more = 'noMore'
					} else {
						for (let v in res.data) {
							this.list.push(res.data[v])
							this.more = 'more'
						}
					}
					this.is_show = true
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
		}
	}
</script>

<style lang="scss">
	.attention {
		height: 100vh;
		.nodata{
			width: 200rpx;
			box-sizing: border-box;
			margin: 0 auto;
			margin-top: 200rpx;
			text-align: center;
			color: #333;
			image{
				margin: 0 auto;
				display: block;
				width: 100rpx;
				height: 100rpx;
				margin-bottom: 50rpx;
			}
		}
	}
</style>
