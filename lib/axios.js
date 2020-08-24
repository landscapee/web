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
import router from '@router';
import { date2String, stringDateExtend } from '@lib/tools.js';
import {  removeToken, removeUserInfo ,getToken} from '@lib/auth';
import Vue from "vue";
let src=`http://${location.hostname}:${location.port}/`
 if(location.port==8080||location.port==8089){
    src= `http://173.100.1.5:8011`
}else if(location.port==6073){
    src=`http://173.101.1.30:6070`
}

if(PROGRAM == 'jwxt.test'){
    Vue.prototype.$ip = "http://173.100.1.5:8011"
}else if(PROGRAM == 'jwxt.dev'){
    Vue.prototype.$ip = "http://173.101.1.30:6070"
}else if(PROGRAM == 'jwxt.build'){
    Vue.prototype.$ip = "http://173.100.1.5:8011"
}
const instance = axios.create({
    baseURL: src,
    // transformRequest: [
    //     data => data
    // ],
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
    }
})
// 添加请求拦截器
instance.interceptors.request.use(config => {
     if((store.getters.token===null || !store.getters.token ) && config.url!="/sso/login/login"){
         store.commit('user/SET_TOKEN','');
        store.commit('user/SET_USER_INFO','');
        removeToken();
        removeUserInfo();
        router.push({path:"/"});
    } else if(config.url=="/sso/login/login"){

    }else{
  		config.headers['Authorization'] = getToken();
    }
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
     if (response.data && response.data.code && response.data.data) {
        res = response.data.data;
    } else {
        res = response.data;
        if(typeof res === 'string'){  // 判断是否是导出文件
            return response.data;
        }
    }
    if(response.data.data==null){
        response.data.data = [];
    }
    if(response.data&&response.data.code == 416){
        Message({
            message: response.data.message || (response.data ? response.data.message : '未知错误'),
            type: 'error',
            duration: 3 * 1000,
        });
        return false
    } else if (response.status == 415 || (response.data && response.data.code == 401)) {
        removeToken();
        removeUserInfo();
        router.push({path:"/"});
    }else if(response.data&&response.data.code !=200&&response.data.message){
        Message({
            message: response.data.message ,
            type: 'error',
            duration: 3 * 1000,
        });

    }
      if (res) {
        if (res.responseCode === 10003) {
            removeToken();
            removeUserInfo();
            router.push({path:"/"});
        }
        if (res && res.responseCode !== 1000&&res.responseCode == 30003&&res.responseCode == 30002) {

            return Promise.reject(new Error(res.responseMessage || '未知错误'));
        }
        stringDateExtend(res);
    }
    // if ((response.code && response.code != 200) || (response.data && response.data.code && response.data.code != 200)) {
    //     Message({
    //         message: response.msg || (response.data ? response.data.msg : '未知错误'),
    //         type: 'error',
    //         duration: 5 * 1000,
    //     });
    // }
    response.data.headers=response.headers
    return response.data;
},err => {
    // Message({
    //     message: err.message,
    //     type: 'error',
    //     duration: 5 * 1000,
    // });
    return Promise.reject(err);
})

export default instance;