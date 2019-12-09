<template>
    <q-page padding class="row items-center justify-center">
        <q-form @submit="register" class="flex cloumn flex-center" :ref="'rform'">
            <div class="panel panel-default">
                <div class="panel-body m15">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-user"></span>
                            </span>
                            <q-input filled dense v-model="username" :placeholder="'请输入用户名'" lazy-rules
                                :rules="[ val => val && val.length > 0 ]" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-lock"></span>
                            </span>
                            <q-input class="q-mb-sm" color="ttblue" filled dense v-model="password"
                                :placeholder="'请输入新密码'" lazy-rules maxlength="16" :rules="[ 
                        val => val !== null && val !== '' || '密码不能为空',
                        val => val && val.length >= 6 || '请输入六位以上的密码'
                    ]" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-lock"></span>
                            </span>
                            <q-input class="q-mb-sm" color="ttblue" filled dense v-model="password2"
                                :placeholder="'请再次输入密码'" lazy-rules maxlength="16" :rules="[ 
                        val => val !== null && val !== '' || '密码不能为空',
                        val => val && val == password || '密码不一致'
                    ]" />
                        </div>
                    </div>

                    <div class="form-group q-mt-sm row justify-between">
                        <q-btn color="green" type="submit" :loading="loading" label="注册" />
                        <q-btn :to="'/login'" color="primary" label="去登录" />
                    </div>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            username: "",
            password: "",
            password2: "",

            loading: false,
        };
    },
    methods: {
        register(val) {
            this.$refs.rform.validate().then(success => {
                if (success) {
                    this.loading = true;
                    let data = { uname: this.username, upwd: this.password };
                    this.$store.dispatch("register", data).then(res => {
                        this.loading = false;
                        if (res === 0)
                            this.$q.notify({
                                message: "注册失败，请稍候再试！",
                                color: "red"
                            });
                        else {
                            this.$store.commit("SET_USER_DEAL", {
                                m: res
                            });
                            this.$router.replace("/home");
                        }
                    });
                } else {
                    this.$q.notify({
                        color: "red",
                        message: "信息未填写完整！"
                    });
                }
            });
        }
    }
};
</script>

<style>
</style>
