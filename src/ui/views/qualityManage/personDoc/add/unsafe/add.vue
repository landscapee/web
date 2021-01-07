<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                不安全事件及诚信记录-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form  label-position="right" :model="form" :rules="rules" :inline="true" ref="form" >
                <div></div>
                <div class="row_tow">

                    <el-form-item label="事件性质：" prop="nature">
                        <span v-if="type=='info'">{{  form.nature }}</span>
                        <el-input v-else v-model="form.nature" placeholder="请输入事件性质"></el-input>

                    </el-form-item>
                    <el-form-item  label="时间：" prop="occurTime">
                        <span v-if="type=='info'">{{ form.occurTime?moment(form.occurTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker   type="date" v-else v-model="form.occurTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>

                </div>
                <div class="row_tow itemTS">
                    <el-form-item  label="类型：" prop="type">
                        <span v-if="type=='info'">{{form.type}}</span>
                        <el-select  v-else clearable v-model="form.type" placeholder="请选择类型">
                            <el-option v-for="(opt,index) in options.unsafeType" :key="index" :label="opt.valData" :value="opt.valCode"> </el-option>

                        </el-select>
                    </el-form-item>
                    <el-form-item  label="质量经理签字确认时间：" prop="confirmTime">
                        <span v-if="type=='info'">{{ form.confirmTime?moment(form.confirmTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker    type="date" v-else v-model="form.confirmTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>

                </div>

                <div class="row_tow">
                    <el-form-item  label="地点 ：" prop="place">
                        <span v-if="type=='info'">{{  form.place }}</span>
                        <el-input v-else v-model="form.place"  placeholder="请输入地点"></el-input>

                    </el-form-item>
                    <el-form-item label="涉及人员：" prop="involvePerson">
                        <span v-if="type=='info'">{{form.involvePerson}}</span>
                        <el-input v-else v-model="form.involvePerson" placeholder="请输入涉及人员"></el-input>
                    </el-form-item>
                </div>
                <div class="row_one">
                    <el-form-item  label="事件经过 ：" prop="courseEvents">
                        <span v-if="type=='info'">{{  form.courseEvents }}</span>
                        <el-input v-else  type="textarea" :rows="3" v-model="form.courseEvents"  placeholder="请输入事件经过"></el-input>
                    </el-form-item>

                </div>
                <div class="row_one">
                    <el-form-item  label="后果 ：" prop="result">
                        <span v-if="type=='info'">{{  form.result }}</span>
                        <el-input v-else  type="textarea" :rows="3" v-model="form.result"  placeholder="请输入后果"></el-input>
                    </el-form-item>

                </div>
                <div class="row_one">
                    <el-form-item  label="调查结论 ：" prop="conclusion">
                        <span v-if="type=='info'">{{  form.conclusion }}</span>
                        <el-input v-else  type="textarea" :rows="3" v-model="form.conclusion"  placeholder="请输入调查结论"></el-input>
                    </el-form-item>

                </div>




            </el-form>
        </div>
    </div>
</template>
<script>
    import {eleDateShow,inputLength} from '@lib/tools'
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
                pickerOptions: {},
                pickerOptions1: {},
                 moment:moment,
                oldForm:{},
                form: {},
                options: {},
                 rules: {
                     occurTime: [{ required:true,message:'请选择时间', trigger: "blur" }],
                     type: [{ required:true,message:'请选择类型', trigger: "blur" }],
                     nature: [{ required:true,message:'请输入事件性质', trigger: "blur" }],
                     place: [{ required:true,message:'请输入地点', trigger: "blur" }],
                     involvePerson: [{ required:true,message:'请输入涉及人员', trigger: "blur" }],
                     // confirmTime: [{ required:true,message:'请选择时间', trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                this.$router.currentRoute.matched[2].meta.paramsId={
                    id:this.$route.query.rId.split(',')[0],
                    userId:this.$route.query.rId.split(',')[2],
                    type:this.$route.query.rId.split(',')[1]}
                this.$router.currentRoute.matched[2].meta.title=
                    this.$route.query.rId.split(',')[1] == "add"
                        ? "人员档案新增"
                        :  this.$route.query.rId.split(',')[1]== "edit"
                        ? "人员档案编辑"
                        :  this.$route.query.rId.split(',')[1] == "info"
                            ? "人员档案详情"
                            : "";
                this.type = this.$route.query.type;
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["unsafeType" ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj
                });
                this.$route.meta.title =
                    this.type == "add"
                        ? "不安全事件及诚信记录新增"
                        : this.type == "edit"
                        ? "不安全事件及诚信记录编辑"
                        : this.type == "info"
                            ? "不安全事件及诚信记录详情":''

                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-qualification/sincerityInf/getById/${this.$route.query.id}`,
                         method: "get",
                     }).then(d => {

                         this.form={...d.data }
                     }).catch(error => {
                             this.$message.error(error);
                         });

                 }
            }



        },
        mounted(){
            eleDateShow()
            inputLength(this)
        },
        destroyed(){

        },
        methods: {

            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id };
                }else{
                    this.form = { };
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                            if(this.type=='add'){
                                url='/sincerityInf/save'
                            }else {
                                url='/sincerityInf/update'
                            }
                            request({
                                url:`${this.$ip}/mms-qualification${url}`,
                                method: 'post',
                                data:{...this.form,userRecordId:this.$route.query.rId.split(',')[0]},
                            }).then((data) => {
                                this.$message.success("保存成功！");
                                this.$router.go(-1)
                            })
                              }
                    });
                }
            },
            focus(val){
                let e=new Date(this.form.endTime)
                let s=new Date(this.form.startTime)
                let t=new Date()

                this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() >= e.getTime();
                            // return time.getTime() > e.getTime()||time.getTime() > t.getTime();
                        }
                    },
                };
            } ,
            focus1(val){
                let e=new Date(this.form.endTime)
                let s=new Date(this.form.startTime)
                let t=new Date()
                this.pickerOptions1 = {
                    disabledDate(time) {
                        // console.log(1, 8);
                        if (s) {
                            return time.getTime() <= s.getTime() ;
                            // return time.getTime() < s.getTime()|| time.getTime() > t.getTime() ;
                        }
                    },
                };
            },
        }
    };
</script>
<style scoped lang="scss">
    .indexAdd{
        padding: 0 30px;
        .itemTS{
            /deep/ .el-form-item:nth-child(2){
                .el-form-item__label{
                    /*padding-left: px;*/
                    line-height: 20px;
                }
            }
        }
     }
    /deep/ .el-form{
        .el-form-item__label{
            width: 130px!important;

        }
        .el-form-item__content{
            width: calc(100% - 180px);
        }
    }
</style>
