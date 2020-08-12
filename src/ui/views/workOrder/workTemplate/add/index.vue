<template>
    <div>
        <div  class="addindex" :key="this.$route.query.type" >

        <div class="left">
            <Details ref="Details" v-if="type=='info'"></Details>
            <div v-else>
                <div class="QCenterRight">
                    <div class="QHead">
                        {{title}}
                    </div>
                    <div class="QheadRight" >
                        <el-button @click="upTemplate" v-if="radio==4" class="QoptionButton1"><icon-svg iconClass="upload"></icon-svg>上传模板</el-button>
                        <el-button @click="upTemplate"   class="QoptionButton1"><icon-svg iconClass="upload"></icon-svg>上传模板</el-button>
                        <el-button @click="copyHistory" v-if="radio==1&&type!='add'" class="QoptionButton1"  ><icon-svg iconClass="copy"></icon-svg>复制历史模板</el-button>
                    </div>

                </div>
                <div class="banner">
                    <div class="bannerHead">
                        <label @click="radioClick(1)"   :class="radio==1?'el-radio is-checked':'el-radio'">
                        <span  :class="radio==1?'el-radio__input is-checked':'el-radio__input'">
                          <span class="el-radio__inner"></span>
                         <span   class="el-radio__original"  ></span>
                         <span class="el-radio__label" :style="{color:radio==1?'#3280E7':''}">工单类型配置</span>
                        </span>
                        </label>
                        <i class="el-icon-arrow-right"> </i>
                        <label @click="radioClick(2)"     :class="radio==2?'el-radio is-checked':'el-radio'">
                        <span  :class="radio==2?'el-radio__input is-checked':'el-radio__input'">
                          <span class="el-radio__inner"></span>
                         <span   class="el-radio__original"  ></span>
                         <span class="el-radio__label" :style="{color:radio==2?'#3280E7':''}">基本信息配置</span>
                        </span>
                        </label>
                        <i class="el-icon-arrow-right"> </i>
                        <label @click="radioClick(3)"     :class="radio==3?'el-radio is-checked':'el-radio'">
                        <span  :class="radio==3?'el-radio__input is-checked':'el-radio__input'">
                          <span class="el-radio__inner"></span>
                         <span   class="el-radio__original"  ></span>
                         <span class="el-radio__label" :style="{color:radio==3?'#3280E7':''}">工作标签与布局</span>
                        </span>
                        </label>
                        <i class="el-icon-arrow-right"> </i>
                        <label @click="radioClick(4)"     :class="radio==4?'el-radio is-checked':'el-radio'">
                        <span  :class="radio==4?'el-radio__input is-checked':'el-radio__input'">
                          <span class="el-radio__inner"></span>
                         <span   class="el-radio__original"  ></span>
                         <span class="el-radio__label" :style="{color:radio==4?'#3280E7':''}">工作项与内容配置</span>
                        </span>
                        </label>
                    </div>
                    <div class="component">
                        <One ref="One" :type="type" :formData="form.typeVO " v-if="radio==1" :key="(new Date().toString())"></One>
                        <Two ref="Two" :type="type" :formData="form.contentVOList      " v-else-if="radio==2" :key="(new Date().toString())"></Two>
                        <Three ref="Three" :type="type" :formData="form.baseItemVOList" v-else-if="radio==3" :key="(new Date().toString())"></Three>
                        <Four ref="Four" :type="type" :formData="form.baseItemVOList" v-else :key="(new Date().toString())"></Four>
                    </div>
                </div>
                <div class="Qfooter">
                    <el-button   v-if="radio>1" @click="last()">上一步</el-button>
                    <el-button   @click="save()">保存</el-button>
                    <el-button   type="primary" @click="save('submit')">提交</el-button>
                    <el-button    v-if="radio<4" @click="next()">下一步</el-button>

                </div>
            </div>

        </div>
        <div class="right">
            <See ref="See" ></See>
        </div>
        <CopyHistory ref="CopyHistory" @getList="update" ></CopyHistory>
        <UploadModule ref="UploadModule"  ></UploadModule>
    </div>

    </div>

</template>

<script>
    import { extend ,map} from "lodash";

    import request from '@lib/axios.js';
     import One from './one'
     import Two from './two'
     import Three from './three'
     import Four from './four2'
     import See from './see'
     import Details from './details'
     import CopyHistory from './copyHistory'
     import UploadModule from './uploadModule'
    export default {
        name: "index",
        components: {One,Two,Three,Four,See,Details,CopyHistory,UploadModule},
        data() {
            return {
                title:'',
                type:'add',
                form:{ },
                radio:1,
                seeIndex:1,

            }
        },

        watch:{
          'radio'(val){

          }  ,
        },
        methods: {
            update(data){
                  this.$router.push({path:'/WorkTemplateAdd',query:{type:'edit',id:data.typeVO.id}})
            },
            radioClick(val){
                 if(val==this.radio){
                     return false
                 }
                 this.save('radio',val)
            },
            upTemplate(){
               this.$refs.UploadModule.open(this.$route.query.id)
            },

            copyHistory(){
                let code=this.$refs.One.getForm()
                this.$refs.CopyHistory.open(code)
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
                    this.$refs.See.getInfo()
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
                    this.$refs.See.getInfo()
                    this.upState(id)
                     if(this.radio<4){
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
            save(type,num){
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
                    this.$refs.See.getInfo()
                    this.upState(id)
                     if(type=='submit'){
                        this.submit(id)
                    }else if(type=='radio'){
                         this.radio=num
                         this.$message.success("保存成功")
                     }else{
                         this.$message.success("保存成功")
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

        },
        created() {
            // console.log(this.$moment(new Date(), 'YYYY-MM-DD HH:mm:ss').split(' ')[1].split(':').join(''));

            this.init()
        },

    }
</script>

<style lang="scss" scoped>
.addindex{
    display: flex;justify-content: left;
    height:calc(100vh - 89px);
    border-bottom: 1px #e4e8eb solid;
    .left{
        width:calc(100% - 600px);
        padding: 0 30px;
        .QoptionButton{
            border-radius: 5px;
            padding: 10px 25px;
        }
        .banner{
            .bannerHead{
                display: flex;
                justify-content: left;
                align-items: center;
                .el-icon-arrow-right{
                    margin: 0 14px!important;
                }
                /deep/ .el-radio{
                    margin:0; opacity: .6;

                    .el-radio__input {
                        display: flex;
                        justify-content: left;
                        align-items: center;
                    }
                    .el-radio__label{
                        font-size: 16px;
                    }
                    .el-radio__inner{
                        height:16px;
                        width:16px;
                        border: 2px solid #888888;
                    }
                    .el-radio__input.is-checked{
                        opacity: 1;
                        .el-radio__inner{
                            background: white;
                            border: 2px solid #3280e7;
                        }
                        .el-radio__inner:after{
                            background-color:#3280e7;
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
        width:600px;
        border-left: 1px #e4e8eb solid;

    }
}
.Qfooter{

    /deep/ .el-button:last-child{
        border: 1px solid #b9b9b9;

    }
}
    .QoptionButton1{
        padding:7px 10px;
        border: 1px solid #d0d0d0;

    }
</style>