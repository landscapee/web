<template>
    <div>
        <el-dialog title="试卷导入"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :inline="true" :model="form" ref="form" :rules="rules">
                <el-form-item>
                    <el-input style="width:300px" type="text" v-model="form.filename"  placeholder="仅支持Excel导入"></el-input>
                    <div v-show="tit" style="color:red;text-align: left;position: absolute">请选择文件</div>
                </el-form-item>
                <el-form-item prop="">
                    <el-upload
                            :multiple="false"
                            class="upload-demo"
                            ref="file"
                            :http-request="handleSubmit"
                            :on-change="handleChange"
                            accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                            action=""
                            :before-upload="beforeAvatarUpload"
                            :auto-upload="false">
                        <el-button slot="trigger" size="small" type="primary">浏览</el-button>

                        <!--<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
                    </el-upload>

                </el-form-item>



            </el-form>
            <div class="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit('form')">导入</el-button>
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
                form:{ filename:'',},
                rules:{},
                id:'',
                tit:false,
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
                if(this.form.filename){
                    this.tit=false
                    this.$refs.file.submit();
                }else{
                    this.tit=true
                }

            },
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
                this.form.filename=file.name
                this.tit=false
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
                data.append("paperId",this.id);
                console.log(data,files,q,111);
                request.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
                request({
                    header:{
                        'Content-Type':'application/x-www-form-urlencoded'
                    },
                    url:`${this.$ip}/mms-training/questionInfo/import`,
                    method:'post',
                    // data:data,
                    data:data,
                }).then((d) => {
                    if(d.code==200){
                        this.close();
                        this.$emit('getTableData')
                        this.$message({
                            message: '导入成功',
                            type: 'success',
                        });
                    }

                });
            },

            close(){
                this.tit=false
                this.row={}
                this.form={filename:''}
                this.dialogFormVisible=false
                this.$refs.file.clearFiles()
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