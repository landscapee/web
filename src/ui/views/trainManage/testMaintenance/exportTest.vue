<template>
    <div>
        <el-dialog title="试卷导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="编号：">
                    <span>{{row.paperCode}} </span>
                </el-form-item>
                <el-form-item label="名称：">
                    <span>{{row.paperName}} </span>
                </el-form-item>
                <el-form-item label="格式：" prop="type">
                    <el-radio-group v-model="form.type">
                        <el-radio label="WORD" value="WORD"></el-radio>
                        <el-radio label="PDF" value="PDF"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="Qfooter">
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
                form:{type:'WORD'},
                rules:{
                    type:[
                        {required:true,message:'请选择格式',trigger:'blur'}
                    ]
                },

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
                this.dialogFormVisible=true
                 this.row={...data}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let contentType
                        if(this.form.type=='WORD'){
                            contentType='application/msword'
                        }else{
                            contentType='application/pdf'
                        }
                         request({
                            'Content-Type':contentType,
                             url: `${this.$ip}/mms-training/paperInfo/export/${this.row.id}/${this.form.type}`,
                            method: 'get',
                            responseType: 'blob',
                            params:{startTime:this.form.startTime,endTime:this.form.endTime }
                        }).then((d)=>{

                            const content = d
                            const blob = new Blob([content],{type:contentType})
                            const fileName = ` ${this.row.paperName}（编号：${this.row.paperCode} ）`
                            if ('download' in document.createElement('a')) { // 非IE下载
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }
                             this.close()
                        })

                    }
                });
            },
            close(){
                this.row={}
                this.from={}
                this.dialogFormVisible=false
            }
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

</style>