<template>
    <div>
        <el-dialog title="黄页拍照信息" :close-on-click-modal="false" center
                   :visible.sync="dialogFormVisible"
                   :before-close="close">
            <div class="reason">
                <span>工单填报未上传黄页原因：{{reason||'--'}}</span>
            </div>
            <div class="imgbox"  :class="type=='info'?'info':''">

                <el-upload action="#" ref="upFile"

                           list-type="picture-card"
                           :http-request="handleSubmit"
                           :before-upload="beforeAvatarUpload"
                           :before-remove="beforeRemove"
                           :on-preview="onPreview"
                           :auto-upload="true"
                           accept=".jpg,.png,.gif,.jpeg,image/png,image/jpg,image/jpeg"
                           :file-list="fileList">
                    <i slot="default" class="el-icon-plus"></i>

                </el-upload>

            </div>

        </el-dialog>
    </div>
</template>
<script>
    import request from '@lib/axios.js';
    import {map, compact, get} from 'lodash'

    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                type: '',
                workId: '',
                reason: '',
                fileMap: {},
                fileList: [],
                dialogFormVisible: false,
            }
        },
        methods: {

            close() {
                this.$refs.upFile.clearFiles()
                this.dialogFormVisible = false
                this.$emit('init')
            },

            open(row, type) {
                this.type=type
                this.dialogFormVisible = true
                this.workId = row.id
                this.reason = row.reason
                this.fileMap = row.fileMap
                this.fileList = [...row.fileList]
            },
            save() {
                let arr = map(this.fileMap, (v, k) => {
                    return v;
                });
                arr = compact(arr);
                return request({
                    url: `${this.$ip}/mms-workorder/workorder/upload`,
                    method: 'post',
                    data: {
                        id: this.workId,
                        fileId: arr.join(',')
                    }
                })
            },
              beforeAvatarUpload(file) {
                return new Promise( (resolve, reject) => {
                     let data = new FormData()
                    data.append("file", file);
                    request.defaults.headers.post['Content-Type'] = 'multipart/form-data'
                      request({
                        header: {
                            'Content-Type': 'multipart/form-data'
                        },
                        url: `${this.$ip}/mms-file/upload2`,
                        method: 'post',
                        data: data,
                    }).then((uploadRes)=>{
                        if (uploadRes && uploadRes.code == 200) {
                            this.fileMap[file.uid] = uploadRes.data.id
                             this.save().then((saveRes)=>{
                                 if (saveRes && saveRes.code == 200) {
                                     this.$message({
                                         message: '上传成功',
                                         type: 'success',
                                     });

                                      resolve()
                                 } else {
                                     file.status='errow'
                                     reject()
                                  }
                             }).catch(()=>{
                                 file.status='errow'
                                 reject()
                             })

                        } else {
                            file.status='errow'
                            reject()
                         }
                    })
                })
             },
            handleSubmit(files, q, w) {
                console.log('files',files);
                return true
            },

            onPreview(file) {
                window.open(file.url)
            },
            beforeRemove(file, fileList, index) {
                 if(file.raw && file.raw.status==="errow"){
                    return
                }
                return new Promise((resolve, reject) => {
                    this.$confirm(`确定删除 ${ file.name }`, '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                        request({
                            header: {
                                'Content-Type': 'multipart/form-data'
                            },
                            url: `${this.$ip}/mms-file/${this.fileMap[file.uid]}`,
                            method: 'delete',
                        }).then((d) => {
                            if (d.code == 200) {
                                this.fileMap[file.uid]=null
                                resolve(true);
                                this.$message.success('删除成功')
                            } else {
                                reject(false);
                                this.$message.warning('删除失败')
                            }
                        }).catch(() => {
                            reject(false);
                        })

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


        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    /deep/  .el-dialog{
        width: 690px!important;
        .el-dialog__body{
            /*text-align: center;*/
            max-height:80vh;
            overflow-y: auto;
        }
    }
    .el-dialog {

        .el-dialog__body {
            padding: 32px 40px 28px 50px;
            max-height:80vh;
            overflow-y: auto;
            .reason{
                display: inline-block;
                padding: 15px 0px;
            }
            .imgbox{

            }
        }

    }

    .info{

        /deep/ .el-upload-list__item-actions:hover{

            .el-upload-list__item-delete{
                display: none;
            }
        }
        /deep/ .el-upload   {
             display: none;
        }
    }
    /deep/ .el-upload-list__item {
        img {
            height: auto !important;
        }
    }

</style>