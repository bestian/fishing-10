module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/fishing-10/'
    : '/',
  pluginOptions: {
    cordovaPath: 'src-cordova',
  },
  chainWebpack: config => {
      config.module.rule('pug')
          .test(/\.pug$/)
          .use('pug-html-loader')
          .loader('pug-html-loader')
          .end()
  }
}
