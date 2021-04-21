<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                证书-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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

                    <el-form-item label="证书名称：" prop="name">
                        <span v-if="type=='info'">{{  form.name }}</span>
                        <el-input v-else v-model="form.name" placeholder="请输入证书名称"></el-input>

                    </el-form-item>
                    <el-form-item label="证书编号：" prop="number">
                        <span v-if="type=='info'">{{  form.number }}</span>
                        <el-input v-else v-model="form.number" placeholder="请输入证书编号"></el-input>

                    </el-form-item>

                </div>

                <div class="row_tow">
                    <el-form-item  label="颁发日期：" prop="startTime">
                        <span v-if="type=='info'">{{ form.startTime?moment(form.startTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker  @focus="focus" :picker-options="pickerOptions" type="date" v-else v-model="form.startTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item  label="作废日期：" prop="endTime">
                        <span v-if="type=='info'">{{ form.endTime?moment(form.endTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker @focus="focus1" :picker-options="pickerOptions1" type="date" v-else v-model="form.endTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item  label="证书类型：" prop="type">
                        <span v-if="type=='info'">{{  form.type }}</span>
                        <el-input v-else v-model="form.type" placeholder="请输入证书类型"></el-input>

                    </el-form-item>
                    <el-form-item label="专业：" prop="major">
                        <span v-if="type=='info'">{{form.major}}</span>
                        <el-input v-else v-model="form.major" placeholder="请输入专业"></el-input>
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
                      startTime: [{ required:true,message:'请选择', trigger: "blur" }],
                     endTime: [{ required:true,message:'请选择', trigger: "blur" }],
                     name: [{ required:true,message:'请输入证书名称', trigger: "blur" }],
                     number: [{ required:true,message:'请输入证书编号', trigger: "blur" }],
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
                if(this.$router.currentRoute.matched[2].path=='/addPersonDoc/:id'){
                    this.$router.currentRoute.matched[2].path='/addPersonDoc/'+arr[1]
                }
                this.$router.currentRoute.matched[2].meta.title=
                    this.$route.query.rId.split(',')[1] == "add"
                        ? "人员档案新增"
                        :  this.$route.query.rId.split(',')[1]== "edit"
                        ? "人员档案编辑"
                        :  this.$route.query.rId.split(',')[1] == "info"
                            ? "人员档案详情"
                            : "";
                let arrpath=this.$route.path.split('/')
                this.type = arrpath[arrpath.length-1];
                if(this.$route.path.substring(1,5)=='info'||this.$route.path.match(/[Z|S].*/) ){
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
                        ? "证书新增"
                        : this.type == "edit"
                        ? "证书编辑"
                        : this.type == "info"
                            ? "证书详情":''

                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-qualification/certificateInf/getById/${this.$route.query.id}`,
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
                                url='/certificateInf/save'
                            }else {
                                url='/certificateInf/update'
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
                let e=new Date(this.form.endTime ||new Date())
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
                let e=new Date(this.form.endTime )
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
