<template>
    <div>
        <el-dialog title="提示" center :visible.sync="dialogFormVisible" width="30%">
            <el-form :model="form">
                <el-form-item label="文件夹：" :label-width="formLabelWidth" label-width="80">
                    <el-select v-model="form.folderId" placeholder="请选择文件夹" style="width:calc(100% - 80px);">
                        <el-option v-for="item in fileList" :key='item.index' :label="item.label" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="fileMoveConfirm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import request from '@lib/axios.js';
    export default {
        data() {
            return {
                dialogFormVisible: false,
                fileList:[],
                form: {
                    folderId: ''
                },
                selectId:null,
                formLabelWidth: '60px'
            }
        },
        methods:{
            getFileList(){
                request({
                    url:`${this.$ip}/mms-knowledge/folder/list`,
                    method: 'post',
                })
                .then((data) => {
                    if(data.code==200){
                        this.fileList = data.data
                        this.fileList = this.fileList.map((item,index)=>{
                            return {
                                index: index,
                                label: item.name,
                                id: item.id
                            }
                        })
                    }else{
                        this.fileList = []
                    }
                })
            },
            openFn(selectId){
                this.dialogFormVisible = true
                this.selectId = selectId
                this.form = {
                    folderId: ''
                }
                this.getFileList()
            },
            fileMoveConfirm(){
                let postData = {
                    id: this.selectId,
                    folderId: this.form.folderId
                }
                request({
                    url:`${this.$ip}/mms-knowledge/file/move`,
                    method: 'post',
                    data: postData
                })
                .then((data) => {
                    if(data.code == 200 && data.data){
                        this.$message({
                            showClose: true,
                            message: '文件转移成功',
                            type: 'success'
                        })
                        this.dialogFormVisible = false
                        this.$emit('onupdate', postData)
                    }else{
                        this.$message({
                            showClose: true,
                            message: '文件转移失败',
                            type: 'error'
                        })
                    }
                })
            }
        }
    }
</script>
