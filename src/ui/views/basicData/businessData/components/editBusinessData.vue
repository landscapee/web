<template>
    <div class="editBusinessData">
        <div class="top-content">
            <div class="top-content-title">
                <span>业务数据类型-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div class="top-toolbar">
                <div @click="saveQualifications"><icon iconClass="save" ></icon>保存</div>
                <div><icon iconClass="reset" ></icon>重置</div>
            </div>
        </div>
        <div class="main-content">
           <el-form label-position="right" :model="form" :rules="rules" ref="rules"  class="">
                <div class="row_item">   
                    <el-form-item label="类型" prop="certificateNumber" >
                        <span v-if="type=='info'">{{form.certificateNumber}}</span>
                        <el-input v-else v-model="form.certificateNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="类型编码" prop="qualificationsName" >
                        <span v-if="type=='info'">{{form.qualificationsName}}</span>
                        <el-input v-else v-model="form.certificateNumber"></el-input>
                    </el-form-item>
                </div>  
                <div class="row_item_row row_item">
                    <el-form-item label="类型说明" prop="takeEffectDate" >
                        <span v-if="type=='info'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                         <el-input v-else v-model="form.takeEffectDate"></el-input>
                    </el-form-item>
                </div>
                <div class="row_item row_item_row">
                    <el-form-item label="允许维护" prop="awardUnit" >
                        <span v-if="type=='info'">XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX</span>
                        <el-select v-else v-model="form.awardUnit" placeholder="请选择所在项目">
                            <el-option label="允许" value="允许"></el-option>
                            <el-option label="禁止" value="禁止"></el-option>
                        </el-select>
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
.editBusinessData{
    margin-top:40px;
    .release_button{
        .el-button{
            margin-top: 40px;
        }
    }
    .row_item{
        display: flex;
        &:first-child{
            .el-form-item{
                &:last-child{
                   margin-left: 93px;
                }
            }
        }
    }
    .el-form{
        width:754px;
        .el-form-item {
            width: calc(100% - 90px);
        }
        /deep/ .el-form-item__label{
            width: 90px;
        }
        /deep/ .el-form-item__content{
            margin-left: 90px;
        }
    }
}
</style>
