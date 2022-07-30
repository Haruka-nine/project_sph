// import Home from "@/pages/Home/Home";
import Search from "@/pages/Search/Search";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register/Register";
import Detail from "@/pages/Detail/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess/AddCartSuccess";
import ShopCart from "@/pages/ShopCart/ShopCart";
import Trade from "@/pages/Trade/Trade";
import Pay from "@/pages/Pay/Pay";
import PaySuccess from "@/pages/PaySuccess/PaySuccess";
import Center from "@/pages/Center/Center";
import myOrder from "@/pages/Center/myOrder/myOrder";
import groupOrder from "@/pages/Center/groupOrder/groupOrder";

const foo=()=>{
    return import("@/pages/Home/Home")
}
export default [
    {
        path:"/home",
        component:foo,
        meta:{show:true},
    },
    {
        name:"search",
        path:"/search/:keyword?",
        component:Search,
        meta:{show:true}
    },
    {
        path:"/login",
        component:Login,
        meta:{show:false}
    },
    {
        path:"/register",
        component:Register,
        meta:{show:false}
    },
    {
        path:'/detail/:skuId',
        component:Detail,
        meta:{show:true}

    },
    //重定向，在项目跑起来的时候,访问/，立马让他定位到首页
    {
        path:"*",
        redirect:"/home"
    },
    {
        name: "addcartsuccess",
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta:{show:true}
    },
    {
        name:"shopcart",
        path: "/shopcart",
        component: ShopCart,
        meta:{show:true}
    },
    {
        path: "/trade",
        component: Trade,
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            if (from.path==='/shopcart'){
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: "/pay",
        component: Pay,
        meta:{show:true},
        //路由独享守卫
        beforeEnter:(to,from,next)=>{
            if (from.path==='/trade'){
                next()
            }else {
                next(false)
            }
        }
    },
    {
        path: '/paysuccess',
        component: PaySuccess,
        meta:{show:true}
    },
    {
        path: '/center',
        component: Center,
        meta:{show:true},
        //二级路由组件
        children:[
            {
                path:'myorder',
                component:myOrder
            },
            {
                path:'grouporder',
                component: groupOrder
            }
        ]
    }
]