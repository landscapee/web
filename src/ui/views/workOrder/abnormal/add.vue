<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                纸制填报工单导入
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

                    <el-form-item label="任务日期：" prop="workTime">
                        <span v-if="type=='info'">{{  form.workTime?moment(form.workTime).format('YYYY-MM-DD'):'' }}</span>
                        <el-date-picker  type="date" v-else v-model="form.workTime" placeholder="请选择时间"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="任务号："  >
                        <span v-if="type=='info'">{{  form.ommsJobNo }}</span>
                        <el-input   v-else v-model="form.ommsJobNo" placeholder="请输入任务号"></el-input>
                    </el-form-item>
                </div>

                <div class="row_tow">
                    <el-form-item  label="工单类型：" prop="type">
                        <span v-if="type=='info'">{{  form.type }}</span>
                        <el-select   filterable v-else v-model="form.type" placeholder="请选择工单类型">
                            <el-option v-for="(opt,index) in options.worldorderType" :key="index" :label="opt.valData" :value="opt.valCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="执行单位：" prop="departmentId">
                        <span v-if="type=='info'">{{form.department}}</span>
                        <el-select @change="departmentIdCh"  filterable v-else v-model="form.departmentId" placeholder="请选择执行单位">
                            <el-option v-for="(opt,index) in options.dept" :key="index" :label="opt.valData" :value="opt.valCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_one">
                    <el-form-item  label="保障人员：" prop="operatorId">
                         <el-button  v-if="type!='info'"  @click="userOpen" type="primary" style="margin-bottom: 10px;padding: 9px 30px;">选择</el-button>
                        <el-card class="box-card" shadow="never" border-radius="2px">
                            <el-scrollbar style="height:100px ">
                                <el-tag style="margin-right: 10px" :key="tag.id" v-for="(tag,index) in form.operatorList" closable @close="handleClose(tag,index)" :disable-transitions="false"  >
                                    {{ tag.userName }}
                                </el-tag>
                            </el-scrollbar>
                        </el-card>

                    </el-form-item>

                </div>

                <div class="row_tow">
                    <el-form-item  label="机位：" prop="seat">
                        <span v-if="type=='info'">{{  form.seat }}</span>
                        <el-input v-else v-model="form.seat" placeholder="请输入机位"></el-input>

                    </el-form-item>
                    <el-form-item label="航班类型：" prop="flightState">
                        <span v-if="type=='info'">{{form.flightState}}</span>
                        <el-select   filterable v-else v-model="form.flightState" placeholder="请选择航班类型">
                            <el-option v-for="(opt,index) in options.W_flightType" :key="index" :label="opt.valData" :value="opt.valCode">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_tow">

                    <el-form-item label="航班号：" prop="flightNo">
                        <span v-if="type=='info'">{{form.flightNo}}</span>
                        <el-input v-else v-model="form.flightNo" placeholder="请输入航班号"></el-input>
                    </el-form-item>
                    <el-form-item  label="机型：" prop="airplaneIcao">
                        <span v-if="type=='info'">{{  form.airplaneIcao }}</span>
                        <el-select   filterable v-else v-model="form.airplaneIcao" placeholder="请选择机型">
                            <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.name" :value="opt.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </div>


                <div class="row_tow">
                    <el-form-item  label="飞机注册号：" >
                        <span v-if="type=='info'">{{ form.flightRegisterNo }}</span>
                        <el-input v-else v-model="form.flightRegisterNo" placeholder="请输入飞机注册号"></el-input>
                    </el-form-item>
                    <el-form-item  label="进出港计划时间：" >
                        <span v-if="type=='info'">{{ form.planDepartureTime?moment(form.planDepartureTime).format('YYYY-MM-DD'):''}}</span>
                        <el-date-picker  type="date" v-else v-model="form.planDepartureTime" placeholder="请选择进出港计划时间"></el-date-picker>
                    </el-form-item>

                </div>
                <div class="row_tow">
                    <el-form-item  label="纸制工单文件：" prop="offlineFile">
                        <span v-if="type=='info'">{{ form.offlineFile }}</span>
                        <!--.ppt,.docx,.doc,-->
                        <UploadFile :disabled="true"  :listNone="true" accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf"  ref="UploadFile" @getFile="getFile"  ></UploadFile>

                    </el-form-item>
                    <el-form-item label="工作时长(分钟)："  prop="costTime">
                    <span v-if="type=='info'">{{form.costTime}}</span>
                    <el-input v-else v-model="form.costTime" placeholder="请输入工作时长"></el-input>
                </el-form-item>

                </div>

            </el-form>
        </div>
        <userTree ref="userBox"  @onSelected="handleUserSelected"></userTree>
    </div>
</template>
<script>
    import moment from "moment";
     import userTree from '@components/userTree/index';

    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend ,findIndex,map} from "lodash";
    export default {
        components: {
            Icon,userTree
        },
        name: "",
        data() {

            let costTime=(rule, value, callback)=>{
                if(value){
                    if (!Number.isInteger(Number(value))) {
                        callback(new Error('请输入数字值'));
                    } else {
                        if (value >0) {
                            callback();
                        } else {
                            callback(new Error('工作时长大于零'));
                        }
                    }
                }else{
                    callback();
                }
            }
            return {

                moment:moment,
                oldForm:{},
                form: {operatorList:[], },
                AircraftType:[],
                AircraftTypeObj: {},
                options: {},
                deptObj: {},
                 rules: {
                     workTime: [{ required:true,message:'请选择时间', trigger: "blur" }],
                     type: [{ required:true,message:'请选择工单类型', trigger: "blur" }],
                     departmentId: [{ required:true,message:'请选择执行单位', trigger: "blur" }],
                     operatorId: [{ required:true,message:'请选择保障人员', trigger: "blur" }],
                     seat: [{ required:true,message:'请输入机位', trigger: "blur" }],
                     flightState: [{ required:true,message:'请选择航班类型', trigger: "blur" }],
                     flightNo: [{ required:true,message:'请输入航班号', trigger: "blur" }],
                     airplaneIcao: [{ required:true,message:'请选择机型', trigger: "blur" }],
                     offlineFile: [{ required:true,message:'请选择文件', trigger: "blur" }],
                     costTime: [{  validator:costTime, trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            if (this.$route.query) {
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "add"
                        ? "纸质工单新增"
                        : this.type == "edit"
                        ? "纸质工单编辑"
                        : this.type == "info"
                            ? "纸质工单详情"
                            : "";
                 if(this.type!='add'){
                    request({
                        url:`${this.$ip}/mms-training/questionInfo/info/${this.$route.query.sId}`,
                        method: "get",
                    }).then(d => {
                        if(d.data.optionType=='多选'){
                            d.data.answer= d.data.answer.split(';')
                        }
                        this.form={...d.data,paperId:this.$route.query.id}
                    })

                }
            }
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["dept" ,'worldorderType','W_flightType']
            }).then(d => {
                let obj=d.data
                this.options=obj
                obj.dept.map((k,l)=>{
                    this.deptObj[k.valCode]=k.valData
                })
            });
            request({
                url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                method: 'get',
            }).then(d => {
                if( d.data&&d.data.length){
                    this.AircraftType=d.data
                    d.data.map((k,l)=>{
                        this.AircraftTypeObj[k.id]=k
                    })
                }
            });

        },
        methods: {
            departmentIdCh(val){
              this.$set(this.form,'department',this.deptObj[val])
            },
            handleUserSelected(users) {
                this.form.operatorList = users.map((item) => ({ userId: item.id, userName: item.name ,role:item.role}));
            },
            userOpen(tag){
                let arr = this.form.operatorList.map((item) => ({ id: item.userId, name: item.userName ,role:item.roles}));
                this.$refs.userBox.open(arr, '选择人员', true);
            },
            handleClose(tag,index){
                this.userList.splice(index,1)
            },
            getFile(fileIds){
                console.log(fileIds,1,2);
                this.$set(this.form,'offlineFile',fileIds)
             },

            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id , operatorList:[]};
                }else{
                    this.form = { operatorList:[]};
                }
            },
            saveForm(form) {
                this.$set(this.form,'operatorId',this.form.operatorList.length?1:'')
                this.$refs[form].validate(valid => {
                    if (valid) {
                        delete this.form.operatorId
                        request({
                            url:`${this.$ip}/mms-workorder/workorder/uploadPage`,
                            method: 'post',
                            data:{...this.form},
                        }).then((data) => {
                            if(data.code==200){
                                this.$message.success("保存成功！");
                                this.$router.go(-1)
                            }
                        })
                    }
                });

            },

        }
    };
</script>
<style scoped lang="scss">
    .indexAdd{
        width: 100%;
        padding: 0 30px;

     }
    /deep/ .el-form{
        .el-form-item__label{
            padding:0 auto!important;
            width: 155px!important;

        }
        .el-form-item__content{
            width: calc(100% - 180px);
        }
    }
</style>
