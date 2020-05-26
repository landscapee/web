<template>
    <div class="addPersonDoc">
        <div class="top-content">
            <div class="top-content-title">
                <span>人员档案-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
                        <span v-if="type=='info'">{{form.name}}</span>
                        <el-input v-else v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="员工编号" prop="number" label-width="164px">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else v-model="form.number"></el-input>
                    </el-form-item>
               </div>
               <div class="row_item">   
                    <el-form-item label="身份证号" prop="certificateNumber" label-width="100px">
                        <span v-if="type=='info'">{{form.certificateNumber}}</span>
                        <el-input v-else v-model="form.certificateNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="qualificationsName" label-width="164px">
                        <span v-if="type=='info'">{{form.qualificationsName}}</span>
                        <el-select v-else v-model="form.qualificationsName" placeholder="请选择性别">
                            <el-option label="男" value="男"></el-option>
                            <el-option label="女" value="女"></el-option>
                        </el-select>
                    </el-form-item>
               </div>  
               <div class="row_item">
                    <el-form-item label="入职日期" prop="qualificationsType" label-width="100px">
                       <span v-if="type=='info'">{{form.qualificationsType}}</span>
                       <el-date-picker v-else type="date" placeholder="选择日期" v-model="form.qualificationsType" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="在岗状态" prop="useBusiness" label-width="164px">
                        <span v-if="type=='info'">{{form.useBusiness}}</span>
                        <el-select v-else v-model="form.useBusiness" placeholder="请选择在岗状态">
                            <el-option label="试用期" value="试用期"></el-option>
                            <el-option label="正式在岗" value="正式在岗"></el-option>
                            <el-option label="待岗" value="待岗"></el-option>
                            <el-option label="离职" value="离职"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="所在项目" prop="awardUnit" label-width="100px">
                        <span v-if="type=='info'">{{form.awardUnit}}</span>
                        <el-select v-else v-model="form.awardUnit" placeholder="请选择所在项目">
                            <el-option label="桥载项目" value="桥载项目"></el-option>
                            <el-option label="勤务项目" value="勤务项目"></el-option>
                            <el-option label="维修项目" value="维修项目"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="上级编码" prop="awardDate" label-width="164px">
                        <span v-if="type=='info'">{{form.awardDate}}</span>
                        <el-input v-else v-model="form.awardDate"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="上级姓名" prop="takeEffectDate" label-width="100px">
                        <span v-if="type=='info'">{{form.takeEffectDate}}</span>
                         <el-input v-else v-model="form.takeEffectDate"></el-input>
                    </el-form-item>
                    <el-form-item label="失效日期" prop="invalidDate" label-width="164px">
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
.addPersonDoc{
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
