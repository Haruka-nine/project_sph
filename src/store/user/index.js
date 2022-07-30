//登陆和注册的模块
import {reqGetCode, reqLogin, reqLogOut, reqUserInfo, reqUserRegister} from "@/api";
import {getToken, removeToken, setToken} from "@/utils/token";
//准备actions对象——响应组件中用户的动作
const actions = {
    //获取验证码
    async getCode(context,phone){
        let result = await reqGetCode(phone)
        if (result.data.code===200&&result.status===200){
            context.commit('GETCODE',result.data.data)
            return "ok"
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //用户注册
    async userRegister(context,user){
        let result = await reqUserRegister(user)
        if (result.data.code===200&&result.status===200){
            return "ok"
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //登陆业务
    async userLogin(context,data){
        let result = await reqLogin(data)
        //服务器下发的token，用户唯一标识符（uuid）
        //将来通过带token找服务器要用户信息进行展示
        if (result.data.code===200&&result.status===200){
            //用户已经登陆成功且获取到token
            context.commit('USERLOGIN',result.data.data.token)
            //持久化存储token
            setToken(result.data.data.token)
            return "ok"
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //获取用户信息
    async getUserInfo(context){
        let result = await reqUserInfo()
        if (result.data.code===200&&result.status===200){
            context.commit('GETUSERINFO',result.data.data)
            return "ok"
        }else {
            return Promise.reject(new Error('fail'))
        }
    },
    //退出登陆
    async userLogOut(context){
        //只是向服务发起请求，通知服务器删除token
        let result = await reqLogOut()
        if (result.data.code===200&&result.status===200){
            //删除vuex仓库和浏览器数据
            context.commit('CLEAR')
            return "ok"
        }else {
            return Promise.reject(new Error('fail'))
        }
    }

}
//准备mutations对象——修改state中的数据
const mutations = {
    GETCODE(state,code){
        state.code = code
    },
    USERLOGIN(state,token){
        state.token = token
    },
    GETUSERINFO(state,data){
        state.userInfo = data
    },
    CLEAR(state){
        state.token=''
        state.userInfo={}
        removeToken()
    }

}
//准备state对象——保存具体的数据
const state = {
    code:"",
    token:getToken(),
    userInfo:{}
}

const getters={}
//创建并暴露store
export default {
    namespaced:true,
    actions,
    mutations,
    state,
    getters
}
