import {reqGoodInfo,reqAddOrUpdateShopCart} from "@/api";
import {getUUID} from "@/utils/uuid_token";
//准备actions对象——响应组件中用户的动作
const actions = {
    async getGoodInfo(context,skuId){
        const result = await reqGoodInfo(skuId)
        if (result.status===200&&result.data.code===200){
            context.commit('GOODINFO',result.data.data)
        }
    },
    //将产品添加到购物车
    async addOrUpdateShopCart(context, {skuId, skuNum}){
        //加入购物车返回的结果
        const result = await reqAddOrUpdateShopCart(skuId,skuNum)
        //当前的这个函数如果执行返回Promise
        if (result.data.code===200&&result.status===200){
            return "ok"
        }else {
            //代表加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    }

}
//准备mutations对象——修改state中的数据
const mutations = {
    GOODINFO(state,value){
        state.goodInfo = value
    }
}
//准备state对象——保存具体的数据
const state = {
    goodInfo:{},
    uuid_token:getUUID()
}

const getters = {
    categoryView(state){
        //初始值为空对象，导致返回undefined,对undefined取数据会报错
        //并上一个空对象就不会出现假报错
        return state.goodInfo.categoryView ||{}
    },
    skuInfo(state){
        //初始值为空对象，导致返回undefined,对undefined取数据会报错
        //并上一个空对象就不会出现假报错
        return state.goodInfo.skuInfo ||{}
    },
    spuSaleAttrList(state){
        //初始值为空对象，导致返回undefined,对undefined取数据会报错
        //并上一个空对象就不会出现假报错
        return state.goodInfo.spuSaleAttrList ||[]
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