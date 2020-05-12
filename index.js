import Vue from 'vue';
import App from './src/App.vue';
import WorkerRegist from './workerRegist.js';
import router from './src/router'
import store from './src/store'
import './src/icons';
import postal from 'postal';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './src/styles/elementReset.scss';

import axios from "axios";


Vue.use(ElementUI);
Vue.prototype.postal = postal
Vue.prototype.$axios = axios

let loginFlag = 0
router.afterEach((to, from) => {
    if(to.name=="login"){
        loginFlag=0
        sessionStorage.clear()
    }
        
    if(sessionStorage.getItem("token")&&loginFlag===0){
        loginFlag = 1
        
    }
})


if(!store.getters.getUserMsg&&sessionStorage.getItem("token")){//刷新或者丢失用户信息，再次使用token获取用户信息
    store.getUserData()
}

var qs=require("qs")//格式化参数
axios.defaults.baseURL  =  "http://173.100.1.30/fpms/fpms-controller"
axios.interceptors.request.use(
    config => {
		// if(config.method  === 'post'){
        //     const formData = new FormData();
        //     Object.keys(config.data).forEach(key => formData.append(key, config.data[key]))
        //     config.data = formData
        // }
        if(config.url.indexOf("/login/login")==-1){//登录不验证token
            config.headers['Authorization'] = sessionStorage.getItem("token");
        }
        config.headers['Accept'] = 'application/json';
		return config;
    },
    err => {
        return Promise.reject(err);
    }
);

axios.interceptors.response.use(
    response=>{
        if(response.data.code==200||response.data.responseCode==1000){
            console.log(response)
            return response.data;
        }else{
            Vue.prototype.$alert(response.data.responseMessage||response.data.message, '提示', {
                type: 'error',
                center: true
            })
            return false
        }
    }, 
    err => {
        if(_.includes(err.message,"code 500")){
            Vue.prototype.$alert('服务端错误，请联系管理员处理！', '提示', {
                type: 'error',
                center: true
            })
        }
        return Promise.reject(err);
    }
);



Vue.prototype.getTimeByFormat =function(time,format){
    if(!time)return '--'
    let date = new Date(time)
    let YY = date.getFullYear()
    let MM = date.getMonth()+1
    let DD = date.getDate()
    let hh = date.getHours()
    let mm = date.getMinutes()
    let ss = date.getSeconds()

    MM = MM<10?'0'+MM:MM
    DD = DD<10?'0'+DD:DD
    hh = hh<10?'0'+hh:hh
    mm = mm<10?'0'+mm:mm
    ss = ss<10?'0'+ss:ss
    
    return format.replace(/YY/,YY).replace(/MM/,MM).replace(/DD/,DD).replace(/hh/,hh).replace(/mm/,mm).replace(/ss/,ss)
}


new Vue({
    el: '#app',
    components: {App},
    router,
    store,
    template: '<App />',
    created () {
        const workerProces = new WorkerRegist();
        workerProces.start()
    }
})