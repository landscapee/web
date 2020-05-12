import Vue from 'vue';
import App from './src/ui/App.vue';
import WorkerRegist from './workerRegist.js';
import router from './src/ui/router';
import store from './src/ui/store';
import './src/ui/icons';
import postal from 'postal';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import axios from "axios";


Vue.use(ElementUI);
Vue.prototype.postal = postal
Vue.prototype.$axios = axios

router.afterEach((to, from) => {
    
})


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