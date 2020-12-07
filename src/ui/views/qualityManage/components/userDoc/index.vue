<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/inOfficeInfoAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/workExperienceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/certificateAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/unsafeAdd'" :key="$route.path"></router-view>
        <div class="courseware" v-else>
            <div class="QCenterRight">
                <div class="QHead">
                    {{form.userName}}档案详情
                </div>
                <div v-if="type!='info'"  class="QheadRight">

                </div>
            </div>

            <div class="G_form1" style="overflow: auto ; height:calc(100vh - 270px);" >
                <el-form ref="form" label-position="right" :model="form"  :rules="rules"   :inline="true"  >
                    <table class="nomTable">
                        <tr>
                            <td class="fTd">员工编号</td>
                            <td class="tTd">
                                <el-form-item prop="userNumber"  >
                                    <span v-if="type=='info'"    >
                                        	<el-tooltip v-if="form.userNumber" class="item" effect="dark" :enterable="false" :content="form.userNumber" placement="top-start">
												<div>{{ form.userNumber }}</div>
											</el-tooltip>
                                        <!--{{form.userNumber}}-->
                                    </span>


                                </el-form-item>

                            </td>
                            <td class="fTd">员工姓名</td>
                            <td class="tTd">
                                <el-form-item prop="userName"  >
                                    <span v-if="type=='info'">
                                        <!--{{form.userName}}-->
                                    <el-tooltip v-if="form.userName" class="item" effect="dark" :enterable="false" :content="form.userName" placement="top-start">
												<div>{{ form.userName }}</div>
                                    </el-tooltip>
                                    </span>

                                </el-form-item>

                            </td>
                            <td class="fTd">民族</td>
                            <td class="tTd" >
                                <span v-if="type=='info'">
                                    <!--{{form.nation}}-->
                                 <el-tooltip v-if="form.nation" class="item" effect="dark" :enterable="false" :content="form.nation" placement="top-start">
												<div>{{ form.nation }}</div>
                                    </el-tooltip>
                                </span>
                                <el-input v-else v-model="form.nation" placeholder="请输入民族"></el-input>
                            </td>
                            <td class="sTd" rowspan="3" style="width: 130px">
                                <div v-if="type=='info'" class="upUser  ">
                                    <span v-if="!form.photo">
                                     相片上传
                                </span>
                                    <img v-else :src=" form.photoPath" alt="">
                                </div>

                            </td>
                        </tr>
                        <tr>
                            <td class="fTd">身份证号</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.idCard}}</span>
                                <el-input   v-else v-model="form.idCard" placeholder="请输入身份证号"></el-input>
                            </td>
                            <td class="fTd">性别</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.sex}}</span>
                                <el-input v-else v-model="form.sex" placeholder="请输入性别"></el-input>

                            </td>
                            <td class="fTd">籍贯</td>
                            <td class="sTd" >
                                <span v-if="type=='info'">{{form.nativePlace}}</span>
                                <el-input v-else v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
                            </td>

                        </tr>
                        <tr>
                            <td class="fTd">入党日期</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.membershipTime?this.$moment(form.membershipTime).format('YYYY-MM-DD'):''}}</span>
                                <el-date-picker   type="date"  v-else v-model="form.membershipTime"  placeholder="请选择入党日期"></el-date-picker>

                            </td>
                            <td class="fTd">入职日期</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.entryTime?this.$moment(form.entryTime).format('YYYY-MM-DD'):''}}</span>
                                <el-date-picker   type="date"  v-else v-model="form.entryTime"  placeholder="请选择入职日期"></el-date-picker>

                            </td>
                            <td class="fTd">政治面貌</td>
                            <td class="sTd" >
                                <span v-if="type=='info'">{{form.politicalOrientation}}</span>
                                <el-input v-else v-model="form.politicalOrientation" placeholder="请输入政治面貌"></el-input>
                            </td>

                        </tr>
                        <tr>
                            <td class="fTd">文化程度</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.education}}</span>
                                <el-input   v-else v-model="form.education" placeholder="请输入文化程度"></el-input>

                            </td>
                            <td class="fTd">毕业院校</td>
                            <td class="tTd">
                                <span v-if="type=='info'">
                                    <el-tooltip v-if="form.university" class="item" effect="dark" :enterable="false" :content="form.university" placement="top-start">
												<div>{{ form.university }}</div>
                                    </el-tooltip>
                                    <!--{{form.university}}-->
                                </span>
                                <el-input v-else v-model="form.university" placeholder="请输入毕业院校"></el-input>

                            </td>
                            <td class="fTd">专业</td>
                            <td class="sTd"  colspan="2">
                                <span v-if="type=='info'">
                                    <!--{{form.major}}-->
                                <el-tooltip v-if="form.major" class="item" effect="dark" :enterable="false" :content="form.major" placement="top-start">
												<div>{{ form.major }}</div>
                                    </el-tooltip>
                                </span>
                                <el-input v-else v-model="form.major" placeholder="请输入专业"></el-input>
                            </td>

                        </tr>
                        <tr>
                            <td class="fTd">毕业日期</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.graduationTime?this.$moment(form.graduationTime).format('YYYY-MM-DD'):''}}</span>
                                <el-date-picker   type="date"  v-else v-model="form.graduationTime"  placeholder="请选择毕业日期"></el-date-picker>

                            </td>
                            <td class="fTd">维修专业学历</td>
                            <td class="tTd">
                                <span v-if="type=='info'">
                                    <!--{{form.maintenanceEducation}}-->
                                <el-tooltip v-if="form.maintenanceEducation" class="item" effect="dark" :enterable="false" :content="form.maintenanceEducation" placement="top-start">
												<div>{{ form.maintenanceEducation }}</div>
                                    </el-tooltip>
                                </span>
                                <el-input v-else v-model="form.maintenanceEducation" placeholder="请输入维修专业学历"></el-input>

                            </td>
                            <td class="fTd">维修毕业院校</td>
                            <td class="sTd"  colspan="2">
                                <span v-if="type=='info'">
                                      <el-tooltip v-if="form.maintenanceUniversity" class="item" effect="dark" :enterable="false" :content="form.maintenanceUniversity" placement="top-start">
												<div>{{ form.maintenanceUniversity }}</div>
                                    </el-tooltip>
                                    <!--{{form.maintenanceUniversity}}-->
                                </span>
                                <el-input v-else v-model="form.maintenanceUniversity" placeholder="请输入维修毕业院校"></el-input>
                            </td>

                        </tr>
                        <tr>
                            <td class="fTd">维修毕业日期</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.maintenanceTime?this.$moment(form.maintenanceTime).format('YYYY-MM-DD'):''}}</span>
                                <el-date-picker   type="date"  v-else v-model="form.maintenanceTime"  placeholder="请选择维修毕业日期"></el-date-picker>

                            </td>
                            <td class="fTd">外语程度</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.foreignLevel}}</span>
                                <el-input v-else v-model="form.foreignLevel" placeholder="请输入外语程度"></el-input>

                            </td>
                            <td class="fTd">联系方式</td>
                            <td class="sTd"  colspan="2">
                                <span v-if="type=='info'">{{form.contactInformation}}</span>
                                <el-input v-else v-model="form.contactInformation" placeholder="请输入联系方式"></el-input>
                            </td>

                        </tr>
                        <tr>
                            <td class="fTd">档案失效日期</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.invalidTime?this.$moment(form.invalidTime).format('YYYY-MM-DD'):''}}</span>
                                <el-date-picker   type="date"  v-else v-model="form.invalidTime"  placeholder="请选择档案失效日期"></el-date-picker>

                            </td>
                            <td class="fTd">在岗状态</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.onDuty}}</span>
                                <el-input v-else v-model="form.onDuty" placeholder="请输入在岗状态"></el-input>

                            </td>
                            <td class="fTd" >学历证书附件</td>
                            <td class="tTd" colspan="2">
                                <div v-if="form.enclosure&&type=='info'" @click="fileDownload(form.enclosure)" class="hoverSpanFile"  >
                                    <a >学历证书附件</a>
                                    <i class="el-icon-download iClass"></i>
                                </div>



                            </td>
                        </tr>
                        <tr>
                            <td class="fTd">上级姓名</td>
                            <td class="tTd">
                                <span v-if="type=='info'">{{form.userSuperiorName}}</span>
                                <el-input   v-else v-model="form.userSuperiorName" placeholder="请输入上级姓名"></el-input>

                            </td>
                            <td class="fTd">上级员工编号</td>
                            <td class="tTd">
                                <span  v-if="type=='info'" style="">
                                     <el-tooltip v-if="form.userSuperiorNumber" class="item" effect="dark" :enterable="false" :content="form.userSuperiorNumber" placement="top-start">
												<div>{{ form.userSuperiorNumber }}</div>
                                    </el-tooltip>
                                    <!--{{form.userSuperiorNumber}}-->
                                </span>
                                <el-input  v-else v-model="form.userSuperiorNumber" placeholder="请输入上级员工编号"></el-input>

                            </td>
                            <td class="fTd" >学位证书附件</td>
                            <td class="sTd" colspan="2">
                                <div @click="fileDownload(form.diploma)" class="hoverSpanFile" v-if="type=='info'&&form.diploma"><a
                                        href="#">学位证书附件</a> <i class="el-icon-download iClass"></i>
                                </div>


                            </td>
                        </tr>
                    </table>
                    <div style="width:1160px">
                        <InOfficeInfo @getInfo="getInfo" :type="type" :tableData="form.positionInfList||[]" :id="this.$route.query.id"></InOfficeInfo>
                        <WorkExperience @getInfo="getInfo" :type="type" :tableData="form.workInfList||[]" :id="this.$route.query.id"></WorkExperience>
                        <Certificate @getInfo="getInfo" :type="type" :tableData="form.certificateInfList||[]" :id="this.$route.query.id"></Certificate>
                        <Unsafe @getInfo="getInfo" :type="type" :tableData="form.sincerityInfList||[]" :id="this.$route.query.id"></Unsafe>

                    </div>


                </el-form>
            </div>
        </div>
    </div>

</template>
<script>
    import moment from "moment";
    import InOfficeInfo from './add/inOfficeInfo/index';
    import WorkExperience from './add/workExperience/index';
    import Certificate from './add/certificate/index';
    import Unsafe from './add/unsafe/index';

    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend } from "lodash";
    export default {
        components: {
            Icon,InOfficeInfo,WorkExperience,Certificate,Unsafe
        },
        name: "",
        data() {


            return {
                moment:moment,
                oldForm:{},
                form: {courseFileName:'',courseFileId:'',suitableUser:[]},
                options: {},
                userArrObj: {},
                userArr:[],
                rules: {
                    userName: [{ required:true,message:'请选择', trigger: "blur" }],
                    userNumber: [{ required:true,message:'请选择', trigger: "blur" }],
                },
                type: "info"
            };
        },
        created() {

            this.initPage()
        },
        methods: {


            fileDownload(id,num){
                if(id){
                    request({
                        header:{
                            'Content-Type':'multipart/form-data'
                        },
                        url:`${this.$ip}/mms-file/get-file-by-id/${id }`,
                        method:'GET',

                    }).then((d) => {
                        window.open( d.data.filePath)
                    });
                }else {
                    this.$message.info('暂无附件')
                }
            },

            getInfo(){

            },
            initPage(){
                      if(this.$route.query.id){
                        this.$route.meta.paramsId ={id:this.$route.query.id,type:this.$route.query.type}
                          request({
                              url:`${this.$ip}/mms-qualification/userRecord/getByUserNumber/${this.$route.query.id}`,
                              method: "get",
                          }).then(d => {
                              this.form={...d.data }
                              if(this.form.photo){
                                  request({
                                      header:{
                                          'Content-Type':'multipart/form-data'
                                      },
                                      url:`${this.$ip}/mms-file/get-file-by-id/${this.form.photo }`,
                                      method:'GET',
                                  }).then((d) => {
                                      this.$set(this.form,'photoPath',d.data.filePath)
                                  });
                              }

                          })
                    }

            },


        }
    };
</script>
<style scoped lang="scss">
    .courseware{
        /*padding:0 30px;*/
    }
    .hoverSpanFile{
        &>span  {
            padding: 15px;
            font-size:16px;
            color:#888888
        }  &>a  {
               padding: 15px;
               font-size:16px;
               color:#222222
           }
    }
    .G_form1{
        margin-top:80px ;
        margin-left: calc(50% - 616px);
        height:calc(100vh - 270px);
        .nomTable{
            border-collapse:collapse;border:none;
            .fTd{
                width: 140px;
                text-align: center;
            }
            td{
                height:40px;
                border:1px solid rgba(151,151,151,1);
                font-size:16px;
                color:#222222;
                .fileUp{
                    .el-input{
                        width: 300px;
                        margin-right: 10px;
                    }
                }
                .upUser{
                    overflow: hidden;
                    text-align: center;
                    img{
                        width: 128px;
                    }
                }
                &>span  {
                    padding :0 10px 0 15px;
                    width: 200px;
                    display: inline-block;
                    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
                }
                /deep/ .el-form-item__content{
                    height:39px;
                    &>span  {
                        div{
                            white-space: nowrap;overflow: hidden;text-overflow: ellipsis;

                            width: 170px;
                        }
                        padding :0 10px 0 15px;
                        width: 200px;
                        display: inline-block;
                        /*white-space: nowrap;overflow: hidden;text-overflow: ellipsis;*/
                    }
                }
            }
        }
        /deep/  .el-form{
            width: 1233px;
            .el-form-item {
                margin: 0;
            }
            .el-input{
                width:200px;
            }
            .el-select{
                width:200px;
            }
            .el-form-item__error{
                top:25px
            }
            .el-textarea__inner,  .el-input__inner{
                border:0px solid rgba(151,151,151,1);
                font-size:16px;
                color:#222222
            }
            input::-webkit-input-placeholder {
                font-size:16px;
                font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                font-weight:400;
                color:#888888
            }
        }
    }


</style>
