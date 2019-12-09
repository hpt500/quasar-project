// import something here
import * as filters from 'core/filters'
import mixins from 'core/mixins'

// "async" is optional
export default async ({ Vue }) => {
    // something to do
    // 引入混合
    Vue.mixin(mixins)
    // 引入过滤
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })

    // 绑定资源路径地址前缀 -- cdn
    Vue.prototype.cdnSrc = process.env.NODE_ENV === 'production' ? "/" : "/"

}
