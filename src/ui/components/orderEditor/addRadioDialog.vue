<template>
    <div class="index">
        <el-dialog title="弹窗" :visible.sync="dialogFormVisible">
            <el-form :model="form" :rules="rules">
                
                <el-form-item v-for='(i, index) in radioInputList' :key='index' label="添加名称"  >
                    <el-input v-model="i.value" autocomplete="off"></el-input>
                </el-form-item>
                  <el-form-item    label="标识"  prop="type" >
                    <el-radio v-model="form.type" label="1">radio单选</el-radio>
                    <el-radio v-model="form.type" label="2">checkbox多选</el-radio>
                    <el-radio v-model="form.type" label="3">N/A</el-radio>
                </el-form-item>
                <el-form-item    label="样式"  prop="type" >
                    <el-radio v-model="form.style" label="1">
                        <input v-if="form.type==1" type="radio" class="Wtui-checkbox" disabled  label="1" checked />
                        <input v-else type="checkbox"     disabled    label="1" checked />
                    </el-radio>
                    <el-radio v-model="form.style" label="2">
                        <input  v-if="form.type==1" type="radio"   class=" Wtui-radioCC" disabled   label="1" checked />
                        <input   v-else type="checkbox" class="Wtui-radioCC Wtui-checkboxCC"  disabled   label="1" checked />
                    </el-radio>
                 </el-form-item>

                <el-button type="primary" @click="addRadioFn">增加选项</el-button>
            </el-form>
            <div slot="footer" class="Qfooter">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addConfirmFn">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
export default {
    data() {
        return {
            type: "",
            form:{type:'1',style:'1'},
            dialogFormVisible: false,
            radioInputList:[
                {
                    name:"input0",
                    value:""
                }
            ],
            rules:{
                type:[{required:true,message: '请选择标识',trigger:'blue'}]
            }
         };
    },
    methods:{
        init(){
            this.radioInputList = [
                {
                    name:"input0",
                    value:""
                }
            ]
        },
        open(type){
            this.init()
            this.dialogFormVisible = true;
            // if(type){
            //
            //     this.type = type
            // }else{
            //     this.$message({
            //         type: 'warning',
            //         message: 'Function open arguments[0] is required！'
            //     });
            // }
        },
        addConfirmFn(){
            // this.radioInputList = this.radioInputList.filter(i=>i.value)
            this.radioInputList = [...this.radioInputList]
            this.$emit('addConfirmFn', this.radioInputList, this.form)
            this.dialogFormVisible = false
        },
        addRadioFn(){
            let d=new Date()
            let num=d.getHours()+'' + d.getMinutes() + d.getSeconds() + d.getMilliseconds()
            this.radioInputList.push({
                name:"input"+num+(this.radioInputList.length),
                value:""
            })
        },
        unique(list) {
            var arr = [];
            for (var i = 0; i < list.length; i++) {
                if (i == 0){
                    arr.push(list[i]);
                } 
                var b = false;
                if (arr.length > 0 && i > 0) {
                    for (var j = 0; j < arr.length; j++) {
                        if (arr[j].value == list[i].value) {
                            b = true;
                            //break;
                        }
                    }
                    if (!b) {
                        arr.push(list[i]);
                    }
                }
            }
            return arr;
        }
    }
};
</script>
<style lang="scss" scoped>
    .index{
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

        }

    }
</style>