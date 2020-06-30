<template>
    <div>
        <el-dialog title="试卷导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <el-form-item label="编号：">
                    <span>{{row.paperCode}} </span>
                </el-form-item>
                <el-form-item label="名称：">
                    <span>{{row.paperName}} </span>
                </el-form-item>
                <el-form-item label="格式：">
                    <el-radio-group v-model="form.sourcesId">
                        <el-radio label="WORD" value="WORD"></el-radio>
                        <el-radio label="PDF" value="PDF"></el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div class="QfooterTest">
                <a ref="a" :href="`${this.$ip}/mms-training/paperInfo/export/${this.row.id}`"></a>
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit('form')">导出</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    import request from '@lib/axios.js';

    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                form:{sourcesId:'WORD'},
                rules:{},

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
                this.dialogFormVisible=true
                debugger
                this.row={...data}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {

                    if (valid) {
                          this.$refs.a.click()
                    }
                });
            },
            close(){
                this.row={}
                this.from={}
                this.dialogFormVisible=false
            }
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
/deep/ .el-dialog{
    width: 600px;
    .el-dialog__body{
        .el-form-item__label{
            width:100px;
        }
    }

}
.footer{
    display: flex;
    justify-content: center;
    .el-button{
        padding: 10px 30px;
        margin: 20px 0;
    }
    .el-button:first-child{
        margin-right: 20px;
    }
}
</style>