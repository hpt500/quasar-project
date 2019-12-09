import Vue from 'vue'
import * as types from './mutation-types'

import { Cookies, LocalStorage, Platform } from 'quasar'

import { Utils } from 'src/utils/index.js'
let util = new Utils()

import apiClient from 'api/index-client'
import { api as apiServer } from 'api/index-server'


export default {
    // 操作接口
    SET_AXIOS(state, { cookDeal, ssrContext }) {
        console.log("保存接口", state)
        Vue.set(state, 'axios', ssrContext ? apiServer(cookDeal) : apiClient)
    },

    SET_USER_DEAL(state, { m, ssrContext }) {
        // 设置用户登录信息
        state.user = m ? m : {}
        if (m) {
            if (!(Platform.is && Platform.is.cordova)) {
                const cookies = process.env.SERVER
                    ? Cookies.parseSSR(ssrContext)
                    : Cookies
                cookies.set('test_id', m._id, { expires: 7, path: '/' })
                cookies.set('test_user', escape(JSON.stringify(m)), { expires: 7, path: '/' })
            } else {
                LocalStorage.set('test_id', m._id)
                LocalStorage.set('test_user', escape(escape(JSON.stringify(m))))
            }
        }
    },

    CLEAR_USER_DEAL(state) {
        state.user = {}
        if (!(Platform.is && Platform.is.cordova)) {
            util.clearCookie('test_id')
            util.clearCookie('test_user')
        } else {
            LocalStorage.remove('test_id')
            LocalStorage.remove('test_user')
        }
    },

}