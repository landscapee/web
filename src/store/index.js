import Vue from 'vue'
import Vuex from 'vuex'
import sysMsg from "./modules/sys-msg.js"
import axios from "axios"

if(sessionStorage.getItem('token')){
  axios.defaults.headers.common['Authorization'] = sessionStorage.getItem('token');
}

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
      data: sysMsg,
    }
})

store.getUserData = function(){
  let token = sessionStorage.getItem('token')
  axios({
    method:"post",
    url:'http://173.100.1.30/fpms/sso/login/userInfo',
    dataType:"text",
    data:token,
    async:false,
    headers:{
      'Content-Type':'application/json;charset=utf-8'
    }
  })
  .then(res=>{
    if(res.status==200&&res.data.responseCode==1000){
      let data = res.data.data
      store.commit('setUserMsg', data)
    }
  })
}
export default store
