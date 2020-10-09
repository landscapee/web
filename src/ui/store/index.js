import Vue from 'vue';
import Vuex from 'vuex';
import sysMsg from "./modules/sys-msg.js";
import table from "./modules/table.js";
import user from './modules/user';
import getters from './getters';
import socketObj from './modules/socketObj';
import permission from './modules/permission';
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        data: sysMsg,
        table,
        user,
        socketObj,
        permission
    },
    getters,
})
export default store
