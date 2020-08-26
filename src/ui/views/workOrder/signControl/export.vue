<template>
    <div>
        <el-dialog title="工单导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <div style=" padding: 32px 40px 28px 50px; ">
                <Info :form="form"></Info>
                <el-form :inline="true" :model="form" ref="form" :rules="rules">
                    <el-form-item  prop="type" label="模板类型:">
                        <el-select v-model="form.type" size="middle">
                            <el-option v-for="(opt,index) in W_moduleType" :key="index" :value="opt.valCode" :label="opt.valData"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                 <div class="Qfooter" style="margin-top: 30px">
                    <el-button @click="close()">取消</el-button>
                    <el-button type="primary" @click="submit('form')">导出PDF</el-button>
                </div>
                <form action="#" ref="formA"></form>
            </div>
         </el-dialog>


    </div>
</template>
<script>
        import Info from './component/info'
    import request from '@lib/axios.js';

        import {map,get} from 'lodash'
    export default {
        name: "copyDetails",
        components: {
            Info
        },
        data() {
            return {

                 form:{},
                rules:{
                    type:[{required:true,message:'请选择模板类型',trigger:'blur'}]
                },
                W_moduleType:[],

                dialogFormVisible:false,
            }
        },
        methods: {
            close( ){
                this.form={}
                this.dialogFormVisible=false
            },
            submit(form){
                this.$refs[form].validate(valid => {
                    if (valid) {
                        request({
                            header:{
                                'Content-Type':'multipart/form-data'
                            },
                            url:`${this.$ip}/mms-workorder/operationInf/export?serialNo=${this.form.serialNo }&type=${this.form.type}`,
                            method: 'get',
                            responseType: 'blob'
                        }).then(d => {
                            console.log();
                            let arr=d.headers['content-disposition'].split('=')[1].split('.')

                            let content = d;
                            // let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                            let blob = new Blob([content],{type:'application/msword'})
                              const fileName = `${decodeURI(arr[0])}.${arr[1]}`
                            if ('download' in document.createElement('a')) { // 非IE下载
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }else { // IE10+下载
                                navigator.msSaveBlob(blob, fileName)
                            }
                        });

                    }
                });
            },
            open(row){
                this.dialogFormVisible=true
                 this.form={...row}
            },
        },
        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["W_moduleType" ]
            }).then(d => {
                let obj=d.data
               this.W_moduleType=obj.W_moduleType

            });
        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog{
        width: 650px;
        .el-dialog__body{
            padding: 0;
            .el-form-item__label{
                width:140px;
                text-align: left;
            }
            .el-select{
                height:40px;
            }

        }

    }




</style>