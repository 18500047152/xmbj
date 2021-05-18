import {
	api, apijl
} from './http.js'
export const httpRequest_ = {
	post: (url, obj, header_ = '') => {
		let header = header_ || {}; // 请求头
		return new Promise((resolve, reject) => {
			uni.request({
				url: api + url + '&wxapp_id=10001',
				data: obj,
				header,
				method: "POST",
				success: (res) => {
					if (res.statusCode !== 200 || typeof res.data !== 'object') {
						otherAPI.toast('网络请求出错', 'none', false, 1500);
						return false;
					}
					resolve(res.data);
				},
				fail: (err) => {
					reject(err);
					otherAPI.toast('请求失败，请稍后再试', 'none', false, 1500);
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		});
	},
	get: (url, obj = '', header_ = '') => {
		uni.showLoading({
		});
		let header = header_ || {};
		return new Promise((resolve, reject) => {
			uni.request({
				url: api + url + '&wxapp_id=10001',
				data: obj,
				header,
				method: "GET",
				success: (res) => {
					if (res.statusCode !== 200 || typeof res.data !== 'object') {
						otherAPI.toast('网络请求出错', 'none', false, 1500);
						return false;
					}
					resolve(res.data);
				},
				fail: (err) => {
					reject(err);
					otherAPI.toast('请求失败，请稍后再试', 'none', false, 1500);
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		});
	},
	getjl: (url, obj = '', header_ = '') => {
		let header = header_ || {};
		return new Promise((resolve, reject) => {
			uni.request({
				url: apijl + url + '&wxapp_id=10001',
				data: obj,
				header,
				method: "GET",
				success: (res) => {
					if (res.statusCode !== 200 || typeof res.data !== 'object') {
						otherAPI.toast('网络请求出错', 'none', false, 1500);
						return false;
					}
					resolve(res.data);
				},
				fail: (err) => {
					reject(err);
					otherAPI.toast('请求失败，请稍后再试', 'none', false, 1500);
				},
				complete: () => {
					uni.hideLoading()
				}
			})
		});
	}
}

export const otherAPI = {
	// 验证是否登录
	getToken: () => {
		if (!uni.getStorageSync('token')) {
			uni.reLaunch({
				url: 'pages/regLogin/login'
			});
		}
	},
	// 加载框
	loading: (title, mask) => {
		uni.showLoading({
			title: title,
			mask: mask
		});
	},
	// 封装弹窗
	toast: (msg, icon, mask, duration, position = '') => {
		uni.showToast({
			title: msg,
			icon: icon,
			mask: mask,
			duration: duration,
			position: position
		});
	},
	// 时间戳转换
	getTimestamp: (timestamp) => {
		var date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
		var Y = date.getFullYear() + '-';
		var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
		var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
		var h = date.getHours() + ':';
		var m = date.getMinutes() + ':';
		var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
		return Y + M + D + h + m + s;
	},
	//验证手机号
	verifyPhone: (phone) => {
		if (!(/^1[3456789]\d{9}$/.test(parseInt(phone)))) {
			return false;
		} else {
			return true;
		}
	},
	// 跳转
	nav:(url) => {
		if (getApp().globalData.navStatus === true) {
			return false
		}
		getApp().globalData.navStatus = true;
		uni.navigateTo({
			url: url,
			success: () => {
				getApp().globalData.navStatus = false;
			}
		});
	}
}
