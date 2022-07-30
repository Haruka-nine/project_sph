const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //使打包时不构建map文件，map文件作用:打包后js文件是加密的，map可以在报错时告诉我们哪一行报错，但已经上线打包没必要获取这个信息
  productionSourceMap:false,
  transpileDependencies: true,
  lintOnSave:false,  //关闭eslint
  //设置代理服务器
  devServer:{
    proxy: {
      "/api": {
        target: "http://gmall-h5-api.atguigu.cn"
      }
    }
  }
})
