<template>
    <div>
        <el-dialog title="培训项目导出" :close-on-click-modal="false" center :visible.sync="dialogFormVisible"
                   :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">

                <el-form-item label="开始时间：" prop="startTime">
                    <el-date-picker v-model="form.startTime" @focus="focus" :picker-options="pickerOptions" type="date"
                                    placeholder="选择日期"></el-date-picker>

                </el-form-item>
                <el-form-item label="结束时间：" prop="endTime">
                    <el-date-picker v-model="form.endTime" @focus="focus1" :picker-options="pickerOptions1" type="date"
                                    placeholder="选择日期"></el-date-picker>
                </el-form-item>

            </el-form>
            <div class="Qfooter">
                <a href=""></a>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit('form')">导出</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
    import request from '@lib/axios.js';

    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                pickerOptions: {},
                pickerOptions1: {},
                form: {startTime: null, endTime: null},
                rules: {
                    startTime: [{required: true, message: '请选择 ', trigger: 'blur'}],
                    endTime: [{required: true, message: '请选择', trigger: 'blur'}],
                },

                dialogFormVisible: false,
            }
        },
        methods: {

            open() {
                this.dialogFormVisible = true
            },

            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$emit('isCLick',true)
                        this.close()
                        request({
                            timeout: 15000,
                            header: {
                                'Content-Type': 'multipart/form-data'
                            },
                            url: `${this.$ip}/mms-workorder/workorder/exportExcel`,
                            method: 'post',
                            data: {...this.form},
                            responseType: 'blob'
                        }).then(d => {

                            let arr = ['工单', 'xlsx']
                            if (d.headers['content-disposition'] && d.headers['content-disposition'].split('=')) {
                                arr = d.headers['content-disposition'].split('=')[1].split('.')
                            }
                            let content = d;
                            let blob = new Blob([content], {type: 'application/vnd.ms-excel'})
                            // let blob = new Blob([content],{type:'application/msword'})
                            const fileName = `${decodeURI(arr[0])}` + '.' + arr[1]
                            if ('download' in document.createElement('a')) { // 非IE下载
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            } else { // IE10+下载
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.$emit('isCLick',false)
                        }).catch(()=>{
                            this.$message.error('请求错误')
                            this.$emit('isCLick',false)
                        });
                    }
                });
            },
            close() {
                this.form = {}
                this.dialogFormVisible = false
            },
            focus(val){
                let e=this.form.endTime?new Date(this.form.endTime):''
                this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() >= e.getTime();
                        }
                    },
                };
            } ,
            focus1(val){
                let s=this.form.startTime?new Date(this.form.startTime):''
                this.pickerOptions1 = {
                    disabledDate(time) {
                        if (s) {
                            return time.getTime() <= s.getTime()-8.64e7||time.getTime() >= s.getTime()+90*24*60*60*1000 ;
                        }
                    },
                };
            },
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog {
        width: 520px;
        .el-dialog__body {
            padding: 30px;
            .el-form-item__label {
                width: 100px;
            }
            .el-input{
                width:250px!important;
            }
        }
        .el-form-item__error {
            left: 100px;
        }
.Qfooter{
    margin-top: 50px;
}
    }

</style>
