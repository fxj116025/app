<template>
	<scroll-view class="attention" scroll-y='true' @scrolltolower='scrollBottom'>
		<view class="segmentation">
			
		</view>
		<!-- 列表 -->
		<view class="list">
			<Item v-for="(v,i) of list" :key='i' />
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</scroll-view>
</template>

<script>
	import item from '../../components/item/item.vue';
	export default {
		components: {
			Item: item
		},
		data() {
			return {
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
			};
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
	.attention{
		height: 100vh;
	}
</style>
