<template>
    <div>
        <el-dialog title="试卷导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <input type="file" @change="importFile" ref="imFile" id="imFile"
                       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                <Button type="primary" @click="uploadFile">浏览</Button>

            </el-form>
            <div class="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit('form')">导出</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
     import request from '@lib/axios.js';
    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {

                form:{ },
                rules:{},

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            importFile(file){

            }, uploadFile(){

            },
            open(data){
                this.dialogFormVisible=true
                this.form={...data}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         request({
                             url:`${this.$ip}/mms-qualification/securityMerits/copy`,
                             method:'post',
                             data:{
                                  ...this.form
                             }
                         }).then((d) => {
                              if(d){
                                 this.close();
                             }else {
                                 this.$message({
                                     message: '复制失败',
                                     type: 'error',
                                 });
                             }

                        });
                    }
                });
            },
            close(){
                this.row={}
                this.from={}
                this.dialogFormVisible=false
            },


        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
    width: 600px;
    .el-dialog__body{
        .el-form-item__label{
            width:100px;
        }
    }

}
.footer{
    display: flex;
    justify-content: center;
    .el-button{
        padding: 10px 30px;
        margin: 20px 0;
    }
    .el-button:first-child{
        margin-right: 20px;
    }
}
</style>