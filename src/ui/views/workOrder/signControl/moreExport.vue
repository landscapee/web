<template>
    <div>
        <el-dialog title="工单批量导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <div style=" padding: 32px 40px 28px 50px; ">
                <div  v-show="showItem" :style=" ` position: absolute;left:600px;background:white;width:90%;padding:15px` "  >
                    <Info :form="hoveropt"></Info>
                </div>
                <div class="divBoxF">
                    <div @ class="item" @mouseenter="showInfo(opt)" @mouseleave="leave()"  v-for="(opt,index) in checkArr" :key="index">
                        <div>{{index+1}}</div>
                        <div>工单编号：<span>{{opt.serialNo}}</span></div>

                    </div>
                </div>
                <el-form   :inline="true" :model="form" ref="form" :rules="rules">
                    <el-form-item  prop="type" label="模板类型:">
                        <el-select v-model="form.type" size="middle">
                            <el-option v-for="(opt,index) in W_moduleType" :key="index" :value="opt.valCode" :label="opt.valData"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div style="color:#7F7F7F;">【说明】：鼠标悬停至工单编号上显示对应工单详情</div>
                <div class="Qfooter" style="margin-top: 30px">
                    <el-button @click="close()">取消</el-button>
                    <el-button type="primary" @click="submit('form')">导出（{{checkArr.length}}）</el-button>
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
            const type = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('请选择模板类型'));
                } else {
                    if(!this.modulObj[this.typeObj1[this.form.type]]){
                        return callback(new Error('有工单暂无模板类型'));

                    }else{
                        return callback()
                    }
                }
            };
            return {
                modulObj:{},
                typeObj1:{
                    HS:'airlineTemplateFile',
                    JF:'bureauTemplateFile',
                    NB:'internalTemplateFile',
                },
                checkArr:[],
                hoveropt:{},
                form:{},
                showItem:false,
                rules:{
                    type:[{required:true,validator:type,trigger:'blur'}]
                },
                W_moduleType:[],
                dialogFormVisible:false,
            }
        },
        methods: {
            leave(){
                this.showItem=false
            },
            showInfo(opt){
                this.hoveropt=opt
                this.showItem=true
            },
            close( ){
                this.checkArr=[]
                this.dialogFormVisible=false
            },
            submit(form){
                this.$refs[form].validate(valid => {
                    if (valid) {
                        let serialNo=this.checkArr.map((k,l)=>{
                                return k.serialNo
                        })
                         request({
                            header:{
                                'Content-Type':'multipart/form-data'
                            },
                            url:`${this.$ip}/mms-workorder/operationInf/exportBatch?serialNo=${serialNo.join(',') }&type=${this.form.type}`,
                            method: 'get',
                            responseType: 'blob'
                        }).then(d => {
                             let arr=['压缩文件','zip']
                            if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                                  arr=d.headers['content-disposition'].split('=')[1].split('.')
                            }
                            let content = d;
                              let blob = new Blob([content],{type:'application/zip'})
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
            open(arr){
                this.dialogFormVisible=true
                this.checkArr=arr.filter((k,l)=>{
                    return !k.offlineFile
                })
                let serialNo=this.checkArr.map((k,l)=>{
                    return k.template.id
                })
                request({
                    url:`${this.$ip}/mms-workorder/template/checkTemplateFileExist`,
                    method: 'post',
                    data:serialNo
                }).then(d => {
                    this.modulObj=d.data
                });
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
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog{
        width: 650px;
        .el-dialog__body{
            padding: 0;

            .el-form-item__label{
                width:110px;
                text-align: left;
            }
            .el-select{
                height:40px;
            }
        }
    }
    /deep/ .el-form{
        margin-top: 5px;
    }
.divBoxF{
    &>.item{
        display: flex;
        justify-content: left;
        align-items: center;
        height:30px;
        div:first-child{
            color:#7F7F7F;
            margin-right: 15px;
        }
        div:nth-child(2){

            margin: 0 0px 0 20px;
            span{
                margin-left: 30px;
            }
        }
    }
}



</style>