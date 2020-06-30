<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span>安全绩效明细-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
                <div class="row_custom aRow_custom">
                    <el-form-item label="编号：" :prop="type=='add'?'number':''">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input :disabled="type=='edit'"  v-else type="text"  v-model="form.number" placeholder="请输入编号"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="指标：" prop="quota">
                        <span v-if="type=='info'">{{form.quota}}</span>
                        <el-input v-else v-model="form.quota" type="text"  placeholder="请输入指标"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom aRow_custom">
                    <el-form-item label="指标类型：" prop="quotaType">
                        <span v-if="type=='info'">{{form.quotaType}}</span>
                        <el-select v-else clearable v-model="form.quotaType" placeholder="请选择指标类型">
                            <el-option v-for="(opt,index) in options.indicateType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="监控信息来源：" prop="sources">
                        <span v-if="type=='info'">{{form.sources}}</span>
                        <el-input v-else v-model="form.sources" type="text"  placeholder="请输入监控信息来源"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="计算公式：" prop="formulas">
                        <span v-if="type=='info'">{{form.formulas}}</span>
                        <el-input v-else v-model="form.formulas" type="textarea" :rows="3"  placeholder="请输入计算公式"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="目标值：" prop="targetValue">
                        <span v-if="type=='info'">{{form.targetValue}}</span>
                        <el-input v-else v-model="form.targetValue" placeholder="请输入目标值"></el-input>
                    </el-form-item>
                    <el-form-item label="预警规则：" prop="warningRules">
                        <span v-if="type=='info'">{{form.warningRules}}</span>
                        <el-input  v-else v-model="form.warningRules" placeholder="请输入预警规则"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="内容：" prop="content">
                        <span v-if="type=='info'">{{form.content}}</span>
                        <el-input v-else v-model="form.content" type="textarea" :rows="3"  placeholder="请输入内容"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="责任人/项目：" prop="project">
                        <span v-if="type=='info'">{{form.project}}</span>
                        <el-input v-else v-model="form.project" placeholder="请选择责任人/项目"></el-input>
                    </el-form-item>
                    <el-form-item label="落实情况：" prop="implementation">
                        <span v-if="type=='info'">{{form.implementation}}</span>
                        <el-input v-else v-model="form.implementation" placeholder="请输入落实情况"></el-input>
                    </el-form-item>
                </div>

                <div class="row_custom aRow_custom">
                    <el-form-item label="状态监控：" prop="monitorState">
                        <span v-if="type=='info'">{{form.monitorState}}</span>
                        <el-input v-else   v-model="form.monitorState" placeholder="请输入状态监控">
                          </el-input>
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
            const number = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('编号不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-qualification/securityMeritsDetail/numberExists`,
                        method: 'POST',
                        data:{
                            securityMeritsId: this.$route.query.securityMeritsId,
                            number:value,
                        }
                    }).then(response => {
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该编号已存");
                        }
                    });
                }
            };

            return {
                form: {},
                options: {},
                rules: {
                    number: [{validator:number, trigger: "blur" }],
                    // system: [{ required: true, message: "请输入", trigger: "blur" }],
                 },
                type: "add"
            };
        },

        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["indicateType",]
            }).then(d => {
                this.options=d.data
            });
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "安全绩效明细新增"
                        : this.type == "edit"
                        ? "安全绩效明细编辑"
                        : this.type == "info"
                            ? "安全绩效明细详情"
                            : "";
                if(this.type == "edit" || this.type == "info"){

                    request({
                        url:`${this.$ip}/mms-qualification/securityMeritsDetail/getById/${this.$route.query.id}`,
                        method: "get",
                    }).then(d => {

                        this.form={...d.data,securityMeritsId:this.$route.query.securityMeritsId ,id:this.$route.query.id}
                    })
                        .catch(error => {
                            this.$message.error(error);
                        });
                }else {
                    this.form={securityMeritsId:this.$route.query.securityMeritsId}
                 }
            }
        },
        methods: {
            resetForm(){
                if(this.type=='edit'){
                    this.form={securityMeritsId:this.form.securityMeritsId,number:this.form.number, };
                }else {
                    this.form={};

                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                             if(this.type == "add"){
                                url=`${this.$ip}/mms-qualification/securityMeritsDetail/save`
                             }else {
                                 url=`${this.$ip}/mms-qualification/securityMeritsDetail/update`

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
