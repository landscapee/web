<template>
    <div class="addSysParameter ">
        <div class="top-content">
            <div class="top-content-title">
                <span>危险数据-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div v-if="type!='info'"  class="top-toolbar">
                <div @click="type!='info'?saveQualifications('form'):()=>{}" :class="type=='info'?'isDisabled':''">
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
                    <el-form-item label="编号：" :prop="type=='edit'?'':'number'">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input :disabled="type=='edit'" v-else v-model="form.number" placeholder="请输入编号"></el-input>
                    </el-form-item>
                    <el-form-item label="系统：" prop="system">
                        <span v-if="type=='info'">{{form.system}}</span>
                        <el-input v-else v-model="form.system" placeholder="请输入系统"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="子系统：" prop="childSystem">
                        <span v-if="type=='info'">{{form.childSystem}}</span>
                        <el-input v-else v-model="form.childSystem" placeholder="请输入子系统"></el-input>
                    </el-form-item>
                    <el-form-item label="一级流程：" prop="firstProcess">
                        <span v-if="type=='info'">{{form.firstProcess}}</span>
                        <el-input v-else v-model="form.firstProcess" placeholder="请输入一级流程"></el-input>
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="二级流程：" prop="secondProcess">
                        <span v-if="type=='info'">{{form.secondProcess}}</span>
                        <el-input v-else v-model="form.secondProcess" placeholder="请输入二级流程"></el-input>
                    </el-form-item>
                    <el-form-item label="场所：" prop="place">
                        <span v-if="type=='info'">{{form.place}}</span>
                        <el-input v-else v-model="form.place" placeholder="请输入场所"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="责任部门/项目：" prop="project">
                        <span v-if="type=='info'">{{form.project}}</span>
                        <el-input v-else v-model="form.project" placeholder="请输入责任部门/项目"></el-input>
                    </el-form-item>
                    <el-form-item label="设备/活动/过程：" prop="process">
                        <span v-if="type=='info'">{{form.process}}</span>
                        <el-input v-else v-model="form.process" placeholder="请输入设备/活动/过程"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">

                    <el-form-item label="危险源描述：" prop="dangerRemark">
                        <span v-if="type=='info'">{{form.dangerRemark}}</span>
                        <el-input v-else v-model="form.dangerRemark" :rows="3" type="textarea"   placeholder="请输入危险源描述"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">

                    <el-form-item label="安全信息编号：" prop="securityNumber">
                        <span v-if="type=='info'">{{form.securityNumber}}</span>
                        <el-input v-else v-model="form.securityNumber" placeholder="请输入安全信息编号"></el-input>
                    </el-form-item>
                    <el-form-item label="可能产生后果：" prop="consequence">
                        <span v-if="type=='info'">{{form.consequence}}</span>
                        <el-input v-else v-model="form.consequence" placeholder="请输入可能产生后果"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="可能性：" prop="possibility">
                        <span v-if="type=='info'">{{form.possibility}}</span>
                        <el-input v-else v-model="form.possibility" placeholder="请输入可能性"></el-input>
                    </el-form-item>
                    <el-form-item label="严重性：" prop="seriousness">
                        <span v-if="type=='info'">{{form.seriousness}}</span>
                        <el-input v-else v-model="form.seriousness" placeholder="请输入严重性"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="风险等级：" prop="riskLevel">
                        <span v-if="type=='info'">{{form.riskLevel}}</span>
                        <el-input v-else v-model="form.riskLevel" placeholder="请输入风险等级"></el-input>
                    </el-form-item>
                    <el-form-item label="可接受程度：" prop="acceptability">
                        <span v-if="type=='info'">{{form.acceptability}}</span>
                        <el-input v-else v-model="form.acceptability" placeholder="请输入可接受程度"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="根本原因分析：" prop="causeAnalysis">
                        <span v-if="type=='info'">{{form.causeAnalysis}}</span>
                        <el-input v-else v-model="form.causeAnalysis" :rows="3" type="textarea" placeholder="请输入根本原因分析"></el-input>
                    </el-form-item>

                </div>
                <div class="row_item_row row_item">

                    <el-form-item label="措施：" prop="measures">
                        <span v-if="type=='info'">{{form.measures}}
                         </span>
                        <el-input v-else v-model="form.measures" :rows="3" type="textarea" placeholder="请输入措施"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="剩余可能性：" prop="residualPossibility">
                        <span v-if="type=='info'">{{form.residualPossibility}}</span>
                        <el-input v-else v-model="form.residualPossibility" placeholder="请输入剩余可能性"></el-input>
                    </el-form-item>
                    <el-form-item label="剩余严重性：" prop="residualSeverity">
                        <span v-if="type=='info'">{{form.residualSeverity}}</span>
                        <el-input v-else v-model="form.residualSeverity" placeholder="请输入剩余严重性"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="剩余风险等级：" prop="residualRiskLevel">
                        <span v-if="type=='info'">{{form.residualRiskLevel}}</span>
                        <el-input v-else v-model="form.residualRiskLevel" placeholder="请输入剩余风险等级"></el-input>
                    </el-form-item>
                    <el-form-item label="控制状态：" prop="controlState">
                        <span v-if="type=='info'">{{form.controlState}}</span>
                        <el-select v-else v-model="form.controlState" placeholder="请选择控制状态" clearable>
                            <el-option v-for="(opt,index) in options.commentResults" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                         </el-select>
                    </el-form-item>
                </div>
                <div class="row_custom aRow_custom">
                    <el-form-item label="评定结果：" prop="evaluationResults">
                        <span v-if="type=='info'">{{form.evaluationResults}}</span>

                        <el-select v-else v-model="form.evaluationResults" placeholder="请选择评定结果" clearable>
                             <el-option v-for="(opt,index) in options.controlState" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
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
        name: "add",
        data() {
            const checkNumber = (rule, value, callback) => {
                if(value){
                    let val=value.replace(/^\s+|\s+$/g,"")
                    if(val){
                        request({
                            url:`${this.$ip}/mms-qualification/dangerData/numberExists/${value}`,
                            method: 'get',
                        }).then(response => {
                            console.log(response,10);
                            if (!response.data) {
                                callback();
                            } else {
                                callback("该编号已存");
                            }
                        });
                    }else{
                        this.$set(this.form,'number',null)
                        return callback(new Error('编号不能为空'));

                    }

                }else {
                    return callback(new Error('编号不能为空'));

                }

            };
            return {
                options:{},
                form: {},
                rules: {
                    number: [{ validator:checkNumber,trigger: "blur" }],
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
                        ? "危险数据新增"
                        : this.type == "edit"
                        ? "危险数据编辑"
                        : this.type == "info"
                            ? "危险数据详情"
                            : "";
                if(this.type == "edit" || this.type == "info"){

                      request({
                        url:`${this.$ip}/mms-qualification/dangerData/getById/${this.$route.query.id}`,
                        method: "get",
                    }).then(d => {

                        this.form={...d.data }
                    })
                        .catch(error => {
                            this.$message.error(error);
                        });
                }
            }
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["commentResults", "controlState",]
            }).then(d => {
                     this.options=d.data
            });
        },
        methods: {
            resetForm(){
                if(this.type=='edit'){
                    this.form={id:this.form.id,number:this.form.number};
                }else {
                    this.form={};
                }

            },
            saveQualifications(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                             if(this.type == "add"){
                                url=`${this.$ip}/mms-qualification/dangerData/save`
                             }else {
                                 url=`${this.$ip}/mms-qualification/dangerData/update`
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
            width: 1060px;
            /deep/ .el-form-item__label {
                width: 170px;padding-left: 30px;

            }
            /deep/ .el-form-item__content {
                margin-left: 170px;
            }
            .row_item_row,.row_item{
               /deep/ .el-input{
                    width:600px!important;
                }
            }
            .row_custom{
                /deep/ .el-form-item__content{
                    /*height: 40px;*/
                    width: 357px;
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
                    width: calc(100% - 170px);
                }
            }
        }
    }
</style>
