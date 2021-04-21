<template>
    <div>
        <el-dialog title="航司选择"    :visible.sync="dialogTableVisible" class="dialog">
            <el-form ref="form" label-position="right" :model="form" :rules="rules"  :inline="true"  >

            <el-form-item  label="航司："  prop="airlineCompanyCode"   >

                 <el-select      filterable v-model="form.airlineCompanyCode" clearable placeholder="请选择航司">
                    <el-option v-for="(opt,index) in Airline" :key="index" :label="opt.iata" :value="opt.iata">
                        <span>{{opt.iata}}-{{opt.fullname}}</span>
                    </el-option>
                </el-select>
            </el-form-item>
            </el-form>
            <div slot="footer" class="bottom">
                <el-button @click='closeFn'>取消</el-button>
                <el-button @click='submitFn("form")' type='primary'>提交</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import request from '@lib/axios.js';
export default {
        data() {
            return {
                 Airline:[],
                dialogTableVisible: false,
                form:{ },
                rules:{
                    airlineCompanyCode:[{required:true,message:'请选择航司',trigger:'blur'}],
                }
            }
        },
        mounted(){

        },

        methods:{
            open(data){
                 this.dialogTableVisible = true
                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=Airline`,
                    method: 'get',
                }).then(d => {
                    if( d.data&&d.data.length){
                        this.Airline=[]
                        d.data.map((k,l)=>{
                            if(!k.parentCode){
                                 this.Airline.push(k)
                            }
                        })
                    }
                });

            },
            closeFn(){
                this.form={ }
                this.Airline=[]
                this.dialogTableVisible = false
            },
            submitFn(form){
                this.$refs[form].validate(valid => {
                    if (valid) {
                        request({
                            url:`${this.$ip}/mms-workorder/template/exportEnableTemplate`,
                            method: 'get',
                            responseType:'blob',
                            params:{...this.form}
                        }).then((d)=>{
                            let arr=[]
                            if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                                arr=d.headers['content-disposition'].split('=')[1].split('.')
                            }
                            let blob=new Blob([d],{type:'application/vnd.ms-excel'})
                            const fileName = `${decodeURI(arr[0])}` + '.xlsx'
                            if ('download' in document.createElement('a')) { // 非IE下载
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }
                            this.closeFn()
                        })
                    }
                })
            },

        }
    }
</script>
<style scoped lang='scss'>
    /deep/ .el-dialog{
        width: 550px;

    }
    .dialog {

        /deep/ .el-dialog__footer{
            text-align: center;
            button{
                padding:10px 30px
            }
        }

        /deep/ .el-dialog__header{
            text-align: center;
        }

        /deep/ .el-dialog__body {
            padding:50px;
            font-size: 20px;
            height: 180px;
            overflow-y: auto;
            text-align: center;
            align-items: center;
            .el-select{
                width: 230px;
            }
            /deep/ .el-dialog__footer {
                text-align: center;
                .el-button:nth-child(2) {
                    background: #3280e7;
                    color: #fff;
                }
            }

        }
    }
</style>
