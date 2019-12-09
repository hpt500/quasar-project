const isProd = process.env.NODE_ENV === 'production'
module.exports = {
    api: isProd ? '/' : 'http://localhost:3000/',
    timeout: 30000,
}
