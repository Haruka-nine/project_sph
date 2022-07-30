<template>
  <div class="swiper" id="imageList">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index) in skuImageList" :key="slide.id" >
        <img :src="slide.imgUrl" alt="" :class="{active:currentIndex===index}" @click="changeImg(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper/bundle';
  export default {
    name: "ImageList",
    data(){
      return{
        currentIndex:0
      }
    },
    props:['skuImageList'],
    mounted() {
      //这里if是用来解决直接获取数据，导致watch检测不到，没有绑定
      if (this.skuImageList.length!==0){
        this.$nextTick(()=>{
          const swiper = new Swiper("#imageList", {
            //一次显示的图片
            slidesPerView:3,
            slidesPerGroup:1,
            observer:true,
            observeParents: true,
            // Navigation arrows
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            }
          });
        })
      }
    },
    watch:{
      //这里是获取太慢，开始没有获取，需要监视获取，一旦改变就绑定
      skuImageList:{
        handler(){
          this.$nextTick(()=>{
            const swiper = new Swiper("#imageList", {
              slidesPerView:3,
              slidesPerGroup:1,
              observer:true,
              observeParents: true,
              // Navigation arrows
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            });
          })
        }
      }
    },
    methods:{
      changeImg(index){
        //修改响应式数据
        this.currentIndex = index
        //通知兄弟组件:当前的索引值为几
        this.$bus.$emit('getIndex',this.currentIndex)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

        //&:hover {
        //  border: 2px solid #f60;
        //  padding: 1px;
        //}
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>