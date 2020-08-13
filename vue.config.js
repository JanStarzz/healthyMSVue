module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        // 你请求的第三方接口
        // target: 'http://interface.sina.cn',
        target: 'https://view.inews.qq.com',
        // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        changeOrigin: true,
        // 路径重写，
        pathRewrite: {
          // 替换target中的请求地址
          '^/api': ''
        }
      },
      '/news': {
        target: 'https://www.maomin.club/fy/get/ ',
        changeOrigin: true,
        pathRewrite: {
          '^/news': ''
        }
      }
    }
  }
}
