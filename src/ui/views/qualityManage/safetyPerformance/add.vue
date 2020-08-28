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

        <div :class=" type=='info'?'main-content main-info G_formInfo':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div></div>
                <div class="row_custom">
                    <el-form-item label="绩效年月：" :prop="type=='add'?'yearMonth':''">
                        <span v-if="type=='info'">{{form.yearMonth}}</span>
                        <el-date-picker @change="yearMonth" :disabled="type=='edit'"   v-else v-model="form.yearMonth" placeholder="请选择绩效年月" type="month">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="部门：" prop="deptId">
                        <span v-if="type=='info'">{{form.deptId}}</span>
                        <el-select @change="deptNameChange" clearable v-else v-model="form.deptId" placeholder="请选择部门">
                            <el-option v-for="(opt,index) in options.dept" :key="index" :label="opt.valData" :value="opt.valCode"> </el-option>
                        </el-select>
                     </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="批准人：" prop="reviewerName">
                        <span v-if="type=='info'">{{form.reviewerName}}</span>
                        <el-input v-else v-model="form.reviewerName" placeholder="请输入批准人"></el-input>
                    </el-form-item>
                    <el-form-item label="批准日期：" prop="reviewerTime">
                        <span v-if="type=='info'">{{form.reviewerTime?moment(form.reviewerTime).format('YYYY-MM-DD'):''}}</span>
                         <el-date-picker  v-else v-model="form.reviewerTime" type="date" placeholder="请选择批准日期"></el-date-picker>

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
            const yearMonth = (rule, value, callback) => {

                    if (!this.form.yearMonth) {
                        return callback(new Error('绩效年月不能为空'));
                    } else {
                        if(this.form.deptId){
                            let year=this.form.yearMonth.getFullYear()+''
                            let month= this.form.yearMonth.getMonth()+1+''
                            request({
                                url:`${this.$ip}/mms-qualification/securityMerits/numberExists`,
                                method: 'post',
                                data:{
                                    deptId:this.form.deptId,
                                    month:month,
                                    year:year,
                                }
                            }).then(response => {
                                if (!response.data) {
                                    callback();
                                } else {
                                    callback("该绩效年月已存");
                                }
                            });
                        }else {
                            callback("选择部门后将校验");
                        }

                    }


            };

            return {
                form: {
                    year:null,
                    month:null,
                },
                moment:moment,
                options:{},
                rules: {
                    yearMonth: [{ required: true,validator:yearMonth, trigger: "blur" }],
                    deptId: [{ required: true, message: "请选择", trigger: "blur" },

                        ],
                 },
                type: "add"
            };
        },
        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["dept",]
            }).then(d => {
                this.options=d.data
            });
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
                     request({
                        url:`${this.$ip}/mms-qualification/securityMerits/getById/${this.$route.query.id}`,
                        method: "get",
                    }).then(d => {

                        this.form={...d.data ,yearMonth:`${d.data.year}-${d.data.month}`}
                    })
                        .catch(error => {
                            this.$message.error(error);
                        });
                }
            }

        },
        watch:{
          'form.yearMonth':function (val) {
if(val){
    // this.form.year=Number(val.getFullYear() )
    // this.form.month= Number(val.getMonth()+1 )
    console.log(val, this.form);
}

          }
        },
        methods: {
            yearMonth(val){
                if(val){
                    this.form.year=Number(val.getFullYear() )
                    this.form.month= Number(val.getMonth()+1 )
                    console.log(val, this.form);
                }
            },
            deptNameChange(val){
                let data
                this.$refs.form.validateField('yearMonth')
                this.options.dept.map((k,l)=>{
                    if(val==k.valCode){
                        data=k.valData
                    }
                })
                this.$set(this.form,'deptName',data)
            },
            resetForm(){
                if(this.type=='edit'){
                    this.form={id:this.form.id,yearMonth:this.form.yearMonth,year:null, month:null,};
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
                                url=`${this.$ip}/mms-qualification/securityMerits/save`
                            }else {
                                url=`${this.$ip}/mms-qualification/securityMerits/update`
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
            /*font-weight: bold!important;*/
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
                padding-left: 61px;
            }
            /deep/ .el-form-item__content {
                margin-left: 165px;
            }
            .el-form-item.is-required{
                /deep/ .el-form-item__label {

                    padding-left: 50px;
                }
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
