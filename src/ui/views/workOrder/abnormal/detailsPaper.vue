<template>
    <div class="detailsPaper">
        <div class="divF">
            <div v-for="(item,index) in fileList" :key="index" >
                <embed :src="item.filePath" type="application/pdf" width="100%" height="100%">
                <iframe  :src="item.filePath"  type="application/pdf" width="100%" height="100%"></iframe>
                <img :src="item.filePath" alt="shibao ">
            </div>
        </div>

    </div>
</template>

<script>
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        name: "detailsPaper",
        components: {},
        data() {
            return {
                fileList:[],
            }
        },
        methods: {},
        created() {
            request({
                 header:{
                    'Content-Type':'multipart/form-data'
                },
                url:`${this.$ip}/mms-file/get-files-by-ids/`,
                method:'POST',
                params:{
                    fileIds:this.$route.query.id
                }

            }).then((d)=>{
                this.fileList=d.data

            });
        },
    }
</script>

<style lang="scss" scoped>
.detailsPaper{
    width:100%;
    height:100vh;
    overflow-y: hidden;
    embed{
        height:calc(100vh - 90px);
    }

}
</style>