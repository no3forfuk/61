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
const router = new VueRouter(require('./router/router').default);

require('./uiComponent/uiComponent');

//WX
const wx = require('weixin-js-sdk')
Vue.prototype.$wx = wx;

//全局工具方法
import {getNowMs} from './utils/utils'

Vue.prototype.getNowMs = getNowMs;
router.beforeEach((to, from, next) => {
    next();
})

new Vue({
    el: '#app',
    router,
    render: c => c(App)
})