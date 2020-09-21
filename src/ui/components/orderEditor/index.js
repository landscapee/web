import orderEditor from './index.vue'
import Vue from 'vue'
const install = function (Vue) {
    if (install.installed) return
    install.installed = true
    Vue.component('orderEditor', orderEditor)
}
export default install