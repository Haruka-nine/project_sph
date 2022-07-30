<template>
  <div id="app">
    <!--<h1 v-upper="msg"></h1>-->
    <Header/>
    <!--路由组件出口的地方-->
    <router-view></router-view>
    <!--在Home、Search显示，在登陆、注册隐藏-->
    <Footer v-show="$route.meta.show"/>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
export default {
  name: 'App',
  data(){
    return{
      msg:'abc'
    }
  },
  components:{
    Header,
    Footer
  },
  mounted() {
    this.$store.dispatch('home/getCategoryList')
  }

}
</script>

<style>

</style>
