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
            <el-form ref="form" label-position="right" :model="form" :rules="rules" class="demo-form-inline" :line="true"  >

                <div class="row_tow">
                    <el-form-item  label="课件编号：" prop="examName">
                        <span v-if="type=='info'">{{form.examName}}</span>
                        <el-input :class="(val)=>{console.log(val);return 'asdas'}" v-else v-model="form.examName" placeholder="请输入课件编号"></el-input>
                    </el-form-item>
                    <el-form-item  label="课件名称：" prop="examName1">
                        <span v-if="type=='info'">{{form.examName1}}</span>
                        <el-input v-else v-model="form.examName1" placeholder="请输入课件名称"></el-input>
                    </el-form-item>
                </div>

                <div class="row_tow">
                    <el-form-item  label="课件类别：" prop="paperName">
                        <span v-if="type=='info'">{{  form.paperName }}</span>
                        <el-select filterable :disabled="type=='edit'"  v-else clearable v-model="form.paperName" placeholder="请选择课件类别">
                            <el-option v-for="(opt,index) in options.coursewareType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="业务类型：" prop="paperName1">
                        <span v-if="type=='info'">{{  form.paperName1 }}</span>
                        <el-select filterable :disabled="type=='edit'"  v-else clearable v-model="form.paperName1" placeholder="请选择业务类型">
                            <el-option v-for="(opt,index) in options.CourseBusinessType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item  label="适合对象：" prop="paperId1">
                        <span v-if="type=='info'">{{  form.paperId1 }}</span>
                        <el-select filterable multiple :disabled="type=='edit'"  v-else clearable v-model="form.paperId1" placeholder="请选择适合对象">
                            <el-option v-for="(opt,index) in options.applyObject" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="下载权限：" prop="paperName12">
                        <span v-if="type=='info'">{{  form.paperName12 }}</span>
                        <el-select filterable :disabled="type=='edit'"  v-else clearable v-model="form.paperName12" placeholder="请选择下载权限">
                            <el-option v-for="(opt,index) in options.loadPermission" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div class="row_tow arow_tow">

                    <el-form-item label="是否启用：" prop="examType">
                        <span v-if="type=='info'">{{  form.examType }}</span>
                        <el-select  v-else clearable v-model="form.examType" placeholder="请选择是否启用">
                            <el-option v-for="(opt,index) in options.isUse" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>

                </div>
                 <div class="row_one rowT">
                    <el-form-item label="课件文件：" prop="fileName1">
                        <span v-if="type=='info'">{{form.fileName1}}</span>
                            <el-input v-else :disabled="true" v-model="form.fileName1" type="text"    placeholder="word\pdf\PPT格式：上传文件仅限于office类型文件"></el-input>
                    </el-form-item>
                     <el-form-item v-if="type!='info'" label="">
                        <el-upload
                               :multiple="false"
                               class="upload-demo"
                               ref="file"
                               :http-request="handleSubmit"
                               :on-change="handleChange"
                               accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg"
                               action=""
                               :before-upload="beforeAvatarUpload"
                               :auto-upload="true">
                            <el-button slot="trigger" size="small" type="primary">文件上传</el-button>
                           <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                        </el-upload>
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
                form: {fileName1:''},
                options: {},

                rules: {
                    infSources: [{ required:true,message:'sfsdfs', trigger: "blur" }],
                    paperId: [{ required:true,message:'请选择', trigger: "blur" }],
                    examMode: [{ required:true,message:'请选择', trigger: "blur" }],
                    examName: [{ required:true,message:'请输入课件编号', trigger: "blur" }],
                    examName1: [{ required:true,message:'请输入课件名称', trigger: "blur" }],
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
            let num=  this.$route.path.substring(1,4)=='add'?4:5;
            this.type = this.$route.path.substring(1,num);
            if (this.$route.query) {
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
                         url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                         method: "get",
                     }).then(d => {
                         this.form={...d.data }
                     })
                 }
            }



        },
        methods: {

            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id,fileName1:'' };
                }else{
                    this.form = { fileName1:''};
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            if(this.form.file){
                                let url
                                if(this.type=='add'){
                                    url='/examInfo/save'
                                }else {
                                    url='/examInfo/update'
                                }
                                request({
                                    url:`${this.$ip}/mms-training${url}`,
                                    method: 'post',
                                    data:{...this.form},
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
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
                this.form.fileName1=file.name
                console.log(file, fileList);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isLt2M;
            },
            handleSubmit(files,q) {
                let data=new FormData()
                data.append("file",files.file);
                // console.log(data,files,q,111);
                request.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-file/upload`,
                    method:'post',

                    data:data,
                }).then((d) => {
                    if(d){
                        this.form.file=d.data
                        this.$message({
                            message: '上传成功',
                            type: 'success',
                        });
                    }else {
                        this.$message({
                            message: '上传失败',
                            type: 'info',
                        });
                    }
                });
            },
        }
    };
</script>
<style scoped lang="scss">
    .courseware{
        padding:0 30px;
    }
    .G_form{
        margin-left: calc(50% - 470px);
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
        /deep/ .el-upload-list   {
            display: none;
        }

    }

</style>
