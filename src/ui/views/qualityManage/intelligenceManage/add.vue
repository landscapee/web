<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                资质证书-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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

                    <el-form-item label="员工姓名：" prop="userName">
                        <span v-if="type=='info'">{{  form.userName }}</span>
                         <el-select  :disabled="type=='edit'" @change="userNumberC" filterable v-else v-model="form.userNumber" placeholder="请选择员工姓名">
                            <el-option v-for="(opt,index) in userArr" :key="index" :label="opt.userName" :value="opt.userNumber">
                                <span>{{opt.userName}}-{{opt.userNumber}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工编号："  >
                        <span v-if="type=='info'">{{  form.userNumber }}</span>
                        <el-input :disabled="true" v-else v-model="form.userNumber" placeholder="请选择员工姓名"></el-input>
                    </el-form-item>

                </div>

                <div class="row_tow">
                    <el-form-item  label="证书名称：" prop="name">
                        <span v-if="type=='info'">{{  form.name }}</span>
                        <el-input v-else v-model="form.name" placeholder="请输入证书名称"></el-input>

                    </el-form-item>
                    <el-form-item label="证书编号：" prop="number">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else v-model="form.number" placeholder="请输入证书编号"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="专业代码：" prop="majorCode">
                        <span v-if="type=='info'">{{  form.majorCode }}</span>
                        <el-input v-else v-model="form.majorCode" placeholder="请输入专业代码"></el-input>

                    </el-form-item>
                    <el-form-item label="资质名称：" prop="certificateName">
                        <span v-if="type=='info'">{{form.certificateName}}</span>
                        <el-input v-else v-model="form.certificateName" placeholder="请输入资质名称"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="资质类型：" prop="certificateType">
                        <span v-if="type=='info'">{{  form.certificateType }}</span>
                         <el-select   filterable v-else v-model="form.certificateType" placeholder="请选择资质类型">
                            <el-option v-for="(opt,index) in options.Z_aptitudeType" :key="index" :label="opt.valData" :value="opt.valData">
                             </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="颁发单位：" prop="awardUnit">
                        <span v-if="type=='info'">{{form.awardUnit}}</span>
                        <el-input v-else v-model="form.awardUnit" placeholder="请输入颁发单位"></el-input>
                    </el-form-item>
                </div>


                <div class="row_tow">
                    <el-form-item  label="颁发日期：" prop="awardTime">
                        <span v-if="type=='info'">{{ form.awardTime?moment(form.awardTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker  type="date" v-else v-model="form.awardTime" placeholder="请选择时间"></el-date-picker>
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
                userArr:[],
                userArrObj: {},
                options: {},
                 rules: {
                     userName: [{ required:true,message:'请输入员工姓名', trigger: "blur" }],
                     name: [{ required:true,message:'请输入证书名称', trigger: "blur" }],
                     number: [{ required:true,message:'请输入证书编号', trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {

                this.type = this.$route.query.type;
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["Z_aptitudeType" ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj
                });
                request({
                    url:`${this.$ip}/mms-qualification/userRecord/list`,
                    method: 'post',
                    params:{size:10000,current:1},
                    data:{}
                }).then((data) => {
                    if(data.data&&data.data.records){
                        this.userArr =data.data.records
                        data.data.records.map((k,l)=>{
                            this.userArrObj[k.userNumber]=k
                        })
                    }
                    })
                this.$route.meta.title =
                    this.type == "add"
                        ? "资质证书新增"
                        : this.type == "edit"
                        ? "资质证书编辑"
                        : this.type == "info"
                            ? "资质证书详情":''

                 if(this.type!='add'){
                     request({
                         url:`${this.$ip}/mms-qualification/qualify/getById/${this.$route.query.id}`,
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
            userNumberC(val){
                this.$set(this.form,'userName',this.userArrObj[val].userName)
                this.$set(this.form,'userId',this.userArrObj[val].userId)
            },
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
                                url='/qualify/save'
                            }else {
                                url='/qualify/update'
                            }
                            request({
                                url:`${this.$ip}/mms-qualification${url}`,
                                method: 'post',
                                data:{...this.form},
                            }).then((data) => {
                                this.$message.success("保存成功！");
                                this.$router.go(-1)
                            })
                              }
                    });
                }
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
