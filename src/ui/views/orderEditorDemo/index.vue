<template>
    <div>
        <div>编辑工单项</div>
        <order-editor
            id="editor_id" height="500px" width="700px" :content.sync="editorText"
            :afterChange="afterChange()"
            :loadStyleMode="false"
            @on-content-change="onContentChange"
        ></order-editor>
        <div> editorTextCopy: {{ editorTextCopy }} </div>
    </div>
</template>
<script>
import orderEditor from '@components/orderEditor/index.vue';
export default {
    components:{
        orderEditor
    },
    data(){
        return {
            editorText: '', // 双向同步的变量 // 默认值
            editorTextCopy: ''  // content-change 事件回掉改变的对象
        }
    },
    methods:{
        onContentChange (val) {
            this.editorTextCopy = val;
            console.log(this.editorTextCopy)
        },
        afterChange () {
        }
    }
}
</script>