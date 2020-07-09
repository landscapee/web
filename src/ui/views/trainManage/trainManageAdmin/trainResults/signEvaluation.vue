<template>
    <div>
        <el-dialog :title="`${row.name}签到与评价`"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
           <div style=" padding: 32px 61px 28px 61px; ">
               <el-form :model="form" ref="form" :rules="rules">
                    <el-form-item label="培训签到" prop="signStatus">
                        <el-select v-model="form.signStatus">
                            <el-option v-for="(opt,index) in options.trainSign" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                   </el-form-item>

                   <el-form-item label="培训评价" prop="appraiseContent">
                       <el-input v-model="form.appraiseContent" type="textarea" :rows="4"></el-input>
                   </el-form-item>
               </el-form>

               <div class="Qfooter">
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
                form:{},
                rules:{
                    appraiseContent:[{required:true,message: '请输入考试分数',trigger:'blur'}]
                },
                options:{},
                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
                this.row={...data}
                this.dialogFormVisible=true
                this.form={id:data.id,signStatus:data.signStatus||'已签到',appraiseContent:data.appraiseContent}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                         request({
                             url:`${this.$ip}/mms-training/trainingResult/addSignAndAppraise`,
                             method:'post',
                             data:{
                                  ...this.form,
                             }
                         }).then((d) => {

                              if(d.code==200){
                                  this.close();
                                  this.$message({
                                      message: '操作成功',
                                      type: 'success',
                                  });
                                  this.$emit('getList')
                             }else {
                                 this.$message({
                                     message: '操作失败',
                                     type: 'error',
                                 });
                             }

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
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['trainSign']
            }).then(d => {
                this.options=d.data
             });
        },
    }
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
    width: 600px;
    .el-dialog__body{
        padding: 0;
        .el-form-item__label{
            width:100px;
        }
        .el-input{
            width: 300px;
        } .el-textarea{
            width: 300px;
        }
        .el-form{
            margin-bottom: 32px;
        }
    }

}
 </style>