<template>
	<view class="content">
		<view class='list'>
			<hr class='hrstyle' />
			<listItem v-for="item in list" :itemInfo='item' :key='item.id'/>
		</view>
	</view>
</template>
<script>
	import {
		getDemandItemList,
		getIndustries,
	} from "./api/index.js";
	import listItem from "./components/item.vue"; //第一步，导入组件
	export default {
		components: {
			listItem
		},

		data() {
			return {
				currentPage: 1,
				totalRecord: 10,
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				address: '',
				loadingText: '~~~~~~上拉加载更多~~~~~~',
				settledEnterprise: './static/images/tabs/settled-enterprise-non.png',
				list: [],
				option1: [],
				option2: [{
						text: "类型",
						value: '',
					},
					{
						text: "供应方",
						value: "01",
					},
					{
						text: "需求方",
						value: "02",
					},
				],
				gmList: [{
						text: '规模',
						value: ''
					},
					{
						text: '特大型',
						value: 'A',
						type: false
					},
					{
						text: '大型',
						value: 'B',
						type: false
					},
					{
						text: '中型',
						value: 'C',
						type: false
					},
					{
						text: '小型',
						value: 'D',
						type: false
					},
					{
						text: '微型',
						value: 'E',
						type: false
					},
				],
				option3: this.getYearList(),
				pickerValue: [],
				picker1Value: '',
				gmText: '',
				provinceCde: '',
				cityCde: '',
				districtCde: '',
			};
		},
		onLoad() {
			this.getItemList();
		},
		
		onPullDownRefresh() {
			uni.stopPullDownRefresh()
		},
		// 上拉加载
		onReachBottom: function() {
			this.loadingText = '~~~~~~加载中~~~~~~';
			this.currentPage = this.currentPage + 1;
			this.getItemList();
		},
		methods: {
			onClear() {
				this.list = [];
				this.currentPage = 1;
				this.value4 = '';
				this.getItemList();
			},
			open() {
				this.$refs.picker.show();
			},
			addressClose() {
				this.$refs.picker.hide();
			},
			clearAddress() {
				this.address = '';
				this.pickerValue = '';
				this.valueList = '';
				this.provinceCde = null;
				this.cityCde = null;
				this.districtCde = null;
			},
			addressConfirm(data) {
				this.address = data.value.length == 3 ? data.item[0].label + ' ' + data.item[1].label + ' ' + data.item[2].label :
					data.item[0].label +
					' ' + data.item[1].label;
				this.pickerValue = data.value;
				const valueList = data.value;
				let provinceCde = null;
				let cityCde = null;
				let districtCde = null;
				if (valueList.length === 0) {
					return;
				}
				if (
					valueList[0] == '310000' ||
					valueList[0] == '500000' ||
					valueList[0] == '110000' ||
					valueList[0] == '120000'
				) {
					if (valueList.length == 1) {
						cityCde = valueList[0];
					}
					if (valueList.length == 2) {
						cityCde = valueList[0];
						districtCde = valueList[1];
					}
					this.provinceCde = provinceCde;
					this.cityCde = cityCde;
					this.districtCde = districtCde;
					return;
				} else {
					if (valueList.length === 1) {
						provinceCde = valueList[0];
					}
					if (valueList.length === 2) {
						provinceCde = valueList[0];
						cityCde = valueList[1];
					}
					if (valueList.length === 3) {
						provinceCde = valueList[0];
						cityCde = valueList[1];
						districtCde = valueList[2];
					}
					this.provinceCde = provinceCde;
					this.cityCde = cityCde;
					this.districtCde = districtCde;
					return;
				}
				this.$refs.picker.hide();
			},
			open1() {
				this.$refs.picker1.show();
			},
			clearGm() {
				this.gmText = '';
				this.picker1Value = null;
			},
			gmClose() {
				this.$refs.picker1.hide();
			},
			gmConfirm(data) {
				this.gmText = data.item.label;
				this.picker1Value = data.value;
				this.$refs.picker1.hide();
			},
			onRigthPopup() {
				this.$refs.popup.show() // 显示
			},
			onRigthClose() {
				this.$refs.popup.hide() // 隐藏
			},
			onRigthConfirm() {
				this.currentPage = 1;
				this.list = [];
				this.getItemList()
				this.$refs.popup.hide() // 隐藏
			},
			getBusiness(text) {
				if (text != null && text != 'null' && text != '') {
					let len = text.length;
					let str1 = text;
					if (len > 10) {
						str1 = text.substring(0, 9);
						return str1 + '...';
					} else {
						return str1;
					}
				} else {
					return '--'
				}
			},
			getTitle(text) {
				if (text != null && text != 'null' && text != '') {
					let len = text.length;
					let str1 = text;
					if (len > 14) {
						str1 = text.substring(0, 13);
						return str1 + '...';
					} else {
						return str1;
					}
				} else {
					return '--'
				}
			},

			getItemList(value) {
				console.log("ooooo=====")
				if (this.currentPage == 1) {
					uni.showLoading({
						title: '加载中...',
						mask: false
					});
				}
				let data = {
					pageSize: 10,
					currentPage: this.currentPage,
					type: this.value2 == "" ? null : this.value2,
					industryCde: this.value1,
					setUpTime: this.picker1Value,
					retrieval: this.value4,
					provinceCde: this.provinceCde,
					cityCde: this.cityCde,
					districtCde: this.districtCde,
					scaleCde: this.value3,
				};
				getDemandItemList(data, (res) => {
					if (res.code == -1) {
						uni.showToast({
							title: res.message,
							icon: "none",
						});
						return;
					}
					if (res.data.pageInfo.totalRecord == 0) {
						uni.showToast({
							title: "暂无数据",
							icon: "none",
						});
						this.loadingText = '————我是有底线的————';
						if (this.currentPage == 1) {
							this.list = [];
							this.loadingText = '————暂无数据————';
						}
						return;
					}
					if (this.currentPage !== 1) {
						let lists = [];
						const list = res.data.companiesList;
						list.forEach(item => {
							lists = [...lists, {
								...item,
								coreBusiness: this.getBusiness(item.coreBusiness),
								scaleCde: item.scaleCde && this.gmList.filter(d => d.value == item.scaleCde)[0].text,
								registerCaptial: this.getBusiness(item.registerCaptial),
								companyName: this.getTitle(item.companyName),
							}];
						})
						this.list.push.apply(this.list, lists);
						if (res.data.pageInfo.totalRecord == this.list.length) {
							this.loadingText = '————我是有底线的————';
						}
					} else {
						let lists = [];
						const list = res.data.companiesList;
						list.forEach(item => {
							lists = [...lists, {
								...item,
								coreBusiness: this.getBusiness(item.coreBusiness),
								scaleCde: item.scaleCde && this.gmList.filter(d => d.value == item.scaleCde)[0].text,
								registerCaptial: this.getBusiness(item.registerCaptial),
								companyName: this.getTitle(item.companyName),
							}];
						})
						if (res.data.pageInfo.totalRecord == list.length || (res.data.pageInfo.currentPage == 1 && list.length < 10)) {
							this.loadingText = '————我是有底线的————';
						} else {
							this.loadingText = '~~~~~~上拉加载更多~~~~~~';
						}
						this.list = lists;
						this.totalRecord = res.data.pageInfo.totalRecord;
					};
					uni.hideLoading()
				});
			},
			getYearList() {
				const yearList = [];
				const myDate = new Date();
				const tYear = myDate.getFullYear();
				for (let i = 0; i < tYear - 1969; i++) {
					yearList.push({
						label: tYear - i,
						value: tYear - i,
					});
				}
				return yearList;
			},
			search(e) {
				this.getItemList(e.value);
			},
			hangyeSelect(e) {
				this.list = [];
				this.currentPage = 1;
				this.value1 = e.detail;
				this.getItemList();
			},
			leixingSelect(e) {
				this.list = [];
				this.currentPage = 1;
				this.value2 = e.detail;
				this.getItemList();
			},
			chengliSelect(e) {
				this.list = [];
				this.currentPage = 1;
				this.value3 = e.detail;
				this.getItemList();
			},
			onSearch(e) {
				this.list = [];
				this.currentPage = 1;
				this.value4 = e.detail;
				this.getItemList();
			}
		}
	};
</script>

<style>
	.inputStyle {
		padding: 30rpx;
		margin-top: 10rpx;
		margin-bottom: 10rpx;
	}

	.inputBorder {
		border: 1rpx solid #DADADA;
		border-radius: 10rpx;
		line-height: 32rpx;
		height: 32rpx;
		padding: 16rpx;
	}

	.selectBox {
		margin-top: 34rpx;
		height: 28rpx;
		line-height: 28rpx;
		/* border-left: 2rpx solid #aaa; */
		width: 100%;
		text-align: center;
	}

	.list {
		padding-left: 10px;
	}

	.hrstyle {
		height: 1px;
		border: none;
		border-top: 1px solid rgba(230, 232, 235, 1);
	}

	.loading {
		color: #808080;
		text-align: center;
		margin-top: 10px;
	}

	.selectRow {
		margin-top: -10px;
	}
</style>

.content {
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
}

.logo {
height: 200rpx;
width: 200rpx;
margin-top: 200rpx;
margin-left: auto;
margin-right: auto;
margin-bottom: 50rpx;
}

.text-area {
display: flex;
justify-content: center;
}

.title {
font-size: 36rpx;
color: #8f8f94;
}
</style>
