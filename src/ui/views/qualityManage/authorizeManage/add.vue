<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                授权管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
            <el-form  label-position="right" :model="form" :rules="rules" :inline="true" ref="form" >
                <div></div>
                <div class="row_tow">

                    <el-form-item label="员工姓名：" prop="userName">
                        <span v-if="type=='info'">{{  form.userName }}</span>
                         <el-select @change="userNumberC" filterable v-else v-model="form.userNumber" placeholder="请选择员工姓名">
                            <el-option v-for="(opt,index) in userArr" :key="index" :label="opt.userName" :value="opt.userNumber">
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
                    <el-form-item  label="部门：" prop="dept">
                        <span v-if="type=='info'">{{  form.dept }}</span>
                        <el-input :disabled="true" v-else v-model="form.dept" placeholder="由员工名称选择带出"></el-input>

                    </el-form-item>
                    <el-form-item label="岗位：" prop="post">
                        <span v-if="type=='info'">{{form.post}}</span>
                        <el-input :disabled="true" v-else v-model="form.post" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="岗位等级：" prop="postLevel">
                        <span v-if="type=='info'">{{  form.postLevel }}</span>
                        <el-input :disabled="true" v-else v-model="form.postLevel" placeholder="由员工名称选择带出"></el-input>

                    </el-form-item>
                    <el-form-item label="岗位序列：" prop="postSeri">
                        <span v-if="type=='info'">{{form.postSeri}}</span>
                        <el-input :disabled="true" v-else v-model="form.postSeri" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="职位：" prop="job">
                        <span v-if="type=='info'">{{  form.job }}</span>
                        <el-input :disabled="true" v-else v-model="form.job" placeholder="由员工名称选择带出"></el-input>
                    </el-form-item>
                </div>

                <div class="row_tow">
                    <el-form-item  label="授权类型：" prop="authorizationType">
                        <span v-if="type=='info'">{{  form.authorizationType }}</span>
                         <el-select     v-else v-model="form.authorizationType" placeholder="请选择授权类型">
                            <el-option v-for="(opt,index) in options.Z_accreditType" :key="index" :label="opt.valData" :value="opt.valData">
                             </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  label="授权单位：" prop="authorizedUnit">
                        <span v-if="type=='info'">{{  form.authorizedUnit }}</span>
                         <el-select   filterable v-else v-model="form.authorizedUnit" placeholder="请选择授权单位">
                             <!--shortName-->
                            <el-option v-for="(opt,index) in Airline" :key="index" :label="opt.fullname" :value="opt.fullname">
                             </el-option>
                        </el-select>
                    </el-form-item>

                </div>
                <div class="row_one">
                    <el-form-item  label="授权机型范围：" prop="modelRange">

                        <el-button v-if="type!='info'" @click="openAircraftType" type="primary" style="margin-bottom: 10px;padding: 9px 30px;">选择</el-button>

                        <el-card class="box-card" shadow="never" border-radius="2px">
                            <div>已选择({{ form.modelRange.length }})：<el-button style="float:right" size="mini" @click="handleClear">清空</el-button></div>
                            <el-scrollbar style="height:120px ">
                                <el-tag :key="tag.id" v-for="tag in form.modelRange" closable :disable-transitions="false" @close="handleRemove(tag.id)">
                                    {{ tag.models?`${tag.name}（${tag.models}）`:`${tag.name}`}}
                                </el-tag>
                            </el-scrollbar>
                        </el-card>
                    </el-form-item>


                </div>

                <div class="row_tow">
                    <el-form-item  label="授权航班类型：" prop="flightType">
                        <span v-if="type=='info'">{{  form.flightType }}</span>
                        <el-select multiple  filterable v-else v-model="form.flightType" placeholder="请选择授权航班类型">
                            <el-option v-for="(opt,index) in options.accreditFlightType" :key="index" :label="opt.valData" :value="opt.valData">
                            </el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item  label="授权生效日期：" prop="startTime">
                        <span v-if="type=='info'">{{ form.startTime?moment(form.startTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker  @focus="focus" :picker-options="pickerOptions" type="date" v-else v-model="form.startTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>


                </div>
                <div class="row_tow" >

                    <el-form-item  label="授权状态："  >
                        <span v-if="type=='info'">{{  form.state }}</span>

                        <el-input :disabled="true" v-else v-model="form.state" placeholder=" "></el-input>

                    </el-form-item>
                    <el-form-item  label="授权失效日期：" prop="endTime">
                        <span v-if="type=='info'">{{ form.endTime?moment(form.endTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker :disabled="type=='edit'&&dateDis" @focus="focus1" :picker-options="pickerOptions1" type="date" v-else v-model="form.endTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                </div>

            </el-form>
        </div>
        <div style="text-align: center" class="footerB" >
            <el-button class="QoptionButton" @click="fabu" v-if="type=='edit'||type=='add'">授权发布</el-button>
            <el-button class="QoptionButton" @click="quxiao" style="margin: 0 15px " v-if="type=='edit'">授权取消</el-button>
            <el-button class="QoptionButton" @click="yanqi" v-if="type=='edit'"> 授权延期</el-button>
        </div>
        <AircraftType ref="AircraftType" @getAircratType="getAircratType"></AircraftType>
    </div>
</template>
<script>
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
                dateDis:true,
                form: {modelRange:[]},
                userArr:[],
                Airline:[],

                AircratS:[],

                options: {},
                 rules: {
                     userName: [{ required:true,message:'请输入员工姓名', trigger: "blur" }],
                     name: [{ required:true,message:'请输入证书名称', trigger: "blur" }],
                     number: [{ required:true,message:'请输入证书编号', trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {

                this.type = this.$route.query.type;
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["Z_accreditType",'accreditFlightType' ]
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
                    }
                    })
                this.$route.meta.title =
                    this.type == "add"
                        ? "授权管理新增"
                        : this.type == "edit"
                        ? "授权管理编辑"
                        : this.type == "info"
                            ? "授权管理详情":''

                 if(this.type!='add'){
                   this.getInfo()
                 }
            }
        },
        computed:{

        },
        methods: {
            openAircraftType(){
                this.$refs.AircraftType.open(this.form.modelRange)
            },
            getAircratType(data1){
                this.$set(this.form,'modelRange',data1)
                // this.$set(this.form,'modelRange',data.join(';'))
            },

            fabu(){
                this.saveForm('form', 1).then((d)=>{
                    request({
                        url:`${this.$ip}/mms-qualification/authorization/authorizationPublish`,
                        method: "post",
                        data:{
                            id:this.form.id,
                            endTime:this.form.endTime||null
                        }
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
                               return {
                                   name: k.split('__')[0].split('***')[0],
                                   models: k.split('__')[0].split('***')[1]||'',
                                   id: k.split('__')[1],
                               }
                           })
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
                        }
                        if(d.data.positionInfList&&d.data.positionInfList.length){
                            let obj=d.data.positionInfList[0]
                            this.form={...this.form,
                                dept:obj.dept,
                                post:obj.station,
                                postLevel:obj.stationLevel,
                                postSeri:obj.stationSequence,
                                job:obj.post,
                            }
                        }
                    }

                }).catch(error => {
                    this.$message.error(error);
                });

            },
            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id,modelRange:[] };
                }else{
                    this.form = { modelRange:[]};
                }
            },
             saveForm(form,num) {
                 return new Promise((resolve, reject)=>{
                     if (this.type == "add" || this.type == "edit") {
                         this.$refs[form].validate(valid => {
                             if (valid) {
                                 let url
                                 if(this.type=='add'){
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
                                         let msg=k.models?`${k.name}***${k.models}__${k.id}`:`${k.name}__${k.id}`
                                         return  msg
                                     })
                                 }
                                 obj.modelRange=modelRange.join(';')
                                 request({
                                     url:`${this.$ip}/mms-qualification${url}`,
                                     method: 'post',
                                     data:obj,
                                 }).then((data) => {
                                     if(num!=1){
                                         this.$message.success("保存成功！");
                                         this.$router.go(-1)
                                     }else{
                                         resolve(this)
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
