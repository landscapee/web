<template>
    <div>
        <div class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>收费单-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
                </div>
                <div class="top-toolbar">
                    <!-- <div @click='sendFinanceFn'><icon iconClass="add"></icon>发送财务</div>
                    <div><icon iconClass="add" ></icon>导出收费单</div>
                    <div><icon iconClass="add" ></icon>新增</div>
                    <div><icon iconClass="edit" ></icon>编辑</div>
                    <div><icon iconClass="remove" ></icon>删除</div>
                    <div><icon iconClass="info" ></icon>详情</div>
                    <div><icon iconClass="info" ></icon>导出Excel</div> -->
                    <div @click="type!='info'?submitForm('ruleForm'):()=>{}" :class="type=='info'?'isDisabled':''"><icon iconClass="save" ></icon>保存</div>
                    <div @click="type!='info'?resetForm('ruleForm'):()=>{}" :class="type=='info'?'isDisabled':''"><icon iconClass="reset" ></icon>重置</div>
                </div>
            </div>
            <div class="main-content">
                <div class="header">机务服务非例行工作结算清单{{ruleForm.number?`(NO ${ruleForm.number})`:''}}</div>
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <div class='form-item-l'>
                        <el-form-item label="航空公司/Airline" prop="airLine" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.airLine}}</span>
                            <el-input v-else v-model="ruleForm.airLine"  style='width:320px;'></el-input>
                        </el-form-item>
                        <el-form-item label="日期/Date" prop="workDate" :label-width='labelWidth'>
                            <!-- <el-input v-model="ruleForm.workDate"  style='width:320px;'></el-input> -->
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.workDate | formatDate}}</span>
                            <el-date-picker
                                v-else
                                v-model="ruleForm.workDate"
                                type="date"
                                style='width:320px;'
                                placeholder="选择日期">
                            </el-date-picker>
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="分(子)公司/Subsidiary" prop="subsidiary" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.subsidiary}}</span>
                            <el-input v-else v-model="ruleForm.subsidiary"  style='width:320px;'></el-input>
                        </el-form-item>
                        <el-form-item label="飞机型号/Aircraft Type" prop="aircraftType" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.aircraftType}}</span>
                            <el-input v-else v-model="ruleForm.aircraftType" style='width:320px;'></el-input>
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="机号/Aircraft Reg" prop="aircraftReg" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.aircraftReg}}</span>
                            <el-input v-else v-model="ruleForm.aircraftReg" style='width:320px;'></el-input>
                        </el-form-item>
                        <el-form-item label="航班号/Flight No" prop="flightNo" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.flightNo}}</span>
                            <el-input v-else v-model="ruleForm.flightNo" style='width:320px;'></el-input>
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="起降机场/Departure/Arrival Airport" prop="arrivalAirport" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.arrivalAirport}}</span>
                            <el-input v-else v-model="ruleForm.arrivalAirport" style='width:320px;'></el-input>
                        </el-form-item>
                        <el-form-item label="非例行工作内容/Nonroutine Work" prop="nonroutineWork" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.nonroutineWork}}</span>
                            <el-input v-else v-model="ruleForm.nonroutineWork" style='width:320px;'></el-input>
                        </el-form-item>
                    </div>
                    <div class='form-item-l' style="display:none;">
                        <!-- <el-form-item label="人工时/Man hour" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val' style='width:54px;'>{{ruleForm.people}}</span>
                            <el-input v-else type='number' v-model="ruleForm.people" style='width:116px;'></el-input>
                            人/Man
                            <span v-if="isInfo" class='form_inlne_val' style='width:54px;'>{{ruleForm.hours}}</span>
                            <el-input v-else type='number' v-model="ruleForm.hours" style='width:116px;'></el-input>
                            小时/Hour
                        </el-form-item> -->
                        <el-form-item label="" prop="name" style='width:600px;' :label-width='labelWidth'>
                            <!-- <el-input v-model="ruleForm.name"  style='width:320px;'></el-input> -->
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="除冰车/Aircraft Deicing System" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.aircraftDeicingSystem}}</span>
                            <el-input v-else type='number' v-model="ruleForm.aircraftDeicingSystem" style='width:262px;'></el-input>
                            小时/Hour
                        </el-form-item>
                        <el-form-item label="高/低压氮气/High/Low pressure Nitrogen" prop="pressureNitrogen" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.pressureNitrogen}}</span>
                            <el-input v-else type='number' v-model="ruleForm.pressureNitrogen" style='width:246px;'></el-input>
                            次/Operation
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="加液压油/Hydraulic" prop="hydraulic" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.hydraulic}}</span>
                            <el-input v-else type='number' v-model="ruleForm.hydraulic" style='width:254px;'></el-input>
                            加仑/Gallon
                        </el-form-item>
                        <el-form-item label="充氧气/瓶/Oxygcn Cart/Bottle" prop="oxygenBottle" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.oxygenBottle}}</span>
                            <el-input v-else type='number' v-model="ruleForm.oxygenBottle" style='width:266px;'></el-input>
                            次/Bottle
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="加滑油/Oil" prop="oil" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.oil}}</span>
                            <el-input v-else type='number' v-model="ruleForm.oil" style='width:256px;'></el-input>
                            夸脱/Quart
                        </el-form-item>
                        <el-form-item label="飞机除冰液 (原液)/DF Plus" prop="dfPlus" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.dfPlus}}</span>
                            <el-input v-else type='number' v-model="ruleForm.dfPlus" style='width:178px;'></el-input>
                            公斤(公升)/Kilogram(Litre)
                        </el-form-item>
                    </div>
                    <div class='form-item-l'>
                        <el-form-item label="人工时/Man hour" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val' style='width:54px;'>{{ruleForm.people}}</span>
                            <el-input v-else type='number' v-model="ruleForm.people" style='width:106px;'></el-input>
                            人/Man
                            <span v-if="isInfo" class='form_inlne_val' style='width:54px;'>{{ruleForm.hours}}</span>
                            <el-input v-else type='number' v-model="ruleForm.hours" style='width:106px;'></el-input>
                            小时/Hour
                        </el-form-item>
                        <el-form-item label="其他" prop="others" :label-width='labelWidth'>
                            <span v-if="isInfo" class='form_inlne_val'>{{ruleForm.others}}</span>
                            <el-input v-else v-model="ruleForm.others" style='width:316px;'></el-input>
                        </el-form-item>
                    </div>
                    <div class='form-item-l' style='justify-content:flex-start' v-if="type==='add'">
                        <el-form-item label="上传模板" :label-width='labelWidth'>
                            <el-upload
                                style='display:flex'
                                class="upload_demo"
                                ref="upload"
                                accept='.doc,.jpg,.jpeg,.png,.gif,.bmp,.pdf,.JPG,.JPEG,.PBG,.GIF,.BMP,.PDF'
                                :on-success='fileUploadSuccessFn'
                                :on-remove='fileRemoveFn'
                                :action='$ip+"/mms-file/upload2"'
                            >
                                <el-button size="small" type="primary">上传</el-button>
                            </el-upload>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { sysParameterTable } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
    },
    filters: {
        formatDate (val, format='YYYY-MM-DD') {
            var val = Number(val);
            if (!isNaN(val)){
                return moment(val).format(format)
            }else{
                return '-' // /file//recovery/{id}
            }
        }
    },
    computed:{
        isInfo:{
            get:function(){
                return this.type === 'info'
            },
            set:function(){}
        }
    },
    name: '',
    data() {
        return {
            ruleForm: {
                airLine: '',  // 航空公司
                workDate: '', // 日期
                subsidiary: '', // 分(子)公司
                aircraftType: '', // 飞机型号
                aircraftReg: '', // 机号
                flightNo: '', // 航班号
                arrivalAirport: 'CTU',  // 起降机场
                nonroutineWork: '', //非例行工作内容
                people:'', // 人
                hours:'',  // 小时
                aircraftDeicingSystem: '', //除冰车
                pressureNitrogen: '', // 高/低压氮气
                hydraulic:'', // 加液压油
                oxygenBottle: '', //充氧气/瓶
                oil:'', // 加滑油
                dfPlus: '', // 飞机除冰液 (原液)
                others:'',
                picture:'' // 模板路径
            },
            labelWidth:'300px',
            rules: {
                airLine: [
                    { required: true, message: '请输入航空公司', trigger: 'change' },
                ],
                workDate: [
                    { required: true, message: '请选择时间', trigger: 'change' }
                ]
            },
            type:'add',
        }
    },
    created() {
        if (this.$route.query) {
            this.type = this.$route.query.type;
            this.$route.meta.title =
                this.type == "add"
                    ? "新增"
                    : this.type == "edit"
                    ? "编辑"
                    : this.type == "info"
                        ? "详情"
                        : "";
            if(this.type!='add'){
                // let row=JSON.parse( this.$route.query.data)
                // this.form={...row}
                this.getChargeInfo()
            }
        }
    },
    methods: {
        fileUploadSuccessFn(response, file, fileList){
            console.log(response)
            if(response.code==200){
                this.ruleForm.picture = response.data.filePath
            }else{
                this.$message({
                    showClose: true,
                    message: '文件上传失败',
                    type: 'error'
                });
            }
        },
        fileRemoveFn(file,fileList){
            this.ruleForm.picture = ''
            // this.form = {}
            // this.form.fileName = ''
            // this.form.formats = ''
            // this.form.folderId = ''
            // this.form.fileUrl = ''
            // this.form.size = ''
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let typeObj = {
                        'add': this.chargeSaveFn,
                        'edit': this.chargeUpdateFn
                    }
                    typeObj[this.type].call(this)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },
        undefinedToNullFn(obj){
            let newObj = {}
            if(Object.prototype.toString.call(obj) === "[object Object]" && Object.keys(obj).length){
                Object.keys(obj).forEach(item=>{
                    if(Reflect.get(obj, item)===''){
                        Reflect.set(newObj, item, null)
                    }else{
                        Reflect.set(newObj, item, Reflect.get(obj, item))
                    }
                })
                return newObj
            }else{
                throw new Error("ruleForm is not Object")
            }
        },
        chargeSaveFn(){
            let ruleForm = this.undefinedToNullFn(this.ruleForm)
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/save`, 
                method: 'post',
                data: ruleForm
            })
            .then((data) => {
                if(data.code==200){
                    this.$message({type: 'success', message: '新增成功'});
                    this.$router.go(-1)
                }else{
                    this.$message({type: 'error', message: '新增失败，请重试'});
                }
            })
        },
        chargeUpdateFn(){
            let ruleForm = this.undefinedToNullFn(this.ruleForm)
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/update`, 
                method: 'post',
                data: ruleForm
            })
            .then((data) => {
                if(data.code==200){
                    this.$message({type: 'success', message: '新增成功'});
                    this.$router.go(-1)
                }else{
                    this.$message({type: 'error', message: '新增失败，请重试'});
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
        getChargeInfo(){
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/getById/${this.$route.query.id}`,
                method: 'get',
            }).then(data => {
                console.log(data)
                if(data.code==200 && Object.prototype.toString.call(data.data) === "[object Object]"){
                    this.ruleForm = data.data
                }
            })
        }
    },
};
</script>
<style scoped lang="scss">
@import "@/ui/styles/common_list.scss"; 
.sysParameter{
    .main-content{
        .header{
            text-align: center;
            font-size:24px;
            color:#222;
        }
        .demo-ruleForm{
           margin-top:30px;
        }
        .form-item-l{
            display:flex;
            flex-direction:row;
            justify-content: center;
            .form_inlne_val{
                display:inline-block;
                width:320px;
            }
        }
    }
}
</style>
