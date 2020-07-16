<template>
    <div class="courseware">
        <div class="QCenterRight">
            <div class="QHead">
                 课件维护-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form ref="form" label-position="right" :model="form" :rules="rules"  :inline="true"  >

                <div class="row_tow">
                    <el-form-item  label="课件编号：" prop="courseCode">
                        <span v-if="type=='info'">{{form.courseCode}}</span>
                        <el-input   v-else v-model="form.courseCode" placeholder="请输入课件编号"></el-input>
                    </el-form-item>
                    <el-form-item  label="课件名称：" prop="courseName">
                        <span v-if="type=='info'">{{form.courseName}}</span>
                        <el-input v-else v-model="form.courseName" placeholder="请输入课件名称"></el-input>
                    </el-form-item>
                </div>

                <div class="row_tow">
                    <el-form-item  label="课件类别：" prop="courseType">
                        <span v-if="type=='info'">{{  form.courseType }}</span>
                        <el-select     v-else clearable v-model="form.courseType" placeholder="请选择课件类别">
                            <el-option v-for="(opt,index) in options.coursewareType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="业务类型：" prop="businessType">
                        <span v-if="type=='info'">{{  form.businessType }}</span>
                        <el-select     v-else clearable v-model="form.businessType" placeholder="请选择业务类型">
                            <el-option v-for="(opt,index) in options.CourseBusinessType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item  label="适合对象：" prop="suitableUser">
                        <div v-if="type=='info'"> </div>
                        <el-select   multiple   v-else clearable v-model="form.suitableUser" placeholder="请选择适合对象">
                            <el-option v-for="(opt,index) in options.applyObject" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="下载权限：" prop="downloadPermission">
                        <span v-if="type=='info'">{{  form.downloadPermission }}</span>
                        <el-select    v-else clearable v-model="form.downloadPermission" placeholder="请选择下载权限">
                            <el-option v-for="(opt,index) in options.loadPermission" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div class="row_tow arow_tow">

                    <el-form-item label="是否启用：" prop="active">
                        <span v-if="type=='info'">{{  form.active }}</span>
                        <el-select  v-else clearable v-model="form.active" placeholder="请选择是否启用">
                            <el-option v-for="(opt,index) in options.isUse" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>

                </div>
                 <div class="row_one rowT">
                    <el-form-item label="课件文件：" prop="courseFileId">
                        <span v-if="type=='info'">{{form.courseFileName}}</span>
                            <el-input v-else :disabled="true" v-model="form.courseFileName" type="text"    placeholder="word\pdf\PPT格式：上传文件仅限于office类型文件"></el-input>
                    </el-form-item>
                     <el-form-item v-if="type!='info'" label="">
                         <UploadFile  accept=".pdf,.doc,.ppt,.docx" ref="UploadFile" @getFile="getFile"></UploadFile>
                    </el-form-item>
                </div>
                <div class="row_one">
                    <el-form-item label="课件简介：" prop="description">
                        <span v-if="type=='info'">{{form.description}}</span>
                        <el-input v-else v-model="form.description" type="textarea" :rows="3"  placeholder="请输入课件简介"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import moment from "moment";

    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend } from "lodash";
    export default {
        components: {
            Icon
        },
        name: "",
        data() {


            return {
                moment:moment,
                oldForm:{},
                form: {courseFileName:'',courseFileId:'',suitableUser:[]},
                options: {},

                rules: {
                    courseType: [{ required:true,message:'请选择', trigger: "blur" }],
                    active: [{ required:true,message:'请选择', trigger: "blur" }],
                    downloadPermission: [{ required:true,message:'请选择', trigger: "blur" }],
                    courseCode: [{ required:true,message:'请输入课件编号', trigger: "blur" }],
                    courseName: [{ required:true,message:'请输入课件名称', trigger: "blur" }],
                    courseFileId: [{ required:true,message:'请上传课件', trigger: "blur" }],
                    totalTime: [
                        { required:true,message:'请输入', trigger: "blur" },
                        {
                        validator: (rule, value, callback) => {
                            if(value!=''){
                                if (typeof Number(value) == 'number' && !window.isNaN(Number(value))&&(value+'').split('.').length===1) {
                                    if (value <= 0) {
                                        callback(new Error('考试时长应该大于0'));
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback(new Error('必须为整数类型'));
                                }
                            }else{
                                callback();
                            }

                        },
                        trigger: 'change',
                    },],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                this.type = this.$route.query.type;
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["isUse", "loadPermission","CourseBusinessType",'coursewareType','applyObject' ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj

                });
                this.$route.meta.title =
                    this.type == "add"
                        ? "课件维护新增"
                        : this.type == "edit"
                        ? "课件维护编辑"
                        : this.type == "info"
                            ? "课件维护详情"
                            : "";

                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-training/courseInfo/info/${this.$route.query.id}`,
                         method: "get",
                     }).then(d => {
                         console.log(d.data.suitableUser && d.data.suitableUser.split(';')||[],111);
                         this.form={...d.data,suitableUser:d.data.suitableUser&&d.data.suitableUser.split(';')||[] }
                     })
                 }
            }



        },
        methods: {
            getFile(file){
                this.form.courseFileName=file.fileName
                this.form.courseFileId=file.id
            },
            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id,courseFileName:'',courseFileId:'' ,suitableUser:[]};
                }else{
                    this.form = { courseFileName:'',courseFileId:'',suitableUser:[]};
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            if(this.form.courseFileName){
                                let url
                                if(this.type=='add'){
                                    url='/courseInfo/save'
                                }else {
                                    url='/courseInfo/update'
                                }
                                let obj={...this.form}
                                if(obj.suitableUser){
                                    obj.suitableUser=obj.suitableUser.join(';')
                                }
                                request({
                                    url:`${this.$ip}/mms-training${url}`,
                                    method: 'post',
                                    data:{...obj},
                                }).then((data) => {
                                    this.$message.success("保存成功！");
                                    this.$router.go(-1)
                                })
                            }
                        }else{
                            this.$message.warning('等待文件上传成功后在提交')
                        }
                    });
                }
            },

        }
    };
</script>
<style scoped lang="scss">
    .courseware{
        padding:0 30px;
    }
    .G_form{
        /*margin-left: calc(50% - 470px);*/
    }
    .rowT{
       /deep/  .el-form-item:nth-child(1){
            width:calc(100% - 95px)!important;
        }
        /deep/  .el-form-item:nth-child(2){
            width:88px!important;
        }
        /deep/ .el-upload{
            background-color: #409EFF;
            border-radius: 4px;
        }


    }

</style>
