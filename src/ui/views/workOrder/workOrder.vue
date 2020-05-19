<template>
  <div class="workOrder">
    <div class="">
      <editor id="editor_id" height="500px" width="700px" :content.sync="editorText"
              :afterChange="afterChange()"
              pluginsPath="../../../static/plugin/plugins/"
              :loadStyleMode="false"
              @on-content-change="onContentChange">
      </editor>
    </div>
    
  </div>
</template>
 
<script>
export default {
  name: 'workOrder',
  data () {
    return {
      editorText: '', // 双向同步的变量
      editorTextCopy: ''  // content-change 事件回掉改变的对象
    }
  },

    methods: {
    onContentChange (val) {
      this.editorTextCopy = val;
      console.log(this.editorTextCopy)
    },
    afterChange () {
    }
  }
}
</script>
 
<style>
 
</style>