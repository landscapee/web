<template>
    <div>
        <div  v-if="fileObj"   class="divBox" :style=" `${fileObj.style}` " >
            <div style="padding: 0px 0 15px 0;text-align: center;font-size: 18px">{{fileObj.title||''}}</div>
            <div style="padding: 0px 61px 28px 61px;">
                <el-card   :body-style="{ padding: '10px' }">
                    <img :src="fileObj.filePath" class="image">
                    <div style="padding: 14px;">
                        <span>名称：{{fileObj.fileName}}</span>
                    </div>
                </el-card>
            </div>

        </div>

        <el-dialog v-else :title="title"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
           <div style=" padding: 20px 61px 28px 61px; " >
               <!--<img :src="src" alt="" >-->
            <el-card   :body-style="{ padding: '10px' }">
                <img :src="file.filePath" class="image">
                <div style="padding: 14px;">
                    <span>名称：{{file.fileName}}</span>

                </div>
            </el-card>
           </div>
        </el-dialog>


    </div>
</template>

<script>

    export default {
        name: "copyDetails",
        components: {},
        props:['fileObj','title1'],
        data() {
            return {
                 file:{},
                title:'图片查看',
                dialogFormVisible:false,
            }
        },
        methods: {
            open(d,title){
                this.file= d
                if(title){
                    this.title=title
                }

                this.dialogFormVisible=true


            },

            close(){

                this.dialogFormVisible=false
            }
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
.divBox{
    top:calc(50% - 200px);
    left:calc(50% - 600px);
    background: rgba(252, 252, 252, 0.95);
    position: absolute;
    &>div:nth-child(1){
        /*background: #3d568e;*/
        height: 50px;
        line-height: 50px;
        /*color: white;*/
    }
 }
    .divBox,/deep/ .el-dialog{

    width: 800px;
    .el-dialog__body{
        padding: 0;
        width: 678px;

    }
    .el-card{
        width: 678px;
    }
    .el-card__body{
        overflow: auto;
        text-align: center;
    }
    .image {
        max-width: 650px;
        /*height:400px*/
    }
}
</style>