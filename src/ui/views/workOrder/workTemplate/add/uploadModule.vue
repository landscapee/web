<template>
    <div>
        <el-dialog title="模板上传"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <div style=" padding: 32px 40px 28px 50px; ">
                <el-form :inline="true" :model="form" ref="form" :rules="rules">

                    <el-form-item style="margin-right: 20px" label="局方模板上传:">

                        <el-button @click="upTemplate('JF')"   size="small" type="primary">文件上传</el-button>
                        <span class="spand" v-if="form.name2">
                            <span>
                                {{form.name2}}
                                 <span>
                                    <i @click="down('JF')" class="el-icon-download i1"></i>
                                    <i @click="del('JF')" class="el-icon-close i2"></i>
                                </span>
                            </span>
                        </span>

                    </el-form-item>

                   <div  >
                       <el-form-item style="margin-right: 20px" label="航司模板上传:">

                           <el-button @click="upTemplate('HS')"   size="small" type="primary">文件上传</el-button>
                           <span class="spand"  v-if="form.name1">
                            <span>
                                {{form.name1}}
                                 <span>
                                    <i @click="down('HS')" class="el-icon-download i1"></i>
                                    <i @click="del('HS')" class="el-icon-close i2"></i>
                                </span>
                            </span>
                        </span>
                       </el-form-item>
                   </div>
                    <el-form-item style="margin-right: 20px" label="内部模板上传:">

                        <el-button @click="upTemplate('NB')"   size="small" type="primary">文件上传</el-button>
                        <span class="spand" v-if="form.name3">
                            <span>
                                {{form.name3}}
                                 <span>
                                    <i @click="down('NB')" class="el-icon-download i1"></i>
                                    <i @click="del('NB')" class="el-icon-close i2"></i>
                                </span>
                            </span>
                        </span>
                    </el-form-item>



                    <div style="display: none">
                        <UploadFile   :isPrompt="true"  accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg" ref="UploadFile" @getFile="getFile"></UploadFile>
                    </div>

                </el-form>
                <div class="Qfooter" style="margin-top: 30px">
                    <el-button @click="close(1)">取消</el-button>
                    <el-button type="primary" @click="submit('form')">确认</el-button>
                </div>
            </div>
            <form ref="formA" action="#"></form>
        </el-dialog>


    </div>
</template>
<script>
     import request from '@lib/axios.js';
     import {map} from 'lodash'
    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                 form:{ fileName:'',type:'HS',fileId:''},

                typeObj1:{
                    HS:'airlineTemplateFile',
                    JF:'bureauTemplateFile',
                    NB:'internalTemplateFile',
                },
                typeObj:{
                    airlineTemplateFile:'HS',
                    bureauTemplateFile:'JF',
                    internalTemplateFile:'NB',
                },
                typeObjName:{
                    HS:'name1',
                    JF:'name2',
                    NB:'name3',
                },
                rules:{
                    type:[{required:true,message:'请选择模板类型',trigger:'blur'}]
                },
                id:'',
                dialogFormVisible:false,
            }
        },
        methods: {

            down(type){
                this.$refs.formA.action=`${this.$ip}/mms-file/get-file-stream-by-id/${this.form[this.typeObj1[type]] }`
                this.$refs.formA.submit()
            },
            del(type){
                this.$set(this.form,this.typeObjName[type],null)

                this.$set(this.form,this.typeObj1[type],null)
                this.$message.success('已删除，确认后生效')
            },

            upTemplate(type){
                this.form.type=type
                this.$refs.UploadFile.$refs.buttonClick.$el.click()
            },
            getFile(file){
                this.$set(this.form,this.typeObjName[this.form.type],file.fileName)
                this.$set(this.form,this.typeObj1[this.form.type],file.id)
                console.log(this.form,file);
            },
            close( ){
                this.form={type:'HS'}
                this.dialogFormVisible=false
            },
            submit(){
                let obj={
                    ...this.form,
                    id:this.$route.query.id,
                }
                  request({
                    url:`${this.$ip}/mms-workorder/template/upload`,
                    method: 'post',
                    data:obj
                }).then(d => {
                    if( d.code==200){
                        this.close()
                        this.$message.success("上传成功")
                    }
                });
            },
            open(id){
                this.dialogFormVisible=true
                 request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                }).then((data) => {
                    if(data.code==200){
                        let obj={...data.data.typeVO}
                        request({
                            url:`${this.$ip}/mms-workorder/template/templatePath`,
                            method: 'get',
                            params:{code:obj.code,version:obj.version}
                        }).then(d1 => {
                            if( d1.code==200){
                                this.form={...d1.data}
                                map(d1.data,(k,l)=>{
                                    if(l=='airlineTemplateFile'||l=='bureauTemplateFile'||l=='internalTemplateFile'&&k){
                                       let type=this.typeObj[l]
                                        request({
                                            header:{
                                                'Content-Type':'multipart/form-data'
                                            },
                                            url:`${this.$ip}/mms-file/get-file-by-id/${k}`,
                                            method:'GET',
                                        }).then((d) => {
                                            this.$set(this.form,this.typeObjName[type],d.data.fileName)
                                        });
                                    }
                                })

                            }
                        });
                    }
                })
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
            .el-form-item{
                width:100%;
            }  .el-form-item__content{
                width:calc( 100% - 115px);
            }
            .el-form-item__label{
                width:115px !important;
                color:#000000;
                font-size: 16px;
            }
            .el-input{
                width: 100%;
            }
            .el-form{
                margin-bottom: 10px;
            }
        }

    }


    /*/deep/ .el-upload-list   {*/
        /*display: none;*/
    /*}*/
    .spand{
        margin-left: 15px;
        display: inline-block;
        width:calc(100% - 110px);

       &>span{
           display: flex;
           justify-content: space-between;
       }
        i{
            display: none;
        }
        i:first-child{
            margin-right: 10px;
        }
        i:hover{
            opacity: .6;
        }
    }
    .spand:hover{
        cursor: pointer;
        i{
            display: inline-block;
        }
    }
</style>