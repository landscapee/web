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
                        <span v-if="type=='info'">{{form.name}}</span>
                        <el-input v-else v-model="form.name" ></el-input>
                    </el-form-item>
                    <el-form-item label="员工编号" prop="number" label-width="164px">
                        <span v-if="type=='info'">{{form.number}}</span>
                        <el-input v-else v-model="form.number"></el-input>
                    </el-form-item>
               </div>
               <div class="row_item">   
                    <el-form-item label="资质证书号" prop="certificateNumber" label-width="100px">
                        <span v-if="type=='info'">{{form.certificateNumber}}</span>
                        <el-input v-else v-model="form.certificateNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="资质名称" prop="qualificationsName" label-width="164px">
                        <span v-if="type=='info'">{{form.qualificationsName}}</span>
                        <el-input v-else v-model="form.qualificationsName"></el-input>
                    </el-form-item>
               </div>  
               <div class="row_item">
                    <el-form-item label="资质类型" prop="qualificationsType" label-width="100px">
                        <span v-if="type=='info'">{{form.qualificationsType}}</span>
                        <el-select v-else v-model="form.qualificationsType" placeholder="请选择资质类型">
                            <el-option label="桥载资质" value="桥载资质"></el-option>
                            <el-option label="勤务资质" value="勤务资质"></el-option>
                            <el-option label="维修勤务资质" value="维修勤务资质"></el-option>
                            <el-option label="维修资质" value="维修资质"></el-option>
                            <el-option label="放行资质" value="放行资质"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="适用业务" prop="useBusiness" label-width="164px">
                        <span v-if="type=='info'">{{form.useBusiness}}</span>
                        <el-input v-else v-model="form.useBusiness"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="颁发单位" prop="awardUnit" label-width="100px">
                        <span v-if="type=='info'">{{form.awardUnit}}</span>
                        <el-input v-else v-model="form.awardUnit"></el-input>
                    </el-form-item>
                    <el-form-item label="颁发日期" prop="awardDate" label-width="164px">
                        <span v-if="type=='info'">{{form.awardDate}}</span>
                        <el-date-picker v-else type="date" placeholder="选择日期" v-model="form.awardDate" style="width: 100%;"></el-date-picker>
                    </el-form-item>
                </div>
                <div class="row_item">
                    <el-form-item label="生效日期" prop="takeEffectDate" label-width="100px">
                        <span v-if="type=='info'">{{form.takeEffectDate}}</span>
                        <el-date-picker v-else type="date" placeholder="选择日期" v-model="form.takeEffectDate" style="width: 100%;"></el-date-picker>
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
                takeEffectDate: [{ required: true, message: '请输入', trigger: 'change' },
                    {
						validator: (rule, value, callback) => {
							if ( value >= this.invalidDate) {
								callback(new Error('生效日期应小于失效日期'));
							} else {
								callback();
							}
						},
						trigger: 'change',
                    }
                ],
                invalidDate: [{ required: true, message: '请输入', trigger: 'change' },
                    {
						validator: (rule, value, callback) => {
							if (value < this.takeEffectDate) {
								callback(new Error('失效日期应大于等于生效日期'));
							} else {
								callback();
							}
						},
						trigger: 'change',
                    }
                ],
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
.addQualifications{
    margin-top:40px;

}
</style>
