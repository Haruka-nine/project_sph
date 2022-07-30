import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from "@/components/TypeNav/TypeNav";
import Carousel from "@/components/Carousel/Carousel";
import Pagination from "@/components/Pagination/Pagination";
//第一个参数:全局组件的名字,第二个参数:哪一个组件
Vue.component(TypeNav.name,TypeNav)
Vue.component(Carousel.name,Carousel)
Vue.component(Pagination.name,Pagination)
//引入路由
import router from "@/router";
//引入Vuex
import store from "@/store";
//引入mock模拟数据
import '@/mock/mockServer'
//引入swiper样式
import 'swiper/css/bundle';
//引入element ui的icon
import { Icon,Button,MessageBox } from 'element-ui';
Vue.use(Icon)
Vue.use(Button)
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.config.productionTip = false
//引入lazyload
//这里只能使用1.3.3，后边的版本是有问题的
import VueLazyload from 'vue-lazyload'
const loadimage = require('@/assets/loading.png')
Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: loadimage,
  attempt: 1
})
//引入自定义插件
import myPlugins from "@/plugins/myPlugins";
Vue.use(myPlugins,{name:'upper'})
//引入表单校验插件,只需要引入让其执行一般就可以
import "@/plugins/validate"
//统一接收接口api文件夹里的全部请求函数
import * as API from '@/api'
new Vue({
  render: h => h(App),
  //全局事件总线
  beforeCreate() {
    Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
    Vue.prototype.$API = API  //将所有的api挂载带全局上---统一引入
  },
  //配置路由: 根据es6 kv一致可以省略v 相当于  router:router
  //注册路由信息:当这里书写router的时候，组件身上都拥有$route,$router属性
  router,
  //注册仓库:组件实例身上会多出一个属性$store属性
  store
}).$mount('#app')
