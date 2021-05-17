# swiper 使用

## 1:安装 swiper

cnpm/npm install swiper vue-awesome-swiper --save

## 2:main.js 页面引入文件

import VueAwesomeSwiper from 'vue-awesome-swiper'

// import style

import 'swiper/css/swiper.css'

Vue.use(VueAwesomeSwiper)

## 3:官网使用步骤

https://github.com/surmon-china/vue-awesome-swiper  -->选择swiper4-->v3.13-->点击SPA

## 4:页面源代码案例

```javascript
<template>
  <swiper :options="swiperOption">
    <!-- slides -->
    <swiper-slide>I'm Slide 1</swiper-slide>
    <swiper-slide>I'm Slide 2</swiper-slide>
    <swiper-slide>I'm Slide 3</swiper-slide>

    <!-- Optional controls -->
    <div class="swiper-pagination" slot="pagination"></div>
    <!-- <div class="swiper-button-prev" slot="button-prev"></div>
    <div class="swiper-button-next" slot="button-next"></div>
    <div class="swiper-scrollbar"   slot="scrollbar"></div>-->
  </swiper>
</template>

<script>
export default {
  name: "carrousel",
  data() {
    return {
      swiperOption: {
        autoplay: true
      }
    };
  }
};
</script>
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

```

# 5:图片

![样式](https://ae01.alicdn.com/kf/H8d963fa8d02349e4af010b5f683ab73bg.jpg)

![](https://ae01.alicdn.com/kf/H32d3dcfab0ef4a05825e928cd600d10b9.jpg)

