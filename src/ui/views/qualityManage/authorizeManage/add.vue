<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                授权管理-{{type=='addA'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
            </div>
            <div v-if="type!='info'"  class="QheadRight">
                <div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="save"></icon>保存
                </div>
                <div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
                    <icon iconClass="reset"></icon>重置
                </div>
            </div>
        </div>

        <div :class=" type=='info'?'G_form G_formInfo':'G_form'"  >
            <el-form  label-position="left" :model="form" :rules="rules" :inline="true" ref="form" >
                <div></div>
                <div class="row_tow">

                    <el-form-item label="员工姓名：" prop="userName">
                        <span v-if="type=='info'">{{  form.userName }}</span>
                         <el-select :disabled="type=='edit'" @change="userNumberC" filterable   v-else v-model="form.userName" placeholder="请选择员工姓名">
                            <el-option v-for="(opt,index) in userArr"  :key="index" :label="opt.userName" :value="opt.userId">
                                <span>{{opt.userName}}-{{opt.userNumber}}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="员工编号："  >
                        <span v-if="type=='info'">{{  form.userNumber }}</span>
                        <el-input :disabled="true" v-else v-model="form.userNumber" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>

                </div>

                <div class="row_tow">
                    <el-form-item  label="部门/项目：" prop="dept">
                        <span v-if="type=='info'">{{  form.dept || '--'}}</span>
                        <el-input :disabled="true" v-else v-model="form.dept" placeholder="由员工名称选择带出"></el-input>

                    </el-form-item>
                    <el-form-item label="岗位：" prop="post">
                        <span v-if="type=='info'">{{form.post || '--'}}</span>
                        <el-input :disabled="true" v-else v-model="form.post" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="岗位等级：" prop="postLevel">
                        <span v-if="type=='info'">{{  form.postLevel || '--'}}</span>
                        <el-input :disabled="true" v-else v-model="form.postLevel" placeholder="由员工名称选择带出"></el-input>

                    </el-form-item>
                    <el-form-item label="岗位序列：" prop="postSeri">
                        <span v-if="type=='info'">{{form.postSeri || '--'}}</span>
                        <el-input :disabled="true" v-else v-model="form.postSeri" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="职位：" prop="job">
                        <span v-if="type=='info'">{{  form.job || '--'}}</span>
                        <el-input :disabled="true" v-else v-model="form.job" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>
                </div>

                <div class="row_tow">
                    <el-form-item  label="授权类型：" prop="authorizationType">
                        <span v-if="type=='info'">{{  form.authorizationType || '--'}}</span>
                         <el-select     v-else v-model="form.authorizationType" placeholder="请选择授权类型">
                            <el-option v-for="(opt,index) in options.roleControl" :key="index" :label="opt.valData" :value="opt.valData">
                             </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="授权单位：" prop="authorizedUnitCode">
                        <span v-if="type=='info'">{{  form.authorizedUnit || '--'}}</span>
                         <el-select @change="authorizedUnitC"  filterable v-else v-model="form.authorizedUnit" placeholder="请选择授权单位" clearable>
                             <!--shortName-->
                            <el-option v-for="(opt,index) in Airline" :key="index" :label="opt.fullname" :value="opt.id">
                             </el-option>
                        </el-select>
                    </el-form-item>

                </div>
                <div class="row_one">
                    <el-form-item  label="授权机型范围：" prop="modelRange">

                        <el-button v-if="type!='info'" @click="openAircraftType" type="primary" style="margin-bottom: 10px;padding: 9px 30px;">选择</el-button>

                        <el-card class="box-card" shadow="never" border-radius="2px">
                            <div>已选择({{ form.modelRange.length }})：<el-button style="float:right" :disabled="type=='info'" size="mini" @click="handleClear">清空</el-button></div>
                            <el-scrollbar style="height:120px ">
                                <el-tag :key="tag.id" v-for="tag in form.modelRange||[]" :closable="type!='info'" :disable-transitions="false" @close="  handleRemove(tag.id)">
                                    {{ tag.models&&tag.models.length?`${tag.iata}（${tag.models.join(',')}）`:`${tag.name}`}}
                                </el-tag>
                            </el-scrollbar>
                        </el-card>
                    </el-form-item>


                </div>
                <div class="row_one">
                    <el-form-item  label="授权机型说明："  >
                        <span v-if="type=='info'">{{  form.modelRangeRemark || '--'}}</span>
                        <el-input   v-else v-model="form.modelRangeRemark" placeholder="请输入授权机型说明"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="授权航班类型：" prop="flightType">
                        <span v-if="type=='info'">{{  form.flightType || '--'}}</span>
                        <el-select multiple  filterable v-else v-model="form.flightType" placeholder="请选择授权航班类型" clearable>
                            <el-option v-for="(opt,index) in options.accreditFlightType" :key="index" :label="opt.valData" :value="opt.valData">
                            </el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item  label="授权生效日期：" prop="startTime">
                        <span v-if="type=='info'">{{ form.startTime?moment(form.startTime).format('YYYY-MM-DD'):'--'}}</span>
                        <el-date-picker  @focus="focus" :picker-options="pickerOptions" type="date" v-else v-model="form.startTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>


                </div>
                <div class="row_tow" >

                    <el-form-item  label="授权状态："  >
                        <span v-if="type=='info'">{{  form.state }}</span>

                        <el-input :disabled="true" v-else v-model="form.state" placeholder=" "></el-input>

                    </el-form-item>
                    <el-form-item  label="授权失效日期：" prop="endTime">
                        <span v-if="type=='info'">{{ form.endTime?moment(form.endTime).format('YYYY-MM-DD'):'--'}}</span>
                        <el-date-picker :disabled="type=='edit'&&dateDis" @focus="focus1" :picker-options="pickerOptions1" type="date" v-else v-model="form.endTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                </div>

            </el-form>
        </div>
        <div style="text-align: center" class="footerB" >
            <el-button type="primary" @click="fabu" v-if="(type==='edit'&&form.state!=='已授权')||type==='addA'">授权发布</el-button>
            <el-button type="primary" v-if="type==='edit' && form.state==='已授权'" @click="quxiao" style="margin: 0 15px " >授权取消</el-button>
            <el-button type="primary"   @click="yanqi" v-if="type==='edit' && form.state==='已授权'"> 授权延期</el-button>
        </div>
        <AircraftType ref="AircraftType" @getAircratType="getAircratType"></AircraftType>
    </div>
</template>
<script>
    import {eleDateShow,inputLength} from '@lib/tools'

    import moment from "moment";
    import AircraftType from './AircraftType.vue'
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend ,map} from "lodash";
    export default {
        components: {
            Icon,AircraftType
        },
        name: "",
        data() {


            return {
                pickerOptions: {},
                pickerOptions1: {},
                moment:moment,
                oldForm:{},
                userObj:{},
                dateDis:true,
                form: {modelRange:[]},
                userArr:[],
                 Airline:[],
                AircratS:[],
                options: {},
                 rules: {
                     userName: [{ required:true,message:'请输入员工姓名',}],
                     name: [{ required:true,message:'请输入证书名称',}],
                     number: [{ required:true,message:'请输入证书编号',}],
                     endTime: [{ required:true,message:'请选择时间', }],
                     startTime: [{ required:true,message:'请选择时间',}],
                     authorizationType: [{ required:true,message:'请选择授权类型'}],
                },
                type: "addA"
            };
        },
        created() {
            if (this.$route.query) {

                this.type = this.$route.path.substring(1,5);
                console.log(this.type);
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["roleControl",'accreditFlightType' ]
                }).then(d => {
                    let obj=d.data
                    this.options=obj
                });
                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=Airline`,
                    method: 'get',
                }).then(d => {
                    if( d.data&&d.data.length){
                        this.Airline=d.data

                    }
                });

                request({
                    url:`${this.$ip}/mms-qualification/userRecord/list`,
                    method: 'post',
                    params:{size:10000,current:1},
                    data:{}
                }).then((data) => {
                    if(data.data&&data.data.records){
                        this.userArr =data.data.records
                        data.data.records.map((k,l)=>{
                             this.userObj[k.userId]=k.userNumber
                        })
                    }
                    })


                 if(this.type!='addA'){
                   this.getInfo()
                 }
            }
        },
        mounted(){
            inputLength(this)
            eleDateShow()
        },
        computed:{

        },
        methods: {
            authorizedUnitC(val){
                let len=this.Airline.length
                for(let i=0;i<len;i++){
                    if(this.Airline[i].id==val){
                        this.$set(this.form,'authorizedUnit',this.Airline[i].fullname)
                        this.$set(this.form,'authorizedUnitCode',this.Airline[i].iata)
                        console.log(this.form.authorizedUnit);
                        break
                    }
                 }
            },
            openAircraftType(){
                this.$refs.AircraftType.open(this.form.modelRange)
            },
            getAircratType(data1){
                this.$set(this.form,'modelRange',data1)
                // this.$set(this.form,'modelRange',data.join(';'))
            },

            fabu(){
                 this.saveForm('form', 1).then((d)=>{
                    let obj={
                        id:this.form.id,
                        endTime:this.form.endTime||null
                    }
                    if(this.type=='addA'){
                        obj={
                            id:d.id,
                            endTime:d.endTime?this.moment(d.endTime).format('YYYY-MM-DD'):null
                        }
                    }
                     request({
                        url:`${this.$ip}/mms-qualification/authorization/authorizationPublish`,
                        method: "post",
                        data:obj
                    }).then(d => {
                        this.$message.success('操作成功');
                        this.$router.go(-1)
                    }).catch(error => {
                        this.$message.error(error);
                    });
                })

            },
            quxiao(){
                this.saveForm('form', 1).then((d)=>{
                    request({
                        url:`${this.$ip}/mms-qualification/authorization/authorizationCancel`,
                        method: "post",
                        data:{
                            id:this.form.id,
                        }
                    }).then(d => {
                        this.$message.success('操作成功');
                        this.$router.go(-1)
                    }).catch(error => {
                        this.$message.error(error);
                    });
                })

            },
            yanqi(){
                this.dateDis=false
            },
            getInfo(){
                request({
                    url:`${this.$ip}/mms-qualification/authorization/getById/${this.$route.query.id}`,
                    method: "get",
                }).then(d => {
                   if(d.data){
                       let obj=d.data
                       if(this.type=='edit'){
                           obj.flightType=obj.flightType?obj.flightType.split(';'):[]
                        }
                       if(obj.modelRange){
                           obj.modelRange=obj.modelRange.split(';').map((k,l)=>{

                               let reg = /(.{1,})\*\*\*(.*)\$\$\$(.*)__(.*)/g;
                               reg.test(k)
                               return {
                                   name: RegExp.$1,
                                   iata: RegExp.$2,
                                   models: RegExp.$3?RegExp.$3.split(','):[],
                                   id: RegExp.$4,
                               }
                           })
                        }else{
                           obj.modelRange=[]
                       }

                       if( obj.state===0){
                           obj.state= '未授权'
                       }else if( obj.state===1){
                           obj.state= '已授权'
                       }else if( obj.state===2){
                           obj.state= '授权取消'
                       }
                       this.form={...obj }
                   }
                }).catch(error => {
                    this.$message.error(error);
                });

            },
            handleClear() {
               this.form.modelRange=[]
            },
            handleRemove(id) {

                const idx = this.form.modelRange.findIndex((d) => d.id === id);
                if (idx > -1) {
                    this.form.modelRange.splice(idx,1)
                }
            },
            userNumberC(val){
                request({
                    url:`${this.$ip}/mms-qualification/userRecord/getByUserNumber/${val}`,
                    method: "get",
                }).then(d => {
                    if(d.data){
                        this.form={...this.form,
                            userName:d.data.userName,
                            userId:val,
                            deptCode:d.data.deptCode,
                            userNumber:this.userObj[val],
                            dept:''
                        }

                        if(d.data.positionInfList&&d.data.positionInfList.length){
                            let obj=d.data.positionInfList[0]
                            this.form={...this.form,

                                post:obj.station,
                                postLevel:obj.stationLevel,
                                postSeri:obj.stationSequence,
                                job:obj.post,
                            }
                        }
                        request({
                            url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                            method: 'post',
                            params: {delete: false},
                            data: ['dept']
                        }).then(res => {
                            if (res.code === 200) {
                                res.data.dept.map((k, l) => {
                                    if (d.data.deptCode===k.valCode){
                                        this.form.dept=k.valData;
                                    }
                                })
                            }
                        });
                    }

                }).catch(error => {
                    this.$message.error(error);
                });

            },
            resetForm(){
                if(this.form.id){
                    this.form.authorizationType = "";
                    this.form.authorizedUnitCode = "";
                    this.form.modelRangeRemark = "";
                    this.form.flightType = "";
                    this.form.startTime = null;
                    this.form.modelRange = [];
                }else{
                    this.form = { modelRange:[]};
                }
            },
             saveForm(form,num) {
                 return new Promise((resolve, reject)=>{
                     if (this.type == "addA" || this.type == "edit") {
                         this.$refs[form].validate(valid => {
                             if (valid) {
                                 let url
                                 if(this.type=='addA'){
                                     url='/authorization/save'
                                 }else {
                                     url='/authorization/update'
                                 }
                                 let obj={...this.form};
                                 if(obj.flightType){
                                     obj.flightType=obj.flightType.join(';')
                                 }
                                 let modelRange=[]
                                 if(obj.modelRange.length){
                                     modelRange=obj.modelRange.map((k,l)=>{
                                          let msg=`${k.name}***${k.iata}$$$${k.models.join(',')}__${k.id}`
                                         return  msg
                                     })
                                 }
                                 obj.modelRange=modelRange.join(';')
                                 request({
                                     url:`${this.$ip}/mms-qualification${url}`,
                                     method: 'post',
                                     data:obj,
                                 }).then((data) => {
                                     if(data.code==200){

                                         if(num!=1){
                                             this.$message.success("保存成功！");
                                             this.$router.go(-1)
                                         }else{
                                             resolve(data.data)
                                         }
                                      }else{
                                         reject(false)
                                     }

                                 })

                             }
                         });
                     }
                 })
            },
            focus(val){
                let e=new Date(this.form.endTime)
                let s=new Date(this.form.startTime)
                let t=new Date()

                this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() >= e.getTime();
                            // return time.getTime() > e.getTime()||time.getTime() > t.getTime();
                        }
                    },
                };
            } ,
            focus1(val){
                let e=new Date(this.form.endTime)
                let s=new Date(this.form.startTime)
                let t=new Date()
                this.pickerOptions1 = {
                    disabledDate(time) {
                        // console.log(1, 8);
                        if (s) {
                            return time.getTime() <= s.getTime() ;
                            // return time.getTime() < s.getTime()|| time.getTime() > t.getTime() ;
                        }
                    },
                };
            },

        }
    };
</script>
<style scoped lang="scss">
    .indexAdd{
        padding: 0 30px;
        .footerB{
            /*margin : 15px 0 0 15px;*/
            /deep/ .el-button{
                padding: 12px 30px;
                border-radius: 5px;
            }
        }
     }
    .G_form{
        /*height:calc(100vh - 300px);*/
        /deep/.el-form {
            height: calc(100vh - 290px);
            .el-form-item__label{
                width: 140px;

            }
            .el-form-item__content{
                width: calc(100% - 180px);
            }
        }
    }
    /deep/ .el-card{
        .el-card__body {
            padding: 10px;
        }
        .el-card__body > div:first-child {
            padding: 0px;
            margin-top: 5px;
            line-height: 15px;
        }
        .el-tag  {
            margin-right: 5px;

        }
    }

</style>
