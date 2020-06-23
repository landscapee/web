<template>
    <div>
        <el-dialog title="试卷导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :inline="true" :model="form" ref="form" :rules="rules">
                <el-form-item>
                    <el-input style="width:300px" type="text" v-model="form.filename"  placeholder="仅支持Excel导入"></el-input>

                </el-form-item>
                <el-form-item>
                    <el-upload
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
                <el-button type="primary" @click="submit('form')">导出</el-button>
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

                row:{},
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

            open(data){
                this.dialogFormVisible=true
                this.row=data

            },
            submit() {
                this.$refs.file.submit();
            },
            handleChange(file, fileList) {
                if (fileList.length > 0) {
                    this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
                }
                this.form.filename=file.name
                console.log(file, fileList);
            },
            beforeAvatarUpload(file) {
                 const isLt2M = file.size / 1024 / 1024 < 5;
                if (!isLt2M) {
                    this.$message.error('上传图片大小不能超过 5MB!');
                }
                return isLt2M;
            },

            handleSubmit(files) {
                 let data={
                    file:files.file,
                    paperId:this.row.id
                }
                request({
                    'Content-Type':'application/x-www-form-urlencoded',
                    url:`${this.$ip}/mms-training/questionInfo/import`,
                    method:'post',
                    params:Qs.stringify(data)
                }).then((d) => {
                    if(d){
                        this.close();
                        this.$emit('getTableData')
                    }else {
                        this.$message({
                            message: '复制失败',
                            type: 'error',
                        });
                    }

                });
            },

            close(){
                this.row={}
                this.form={}
                this.dialogFormVisible=false
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