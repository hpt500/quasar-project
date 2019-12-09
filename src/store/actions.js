export default {
    // 测试
    async test({ state, commit, rootState: { axios } }, m) {
        let res = await axios.post('test/index', m)
        let { status, data } = res
        if (status && status == 200 && data && data != '') {
            let deal = data.data, state = data.state
            if (state && state == 200) {
                return deal
            } else {
                return 0
            }
        } else
            return 0
    },

    // 登录
    async login({ rootState: { axios } }, m) {
        console.log("进行登录", m)
        let res = await axios.post('login', m)
        if (res && res.status == 200) {
            // 返回数据成功 获取小说排行榜数据
            console.log(res)
            if (res.data && res.data != '') {
                return res.data
            }
        } else
            return 0
    },

    // 注册
    async register({ rootState: { axios } }, m) {
        let res = await axios.post('register', m)
        if (res && res.status == 200) {
            console.log(res)
            if (res.data && res.data != '') {
                return res.data
            }
        } else
            return 0
    },

    // 操作cookie信息
    handleCookie({ state, commit, dispatch }, { cookDeal, ssrContext }) {
        if (cookDeal) {
            let userDeal = cookDeal.test_user ? JSON.parse(unescape(unescape(cookDeal.test_user))) : null;
            commit('SET_USER_DEAL', { m: userDeal, ssrContext: ssrContext })
        }
        commit('SET_AXIOS', { cookDeal: cookDeal, ssrContext: ssrContext })
    },


}
