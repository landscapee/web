<template>
    <div>
        <el-dialog title="模板上传"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <div style=" padding: 32px 61px 28px 61px; ">
                <el-form :inline="true" :model="form" ref="form" :rules="rules">
                    <!--<div style="margin-bottom: 20px;color:#000000;font-size: 16px">模板上传</div>-->
                    <el-form-item label="模板类型">
                        <el-radio-group v-model="form.type" prop="type">
                            <el-radio v-for="(opt,index) in W_moduleType" :key="index" :label="opt.valCode" :value="opt.valCode"> {{opt.valData}}</el-radio>

                        </el-radio-group>
                    </el-form-item>
                    <el-form-item style="margin-right: 20px" label="模板上传">
                        <el-input style="width:200px" v-model="form.fileName" type="text"   :disabled="true"  placeholder="请上传图片"></el-input>
                    </el-form-item>

                    <el-form-item >
                        <el-button @click="upTemplate"   size="small" type="primary">文件上传</el-button>

                    </el-form-item >
                    <!--<div style="margin-bottom: 20px;color:#000000;font-size: 16px">模板类型</div>-->

                    <div style="display: none">
                        <UploadFile  :isPrompt="true"  accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg" ref="UploadFile" @getFile="getFile"></UploadFile>
                    </div>

                </el-form>
                <div class="Qfooter" style="margin-top: 30px">
                    <el-button @click="close(1)">取消</el-button>
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
                 form:{ fileName:'',type:'HS',fileId:''},
                typeObj:{
                    airlineTemplateFile:'HS',
                    bureauTemplateFile:'JF',
                    internalTemplateFile:'NB',
                },
                typeObj1:{
                    HS:'airlineTemplateFile',
                    JF:'bureauTemplateFile',
                    NB:'internalTemplateFile',
                },
                moduleObj:{},
                rules:{
                    type:[{required:true,message:'请选择模板类型',trigger:'blur'}]
                },
                id:'',
                W_moduleType:[],
                dialogFormVisible:false,
            }
        },
        methods: {


            open(id){
                this.dialogFormVisible=true
                this.id=id
                return false
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                 }).then((d) => {
                  if(data.code==200){
                      let obj={...data.data.typeVO}
                      request({
                          url:`${this.$ip}/mms-workorder/template/templatePath`,
                          method: 'get',
                          params:{code:obj.code,version:obj.version}
                      }).then(d1 => {
                          if( d1.code==200){
                              let fileId=d1.data[this.typeObj1[this.form.type]]
                              request({
                                  header:{
                                      'Content-Type':'multipart/form-data'
                                  },
                                  url:`${this.$ip}/mms-file/get-file-by-id/${fileId }`,
                                  method:'GET',
                              }).then((d) => {
                                  this.$set(this.form,'fileName',d.data.fileName)
                              });
                          }
                      });
                  }
                })
            },
            upTemplate(){
                this.$refs.UploadFile.$refs.buttonClick.$el.click()
            },
            getFile(file){
                 this.form.fileName=file.fileName
                this.form.fileId=file.id
            },
            close( ){
                this.form={ fileName:'',type:'HS',fileId:''}
                this.dialogFormVisible=false
            },
            submit(){
                let obj={
                    id:this.$route.query.id,
                }
              obj[this.typeObj1[this.form.type]]=this.form.fileId
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

        },
        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["W_moduleType" ]
            }).then(d => {
                 this.W_moduleType=d.data.W_moduleType
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
                width:auto !important;
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


    /deep/ .el-upload-list   {
        display: none;
    }
</style>