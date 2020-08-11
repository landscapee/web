<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                资质证书清单-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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

                    <el-form-item label="适用业务：" prop="applicableBusiness">
                        <span v-if="type=='info'">{{  form.applicableBusiness }}</span>
                        <el-input v-else v-model="form.applicableBusiness" placeholder="请输入适用业务"></el-input>

                    </el-form-item>
                    <el-form-item label="颁发人：" prop="award">
                        <span v-if="type=='info'">{{  form.award }}</span>
                        <el-input v-else v-model="form.award" placeholder="请输入颁发人"></el-input>

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
                pickerOptions: {},
                pickerOptions1: {},
                moment:moment,
                oldForm:{},
                form: {},
                options: {},
                 rules: {
                      startTime: [{ required:true,message:'请选择', trigger: "blur" }],
                     endTime: [{ required:true,message:'请选择', trigger: "blur" }],
                     applicableBusiness: [{ required:true,message:'请输入适用业务', trigger: "blur" }],
                     award: [{ required:true,message:'请输入颁发人', trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {

                this.type = this.$route.query.type;
               
                this.$route.meta.title =
                    this.type == "add"
                        ? "资质证书清单新增"
                        : this.type == "edit"
                        ? "资质证书清单编辑"
                        : this.type == "info"
                            ? "资质证书清单详情":''

                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-qualification/qualifyDetail/getById/${this.$route.query.id}`,
                         method: "get",
                     }).then(d => {
                         this.form={...d.data }
                     }).catch(error => {
                             this.$message.error(error);
                         });
                 }
            }
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
                                url='/qualifyDetail/save'
                            }else {
                                url='/qualifyDetail/update'
                            }
                            request({
                                url:`${this.$ip}/mms-qualification${url}`,
                                method: 'post',
                                data:{...this.form,qualifyId:this.$route.query.lId},
                            }).then((data) => {
                                this.$message.success("保存成功！");
                                this.$router.go(-1)
                            })
                              }
                    });
                }
            },
            focus(val){
                let e=this.form.endTime?new Date(this.form.endTime):''
                let s=this.form.startTime?new Date(this.form.startTime):''
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
                let e=this.form.endTime?new Date(this.form.endTime):''
                let s=this.form.startTime?new Date(this.form.startTime):''
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
