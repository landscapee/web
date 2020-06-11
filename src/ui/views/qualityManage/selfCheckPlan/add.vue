<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span>安全信息-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
                    <el-form-item label="信息编号：" prop="infNumber">
                        <span v-if="type=='info'">{{form.infNumber}}</span>
                        <el-input v-else v-model="form.infNumber" placeholder="请输入信息编号"></el-input>
                    </el-form-item>

                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="信息描述：" prop="infRemark">
                        <span v-if="type=='info'">{{form.infRemark}}</span>
                        <el-input v-else v-model="form.infRemark" type="textarea" :rows="3" placeholder="请输入信息描述"></el-input>
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="信息来源：" prop="infSources">
                        <span v-if="type=='info'">{{form.infSources}}</span>
                        <el-input v-else v-model="form.infSources" placeholder="请输入信息来源"></el-input>
                    </el-form-item>
                    <el-form-item label="时间：" prop="infTime">
                        <span v-if="type=='info'">{{form.infTime}}</span>
                        <el-date-picker  v-else v-model="form.infTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="地点：" prop="place">
                        <span v-if="type=='info'">{{form.place}}</span>
                        <el-input v-else v-model="form.place" placeholder="请输入地点"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人/单位：" prop="responsibleUnit">
                        <span v-if="type=='info'">{{form.responsibleUnit}}</span>
                        <el-input v-else v-model="form.responsibleUnit" placeholder="请输入负责人/单位"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="所属系统：" prop="deptName">
                        <span v-if="type=='info'">{{form.deptName}}</span>
                        <el-input v-else v-model="form.deptName" placeholder="请输入所属系统"></el-input>
                    </el-form-item>
                    <el-form-item label="违规/差错：" prop="situation">
                        <span v-if="type=='info'">{{form.situation}}</span>
                         <el-select v-else v-model="form.situation" placeholder="请选择违规/差错">
                            <el-option label="违规" value="违规"> </el-option>
                            <el-option label="差错" value="差错"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">

                    <el-form-item label="原因分析：" prop="reason">
                        <span v-if="type=='info'">{{form.reason}}</span>
                        <el-input v-else v-model="form.reason" :rows="3" type="textarea"   placeholder="请输入原因分析"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">

                    <el-form-item label="整改措施：" prop="measures">
                        <span v-if="type=='info'">{{form.measures}}</span>
                        <el-input v-else v-model="form.measures" :rows="3" type="textarea" placeholder="请输入整改措施"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">


                    <el-form-item label="控制状态：" prop="controlSate">
                        <span v-if="type=='info'">{{form.controlSate}}</span>
                        <el-input v-else v-model="form.controlSate" placeholder="请输入控制状态"></el-input>
                    </el-form-item>
                    <el-form-item label="工作环节：" prop="workLink">
                        <span v-if="type=='info'">{{form.workLink}}</span>
                        <el-input v-else v-model="form.workLink" placeholder="请输入工作环节"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">

                    <el-form-item label="关键词：" prop="keyWord">
                        <span v-if="type=='info'">{{form.keyWord}}</span>
                        <el-input v-else v-model="form.keyWord" placeholder="请输入关键词"></el-input>
                    </el-form-item>
                    <el-form-item label="是否安全/服务事件：" prop="serviceEvents">
                        <span v-if="type=='info'">{{form.serviceEvents}}</span>
                        <el-select v-else v-model="form.serviceEvents" placeholder="请选择是否安全/服务事件">
                            <el-option label="违规" value="违规"> </el-option>
                            <el-option label="差错" value="差错"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>

                <div class="row_item_row row_item">
                    <el-form-item label="备注：" prop="remark">
                        <span v-if="type=='info'">{{form.remark}}</span>
                        <el-input v-else v-model="form.remark" :rows="3" type="textarea" placeholder="请输入备注"></el-input>
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
                    infNumber: [{ required: true, message: "请输入信息编号", trigger: "blur" }],
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
                        ? "安全信息新增"
                        : this.type == "edit"
                        ? "安全信息编辑"
                        : this.type == "info"
                            ? "安全信息详情"
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
