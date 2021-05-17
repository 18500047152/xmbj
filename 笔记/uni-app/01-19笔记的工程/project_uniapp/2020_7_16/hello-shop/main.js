import Vue from 'vue'
import App from './App'
//将封装的全局接口api挂载到vue上
import { myRequest } from './utils/api.js'
Vue.prototype.$myRuquest = myRequest
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
