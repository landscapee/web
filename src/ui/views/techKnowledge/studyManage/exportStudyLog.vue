<template lang="html">
    <el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body
               :visible.sync="dialogVisible" width="800px" :before-close="handleClose">
        <el-form :model="form" ref="form" :rules="rules" :inline="true"  >


                    <el-form-item label="开始时间：" prop="startTime" :rules=" form.startTime||form.endTime?rules.startTime:[{required:false}]">
                        <el-date-picker @focus="start"  v-model="form.startTime" type="date" :picker-options="pickerOptions" placeholder="请选择日期"></el-date-picker>

                    </el-form-item>
                    <el-form-item label="结束时间："  prop="endTime"   :rules=" form.endTime||form.startTime?rules.endTime:[{required:false}]">
                        <el-date-picker @focus="end"  v-model="form.endTime" type="date" :picker-options="pickerOptions1" placeholder="请选择日期"></el-date-picker>
                    </el-form-item>



            <el-form-item label="人员选择"  class="ids" prop="ids"    >
                <userPage :idArr="form.idArr"></userPage>
            </el-form-item>
        </el-form>

        <div class="Qfooter" style="margin-top: 15px">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSave('form')">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import request from '@lib/axios.js';
    import {map} from 'lodash';
    import userPage from '@/ui/components/userTree/page'

    export default {
        name: 'exStudyLog',
        data() {
            return {
                title:'导出学习记录',
                dialogVisible: false,
                form: {ids:'',idArr:[]},
                pickerOptions: {},
                pickerOptions1: {},
                 rules:{
                    startTime:[{required:true,message:'请选择 ',trigger:'blur'}],
                    endTime:[{required:true,message:'请选择',trigger:'blur'}],
                    ids:[{required:true,message:'请选择',trigger:'blur'}],
                },
            };
        },
        components: {
            userPage,
        },
        props: {
            dataRequire: {
                type: Boolean,
                default: false
            }
        },
        watch:{
          'form.idArr':{
              handler(n){
                  console.log(n);
                  let sarr=n.map((k,l)=>{
                      return k.id
                  })
                  console.log(sarr);
                  this.form.ids=sarr.join(',')
              },
              deep:true
          }
        },
        methods: {
            handleSave(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                       let obj={...this.form}
                       delete obj.idArr
                        request({
                            header:{
                                'Content-Type':'multipart/form-data'
                            },
                            url:`${this.$ip}/mms-knowledge/fileStudy/studyExport`,
                            method: 'get',
                            params:obj,
                            responseType: 'blob'
                        }).then(d => {
                            let arr=[]
                            if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                                arr=d.headers['content-disposition'].split('=')[1].split('.')
                            }
                            let content = d;
                             let blob = new Blob([content],{type:'application/zip'})
                            // ${decodeURI(arr[0])}
                            const fileName = `学习记录`
                            if ('download' in document.createElement('a')) { // 非IE下载
                                const elink = document.createElement('a')
                                elink.download = fileName
                                elink.style.display = 'none'
                                elink.href = URL.createObjectURL(blob)
                                document.body.appendChild(elink)
                                elink.click()
                                URL.revokeObjectURL(elink.href) // 释放URL 对象
                                document.body.removeChild(elink)
                            }else { // IE10+下载
                                navigator.msSaveBlob(blob, fileName)
                            }
                            this.handleClose()
                        });

                    }
                });
            },
            handleClose() {
                this.form = {ids:'',idArr:[]};
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;

            },

            start(val){
                let e=new Date(this.form.endTime)
                 let t=new Date()
                 this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() > e.getTime();
                         }
                    },
                };
            } ,
            end(val){
                let d=new Date()
                let s=new Date(this.form.startTime)
                 this.pickerOptions1 = {
                    disabledDate(time) {
                        // console.log(1, 8);
                        if (s) {
                            return time.getTime() < s.getTime() ;
                         }
                    },
                };
            },
        },

    };
</script>

<style scoped lang="scss">
    .ids{
        width:100%;
        /deep/ .el-form-item__content{
            width:100%;
        }
    }
   /deep/ .el-card__body .item{
        margin: 5px 0;
    }
</style>
