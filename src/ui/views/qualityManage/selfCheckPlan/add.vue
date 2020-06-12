<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span>法定自查检查计划-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
                    <el-form-item label="计划年度：" prop="year">
                        <span v-if="type=='info'">{{form.year}}</span>
                        <el-input v-else v-model="form.year" placeholder="请输入计划年度"></el-input>
                    </el-form-item>
                    <el-form-item label="计划部门：" prop="dept_name">
                        <span v-if="type=='info'">{{form.dept_name}}</span>
                        <el-select clearable v-else v-model="form.dept_name" placeholder="请选择计划部门">
                            <el-option label="sfsd" value="dfd"></el-option>
                        </el-select>
                     </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="审批人：" prop="reviewer_name">
                        <span v-if="type=='info'">{{form.reviewer_name}}</span>
                        <el-input v-else v-model="form.reviewer_name" placeholder="请输入审批人"></el-input>
                    </el-form-item>
                    <el-form-item label="审批日期：" prop="reviewer_time">
                        <span v-if="type=='info'">{{form.reviewer_time?form.reviewer_time.split(' ')[0]:''}}</span>
                         <el-date-picker  v-else v-model="form.reviewer_time" placeholder="请选择审批日期"></el-date-picker>

                    </el-form-item>
                </div>
                <div class="row_custom aRow_custom">
                    <el-form-item label="计划版本：" prop="version">
                        <span v-if="type=='info'">{{form.version}}</span>
                        <el-input v-else v-model="form.version" placeholder="请输入计划版本"></el-input>
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
            return {
                form: {},
                rules: {
                    // infNumber: [{ required: true, message: "请输入信息编号", trigger: "blur" }],
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
                        ? "法定自查检查计划新增"
                        : this.type == "edit"
                        ? "法定自查检查计划编辑"
                        : this.type == "info"
                            ? "法定自查检查计划详情"
                            : "";
                if(this.type == "edit" || this.type == "info"){
                    let data=JSON.parse( this.$route.query.data)
                    this.form={...data}
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
                                // url=`${this.$ip}/securityInformation/save`
                                url=`http://173.100.1.126:3000/mock/639/securityInformation/save`
                            }else {
                                url=`http://173.100.1.126:3000/mock/639/securityInformation/update`
                                // url=`${this.$ip}/securityInformation/update`
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
