<template>
    <div>
        <el-upload
                :multiple="false"
                class="upload-demo"
                ref="file"
                :http-request="handleSubmit"
                :on-change="handleChange"
                :accept="accept||''"
                action=""
                :before-upload="beforeAvatarUpload"
                :auto-upload="true">
            <el-button slot="trigger" ref="buttonClick" size="small" type="primary">文件上传</el-button>
            <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
        </el-upload>
    </div>
</template>
<script>
    import Qs from 'qs'
    import request from '@lib/axios.js';
    export default {
        name: "copyDetails",
        props:['accept'],
        components: {},
        data() {
            return {
                form:{
                    fileName:'',
                    fileId:'',
                },

             }
        },
        methods: {
            importFile(file){
                this.filename=file.target.value
            },
            selectFile( ){
                this.$refs.imFile.click()
            },



            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
                this.form.filename=file.name
                console.log(file, fileList);
            },
            beforeAvatarUpload(file) {
                const isLt2M = file.size / 1024 / 1024 < 50;
                if (!isLt2M) {
                    this.$message.error('上传文件大小不能超过 50MB!');
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
                     url:`${this.$ip}/mms-file/upload2`,
                    method:'post',
                    data:data,
                }).then((d) => {
                    if(d){

                        this.$emit('getFile',d.data)
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
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>

    /deep/ .el-upload{
        padding:0;
        /*position: relative;*/
        /*<!--top:-2px;-->*/
        border-radius: 4px;
        .el-button{
            height:40px;
        }
    }
    /deep/ .el-upload-list   {
        display: none;
    }
</style>