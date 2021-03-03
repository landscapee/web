<template>
    <div   :class=" type=='info'?'G_form G_formInfo ':'G_form'" >
        <el-form ref="form" label-position="right" :model="form" :rules="rules"  :inline="true"  >
            <div class="row_three">
                <el-form-item  label="工单模板编码：" :prop="type=='edit'?'':'code'">
                    <span v-if="type=='info'">{{form.code}}</span>
                    <el-input  @blur="codeChange"  :disabled="type=='edit'" v-else v-model="form.code" placeholder="请输入工单模板编码"></el-input>
                </el-form-item>
                <el-form-item  label="工单标题：" prop="title">
                    <span v-if="type=='info'">{{form.title}}</span>
                    <el-input v-else v-model="form.title" placeholder="请输入工单标题"></el-input>
                </el-form-item>
                <el-form-item  label="模板版本号：" prop="version">
                    <span v-if="type=='info'">{{form.version}}</span>
                    <el-input :disabled="true" v-else v-model="form.version" placeholder="请输入模板版本号"></el-input>
                </el-form-item>
            </div>

            <div class="row_three">
                <el-form-item  label="工单类型：" prop="type">
                    <span v-if="type=='info'">{{  form.type }}</span>
                    <el-select     v-else clearable v-model="form.type" placeholder="请选择工单类型">
                        <el-option v-for="(opt,index) in options.worldorderType" :key="index" :label="opt.valData" :value="opt.valCode"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="所属航司代码："  prop="airlineCompanyCode" :rules=" form.type=='WXGD'?rules.airlineCompanyCode:[{required:false}]" >

                    <span v-if="type=='info'">{{  form.airlineCompanyCode }}</span>
                    <el-select  @change="iataChange"   v-else filterable v-model="form.airlineCompanyCode" clearable placeholder="请选择所属航司代码">
                        <el-option v-for="(opt,index) in Airline" :key="index" :label="opt.iata" :value="opt.iata">
                            <span>{{opt.iata}}-{{opt.fullname}}</span>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="所属航空公司："  >
                    <span v-if="type=='info'">{{form.airlineCompany}}</span>
                    <el-input :disabled="true" v-else v-model="form.airlineCompany" placeholder="请输入所属航空公司"></el-input>
                </el-form-item>
            </div>
            <div class="row_three rowT">
                <el-form-item label="航司LOGO："  prop="airlineCompanyLogo" :rules=" form.type=='WXGD'?rules.airlineCompanyLogo:[{required:false}]"   >
                    <div  class="upUser  ">
                        <span v-if="!form.airlineCompanyLogo" style="color:#888888">
                                    请上传图片
                        </span>
                        <img v-else :src="form.photoPath" alt="请上传图片">
                        <el-button @click="upLogoPho"  style="padding:7px 10px;" ><span style="color:#3280E7">图片上传</span></el-button>
                    </div>
                    <div style="display: none">
                        <UploadFile  accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg" ref="UploadFile" @getFile="getFile"></UploadFile>
                    </div>
                </el-form-item>
                <el-form-item  label="机型：" prop="airplane" :rules=" form.type=='WXGD'?rules.airplane:[{required:false}]" >
                    <span v-if="type=='info'">{{  form.airplane }}</span>
                    <el-select   multiple  v-else filterable v-model="form.airplane" collapse-tags placeholder="请选择机型">
                        <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.iata" :value="opt.id"> </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item  label="航班类型："   prop="airlineType" :rules=" form.type=='WXGD'?rules.airlineType:[{required:false}]"  >
                    <span v-if="type=='info'">{{  form.airlineType }}</span>
                    <el-select       v-else clearable v-model="form.airlineType" placeholder="请选择航班类型">
                        <el-option v-for="(opt,index) in options.W_flightType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="row_three">

                <el-form-item  label="作业类型：" :prop=" form.type=='WXGD'?'jobType':''"  >
                    <span v-if="type=='info'">{{  form.jobType }}</span>
                    <el-select    v-else clearable v-model="form.jobType" placeholder="请选择作业类型">
                        <el-option v-for="(opt,index) in options.W_workType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="作业员类型：" :prop=" form.type=='WXGD'?'personType':''"  >
                    <span v-if="type=='info'">{{  form.personType }}</span>
                    <el-select    v-else clearable v-model="form.personType" placeholder="请选择作业员类型">
                        <el-option v-for="(opt,index) in options.workUserType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item  label="适用ETOPS运行：" :prop=" form.type=='WXGD'?'etopEnable':''"  >
                    <span v-if="type=='info'">{{  form.etopEnable?'适用':'不适用' }}</span>
                    <el-select    v-else clearable v-model="form.etopEnable" placeholder="请选择">
                        <el-option v-for="(opt,index) in options.applyETOP" :key="index" :label="opt.valData"  :value="opt.valCode==='false'?false:true"> </el-option>
                    </el-select>
                </el-form-item>
            </div>
            <div class="row_three" v-if="type=='edit'">

                <el-form-item  label="预改版："    >
                     <el-checkbox @change="isPreVersionC" v-model="form.isPreVersion" :label="true">预改版</el-checkbox>
                </el-form-item>


                <el-form-item  label="生效日期：" prop="preEnableTime" :rules=" form.isPreVersion?rules.preEnableTime:[{required:false}]">
                     <el-date-picker :disabled="!form.isPreVersion" @blur="blur(true)"  @focus="focus" :picker-options="pickerOptions" type="datetime"   v-model="form.preEnableTime" placeholder="请选择时间"></el-date-picker>
                </el-form-item>
                <el-form-item  label="失效日期：" prop="preInvalidTime" :rules=" form.isPreVersion?rules.preInvalidTime:[{required:false}]">
                    <div style="position:relative;">
                         <el-date-picker :disabled="!form.isPreVersion" @blur="blur( )" @focus="focus1" :picker-options="pickerOptions1"  type="datetime"   v-model="form.preInvalidTime" placeholder="请选择时间"></el-date-picker>
                        <!--<span style="position: absolute;left:calc(100% + 15px);width:200px" v-if="type!='info'">不选表示 '至今'</span>-->

                    </div>

                </el-form-item>
            </div>

        </el-form>


    </div>
</template>

<script>
    import request from '@lib/axios.js';
    import { extend ,map} from "lodash";
    import {eleDateShow,inputLength} from '@lib/tools'

    export default {
        name: "one",

        components: {},
        props:['type'],
        data() {
            const code = (rule, value, callback) => {
                if (!this.form.code) {
                    return callback(new Error('请输入工单模板编码'));
                } else {
                     request({
                        url:`${this.$ip}/mms-workorder/template/checkCode`,
                        method: 'get',
                        params:{
                            code:this.form.code,
                         }
                    }).then(d => {
                        if(d.code==200){
                            if (d.data) {
                                callback();
                                request({
                                    url:`${this.$ip}/mms-workorder//template/getNextVersion`,
                                    method: 'get',
                                    params:{code:this.form.code||null}
                                }).then(d => {
                                    if( d.code==200){
                                        this.$set(this.form,'version',d.data)
                                    }
                                });
                            } else {
                                callback("该工单模板编码已存在");
                            }
                        }else{
                            callback("校验失败，请重试");
                        }

                    });
                }
            };
            const title = (rule, value, callback) => {
                 if (!this.form.title) {
                    return callback(new Error('请输入工单标题'));
                } else {
                    if(this.form.code){
                        request({
                            url:`${this.$ip}/mms-workorder/template/checkTitle`,
                            method: 'get',
                            params:{
                                title:this.form.title,
                                code:this.form.code,
                            }
                        }).then(d => {
                            if(d.code==200){
                            if (d.data) {
                                callback();
                            } else {
                                callback("该工单标题已存在");
                            }
                        }else{
                            callback("校验失败，请重试");
                        }

                    });
                    }else{
                        callback("输入工单模板编码后校验");
                    }

                }
            };
            return {
                form:{isPreVersion:false},
                pickerOptions: {},
                pickerOptions1: {},
                options:{},
                AirlineObj:{},
                airplaneObj:{},
                Airline:[],
                AircraftType:[],
                rules:{
                    code:[{required:true, validator:code,trigger:'blur'}],
                    title:[{required:true, validator:title, trigger: "blur" }, ],
                    version:[{required:true,message:'请输入模板版本号',trigger:'blur'}],
                    type:[{required:true,message:'请选择工单类型',trigger:'blur'}],
                    airlineCompanyCode:[{required:true,message:'请选择所属航司代码',trigger:'blur'}],
                    airlineCompanyLogo:[{required:true,message:'请上传图片',trigger:'blur'}],
                    airplane:[{required:true,message:'请选择机型',trigger:'blur'}],
                    airlineType:[{required:true,message:'请选择航班类型',trigger:'blur'}],
                    preInvalidTime:[{required:true,message:'请选择时间',trigger:'blur'}],
                    preEnableTime:[{required:true,message:'请选择时间',trigger:'blur'}],
                }
            }
        },
        watch:{

          'form.photo':{
              handler(n){
                  if(n){
                       request({
                          header:{
                              'Content-Type':'multipart/form-data'
                          },
                          url:`${this.$ip}/mms-file/get-file-by-id/${n }`,
                          method:'GET',
                      }).then((d) => {
                          this.$set(this.form,'photoPath',d.data.filePath)
                      });
                  }
                },
              immediate:true
          },

        },
        methods: {
            isPreVersionC(val){
              if(!val){
                  delete this.form.preEnableTime
                  delete this.form.preInvalidTime
              }
            },
            codeChange(val){
               if(val&&this.form.title){
                   this.$refs.form.validateField('title')
               }

            },
            getForm(){
                return this.form.code
            },
            upLogoPho(){
                 this.$refs.UploadFile.$refs.buttonClick.$el.click()
            },

            getFile(file){
                console.log(file.id);
                this.$set(this.form,'airlineCompanyLogo',file.id)
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-file/get-file-by-id/${file.id }`,
                    method:'GET',

                }).then((d) => {
                    this.$set(this.form,'photoPath',d.data.filePath)
                });

            },
            iataChange(val){
                 if(val){
                    this.$set(this.form,'airlineCompany',this.AirlineObj[val])
                }else{
                    this.$set(this.form,'airlineCompany','')

                }

            },
            geturl(){
                let url
                if(this.type=='redesign'){
                    url='/template/change'
                }else if(this.type=='add'){
                    url='/template/save'
                }else if(this.type =='edit'){
                    url='/template/update'
                }
                 return url
            },
            summit(){

            },
            save (form){
                return new Promise((resolve, reject)=>{
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url=this.geturl()
                            let obj={...this.form}
                           if(obj.airplane ) {
                               obj.airplane =  obj.airplane.map((k,l)=>{
                                   return this.airplaneObj[k]
                               })
                           }
                            request({
                                url:`${this.$ip}/mms-workorder${url}`,
                                method: 'post',
                                data:obj,
                            }).then((data) => {
                                if(data.code==200&&this.type=='add'){
                                    request({
                                        url:`${this.$ip}/mms-workorder/template/getByCode/${obj.code}`,
                                        method: 'get',
                                     }).then((d) => {
                                        if(d.code==200){
                                            this.$emit('getinfo',{...obj})
                                             resolve(d.data.id)
                                        }
                                    })
                                 }else if(data.code==200){
                                    this.$emit('getinfo',{...obj})
                                    resolve(true)

                                }
                            })
                        }
                    });
                })
            },
            getInfo(id){
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${id||this.$route.query.id}`,
                    method: 'get',
                    // params:{id:id||this.$route.query.id}
                }).then((data) => {
                    this.form = extend({}, {...data.data.typeVO,isPreVersion:data.data.typeVO.isPreVersion||false});
                  
                    if(this.form.airplane){
                        this.form.airplane=this.form.airplane.map((k,l)=>{
                            return k.id
                        })
                    } else{
                        this.$set(this.form,'airplane',[])
                    }
                    if(this.form.airlineCompanyLogo){
                        request({
                            header:{
                                'Content-Type':'multipart/form-data'
                            },
                            url:`${this.$ip}/mms-file/get-file-by-id/${this.form.airlineCompanyLogo }`,
                            method:'GET',
                        }).then((d) => {
                            this.$set(this.form,'photoPath',d.data.filePath)
                        });
                    }
                })
            },

            focus(val){
                let e=this.form.preInvalidTime?new Date(this.form.preInvalidTime ):''
                let t=new Date()

                this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() > e.getTime()||time.getTime()<=t.getTime()-8.64e7;
                            // return time.getTime() > e.getTime()||time.getTime() > t.getTime();
                        }else{
                            return time.getTime()<=t.getTime()-8.64e7
                        }
                    },
                };
            } ,
            focus1(val){
                let d=new Date()
                let s=this.form.preEnableTime ?new Date(this.form.preEnableTime):''
                let t=new Date()
                this.pickerOptions1 = {
                    disabledDate(time) {
                        if (s) {
                            return time.getTime() < s.getTime()-8.64e7+1 ;
                        }else{
                            return time.getTime()<=t.getTime()-8.64e7
                        }
                    },
                };
            },
            blur(blo){
                let s=this.form.preEnableTime ?new Date(this.form.preEnableTime):''
                let e=this.form.preInvalidTime?new Date(this.form.preInvalidTime ):''


                let t=new Date()
                let str=blo?'生效时间应该小于失效时间':'失效时间应该大于失效时间'
                if(s&&e&&s>=e){
                    let name=blo?'preEnableTime':'preInvalidTime'
                    this.$set(this.form,name,null)
                    this.$message.warning(str)
                }
                if(s&&s.getTime()<t.getTime()){
                    if(blo){
                        this.$set(this.form,'preEnableTime',null)
                        this.$message.warning('生效时间不能小于当前时间')
                    }
                }
                if(e&&e.getTime()<t.getTime()){
                    if(!blo){
                        this.$set(this.form,'preInvalidTime',null)
                        this.$message.warning('失效时间不能小于当前时间')
                    }
                }

            }
        },
        created() {
              if(this.$route.query.id  ){
               this.getInfo()
            }else{

              }
            request({
                url:`${this.$ip}/config-client-mms/config/findConfigs?configName=Airline`,
                method: 'get',
            }).then(d => {
                if( d.data&&d.data.length){
                    this.Airline=[]
                     d.data.map((k,l)=>{
                        if(!k.parentCode){
                            this.AirlineObj[k.iata]=k.fullname
                            this.Airline.push(k)
                         }
                    })
                }
            });
            request({
                url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                method: 'get',
            }).then(d => {
                if( d.data&&d.data.length){
                    this.AircraftType=d.data
                    d.data.map((k,l)=>{
                        this.airplaneObj[k.id]=k
                    })
                }
            });
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false },
                data:["worldorderType", "W_workType","workUserType",'applyETOP','W_flightType' ]
            }).then(d => {
                let obj=d.data
                obj.worldorderType= obj.worldorderType.sort((a,b)=>{
                        return a.valCode - b.valCode
                })
                this.options=obj
            });
        },
        mounted(){
            inputLength(this)
        },
    }
</script>

<style lang="scss" scoped>
    .G_form{
        margin: 0;
        /*border:1px black solid;*/
        /deep/ .el-form{
            width: 100%;
            height:340px;
            padding: 20px 0px 5px 0px;
            .el-form-item__content{
                width:200px;
            }
            .row_three{
                .el-form-item:nth-child(2) {
                    margin: 0 20px;
                }
                .el-form-item:nth-child(1) ,.el-form-item:nth-child(3) {
                    margin-right: 0;
                }
            }
            .el-input{
                width:200px;
            }
            .el-form-item__label{
                width: 145px;
                text-align: left;
                padding: 0;
            }
        };
         .upUser{
             width:200px;
            display: flex;
             justify-content: space-between;
             align-items: center;
            img{
                /*border: 1px #303133 solid;*/
                width: 120px;
                height:30px;
            }
        }
    }
</style>
