<template>
    <div>
         <el-upload
                :multiple="listNone"
                :class="listNone?' upload-demo ':'upload-demo listNone'"
                ref="file"
                :http-request="handleSubmit"
                :on-change="handleChange"
                :accept="accept||''"
                action=""
                :file-list="fileList"
                 :before-remove="beforeRemove"
                :before-upload="beforeAvatarUpload"
                :auto-upload="true">
            <el-button slot="trigger" ref="buttonClick" size="small" type="primary">文件上传</el-button>
         </el-upload>
    </div>
</template>
<script>
    import {compact,map} from 'lodash'
     import request from '@lib/axios.js';
    export default {
        name: "copyDetails",
        props:['accept','isUpload','isPrompt','listNone'],
        components: {},
        data() {
            return {
                fileList:[],
                fileMap:{},
                form:{
                    fileName:'',
                    fileId:'',

                },

             }
        },
        methods: {
            emit() {
                let arr = map(this.fileMap, (v, k) => {
                    return v;
                });
                arr = compact(arr);
                this.$emit('getFile', arr.join(','));
            },
            beforeRemove(file, fileList,index) {
                console.log(file, fileList, index);
                return new Promise((resolve, reject) => {
                    this.$confirm(`确定移除 ${ file.name }`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                             resolve(true);
                            this.fileMap[file.uid] = null;
                            this.emit();
                        })
                        .catch(() => {
                            reject(false);
                            this.$message({
                                type: 'info',
                                message: '已取消删除',
                            });
                        });
                });
            },

            importFile(file){

                this.filename=file.target.value
            },
            selectFile( ){
                this.$refs.imFile.click()
            },
            handleChange(file, fileList) {

                if(this.listNone){
                    this.fileList=fileList
                }else{
                    if (fileList.length > 0) {
                        this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                    }
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
                if(this.isUpload){
                    this.$emit('getFile',files)
                    return false
                }
                request.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                     url:`${this.$ip}/mms-file/upload2`,
                    method:'post',
                    data:data,
                }).then((d) => {

                    if(d.code==200){
                        if(this.listNone){
                            this.fileMap[files.file.uid]=d.data.id;
                            this.emit( ) ;
                        }else{
                            this.$emit('getFile',d.data)
                        }
                         if(!this.isPrompt){
                            this.$message({
                                message: '上传成功',
                                type: 'success',
                            });
                        }
                    }
                });
            },
            getFileList(list) {
                if (!list.length) {
                    this.fileList = [];
                    this.fileMap = {};
                } else {
                    this.fileList = list.map((item, index) => {
                        return { name: item.fileName, uid: 1000000 + index, url: item.filePath, id: item.id };
                    });
                    this.fileList.map((i) => {
                        this.fileMap[i.uid] = i.id;
                    });
                }
            },
        },

        mounted() {
            this.$emit('start');
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
    /deep/ .el-icon-upload-success:before,
    /deep/ .el-icon-circle-check:before {
        content: "\e720";
    }
    .el-icon-upload-success:before,
      .el-icon-circle-check:before {
        content: "\e720";
    }
    .listNone{
        /deep/ .el-upload-list   {
            display: none;
        }
    }
</style>