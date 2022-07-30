
//准备actions对象——响应组件中用户的动作
import {reqCartList, reqDeleteCartById, reqUpdateCheckedById} from "@/api";

const actions = {
    //获取购物车列表数据
    async getCartList(context){
        const result = await reqCartList()
        if (result.status===200&&result.data.code===200){
            context.commit('GETCARTLIST',result.data.data)
        }
    },
    //删除购物车商品
    async deleteCartListById(context,skuId){
        const result = await reqDeleteCartById(skuId)
        if (result.data.code===200&&result.status===200){
            return "ok"
        }else {
            //代表加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    },
    //修改商品选中状态
    async updateCheckedById(context,{skuId,isChecked}){
        const result = await  reqUpdateCheckedById(skuId,isChecked)
        if (result.data.code===200&&result.status===200){
            return "ok"
        }else {
            //代表加入购物车失败
            return Promise.reject(new Error('fail'))
        }
    },
    //删除勾选的产品
    deleteAllCheckedCart(context){
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            let promise = item.isChecked ===1? context.dispatch('deleteCartListById',item.skuId):''
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    },
    //修改全部勾选的产品
    updateAllCheck(context,isChecked){
        let PromiseAll = []
        context.getters.cartList.cartInfoList.forEach(item=>{
            let promise = context.dispatch("updateCheckedById",{skuId:item.skuId,isChecked})
            PromiseAll.push(promise)
        })
        return Promise.all(PromiseAll)
    }
}
//准备mutations对象——修改state中的数据
const mutations = {
    GETCARTLIST(state,catList){
        state.cartList = catList
    }

}
//准备state对象——保存具体的数据
const state = {
    cartList:[]
}

const getters = {
    cartList(state){
        return state.cartList[0] || {}
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
