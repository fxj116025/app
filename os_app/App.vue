<script>
	export default {
		onLaunch: function() {
			uni.getSystemInfo({
				success(res) {
					console.log(res.screenWidth) //屏幕宽度
					console.log(res.screenHeight) //屏幕高度
				}
			});

		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	.segmentation {
		width: 100%;
		height: 20rpx;
		background-color: #F5F5F5;
	}

	.sticky_box {
		position: sticky;
		top: 0;
		left: 0;
		background-color: #fff;
		z-index: 10;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	
</style>
