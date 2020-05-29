<template>
    <div class="addPersonDoc">
        <div class="top-content">
            <div class="top-content-title">
                <span>预警管理-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div class="top-toolbar">
                <div @click="saveQualifications"><icon iconClass="save" ></icon>保存</div>
                <div><icon iconClass="reset" ></icon>重置</div>
            </div>
        </div>
        <div class="main-content">
           <el-form label-position="right" :model="form" :rules="rules" ref="rules"  class="">
               <div class="row_item">
                    <el-form-item label="预警发送日期" prop="name" label-width="164px">
                        <span v-if="type=='info'">{{form.name}}</span>
                        <el-input v-else v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="预警类型" prop="number" label-width="164px">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else v-model="form.number"></el-input>
                    </el-form-item>
               </div>
               <div class="row_item">   
                    <el-form-item label="预警来源" prop="certificateNumber" label-width="164px">
                        <span v-if="type=='info'">{{form.certificateNumber}}</span>
                        <el-input v-else v-model="form.certificateNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="来源员工编号" prop="qualificationsName" label-width="164px">
                        <span v-if="type=='info'">{{form.qualificationsName}}</span>
                        <el-input v-else v-model="form.certificateNumber"></el-input>
                    </el-form-item>
               </div>  
               <div class="row_item">
                    <el-form-item label="来源员工" prop="qualificationsType" label-width="164px">
                       <span v-if="type=='info'">{{form.qualificationsType}}</span>
                       <el-date-picker v-else type="date" placeholder="选择日期" v-model="form.qualificationsType" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="员工上级" prop="useBusiness" label-width="164px">
                        <span v-if="type=='info'">{{form.useBusiness}}</span>
                        <el-select v-else v-model="form.useBusiness" placeholder="请选择在岗状态">
                            <el-option label="试用期" value="试用期"></el-option>
                            <el-option label="正式在岗" value="正式在岗"></el-option>
                            <el-option label="待岗" value="待岗"></el-option>
                            <el-option label="离职" value="离职"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item row_item_row">
                    <el-form-item label="预警状态" prop="awardUnit" label-width="164px">
                        <span v-if="type=='info'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                        <el-select v-else v-model="form.awardUnit" placeholder="请选择所在项目">
                            <el-option label="桥载项目" value="桥载项目"></el-option>
                            <el-option label="勤务项目" value="勤务项目"></el-option>
                            <el-option label="维修项目" value="维修项目"></el-option>
                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_item_row row_item">
                    <el-form-item label="预警内容" prop="takeEffectDate" label-width="164px">
                        <span v-if="type=='info'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                         <el-input v-else v-model="form.takeEffectDate"></el-input>
                    </el-form-item>
                </div>
                <div class="release_button">
                    <el-button type="primary">收到预警消息确认</el-button>
                    <el-button type="primary">预警业务处理确认</el-button>
                    <el-button type="primary">关闭预警消息</el-button>
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
    .release_button{
        .el-button{
            margin-top: 40px;
        }
    }
    .row_item{
        display: flex;
    }
    .el-form{
         width: 796px;
    }
}
</style>
