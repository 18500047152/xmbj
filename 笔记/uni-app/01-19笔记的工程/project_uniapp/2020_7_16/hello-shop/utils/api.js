// const newApi="http://localhost:8082/"
// export const $myRequest=(options)=>{
// 	return new Promise((resolve, reject) => {
// 		uni.request({
// 			url: newApi + options.url,
// 			method: options.method||'GET',
// 			data: options.data||'GET',
// 			success: (res) => {	
// 				if (res.statusCode !== 200 || typeof res.data !== 'object') {
// 					otherAPI.toast('网络请求出错', 'none', false, 1500);
// 					return false;
// 				}
// 				resolve(res.data.message);
// 			},
// 			fail: (err) => {
// 				reject(err);
// 				otherAPI.toast('请求失败，请稍后再试', 'none', false, 1500);
// 			},
// 			complete: () => {
// 				uni.hideLoading()
// 			}
// 		})
// 	});
// }
const BASE_URL = 'http://localhost:8082'
export const myRequest = (options)=>{
	return new Promise((resolve,reject)=>{
		uni.request({
			url:BASE_URL+options.url,
			method: options.method || 'GET',
			data: options.data || {},
			success: (res)=>{
				if(res.data.status !== 0) {
					return uni.showToast({
						title: '获取数据失败'
					})
				}
				resolve(res)
			},
			fail: (err)=>{
				uni.showToast({
					title: '请求接口失败'
				})
				reject(err)
			}
		})
	})
}
