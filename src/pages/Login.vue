<template>
    <q-page padding class="row items-center justify-center">
        <!-- content -->
        <q-form @submit="login" class="flex cloumn flex-center" :ref="'lform'">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <div class="tc relative-position" v-ripple>
                        <q-icon color="red" size="1rem" name="call_missed_outgoing" style="vertical-align: middle " />
                        <span style="vertical-align: middle" class="text-weight-light" @click="test">请先登录</span>
                    </div>
                    <div class="row text-center gutter-sm q-my-sm">
                        <div class="col-3 bg-red">1</div>
                        <div class="col-6 bg-green">2</div>
                        <div class="col-3 bg-yellow">1</div>
                    </div>
                </div>
                <div class="panel-body m15">
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-user"></span>
                            </span>
                            <q-input filled dense v-model="username" :placeholder="'请输入用户名hpt500'" lazy-rules
                                :rules="[ val => val && val.length > 0 ]" />
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="input-group">
                            <span class="input-group-addon">
                                <span class="glyphicon glyphicon-lock"></span>
                            </span>
                            <q-input type="password" filled dense v-model="password" :placeholder="'请输入密码123456'"
                                lazy-rules :rules="[ val => val && val.length > 0 ]" />
                        </div>
                    </div>
                    <div class="form-group q-mt-sm row justify-between">
                        <q-btn type="submit" :loading="loading" color="primary" label="登录" />
                        <q-btn color="green" :to="'/register'" label="注册" />
                    </div>
                    <div class="form-group q-mt-sm row">
                        <q-btn color="blue-6" :to="'/'" label="返回" />
                    </div>
                </div>
            </div>
        </q-form>
    </q-page>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
export default {
    // name: 'PageName',
    data() {
        return {
            drawer: true,
            loading: false,
            page: 5,

            model: "",
            email: "",

            username: "13420478760",
            password: "123456",

            option: "opt1",
            selection: ["one", "two", "three"],
            checked: true
        };
    },
    validations: {
        email: { required, email }
    },
    methods: {
        alert() {},
        someMethod() {},
        login(val) {
            this.$refs.lform.validate().then(success => {
                if (success) {
                    this.loading = true;
                    let data = {
                        phone: this.username,
                        password: this.password
                    };
                    this.$store.dispatch("login", data).then(res => {
                        this.loading = false;
                        if (res == 0)
                            this.$q.notify({
                                message: "登录失败，请稍候再试！",
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
        },
        saveWork() {},
        upload() {},
        spellCheck() {},
        importSomething() {},
        test() {
            this.$q.fullscreen.toggle();
        }
    }
};
</script>

<style>
</style>
