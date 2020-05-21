/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 09:50:30
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 13:35:03
 */
import Vue from 'vue';
// import postal from 'postal';  // 引入postal
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import { v4 as uuidv4 } from 'uuid';
import App from './src/ui/App.vue';
// import WorkerRegist from './workerRegist.js';  // 引入webworker注册文件
import router from './src/ui/router';
import store from './src/ui/store';
import './src/ui/icons';
import Logger from './lib/logger';
import './src/ui/config/ui';
import VueKindEditor from '@/ui/components/Kindeditor/kindeditor.js'
import './static/plugin/themes/default/default.css'
import './static/plugin/kindeditor-all-min.js'
import './static/plugin/lang/zh-CN.js'

Vue.use(VueKindEditor)
Vue.use(ElementUI);
// 把postal绑定到vue原型链上
// Vue.prototype.postal = postal;
Vue.prototype.$uuid = uuidv4;
Vue.prototype.$logger = Logger;
Vue.prototype.$subscribeMap = {};
router.afterEach((to, from) => {
    
})


new Vue({
    el: '#app',
    components: {App},
    router,
    store,
    template: '<App />',
    created () {
        // 注册并启动webworker
        // const workerProces = new WorkerRegist();
        // workerProces.start()
       
    }
})