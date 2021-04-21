<template>
    <div class="trainManageAdmin">
        <div class="QCenterRight">
            <div class="QHead">
                员工培训结果-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
                 <el-form ref="form" label-position="right" :model="form" :rules="rules" class="demo-form-inline" :inline="true"  >

                    <div class="row_tow">
                        <el-form-item  label="员工名称：" prop="employeeName">
                            <span v-if="type=='info'">{{form.employeeName}}</span>
                            <!--<el-input   v-else v-model="form.employeeName" placeholder="请输入员工名称"></el-input>-->
                        </el-form-item>

                    </div>
                     <div class="row_one">

                        <el-form-item  label="员工编号：" prop="employeeId">
                            <span v-if="type=='info'">{{form.employeeId}}</span>
                            <!--<el-input   v-else v-model="form.employeeId" placeholder="请输入员工编号"></el-input>-->
                        </el-form-item>

                    </div>

                    <div class="row_tow">
                        <el-form-item  label="培训项目：" prop="trainingName">
                            <span v-if="type=='info'">{{form.trainingName}}</span>
                            <!--<el-input   v-else v-model="form.trainingName" placeholder="请输入培训项目"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="类别：" prop="trainingType">
                            <span v-if="type=='info'">{{  form.trainingType }}</span>
                            <!--<el-select filterable   v-else clearable v-model="form.trainingType" placeholder="请选择类别">-->
                                <!--<el-option v-for="(opt,index) in options.trainType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>-->
                            <!--</el-select>-->
                        </el-form-item>
                    </div>
                    <!--<div class="row_one">-->
                        <!--<el-form-item  label="简介：" prop="examName1">-->
                            <!--<span v-if="type=='info'">{{form.examName1}}</span>-->
                            <!--<el-input   v-else v-model="form.examName1" placeholder="请输入简介"></el-input>-->
                        <!--</el-form-item>-->

                    <!--</div>-->
                    <div class="row_tow">
                        <el-form-item  label="开始时间：" prop="startTime">
                            <span v-if="type=='info'">{{  form.startTime?this.$moment(form.startTime).format('YYYY-MM-DD'):'' }}</span>
                            <!--<el-date-picker  v-else v-model="form.startTime" placeholder="请选择开始时间"></el-date-picker>-->
                        </el-form-item>
                        <el-form-item  label="结束时间：" prop="endTime">
                            <span v-if="type=='info'">{{  form.endTime?this.$moment(form.endTime).format('YYYY-MM-DD'):'' }}</span>
                            <!--<el-date-picker  v-else v-model="form.endTime" placeholder="请选择结束时间"></el-date-picker>-->
                        </el-form-item>
                    </div>

                    <div class="row_tow">
                        <el-form-item  label="课时：" prop="classHour">
                            <span v-if="type=='info'">{{form.classHour}}</span>
                            <!--<el-input   v-else v-model="form.classHour" placeholder="请输入课时"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="地点：" prop="trainingPlace">
                            <span v-if="type=='info'">{{form.trainingPlace}}</span>
                            <!--<el-input   v-else v-model="form.trainingPlace" placeholder="请输入地点"></el-input>-->
                        </el-form-item>

                    </div>

                    <div class="row_tow">
                        <el-form-item  label="培训单位：" prop="trainingUnit">
                            <span v-if="type=='info'">{{form.trainingUnit}}</span>
                            <!--<el-input   v-else v-model="form.trainingUnit" placeholder="请输入培训单位"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="讲师：" prop="teacherName">
                            <span v-if="type=='info'">{{form.teacherName}}</span>
                            <!--<el-input   v-else v-model="form.teacherName" placeholder="请输入讲师"></el-input>-->
                        </el-form-item>
                    </div>
                    <div class="row_tow">

                        <el-form-item  label="讲师等级：" prop="teacherLevel">
                            <span v-if="type=='info'">{{form.teacherLevel}}</span>
                            <!--<el-input   v-else v-model="form.teacherLevel" placeholder="请输入讲师等级"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="联系方式：" prop="contactInformation">
                            <span v-if="type=='info'">{{form.contactInformation}}</span>
                            <!--<el-input   v-else v-model="form.contactInformation" placeholder="请输入联系方式"></el-input>-->
                        </el-form-item>
                    </div>
                    <div class="row_tow aOne">

                        <el-form-item  label="对象范围：" prop="personScope">
                            <span v-if="type=='info'">{{form.personScope}}</span>
                            <!--<el-input   v-else v-model="form.personScope" placeholder="请输入对象范围"></el-input>-->
                        </el-form-item>

                    </div>

                    <div class="row_tow">
                        <el-form-item  label="考核成绩：" prop="qualifiedStatus">
                            <span v-if="type=='info'">{{form.qualifiedStatus}}</span>
                            <!--<el-input   v-else v-model="form.qualifiedStatus" placeholder="请输入考核成绩"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="证书编号：" prop="certificateNo">
                            <span v-if="type=='info'">{{form.certificateNo}}</span>
                            <!--<el-input   v-else v-model="form.certificateNo" placeholder="请输入证书编号"></el-input>-->
                        </el-form-item>
                    </div>
                     <div class="row_tow">
                        <el-form-item  label="培训签到：" prop="signStatus">
                            <span v-if="type=='info'">{{form.signStatus}}</span>
                            <!--<el-input   v-else v-model="form.signStatus" placeholder="请输入培训签到"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="培训评价：" prop="appraiseContent">
                            <span v-if="type=='info'">{{form.appraiseContent}}</span>
                            <!--<el-input   v-else v-model="form.appraiseContent" placeholder="请输入培训评价"></el-input>-->
                        </el-form-item>
                    </div> <div class="row_one">
                        <el-form-item  label="备注：" prop="remark">
                            <span v-if="type=='info'">{{form.remark}}</span>
                            <!--<el-input   v-else v-model="form.remark" placeholder="请输入备注"></el-input>-->
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
                form: {fileName1:''},
                options: {},
                rules: {
                },
                type: "add"
            };
        },
        created() {
             if(this.$router.history.current.path == '/trainManageAdminResultsAdd'){
                if (this.$route.query) {
                    this.type = 'info';
                    this.$route.meta.title =
                        this.type == "add"
                            ? "员工培训结果新增"
                            : this.type == "edit"
                            ? "员工培训结果编辑"
                            : this.type == "info"
                                ? "员工培训结果详情"
                                : "";

                    if(this.type!='add'){
                        request({
                            url:`${this.$ip}/mms-training/trainingResult/info/${this.$route.query.id}`,
                            method: "get",
                        }).then(d => {
                            this.form={...d.data }
                        })
                    }
                }
            }
        },
        beforeRouteLeave(to,f,next){
            console.log(to,f,next);
            if(to.path=='/trainManageAdminResults'){
                console.log(this.$router.history.pending,1,1);
                // this.$router.push({path:'/trainManageAdminResults',query:{id:this.$router.history.pending.meta.paramsId}})
                next()
            }else{
                next()
            }
        },
        methods: {
            getFile(file){

            },
            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id,fileName1:'' };
                }else{
                    this.form = { fileName1:''};
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            if(this.form.file){
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
                        }else{
                            this.$message.warning('等待文件上传成功后在提交')
                        }
                    });
                }
            },

        }
    };
</script>
<style scoped lang="scss">
    .trainManageAdmin{
        padding:0 30px;
    }
    .G_form{
        margin-left: calc(50% - 470px);
    }
    .rowT{
       /deep/  .el-form-item__content{
            display: flex;justify-content: left;

           .el-input {
               margin-right: 10px;
               width:150px!important;
           }
        }




    }

</style>
