import api from '$common/api.js'

function getDemandItemList(data, res) {
	api.request({
			method: 'post',
			url: '/yjwzyun/queryEnterCompaniesList',
			data
		})
		.then(res)
};

function getIndustries(params, res) {
	api.request({
			method: 'get',
			url: '/yjwzyun/getIndustries',
			params
		})
		.then(res)
};


export {
	getDemandItemList,
	getIndustries
};
