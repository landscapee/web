import Vue from 'vue'
Vue.directive('zzs', {
     inserted: function (el,x) {
         console.log(x.name);
          el.oninput=(e)=>{
            let value=e.target.value
               let reg=/([^\d]*)/g
             let reg1=/(0*)([1-9](\d{0,2}))?(\d*)/g
              let s=value.replace(reg,'')
                s=s.replace(reg1,'$2')
              e.target.value=s||null
         }
    }
})
