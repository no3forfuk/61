/*Created By Jsir on 2018/4/25*/
'use strict'
import axios from 'axios'

const service = axios.create({
    baseURL: '/api'
})

service.interceptors.request.use(config => {
    // if (store.state) {
    //     config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('X-Auth-Token') // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
    // }

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