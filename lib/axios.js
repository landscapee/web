/*
 * @Descripttion: axios封装
 * @version: v0.0.1
 * @Author: xdh.ss
 * @Date: 2020-04-13 11:19:21
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-04-13 12:20:59
 */
import { Message } from 'element-ui';
import axios from 'axios';
import store from '@store';
import { date2String, stringDateExtend } from '@lib/tools.js';
const instance = axios.create({
    baseURL: `http://${location.hostname}:${location.port}/`,
    // transformRequest: [
    //     data => data
    // ],
    timeout: 5000,
    headers: {
        'Authorization': store.getters.token?store.getters.token:'' ,
        'Accept': 'application/json',
    }
    
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
    let data = config.data;
	date2String(data);
    if (config.method === 'post') {
        // const formData = new FormData();
        // Object.keys(config.data).forEach(key => formData.append(key, config.data[key]));
        // config.data = formData;
    }
    return config;
}, err => {
    return Promise.reject(err)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
    let res;
    // if (response.data && response.data.code && response.data.data) {
    //     res = response.data.data;
    // } else {
    //     res = response.data;
    // }
    if(response.data.data==null){
        response.data.data = [];
    }
    
    if ((response.code && response.code != 200) || (response.data && response.data.code && response.data.code != 200)) {
        Message({
            message: response.msg || (response.data ? response.data.msg : '未知错误'),
            type: 'error',
            duration: 5 * 1000,
        });
    }

    if (res) {
        if (res.responseCode && res.responseCode !== 1000) {
            Message({
                message: res.responseMessage || '未知错误',
                type: 'error',
                duration: 5 * 1000,
            });
            return Promise.reject(new Error(res.responseMessage || '未知错误'));
        }
        stringDateExtend(res);
    }
    return response.data;
},err => {
    Message({
        message: err.message,
        type: 'error',
        duration: 5 * 1000,
    });
    return Promise.reject(err);
})

export default instance;