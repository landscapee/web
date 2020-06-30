<template>
    <div class="onlineTest "  >
        <div class="QCenterRight">
            <div class="QHead">
                  试卷预览
            </div>
            <div  class="QheadRight">

                <div @click="editorForm()"  >
                    <icon  iconClass="reset "></icon>修改
                </div>
                <div @click="exportTest"  v-if="type!='add1'">
                    <icon iconClass="export"></icon>导出
                </div>
            </div>
        </div>

        <div style="display: flex;justify-content: center;" >

            <div class="form"  >
                <div style="height: 24px;font-size: 24px;font-weight: bold;color: #222222;padding: 0 30px 0 30px">
                    {{form.paperName}}考试试卷
                </div>
                <div class="bannerF">
                    <div class="bannerLeft"  >
                    <span>试卷编号：{{form.paperCode}}</span>

                    <span>考试时长：{{form.totalTime}}分钟</span>
                    <span>共{{form.questionInfoList.length}}题</span>
                    <!--<span>离考试结束还有：<span style="color: #3280e7">{{ }}分钟</span></span>-->
                    </div>
                    <div>
                       <span style="padding-right: 80px;font-size: 16px">考生姓名： </span>
                       <span style=" font-size: 16px">总分：</span>
                    </div>
                </div>
<div style="overflow-y: auto;height:calc(100vh - 350px);padding: 0 30px">
    <div v-for="(row,index) in form.questionInfoList" :key="index" style=" border: 1px solid #979797;margin-bottom: 20px; ">
        <div class="formhead">
            <div>题目{{row.questionNo}}</div>
            <div>({{row.score}}分)</div>
        </div>
        <div class="formBody">
            <div class="formLeft"  >
                ({{row.optionType}}题 )
            </div>
            <div class="formRight">
                <el-form    :model="form1"   ref="form" >
                    <div style="font-size: 20px;font-weight: bold">题目描述{{row.questionName}}  （）</div>
                    <el-form-item label="" prop="infTime1">
                        <el-checkbox-group v-if="row.optionType=='多选'"  v-model="form1.s"  >
                            <el-checkbox     label="A">A、{{row.optionA}}</el-checkbox>
                            <el-checkbox     label="B">B、{{row.optionB}}</el-checkbox>
                            <el-checkbox     label="C">C、{{row.optionC}}</el-checkbox>
                            <el-checkbox     label="D">D、{{row.optionD}}</el-checkbox>
                            <el-checkbox     label="E">E、{{row.optionE}}</el-checkbox>
                            <el-checkbox     label="F">F、{{row.optionF}}</el-checkbox>
                        </el-checkbox-group>
                        <el-radio-group v-else  v-model="form1.d" >
                            <el-radio     label="A">A、{{row.optionA}}</el-radio>
                            <el-radio     label="B">B、{{row.optionB}}</el-radio>
                            <el-radio     label="C">C、{{row.optionC}}</el-radio>
                            <el-radio     label="D">D、{{row.optionD}}</el-radio>
                            <el-radio     label="E">E、{{row.optionE}}</el-radio>
                            <el-radio     label="F">F、{{row.optionF}}</el-radio>
                        </el-radio-group>

                    </el-form-item>
                </el-form>

            </div>
        </div>
    </div>

</div>


            </div>

            <!--<div v-else class="form" style="height:200px;text-align: center;line-height: 200px;color:rgba(140,140,140,0.67)">-->
                <!--暂无试题-->
            <!--</div>-->
        </div>
        <ExportTest ref="ExportTest" ></ExportTest>


    </div>
</template>
<script>
    import ExportTest from './exportTest';

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
                  form: {questionInfoList:[] },
                  form1: {d:'',s:[] },
                rules: {
                    aa:[{required:true,message:'请输入',trigger:'blue'}]
                },

            };
        },
        computed:{

        },

        created() {
              if (this.$route.query) {
                 this.getList(this.$route.query.id)
            }

        },

        methods: {

            editorForm(){
               this.$router.go(-1)
            },
            exportTest() {
                console.log(1);
                this.$refs.ExportTest.open(this.form)
            },
            saveForm(form) {
             },

            getList(id){

                request({
                    url:`${this.$ip}/mms-training/paperInfo/info/${id}`,
                    method: 'get',
                }).then(data => {
                     this.form={...data.data,questionInfoList:data.data.questionInfoList||[],}

                });
            },
        }
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
    .onlineTest{
        padding: 0 30px ;

        .bannerF{
            margin: 15px 0 30px 0;
            display: flex;justify-content: space-between;
             padding: 0 98px 0 30px;
            .bannerLeft{

                &>span{
                    font-size: 16px;
                    font-family: SourceHanSansCN, SourceHanSansCN-Regular;
                    font-weight: 400;
                    text-align: right;
                    color: #888888;

                }
                &>span:nth-child(2){
                    margin: 0 40px;
                }
            }
        }

        .form{
            width: 1100px;
             margin: 0px 0 20px 0;
            padding:30px 19px;
            border: 1px solid #222222;

            .formhead{
                border-bottom: 1px solid #979797;
                padding: 12px 13px;
                display: flex;justify-content: space-between;
                background: #edf1f5;
                font-size: 16px;
                font-weight: bold;
            }
            .formBody{
                padding:20px  15px 0 15px;
                display: flex;justify-content: left;
                .formLeft{
                    font-size: 20px;
                    margin-right: 10px;
                    color: #888888;
                }
                .formRight{
                    /deep/ .el-form-item{
                        margin: 0!important;
                        .el-form-item__content{
                            line-height: normal;
                        }
                    }
                    /deep/ .el-checkbox{
                        margin: 20px 0;
                        display: block;
                        height:16px;
                        .el-checkbox__label{
                            font-size: 16px;
                            line-height: 20px;
                            padding-left: 21px;
                            font-size: 16px;

                            color: #222222;
                        }
                        .el-checkbox__input{
                            height: 16px!important;
                            width: 16px;
                            background: #eff2f3;

                        }
                        .el-checkbox__inner{
                            height: 16px;
                            width: 16px;
                        }
                        .is-checked{
                            background: #409EFF;
                        }
                    }
                    /deep/ .el-radio{
                        margin: 20px 0;
                        display: block;
                        height:16px;
                        .el-radio__label{
                            font-size: 16px;
                            line-height: 20px;
                            padding-left: 21px;
                            font-size: 16px;

                            color: #222222;
                        }
                        .el-radio__input{
                            height: 16px!important;
                            width: 16px;
                            background: #eff2f3;
                            border-radius: 16px;

                        }
                        .el-radio__inner{
                            height: 16px;
                            width: 16px;
                            border-radius: 16px;
                        }
                        .is-checked{
                            background: #409EFF;
                        }
                    }
                }
            }
        }


    }

</style>
