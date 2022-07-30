//home模块的小仓库
//准备actions对象——响应组件中用户的动作
import {reqCategoryList, requestBannerList, requestFloorList} from "@/api";

const actions = {
    async getCategoryList(context){
        let result = await reqCategoryList()
        if (result.status===200&&result.data.code===200){
            context.commit('CATEGORYLIST',result.data.data)
        }
    },
    async getBannerList(context){
        let result = await requestBannerList()
        if (result.status===200&&result.data.code===200){
            context.commit('BANNERLIST',result.data.data)
        }
    },
    async getFloorList(context){
        let result = await requestFloorList()
        if (result.status===200&&result.data.code===200){
            context.commit('FLOORLIST',result.data.data)
        }
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    CATEGORYLIST(state,categoryList){
        state.categoryList = categoryList
    },
    BANNERLIST(state,bannerList){
        state.bannerList = bannerList
    },
    FLOORLIST(state,floorList){
        state.floorList = floorList
    }

}
//准备state对象——保存具体的数据
const state = {
    //state中数据默认初始值别瞎写，服务器返回对象，服务器返回数组，依照服务器决定
    categoryList:[],
    bannerList:[],
    floorList:[]
}
const getters = {}
//创建并暴露store
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}