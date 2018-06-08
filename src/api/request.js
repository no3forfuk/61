/*Created By Jsir on 2018/4/25*/
'use strict'
import axios from 'axios'
import store from '../store/store'

const service = axios.create({
    baseURL: '/api'
})

service.interceptors.request.use(config => {
    if (store.state && store.state.isLogin) {
        config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('X-Auth-Token')
    }
    return config
}, error => {
    console.log(error) // for debug
    Promise.reject(error)
})

service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    })
export default service;