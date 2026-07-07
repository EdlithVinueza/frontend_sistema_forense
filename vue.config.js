const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '/api/v1/certificaciones': {
        target: 'http://localhost:8090',
        changeOrigin: true
      },
      '/api/v1/auth': {
        target: 'http://localhost:8080',
        changeOrigin: true
      }
    }
  }
})
