<template>
    <div class="three">
        <div class="threeHead G_form">

                <el-form ref="form" label-position="right" :model="form" :rules="rules"  :inline="true"  >
                    <div class="row_five one" >
                        <el-form-item  label="内容布局方式：" prop="contentLayout">
                            <el-select   @change="contentLayout"   v-model="form.contentLayout" placeholder="请选择">
                                <el-option v-for="(opt,index) in options.contentLayoutType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_five" style="margin-top: 30px">
                        <el-form-item  label="项次标签：" prop="itemLabel">
                             <el-input   v-model="form.itemLabel" placeholder="请输入中文 "></el-input>
                             <el-input   v-model="form.itemLabelEnglish" placeholder="请输入英文 "></el-input>
                        </el-form-item>
                        <el-form-item  label="内容标签：" prop="contentLabel" v-if="form.contentLayout=='R2（二列）'||form.contentLayout=='C3（三列）'||form.contentLayout=='C4（四列）'">
                            <el-input   v-model="form.contentLabel" placeholder="请输入中文 "></el-input>
                            <el-input   v-model="form.contentLabelEnglish" placeholder="请输入英文 "></el-input>                        </el-form-item>
                        <el-form-item  label="工作者标签：" prop="workerLabel	"  v-if="form.contentLayout=='C3（三列）'||form.contentLayout=='C4（四列）'">
                            <el-input   v-model="form.workerLabel	" placeholder="请输入中文 "></el-input>
                            <el-input   v-model="form.workerLabelEnglish" placeholder="请输入英文 "></el-input>                        </el-form-item>
                        <el-form-item  label="指挥者标签：" prop="commanderLabel" v-if="form.contentLayout=='C4（四列）'">
                            <el-input   v-model="form.commanderLabel" placeholder="请输入中文 "></el-input>
                            <el-input   v-model="form.commanderLabelEnglish" placeholder="请输入英文 "></el-input>
                        </el-form-item>
                    </div>
                </el-form>
        </div>


    </div>
</template>

<script>
     import request from '@lib/axios.js';
    export default {
        name: "three",
        props:{
            type:String,
        },
        components: { },
        data() {
            return {
                form:{templateBaseId:this.$route.query.id,contentLayout:'R2（二列）'},
                options:{},
                 rules:{},
            }
        },
        watch: {


        },
        methods: {
            contentLayout(val){
                 if(val=='R2（二列）'){
                     delete this.form.commanderLabel
                     delete this.form.commanderLabelEnglish
                     delete this.form.workerLabel
                     delete this.form.workerLabelEnglish
                }else if(val=='C3（三列）'){
                     delete this.form.commanderLabel
                     delete this.form.commanderLabelEnglish
                }
            },
            save (form){
                 return new Promise((resolve, reject)=>{
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url=this.form.id?'/templateLabel/update':'/templateLabel/save'
                            request({
                                url:`${this.$ip}/mms-workorder${url}`,
                                method: 'post',
                                data:this.form,
                            }).then((d) => {
                                if(d.code==200){
                                    this.$message.success('操作成功')
                                this.getInfo()
                                    resolve(true)
                                }

                            })
                        }
                    });
                })
            },
            getInfo( ){
                request({
                    url:`${this.$ip}/mms-workorder/templateLabel/selectByParam`,
                    method: 'post',
                    data:{templateBaseId:this.$route.query.id}
                }).then((d) => {
                    if(d.code==200){
                        this.form={...d.data,templateBaseId:this.$route.query.id}
                     }
                })
            }
        },
        created() {
            this.getInfo()
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["contentLayoutType"]
            }).then(d => {
                let obj=d.data
                this.options=obj
            });
        },
    }
</script>

<style lang="scss" scoped>


    .G_form{
         margin: 0;
         /deep/ .el-form{
             height:auto;
            margin-bottom: 30px;
             text-align: left;
            width: 100%;
             padding: 0;
             .row_five{
                 .el-form-item{
                     padding-left: 30px;
                     margin : 0;
                     .el-input:nth-child(2){
                          margin-top: 15px;
                     }
                 }


                 .el-form-item__content{
                     width: 150px;
                 }
                 .el-input{
                     width:150px;
                 }
                 .el-form-item__label{
                     width: auto;
                     text-align: left;
                     padding: 0;
                 }
             }


        };

    }

</style>