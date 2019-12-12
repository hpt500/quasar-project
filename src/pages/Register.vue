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
                            <q-input filled dense v-model="deal.name" :placeholder="'请输入用户名'" lazy-rules
                                :rules="[ val => val && val.length > 0 ]" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-lock"></span>
                            </span>
                            <q-input class="q-mb-sm" color="ttblue" filled dense v-model="deal.phone"
                                :placeholder="'请输入手机号码'" lazy-rules :rules="[ 
                        val => val && val.length > 0 || '请输入手机号码',
                        val => /^[1][3,4,5,7,8][0-9]{9}$/.test(val) || '手机格式不正确'
                    ]" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-lock"></span>
                            </span>
                            <q-input type="email" class="q-mb-sm" color="ttblue" filled dense v-model="deal.email"
                                :placeholder="'请输入邮箱'" lazy-rules
                                :rules="[ val => val && val.length > 0 ]"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-lock"></span>
                            </span>
                            <q-input class="q-mb-sm" color="ttblue" filled dense v-model="deal.password"
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
                            <q-input class="q-mb-sm" color="ttblue" filled dense v-model="passwordSure"
                                :placeholder="'请再次输入密码'" lazy-rules maxlength="16" :rules="[ 
                        val => val !== null && val !== '' || '密码不能为空',
                        val => val && val == deal.password || '密码不一致'
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
            deal: {
                name: "",
                password: "",
                phone: "",
                email: ""
            },
            passwordSure: "",

            loading: false
        };
    },
    methods: {
        register(val) {
            this.$refs.rform.validate().then(success => {
                if (success) {
                    this.loading = true;
                    this.$store.dispatch("register", this.deal).then(res => {
                        this.loading = false;
                        if (res === 0)
                            this.$q.notify({
                                message: "注册失败，请稍候再试！",
                                color: "red"
                            });
                        else {
                            let status = res.status;
                            this.$q.notify({
                                message: res.message,
                                color: status == 200 ? "green" : "red"
                            });
                            if (status == 200) {
                                // 登录成功
                                this.$store.commit("SET_USER_DEAL", {
                                    m: res.data
                                });
                                this.$router.replace("/home");
                            }
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
