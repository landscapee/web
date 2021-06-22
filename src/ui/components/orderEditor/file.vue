<template>
    <div class="index">
        <el-dialog title="文件上传" :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" :rules="rules" ref="form" :before-close="close">

                <el-form-item class="leftMargin" label="宽（单位px）">
                    <el-input type="number" v-model.number="form.width" placeholder="请输入数字"></el-input>
                    <el-button type="primary" @click="seeimg">预览</el-button>
                </el-form-item>
                <!--<el-form-item class="leftMargin"  label="高（单位px）">-->
                    <!--<el-input v-model="form.height"></el-input>-->
                <!--</el-form-item>-->
                <el-form-item label="选择图片" prop="file">
                    <div class="imgbox">

                        <!--:on-preview="onPreview"-->

                        <el-upload action="#" ref="upFile"
                                   list-type="picture-card"
                                   :http-request="handleSubmit"
                                   :before-upload="beforeAvatarUpload"
                                   :before-remove="beforeRemove"
                                   :auto-upload="true"
                                   accept=".jpg,.png,.gif,.jpeg,image/png,image/jpg,image/jpeg"
                                    >
                            <i slot="default" class="el-icon-plus"></i>

                        </el-upload>


                    </div>
                </el-form-item>

            </el-form>
            <div slot="footer" class="Qfooter">
                <el-button @click="close">取 消</el-button>
                <el-button type="primary" @click="addConfirmFn('form')">确 定</el-button>
            </div>
        </el-dialog>
        <el-dialog title="预览" :visible.sync="dialogFormVisible1"  :before-close="close1">
             <div style="padding: 20px">
                 <img :style="'width:'+form.width+'px'" v-for="(opt,index) in getimg" :key="index" :src="opt" alt="">
             </div>
        </el-dialog>
    </div>
</template>
<script>
    import {bindInputFn,} from '@lib/tools.js';
    import {debounce} from '@lib/tools';

    export default {
        data() {
            return {
                fileList: [],
                fileobj: {},
                form: {file: null,width:70},
                dialogFormVisible: false,
                dialogFormVisible1: false,
                rules: {
                    file: [{required: true, message: '请选择文件', trigger: 'blue'}]
                }
            };
        },
        computed:{
            fileobjC(){
                return this.fileobj
            },
            getimg(){
                let arr= Object.keys(this.fileobj).map((k,l)=>{
                    return this.fileobj[k]
                })
                return arr
            }
        },
          watch:{
              'fileobjC':{
                  handler(n){
                      console.log(n);
                      this.form.file=Object.keys(n).length||null
                      console.log('watch',n,this.form.file);
                  },
                  deep:true,
              }
          } ,
        methods: {
            seeimg(){
                if(this.getimg.length){
                    this.dialogFormVisible1=true
                }else{
                    this.$message.info('请先选择文件')
                }
            },
            getvalue(obj){
               let arr= Object.keys(obj).map((k,l)=>{
                        return obj[k]
                })
                return arr
            },
            getBase64 (file) {
                return new Promise((resolve, reject) => {
                    let reader = new FileReader();
                    let imgUrlBase64 = reader.readAsDataURL(file);
                    console.log('imgUrlBase64', imgUrlBase64);
                    reader.onload = function (e) {
                        resolve(reader.result);
                    };
                });
            },
            beforeAvatarUpload(file) {
                  this.getBase64(file).then((d)=>{
                       this.$set(this.fileobj,file.uid,d)
                })
                const isLt5M = file.size / 1024 / 1024 <= 1;
                if (!isLt5M) {
                    this.$message.error('上传图片大小不能超过 1MB!');
                }
                return isLt5M
            },
            handleSubmit(file) {
                console.log(file);
            },
            // onPreview(file) {
            // window.open(file.url)
            //     console.log(file);
            // },
            beforeRemove(file,q,w) {
                 delete this.fileobj[file.uid]
            },
            open() {

                this.dialogFormVisible = true
            },
            close1(){
                this.dialogFormVisible1 = false

            },
            close() {
                this.fileobj = {}
                this.form = {}
                this.dialogFormVisible = false
            },
            addConfirmFn(form) {
                this.$refs[form].validate(valid => {
                    if (valid) {
                         this.$emit('getImage', {...this.form},this.getvalue(this.fileobj))
                        this.dialogFormVisible = false
                    }})

            },

        }
    };
</script>
<style lang="scss" scoped>
    .index {
        .leftMargin {
            .el-form-item__label {
                padding-left: 12px;
            }
            /deep/ .el-form-item__label {
                padding-left: 12px;
            }
        }

        /deep/ .el-dialog {
            width: 615px;
            .el-dialog__header {
                text-align: center;
            }
            .el-dialog__body {
                padding: 20px;
            }

            .el-form-item__label {
                width: 120px !important;
            }
            .el-form-item__content {
                width: calc(100% - 121px) !important;
                margin: 0 !important;
                .el-input {
                    width: 200px !important;
                }
            }
            .el-slider {
                width: 60%;
            }
        }
        /deep/ .el-upload-list__item {
            img {
                height: auto !important;
            }
        }
    }
</style>