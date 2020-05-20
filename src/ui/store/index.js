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
