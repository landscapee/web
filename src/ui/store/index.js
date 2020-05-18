/*
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 09:50:30
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 10:58:45
 */
import Vue from 'vue';
import Vuex from 'vuex';
import sysMsg from "./modules/sys-msg.js";
import table from "./modules/table.js";
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        data: sysMsg,
        table,
    }
})
export default store
