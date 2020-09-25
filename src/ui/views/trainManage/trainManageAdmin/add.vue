<template>
    <div>
        <div class="QCenterRight trainManageAdmin">
            <div class="QHead">
                 培训管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
                 <el-form ref="form" label-position="right" :model="form" :rules="rules" class="demo-form-inline" :inline="true"  >

                    <div class="row_one">
                        <el-form-item  label="培训项目：" prop="trainingName">
                            <span v-if="type=='info'">{{form.trainingName}}</span>
                            <el-input   v-else v-model="form.trainingName" placeholder="请输入培训项目"></el-input>
                        </el-form-item>

                    </div>

                    <div class="row_tow">
                        <el-form-item  label="类别：" prop="trainingType">
                            <span v-if="type=='info'">{{  form.trainingType }}</span>
                            <el-select     v-else clearable v-model="form.trainingType" placeholder="请选择类别">
                                <el-option v-for="(opt,index) in options.trainType" :key="index" :label="opt.valData" :value="opt.valCode"> </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="简介：" prop="description">
                            <span v-if="type=='info'">{{form.description}}</span>
                            <el-input   v-else v-model="form.description" placeholder="请输入简介"></el-input>
                        </el-form-item>

                    </div>
                    <div class="row_tow">
                        <el-form-item  label="开始时间：" prop="startTime">
                            <span v-if="type=='info'">{{  form.startTime?this.$moment(form.startTime).format('YYYY-MM-DD HH:mm:ss'):'' }}</span>
                            <el-date-picker @focus="focus" @blur="blur(true)" type="datetime"  v-else v-model="form.startTime" :picker-options="pickerOptions" placeholder="请选择开始时间"></el-date-picker>
                        </el-form-item>
                        <el-form-item  label="结束时间：" prop="endTime">
                            <span v-if="type=='info'">{{  form.endTime?this.$moment(form.endTime).format('YYYY-MM-DD HH:mm:ss'):'' }}</span>
                            <el-date-picker @focus="focus1" @blur="blur(true)" type="datetime" v-else v-model="form.endTime" :picker-options="pickerOptions1" placeholder="请选择结束时间"></el-date-picker>
                        </el-form-item>
                    </div>

                    <div class="row_tow">
                        <el-form-item  label="课时：" prop="classHour">
                            <span v-if="type=='info'">{{form.classHour}}</span>
                            <el-input   v-else v-model="form.classHour" placeholder="请输入课时"></el-input>
                        </el-form-item>
                        <el-form-item  label="参加人数：" prop="personCount">
                            <span v-if="type=='info'">{{form.personCount}}</span>
                            <el-input   v-else v-model="form.personCount" placeholder="请输入参加人数"></el-input>
                        </el-form-item>

                    </div>
                    <div class="row_one">
                        <el-form-item  label="地点：" prop="trainingPlace">
                            <span v-if="type=='info'">{{form.trainingPlace}}</span>
                            <el-input   v-else v-model="form.trainingPlace" placeholder="请输入地点"></el-input>
                        </el-form-item>

                    </div>
                    <div class="row_one">
                        <el-form-item  label="培训单位：" prop="trainingUnit">
                            <span v-if="type=='info'">{{form.trainingUnit}}</span>
                            <el-input   v-else v-model="form.trainingUnit" placeholder="请输入培训单位"></el-input>
                        </el-form-item>
                    </div>
                    <div class="row_tow">
                        <el-form-item  label="讲师：" prop="teacherName">
                            <span v-if="type=='info'">{{form.teacherName}}</span>
                            <el-input   v-else v-model="form.teacherName" placeholder="请输入讲师"></el-input>
                        </el-form-item>
                        <el-form-item  label="讲师等级：" prop="teacherLevel">
                            <span v-if="type=='info'">{{form.teacherLevel}}</span>
                            <el-input   v-else v-model="form.teacherLevel" placeholder="请输入讲师等级"></el-input>
                        </el-form-item>

                    </div>
                    <div class="row_tow">
                        <el-form-item  label="联系方式：" prop="contactInformation">
                            <span v-if="type=='info'">{{form.contactInformation}}</span>
                            <el-input   v-else v-model="form.contactInformation" placeholder="请输入联系方式"></el-input>
                        </el-form-item>
                        <el-form-item  label="对象范围：" prop="personScope">
                            <span v-if="type=='info'">{{form.personScope}}</span>
                            <el-input   v-else v-model="form.personScope" placeholder="请输入对象范围"></el-input>
                        </el-form-item>

                    </div>
                    <div class="row_one">
                        <el-form-item  label="培训经费：" prop="trainingFunds">
                            <span v-if="type=='info'">{{form.trainingFunds}}</span>
                            <el-input   v-else v-model="form.trainingFunds" placeholder="请输入培训经费"></el-input>
                        </el-form-item>

                    </div>
                    <div class="row_one">
                        <el-form-item  label="备注：" prop="remark">
                            <span v-if="type=='info'">{{form.remark}}</span>
                            <el-input   v-else v-model="form.remark" placeholder="请输入备注"></el-input>
                        </el-form-item>
                    </div>

                    <div class="row_one oneFile">
                        <el-form-item label="课件：" prop="courseFileId">
                            <span @click="fileDownload(form.courseFileId,2,'courseFileName')" class="hoverSpanFile" v-if="type=='info'">{{form.courseFileName}}<i class="el-icon-download iClass"></i></span>
                            <div v-else style="display: flex;justify-content: left">
                                <el-input   :disabled="true" v-model="form.courseFileName" type="text"    placeholder="请选择文件"></el-input>
                                <UploadFile  accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,.doc,.txt,.docx,.ppt"  ref="UploadFile" @getFile="getCourse"></UploadFile>
                            </div>
                        </el-form-item>

                    </div>
                     <div class="row_one oneFile">

                        <el-form-item    label="签到表：" prop="signFileId">
                            <!--<a href="javascript"></a>-->
                            <span @click="fileDownload(form.signFileId,1,'signFileName')" class="hoverSpanFile" v-if="type=='info'">{{form.signFileName}} <i class="el-icon-download iClass"></i></span>
                            <div style="display: flex;justify-content: left" v-else>
                                <el-input  :disabled="true" v-model="form.signFileName" type="text"    placeholder="pdf/图片"></el-input>
                                <UploadFile accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf" ref="UploadFile" @getFile="getFile"></UploadFile>

                            </div>
                        </el-form-item>
                    </div>

                </el-form>
         </div>
        <form action="#" method="GET" ref="formLoad"></form>

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
                pickerOptions: {},
                pickerOptions1: {},

                rules: {
                    trainingType: [{ required:true,message:'请选择类别', trigger: "blur" }],
                    startTime: [{ required:true,message:'请选择开始时间', trigger: "blur" }],
                    endTime: [{ required:true,message:'请选择结束时间', trigger: "blur" }],
                    classHour: [{ required:true,message:'请输入课时', trigger: "blur" }],
                    teacherName: [{ required:true,message:'请输入讲师', trigger: "blur" }],
                    trainingName: [{ required:true,message:'请输入培训项目', trigger: "blur" }],
                    trainingName1: [{ required:true,message:'请输入课件名称', trigger: "blur" }],
                    courseFileId: [{ required:true,message:'请上传课件', trigger: "blur" }],
                    signFileId: [{ required:true,message:'请上传签到表', trigger: "blur" }],

                    personCount: [
                        { required:true,message:'请输入', trigger: "blur" },
                        {
                        validator: (rule, value, callback) => {
                            if(value!=''){
                                if (typeof Number(value) == 'number' && !window.isNaN(Number(value))&&(value+'').split('.').length===1) {
                                    if (value <= 0) {
                                        callback(new Error('参加人数应该大于0'));
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
            if(this.$router.history.current.path == '/trainManageAdminAdd'){
                if (this.$route.query) {
                    this.type = this.$route.query.type;

                    request({
                        url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                        method: 'post',
                        params:{delete:false},
                        data:['trainType' ]
                    }).then(d => {
                        let obj=d.data
                        this.options=obj
                    });
                    this.$route.meta.title =
                        this.type == "add"
                            ? "培训管理新增"
                            : this.type == "edit"
                            ? "培训管理编辑"
                            : this.type == "info"
                                ? "培训管理详情"
                                : "";
                    if(this.type!='add'){
                        request({
                            url:`${this.$ip}/mms-training/trainingInfo/info/${this.$route.query.id}`,
                            method: "get",
                        }).then(d => {
                            this.form={...d.data }
                        })
                    }
                }
            }
        },
        methods: {
            fileDownload(id,num,key){
                if(id){
                    request({
                         header:{
                            'Content-Type':'multipart/form-data'
                        },
                        url:`${this.$ip}/mms-file/get-file-stream-by-id/${id }`,
                        method:'GET',
                        responseType: 'blob'

                    }).then((d) => {
                        let content = d;
                         let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                        const fileName =this.form[key]
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
                }else {
                    this.$message.info('暂无附件')
                }
            },
            getCourse  (file){
                this.$set(this.form,'courseFileId',file.id)
                this.$set(this.form,'courseFileName',file.fileName)
            },  getFile(file){
                this.$set(this.form,'signFileId',file.id)
                this.$set(this.form,'signFileName',file.fileName)
            },
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
                                let url
                                 if(this.type=='add'){
                                    url='/trainingInfo/save'
                                }else {
                                    url='/trainingInfo/update'
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
                    });
                }
            },
            focus(val){
                let e=this.form.endTime?new Date(this.form.endTime):''
                let s=new Date(this.form.startTime)
                this.pickerOptions = {
                    disabledDate(time) {
                         if (e) {
                            return time.getTime() > e.getTime();
                        }
                    },
                };
            } ,
            focus1(val){
                let e=this.form.endTime?new Date(this.form.endTime):''
                let s=this.form.startTime?new Date(this.form.startTime):''
                this.pickerOptions1 = {
                    disabledDate(time) {
                        // console.log(1, 8);
                        if (s) {
                            return time.getTime() < s.getTime()  ;
                        }
                    },
                };
            },
            blur(b) {
                let e=this.form.endTime?new Date(this.form.endTime):''
                let s=this.form.startTime?new Date(this.form.startTime):''
                let msg;
                if (e && s && e.getTime() <= s.getTime()) {
                    if (b) {
                        msg = '开始时间应该小于结束时间';
                        this.form.startTime = '';
                    } else {
                        msg = '结束时间应该大于开始时间';

                        this.form.endTime= '';
                    }
                    this.$message({
                        type: 'warning',
                        message: msg,
                    });
                }
            },
        }
    };
</script>
<style scoped lang="scss">
    .trainManageAdmin{
        margin-right:30px;
    }
    .G_form{
        /*margin-left: calc(50% - 470px);*/
    }
    /deep/ .el-form{
        .el-form-item__label{
            width: 110px!important;

        }
        .el-form-item__content{
            width: calc(100% - 180px);
        }
    }
    .oneFile{
       /deep/  .el-form-item__content{
            .el-input {
               margin-right: 10px;
               width:calc(100% - 98px)!important;
           }
        }
    }
.iClass{
    margin-left: 10px;
    display: inline-block;
    font-size: 18px;
    margin-bottom: 15px;
    color: #606266;

}
    .hoverSpanFile:hover  {
        color: #5cb6ff;
        cursor: pointer;
    }
    .hoverSpanFile:hover i{
        color: #5cb6ff;
        cursor: pointer;
    }
</style>
