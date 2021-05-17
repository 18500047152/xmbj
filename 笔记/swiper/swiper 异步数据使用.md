# 直接上代码

```javascript
<template>
  <swiper :options="swiperOption">
    <swiper-slide v-for="(slide,index) in swiperSlides" :key="index">
       <img :src="slide.img" alt="">
        </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</template>

<script>
 export default {
    name: 'carrousel',
    data() {
      return {
        swiperOption: {
            //是否自动轮播
          autoplay:true,
            //异步对象数据
          pagination: {
            el: '.swiper-pagination'
          }
        },
        swiperSlides: []
      }
    },
    mounted() {
    this.$axios({
        //请求的数据接口
        url:"http://tools.yufenghen.cn/mock/yemaijiu/xingjiabijson.php"
    }).then(res=>{
        // console.log(res.data);
        this.swiperSlides=res.data;
    })
    }
  }
</script>

<style>

</style>
```

