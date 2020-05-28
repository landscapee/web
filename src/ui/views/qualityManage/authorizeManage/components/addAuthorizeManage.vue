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
                <div class="release_button">
                    <el-button type="primary">授权发布</el-button>
                    <el-button type="primary">授权取消</el-button>
                    <el-button type="primary">授权延期</el-button>
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
@import "@/ui/styles/common_form.scss";
.addAuthorizeManage{
    margin-top:40px;
    .release_button{
        .el-button{
            margin-top: 40px;
        }
    }
}
</style>
