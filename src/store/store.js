/*Created By Jsir on 2018/6/8*/
'use strict'

export const state = {
    isLogin: false
}
export const mutations = {
    login(state) {
        state.isLogin = true;
    }
}
export default {
    state,
    mutations
}