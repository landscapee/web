<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                工作经历-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
                <div class="row_one">

                    <el-form-item label="工作单位：" prop="unit">
                        <span v-if="type=='info'">{{  form.unit }}</span>
                        <el-input v-else v-model="form.unit" placeholder="请输入工作单位"></el-input>

                    </el-form-item>

                </div>

                <div class="row_tow">
                    <el-form-item  label="起始日期：" prop="startTime">
                        <span v-if="type=='info'">{{ form.startTime?moment(form.startTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker  @focus="focus" :picker-options="pickerOptions" type="date" v-else v-model="form.startTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item  label="结束日期：" prop="endTime">
                        <div style="position:relative;">
                            <span v-if="type=='info'">{{ form.endTime?moment(form.endTime).format('YYYY-MM-DD'):''}}</span>
                            <el-date-picker  @focus="focus1" :picker-options="pickerOptions1"  type="date" v-else v-model="form.endTime" placeholder="请选择时间"></el-date-picker>
                            <span style="position: absolute;left:calc(100% + 15px);width:200px" v-if="type!='info'">不选表示 '至今'</span>

                        </div>

                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item  label="工作类型：" prop="workType">
                        <span v-if="type=='info'">{{  form.workType }}</span>
                        <el-select      v-else   v-model="form.workType" placeholder="请选择工作类型">
                            <el-option v-for="(opt,index) in options.Z_workType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="工作地点：" prop="workPlace">
                        <span v-if="type=='info'">{{form.workPlace}}</span>
                        <el-input v-else v-model="form.workPlace" placeholder="请输入工作地点"></el-input>
                    </el-form-item>


                </div>

                <div class="row_tow">

                    <el-form-item label="职务：" prop="post">
                        <span v-if="type=='info'">{{form.post}}</span>
                        <el-input v-else v-model="form.post" placeholder="请输入职务"></el-input>
                    </el-form-item>
                    <el-form-item label="岗位：" prop="station">
                        <span v-if="type=='info'">{{form.station}}</span>
                        <el-input v-else v-model="form.station" placeholder="请输入岗位"></el-input>
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
                      workType: [{ required:true,message:'请选择', trigger: "blur" }],
                     startTime: [{ required:true,message:'请选择', trigger: "blur" }],
                     // endTime: [{ required:true,message:'请选择', trigger: "blur" }],
                     unit: [{ required:true,message:'请输入工作单位', trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                let arr=this.$route.query.rId.split(',')
                this.$router.currentRoute.matched[2].meta.paramsId={
                    id:arr[0],
                    userId:arr[2],
                    type:arr[1]
                }
                this.$router.currentRoute.matched[2].path='/addPersonDoc/'+arr[1]

                this.$router.currentRoute.matched[2].meta.title=
                    arr[1] == "add"
                        ? "人员档案新增"
                        :  arr[1]== "edit"
                        ? "人员档案编辑"
                        :  arr[1] == "info"
                            ? "人员档案详情"
                            : "";
                let arrpath=this.$route.path.split('/')
                this.type = arrpath[arrpath.length-1];
                if(this.$route.path.substring(1,5)=='info'){
                    this.type='info'
                }
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["Z_workType" ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj

                });
                this.$route.meta.title =
                    this.type == "add"
                        ? "工作经历新增"
                        : this.type == "edit"
                        ? "工作经历编辑"
                        : this.type == "info"
                            ? "工作经历详情":''

                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-qualification/workInf/getById/${this.$route.query.id}`,
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
            inputLength(this)
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
                                url='/workInf/save'
                            }else {
                                url='/workInf/update'
                            }
                            let obj={...this.form}
                            if(!obj.endTime){
                                obj.endTime=null
                            }
                            request({
                                url:`${this.$ip}/mms-qualification${url}`,
                                method: 'post',
                                data:{...obj,userRecordId:this.$route.query.rId.split(',')[0]},
                            }).then((d) => {
                               if(d.code==200){
                                   this.$message.success("保存成功！");
                                   this.$router.go(-1)
                               }
                            })
                              }
                    });
                }
            },
            focus(val){
                let e=new Date(this.form.endTime||new Date())
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
                let d=new Date()
                let s=new Date(this.form.startTime)
                let t=new Date()
                this.pickerOptions1 = {
                    disabledDate(time) {
                        // console.log(1, 8);
                        if (s) {
                            return time.getTime() >= d.getTime() ||time.getTime() <= s.getTime() ;
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
     }
    /deep/ .el-form{
        .el-form-item__label{
            width: 110px!important;

        }
        .el-form-item__content{
            width: calc(100% - 180px);
        }
    }
</style>
