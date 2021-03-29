<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                工卡核对-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
            </div>
            <div v-if="type!='info'"  class="QheadRight">
                <div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="save"></icon>保存
                </div>
                <div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="reset"></icon>重置
                </div>
            </div>
        </div>

        <div :class=" type=='info'?'G_form G_formInfo':'G_form'"  >
            <el-form  label-position="left" :model="form" :rules="rules" :inline="true" ref="form" >

                <div class="row_tow">
                    <el-form-item  label="发行单位：" prop="issuingUnit">
                        <span v-if="type=='info'">{{  form.issuingUnit || '--'}}</span>
                        <el-input   v-else v-model="form.issuingUnit" placeholder="请输入发行单位"></el-input>

                    </el-form-item>
                    <el-form-item label="审核内容：" prop="checkContent">
                        <span v-if="type=='info'">{{form.checkContent || '--'}}</span>
                        <el-input   v-else v-model="form.checkContent" placeholder="请输入审核内容"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="核对形式：" prop="checkMode">
                        <span v-if="type=='info'">{{  form.checkMode || '--'}}</span>
                        <el-input   v-else v-model="form.checkMode" placeholder="请输入"></el-input>

                    </el-form-item>

                    <el-form-item  label="核对时间：" prop="checkTime">
                        <span v-if="type=='info'">{{ form.checkTime?moment(form.checkTime).format('YYYY-MM-DD HH:mm'):'--'}}</span>
                        <el-date-picker    type="datetime" v-else v-model="form.checkTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="附件：" prop="enclosure">
                        <span v-if="type=='info'">{{  form.enclosure || '--'}}</span>
                        <UploadFile v-else  ref="UploadFile"
                                    :listNone="true"
                                    :limit="5"
                                    @start="showFile"
                                    @getFile="getFile"></UploadFile>
                        <!--<el-input   v-else v-model="form.enclosure" placeholder="请输入"></el-input>-->
                    </el-form-item>
                    <el-form-item  label="备注："  >
                        <span v-if="type=='info'">{{  form.remark }}</span>
                        <el-input   v-else v-model="form.remark" placeholder=" 请输入授权状态"></el-input>
                    </el-form-item>

                </div>

            </el-form>
        </div>

     </div>
</template>
<script>
    import {eleDateShow,inputLength} from '@lib/tools'

    import moment from "moment";
     import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend ,map} from "lodash";
    export default {
        components: {
            Icon
        },
        name: "workCardVrifyAdd",
        data() {
            return {
                moment:moment,
                form: {},
                fileList:[],
                 rules: {
                     issuingUnit: [{ required:true,message:'请输入发行单位',}],
                     checkContent: [{ required:true,message:'请输入审核内容',}],
                     checkMode: [{ required:true,message:'请输入核对形式',}],
                     checkTime: [{ required:true,message:'请选择核对时间', }],
                 },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "工卡核对新增"
                        : this.type == "edit"
                        ? "工卡核对编辑"
                        : this.type == "info"
                            ? "工卡核对详情":''

                 if(this.type!='add'){
                   this.getInfo()
                 }
            }
        },
        mounted(){
            inputLength(this)
            eleDateShow()
        },

        methods: {
            showFile() {
                if (this.fileList.length) {
                    this.$refs.file.getFileList(this.fileList);
                }
            },
            getFileList(fileIds) {
                request({
                    url:`${this.$ip}/mms-file/get-files-by-ids/`,
                    method: "post",
                    data:{
                        fileIds,
                    }
                }).then(d => {
                    if(d.code==200){
                        this.fileList=d.data
                        if(this.$refs.UploadFile){
                            this.$refs.UploadFile.getFileList(d.data)
                        }
                    }
                })
             },
            getFile(file) {
                this.$set(this.form, 'enclosure', file)
                console.log(file,file,this.form);

            },
            getInfo(){
                request({
                    url:`${this.$ip}/mms-workorder/cardCheck/selectById/${this.$route.query.id}`,
                    method: "get",
                }).then(d => {
                   if(d.data){
                       this.form=d.data
                       if(d.data.enclosure){
                           this.getFileList(d.data.enclosure)
                       }
                   }
                })
            },

            resetForm(){
                if(this.form.id){
                    this.form={
                        id:this.form.id,
                    }
                }else{
                    this.form = {  };
                }
            },
             saveForm(form) {

                     if (this.type == "add" || this.type == "edit") {
                         this.$refs[form].validate(valid => {
                             if (valid) {
                                 let url='/cardCheck/update'
                                 if(this.type=='add'){
                                     url='/cardCheck/save'
                                 }
                                 let obj={...this.form};
                                 if(!obj.checkTime){
                                     obj.checkTime=null
                                 }
                                  request({
                                     url:`${this.$ip}/mms-workorder${url}`,
                                     method: 'post',
                                     data:obj,
                                 }).then((data) => {
                                     if(data.code==200){
                                         this.$message.success("保存成功！");
                                         this.$router.go(-1)
                                      }
                                 })
                             }
                         });
                     }
            },


        }
    };
</script>
<style scoped lang="scss">
    .indexAdd{
        padding: 0 30px;

     }
    .G_form{
         /deep/.el-form {
            height: calc(100vh - 290px);
            .el-form-item__label{
                width: 140px;

            }
            .el-form-item__content{
                width: calc(100% - 180px);
            }
        }
    }

</style>
