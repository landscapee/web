<template>
    <div class="addQualifications">
        <div class="top-content">
            <div class="top-content-title">
                <span>资质管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div class="top-toolbar">
                <div @click="saveQualifications"><icon iconClass="save" ></icon>保存</div>
                <div><icon iconClass="reset" ></icon>重置</div>
            </div>
        </div>
        <div class="main-content">
           <el-form label-position="right" :model="form" :rules="rules" ref="rules"  class="">
               <div class="row_item">
                    <el-form-item label="员工姓名" prop="name" label-width="100px">
                        <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="员工编号" prop="number" label-width="164px">
                        <el-input v-model="form.number"></el-input>
                    </el-form-item>
               </div>
               <div class="row_item">   
                    <el-form-item label="资质证书号" prop="certificateNumber" label-width="100px">
                        <el-input v-model="form.certificateNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="资质名称" prop="qualificationsName" label-width="164px">
                        <el-input v-model="form.qualificationsName"></el-input>
                    </el-form-item>
               </div>  
               <div class="row_item">
                    <el-form-item label="资质类型" prop="qualificationsType" label-width="100px">
                        <el-select v-model="form.qualificationsType" placeholder="请选择资质类型">
                            <el-option label="桥载资质" value="桥载资质"></el-option>
                            <el-option label="勤务资质" value="勤务资质"></el-option>
                            <el-option label="维修勤务资质" value="维修勤务资质"></el-option>
                            <el-option label="维修资质" value="维修资质"></el-option>
                            <el-option label="放行资质" value="放行资质"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适用业务" prop="useBusiness" label-width="164px">
                        <el-input v-model="form.useBusiness"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="颁发单位" prop="awardUnit" label-width="100px">
                        <el-input v-model="form.awardUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="颁发日期" prop="awardDate" label-width="164px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.awardDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="生效日期" prop="takeEffectDate" label-width="100px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.takeEffectDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="失效日期" prop="invalidDate" label-width="164px">
                        <el-date-picker type="date" placeholder="选择日期" v-model="form.invalidDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
            </el-form>
        </div> 
    </div> 
</template>
<script>
import Icon from '@components/Icon-svg/index';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
	},
    name: '',
    data() {
        return {
            form:{
                name:'xxxxx',
                number:'xxxx',
                certificateNumber:'xxx',
                qualificationsName:'xxx',
                qualificationsType:'xxx',
                useBusiness:'xxxx',
                awardUnit:'xxx',
                awardDate:'xxx',
                takeEffectDate:'xxx',
                invalidDate:'xxx'
            },
            rules:{
                name: [{ required: true, message: '请输入', trigger: 'change' }],
                number: [{ required: true, message: '请输入', trigger: 'change' }],
                certificateNumber: [{ required: true, message: '请输入', trigger: 'change' }],
                qualificationsName: [{ required: true, message: '请输入', trigger: 'change' }],
                qualificationsType: [{ required: true, message: '请输入', trigger: 'change' }],
                useBusiness: [{ required: true, message: '请输入', trigger: 'change' }],
                awardUnit: [{ required: true, message: '请输入', trigger: 'change' }],
                awardDate: [{ required: true, message: '请输入', trigger: 'change' }],
                takeEffectDate: [{ required: true, message: '请输入', trigger: 'change' }],
                invalidDate: [{ required: true, message: '请输入', trigger: 'change' }],
            },
            type:'add'
        };
    },
    created() {
        if(this.$route.query){
           this.type = this.$route.query.type;
        }
    },
    methods: {
        saveQualifications(){
             this.$router.go(-1);
        }
    },
};
</script>
<style scoped lang="scss">
.addQualifications{
    margin-top:40px;
    .top-content{
        height: 82px;
       justify-content: center;
        position: relative;
        display: flex;
        align-items: center;
        .top-content-title{
            font-family:SourceHanSansCN-Medium,SourceHanSansCN;
            font-weight:500;
            color:rgba(34,34,34,1);
            height:24px;
            line-height:24px;
            span{
                font-size:24px ;
            }
        }
        .top-toolbar{
            position: absolute;
            right: 0px;
            div{
                user-select: none;
                cursor: pointer;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                height: 32px;
                line-height: 32px;
                padding: 7px;
                border-radius:2px;
                border:1px solid rgba(208,208,208,1);
                margin-right: 12px;
                color: #3D568E;
                &:last-child{
                    margin-right: 30px;
                }
                .svg-icon{
                    height:18px;
                    width:18px;
                    margin-right: 4px;
                    vertical-align: text-top;
                }
            }
        }
    }
    .main-content{
        width:100%;
        height: 100%;
        position: relative;
        margin-top: 80px;
        .el-form{
            width: 800px;
            margin: 0 auto;
            .row_item{
                width: 800px;
                .el-form-item {
                    display: inline-block;
                    /deep/ .el-input,
                    /deep/ .el-select,
                    /deep/ .el-cascader {
                        width: 100% !important;
                    }
                    /deep/ .el-form-item__content{
                        height: 40px;
                        width: 240px;
                    }
                    /deep/ .el-form-item__label{
                        font-size:16px;
                        font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                        font-weight:400;
                        color:rgba(34,34,34,1);
                    }
                    /deep/ .el-input__inner{
                        border-radius:2px;
                        border:1px solid rgba(151,151,151,1);
                        font-size:16px;
                        padding-left: 16px;
                    }
                    /deep/ input::-webkit-input-placeholder {
                        font-size:16px;
                        font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                        font-weight:400;
                        color:rgba(136,136,136,1);
                    }
                    /deep/ .el-input__prefix{
                           left: unset;
                            right: 13px;
                        .el-input__icon{
                            width: 14px;
                            font-size: 15px;
                        }
                    }
                    /deep/ .el-form-item__label:before {
                        content: '';
                        color: unset;
                        margin-right:unset;
                    }
                }
            }
        }
    }
}
</style>
