<template>
    <div>
        <el-dialog title="复制历史版本工单模板"  :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">

                <el-form-item label="请选择历史版本号：">
                    <el-select style="width:400px" v-model="form.sourcesId">
                        <el-option v-for="(opt,index) in sourcesList" :label="opt.year+'-'+opt.month" :value="opt.id" :key="index">

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
                sourcesListObj:{},
                sourcesList:[],
                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(code){

                this.dialogFormVisible=true
                 request({
                    url:`${this.$ip}/mms-workorder/template/getOptionsByCode/${ code}`,
                    method: 'get',

                }).then((data) => {
                    this.sourcesList=data.data
                     data.data.map((k,l)=>{
                         this.sourcesListObj[k.version]=k
                     })
                })
            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                         request({
                             url:`${this.$ip}/mms-workorder/template/copyByVersion`,
                             method:'post',
                             data:{

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
        padding: 30px 30px 20px 50px;
    }

}

</style>