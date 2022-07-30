<template>
  <div>
    <!--三级联动全局组件-->
    <TypeNav/>
    <ListContainer/>
    <Recommend/>
    <Rank/>
    <Like/>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
 </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/ListContainer";
import Recommend from "@/pages/Home/Recommend/Recommend";
import Rank from "@/pages/Home/Rank/Rank";
import Like from "@/pages/Home/Like/Like";
import Floor from "@/pages/Home/Floor/Floor";
import Brand from "@/pages/Home/Brand/Brand";
import {mapState} from "vuex";
export default {
  name: "Home",
  components: {Brand, Floor, Like, Rank, Recommend, ListContainer},
  mounted() {
    //获取floor组件的数据
    this.$store.dispatch('home/getFloorList')
  },
  computed:{
    ...mapState('home',['floorList'])
  }
}
</script>

<style scoped>

</style>