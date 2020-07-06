<template>
    <div>
        <el-dialog title="复制绩效明细"  :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="目标安全绩效：">
                    <span>{{row.year}}-{{row.month}}</span>
                </el-form-item>
                <el-form-item label="源安全绩效：">
                    <el-select style="width:400px" v-model="form.sourcesId">
                        <el-option v-for="(opt,index) in sourcesList" :label="opt.year+'-'+opt.month" :value="opt.id" :key="index">

                            <!--<span> {{opt.year}}-{{opt.month}}</span>-->
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div class="Qfooter">
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
                form:{},
                rules:{},
                sourcesList:[],
                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data,id){
                this.dialogFormVisible=true
                this.row={...data,selectedId:id}
                request({
                    url:`${this.$ip}/mms-qualification/securityMerits/sourcesList`,
                    method: 'post',
                    data:{
                        deptId:this.row.deptId,
                    }
                }).then((data) => {
                    this.sourcesList=data.data
                })
            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                         request({
                             url:`${this.$ip}/mms-qualification/securityMerits/copy`,
                             method:'post',
                             data:{
                                 targetId:this.row.id,
                                 ...this.form
                             }
                         }).then((d) => {

                              if(d.data){
                                 this.close();
                                 // if(this.row.id==this.row.selectedId){
                                 //     this.$emit('getList');
                                 // }
                                  this.$emit('getList')
                                 this.$message({
                                     message: '复制成功',
                                     type: 'success',
                                 });
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
        padding: 30px 30px 0 50px;
    }

}

</style>