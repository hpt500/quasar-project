import apiClient from 'api/index-client'
import { api as apiServer } from 'api/index-server'
import { Cookies, Platform, LocalStorage } from 'quasar'
let axiosInstance
export default ({ app, store, router, Vue, ssrContext }) => {
    const cookies = process.env.SERVER
        ? Cookies.parseSSR(ssrContext)
        : Cookies // otherwise we're on client
    // 应用程序 ios端没有浏览器cookie对象
    let cookDeal = !(Platform.is && Platform.is.cordova) ? cookies.getAll() : LocalStorage.getAll();
    if (ssrContext) {
        // 操作cookie信息
        Vue.prototype.isSSR = true
        store.dispatch('handleCookie', { cookDeal: cookDeal, ssrContext: ssrContext })
        axiosInstance = apiServer(cookDeal)
    } else {
        // !注:若使用ssr模式 需使用数据渲染 ↓  非ssr模式需注释下面两行代码
        if (!Platform.is.cordova)
            store.replaceState(window.__INITIAL_STATE__)
        Vue.prototype.axios = apiClient
        // 操作cookie信息
        store.dispatch('handleCookie', { cookDeal: cookDeal, ssrContext: ssrContext })
        
        axiosInstance = apiClient
    }
}
// 这里我们定义一个命名的导出，
// 然后我们后面可以使用这个内部的.js文件:
export { axiosInstance }