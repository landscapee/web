<template>
    <div class="detailsPaper">
        <div class="block">
             <el-carousel  height="calc(100vh - 90px)" :autoplay="false">
                <el-carousel-item  v-for="(item,index) in fileList" :key="index">
                    <!--<embed  v-if="item.contentType=='application/pdf'" :src="item.filePath" type="application/pdf" width="100%" height="100%">-->
                    <iframe v-if="item.contentType=='application/pdf'" :src="item.filePath"  type="application/pdf" width="100%" height="100%"></iframe>
                    <div v-else style="height:100%;display: flex;justify-content: center;align-items: center">
                        <img style="max-width: 90%"  :src="item.filePath" alt="加载失败 ">
                    </div>
                </el-carousel-item>
            </el-carousel>
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
.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
}
</style>