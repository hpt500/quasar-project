<template>
    <q-page padding>
        <!-- content -->
        首页
        <div>welcome, {{user.name}} !</div>
        <q-btn color="primary" @click="logout" label="注销" />
    </q-page>
</template>

<script>
export default {
    name: "home",
    async preFetch({
        store,
        currentRoute,
        previousRoute,
        redirect,
        ssrContext
    }) {
        // 数据预取
        return
    },
    methods: {
        logout() {
            // 登出
            new Promise(resolve => {
                this.$store.commit("CLEAR_USER_DEAL");
                resolve();
            }).then(res => {
                this.$router.replace("/start");
            });
        }
    }
};
</script>

<style>
</style>
