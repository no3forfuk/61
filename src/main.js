//引入vue

import Vue from 'vue';
//引入样式
import 'mint-ui/lib/style.css'
import './style/fonts/iconfont.css';
import './style/reset.css';
import './style/common.css';

import App from "./app.vue";

import VueRouter from 'vue-router';
//引入文本
import text from './text/text'

Vue.prototype.text = text;
Vue.use(VueRouter);
const router = new VueRouter(require('./router/router'));


require('./uiComponent/uiComponent');

//WX
const wx = require('weixin-js-sdk')
Vue.prototype.$wx = wx;
import {getWXConfig} from '@/api/api';

// getWXConfig().then(res => {
//     if (res.status == 200 && res.data.status_code == 1) {
//         var opts = res.data.data;
//         wx.config({
//             debug: true,
//             appId: opts.app_id,
//             timestamp: opts.timestamp,
//             nonceStr: opts.noncestr,
//             signature: opts.signature,
//             jsApiList: ['onMenuShareAppMessage']
//         })
//         wx.ready(function () {
//
//         });
//
//     }
// }).catch(err => {
//     throw err
// })


router.beforeEach((to, from, next) => {


    next();

})

new Vue({
    el: '#app',
    router,
    render: c => c(App)
})