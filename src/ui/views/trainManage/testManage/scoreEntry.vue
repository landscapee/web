<template>
    <div>
        <el-dialog title="分数录入"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
           <div style=" padding: 32px 61px 28px 61px; ">
               <el-form :model="form" ref="form" :rules="rules">
                   <div style="margin-bottom: 20px;color:#000000;font-size: 16px">李梅 &nbsp;&nbsp;{{row.examName}}   &nbsp;&nbsp; 考分：</div>
                   <el-form-item label="" prop="score">
                       <el-input v-model="form.score" type="number"></el-input>
                   </el-form-item>
               </el-form>
               <div class="footer">
                   <el-button @click="close">取消</el-button>
                   <el-button type="primary" @click="submit('form')">确认</el-button>
               </div>
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
                form:{sourcesId:'WORD'},
                rules:{
                    score:[{required:true,message: '请输入考试分数',trigger:'blur'}]

                },

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
                this.row={...data}
                this.dialogFormVisible=true
                this.form={id:data.id}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                         request({
                             url:`${this.$ip}/mms-training/examResult/addScore`,
                             method:'get',
                             params:{
                                  ...this.form,
                             }
                         }).then((d) => {
                             this.close();
                             this.$message({
                                 message: '操作成功',
                                 type: 'success',
                             });
                             this.$emit('getList')
                             //  if(d.code==200){
                             //
                             // }else {
                             //     this.$message({
                             //         message: '操作失败',
                             //         type: 'error',
                             //     });
                             // }

                        });
                    }
                });
            },
            close(){
                 this.from={}
                this.dialogFormVisible=false
            }
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
    width: 522px;
    .el-dialog__body{
        padding: 0;
        .el-form-item__label{
            width:100px;
        }
        .el-input{
            width: 400px;
        }
        .el-form{
            margin-bottom: 32px;
        }
    }

}
.footer{

    display: flex;
    justify-content: center;
    .el-button{
        padding: 8px 56px;
        margin: 0px 0;

    }
    .el-button:first-child{
        margin-right: 20px;
    }
}
</style>