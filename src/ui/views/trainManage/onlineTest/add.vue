<template>
    <div class="addSysParameter"  >
        <div class="top-content">
            <div class="top-content-title">
                <span>{{}}&nbsp;&nbsp;在线考试</span>
            </div>
            <div   class="top-toolbar">

                <div @click="resetForm()" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="reset"></icon>重置
                </div>
                <div @click="saveForm('form')" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="save" style="width: 0"></icon>结束考试
                </div>
            </div>
        </div>

        <div    class="testMain" >
            <div class="bannerCenter bannerCenter1" style="text-align: center; ">
                <span>考试时长{{}}分钟</span>
                <span>共{{}}题</span>
                <span>离考试结束还有：{{}}分钟</span>
            </div>
            <div class="form">
                <el-form    :model="form" :rules="rules" ref="form" >
                    <div class="bannerCenter" style="text-align: center">
                        <span>题目{{num}} 多选题</span>
                        <span>题目描述{{num}} 说是发送到发送到发送到发送到发送到（{{num}}）</span>
                    </div>
                    <div  style="text-align: center">
                        <el-form-item label="" prop="infTime1">
                            <el-checkbox-group v-model="form.checkedCities"  >
                                <span v-for="(city,index) in ['上sfsdfsdfsdfsdfsdsd海', '北sdfssdfsdfsdfsdf京', '广sdf州', '深圳']">
                                    <el-checkbox  :label="city" :key="city">{{city}}</el-checkbox>
                                    <br v-if="index%2==1">
                                </span>

                            </el-checkbox-group>
                        </el-form-item>
                    </div>


                </el-form>
            </div>

            <div class="footerTest">
                <el-button>上一题</el-button>
                <el-button>保存</el-button>
                <el-button>下一题</el-button>
             </div>
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
                num:0,

                form: {checkedCities:[] },
                rules: {
                    aa:[{required:true,message:'请输入',trigger:'blue'}]
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                // let row=JSON.parse( this.$route.query.row)
                // this.form={...row}
            }
        },
        methods: {

            resetForm(){
                this.form={};
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {


                              }
                    });
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
    .addSysParameter {
        margin-top: 40px;
    }
    .bannerCenter1{
        margin: 20px 0 70px 0;
    }
    .bannerCenter{
        span{
            font-size: 18px;
        }
        span:nth-child(2){
            margin: 0 20px ;
        }
    }
    .form{
        margin: 20px 0 20px 0;
        /deep/ .el-form{
            width:100%;
            font-size: 18px!important;
        }
     }

    .footerTest{
         text-align:center;
    }
</style>
