//当前这个模块:对api进行同一管理
import requests from "@/api/ajax";
import mockRequests from "./mockAjax"
//三级联动接口
// /api/product/getBaseCategoryList  get  无参数

export const reqCategoryList = ()=>{
    //发请求:axios发请求返回的结果是Promise对象
    return requests({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}

//获取banner(home轮播图接口)
export const requestBannerList = ()=>{
    return mockRequests.get('/banner')
}

//获取floor轮播图接口
export const requestFloorList =()=>{
    return mockRequests.get('floor')
}
//获取参数的请求
export const requestGetSearchInfo = (params)=>requests({
    url:"/list",
    method:"post",
    data:params
})

//获取产品详情信息
export const reqGoodInfo = (skuId)=> requests({
    url:`/item/${skuId}`,
    method:"get"
})

//将产品添加到购物车中（获取更新某一个产品的个数）
export const reqAddOrUpdateShopCart = (skuId,skuNum)=> requests(
    {
        url:`/cart/addToCart/${skuId}/${skuNum}`,
        method:"post"
    }
)
//获取购物车列表接口
export const reqCartList = ()=>requests({
    url:"/cart/cartList",
    method:'get'
})

//删除购物车商品
export const reqDeleteCartById = (skuId)=> requests({
    url:`/cart/deleteCart/${skuId}`,
    method:'delete'
})

//修改商品选中状态
export const reqUpdateCheckedById = (skuId,isChecked) =>requests({
    url:`/cart/checkCart/${skuId}/${isChecked}`,
    method:'get'
})
//获取验证码
export const reqGetCode = (phone)=> requests({
        url:`/user/passport/sendCode/${phone}`,
        method:"get"
})
//注册
export const reqUserRegister = (data)=> requests({
    url:"/user/passport/register",
    data,
    method:'post'
})
//登陆
export const reqLogin = (data)=>requests({
    url:'/user/passport/login',
    data,
    method:'post'
})
//获取用户信息
export const reqUserInfo = ()=>requests({
    url:'/user/passport/auth/getUserInfo',
    method:"get"
})
//退出登陆
export const reqLogOut = ()=>requests({
    url:'/user/passport/logout',
    method:'get'
})

//获取订单交易页信息
export const reqTradeInfo = ()=>requests({
    url:'/order/auth/trade',
    method:'get'
})

//提交订单
export const reqSubmitOrder = (tradeNo,data)=>requests({
    url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
    data,
    method:'post'
})
//获取订单支付信息
export const reqPayInfo = (orderId)=>requests({
    url:`/payment/weixin/createNative/${orderId}`,
    method:'get'
})
//获取支付订单状态
export const reqPayStatus = (orderId)=>requests({
    url:`/payment/weixin/queryPayStatus/${orderId}`,
    method:'get'
})
//获取个人中心订单列表
export const reqMyOrderList = (page,limit)=>requests({
    url:`/order/auth/${page}/${limit}`,
    method:'get'
})