let myPlugins = {}

myPlugins.install=function (Vue, options) {
    //Vue.prototype.$bus:任何组件都可以使用
    //Vue.directive
    Vue.directive(options.name,(element,params)=>{
        element.innerHTML= params.value.toUpperCase()
    })
}
export default myPlugins