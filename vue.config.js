module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 3000,
        https: false,
        hotOnly: false,
        proxy: {
            '/api': {
                target: 'http://localhost:8080',
                //pathRewrite: { '^/api/v1': '/api/v1' },
                ws: true,
                changeOrigin: true,
                secure: false
            }
        }
    }
}