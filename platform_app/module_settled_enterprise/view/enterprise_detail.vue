<template>
	<view>
		<view style='padding: 15px;'>
			<view class="imgParent" @click="checkImg">
				<image :src='banner' class='imgList'></image>
			</view>
		</view>
		<view style='height:12px;'>
			&nbsp;
		</view>
		<van-row>
			<van-col span='1'>
				<view style='background-color: @primaryBlue;width:5px;height:24px;'>&nbsp;</view>
			</van-col>
			<van-col span=' 20' style='font-weight: 600;font-size: 18px;'>
				基本信息
			</van-col>
		</van-row>
		<view style='padding: 15px;'>
			<view class='tablecss'>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								公司名称
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.companyName}}
							</view>
						</van-col>
					</van-row>
				</view>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								主营业务
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.coreBusiness}}
							</view>
						</van-col>
					</van-row>
				</view>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								企业规模
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.scaleCde}}
							</view>
						</van-col>
					</van-row>
				</view>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								注册资金
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.registerCaptial}} 万
							</view>
						</van-col>
					</van-row>
				</view>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								所在地区
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.address}}
							</view>
						</van-col>
					</van-row>
				</view>
				<view>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								公司简介
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.companyDesc}}
							</view>
						</van-col>
					</van-row>
				</view>
			</view>
		</view>
		<view style='height:24px;'>
			&nbsp;
		</view>
		<van-row>
			<van-col span='1'>
				<view style='background-color: @primaryBlue;width:5px;height:24px;'>&nbsp;</view>
			</van-col>
			<van-col span='20' style='font-weight: 600;font-size: 18px;'>
				联系方式
			</van-col>
		</van-row>
		<view style='padding: 15px;'>
			<view class='tablecss'>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								联系人
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.contactName}}
							</view>
						</van-col>
					</van-row>
				</view>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								联系电话
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.contactTel}}
							</view>
						</van-col>
					</van-row>
				</view>
				<view class='tableRow'>
					<van-row>
						<van-col span='7'>
							<view class='tableTitle'>
								邮箱地址
							</view>
						</van-col>
						<van-col span='17'>
							<view class='tableText'>
								{{enterCompanyDetail.email}}
							</view>
						</van-col>
					</van-row>
				</view>
			</view>
		</view>
		<view style='height:24px;'>
			&nbsp;
		</view>
		<van-row>
			<van-col span='1'>
				<view style='background-color: @primaryBlue;width:5px;height:24px;'>&nbsp;</view>
			</van-col>
			<van-col span=' 20' style='font-weight: 600;font-size: 18px;'>
				产品展示
			</van-col>
		</van-row>
		<view style="width: 100%;height:300px">
			<view class='zwPhoto'>
				<image src='../../static/images/dataNon.png' />
			</view>
			<view class='zwText'>
				暂无数据
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getDemandItemList
	} from "../api/enterprise_detail.js";

	export default {
		components: {},

		data() {
			return {
				detailId: '',
				banner: '',
				bannerList: [],
				enterCompanyDetail: {},
				gmList: [{
						title: '特大型',
						code: 'A',
						type: false
					},
					{
						title: '大型',
						code: 'B',
						type: false
					},
					{
						title: '中型',
						code: 'C',
						type: false
					},
					{
						title: '小型',
						code: 'D',
						type: false
					},
					{
						title: '微型',
						code: 'E',
						type: false
					},
				],
			};
		},
		onLoad: function(option) { //option为object类型，会序列化上个页面传递的参数
			this.detailId = option.detailId
			console.log("detailId*********",this.detailId)
			this.getItemList();
		},
		mounted() {
		},
		methods: {
			checkImg() {
				if(this.bannerList<2){
					return;
				}
				uni.previewImage({
					current: 0,
					// loop: true,
					longPressActions: {
						itemList: ['发送给朋友', '保存图片', '收藏'],
						success: (data) => {
							//可以自定义分享操作
							console.log('选中了第' + (data.tapIndex + 1) + '个按钮,第' + (data.index + 1) + '张图片');
						},
						fail: function(err) {
							console.log(err.errMsg);
						}
					},
					urls: this.bannerList,
				});
			},
			getItemList(value) {
				let data = {
					detailId: this.detailId,
				};
				getDemandItemList(data, (res) => {
					if (res.code != 0) {
						uni.showToast({
							title: res.message,
							icon: "none",
						});
						return;
					}
					const banners = res.data.banners;
					const enterCompanyDetails = res.data.enterCompanyDetail;
					if (banners.length > 0) {
						this.banner = banners[0].bannerPath;
						this.bannerList = banners.map(item => item.bannerPath);
					}
					const enterCompanyDetail = {
						companyName: this.feiNull(enterCompanyDetails.companyName),
						coreBusiness: this.feiNull(enterCompanyDetails.coreBusiness),
						scaleCde: this.getGm(enterCompanyDetails.scaleCde),
						registerCaptial: this.feiNull(enterCompanyDetails.registerCaptial),
						address: this.feiNull(enterCompanyDetails.address),
						contactName: this.feiNull(enterCompanyDetails.contactName),
						companyDesc: this.feiNull(enterCompanyDetails.companyDesc),
						contactTel: this.jmTelEmail(enterCompanyDetails.contactTel),
						email: this.jmTelEmail(enterCompanyDetails.email),
					};
					this.enterCompanyDetail = enterCompanyDetail;
				});
			},
			jmTelEmail(tel) {
				if (tel) {
					return tel.substr(0, 3) + '****' + tel.substr(7);
				} else {
					return '--';
				}
			},
			feiNull(text) {
				if (text) {
					return text;
				} else {
					return '--';
				}
			},
			getGm(value) {
				let gm = '--';
				this.gmList.forEach(e => {
					if (value == e.code) {
						gm = e.title;
					};
				});
				return gm;
			}
		}
	};
</script>

<style>
	.imgParent {
		height: 300px;
		width: 100%;
		border-radius: 10px;
		background-color: rgba(240, 242, 245, 1);
		background-image: url(../static/settled-enterprise-non.png);
		background-size: 200px;
		background-repeat: no-repeat;
		background-position: center center;
		/* background-position:90px 80px; */
	}

	.imgParent image {
		height: 300px;
		width: 100%;
		object-fit: cover;
	}

	.tablecss {
		border: 1px solid rgba(0, 0, 0, 0.1);
		background-color: #FCFCFC;
	}

	.tableRow {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
	}

	.tableTitle {
		padding: 10px;
		height: 100%;
		text-align: center;
	}

	.tableText {
		border-left: 1px solid rgba(0, 0, 0, 0.1);
		padding: 10px 15px;
	}

	.zwPhoto {
		padding-top: 30px;
		width: 172px;
		height: 160px;
		margin: 0 auto;
	}

	.zwPhoto image {
		width: 172px;
		height: 160px;
	}

	.zwText {
		text-align: center;
		margin-top: 20px;
		color: #353535;
	}
</style>
