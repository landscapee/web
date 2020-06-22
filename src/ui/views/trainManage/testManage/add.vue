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
                    <el-form-item label="考试名称：" prop="infSources">
                        <span v-if="type=='info'">{{form.infSources}}</span>
                        <el-input v-else v-model="form.infSources" placeholder="请输入考试名称"></el-input>
                    </el-form-item>
                    <el-form-item label="考试方式：" prop="infTime">
                        <span v-if="type=='info'">{{  form.infTime }}</span>
                        <el-select  v-else clearable v-model="form.infTime" placeholder="请选择考试方式">
                            <el-option label="线上" value="线上"> </el-option>
                            <el-option label="线下" value="线下"> </el-option>
                        </el-select>
                    </el-form-item>

                </div>

                <div class="row_custom">
                    <el-form-item :label="form.infTime=='线上'?'截止时间：':'举行时间：'" prop="place">
                        <span v-if="type=='info'">{{form.place}}</span>
                        <el-date-picker type="date" v-else v-model="form.place" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="考试地点：" prop="responsibleUnit">
                        <span v-if="type=='info'">{{form.responsibleUnit}}</span>
                        <el-input v-else v-model="form.responsibleUnit" placeholder="请输入考试地点"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="考试试卷：" prop="infTime1">
                        <span v-if="type=='info'">{{  form.infTime1 }}</span>
                        <el-select  v-else clearable v-model="form.infTime1" placeholder="请选择考试试卷">
                            <el-option label="试卷一" value="试卷一"> </el-option>
                            <el-option label="试卷二" value="试卷二"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考试时长：" prop="situation">
                        <span v-if="type=='info'">{{form.situation}}</span>
                        <el-input v-else v-model="form.situation" placeholder="请输入考试时长"></el-input>&nbsp;&nbsp;分
                    </el-form-item>
                </div>

                <div class="row_custom">

                    <el-form-item label="考试类型：" prop="infTime1">
                        <span v-if="type=='info'">{{  form.infTime1 }}</span>
                        <el-select  v-else clearable v-model="form.infTime1" placeholder="请选择考试类型">
                            <el-option label="开卷" value="开卷"> </el-option>
                            <el-option label="闭卷" value="闭卷"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="资质类型：" prop="infTime1">
                        <span v-if="type=='info'">{{  form.infTime1 }}</span>
                        <el-select  v-else clearable v-model="form.infTime1" placeholder="请选择资质类型">
                            <el-option label="桥载" value="桥载"> </el-option>
                            <el-option label="勤务" value="勤务"> </el-option>
                            <el-option label="维修" value="维修"> </el-option>
                            <el-option label="质量" value="质量"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="业务类型：" prop="infTime1">
                        <span v-if="type=='info'">{{  form.infTime1 }}</span>
                        <el-select  v-else clearable v-model="form.infTime1" placeholder="请选择业务类型">
                            <el-option label="桥载" value="桥载"> </el-option>
                            <el-option label="勤务" value="勤务"> </el-option>
                            <el-option label="维修" value="维修"> </el-option>
                            <el-option label="质量" value="质量"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="考题下载：" prop="infTime1">
                        <span v-if="type=='info'">{{  form.infTime1 }}</span>
                        <el-select  v-else clearable v-model="form.infTime1" placeholder="请选择考题下载">
                            <el-option label="允许" value="允许"> </el-option>
                            <el-option label="禁止" value="禁止"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_custom aRow_custom">
                    <el-form-item label="考试状态：" prop="quotaType">
                        <span v-if="type=='info'">{{form.quotaType}}</span>
                        <el-select v-else clearable v-model="form.quotaType" placeholder="请选择考试状态">
                            <el-option label="已推送" value="违规"> </el-option>
                            <el-option label="已开始" value="违规"> </el-option>
                            <el-option label="已评价" value="违规"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="考试简介：" prop="formulas">
                        <span v-if="type=='info'">{{form.formulas}}</span>
                        <el-input v-else v-model="form.formulas" type="textarea" :rows="3"  placeholder="请输入考试简介"></el-input>
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
            const infSources = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('试题序号不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-qualification/securityInformation/infNumberExists/${value}`,
                        method: 'get',
                    }).then(response => {
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该试题序号已存");
                        }
                    });
                }
            };

            return {
                oldForm:{},
                form: {infTime:'单选'},
                rules: {
                    infSources: [{ validator:infSources, trigger: "blur" }],

                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "考试管理新增"
                        : this.type == "edit"
                        ? "考试管理编辑"
                        : this.type == "info"
                            ? "考试管理详情"
                            : "";
                 if(this.type!='add'){
                    let row=JSON.parse( this.$route.query.row)
                    this.form={...row}
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
