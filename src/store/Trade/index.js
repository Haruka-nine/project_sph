//订单页数据仓库

//准备actions对象——响应组件中用户的动作
import {reqTradeInfo} from "@/api";

const actions = {
    async getTradeInfo(context){
        let result = await reqTradeInfo()
        if (result.status===200&&result.data.code===200){
            context.commit('TRADEINFO',result.data.data)
            return "ok"
        }else {
            alert(result.data.message)
        }
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    TRADEINFO(state,tradeInfo){
        state.tradeInfo=tradeInfo
    }
}
//准备state对象——保存具体的数据
const state = {
    tradeInfo:{}
}

const getters = {
    addressInfo(state){
        return state.tradeInfo.userAddressList || []
    },
    orderInfo(state){
        return state.tradeInfo.detailArrayList
    }
}

//创建并暴露store
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
