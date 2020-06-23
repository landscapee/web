<template>
    <div class="addSysParameter">

        <div class="top-content">
            <div class="top-content-title">
                <span>试题维护-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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

        <div :class=" type=='info'?'main-content main-info':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div></div>


                <div class="row_custom">
                    <el-form-item label="试题序号：" prop="questionNo">
                        <span v-if="type=='info'">{{form.questionNo}}</span>
                        <el-input  v-else v-model="form.questionNo"  placeholder="请输入试题序号"></el-input>
                    </el-form-item>
                    <el-form-item label="选择类型：" prop="optionType">
                        <span v-if="type=='info'">{{  form.optionType }}</span>
                        <el-select @change="typeChange" v-else clearable v-model="form.optionType" placeholder="请选择选择类型">
                             <el-option v-for="(opt,index) in options.selectType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>

                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="题目：" prop="questionName">
                        <span v-if="type=='info'">{{form.questionName}}</span>
                        <el-input v-else v-model="form.questionName" type="text"   placeholder="请输入题目"></el-input>
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="选项A：" prop="optionA">
                        <span v-if="type=='info'">{{form.optionA}}</span>
                        <el-input v-else v-model="form.optionA" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项B：" prop="optionB">
                        <span v-if="type=='info'">{{form.optionB}}</span>
                        <el-input v-else v-model="form.optionB" placeholder="请输入"></el-input>

                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="选项C：" prop="optionC">
                        <span v-if="type=='info'">{{form.optionC}}</span>
                        <el-input v-else v-model="form.optionC" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项D：" prop="optionD">
                        <span v-if="type=='info'">{{form.optionD}}</span>
                        <el-input v-else v-model="form.optionD" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="选项E：" prop="optionE">
                        <span v-if="type=='info'">{{form.optionE}}</span>
                        <el-input v-else v-model="form.optionE" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项F：" prop="optionF">
                        <span v-if="type=='info'">{{form.optionF}}</span>
                        <el-input v-else v-model="form.optionF" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="正确答案：" prop="answer">
                        <span v-if="type=='info'">{{form.answer}}</span>
                        <el-select :multiple="form.optionType=='多选'" v-else clearable v-model="form.answer" placeholder="请选择选择类型">
                            <el-option label="A" value="A"> </el-option>
                            <el-option label="B" value="B"> </el-option>
                            <el-option label="C" value="C"> </el-option>
                            <el-option label="D" value="D"> </el-option>
                            <el-option label="E" value="E"> </el-option>
                            <el-option label="F" value="F"> </el-option>

                        </el-select>
                        <el-input   v-else v-model="form.answer" placeholder="请输入正确答案"></el-input>
                    </el-form-item>
                    <el-form-item label="分值：" prop="score">
                        <span v-if="type=='info'">{{form.score}}</span>
                        <el-input v-else v-model="form.score" placeholder="请输入分值"></el-input>
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
            const infSources = (rule, value, callback) => {
                // callback();
                console.log(!value,11,value);
                if (!value) {
                     return callback(new Error('试题序号不能为空'));
                } else {
                    if (typeof Number(value) == 'number' && !window.isNaN(Number(value))) {
                        request({
                        // /
                            url:`${this.$ip}/mms-training/questionInfo/verify?questionNo=${value}&paperId=${this.$route.query.id}&id=${this.form.id||null}`,
                            method: 'get',
                        }).then(d => {
                            if(d.code==200){
                                if (!d.data.exists) {
                                    callback();
                                } else {
                                    callback("该试题序号已存,可用序号："+d.data.availableNo);
                                }
                            }else{
                                callback(d.message)
                            }

                        });
                    } else {
                        callback(new Error('必须为数字类型'));
                    }
                }
            };
            const keyWord = (rule, value, callback) => {
                if (!value) {
                     return callback(new Error('正确答案不能为空'));
                } else {
                   return callback()
                }
            };

            return {
                options:{},
                 form: {optionType:'单选',paperId:''},
                rules: {
                    questionNo: [


                        { validator:infSources, trigger: "blur" },
                    ],
                    optionType: [{ required: true, message: '请选择选择类型', trigger: "blur" }],
                    answer: [{ validator:keyWord, trigger: "change" }],
                    score: [
                        { required: true, message: '请输入分值', trigger: 'blur' },
                         {
                            validator: (rule, value, callback) => {
                                 if (typeof Number(value) == 'number' && !window.isNaN(Number(value))&&(value+'').split('.').length===1) {
                                    if (value <= 0) {
                                        callback(new Error('分值必须大于0'));
                                    } else {
                                        callback();
                                    }
                                } else {
                                    callback(new Error('必须为整数类型'));
                                }
                            },
                            trigger: 'change',
                        },
                    ],
                  },
                type: "add"
            };
        },
        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["selectType"]
            }).then(d => {
                this.options=d.data
            });
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "试题维护新增"
                        : this.type == "edit"
                        ? "试题维护编辑"
                        : this.type == "info"
                            ? "试题维护详情"
                            : "";
                this.form.paperId= this.$route.query.id
                if(this.type!='add'){
                    let row=JSON.parse( this.$route.query.row)
                    if(row.optionType=='多选'){
                        row.answer= row.answer.split(';')
                    }
                    this.form={...row,paperId:this.$route.query.id}


                }


            }
        },
        methods: {
            typeChange(val){
                let data=null
                if(val=='多选'){
                    data=[]
                }
              this.$set(this.form,'answer',data)

            },
            resetForm(){
                this.form={optionType:'单选',paperId:''};
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        let data={...this.form}
                        if(this.form.optionType=='多选'){
                            data.answer= data.answer.join(';')
                        }
                         data.questionNo=Number( data.questionNo)
                         data.score=Number( data.score)
                        if (valid) {
                            let url
                            if (this.type == "add"&&!this.form.id) {
                                url = `${this.$ip}/mms-training/questionInfo/save`
                            } else {
                                url = `${this.$ip}/mms-training/questionInfo/update`
                            }
                            request({
                                url,
                                method: "post",
                                data: data
                            })
                                .then(d => {
                                    this.$message.success("保存成功！");
                                    this.$router.push({path:'/testMaintenanceAdd',query:{id:this.$route.query.id}})
                                })
                                .catch(error => {
                                    this.$message.success(error);
                                });
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
            font-weight: bold!important;
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
            }
            /deep/ .el-form-item__content {
                margin-left: 165px;
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
