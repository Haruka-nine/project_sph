//引入Vue核心库
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
//引入小仓库
import home from "@/store/home";
import search from "@/store/search";
import detail from "@/store/detail";
import ShopCart from "@/store/ShopCart";
import user from "@/store/user";
import Trade from "@/store/Trade";
export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        ShopCart,
        user,
        Trade
    }
})