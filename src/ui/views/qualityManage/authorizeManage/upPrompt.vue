<template>
    <el-dialog class="AddVehiclVeiw" title="上传失败提示" :close-on-click-modal="false" center append-to-body :visible.sync="dialogVisible" :before-close="close">
        <div class="diaDiv"  >
            <p>{{content}}</p>
        </div>

      </el-dialog>
</template>

<script>
     export default {
        name: 'download',
        data() {
            return {
                content: '',
                 dialogVisible: false,
            };
        },
        methods: {
            close() {
                this.dialogVisible = false;
                this.content = '';
             },

            open(data) {

                this.dialogVisible = true;
                this.content = data;
            },
        },
    };
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog {
        width: 650px;
        .el-dialog__body{
            max-height: 600px;
            overflow-y: auto;
        }
        .diaDiv {
            font-size: 16px;
            padding: 20px 20px;

        }
    }
</style>
