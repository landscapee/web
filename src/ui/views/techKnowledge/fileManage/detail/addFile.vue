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
                :on-success='fileUploadSuccessFn'
                :on-remove='fileRemoveFn'
                :before-upload='beforeUploadFn'
                drag
                :action='$ip+"/mms-file/upload2"'
            >
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
                <div class="el-upload__tip" slot="tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
            </el-upload>
        </div>

        <div :class=" type=='info'?'main-content main-info':'main-content'"  >
            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
                <div class="row_custom">
                    <el-form-item  label="文档名称：" prop="fileName" style="width:100%;">
                        <span v-if="type=='info'">{{form.fileName}}</span>
                        <el-input v-else v-model="form.fileName" readonly placeholder="自动获取上传文件的名称，同文件夹下不可重复" style='width: 642px;'></el-input>
                    </el-form-item>
                </div>

                <div class="row_custom">
                    <el-form-item label="发行单位：" prop="issueDeptId">
                        <span v-if="type=='info'">{{form.issueDept}}</span>
                        <el-select v-else clearable v-model="form.issueDeptId" placeholder="请选择发行单位" style='width:242px'>
                            <el-option  v-for='item in issueDeptArr' :key='item.valCode' :label="item.valData" :value="item.valCode"> </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="所属岗位：" prop="position">
                        <span v-if="type=='info'">{{form.position}}</span>
                        <el-select v-else clearable v-model="form.position" placeholder="请输入所属岗位" style='width:242px'>
                            <el-option  v-for='item in positionArr' :key='item.valCode' :label="item.valData" :value="item.valData"> </el-option>
                        </el-select>
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
                <div class="row_item_row row_item" v-if='type=="add"'>
                    <el-form-item label="阅读推送：">
                        <el-input v-model="form.description" readonly type="textarea" :rows="3"  placeholder="请输入阅读推送"></el-input>
                    </el-form-item>
                </div>
            </el-form>
        </div>
        <br>
        <div class="list2"  v-if='type=="add"'>
            <span class="text">已选{{selectedPersonList.length}}对象</span><el-button type="primary" @click="choiceSelectFn">对象选择</el-button>
        </div>
        <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
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
                    fileName:'',
                    description:'',
                    issueDept:'',
                    position:'',
                    folderId: '',
                    fileUrl:'',
                    issueDeptId:'',
                    startTime:'',
                    endTime:'',
                    formats:'',
                    size:'',
                    time:[]
                },
                issueDeptArr:[],
                positionArr:[],
                rules: {  // 维修部 - 维修- 放行     勤务部 -> 勤务
                    issueDeptId: [{ required:true,message:'请选择发行单位', trigger: "change" }],
                    position: [{ required:true,message:'请输入所属岗位', trigger: "change" }],
                    fileName: [{ required:true,message:'请上传文件名称', trigger: "change" }],
                    time: [{ required:true,message:'请选择时间', trigger: "change" }],
                    description: [{ required:true,message:'请输入阅读推送', trigger: "change" }]
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
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["issueDept", "position",]
            }).then(d => {
                if(d.code == 200){
                    this.issueDeptArr = d.data.issueDept
                    this.positionArr = d.data.position
                }else{
                    this.issueDeptArr = []
                    this.positionArr = []
                }
            })
        },
        methods: {
            getFileInfo(){
                request({
                    url: `${this.$ip}/mms-knowledge/file/getById/${this.$route.query.id}`,
                    method: 'get'
                }).then(d => {
                    console.log(d)
                    if(d.code==200){
                        let data = d.data
                        this.form = {
                            fileName:data.fileName,
                            description:'',
                            issueDept:data.issueDept,
                            position:data.position,
                            folderId: data.folderId,
                            fileUrl: data.fileUrl,
                            issueDeptId: data.issueDeptId,
                            startTime: data.startTime,
                            endTime: data.endTime,
                            formats: data.formats,
                            size: data.size,
                            time:[data.startTime, data.endTime]
                        }
                    }else{
                        this.$message({
                            showClose: true,
                            message: '获取文件信息错误',
                            type: 'error'
                        });
                        return
                    }

                })
            },


            choiceSelectFn(){
                this.$refs.userBox.open(this.users, '选择推送对象', true);
            },
            handleUserSelected(selectedPersonList,deptList){
                this.selectedPersonList = selectedPersonList
                this.deptList = deptList
                this.form.description = this.selectedPersonList.map(item=>item.name).join(",")
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
                                url='/file/save'
                                let select = this.selectedPersonList.map(item=>{
                                    return {
                                        userId:item.id,
                                        userName:item.name
                                    }
                                })
                                this.form.startTime = this.form.time[0]
                                this.form.endTime = this.form.time[1]
                                this.form.issueDept = this.issueDeptArr.find(item=>item.valCode==this.form.issueDeptId).valData
                                data = {
                                    fileParam: {
                                        fileName: this.form.fileName,
                                        issueDept: this.form.issueDept,
                                        position: this.form.position,
                                        folderId: this.$route.query.folderId,
                                        fileUrl: this.form.fileUrl,
                                        issueDeptId: this.form.issueDeptId,
                                        startTime: this.form.startTime,
                                        endTime: this.form.endTime,
                                        formats: this.form.formats,
                                        size: this.form.size
                                    },
                                    userVOList:select
                                }
                            }else {
                                url='/file/update'
                                this.form.startTime = this.form.time[0]
                                this.form.endTime = this.form.time[1]
                                this.form.issueDept = this.issueDeptArr.find(item=>item.valCode==this.form.issueDeptId).valData
                                data = {
                                    //fileParam: {
                                        fileName: this.form.fileName,
                                        issueDept: this.form.issueDept,
                                        position: this.form.position,
                                        id: this.$route.query.id,
                                        fileUrl: this.form.fileUrl,
                                        issueDeptId: this.form.issueDeptId,
                                        startTime: this.form.startTime,
                                        endTime: this.form.endTime,
                                        formats: this.form.formats,
                                        size: this.form.size
                                    //}
                                }
                            }
                            request({
                                url:`${this.$ip}/mms-knowledge${url}`,
                                method: 'post',
                                data:data,
                            }).then((data) => {
                                if(data.code==200){
                                    this.$message.success("保存成功！");
                                    this.$router.go(-1)
                                }else{
                                    this.$message({
                                        showClose: true,
                                        message: '文件保存失败',
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
                        url: `${this.$ip}/mms-knowledge/file/nameExists`,
                        method: 'post',
                        data:{
                            fileName,
                            folderId: this.$route.query.folderId
                        }
                    }).then(d => {
                        if(d.code==200&&!d.data){
                            resolve()
                        }else{
                            this.$confirm('文件名字重复，是否继续?', '提示', {
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
                await this.fileExistsFn(file.name)
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
            //font-weight: bold!important;
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
