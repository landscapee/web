<template>
    <div>
        <el-dialog title="试卷导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="培训名称：">
                    <span>{{row.trainingName}} </span>
                </el-form-item>
                  <el-form-item label="时间：">
                      <el-date-picker
                              v-model="form.time"
                              type="datetimerange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                      </el-date-picker>
                      <el-date-picker
                              v-model="form.time"
                              type="yearrange"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期">
                      </el-date-picker>
                </el-form-item>


            </el-form>
            <div class="Qfooter">
                <a ref="a" :href="`${this.$ip}/mms-training/paperInfo/export/${this.row.id}/${form.type}`"></a>
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
                rules:{
                    type:[
                        {required:true,message:'请选择格式',trigger:'blur'}
                    ]
                },

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
                this.dialogFormVisible=true
                 this.row={...data}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                          this.$refs.a.click()
                    }
                });
            },
            close(){
                this.row={}
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

</style>