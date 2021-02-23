<template>
    <div class=" ">
        <div class="QCenterRight">
            <div class="QHead">
                 安全信息-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" class="demo-form-inline" :inline="true">
                <div></div>
                <div class="row_one">
                    <el-form-item label="信息编号："  :prop="type=='edit'?'':'infNumber'">
                        <span v-if="type=='info'">{{form.infNumber}}</span>
                        <el-input :disabled="type=='edit'" v-else v-model="form.infNumber" placeholder="请输入信息编号"></el-input>
                    </el-form-item>

                </div>
                <div class="row_one">
                    <el-form-item label="信息描述：" prop="infRemark">
                        <span v-if="type=='info'">{{form.infRemark}}</span>
                        <el-input v-else v-model="form.infRemark" type="textarea" :rows="3" placeholder="请输入信息描述"></el-input>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item label="信息来源：" prop="infSources">
                        <span v-if="type=='info'">{{form.infSources}}</span>
                        <el-input v-else v-model="form.infSources" placeholder="请输入信息来源"></el-input>
                    </el-form-item>

                    <el-form-item label="日期：" prop="infDate">
                        <span v-if="type=='info'">{{  form.infDate? moment(form.infDate).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker  v-else v-model="form.infDate" placeholder="请选择日期"></el-date-picker>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item label="班组名称：" prop="teamName">
                        <span v-if="type=='info'">{{form.teamName}}</span>
                        <el-input v-else v-model="form.teamName" placeholder="请输入班组名称"></el-input>
                    </el-form-item>

                    <el-form-item label="时间：" prop="infTime">
                        <span v-if="type=='info'">{{  form.infTime? moment(form.infTime).format('HH:mm:ss'):''}}</span>
                        <el-time-picker
                                v-else v-model="form.infTime"
                                placeholder="请选择时间">
                        </el-time-picker>
                     </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item label="机位号：" prop="seat">
                        <span v-if="type=='info'">{{form.seat}}</span>
                        <el-input v-else v-model="form.seat" placeholder="请输入机位"></el-input>
                    </el-form-item>
                    <el-form-item label="原因分类：" prop="reasonType">
                        <span v-if="type=='info'">{{form.reasonType}}</span>
                        <el-input v-else v-model="form.reasonType" placeholder="请输入原因分类"></el-input>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item label="是否重复违规：" prop="repeatedViolations">
                        <span v-if="type=='info'">{{form.repeatedViolations?'是':'否'}}</span>
                        <el-select clearable v-else v-model="form.repeatedViolations" placeholder="请选择">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                     </el-form-item>
                    <el-form-item label="是否核心风险：" prop="coreRisk">
                        <span v-if="type=='info'">{{form.coreRisk?'是':'否'}}</span>
                        <el-select clearable v-else v-model="form.coreRisk" placeholder="请选择">
                            <el-option label="是" :value="true"></el-option>
                            <el-option label="否" :value="false"></el-option>
                        </el-select>
                     </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item label="地点：" prop="place">
                        <span v-if="type=='info'">{{form.place}}</span>
                        <el-input v-else v-model="form.place" placeholder="请输入地点"></el-input>
                    </el-form-item>
                    <el-form-item label="负责人/单位：" prop="responsibleUnit">
                        <span v-if="type=='info'">{{form.responsibleUnit}}</span>
                        <el-input v-else v-model="form.responsibleUnit" placeholder="请输入负责人/单位"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item label="所属系统：" prop="deptName">
                        <span v-if="type=='info'">{{form.deptName}}</span>
                        <el-input v-else v-model="form.deptName" placeholder="请输入所属系统"></el-input>
                    </el-form-item>
                    <el-form-item label="违规/差错：" prop="situation">
                        <span v-if="type=='info'">{{form.situation}}</span>
                         <el-select v-else clearable v-model="form.situation" placeholder="请选择违规/差错">
                             <el-option v-for="(opt,index) in options.Q_BadMistake" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                         </el-select>
                    </el-form-item>
                </div>
                <div class="row_one">

                    <el-form-item label="原因分析：" prop="reason">
                        <span v-if="type=='info'">{{form.reason}}</span>
                        <el-input v-else v-model="form.reason" :rows="3" type="textarea"   placeholder="请输入原因分析"></el-input>
                    </el-form-item>
                </div>
                <div class="row_one">

                    <el-form-item label="整改措施：" prop="measures">
                        <span v-if="type=='info'">{{form.measures}}</span>
                        <el-input v-else v-model="form.measures" :rows="3" type="textarea" placeholder="请输入整改措施"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">


                    <el-form-item label="控制状态：" prop="controlState">
                        <span v-if="type=='info'">{{form.controlState}}</span>
                        <el-input v-else v-model="form.controlState" placeholder="请输入控制状态"></el-input>
                    </el-form-item>
                    <el-form-item label="工作环节：" prop="workLink">
                        <span v-if="type=='info'">{{form.workLink}}</span>
                        <el-input v-else v-model="form.workLink" placeholder="请输入工作环节"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">

                    <el-form-item label="关键词：" prop="keyWord">
                        <span v-if="type=='info'">{{form.keyWord}}</span>
                        <el-input v-else v-model="form.keyWord" placeholder="请输入关键词"></el-input>
                    </el-form-item>
                    <el-form-item label="是否安全/服务事件：" class="itemLineHeight" prop="serviceEvents">
                        <span v-if="type=='info'">{{form.serviceEvents}}</span>
                        <el-select clearable v-else v-model="form.serviceEvents" placeholder="请选择是否安全/服务事件">
                            <el-option v-for="(opt,index) in options.Q_securityServices" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                </div>

                <div class="row_one">
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
    import {eleDateShow,inputLength} from '@lib/tools'

    import moment from 'moment'

    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend } from "lodash";
    export default {
        components: {
            Icon
        },
        name: "",
        data() {
            const checkInfNumber = (rule, value, callback) => {
                if (!value) {
                     return callback(new Error('信息编号不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-qualification/securityInformation/infNumberExists/${value}`,
                        method: 'get',
                    }).then(response => {
                        console.log(response,10);
                        if (!response.data) {

                            callback();
                        } else {
                            callback("该信息编号已存在");
                        }
                    });
                }
            };
            return {
                options: {},
                moment: moment,
                form: {},
                rules: {
                    infNumber: [{ validator:checkInfNumber, trigger: "blur",required:true }],
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

                    request({
                        url:`${this.$ip}/mms-qualification/securityInformation/getById/${this.$route.query.id}`,
                        method: "get",
                    }).then(d => {

                        this.form={...d.data }
                    })

                }
            }
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["Q_BadMistake", "Q_securityServices",]
            }).then(d => {
                this.options=d.data
            });
        },
        mounted(){
            eleDateShow()
              inputLength(this)

        },
        methods: {
            resetForm(){
                if(this.type=='edit'){
                    // this.form={id:this.form.id,infNumber:this.form.infNumber};
                    for (let key in this.form) {
                        if (key !== 'id'&&key!=='infNumber') {
                            if (typeof(this.form[key]) ==='string'){
                                this.form[key] = "";
                            } else if (typeof(this.form[key]) ==='number'){
                                this.form[key] = null;
                            }
                        }
                    }
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
                                url=`${this.$ip}/mms-qualification/securityInformation/save`
                                // url=`http://173.100.1.126:3000/mock/639/securityInformation/save`
                            }else {
                                // url=`http://173.100.1.126:3000/mock/639/securityInformation/update`
                                url=`${this.$ip}/mms-qualification/securityInformation/update`

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
    /deep/ .el-form{
        .itemLineHeight{
            .el-form-item__label{
                 line-height: 20px;

            }
        }
        .el-form-item__label{
            width: 140px!important;
        }
        .el-form-item__content{
            width: calc(100% - 140px);
            margin: 0!important;
        }
    }
</style>
