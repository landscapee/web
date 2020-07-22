<template>
    <div class="addSysParameter">
        <div class="top-content">
            <div class="top-content-title">
                <span>文件-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div  class="top-toolbar">
                <div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="save"></icon>保存
                </div>
                <div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="reset"></icon>重置
                </div>
            </div>
        </div>
        <div class="upload_box" v-if="type!='info'">
            <el-upload
                class="upload_demo"
                ref="upload"
                accept='.doc'
                :on-success='fileUploadSuccessFn'
                :on-remove='fileRemoveFn'
                :before-upload='beforeUploadFn'
                drag
                :action='$ip+"/mms-file/upload2"'
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
                <div class="el-upload__tip" slot="tip">支持扩展名：.doc</div>
            </el-upload>
        </div>
        
        <div :class=" type=='info'?'main-content main-info':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div class="row_custom">
                    <el-form-item  label="模板名称：" prop="fileName" style="width:100%;">
                        <span v-if="type=='info'">{{form.fileName}}</span>
                        <el-input v-else v-model="form.fileName" readonly placeholder="请输入模板名称" style='width: 642px;'></el-input>
                    </el-form-item>
                </div>
                <div :class="this.type=='add'?'row_custom aRow_custom':'row_custom'" >
                    <el-form-item label="有效期限：" prop="time"  style="width:100%;">
                        <span v-if="type=='info'">{{form.startTime | formatDate}}-{{form.endTime | formatDate}}</span>
                        <el-date-picker
                            v-else
                            v-model="form.time"
                            type="daterange"
                            style="width:400px"
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期">
                        </el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <br>
    </div>
</template>
<script>
    import userTree from '@components/userTree/index';
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import moment from 'moment'
    export default {
        components: {
            Icon,
            userTree
        },
        filters: {
            formatDate (val, format='YYYY-MM-DD') {
                var val = Number(val);
                if (!isNaN(val)){
                    return moment(val).format(format)
                }else{
                    return ''
                }
                
            }
        },
        name: "",
        data() {
            return {
                oldForm:{},
                form: {
                    fileName: '',
                    time:'',
                    formats:'',
                    fileUrl:'',
                    size:'',
                    startTime:'',
                    endTime:'',
                },
                rules: {  // 维修部 - 维修- 放行     勤务部 -> 勤务
                    issueDeptId: [{ required:true,message:'请选择发行单位', trigger: "change" }],
                    fileName: [{ required:true,message:'请上传文件名称', trigger: "change" }],
                    time: [{ required:true,message:'请选择时间', trigger: "change" }],
                },
                type: "add",
                selectedPersonList: [],
                deptList: [],
                users:[]
            };
        },
        created() {
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "新增"
                        : this.type == "edit"
                        ? "编辑"
                        : this.type == "info"
                            ? "详情"
                            : "";
                if(this.type!='add'){
                    // let row=JSON.parse( this.$route.query.data)
                    // this.form={...row}
                    this.getFileInfo()
                }
            }
        },
        methods: {
            getFileInfo(){
                request({
                    url: `${this.$ip}/mms-charge/chargeTemplate/getById/${this.$route.query.id}`,
                    method: 'get'
                }).then(d => {
                    console.log(d)
                    if(d.code==200){
                        let data = d.data
                        this.form.fileName = data.name
                        this.form.time = [data.startTime, data.endTime]
                        this.form.fileUrl = data.fileUrl
                    }else{
                        this.$message({
                            showClose: true,
                            message: '获取模板信息错误',
                            type: 'error'
                        });
                        return
                    }
                    
                })
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
                            let data
                            if(this.type=='add'){
                                url='/chargeTemplate/save'
                                this.form.startTime = this.form.time[0]
                                this.form.endTime = this.form.time[1]
                                data = {
                                    name: this.form.fileName,
                                    fileUrl: this.form.fileUrl,
                                    startTime: this.form.startTime,
                                    endTime: this.form.endTime,
                                    size: this.form.size
                                }
                            }else {
                                url='/chargeTemplate/update'
                                this.form.startTime = this.form.time[0]
                                this.form.endTime = this.form.time[1]
                                data = {
                                    //fileParam: {
                                        name: this.form.fileName,
                                        id: this.$route.query.id,
                                        fileUrl: this.form.fileUrl,
                                        startTime: this.form.startTime,
                                        endTime: this.form.endTime,
                                        size: this.form.size
                                    //}
                                }
                            }
                            request({
                                url:`${this.$ip}/mms-charge${url}`,
                                method: 'post',
                                data:data,
                            }).then((data) => {
                                if(data.code==200){
                                    this.$message.success("操作成功！");
                                    this.$router.go(-1)
                                }else{
                                    this.$message({
                                        showClose: true,
                                        message: '模板操作失败',
                                        type: 'error'
                                    });
                                    return
                                }
                            })
                        }
                    });
                }
            },
            fileExistsFn(fileName){
                return new Promise((resolve,reject) => {
                    request({
                        url: `${this.$ip}/mms-charge/chargeTemplate/nameExists/${fileName}`,
                        method: 'get',
                    }).then(d => {
                        if(d.code==200&&!d.data){
                            resolve()
                        }else{
                            this.$confirm('模板名重复，是否继续?', '提示', {
                                confirmButtonText: '确定',
                                cancelButtonText: '取消',
                                type: 'warning'
                            }).then(() => {
                                resolve()
                            }).catch(() => {
                                this.$message({
                                    type: 'info',
                                    message: '已取消成功'
                                });
                                reject()
                            });
                            return
                            
                        }
                    })
                })
            },
            fileUploadSuccessFn(response, file, fileList){
                if(response.code==200){
                    // this.$set(this.form,'fileName', response.data.fileName)
                    this.form.fileName = response.data.fileName
                    this.form.formats = response.data.fileSuffix
                    //this.form.folderId = response.data.id
                    this.form.fileUrl = response.data.filePath
                    this.form.size = file.size
                }else{
                    this.$message({
                        showClose: true,
                        message: '文件上传失败',
                        type: 'error'
                    });
                }
            },
            fileRemoveFn(file,fileList){
                this.form.fileName = ''
                this.form.formats = ''
                this.form.folderId = ''
                this.form.fileUrl = ''
                this.form.size = ''
            },
            async beforeUploadFn(file){
                console.log(file)
                if(this.type == "add"){
                    await this.fileExistsFn(file.name)
                }else{
                    return true
                }
            }
        }
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
    .main-content{
        overflow-y: auto;
        margin-top: 30px!important;

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
        width: 1200px;
        margin:14px auto 0;
        .upload_box{
            width:100%;
            .upload_demo{
                width:300px;
                margin:0 auto;
                text-align:center;
            }
        }
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
                /deep/ .el-form-item{
                    width:calc( 100% - 32px)!important;
                    .el-form-item__content{
                        width: calc( 100% - 165px)!important;
                    }
                    .el-input{
                        width: 100% !important;
                    }
                    .el-textarea{
                        width: 100% !important;
                    }

                }
            }
            /deep/ .el-input{
                width: 240px;
                margin-right: 2px;
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
                            //margin-left: 93px;
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
        .list2{
            display:flex;
            align-items: center;
            justify-content: flex-end;
            .text{
                margin-right:10px;
            }
        }
    }
</style>
