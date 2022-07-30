<template>
  <div class="swiper" :id="id">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(src,index) in list" :key="src.id">
        <img :src="src.imgUrl" alt=""/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
export default {
  name: "Carousel",
  props:['list','id'],
  mounted() {
    //这里if是用来解决直接获取数据，导致watch检测不到，没有绑定
    if (this.list.length!==0){
      this.$nextTick(()=>{
        const swiper = new Swiper(`#${this.id}`, {
          loop: true,
          observer:true,
          observeParents: true,
          // If we need pagination
          pagination: {
            el: '.swiper-pagination',
            clickable : true
          },

          // Navigation arrows
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },

          // And if we need scrollbar
          scrollbar: {
            el: '.swiper-scrollbar',
          },
        });
      })
    }
  },
  watch:{
    //这里是获取太慢，开始没有获取，需要监视获取，一旦改变就绑定
    list:{
      handler(){
        this.$nextTick(()=>{
          const swiper = new Swiper(`#${this.id}`, {
            loop: true,
            observer:true,
            observeParents: true,
            // If we need pagination
            pagination: {
              el: '.swiper-pagination',
              clickable : true
            },

            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },

            // And if we need scrollbar
            scrollbar: {
              el: '.swiper-scrollbar',
            },
          });
        })
      }
    }
  },
}
</script>

<style scoped>

</style>