import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
// Vue.prototype.url = "http://devjd.yunduoke.cn/index.php?wxapp_id=10001&s="
App.mpType = 'app'
//添加全局过滤器,过滤交易金额,规则:1:保留末尾两位小数2:末尾0舍弃3:如果末尾都是0,.00舍弃,保留整数
 Vue.filter("numFilter",(value)=>{  
         return parseFloat(parseFloat(value).toFixed(2))
     }
 )


const app = new Vue({
	...App
})
app.$mount();
