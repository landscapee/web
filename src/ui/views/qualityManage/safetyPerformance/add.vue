<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span style="font-weight: 500">部门月度安全绩效-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
                    <el-form-item label="绩效年月：" prop="year">
                        <span v-if="type=='info'">{{form.yearMonth}}</span>
                        <el-date-picker @change="yearMonthChange" v-else v-model="form.yearMonth" placeholder="请选择绩效年月" type="month">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="部门：" prop="deptName">
                        <span v-if="type=='info'">{{form.deptName}}</span>
                        <el-select clearable v-else v-model="form.deptName" placeholder="请选择部门">
                            <el-option label="sfsd" value="dfd"></el-option>
                        </el-select>
                     </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="批准人：" prop="reviewerName">
                        <span v-if="type=='info'">{{form.reviewerName}}</span>
                        <el-input v-else v-model="form.reviewerName" placeholder="请输入批准人"></el-input>
                    </el-form-item>
                    <el-form-item label="批准日期：" prop="reviewerTime">
                        <span v-if="type=='info'">{{form.reviewerTime?form.reviewerTime.split(' ')[0]:''}}</span>
                         <el-date-picker  v-else v-model="form.reviewerTime" type="date" placeholder="请选择批准日期"></el-date-picker>

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
                form: {
                    year:null,
                    month:null,
                },
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
                        ? "部门月度安全绩效新增"
                        : this.type == "edit"
                        ? "部门月度安全绩效编辑"
                        : this.type == "info"
                            ? "部门月度安全绩效详情"
                            : "";
                if(this.type == "edit" || this.type == "info"){
                    let data=JSON.parse( this.$route.query.data)
                    this.form={...data}
                }
            }
        },
        methods: {
            yearMonthChange(val){
                let date=val
                console.log(date, val);
                this.form.year=val.getFullYear()+''
                this.form.month= val.getMonth()+''
            },
            resetForm(){
                this.form={};
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                             if(this.type == "add"){
                                // url=`${this.$ip}/qualification/securityMerits/save`
                                url=`http://173.100.1.126:3000/mock/639/securityMerits/save`
                            }else {
                                url=`http://173.100.1.126:3000/mock/639/securityMerits/update`
                                // url=`${this.$ip}/qualification/securityMerits/update`
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
