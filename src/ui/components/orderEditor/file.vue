<template>
    <div class="index">
        <el-dialog title="文件上传" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">

                <el-form-item label="宽（单位px）">
                    <el-input v-model="form.width"></el-input>
                </el-form-item>
                <el-form-item label="高（单位px）">
                    <el-input v-model="form.height"></el-input>
                </el-form-item>
                <el-form-item label="预览">
                    <el-input v-model="form.height"></el-input>
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
                form:{  },
                dialogFormVisible: false,
                rules:{
                    file:[{required:true,message: '请选择文件',trigger:'blue'}]
                }
            };
        },


        methods:{

            open(){

            },
            close(){
                this.dialogFormVisible = false
            },
            addConfirmFn(){
                this.$emit('upfile', this.form.file)
                this.dialogFormVisible = false
            },

        }
    };
</script>
<style lang="scss" scoped>
    .index{
        .leftMargin{
              .el-form-item__label{
                padding-left: 12px;
            }
            /deep/ .el-form-item__label{
                padding-left: 12px;
            }
        }
          .el-dialog{
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