// const { resolve } = require('path')
module.exports = {
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        data: `@import "@/scss/variables.scss";`,
      },
    },
    sourceMap: false,
  },
  // transpileDependencies: ['vuex-module-decorators'],
  productionSourceMap: false,
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@icons': resolve(__dirname, 'node_modules/vue-material-design-icons'),
  //     },
  //     extensions: ['.vue'],
  //   },
  // },
 
}
