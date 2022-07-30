//search模块的小仓库
import {requestGetSearchInfo} from "@/api";
//准备actions对象——响应组件中用户的动作
const actions = {
    //获取Search模块
    async getSearchList(context,value={}){
        const result = await requestGetSearchInfo(value)
        if(result.status===200&&result.data.code===200){
            context.commit('SEARCHLIST',result.data.data)
        }
    }

}
//准备mutations对象——修改state中的数据
const mutations = {
    SEARCHLIST(state,value){
        state.searchList = value
    }
}
//准备state对象——保存具体的数据
const state = {
    searchList:{}
}
//项目中getters主要的作用是:简化仓库中的数据（）
const getters = {
    //如果服务器数据没问题是一个数组
    //如果网络不给力/没有网，需要配置返回一个空数组，（可以遍历空但不能遍历undefined）
    goodsList(state){
        return state.searchList.goodsList || []
    },
    trademarkList(state){
        return state.searchList.trademarkList || []
    },
    attrsList(state){
        return state.searchList.attrsList || []
    },


}
//创建并暴露store
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}