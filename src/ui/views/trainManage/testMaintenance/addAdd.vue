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
                    <el-form-item label="试题序号：" prop="infSources">
                        <span v-if="type=='info'">{{form.infSources}}</span>
                        <el-input v-else v-model="form.infSources" placeholder="请输入试题序号"></el-input>
                    </el-form-item>
                    <el-form-item label="选择类型：" prop="infTime">
                        <span v-if="type=='info'">{{  form.infTime }}</span>
                        <el-select @change="typeChange" v-else clearable v-model="form.infTime" placeholder="请选择选择类型">
                            <el-option label="单选" value="单选"> </el-option>
                            <el-option label="多选" value="多选"> </el-option>
                        </el-select>
                     </el-form-item>

                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="题目：" prop="infRemark">
                        <span v-if="type=='info'">{{form.infRemark}}</span>
                        <el-input v-else v-model="form.infRemark" type="text"   placeholder="请输入题目"></el-input>
                    </el-form-item>

                </div>
                <div class="row_custom">
                    <el-form-item label="选项A：" prop="place">
                        <span v-if="type=='info'">{{form.place}}</span>
                        <el-input v-else v-model="form.place" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项B：" prop="responsibleUnit">
                        <span v-if="type=='info'">{{form.responsibleUnit}}</span>
                        <el-input v-else v-model="form.responsibleUnit" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="选项C：" prop="deptName">
                        <span v-if="type=='info'">{{form.deptName}}</span>
                        <el-input v-else v-model="form.deptName" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项D：" prop="situation">
                        <span v-if="type=='info'">{{form.situation}}</span>
                        <el-input v-else v-model="form.situation" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>

                <div class="row_custom">


                    <el-form-item label="选项E：" prop="controlSate">
                        <span v-if="type=='info'">{{form.controlSate}}</span>
                        <el-input v-else v-model="form.controlSate" placeholder="请输入"></el-input>
                    </el-form-item>
                    <el-form-item label="选项F：" prop="workLink">
                        <span v-if="type=='info'">{{form.workLink}}</span>
                        <el-input v-else v-model="form.workLink" placeholder="请输入"></el-input>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="正确答案：" prop="keyWord">
                        <span v-if="type=='info'">{{form.keyWord}}</span>
                        <el-input   v-else v-model="form.keyWord" placeholder="请输入正确答案"></el-input>
                    </el-form-item>
                    <el-form-item label="分值：" prop="serviceEvents">
                        <span v-if="type=='info'">{{form.serviceEvents}}</span>
                        <el-input v-else v-model="form.serviceEvents" placeholder="请输入分值"></el-input>
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
                if (!value) {
                     return callback(new Error('试题序号不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/qualification/securityInformation/infNumberExists/${value}`,
                        method: 'get',
                    }).then(response => {
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该试题序号已存");
                        }
                    });
                }
            };
            const keyWord = (rule, value, callback) => {
                if (!value) {
                     return callback(new Error('正确答案不能为空'));
                } else {
                    if(this.form.infTime){
                        if(this.form.infTime=='单选'){
                            if(value.length>1){
                                return callback(new Error('只有一个正确答案'));
                            }else {
                                return callback();
                            }
                        }else {
                            if(value.length>6){
                                return callback(new Error('最多只有6个正确答案'));
                            }else {
                                return callback();
                            }
                        }
                    }else {
                        return callback(new Error('请先选择选择类型'));
                    }
                }
            };

            return {
                oldForm:{},
                form: {infTime:'单选'},
                rules: {
                    infSources: [{ validator:infSources, trigger: "blur" }],
                    infTime: [{ required: true, message: '请选择选择类型', trigger: "blur" }],
                    keyWord: [{ validator:keyWord, trigger: "change" }],
                    serviceEvents: [
                        { required: true, message: '请输入分值', trigger: 'blur' },
                         {
                            validator: (rule, value, callback) => {
                                console.log(value.split('.').length,11111);
                                if (typeof Number(value) == 'number' && !window.isNaN(Number(value))&&value.split('.').length===1) {
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
                let data=JSON.parse( this.$route.query.data)
                    this.oldForm={...data}
                if(this.type!='add'){
                    let row=JSON.parse( this.$route.query.row)
                    this.form={...row}
                }


            }
        },
        methods: {
            typeChange(val){
              this.$set(this.form,'keyWord','')
            },
            resetForm(){
                this.form={infTime:'单选'};
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let row
                             if(this.type == "add"){
                                 this.oldForm.arrTable.unshift({...this.form})
                                 row=this.$route.query.row
                             }else {
                                 this.oldForm.arrTable.splice(this.$route.query.index,1,{...this.form})
                                 row=JSON.stringify(this.form)
                             }
                             // console.log(this.oldForm,row);
                             let data=JSON.stringify(this.oldForm)
                            this.$router.push({path:'/testMaintenanceAdd',query:{type:this.type,data:data,row:row}})
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
