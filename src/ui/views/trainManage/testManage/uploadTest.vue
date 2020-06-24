<template>
    <div>
        <el-dialog title="纸质试卷上传归档"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :inline="true" :model="form" ref="form" :rules="rules">
                <el-form-item>
                    <el-input style="width:300px" type="text" v-model="filename"  placeholder="仅支持Excel导入"></el-input>

                </el-form-item>
                <el-form-item>
                    <el-upload
                            :multiple="false"
                            class="upload-demo"
                            ref="file"
                            :http-request="handleSubmit"
                            :on-change="handleChange"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            action=""
                            :before-upload="beforeAvatarUpload"
                            :auto-upload="true">
                        <el-button slot="trigger" size="small" type="primary">文件上传</el-button>
                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>
                </el-form-item>



            </el-form>
            <div class="footer">
                <el-button @click="close(1)">取消</el-button>
                <el-button type="primary" @click="submit('form')">确认</el-button>
            </div>
        </el-dialog>


    </div>
</template>
<script>
    import Qs from 'qs'
    import request from '@lib/axios.js';
    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                fileList: [],
                form:{ file:'',},
                rules:{},
                filename:'',
                id:'',
                dialogFormVisible:false,
            }
        },
        methods: {
            importFile(file){
                this.filename=file.target.value
            },
            selectFile( ){
                this.$refs.imFile.click()
            },

            open(id){
                this.dialogFormVisible=true
                this.id=id

            },
            submit() {
                console.log(this.form.file);
                if(this.form.file){
                    request({
                        url:`${this.$ip}/mms-training/examResult/uploadpaper`,
                        method:'post',
                        params:{id:this.id},
                        data:{...this.form},
                    }).then((d) => {
                        if(d){
                            this.close();
                            this.$emit('getTableData')
                            this.$message({
                                message: '操作成功',
                                type: 'success',
                            });
                        }else {
                            this.$message({
                                message: '操作失败',
                                type: 'info',
                            });
                        }

                    });
                }else{
                    this.$message.warning('文件上传成功后在提交')
                }
             },
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
                this.filename=file.name
                console.log(file, fileList);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isLt2M;
            },

            handleSubmit(files,q) {
                let data=new FormData()
                data.append("file",files.file);
                 console.log(data,files,q,111);
                request.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                     url:`${this.$ip}/mms-file/upload`,
                    method:'post',

                    data:data,
                }).then((d) => {
                    if(d){

                        this.form.file=d.data

                        this.$message({
                            message: '上传成功',
                            type: 'success',
                        });
                    }else {
                        this.$message({
                            message: '上传失败',
                            type: 'info',
                        });
                    }

                });
            },

            close(d){
                this.form={file:null}
                this.dialogFormVisible=false
                this.$refs.file.clearFiles()
                if(d&&this.form.file){
                    request({
                        // application/x-www-form-urlencoded
                        header:{
                            'Content-Type':'multipart/form-data'
                        },
                        url:`${this.$ip}/mms-file/${this.form.file}`,
                        method:'delete',

                    }).then((d) => {

                    });
                }
            },


        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog{
        width: 600px;
        .el-dialog__body{
            .el-form-item__label{
                width:100px;
            }
        }

    }
    .footer{
        display: flex;
        justify-content: center;
        .el-button{
            padding: 10px 30px;
            margin: 20px 0;
        }
        .el-button:first-child{
            margin-right: 20px;
        }
    }
    /deep/ .el-form {
        margin: 20px;
        text-align: center;
    }
    /deep/ .el-upload-list   {
        display: none;
    }
</style>