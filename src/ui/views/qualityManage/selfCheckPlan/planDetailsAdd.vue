<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span>法定自查检查计划明细-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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

        <div :class=" type=='info'?'main-content main-info G_formInfo':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div></div>

                <div class="row_custom">
                    <el-form-item v-if="type=='add'" class="infoItem" label="序号：" prop="number">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else :disabled="type=='edit'" v-model="form.number" placeholder="请输入序号"></el-input>
                    </el-form-item>
                    <el-form-item label="序号：" v-else>
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else :disabled="type=='edit'" v-model="form.number" placeholder="请输入序号"></el-input>
                    </el-form-item>
                    <el-form-item label="检查项目：" prop="checkProject">
                        <span v-if="type=='info'">{{form.checkProject}}</span>
                         <el-select v-else v-model="form.checkProject" placeholder="请选择检查项目" clearable>
                            <el-option v-for="(opt,index) in options.checkProject" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="检查内容：" prop="checkContents">
                        <span v-if="type=='info'">{{form.checkContents}}</span>
                        <el-input v-else v-model="form.checkContents" placeholder="请输入检查内容"></el-input>
                    </el-form-item>
                    <el-form-item label="检查方式：" prop="checkMethod">
                        <span v-if="type=='info'">{{form.checkMethod?form.checkMethod.join(','):'' }}</span>
                         <el-select   v-else multiple v-model="form.checkMethod" placeholder="请选择检查方式" clearable>
                            <el-option v-for="(opt,index) in options.checkType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">

                    <el-form-item label="检查标准：" prop="checkStandard">
                        <span v-if="type=='info'">{{form.checkStandard}}</span>
                        <el-input v-else v-model="form.checkStandard" type="text"  placeholder="请输入检查标准"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="符合性判定标准：" prop="judgeStandard">
                        <span v-if="type=='info'">{{form.judgeStandard}}</span>
                        <el-input v-else v-model="form.judgeStandard" :rows="3" type="textarea"   placeholder="请输入符合性判定标准"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="检查依据-局方：" prop="checkBasisOfficial">
                        <span v-if="type=='info'">{{form.checkBasisOfficial}}</span>
                        <el-input v-else v-model="form.checkBasisOfficial" :rows="3" type="textarea"   placeholder="请输入检查依据-局方"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="检查依据-公司：" prop="checkBasisCompany">
                        <span v-if="type=='info'">{{form.checkBasisCompany}}</span>
                        <el-input v-else v-model="form.checkBasisCompany" :rows="3" type="textarea"   placeholder="请输入检查依据-公司"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">

                    <el-form-item label="检查对象：" prop="checkObject">
                        <span v-if="type=='info'">{{form.checkObject}}</span>
                         <el-select v-else clearable v-model="form.checkObject" placeholder="请选择检查对象" clearable>
                             <el-option v-for="(opt,index) in options.checkObject" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                         </el-select>
                    </el-form-item>
                    <el-form-item label="检查频次：" prop="checkFrequency">
                        <span v-if="type=='info'">{{form.checkFrequency}}</span>
                        <el-input v-else v-model="form.checkFrequency" placeholder="请输入检查频次"></el-input>
                    </el-form-item>
                </div>

                <div class="row_custom">


                    <el-form-item label="检查时间：" prop="checkTime">
                        <span v-if="type=='info'">{{form.checkTime}}</span>
                        <el-input v-else v-model="form.checkTime" placeholder="请输入检查时间"></el-input>
                    </el-form-item>
                    <el-form-item label="检查人员：" prop="checkUser">
                        <span v-if="type=='info'">{{form.checkUser}}</span>
                        <el-input v-else v-model="form.checkUser" placeholder="请输入检查人员"></el-input>
                    </el-form-item>
                </div>

                <div class="row_custom aRow_custom">
                    <el-form-item label="检查类别：" prop="checkType">
                        <span v-if="type=='info'">{{form.checkType}}</span>
                        <el-select v-else clearable v-model="form.checkType" placeholder="请选择检查类别" clearable>
                            <el-option v-for="(opt,index) in options.checkCategory||[]" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                         </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import moment from "moment";
    import {eleDateShow,inputLength} from '@lib/tools'

    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend } from "lodash";
    export default {
        components: {
            Icon
        },
        name: "",
        data() {

            const infNumberIs = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('序号不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-qualification/examinationDetail/numberExists`,
                        method: 'POST',
                        data:{
                            examinationId: this.$route.query.id,
                            number:value,
                        }
                    }).then(response => {
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该序号已存在");
                        }
                    });
                }
            };
            return {
                moment:moment,
                form: {checkMethod:[]},
                rules: {
                    number: [{validator:infNumberIs,required:true, trigger: "blur" }],
                    // system: [{ required: true, message: "请输入", trigger: "blur" }],
                 },
                options:{},
                type: "add"
            };
        },
        created() {
            let num=  this.$route.path.substring(1,4)=='add'?4:5;
            this.type = this.$route.path.substring(1,num);
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["checkProject", "checkType",'checkObject','checkCategory']
            }).then(d => {
                this.options=d.data
            });
            if (this.$route.query) {
                 this.$route.meta.title =
                    this.type == "add"
                        ? "法定自查检查计划明细新增"
                        : this.type == "edit"
                        ? "法定自查检查计划明细编辑"
                        : this.type == "info"
                            ? "法定自查检查计划明细详情"
                            : "";
                if(this.type == "edit" || this.type == "info"){


                    request({
                        url:`${this.$ip}/mms-qualification/examinationDetail/getById/${this.$route.query.id}`,
                        method: "get",
                    }).then(d => {
                        this.form={...d.data,checkMethod:d.data.checkMethod?d.data.checkMethod.split(','):[] }
                    })
                 }else {
                    // this.form.examinationId
                    this.$set(this.form,'examinationId',this.$route.query.id)
                }
            }
        },
        mounted(){
            inputLength(this)
        },
        methods: {

            resetForm(){
                if(this.type=='edit'){
                    for (let key in this.form) {
                        if (key !== 'id'&& key!=='number' && key!=='examinationId') {
                            if (typeof(this.form[key]) ==='string'){
                                this.form[key] = "";
                            } else if (typeof(this.form[key]) ==='number'){
                                this.form[key] = null;
                            }
                        }
                    }
                    this.form.checkMethod=[];
                }else {
                    this.form={checkMethod:[]};
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                             if(this.type == "add"){
                                url=`${this.$ip}/mms-qualification/examinationDetail/save`
                             }else {
                                 url=`${this.$ip}/mms-qualification/examinationDetail/update`
                            }
                            let data={...this.form}
                            if(data.checkMethod){
                                data.checkMethod=data.checkMethod.join(',')
                            }
                            request({
                                url,
                                method: "post",
                                data: data
                            })
                                .then(data => {
                                  if(data.code==200){
                                      this.$message.success("保存成功！");
                                      this.$router.go(-1);
                                  }
                                })

                        } else {
                            console.log("error submit!!");
                            return false;
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
        height:calc(100vh - 300px);
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
        margin-top: 40px;
        .el-form {
            width: 1000px;
            /deep/ .el-form-item__label {
                width: 165px;
                padding-left: 70px;
            }
            /deep/ .el-form-item__content {
                margin-left: 165px;
            }
            .row_item_row,.row_item{
               /deep/ .el-input{
                    /*width:600px!important;*/
                }
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
    .infoItem{
        /deep/ .el-form-item__label{
            padding-left: 58px!important;
        }
    }
</style>
