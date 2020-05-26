<template>
    <div class="addAuthorizeManage">
        <div class="top-content">
            <div class="top-content-title">
                <span>授权管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div class="top-toolbar">
                <div @click="saveQualifications"><icon iconClass="save" ></icon>保存</div>
                <div><icon iconClass="reset" ></icon>重置</div>
            </div>
        </div>
        <div class="main-content">
           <el-form label-position="right" :model="form" :rules="rules" ref="rules"  class="">
               <div class="row_item">
                    <el-form-item label="员工姓名" prop="name" label-width="110px">
                        <span v-if="type=='info'">{{form.name}}</span>
                        <el-input v-else v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="员工编号" prop="number" label-width="164px">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else v-model="form.number"></el-input>
                    </el-form-item>
               </div>
               <div class="row_item">   
                    <el-form-item label="所属部门" prop="certificateNumber" label-width="110px">
                        <span v-if="type=='info'">{{form.certificateNumber}}</span>
                        <el-select v-else v-model="form.certificateNumber" placeholder="请选择所属部门">
                            <el-option label="桥载" value="桥载"></el-option>
                            <el-option label="勤务" value="勤务"></el-option>
                            <el-option label="勤务" value="勤务"></el-option>
                            <el-option label="勤务" value="勤务"></el-option>
                        </el-select>

                    </el-form-item>
                    <el-form-item label="授权类型" prop="qualificationsName" label-width="164px">
                        <span v-if="type=='info'">{{form.qualificationsName}}</span>
                        <el-select v-else v-model="form.qualificationsName" placeholder="请选择授权类型">
                            <el-option label="维修" value="维修"></el-option>
                            <el-option label="放行" value="放行"></el-option>
                        </el-select>
                    </el-form-item>
               </div>  
               <div class="row_item">
                    <el-form-item label="基础执照编号" prop="qualificationsType" label-width="110px">
                       <span v-if="type=='info'">{{form.qualificationsType}}</span>
                      <el-input v-else v-model="form.qualificationsType" ></el-input>
                    </el-form-item>
                    <el-form-item label="专业" prop="useBusiness" label-width="164px">
                        <span v-if="type=='info'">{{form.useBusiness}}</span>
                        <el-select v-else v-model="form.useBusiness" placeholder="请选择专业">
                            <el-option label="MA" value="MA"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="航班类型权限" prop="awardUnit" label-width="110px">
                        <span v-if="type=='info'">{{form.awardUnit}}</span>
                        <el-select v-else v-model="form.awardUnit" placeholder="请选择航班类型权限">
                            <el-option label="航前" value="航前"></el-option>
                            <el-option label="航后" value="航后"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="机型范围" prop="awardDate" label-width="164px">
                        <span v-if="type=='info'">{{form.awardDate}}</span>
                        <el-select v-else v-model="form.awardDate" placeholder="请选择机型范围">
                            <el-option label="A320" value="A320"></el-option>
                            <el-option label="A330" value="A330"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="授权单位" prop="takeEffectDate" label-width="110px">
                        <span v-if="type=='info'">{{form.takeEffectDate}}</span>
                         <el-input v-else v-model="form.takeEffectDate"></el-input>
                    </el-form-item>
                    <el-form-item label="授权生效日期" prop="invalidDate" label-width="164px">
                        <span v-if="type=='info'">{{form.invalidDate}}</span>
                        <el-date-picker v-else type="date" placeholder="选择日期" v-model="form.invalidDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="授权状态" prop="takeEffectDate" label-width="110px">
                        <span v-if="type=='info'">{{form.takeEffectDate}}</span>
                        <el-select v-else v-model="form.takeEffectDate" placeholder="请选择授权状态">
                            <el-option label="待授权" value="待授权"></el-option>
                            <el-option label="已授权" value="已授权"></el-option>
                            <el-option label="授权取消" value="授权取消"></el-option>
                            <el-option label="授权延期" value="授权延期"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="授权失效日期" prop="invalidDate" label-width="164px">
                        <span v-if="type=='info'">{{form.invalidDate}}</span>
                        <el-date-picker v-else type="date" placeholder="选择日期" v-model="form.invalidDate" style="width: 100%;"></el-date-picker>
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
                name:'XXX XXXX XXXXXXX',
                number:'XXX XXXX XXXXXXX',
                certificateNumber:'XXX XXXX XXXXXXX',
                qualificationsName:'XXX XXXX XXXXXXX',
                qualificationsType:'XXX XXXX XXXXXXX',
                useBusiness:'XXX XXXX XXXXXXX',
                awardUnit:'XXX XXXX XXXXXXX',
                awardDate:'XXX XXXX XXXXXXX',
                takeEffectDate:'XXX XXXX XXXXXXX',
                invalidDate:'XXX XXXX XXXXXXX'
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
           this.$route.meta.title  = this.type =='add'? '新增':this.type =='edit'? '编辑':this.type =='info'?"详情":"";
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
.addAuthorizeManage{
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
        text-align: center;
        .el-form{
            // width: 800px;
            margin: 0 auto;
            .row_item{
                // width: 800px;
                .el-form-item {
                    display: inline-block;
                    span{
                        margin-left: 20px;
                        font-size:16px;
                        font-family:SourceHanSansCN-Regular,SourceHanSansCN;
                        font-weight:400;
                        color:rgba(34,34,34,1);
                    }
                    /deep/ .el-input,
                    /deep/ .el-select,
                    /deep/ .el-cascader {
                        width: 100% !important;
                    }
                    /deep/ .el-form-item__content{
                        height: 40px;
                        width: 240px;
                        text-align: left;
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
