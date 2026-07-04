const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/usuarios': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
