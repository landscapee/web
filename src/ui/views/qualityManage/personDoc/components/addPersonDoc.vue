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
@import "@/ui/styles/common_form.scss";
.addPersonDoc{
    margin-top:40px;

}
</style>
