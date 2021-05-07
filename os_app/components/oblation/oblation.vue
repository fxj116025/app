<template>
	<view class="oblation">
		<!-- 图片 -->
		<view class="oblation_icon_box" :class="add?'active_add':''" @click="select_item(info)">
			<image :src="info.image||'../../static/images/zanwu.png'" mode="aspectFill" class='oblation_icon' />
			<image src="../../static/images/xuanz.png" class="select_icon" v-if="add" />
		</view>

		<view class="oblation_name">
			{{info.name}}
		</view>
		<view class="oblation_price">
			福星:{{info.bless_num}}
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			is_add: {
				type: Boolean,
				default: false
			},
			add: {
				type: Boolean,
				default: false
			},
			info:{
				type:Object,
				required:true
			}
		},
		name: "oblation",
		data() {
			return {

			};
		},
		methods: {
			select_item(item) {
				if (!this.is_add) {
					return
				}
				this.$emit('select_item',item)
			}
		}
	}
</script>

<style lang="scss">
	.oblation {
		width: calc((100vw - 40rpx) /4);
		text-align: center;
		color: #333;
		margin: 10rpx 0 20rpx 0;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;

		.oblation_icon_box {
			position: relative;
			border: 1px solid transparent;
			border-radius: 6px;

			.oblation_icon {
				display: block;
				width: 140rpx;
				height: 140rpx;
				border-radius: 6px;
			}

			.select_icon {
				position: absolute;
				width: 30rpx;
				height: 30rpx;
				right: -12rpx;
				top: -12rpx;
			}
		}

		.active_add {
			border: 1px solid #FF9E13;
		}

		.oblation_name,
		.oblation_price {
			width: 140rpx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.oblation_name {
			font-size: 28rpx;
			font-weight: bolder;
		}

		.oblation_price {
			font-size: 26rpx;
		}
	}
</style>
