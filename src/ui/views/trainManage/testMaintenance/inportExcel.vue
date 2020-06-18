<template>
    <div>
        <el-dialog title="试卷导出"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <el-form :model="form" ref="form" :rules="rules">
                <input type="file" @change="importFile(this)" id="imFile" style="display: none"
                       accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"/>
                <Button type="primary" @click="uploadFile">浏览</Button>

            </el-form>
            <div class="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="submit('form')">导出</el-button>
            </div>
        </el-dialog>


    </div>
</template>

<script>
    var XLSX = require("xlsx");
    import request from '@lib/axios.js';
    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                fullscreenLoading: false, // 加载中
                imFile: "", // 导入文件el
                errorMsg: "", // 错误信息内容
                form:{ },
                rules:{},

                row:{},
                dialogFormVisible:false,
            }
        },
        methods: {
            open(data){
                this.dialogFormVisible=true
                this.form={...data}

            },

    submit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                         request({
                             url:`${this.$ip}/qualification/securityMerits/copy`,
                             method:'post',
                             data:{
                                  ...this.form
                             }
                         }).then((d) => {
                              if(d){
                                 this.close();
                             }else {
                                 this.$message({
                                     message: '复制失败',
                                     type: 'error',
                                 });
                             }

                        });
                    }
                });
            },
            close(){
                this.row={}
                this.from={}
                this.dialogFormVisible=false
            },

            uploadFile: function() {
// 点击导入按钮
                this.imFile.click();
            },

            importFile: function() {
// 导入excel
                this.fullscreenLoading = true;
                let obj = this.imFile;
                if (!obj.files) {
                    this.fullscreenLoading = false;
                    return;
                }
                var f = obj.files[0];
                var reader = new FileReader();
                let $t = this;
                reader.onload = function(e) {
                    var data = e.target.result;
                    if ($t.rABS) {
                        $t.wb = XLSX.read(btoa(this.fixdata(data)), {
// 手动转化
                            type: "base64"
                        });
                    } else {
                        $t.wb = XLSX.read(data, {
                            type: "binary"
                        });
                    }
                    let json = XLSX.utils.sheet_to_json($t.wb.Sheets[$t.wb.SheetNames[0]]);
                    $t.dealFile(json); // analyzeData: 解析导入数据
                };
                if (this.rABS) {
                    reader.readAsArrayBuffer(f);
                } else {
                    reader.readAsBinaryString(f);
                }
            },
            dealFile: function(data) {
// 处理导入的数据
                console.log(data);
                this.imFile.value = "";
                this.fullscreenLoading = false;
                if (data.length <= 0) {
                    this.errorMsg = "请导入正确信息";
                } else {
//导入成功，处理数据
                    this.$http.post("collector/import", data).then(
                        function(response) {
                            if (response.body.status == 1) {

                            } else {
                                if (response.body.status == "10101") {
                                    this.$Message.info("未登录");
                                    this.$router.push("/");
                                }
                                this.$Message.info(response.body.message);
                            }
                        },
                        function() {}
                    );
                }
            },

            fixdata: function(data) {
// 文件流转BinaryString
                var o = "";
                var l = 0;
                var w = 10240;
                for (; l < data.byteLength / w; ++l) {
                    o += String.fromCharCode.apply(
                        null,
                        new Uint8Array(data.slice(l * w, l * w + w))
                    );
                }
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
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