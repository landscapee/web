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

        <div :class=" type=='info'?'main-content main-info':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div></div>

                <div class="row_custom">
                    <el-form-item label="序号：" :prop="type=='add'?'number':''">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else :disabled="type=='edit'" v-model="form.number" placeholder="请输入序号"></el-input>
                    </el-form-item>
                    <el-form-item label="检查项目：" prop="checkProject">
                        <span v-if="type=='info'">{{form.checkProject}}</span>
                        <el-input  v-else v-model="form.checkProject" placeholder="请输入检查项目"></el-input>
                        <!--<el-date-picker ></el-date-picker>-->
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="检查内容：" prop="checkContents">
                        <span v-if="type=='info'">{{form.checkContents}}</span>
                        <el-input v-else v-model="form.checkContents" placeholder="请输入检查内容"></el-input>
                    </el-form-item>
                    <el-form-item label="检查方式：" prop="checkMethod">
                        <span v-if="type=='info'">{{form.checkMethod}}</span>
                        <el-input v-else v-model="form.checkMethod" placeholder="请输入检查方式"></el-input>
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
                         <el-select v-else clearable v-model="form.checkObject" placeholder="请选择检查对象">
                            <el-option label="jiwu" value="jiwu"> </el-option>
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
                        <el-select v-else clearable v-model="form.checkType" placeholder="请选择检查类别">
                            <el-option label="违规" value="违规"> </el-option>
                         </el-select>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
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
                        url:`${this.$ip}/qualification/examinationDetail/numberExists`,
                        method: 'POST',
                        data:{
                            examinationId: this.$route.query.id,
                            number:value,
                        }
                    }).then(response => {
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该序号已存");
                        }
                    });
                }
            };
            return {
                form: {},
                rules: {
                    number: [{validator:infNumberIs, trigger: "blur" }],
                    // system: [{ required: true, message: "请输入", trigger: "blur" }],
                 },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "法定自查检查计划明细新增"
                        : this.type == "edit"
                        ? "法定自查检查计划明细编辑"
                        : this.type == "info"
                            ? "法定自查检查计划明细详情"
                            : "";
                if(this.type == "edit" || this.type == "info"){
                    let data=JSON.parse( this.$route.query.data)
                    this.form={...data}
                }else {
                    // this.form.examinationId
                    this.$set(this.form,'examinationId',this.$route.query.id)
                }
            }
        },
        methods: {
            resetForm(){
                this.form={};
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                             if(this.type == "add"){
                                url=`${this.$ip}/qualification/examinationDetail/save`
                             }else {
                                 url=`${this.$ip}/qualification/examinationDetail/update`
                            }
                            request({
                                url,
                                method: "post",
                                data: this.form
                            })
                                .then(data => {
                                    this.$message.success("保存成功！");
                                    this.$router.go(-1);
                                })
                                .catch(error => {
                                    this.$message.success(error);
                                });
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
        height:calc(100vh - 260px);
        /*margin-top: 80px!important;*/
        .aRow_custom{
            text-align:left;
        }
    }
    .main-info{
        span{
            font-weight: bold!important;
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
</style>
