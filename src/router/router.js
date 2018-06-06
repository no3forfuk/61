/*Created By Jsir on 2018/4/23*/
'use strict'

import Home from '../components/Home/home'
import test from '../components/test'
import Rank2list from '../components/Rank2/rank2Details'
import Rank1details from '../components/Rank1/rank1Index'
import Element from '../components/Element/elementIndex'
import Html404 from '../components/404/404.vue'

export const routes = [
    {path: '/', name: 'home', component: Home, meta: {keepAlive: true}},
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['../components/Login/login.vue'], resolve)
    },
    {
        path: '/register',
        name: 'register',
        component: resolve => require(['../components/Register/register.vue'], resolve)
    },
    {
        path: '/resetPassword',
        name: 'resetPassword',
        component: resolve => require(['../components/ResetPassword/resetPassword.vue'], resolve)
    },
    {
        path: '/userInfo',
        name: 'userInfo',
        component: resolve => require(['../components/UserInfo/userInfo.vue'], resolve)
    },
    {path: '/test', name: 'test', component: test, meta: {keepAlive: true}},
    {
        path: '/rank2list',
        name: 'rank2',
        query: {level: 'level', id: 'id'},
        component: resolve => require(['../components/Rank2/rank2Index.vue'], resolve),
        meta: {keepAlive: true},
        children: [
            {
                path: '/rank2list/details',
                name: 'rank2Details',
                query: {id: 'id'},
                component: resolve => require(['../components/Rank2/rank2Comment.vue'], resolve),
                meta: {keepAlive: true}
            },
            {
                path: '/rank2list/list',
                name: 'rank2list',
                query: {id: 'id', level: 'level'},
                component: resolve => require(['../components/Rank2/rank2Details.vue'], resolve),
                meta: {keepAlive: true},
            },
        ]
    },
    {path: '/rank1details', name: 'rank1details', component: Rank1details, meta: {keepAlive: true}},

    {
        path: '/elementDetails',
        name: 'element',
        query: {id: 'id'},
        component: Element,
        meta: {keepAlive: true},
        children: [
            {
                path: '/elementDetails/details',
                name: 'elementDetails',
                query: {id: 'id', rank_level: 'rank_level', rank_id: 'rank_id'},
                component: resolve => require(['../components/Element/elementDetails.vue'], resolve)
            },
            {
                path: '/elementDetails/post',
                name: 'postDetails',
                query: {id: 'id', ele_id: 'ele_id', rank_level: 'rank_level', rank_id: 'rank_id'},
                component: resolve => require(['../components/Post/index.vue'], resolve)
            }
        ]
    },
    {path: '*', redirect: '/404', component: Html404},

]

export default {
    mode: 'hash',
    routes,
    scrollBehavior(to, from, savedPosition) {


    },
}