<template>
    <div>
        <el-dialog title="分数录入"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <div>李梅 信息安全考试    考分：</div>
                <el-form-item label="" prop="score">
                    <el-input v-model="form.score" type="number"></el-input>
                </el-form-item>
            </el-form>
            <div class="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit('form')">确认</el-button>
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


                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
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