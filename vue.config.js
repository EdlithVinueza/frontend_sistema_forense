const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8085,
    proxy: {
      '/api/v1/certificaciones': {
        target: 'http://localhost:8080',
        changeOrigin: true
      },
      '/api/v1/auth': {
        target: 'http://localhost:8081',
        changeOrigin: true
      },
      '/usuarios': {
        target: 'http://localhost:8081',
        changeOrigin: true
      }
    }
  }
})
