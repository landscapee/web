<template>
    <div>
        <el-dialog title="纸制试卷查看"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
           <div style=" padding: 20px 61px 28px 61px; ">
               <!--<img :src="src" alt="" >-->


            <el-card :body-style="{ padding: '10px' }">
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
        data() {
            return {
                 file:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(d){
                this.file= d
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
/deep/ .el-dialog{
    width: 600px;
    .el-dialog__body{
        padding: 0;
        .img   {
            width: 478px;
        }
    }

}
</style>