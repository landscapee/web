<template>
    <div class="indexAdd">

        <div class="QCenterRight">
            <div class="QHead">
                 试题维护-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form  label-position="right" :model="form" :rules="rules" ref="form"  :inline="true">
                <div></div>


                <div class="row_tow">
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
                <div class="  row_one">
                    <el-form-item label="题目：" prop="questionName">
                        <span v-if="type=='info'">{{form.questionName}}</span>
                        <el-input v-else v-model="form.questionName" type="text"   placeholder="请输入题目"></el-input>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item label="选项A：" prop="optionA">
                        <span v-if="type=='info'">{{form.optionA}}</span>
                        <el-input v-else v-model="form.optionA" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项B：" prop="optionB">
                        <span v-if="type=='info'">{{form.optionB}}</span>
                        <el-input v-else v-model="form.optionB" placeholder="请输入"></el-input>

                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item label="选项C：" prop="optionC">
                        <span v-if="type=='info'">{{form.optionC}}</span>
                        <el-input v-else v-model="form.optionC" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项D：" prop="optionD">
                        <span v-if="type=='info'">{{form.optionD}}</span>
                        <el-input v-else v-model="form.optionD" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item label="选项E：" prop="optionE">
                        <span v-if="type=='info'">{{form.optionE}}</span>
                        <el-input v-else v-model="form.optionE" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项F：" prop="optionF">
                        <span v-if="type=='info'">{{form.optionF}}</span>
                        <el-input v-else v-model="form.optionF" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item label="正确答案：" prop="answer">
                        <span v-if="type=='info'">{{form.answer}}</span>
                        <el-select ref="answer" :multiple="form.optionType=='多选'" v-else clearable v-model="form.answer" placeholder="请选择正确答案">
                            <el-option label="A" value="A"> </el-option>
                            <el-option label="B" value="B"> </el-option>
                            <el-option label="C" value="C"> </el-option>
                            <el-option label="D" value="D"> </el-option>
                            <el-option label="E" value="E"> </el-option>
                            <el-option label="F" value="F"> </el-option>

                        </el-select>
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
    import {eleDateShow,inputLength} from '@lib/tools'

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
                        let   url=`${this.$ip}/mms-training/questionInfo/verify?questionNo=${value}&paperId=${this.$route.query.id}&id=${this.form.id ||null}`


                        request({
                            url:url,
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
            return {
                options:{},
                 form: {optionType:'单选',paperId:''},
                rules: {
                    questionNo: [{  required: true,validator:infSources, trigger: "blur" },],
                    optionType: [{ required: true, message: '请选择选择类型', trigger: "blur" }],
                    answer: [{required: true, message: '正确答案不能为空', trigger: "blur" }],
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
                type: "add",
            }
        },
        created() {
            let num=  this.$route.path.substring(1,4)=='add'?4:5;
            this.type = this.$route.path.substring(1,num);
            request({

                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["selectType"]
            }).then(d => {
                this.options=d.data
            });
            if (this.$route.query) {
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
                    request({
                        url:`${this.$ip}/mms-training/questionInfo/info/${this.$route.query.sId}`,
                        method: "get",
                    }).then(d => {
                        if(d.data.optionType=='多选'){
                            d.data.answer= d.data.answer.split(';')
                        }
                        this.form={...d.data,paperId:this.$route.query.id}
                    })

                }
            }
        },
        mounted(){
            inputLength(this)
        },
        methods: {
            typeChange(val){
                let data=''
                if(val=='多选'){
                    data=[]
                 }else {
                    data=''
                }
              this.$set(this.form,'answer',data)
                console.log(this.form,1111);

            },
            resetForm(){

                if(this.form.id){
                    this.form={optionType:'单选',paperId:this.$route.query.id,id:this.form.id};
                }else{
                    this.form={optionType:'单选',paperId:this.$route.query.id,};
                }
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
                                   if(d.code==200){
                                       this.$message.success("保存成功！");
                                       // this.$router.push({path:'/testMaintenanceAdd',query:{id:this.$route.query.id}})
                                       this.$router.go(-1)
                                   }

                                })

                         }
                    });
                }
            }
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
