<template>
    <div class="onlineTest "  >
        <div class="QCenterRight">
            <div class="QHead">
                {{this.$store.state.user.userInfo.name}}&nbsp;&nbsp;在线考试
            </div>
            <div  class="QheadRight">

                <div @click="resetForm()" :class="type=='info'?'isDisabled':''">
                    <icon  iconClass="reset "></icon>重置
                </div>
                <div @click="tishi(endTest)" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="save" style="width: 0"></icon>结束考试
                </div>
            </div>
        </div>
        <div class="bannerCenter "  >
            <span>考试时长{{infoData.totalTime}}分钟</span>
            <span>共{{testData.length}}题</span>

            <span>离考试结束还有：<span style="color: #3280e7">{{Math.floor(testime/60)}}分钟{{testime%60}}秒</span></span>
        </div>
     <div style="display: flex;justify-content: center" >
         <div class="form"  v-if="testData.length">

             <div class="formhead">
                 <div>题目{{adata.questionNo}}</div>
                 <div>({{adata.score}}分)</div>
             </div>
             <div class="formBody">
                 <div class="formLeft"  >
                     ({{adata.optionType}}题 )
                 </div>
                 <div class="formRight">
                     <el-form    :model="form" :rules="rules" ref="form" >
                         <div style="font-size: 20px;font-weight: bold">{{adata.questionName}}

                             （<i v-if="form.employeeAnswer">{{this.testData[this.numIndex].optionType=='多选'?form.employeeAnswer.join(";"):form.employeeAnswer}}</i>）
                         </div>
                         <el-form-item label="" prop="infTime1">
                             <el-checkbox-group v-if="adata.optionType=='多选'" v-model="form.employeeAnswer"  >
                                 <el-checkbox v-if="adata[k]"  v-for="(k,l) in optionObj"  :key="l"   :label="l">{{l}}、{{adata[k]}}</el-checkbox>
                             </el-checkbox-group>
                             <el-radio-group v-else v-model="form.employeeAnswer"  >
                                 <el-radio    v-if="adata[k]"  v-for="(k,l) in optionObj"   :key="l"  :label="l">{{l}}、{{adata[k]}}</el-radio>
                             </el-radio-group>

                         </el-form-item>
                     </el-form>

                 </div>
             </div>

         </div>

         <div v-else class="form" style="height:200px;text-align: center;line-height: 200px;color:rgba(140,140,140,0.67)">
             暂无试题
         </div>
     </div>

        <div class="Qfooter" v-if="testData.length" >
            <el-button @click="last" :disabled="numIndex<=0">上一题</el-button>
            <el-button @click="saveForm('form')">保存</el-button>
            <el-button type="primary" @click="next" :disabled="numIndex>=testData.length-1">下一题</el-button>
        </div>
    </div>
</template>
<script>
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend } from "lodash";
    export default {
        components: {
            Icon
        },
        name: "",
        data() {

            return {
                optionObj:{
                  A:'optionA'  ,
                  B:'optionB'  ,
                  C:'optionC'  ,
                  D:'optionD'  ,
                  E:'optionE'  ,
                  F:'optionF'  ,
                },
                endTest1:this.endTest,
                numIndex:0,
                 form: {employeeAnswer:'' },
                rules: {
                    aa:[{required:true,message:'请输入',trigger:'blue'}]
                },
                type: "add",
                testime:0,
                timer:null,
                params:{},
                infoData:{},
                pathBlo:true,
                testData:[]
            };
        },
        computed:{
          adata(){
              return this.testData[this.numIndex]||{}
          },
        },
        beforeRouteLeave(to, from, next){
            console.log(to, from,112222);
                if(from.path=='/onlineTestDo'&&this.pathBlo){
                    this.tishi(()=>{this.endTest(1,next)})
               }else{
                   next();
               }
        },
        created() {
            if (this.$route.query) {
                request({
                    url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                    method: "get",
                }).then(d => {
                    let row=d.data
                     this.params={
                        employeeId:this.$store.state.user.userInfo.workNumber,
                        examId:row.id,
                        paperId:row.paperId,
                    }
                    this.infoData={...row}
                    this.testime=(row.totalTime*60)-1
                    this.getList(1)
                }).catch(error => {
                    this.$message.error(error);
                });

            }
        },
        mounted(){

        },
        methods: {

            resetForm(){
                if(this.testData[this.numIndex].optionType=='多选'){
                    this.form.employeeAnswer=[]
                }else {
                    this.form={employeeAnswer:''};
                }
                request({
                    url: `${this.$ip}/mms-training/examLine/reset`,
                    method:'post',
                    data:this.params
                }).then((d)=>{
                    this.$message.success('已重置')
                 })
            },

            //
            // employeeId: "dep3f75d281a88d45a888f6f1ec28859e3e"
            // examId: "6dea4d1fdac5eb5ad17876c614ef9f37"
            // paperId: "94c50b2d4d05c890f955ef5afdc389a8"
            // questionId: "1275328574826823681
            getAnser(){
                if(!this.testData.length) return false

                request({
                    url: `${this.$ip}/mms-training/examLine/getAnswer`,
                    method:'post',
                    data:{...this.params,questionId:this.testData[this.numIndex].id}
                }).then((d)=>{
                      if(d.code==200&&d.data&&d.data.length!=0){
                         if(this.testData[this.numIndex].optionType=='多选'){
                            this.form.employeeAnswer=d.data.split(';')
                        }else {
                            this.form.employeeAnswer=d.data

                        }
                    }else {
                        if(this.testData[this.numIndex].optionType=='多选'){
                            this.form.employeeAnswer=[]
                        }else {
                            this.form.employeeAnswer=''

                        }
                    }
                     console.log(this.form.employeeAnswer,1,2);
                })
            },
            next(){
                if(this.numIndex<this.testData.length-1){
                    this.numIndex++
                    this.getAnser()
                }
            },
            last(){
                this.numIndex--
                this.getAnser()
            },
            saveForm(form) {
                if ((this.type == "add" || this.type == "edit" )&&   this.$refs[form]) {
                    this.$refs[form].validate(valid => {
                        let employeeAnswer
                        if (valid) {
                            if(this.adata.optionType=='多选'){
                                employeeAnswer= this.form.employeeAnswer.join(';')
                            }else {
                                employeeAnswer= this.form.employeeAnswer
                            }
                            if(!this.testData.length) return false
                            request({
                                url: `${this.$ip}/mms-training/examLine/save`,
                                method:'post',
                                data:{...this.params,employeeAnswer,questionId:this.testData[this.numIndex].id}
                            }).then((d)=>{
                                this.$message.success('保存成功')
                            })
                        }
                    });
                }
            },
            tishi(fn,f1){
                this.$confirm('此操作结束考试, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                       fn()
                    }).catch(()=>{

                })
            },
            endTest(num,fn) {
                clearTimeout(this.timer)
                request({
                    url: `${this.$ip}/mms-training/examLine/finish`,
                    method:'post',
                    data:this.params
                }).then((d)=>{
                    if(d.code==200){
                        this.$message.success('考试已结束')
                        this.pathBlo=false
                        if(num!=1){
                            this.$router.go(-1)
                        }
                        fn&&fn()
                    }
                })

            },

            getList(num){
                 request({
                     url: `${this.$ip}/mms-training/examLine/join`,
                     method:'post',
                     data:this.params
                 }).then((d)=>{
                     // d.data
                     this.testData=d.data
                     this.getAnser()
                     if(num==1){
                        this.timer= setInterval(()=>{
                             this.testime--
                             if(this.testime==0){
                                 this.endTest()
                             }
                         },1000)
                     }

                 })
            },
        }
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
.onlineTest{
    padding: 0 30px ;


.bannerCenter{
    text-align: center;
    &>span{
        font-size: 16px;
        font-family: SourceHanSansCN, SourceHanSansCN-Regular;
        font-weight: 400;
        text-align: right;
        color: #222222;
    }
    &>span:nth-child(2){
        margin: 0 40px;
    }
}
    .form{
        width: 1000px;
        /*height: 318px;*/
        margin: 26px 0 20px 0;
        border: 1px solid #979797;
        .formhead{
            border-bottom: 1px solid #979797;
            padding: 12px 13px;
            display: flex;justify-content: space-between;
            background: #edf1f5;
            font-size: 16px;
             font-weight: bold;
         }
        .formBody{
            padding:20px 15px;
            display: flex;justify-content: left;
            .formLeft{
                font-size: 20px;
                margin-right: 10px;
                color: #888888;
            }
            .formRight{
                /deep/ .el-form-item{
                    margin: 0!important;
                    .el-form-item__content{
                        line-height: normal;
                    }
                }
                /deep/ .el-checkbox{
                    margin: 20px 0;
                    display: block;
                    height:16px;
                    .el-checkbox__label{
                        font-size: 16px;
                        line-height: 20px;
                        padding-left: 21px;
                        font-size: 16px;

                        color: #222222;
                    }
                    .el-checkbox__input{
                        height: 16px!important;
                        width: 16px;
                        background: #eff2f3;

                    }
                    .el-checkbox__inner{
                        height: 16px;
                        width: 16px;
                    }
                    .is-checked{
                        background: #409EFF;
                    }
                }
                /deep/ .el-radio{
                    margin: 20px 0;
                    display: block;
                    height:16px;
                    .el-radio__label{
                        font-size: 16px;
                        line-height: 20px;
                        padding-left: 21px;
                        font-size: 16px;

                        color: #222222;
                    }
                    .el-radio__input{
                        height: 16px!important;
                        width: 16px;
                        background: #eff2f3;
                        border-radius: 16px;

                    }
                    .el-radio__inner{
                        height: 16px;
                        width: 16px;
                        border-radius: 16px;
                    }
                    .is-checked{
                        background: #409EFF;
                    }
                }
            }
        }
    }


}

</style>
