<template>
	<scroll-view class="home_content" scroll-y='true' @scrolltolower='scrollBottom'>
		<!-- 自定义头部 -->
		<uni-nav-bar title="首页" fixed='true' statusBar='true'>
			<view class="left_icon" slot="left" @click="go_center">
				<uni-icons type="person" size="24"></uni-icons>
			</view>
		</uni-nav-bar>
		
		<!-- 轮播 -->
		<swiper circular='true' class="swiper_box">
			<swiper-item class="swiper_item" v-for="(v,i) of swiperList" :key='v.id'>
				<image :src="v.lunbo_image" mode="aspectFill"/>
			</swiper-item>
		</swiper>

		<!-- 公告 -->
		<view class="home_notice">
			<swiper circular='true' class="home_notice_box" autoplay='true' vertical='true'>
				<swiper-item class="home_notice_item" v-for="(v,i) of noticeList" :key='v.id'>
					{{v.content}}
				</swiper-item>
			</swiper>
		</view>
		<view class="segmentation">
		</view>
		
		<!-- 标题 -->
		<view class="home_title" @click="go_memorial">
			纪念馆
		</view>
		<view class="segmentation">
		</view>
		<!-- 列表 -->
		<view class="list">
			<view class="list_title">
				<uni-icons type="map" size="24"></uni-icons>
				<view class="list_title_text">
					最新发布
				</view>
			</view>
			<Item v-for="(v,i) of list" :key='i'/>
		</view>
		<uni-load-more :status="more"></uni-load-more>
	</scroll-view>
</template>

<script>
	import item from '../../components/item/item.vue';
	import {
		home_swiper,
		notice
	} from '../../common/http.js';
	export default {
		data() {
			return {
				swiperList:[],//轮播
				noticeList:[],//公告
				more:'more',//more/loading/noMore
				list:[
					{
						name:'名字',
						time:'2000.20.20~2100.90.90',
						joss:10000,
						attention:10000000,
						utterer:'五月阿松大'
					},
					{
						name:'名字',
						time:'2000.20.20~2100.90.90',
						joss:10000,
						attention:10000000,
						utterer:'五月阿松大'
					},
					{
						name:'名字',
						time:'2000.20.20~2100.90.90',
						joss:10000,
						attention:10000000,
						utterer:'五月阿松大'
					},
					{
						name:'名字',
						time:'2000.20.20~2100.90.90',
						joss:10000,
						attention:10000000,
						utterer:'五月阿松大'
					},
				]
			}
		},
		components:{
			Item:item
		},
		mounted() {
			if(!uni.getStorageSync('token')){
				uni.reLaunch({
					url:'../auth/auth',
				})
			}else{
				this.get_swiper()
				this.get_notice()
			}
		},
		methods: {
			// 上拉加载更多
			scrollBottom(){
				console.log(0)
				if(this.list.length>=10){
					this.more='noMore'
				}else{
					this.more='loading'
					setTimeout(()=>{
						this.more='more';
						let L=JSON.parse(JSON.stringify(this.list))
						this.list=this.list.concat(L);
					},1000)
					
				}
			},
			// 获取轮播
			get_swiper(){
				home_swiper({},(res)=>{
					this.swiperList=res.data
				})
			},
			// 获取公告
			get_notice(){
				notice({},(res)=>{
					console.log(res)
					this.noticeList=res.data
				})
			},
			// 去纪念馆
			go_memorial(){
				uni.navigateTo({
					url:'../memorial_hall/memorial_hall'
				})
			},
			// 去个人中心
			go_center(){
				uni.navigateTo({
					url:'../personalCenter/personalCenter'
				})
			}
		}
	}
</script>

<style lang="scss">
	.home_content {
		height: 100vh;
		background: #fff;
		.swiper_box {
			width: 100%;
			height: 340rpx;
			.swiper_item {
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		.home_notice{
			.home_notice_box{
				box-sizing: border-box;
				width: 100%;
				padding: 0 30rpx;
				height: 70rpx;
				line-height: 70rpx;
				.home_notice_item{
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
				}
			}
		}
		.home_title{
			width: 100%;
			background-color: #fff;
			height: 140rpx;
			text-align: center;
			line-height: 140rpx;
			font-size: 50rpx;
			font-weight: bold;
		}
		.list{
			.list_title{
				color: #333333;
				display: flex;
				align-items: center;
				height: 100rpx;
				border-bottom: 1px solid #F5F5F5;
				box-sizing: border-box;
				padding-left: 20rpx;
				.list_title_text{
					font-size: 35rpx;
					font-weight: bold;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
