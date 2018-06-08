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

//vuex
import Vuex from 'vuex';

Vue.use(Vuex);
const storeConfig = require('./store/store');
const store = new Vuex.Store(storeConfig);


//WX
const wx = require('weixin-js-sdk')
Vue.prototype.$wx = wx;

//全局工具方法
import {getNowMs} from './utils/utils'
//MD5
const MD5 = require('js-md5')
Vue.prototype.MD5 = MD5;
Vue.prototype.getNowMs = getNowMs;
router.beforeEach((to, from, next) => {
    next();
})

new Vue({
    el: '#app',
    router,
    store,
    render: c => c(App)
})