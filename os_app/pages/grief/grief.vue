<template>
	<view class="grief">
		<!-- 头部输入 -->
		<view class="header_title">寄哀思：</view>
		<textarea v-model.trim="grief" placeholder="抒写您的哀思" class="grief-input" />

		<!-- 祭品 -->
		<view class="header_title title">
			<view>祭品：</view>
			<view class="jip">祭品</view>
		</view>
		<!-- 列表 -->
		<view class="jip_list">
			
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			grief: ''
		};
	}
};
</script>

<style lang="scss">
.grief {
	min-height: 100vh;
	background-color: #f5f5f5;
	.header_title {
		font-size: 32rpx;
		color: #333;
		box-sizing: border-box;
		padding: 25rpx;
		font-weight: bolder;
	}
	.grief-input {
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		padding: 25rpx;
		height: 380rpx;
	}
	.title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		.jip{
			background-color: #FF9E13;
			color: #fff;
			border-radius: 20px;
			width: 140rpx;
			text-align: center;
			line-height: 64rpx;
			font-weight: 500;
		}
	}
}
</style>
