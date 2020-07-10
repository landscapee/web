<template>
    <div>
        <el-dialog title="培训项目导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form1" ref="form" :rules="rules">

                  <el-form-item label="开始时间：" :prop="form1.end?'start':'start1'">
                      <el-date-picker @change="start"  v-model="form1.start" type="year" placeholder="选择年"></el-date-picker>

                </el-form-item>
                <el-form-item label="结束时间：" :prop="form1.start?'end':'end1'">
                       <el-date-picker @change="end"  v-model="form1.end" type="year" placeholder="选择年"></el-date-picker>
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
                form:{ },
                form1:{end:null,start:null },
                rules:{
                    start:[{required:true,message:'请选择 ',trigger:'blur'}],
                    end:[{required:true,message:'请选择',trigger:'blur'}],
                },

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            start(val){
                if(this.form1.end){
                     if(val.getTime()<=this.form1.end.getTime()){
                        this.$set(this.form,'startTime',val.getFullYear()+'')
                    }else{
                        this.form1.start=null
                        this.$message.info('开始时间应该小于等于开始时间')
                    }
                }else{
                    this.$set(this.form,'startTime',val.getFullYear()+'')
                }
            }, end(val){
                 if(this.form1.start ){
                    if(val.getTime()>=this.form1.start.getTime()){
                        this.$set(this.form,'endTime',val.getFullYear()+'')
                    }else{
                        this.form1.end=null
                        this.$message.info('结束时间应该大于等于开始时间')
                    }
                }else{
                    this.$set(this.form,'endTime',val.getFullYear()+'')
                }
            },
            open(data){
                this.dialogFormVisible=true
                 this.row={...data}

            },

            submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         request({
                            'Content-Type':'application/msword',
                            // 'Content-Type':'application/octet-stream;charset=utf-8',
                            url: `${this.$ip}/mms-training/trainingInfo/export`,
                            method: 'get',
                            responseType: 'blob',
                            params:{startTime:this.form.startTime,endTime:this.form.endTime }
                        }).then((d)=>{
                            const content = d
                             let time=''
                            if(this.form.startTime&&this.form.endTime){
                                if(this.form.startTime==this.form.endTime){
                                    time=this.form.startTime+'年'
                                }else{
                                    time=this.form.startTime+'年-'+this.form.startTime+'年'
                                }

                            }
                            const blob = new Blob([content],{type:'application/msword'})
                             const fileName = `年度培训实施登记表（${time} ）`
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
    .el-form-item__error{
        left:100px;
    }


}

</style>