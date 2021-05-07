<template>
	<scroll-view class="attention" scroll-y='true' @scrolltolower='scrollBottom'>
		<view class="segmentation">

		</view>
		<!-- 列表 -->
		<view class="list">
			<Item v-for="(v,i) of list" :key='i' :obj="v" />
		</view>
		<uni-load-more :status="more"></uni-load-more>
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
				is_all:false
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
	}
</style>
