<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span>考试管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div v-if="type!='info'"  class="top-toolbar">
                <div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="save"></icon>保存
                </div>
                <div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="reset"></icon>重置
                </div>
            </div>
        </div>

        <div :class=" type=='info'?'main-content main-info':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div></div>

                <div class="row_custom">
                    <el-form-item  label="考试名称：" prop="examName">
                        <span v-if="type=='info'">{{form.examName}}</span>
                        <el-input v-else v-model="form.examName" placeholder="请输入考试名称"></el-input>
                    </el-form-item>
                    <el-form-item label="考试方式：" prop="examMode">
                        <span v-if="type=='info'">{{  form.examMode }}</span>
                        <el-select  v-else clearable v-model="form.examMode" placeholder="请选择考试方式">
                            <el-option v-for="(opt,index) in options.testType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>

                </div>

                <div class="row_custom">
                    <el-form-item :label="form.examMode=='线上'?'截止时间：':'举行时间：'" prop="examTime">
                        <span v-if="type=='info'">{{ form.examTime?moment(form.examTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker type="date" v-else v-model="form.examTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="考试地点：" prop="examSite">
                        <span v-if="type=='info'">{{form.examSite}}</span>
                        <el-input v-else v-model="form.examSite" placeholder="请输入考试地点"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item  label="考试试卷：" prop="paperId">
                        <span v-if="type=='info'">{{  form.paperName }}</span>
                        <el-select :disabled="type=='edit'"  v-else clearable v-model="form.paperId" placeholder="请选择考试试卷">
                            <el-option v-for="(opt,index) in testList" :key="index" :label="opt.paperName" :value="opt.id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时长：" prop="totalTime">
                        <span v-if="type=='info'">{{form.totalTime}}</span>
                        <el-input v-else v-model="form.totalTime" placeholder="请输入考试时长"></el-input>&nbsp;&nbsp;分
                    </el-form-item>
                </div>

                <div class="row_custom">

                    <el-form-item label="考试类型：" prop="examType">
                        <span v-if="type=='info'">{{  form.examType }}</span>
                        <el-select  v-else clearable v-model="form.examType" placeholder="请选择考试类型">
                            <el-option v-for="(opt,index) in options.testCategory1" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item label="资质类型：" prop="qualificationType">
                        <span v-if="type=='info'">{{  form.qualificationType }}</span>
                        <el-select  v-else clearable v-model="form.qualificationType" placeholder="请选择资质类型">
                            <el-option v-for="(opt,index) in options.zizhiType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                </div>
                <div :class="this.type=='add'?'row_custom aRow_custom':'row_custom'" >
                    <el-form-item label="业务类型：" prop="businessType">
                        <span v-if="type=='info'">{{  form.businessType }}</span>
                        <el-select  v-else clearable v-model="form.businessType" placeholder="请选择业务类型">
                            <el-option v-for="(opt,index) in options.businessType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                    <!--<el-form-item label="考题下载：" prop="examMode1">-->
                        <!--<span v-if="type=='info'">{{  form.examMode1 }}</span>-->
                        <!--<el-select  v-else clearable v-model="form.examMode1" placeholder="请选择考题下载">-->
                            <!--<el-option label="允许" value="允许"> </el-option>-->
                            <!--<el-option label="禁止" value="禁止"> </el-option>-->
                        <!--</el-select>-->
                    <!--</el-form-item>-->
                    <el-form-item v-if="type=='edit'||type=='info'" label="考试状态：" prop="examStatus">
                        <span v-if="type=='info'">{{form.examStatus}}</span>
                        <el-select v-else clearable v-model="form.examStatus" placeholder="请选择考试状态">
                            <!--<el-option label="已推送" value="已推送"> </el-option>-->
                            <!--<el-option label="已开始" value="已开始"> </el-option>-->
                            <!--<el-option label="已评价" value="已评价"> </el-option>-->
                            <el-option v-for="(opt,index) in options.testState"  :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                </div>
                <!--<div class="row_custom aRow_custom">-->
                    <!---->
                <!--</div>-->
                <div class="row_item_row row_item">
                    <el-form-item label="考试简介：" prop="description">
                        <span v-if="type=='info'">{{form.description}}</span>
                        <el-input v-else v-model="form.description" type="textarea" :rows="3"  placeholder="请输入考试简介"></el-input>
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
                form: {},
                options: {},
                testList: [],
                rules: {
                    infSources: [{ required:true,message:'sfsdfs', trigger: "blur" }],
                    paperId: [{ required:true,message:'请选择', trigger: "blur" }],
                    examMode: [{ required:true,message:'请选择', trigger: "blur" }],
                    examName: [{ required:true,message:'请输入考试名次', trigger: "blur" }],
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
                    data:["testType", "testCategory1","zizhiType",'businessType','testState' ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj

                });
                this.$route.meta.title =
                    this.type == "add"
                        ? "考试管理新增"
                        : this.type == "edit"
                        ? "考试管理编辑"
                        : this.type == "info"
                            ? "考试管理详情"
                            : "";
                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                         method: "get",
                     }).then(d => {

                         this.form={...d.data }
                     }).catch(error => {
                             this.$message.error(error);
                         });
                     request({
                         url:`${this.$ip}/mms-training/paperInfo/list`,
                         method: 'post',
                         data:{},
                         params:{size:10000,current:1}
                     })
                         .then((data) => {

                             this.testList = data.data.records||[]
                         })
                 }else{
                     request({
                         url:`${this.$ip}/mms-training/examInfo/getPaperList`,
                         method: 'get',

                     })
                         .then((data) => {

                             this.testList = data.data||[]
                         })
                 }
            }



        },
        methods: {

            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id };
                }else{
                    this.form = { };
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
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
                    });
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
    .main-content{
        overflow-y: auto;
        height:calc(100vh - 260px);
        /*margin-top: 80px!important;*/

        .aRow_custom{
            text-align:left;


        }
    }
    .main-info{
        span{
            /*font-weight: bold!important;*/
            /*margin: 0!important;*/
        }
        /deep/ .el-form-item__label{
            /*padding: 0!important;*/
        }
        .aRow_custom{
            span{

            }
        }
    }
    .addSysParameter {
        margin-top: 14px;
        .el-form {
            width: 1000px;
            /deep/ .el-form-item__label {
                width: 165px;
            }
            /deep/ .el-form-item__content {
                margin-left: 165px;
            }
            .row_item_row,.row_item{
                /deep/ .el-input{
                    /*width:600px!important;*/
                }
                /deep/ .el-form-item{
                    width:calc( 100% - 32px)!important;
                    .el-form-item__content{
                        width: calc( 100% - 165px)!important;
                    }
                    .el-input{
                        width: 100% !important;
                    }
                    .el-textarea{
                        width: 100% !important;
                    }

                }
            }
            /deep/ .el-input{
                width: 300px!important;
                margin-right: 2px;
            }
            .row_custom{
                /deep/ .el-form-item__content{
                    /*height: 40px;*/
                    width: 332px;
                    text-align: left;
                }
                @include common-input;
                &:first-child {
                    .el-form-item {
                        &:last-child {
                            margin-left: 93px;
                        }
                    }
                }
            }
            .row_item_row{
                .el-form-item {
                    width: calc(100% - 165px);
                }
            }
        }
    }
</style>
