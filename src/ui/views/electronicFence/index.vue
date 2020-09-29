<template>
    <div   v-loading="loading"
           element-loading-text="拼命加载中">
        <iframe :src="url1"  frameborder="no" border="0"  class='iframe' ref="threeMap" id='threeMap' name="threeMap"></iframe>
    </div>
</template>

<script>
    // import '../../../../static/electronicFence/index1.html'
     export default {
        name: "index",
        components: {},
        data() {
            return {
                loading:true,
                url1: '../../../../static/electronicFence/index2.html',
                vueId:"myParentId"
            }
        },
         methods: {
             sonPageClick:function(params){
                 console.log(params);
             },
             test:function(){
                 //获取到iframe window对象，通过这个对象操作iframe页面的所有属性和方法
                 var iframe = document.getElementById("threeMap").contentWindow;
                 alert("地图对象:"+iframe.BNMap);
                 console.log(iframe.BNMap,"地图对象");
             }
         },
         created(){
             //通过vueId绑定当前VUE的sonPageClick方法，iframe通过window.parent[vueId]调用此页面的方法
             let self = this
             window[this.vueId] = (infojson)=>{
                 self.sonPageClick(infojson)
             }
         },
         mounted(){
            let  self=this
             window.addEventListener(
                 'message',
                 function(data) {
                       if (data.data=='success' ) {
                          self.loading=false
                         console.log(data.data,1,4222,2,self.$refs.threeMap);
                          if(self.$refs.threeMap){
                              self.$refs.threeMap.contentWindow.postMessage(1112211)
                          }
                      }
                 },
                 false,
             );
         },
    }
</script>

<style lang="scss" scoped>
    .iframe{
         width: 100%;
        height:calc(100vh - 90px)
    }
</style>