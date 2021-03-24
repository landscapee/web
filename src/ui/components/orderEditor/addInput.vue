<template>
    <div class="index">
        <el-dialog title="输入框类型" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">

                 <el-form-item  class="leftMargin"   label="预览"    >
                     <input type="text" v-model="text" :style="form.widthType=='adjust'?{width}:{}" :inputtype="form.type">
                     <span v-if="form.type=='string'">可以输入任何字符</span>
                     <span v-else>只能输入数字</span>
                 </el-form-item>
                <el-form-item    label="类型"  prop="type" >
                    <el-radio v-model="form.type" label="string">字符串</el-radio>
                    <el-radio v-model="form.type" label="num">数字</el-radio>
                 </el-form-item>
                <el-form-item    label="宽度"  prop="type" >
                    <el-radio v-model="form.widthType" label="def" @change="widthTypeC">默认</el-radio>
                    <el-radio v-model="form.widthType" label="adjust" @change="widthTypeC">手动调整</el-radio>
                    <el-slider  v-if="form.widthType=='adjust'" v-model="form.width" :min="40" :max="140" @change="widthC"></el-slider>

                </el-form-item>

            </el-form>
            <div slot="footer" class="Qfooter">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="addConfirmFn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
    import { bindInputFn, } from '@lib/tools.js';
    import {debounce} from '@lib/tools';

    export default {
        data() {
            return {
                width:'40px',
                type: "",
                text: "",
                form:{type:'string',widthType:'def' },
                dialogFormVisible: false,

                rules:{
                    type:[{required:true,message: '请选择输入框类型',trigger:'blue'}]
                }
            };
        },
        watch:{
          'form.type':function () {
              this.text=null
          }
        },
        mounted(){

        },
        methods:{
            widthTypeC(val){
                if(val=='def'){
                    this.width='40px'
                     this.$set(this.form,'width',null)
                }
            },
            widthC(val){
                debounce(()=>{
                    this.width=val+'px'
                },50)()
            },
            formatTooltip(val) {
                return val * 4;
            },
            open(type){
                 this.dialogFormVisible = true;
                this.$nextTick(()=>{
                    bindInputFn(this)
                })
            },
            close(){
                this.dialogFormVisible = false
            },
            addConfirmFn(){
                 this.$emit('addConfirmFn',  this.form.type,this.form.width)
                this.dialogFormVisible = false
            },

        }
    };
</script>
<style lang="scss" scoped>
    .index{
        .leftMargin{
            /deep/ .el-form-item__label{
                padding-left: 12px;
            }
        }
        /deep/ .el-dialog{
            width:600px;
            .el-dialog__header{
                text-align: center;
            }
            .el-dialog__body{
                padding: 20px ;
            }

            .el-form-item__label{
                width:100px!important;
            }
            .el-form-item__content{
                width:calc(100% - 100px)!important;
                margin: 0!important;
                .el-input{
                    width:100%!important;
                }
            }
            .el-slider{
                width:60%;
            }
        }

    }
</style>