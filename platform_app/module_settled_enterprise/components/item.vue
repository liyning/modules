<template>
	<view @click="showDetail">
		<view class='sonList'>
			<view class="imgParent">
				<image :src='itemInfo.pictureUrl' class='imgList'></image>
				<text class='imgFlg'>
					{{itemInfo.industryName||'--'}}
				</text>
			</view>
			<view span='15' class='nrText'>
				<view style='line-height: 37rpx;'>
					<text class='companyTitle'>{{itemInfo.companyName}}</text>
				</view>
				<view style='margin-top: 9rpx;'>
					<text>主营业务：{{itemInfo.coreBusiness}}</text>
				</view>
				<view>
					<text>企业规模：{{itemInfo.scaleCde}}</text>
				</view>
				<view>
					<text>注册资金：{{itemInfo.registerCaptial}} 万</text>
				</view>
			</view>
		</view>
		<hr class='hrstyle' />
	</view>

</template>

<script>
	export default {
		name: 'list',
		props: ['itemInfo'],

		data() {
			return {

			};
		},

		mounted() {

		},

		methods: {
			showDetail() {
				uni.navigateTo({
					url: './view/enterprise_detail?detailId=' + this.itemInfo.detailId
				})
			}
		},
	}
</script>

<style>
	.nrText {
		padding: 11rpx 24rpx;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 54rpx;
		color: rgba(0, 0, 0, 1);
		opacity: 1;
	}

	.imgParent {
		overflow: hidden;
		width: 220rpx;
		height: 220rpx;
		background: rgba(240, 242, 245, 1);
		opacity: 1;
		border-radius: 8rpx;
		background-color: rgba(240, 242, 245, 1);
		background-image: url(../static/settled-enterprise-non.png);
		background-size: 124rpx, 82rpx;
		background-repeat: no-repeat;
		background-position: 48rpx 69rpx;
	}

	.sonList {
		padding: 24rpx;
		display: flex;
	}

	.imgList {
		width: 100%;
		height: 100%;
	}

	.hrstyle {
		height: 1px;
		border: none;
		border-top: 1px solid rgba(230, 232, 235, 1);
	}

	.companyTitle {
		font-weight: 600;
	}

	.imgFlg {
		/* 
		color: #ffffff;
		font-size: 12px;
		border-radius: 0 0 5px 0;
		top: -115px;width:72px; */
		padding: 6rpx;
		position: relative;
		top: -242rpx;
		height: 25rpx;
		font-size: 18rpx;
		font-family: PingFang SC;
		font-weight: 500;
		line-height: 25rpx;
		color: rgba(255, 255, 255, 1);
		background: rgba(63, 116, 255, 1);
		border-radius: 8rpx 0rpx 8rpx 0rpx;
		opacity: 1;
	}
</style>
