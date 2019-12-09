import Vue from 'vue'
import Vuex from 'vuex'

// 其他注入模块
import modules from './modules/index'
// 全局分发
import actions from './actions'
// 全局函数
import mutations from './mutations'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/*{ ssrContext }*/) {
    const Store = new Vuex.Store({
        state: {
            project: "xyx1530",
            user: {}, // 用户信息

            hasLimit: true, // 权限
        },
        actions,
        mutations,
        modules,

    })
    return Store
}
