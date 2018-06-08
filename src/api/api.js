/*Created By Jsir on 2018/4/25*/
'use strict'
import request from './request'

module.exports = {
    //获取首页推送
    getIendx(parmas) {
        return request({
            url: '/Home/index',
            method: 'POST',
            data: {
                time: parmas
            }
        })
    },
    //获取二级榜单
    getSecondRank(params) {
        return request({
            url: '/Ranking/getRanking',
            method: 'GET',
            params: {
                level: params.level,
                id: params.id,
                page: params.page
            }
        })
    },
    //获取一级榜单
    getFirstRank(params) {
        return request({
            url: '/Ranking/getRanking',
            method: 'GET',
            params: {
                level: params.level,
                id: params.id
            }
        })
    },
    //获取微信鉴权
    getWXConfig(params) {
        return request({
            url: '/Wx/signature',
            method: 'POST',
            data: params
        })
    },
    //获取元素详情
    getElement(params) {
        return request({
            url: '/Element/getElementDetails',
            method: 'GET',
            params: params
        })
    },
    //获取评论
    getDiscuss(params) {
        return request({
            url: '/Ranking/getComment',
            method: 'GET',
            params: params
        })
    },
    //获取POST详情
    getPostDetailsById(params) {
        return request({
            url: '/Post/getPostDetails',
            method: 'GET',
            params: {
                id: params
            }
        })
    },
    //添加评论
    addComment(params) {
        return request({
            url: '/Comment/visitorAdd',
            method: 'POST',
            data: params
        })
    },
    //添加统计
    addStatistics(params) {
        return request({
            url: '/Statistical/add',
            method: 'POST',
            data: params
        })
    },
    //注册
    register(params) {
        return request({
            url: '/Login/reg',
            method: 'POST',
            data: params
        })
    },
    //获取验证码
    getMobileCode(params) {
        return request({
            url: '/Login/sms',
            method: 'POST',
            data: params
        })
    },
    //手机登陆
    loginByMobile(params) {
        return request({
            url: '/Login/login',
            method: 'POST',
            data: params
        })
    },
    //用户资料
    addUserInfo(params) {
        return request({
            url: '/User/firstUpdate',
            method: 'POST',
            data: params
        })
    }
}