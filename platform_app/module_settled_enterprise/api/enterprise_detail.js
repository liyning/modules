import api from '$common/api.js'

export function getDemandItemList(params, res) {
	api.request({
			method: 'get',
			url: '/yjwzyun/getEnterCompanyDetail',
			params
		})
		.then(res)
};
