import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter)
import routes from "@/router/routes";
//引入store
import store from "@/store";
//先把VueRouter 原型对象的push先保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
//重写push|replace
//第一个参数:告诉原来push方法，你往哪里跳转(传哪些参数)
VueRouter.prototype.push=function (location, onComplete, onAbort) {
    if (onComplete && onAbort){
        //call和apply区别:都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call 和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this,location,onComplete,onAbort)
    }
    else {
        originPush.call(this,location,()=>{},()=>{})
    }
}
VueRouter.prototype.replace=function (location, onComplete, onAbort) {
    if (onComplete && onAbort){
        //call和apply区别:都可以调用函数一次，都可以篡改函数的上下文一次
        //不同点：call 和apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originReplace.call(this,location,onComplete,onAbort)
    }
    else {
        originReplace.call(this,location,()=>{},()=>{})
    }
}

let router =  new VueRouter({
    routes:routes,
    scrollBehavior (to, from, savedPosition) {
        // return 期望滚动到哪个的位置
        return { x: 0, y: 0 }
    }
})
//全局守卫:前置守卫(在路由跳转前进行panduan)
router.beforeEach((to,form,next)=>{
    //to:可以获取到你要跳转的路由信息
    //from:可以获取到你从那个路由而来的信息
    //next:放行函数  next()放行  next(path) 放行到指令路由
    //用户登陆了，才会有token，未登录一定不会有token
    let token = store.state.user.token
    let name = store.state.user.userInfo.name
    //用户已经登陆了
    if (token){
        if (to.path==='/login'){
            //已登陆，不能访问login，转到首页
            next('/')
        }else {
            //已登陆，去的不是login
            //先对用户信息进行处理
            if (name){
                next()
            }else {
                store.dispatch('user/getUserInfo').then(r => {
                    next()
                }).catch((err)=>{
                    //token失效了，就是说登陆过期了
                    //需要清除token，然后重新登陆
                    store.commit('user/CLEAR')
                    next('/login')
                })
            }

        }
    }else {
        //未登录:不能去交易相关、不能去支付相关[pay|paysuccess],个人中心
        //未登陆去上面这些路由----转去登陆
        let toPath = to.path
        if (toPath.indexOf('/trade')!==-1|| toPath.indexOf('/pay')!==-1 || toPath.indexOf('/center')!==-1){
            //把未登录的时候去而没有生成的信息，存储于地址栏中
            next('/login?redirect='+toPath)
        }else {
            next()
        }

    }
})


export default router