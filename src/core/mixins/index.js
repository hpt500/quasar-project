export default {
    computed: {
        // 网站名称
        pname() {
            return this.$store.state.project
        },
        user() { // 用户信息
            return this.$store.state.user
        },
        user_id() { // 用户id
            return this.$store.state.user._id ? this.$store.state.user._id : ''
        },

        // 是否具备权限
        hasLimit() {
            return this.$store.state.hasLimit
        }

    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            // 确认路由是否为初始路由界面 -- 登录跳转 or 返回
            // vm.spaceRt = from && from.path == '/'
            // if (/user/.test(to.path) && !(/user/.test(from.path))) {
            //     vm.$store.state.loginRoute = from.fullPath == '/' ? '/mine' : from.fullPath
            // }

        })
    },

    methods: {
        // 判断是否登录
        ifLogin() {
            if (!this.user_id) {
                // this.$store.state.dialog.loginDia = true
                return false
            } else {
                return true
            }
        }
    },
}
