import msgboxVue from './index.vue';
 
// 定义插件对象
const singleDialog = {};
// vue的install方法，用于定义vue插件
singleDialog.install = function (Vue, options) {
  const MessageBoxInstance = Vue.extend(msgboxVue);
  let currentMsg;
  const initInstance = () => {
    // 实例化vue实例
    currentMsg = new MessageBoxInstance();
    let msgBoxEl = currentMsg.$mount().$el;
    document.body.appendChild(msgBoxEl);
  };
  // 在Vue的原型上添加实例方法，以全局调用
  Vue.prototype.$dingleDialog = {
    showMsgBox (options) {
        if (!currentMsg) {
            initInstance();
        }
        if (typeof options === 'string') {
            currentMsg.content = options;
        } else if (typeof options === 'object') {
            Object.assign(currentMsg, options);
        }
        return currentMsg.showMsgBox()
            .then(data => {
                currentMsg = null;
                return Promise.resolve(data);
            })
            .catch(err => {
            currentMsg = null;
            return Promise.reject(err);
        });
    }
  };
};
 
export default singleDialog;