/*
 * @Descripttion:
 * @version:
 * @Author: xdh.ss
 * @Date: 2020-05-13 09:50:30
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 13:35:03
 */
// import postal from "postal";  // 引入postal
import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import {v4 as uuidv4} from "uuid";
import App from "./src/ui/App.vue";
import {initWebsocket} from "./initSocket.js";
// import WorkerRegist from "./workerRegist.js";  // 引入webworker注册文件
import router from "./src/ui/router";

console.log("router", router)
import store from "./src/ui/store";
import "./src/ui/icons";
import Logger from "./lib/logger";
import {removeToken} from "./lib/auth";
import "./src/ui/config/ui";
import VueDraggableResizable from "vue-draggable-resizable";
import "vue-draggable-resizable/dist/VueDraggableResizable.css";
import VueKindEditor from "@/ui/components/Kindeditor/kindeditor.js"
import "./static/plugin/themes/default/default.css"
import "./static/plugin/kindeditor-all-min.js"
import "./static/plugin/lang/zh-CN.js"
import directives from "@lib/directive.js"
import moment from "moment"
import "./permission";

//公共ip地址和端口
 if (PROGRAM == "jwxt.dev") {  // 本地
    Vue.prototype.$ip = "http://173.100.1.5:8011"
    Vue.prototype.$workImgIp = " http://173.100.1.142/"
    // Vue.prototype.$workImgIp = " http://173.101.1.133/"
    // Vue.prototype.$ip = "http://173.101.1.30:6070"
} else if (PROGRAM == "jwxt.test") { // 测试
    Vue.prototype.$workImgIp = " http://173.101.1.133/"
    Vue.prototype.$ip = "http://173.101.1.30:6070"
} else if (PROGRAM == "jwxt.build") { // 开发
    Vue.prototype.$workImgIp = " http://173.100.1.142/"
    Vue.prototype.$ip = "http://173.100.1.5:8011"
} else if (PROGRAM == "jwxt.prod") {
    Vue.prototype.$workImgIp = "http://10.35.48.34:8888"
    Vue.prototype.$ip = "http://10.33.144.1:6076/api"
}
const ipSign = {
    "jwxt.dev": "http://173.101.1.134:8089",
    "jwxt.build": "http://173.101.1.134:8089",
    "jwxt.test": "http://173.101.1.134:8089",
    "jwxt.prod": "http://10.33.144.57:8089"
}
Vue.prototype.$ipSign = ipSign[PROGRAM]
import MessageBox from "@/ui/components/userName/index.js";

Vue.use(MessageBox);
import singleDialog from "@/ui/components/singleDialog/index.js";

Vue.use(singleDialog);
Vue.prototype.$moment = moment;
//事件总线指向全局vue对象
Vue.prototype.$eventBus = new Vue();
Vue.use(directives)
Vue.use(VueKindEditor)
Vue.use(ElementUI);


Vue.component("vue-draggable-resizable", VueDraggableResizable);
// 把postal绑定到vue原型链上
// Vue.prototype.postal = postal;
Vue.prototype.$uuid = uuidv4;
Vue.prototype.$logger = Logger;
Vue.prototype.$subscribeMap = {};


new Vue({
    el: "#app",
    components: {App},
    router,
    store,
    template: "<App />",
    data() {
        return {}
    },
    created() {
        if (!window.SOCKET && this.$store.state.user.userInfo) {
            initWebsocket(this)
        }
        // 注册并启动webworker
        // initWebsocket()
        // const workerProces = new WorkerRegist();
        // workerProces.start()

    },
    mounted() {

        let beginTime = 0
        let differTime = 0
        window.onbeforeunload = (e) => {
            beginTime = new Date().getTime();
        };
        window.onunload = (e) => {
            differTime = new Date().getTime() - beginTime;
            if (differTime <= 6) {
                removeToken()
            }
        }

    },

})
