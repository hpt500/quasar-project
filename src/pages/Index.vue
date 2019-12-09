<template>
    <q-page padding class="row items-center justify-center">
        <div class="flex column flex-center">
            <p class="test q-mb-md" @click="handler">Welcome to xyx测试</p>
            <div>
                <q-btn class="q-mr-sm" color="amber" :to="'/login'" glossy label="登录" />
                <q-btn color="deep-orange" :to="'/register'" glossy label="注册" />
            </div>
        </div>

    </q-page>
</template>

<style>
</style>

<script>
export default {
    name: "PageIndex",
    created() {
        /*setTimeout(() => {
            console.log(this.$store.state);
        }, 1000);*/
    },
    methods: {
        handler() {
            console.log(this.$store.state.axios)
        }
    }
};
</script>
