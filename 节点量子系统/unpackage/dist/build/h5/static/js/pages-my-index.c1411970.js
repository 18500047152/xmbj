(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-index"],{"0067":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,"\n.content[data-v-afaa1972]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;z-index:99998}.head[data-v-afaa1972]{width:%?694.44?%;margin:auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative}.status_bar[data-v-afaa1972]{height:0;width:100%}.isShow[data-v-afaa1972]{display:none}.returnImg[data-v-afaa1972]{position:absolute;left:0;width:%?60?%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.returnImg_[data-v-afaa1972]{width:%?22.91?%;height:%?41.66?%}.otherTitle[data-v-afaa1972],.otherIcon[data-v-afaa1972]{position:absolute;right:%?0?%;font-size:%?31.94?%}\n\n",""]),t.exports=e},"06fc":function(t,e,i){"use strict";i.r(e);var n=i("e728"),a=i("efbf");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("5191");var s,c=i("f0c5"),r=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"afaa1972",null,!1,n["a"],s);e["default"]=r.exports},"0acf":function(t,e,i){var n=i("0067");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("3897c741",n,!0,{sourceMap:!1,shadowMode:!1})},1337:function(t,e,i){t.exports=i.p+"static/img/extension.48b46cf5.png"},"1de5":function(t,e,i){"use strict";t.exports=function(t,e){return e||(e={}),t=t&&t.__esModule?t.default:t,"string"!==typeof t?t:(/^['"].*['"]$/.test(t)&&(t=t.slice(1,-1)),e.hash&&(t+=e.hash),/["'() \t\n]/.test(t)||e.needQuotes?'"'.concat(t.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):t)}},2858:function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n={props:{headTitle:{type:Object,default:{title:"",color:"",size:"30rpx"}},headReturn:{type:Object,default:function(){return{}}},headOtherText:{type:Object,default:function(){return{}}},headOtherIcon:{type:Object,default:function(){return{}}},headBackground:{type:String,default:""},headHeight:{type:String,default:"129.16rpx"},headPosition:{type:String,default:"relative"}},methods:{otherClick:function(t){this.$emit("otherClick",t)},returnClick:function(){this.$emit("returnClick","returnClick")}}};e.default=n},5191:function(t,e,i){"use strict";var n=i("0acf"),a=i.n(n);a.a},7450:function(t,e,i){"use strict";i.r(e);var n=i("bc1c"),a=i("b3e6");for(var o in a)"default"!==o&&function(t){i.d(e,t,(function(){return a[t]}))}(o);i("8d52");var s,c=i("f0c5"),r=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,"269f349f",null,!1,n["a"],s);e["default"]=r.exports},7819:function(t,e,i){var n=i("b3cb");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var a=i("4f06").default;a("23449f69",n,!0,{sourceMap:!1,shadowMode:!1})},"8d52":function(t,e,i){"use strict";var n=i("7819"),a=i.n(n);a.a},"9fc0":function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.api=void 0;var n="http://devjd.yunduoke.cn/index.php?s=";e.api=n},a4cc:function(t,e,i){"use strict";i("d3b7"),i("e25e"),Object.defineProperty(e,"__esModule",{value:!0}),e.otherAPI=e.httpRequest_=void 0;var n=i("9fc0"),a={post:function(t,e){var i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=i||{};return new Promise((function(i,s){uni.request({url:n.api+t+"&wxapp_id=10001",data:e,header:a,method:"POST",success:function(t){if(200!==t.statusCode||"object"!==typeof t.data)return o.toast("??????????????????","none",!1,1500),!1;i(t.data)},fail:function(t){s(t),o.toast("??????????????????????????????","none",!1,1500)},complete:function(){uni.hideLoading()}})}))},get:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",a=i||{};return new Promise((function(i,s){uni.request({url:n.api+t+"&wxapp_id=10001",data:e,header:a,method:"GET",success:function(t){if(200!==t.statusCode||"object"!==typeof t.data)return o.toast("??????????????????","none",!1,1500),!1;i(t.data)},fail:function(t){s(t),o.toast("??????????????????????????????","none",!1,1500)},complete:function(){uni.hideLoading()}})}))}};e.httpRequest_=a;var o={getToken:function(){uni.getStorageSync("token")||uni.reLaunch({url:"pages/regLogin/login"})},loading:function(t,e){uni.showLoading({title:t,mask:e})},toast:function(t,e,i,n){var a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:"";uni.showToast({title:t,icon:e,mask:i,duration:n,position:a})},getTimestamp:function(t){var e=new Date(t),i=e.getFullYear()+"-",n=(e.getMonth()+1<10?"0"+(e.getMonth()+1):e.getMonth()+1)+"-",a=e.getDate()<10?"0"+e.getDate()+" ":e.getDate()+" ",o=e.getHours()+":",s=e.getMinutes()+":",c=e.getSeconds()<10?"0"+e.getSeconds():e.getSeconds();return i+n+a+o+s+c},verifyPhone:function(t){return!!/^1[34578]\d{9}$/.test(parseInt(t))},nav:function(t){if(!0===getApp().globalData.navStatus)return!1;getApp().globalData.navStatus=!0,uni.navigateTo({url:t,success:function(){getApp().globalData.navStatus=!1}})}};e.otherAPI=o},b2f2:function(t,e,i){"use strict";var n=i("ee27");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=i("a4cc"),o=n(i("06fc")),s={components:{Head:o.default},data:function(){return{headTitle:{title:"????????????",color:"#fff",size:"35.93rpx"},headReturn:{status:"isShow",color:"white"},info:[],animation:"",animationData:"",isShow:!1}},onReady:function(){this.info=uni.getStorageSync("data").user_id,this.animation=uni.createAnimation({duration:500,timingFunction:"ease"})},computed:{name:function(){if(this.info)return this.info.username},phone:function(){if(this.info)return this.info.phone},code:function(){if(this.info)return this.info.my_code}},watch:{isShow:function(t,e){1==t?(this.animation.translateY(-uni.upx2px(340)).step(),this.animationData=this.animation.export()):(this.animation.translateY(uni.upx2px(340)).step(),this.animationData=this.animation.export())}},methods:{logout:function(){this.isShow=!this.isShow,uni.setStorageSync("data",""),uni.setStorageSync("phone",this.info.phone),a.otherAPI.toast("????????????","none",!1,1500),setTimeout((function(){uni.reLaunch({url:"/pages/login/login"})}),1500)},clickMark:function(){this.isShow=!this.isShow},returnClick:function(){uni.navigateBack({delta:1})},navClick:function(t){a.otherAPI.nav(t)}}};e.default=s},b3cb:function(t,e,i){var n=i("24fb"),a=i("1de5"),o=i("1337"),s=i("d1e6");e=n(!1);var c=a(o),r=a(s);e.push([t.i,"uni-page-body[data-v-269f349f]{width:100%;height:100%;background-image:url("+c+");background-size:100% 100%;background-repeat:no-repeat}.myBorder[data-v-269f349f]{margin:auto;width:%?712?%;height:%?332?%;background-image:url("+r+");background-size:100% 100%;background-repeat:no-repeat}.myInfo[data-v-269f349f]{width:%?575?%;height:%?175?%;margin:auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-align:center;-webkit-align-items:center;align-items:center;position:relative;top:%?10?%}.myInfo .myImg[data-v-269f349f]{width:%?100?%;height:%?100?%}.myBox[data-v-269f349f]{height:%?100?%;width:%?460?%;margin-left:%?15?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column}.myName[data-v-269f349f]{color:#fff;font-size:%?34?%}.myOther[data-v-269f349f]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;color:#6571a8;font-size:%?28?%}.icon-shouji1[data-v-269f349f]{font-size:%?28?%;position:relative;top:%?2?%}.sesameSeed[data-v-269f349f]{width:%?575?%;height:%?130?%;margin:%?10?% auto;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;color:#a4b4d7;font-size:%?24?%}.icon-jifenguizeguankong[data-v-269f349f]{color:#6571a8}.seedText[data-v-269f349f]{margin-left:%?15?%;font-size:%?26?%}.seedNum[data-v-269f349f]{font-size:%?40?%}.rectangle[data-v-269f349f]{margin:auto;width:%?659?%;height:%?100?%;background-color:#09162f;color:#fff;border-radius:%?10?%}.commission[data-v-269f349f]{width:%?599?%;margin-top:%?40?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?30?%;padding:0 %?30?%}.logout[data-v-269f349f]{margin-top:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?30?%}.logoutBox[data-v-269f349f]{position:fixed;bottom:%?-340?%;left:%?10?%;width:%?730?%;height:%?340?%;background-color:#fff;z-index:100;border-radius:%?15?% %?15?% 0 0}.logoutBox .tips_ uni-text[data-v-269f349f]{display:block;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?30?%}.logoutBox .cancel[data-v-269f349f]{border-top:%?10?% solid #c7c7c8;display:block;height:%?100?%;text-align:center;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;font-size:%?34?%}.tipsText[data-v-269f349f]{height:%?120?%;padding:0 %?60?%;color:#666;border-bottom:%?0.69?% solid #c7c7c8}.logoutText[data-v-269f349f]{height:%?100?%;font-size:%?36?%;color:red}.mark[data-v-269f349f]{width:100%;height:100%;position:fixed;top:0;background-color:#000308;opacity:.6;z-index:99}body.?%PAGE?%[data-v-269f349f]{background-image:url("+c+");background-size:100% 100%;background-repeat:no-repeat}",""]),t.exports=e},b3e6:function(t,e,i){"use strict";i.r(e);var n=i("b2f2"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a},bc1c:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("Head",{attrs:{headTitle:t.headTitle,headReturn:t.headReturn},on:{returnClick:function(e){arguments[0]=e=t.$handleEvent(e),t.returnClick.apply(void 0,arguments)}}}),i("v-uni-view",{staticClass:"myBorder"},[i("v-uni-view",{staticClass:"myInfo"},[i("v-uni-image",{staticClass:"myImg",attrs:{src:"/static/notmyImg.png",mode:""}}),i("v-uni-view",{staticClass:"myBox"},[i("v-uni-text",{staticClass:"myName"},[t._v(t._s(t.name))]),i("v-uni-view",{staticClass:"myOther"},[i("v-uni-view",{staticClass:"myPhone"},[i("v-uni-text",{staticClass:"iconfont icon-shouji1"}),i("v-uni-text",[t._v(t._s(t.phone))])],1),i("v-uni-text",{staticClass:"myCode"},[t._v("?????????:"+t._s(t.code))])],1)],1)],1),i("v-uni-view",{staticClass:"sesameSeed"},[i("v-uni-view",{staticClass:"seed"},[i("v-uni-text",{staticClass:"iconfont icon-jifenguizeguankong"}),i("v-uni-text",{staticClass:"seedText"},[t._v("????????????"),i("v-uni-text",{staticClass:"seedNum"},[t._v("10000")])],1)],1)],1)],1),i("v-uni-view",{staticClass:"rectangle commission",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.navClick("/pages/index/withdrawal")}}},[i("v-uni-text",[t._v("????????????")]),i("v-uni-text",{staticClass:"iconfont icon-you"})],1),i("v-uni-view",{staticClass:"logout rectangle",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickMark.apply(void 0,arguments)}}},[t._v("????????????")]),i("v-uni-view",{staticClass:"logoutBox",attrs:{animation:t.animationData}},[i("v-uni-view",{staticClass:"tips_"},[i("v-uni-text",{staticClass:"tipsText"},[t._v("????????????????????????????????????????????????????????????????????????????????????")]),i("v-uni-text",{staticClass:"logoutText",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.logout.apply(void 0,arguments)}}},[t._v("????????????")])],1),i("v-uni-text",{staticClass:"cancel",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickMark.apply(void 0,arguments)}}},[t._v("??????")])],1),t.isShow?i("v-uni-view",{staticClass:"mark",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.clickMark.apply(void 0,arguments)}}}):t._e()],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},d1e6:function(t,e,i){t.exports=i.p+"static/img/myBorder.6ea58c8d.png"},e728:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content",style:"background-color:"+t.headBackground+";height:"+t.headHeight+";position:"+t.headPosition},[i("v-uni-view",{staticClass:"status_bar"}),i("v-uni-view",{staticClass:"head"},[i("v-uni-view",{staticClass:"returnImg",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.returnClick.apply(void 0,arguments)}}},[i("v-uni-image",{staticClass:"returnImg_",class:[{isShow:"isShow"!=t.headReturn.status}],attrs:{src:"white"==t.headReturn.color?"/static/fanhui1.png":"/static/fanhui.png",mode:""}})],1),i("v-uni-text",{staticClass:"title",style:"color:"+t.headTitle.color+";font-size:"+t.headTitle.size},[t._v(t._s(t.headTitle.title))]),i("v-uni-text",{staticClass:"otherTitle",style:"color:"+t.headOtherText.color+";font-size:"+t.headOtherText.size,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.otherClick(t.headOtherText.url)}}},[t._v(t._s(t.headOtherText.text))]),i("v-uni-text",{class:["otherIcon iconfont",t.headOtherIcon.icon],style:"color:"+t.headOtherIcon.color+";font-size:"+t.headOtherIcon.size,on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.otherClick(t.headOtherIcon.url)}}})],1)],1)},o=[];i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return n}))},efbf:function(t,e,i){"use strict";i.r(e);var n=i("2858"),a=i.n(n);for(var o in n)"default"!==o&&function(t){i.d(e,t,(function(){return n[t]}))}(o);e["default"]=a.a}}]);