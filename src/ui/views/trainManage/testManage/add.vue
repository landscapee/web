<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                考试管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form  label-position="right" :model="form" :rules="rules" :inline="true" ref="form" >
                <div></div>
                <div class="row_tow">
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

                <div class="row_tow">
                    <el-form-item :label="form.examMode=='线上'?'截止时间：':'举行时间：'" prop="examTime">
                        <span v-if="type=='info'">{{ form.examTime?moment(form.examTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker type="date" v-else v-model="form.examTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="考试地点：" prop="examSite">
                        <span v-if="type=='info'">{{form.examSite}}</span>
                        <el-input v-else v-model="form.examSite" placeholder="请输入考试地点"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="考试试卷：" prop="paperId">
                        <span v-if="type=='info'">{{  form.paperName }}</span>
                        <el-select filterable :disabled="form.examStatus!='未推送'"  v-else clearable v-model="form.paperId" placeholder="请选择考试试卷">
                            <el-option v-for="(opt,index) in testList" :key="index" :label="opt.paperName" :value="opt.id"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时长：" prop="totalTime">
                        <span v-if="type=='info'">{{form.totalTime}}分钟</span>
                        <el-input v-else v-model="form.totalTime" placeholder="请输入考试时长"></el-input>
                        <span v-if="type!='info'" style="position: absolute;right:2px">&nbsp;&nbsp;分</span>
                    </el-form-item>
                </div>

                <div class="row_tow">

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
                <div  class=" row_tow" >
                    <el-form-item label="业务类型：" prop="businessType">
                        <span v-if="type=='info'">{{  form.businessType }}</span>
                        <el-select  v-else clearable v-model="form.businessType" placeholder="请选择业务类型">
                            <el-option v-for="(opt,index) in options.businessType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>

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
                <!--<div class="row_tow arow_tow">-->
                    <!---->
                <!--</div>-->
                <div class="  row_one">
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
                    examName: [{ required:true,message:'请输入考试名称', trigger: "blur" }],
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
                request({
                    url:`${this.$ip}/mms-training/examInfo/getPaperList`,
                    method: 'get',
                }).then((data) => {
                    this.testList = data.data||[]
                })
                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                         method: "get",
                     }).then(d => {

                         this.form={...d.data }
                     }).catch(error => {
                             this.$message.error(error);
                         });

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
    .indexAdd{
        padding: 0 30px;
     }
    /deep/ .el-form{
        .el-form-item__label{
            width: 110px!important;

        }
        .el-form-item__content{
            width: calc(100% - 180px);
        }
    }
</style>
