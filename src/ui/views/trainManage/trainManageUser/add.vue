<template>
    <div class="trainManageAdmin">
        <div class="QCenterRight">
            <div class="QHead">
                 培训管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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

        <div :class=" type=='info'?'G_form G_formInfo':'G_form  '"  >
                 <el-form ref="form" label-position="right" :model="form" :rules="rules" class="demo-form-inline" :line="true"  >
                    <div class="row_tow">
                        <el-form-item  label="培训项目：" prop="examName">
                            <span v-if="type=='info'">{{form.examName}}</span>
                            <!--<el-input   v-else v-model="form.examName" placeholder="请输入培训项目"></el-input>-->
                        </el-form-item>

                        <el-form-item  label="类别：" prop="paperName">
                            <span v-if="type=='info'">{{  form.paperName }}</span>
                            <!--<el-select filterable   v-else clearable v-model="form.paperName" placeholder="请选择类别">-->
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
                        <el-form-item  label="课时：" prop="e1xamName">
                            <span v-if="type=='info'">{{form.e1xamName}}</span>
                            <!--<el-input   v-else v-model="form.e1xamName" placeholder="请输入课时"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="地点：" prop="examName1">
                            <span v-if="type=='info'">{{form.examName1}}</span>
                            <!--<el-input   v-else v-model="form.examName1" placeholder="请输入地点"></el-input>-->
                        </el-form-item>
                    </div>

                    <div class="row_tow">
                        <el-form-item  label="培训单位：" prop="examName1">
                            <span v-if="type=='info'">{{form.examName1}}</span>
                            <!--<el-input   v-else v-model="form.examName1" placeholder="请输入培训单位"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="讲师：" prop="e1xamName">
                            <span v-if="type=='info'">{{form.e1xamName}}</span>
                            <!--<el-input   v-else v-model="form.e1xamName" placeholder="请输入讲师"></el-input>-->
                        </el-form-item>
                    </div>
                    <div class="row_tow">

                        <el-form-item  label="讲师等级：" prop="exam11Name">
                            <span v-if="type=='info'">{{form.exam11Name}}</span>
                            <!--<el-input   v-else v-model="form.exam11Name" placeholder="请输入讲师等级"></el-input>-->
                        </el-form-item>
                        <el-form-item  label="联系方式：" prop="e1xamName">
                            <span v-if="type=='info'">{{form.e1xamName}}</span>
                            <!--<el-input   v-else v-model="form.e1xamName" placeholder="请输入联系方式"></el-input>-->
                        </el-form-item>
                    </div>
                    <div class="row_tow">
                        <el-form-item  label="对象范围：" prop="exam11Name">
                            <span v-if="type=='info'">{{form.exam11Name}}</span>
                            <!--<el-input   v-else v-model="form.exam11Name" placeholder="请输入对象范围"></el-input>-->
                        </el-form-item>
                    </div>
                     <div class="row_tow">
                         <el-form-item  label="考核成绩：" prop="examName1">
                             <span v-if="type=='info'">{{form.examName1}}</span>
                             <!--<el-input   v-else v-model="form.examName1" placeholder="请输入考核成绩"></el-input>-->
                         </el-form-item>
                         <el-form-item  label="证书编号：" prop="examName1">
                             <span v-if="type=='info'">{{form.examName1}}</span>
                             <!--<el-input   v-else v-model="form.examName1" placeholder="请输入证书编号"></el-input>-->
                         </el-form-item>
                     </div>
                     <div class="row_tow">
                         <el-form-item  label="培训签到：" prop="examName1">
                             <span v-if="type=='info'">{{form.examName1}}</span>
                             <!--<el-input   v-else v-model="form.examName1" placeholder="请输入培训签到"></el-input>-->
                         </el-form-item>
                         <el-form-item  label="培训评价：" prop="examName1">
                             <span v-if="type=='info'">{{form.examName1}}</span>
                             <!--<el-input   v-else v-model="form.examName1" placeholder="请输入培训评价"></el-input>-->
                         </el-form-item>
                     </div>
                     <div class="row_one">
                     <el-form-item  label="备注：" prop="examName1">
                         <span v-if="type=='info'">{{form.examName1}}</span>
                         <!--<el-input   v-else v-model="form.examName1" placeholder="请输入备注"></el-input>-->
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
                    infSources: [{ required:true,message:'sfsdfs', trigger: "blur" }],
                    paperId: [{ required:true,message:'请选择', trigger: "blur" }],
                    examMode: [{ required:true,message:'请选择', trigger: "blur" }],
                    examName: [{ required:true,message:'请输入课件编号', trigger: "blur" }],
                    examName1: [{ required:true,message:'请输入课件名称', trigger: "blur" }],
                    totalTime: [
                        { required:true,message:'请输入', trigger: "blur" },
                       ],
                },
                type: "add"
            };
        },
        created() {
            if(this.$router.history.current.path == '/trainManageUserAdd'){
                if (this.$route.query) {
                    this.type = this.$route.query.type;
                    request({
                        url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                        method: 'post',
                        params:{delete:false},
                        data:['trainType' ]
                    }).then(d => {
                        let obj=d.data
                        this.options=obj

                    });
                    this.$route.meta.title =
                        this.type == "add"
                            ? "培训管理新增"
                            : this.type == "edit"
                            ? "培训管理编辑"
                            : this.type == "info"
                                ? "培训管理详情"
                                : "";

                    if(this.type!='add'){
                        request({
                            url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                            method: "get",
                        }).then(d => {
                            this.form={...d.data }
                        })
                    }
                }
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
