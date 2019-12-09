
import { Cookies, Loading, Platform, LocalStorage } from 'quasar'
// leave the export, even if you don't use it
export default ({ router, store, Vue, ssrContext }) => {
    // something to do
    // 路由驗證
    // 于路由访问前进行验证
    router.beforeEach((to, from, next) => {
        const cookies = process.env.SERVER
            ? Cookies.parseSSR(ssrContext)
            : Cookies
        let cookDeal = !(Platform.is && Platform.is.cordova) ? cookies.getAll() : LocalStorage.getAll();
        if (to.matched.some(record => record.meta.requireLogin)) {
            // 判断该路由是否需要登录权限
            // 判断当前的token是否存在
            // or 判断是否存在id -- test
            if (cookDeal && cookDeal.test_id) {
                next()
            }
            else { next({ path: '/start' }) }
        }
        else { next() }
    });
    router.afterEach((to, from) => {
    })
}
