<template>
    <div class="addindex" :key="this.$route.query.type" >
        <div class="left">
            <div class="QCenterRight">
                <div class="QHead">
                    {{title}}
                </div>
                <div class="QheadRight" >
                    <el-button @click="upTemplate" v-if="radio==3" class="QoptionButton">上传模板</el-button>
                    <el-button @click="copyHistory" v-if="radio==1&&type!='add'" class="QoptionButton"  >复制历史模板</el-button>
                 </div>
                <div style="display: none">
                <UploadFile  accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg" ref="UploadFile" @getFile="getFile"></UploadFile>

            </div>

            </div>
            <div class="banner">
                <div class="bannerHead">
                    <el-radio  v-model="radio" :label="1" @change="radioClick">工单类型配置</el-radio>
                    <i class="el-icon-arrow-right"> </i>
                    <el-radio  v-model="radio" :label="2" @change="radioClick">基本信息配置</el-radio>
                    <i class="el-icon-arrow-right"> </i>
                    <el-radio  v-model="radio" :label="3" @change="radioClick">工作标签与布局</el-radio>
                 <i class="el-icon-arrow-right"> </i>
                    <el-radio  v-model="radio" :label="4" @change="radioClick">工作项与内容配置</el-radio>
                 </div>
                <div class="component">
                    <One ref="One" :type="type" :formData="form.typeVO " v-if="radio==4" :key="(new Date().toString())"></One>
                    <Two ref="Two" :type="type" :formData="form.contentVOList      " v-else-if="radio==2" :key="(new Date().toString())"></Two>
                    <Three ref="Three" :type="type" :formData="form.baseItemVOList" v-else-if="radio==3" :key="(new Date().toString())"></Three>
                    <Four ref="Four" :type="type" :formData="form.baseItemVOList" v-else :key="(new Date().toString())"></Four>
                </div>
            </div>
            <div class="Qfooter">
                <el-button class="QoptionButton" v-if="radio>1" @click="last()">上一步</el-button>
                <el-button class="QoptionButton" @click="save()">保存</el-button>
                <el-button class="QoptionButton" @click="save('submit')">提交</el-button>
                <el-button class="QoptionButton"  v-if="radio<4" @click="next()">下一步</el-button>

            </div>
        </div>
        <div class="right">



        </div>
        <CopyHistory ref="CopyHistory" ></CopyHistory>
    </div>
</template>

<script>
    import { extend ,map} from "lodash";

    import request from '@lib/axios.js';
     import One from './one'
     import Two from './two'
     import Three from './three'
     import Four from './four'
     import CopyHistory from './copyHistory'
    export default {
        name: "index",
        components: {One,Two,Three,Four,CopyHistory},
        data() {
            return {
                title:'',
                type:'add',
                form:{ },
                radio:1,

            }
        },

        watch:{
          'radio'(val){

          }  ,
        },
        methods: {
            radioClick(val){
                console.log(val,1,2);
            },
            upTemplate(){
                this.$refs.UploadFile.$refs.buttonClick.$el.click()

            },
            copyHistory(){
                let code=this.$refs.One.getForm()
                this.$refs.CopyHistory.open(code)
            },
            getFile(file){
                // this.$refs.One.modulesId(file.id)
            },
            last(){
                let path= this.$router.history.current.path
                let comName=''
                if(this.radio==3){
                    comName='Three'
                }else if(this.radio==2){
                    comName='Two'
                }else if(this.radio==4){
                    comName='Four'
                }
                let redesign=null
                if(this.type=='redesign'){
                    redesign='redesign'
                }
                this.$refs[comName].save('form',redesign).then(()=>{
                    if(this.radio>1){
                        this.radio--
                    }
                })
            },
            next(){
                let path= this.$router.history.current.path
               let comName=''

                if(this.radio==1){
                    comName='One'
                }else if(this.radio==2){
                    comName='Two'
                }else if(this.radio==3){
                    comName='Three'
                }
                this.$refs[comName].save('form').then((id)=>{
                    this.upState(id)
                     if(this.radio<3){
                        this.radio++
                    }
                })
            },

            upState(id){
                if(this.type=='add'&&this.radio==1){
                    this.$router.push({path:'/WorkTemplateAdd',query:{type:'edit',id:this.$route.query.id||id}})
                    this.init()
                }
            },
            save(submit){
                let comName=''
                if(this.radio==1){
                    comName='One'
                }else if(this.radio==2){
                    comName='Two'
                }else if(this.radio==3){
                    comName='Three'
                }else if(this.radio==4){
                    comName='Four'
                }
                this.$refs[comName].save('form').then((id)=>{
                    this.upState(id)
                    debugger
                     if(submit=='submit'){
                        this.submit(id)
                    }
                })

            }, 
            submit( id){
                request({
                    url:`${this.$ip}/mms-workorder/template/submit/${this.$route.query.id||id}`,
                    method: 'get',

                }).then(d => {
                    if( d.code==200){
                        this.$message.success("提交成功")
                    }
                });

            },
            init(){
                this.type=this.$route.query.type
                this.title =
                    this.type == "add"
                        ?  "新增工单模板配置"
                        : this.type == "edit"
                        ?  "编辑工单模板配置"
                        : this.type == "info"
                            ?  "工单模板配置详情"
                            : this.type == "redesign"
                                ?'工单模板改版':''
                this.$route.meta.title=this.title
            },
            getInfo( id){
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                    // params:{id:id||this.$route.query.id}
                }).then((data) => {
                    this.form = extend({}, {...data.data});

                })
            }
        },
        created() {
            // this.getInfo()
            this.init()
        },

    }
</script>

<style lang="scss" scoped>
.addindex{
    display: flex;justify-content: left;
    height:calc(100vh - 110px);
    .left{
        width:calc(100% - 500px);
        padding: 0 30px;
        .QoptionButton{
            border-radius: 5px;
            padding: 10px 25px;
        }
        .banner{
            .bannerHead{

                /deep/ .el-radio{
                    margin:0; opacity: .6;

                    .el-icon-arrow-right{
                        margin: 0 20px;
                    }

                    .el-radio__label{
                        color:black
                    }

                    .el-radio__input.is-checked{
                        opacity: 1;
                        .el-radio__inner{
                            background: white;
                            border-color:black ;
                        }
                        .el-radio__inner:after{
                            background-color:black;
                        }
                    }
                }
                /deep/ .is-checked{
                    opacity: 1;
                }

            }
        }
        .component{
            margin: 30px 0;
        }

    }
    .right{
        width:500px;
        border-left: 1px #E4E8EB solid;
    }
}
</style>