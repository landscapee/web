<template>
    <div class="index">
        <div class="QCenterRight">
            <div class="QHead">
                机尾号信息-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form ref="form"   :model="form" :rules="rules"   :inline="true"  >

                <div class="row_tow">
                    <el-form-item  label="机尾号：" prop="flightRegisterNo">
                        <span v-if="type=='info'">{{form.flightRegisterNo}}</span>
                        <el-input v-else v-model="form.flightRegisterNo" placeholder="请输入机尾号"></el-input>
                    </el-form-item>
                    <el-form-item  label="机型：" prop="icao">
                        <span v-if="type=='info'">{{form.icao}}</span>
                        <el-select  v-else  filterable    v-model="form.icao" placeholder="请选择机型">
                            <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.name" :value="opt.name"> </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="发动机号：" prop="engineNo">
                        <span v-if="type=='info'">{{form.engineNo}}</span>
                        <el-select filterable  v-else   v-model="form.engineNo" placeholder="请选择发动机号">
                            <el-option v-for="(opt,index) in options.EngineNo" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                        </el-select>
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
                 form: { },
                options: {},
                AircraftType:[],
                AircraftTypeObj:{},
                rules: {
                    engineNo: [{ required:true,message:'请选择发动机号', trigger: "blur" }],
                    flightRegisterNo: [{ required:true,message:'请输入机尾号', trigger: "blur" }],
                    icao: [{ required:true,message:'请选择机型', trigger: "blur" }],

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
                    data:["EngineNo" ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj

                });

                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                    method: 'get',
                }).then(d => {
                    if( d.data&&d.data.length){
                        this.AircraftType=d.data
                        d.data.map((k,l)=>{
                            this.AircraftTypeObj[k.id]=k
                        })
                    }
                });
                this.$route.meta.title =
                    this.type == "add"
                        ? "机尾号信息新增"
                        : this.type == "edit"
                        ? "机尾号信息编辑"
                        : this.type == "info"
                            ? "机尾号信息详情"
                            : "";

                if(this.type!='add'){
                    request({
                        url:`${this.$ip}/mms-parameter/rest-api/airplaneInfo/details`,
                        method: "post",
                        data:{id:this.$route.query.id}
                    }).then(d => {
                        this.form={...d.data[0] }
                    })
                }
            }
        },
        methods: {

            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id  };
                }else{
                    this.form = { };
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url

                            request({
                                url:`${this.$ip}/mms-parameter/airplaneInfo/saveOrUpdate`,
                                method: 'post',
                                data:{...this.form},
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

        }
    };
</script>
<style scoped lang="scss">
    .index{
        padding:0 30px;
    }

    /deep/ .el-form{
        .el-form-item__label{
            width: 110px!important;

        }
        .el-form-item__content{
            width: calc(100% - 110px) !important;
        }
        .el-input{
            width: calc(100% - 50px)!important;
        }
    }

</style>
