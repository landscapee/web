<template>
    <div>
        <el-dialog title="安全信息详情" :visible.sync="dialogTableVisible" append-to-body class="dialog">
            <div>
                <div class="divBox">
                    <span class="label">信息编号：</span>
                    <span class="info">{{form.infNumber ||"--"}}</span>
                </div>
                <div class="divBox">
                    <span class="label">信息描述：</span>
                    <span class="info">{{form.infRemark||'--' }}</span>
                </div>
                <div class="divBox">
                    <span class="label">信息来源：</span>
                    <span class="info">{{form.infSources||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">日期：</span>
                    <span class="info">{{ form.infDate? moment(form.infDate).format('YYYY-MM-DD'):'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">时间：</span>
                    <span class="info">{{form.infTime? moment(form.infTime).format('HH:mm:ss'):'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">班组名称：</span>
                    <span class="info">{{form.teamName||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">机位号：</span>
                    <span class="info">{{form.seat||'--'}}</span>
                </div>

                <div class="divBox">
                    <span class="label">原因分类：</span>
                    <span class="info">{{form.reasonType||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">是否重复违规：</span>
                    <span class="info">{{form.repeatedViolations===true?'是':form.repeatedViolations===false?'否':'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">是否核心风险：</span>
                    <span class="info">{{form.coreRisk===true?'是':form.coreRisk===false?'否':'--'}}</span>

                </div>
                <div class="divBox">
                    <span class="label">负责人：</span>
                    <span class="info">{{form.responsibleUnit||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">单位：</span>
                    <span class="info">{{form.unit||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">所属系统：</span>
                    <span class="info">{{form.deptName||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">违规/差错：</span>
                    <span class="info">{{form.situation||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">地点：</span>
                    <span class="info">{{form.place||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">原因分析：</span>
                    <span class="info">{{form.reason||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">整改措施：</span>
                    <span class="info">{{form.measures||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">控制状态：</span>
                    <span class="info">{{form.controlState||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">工作环节：</span>
                    <span class="info">{{form.workLink||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">关键词：</span>
                    <span class="info">{{form.keyWord||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">是否安全/服务事件：</span>
                    <span class="info">{{form.serviceEvents||'--'}}</span>
                </div>
                <div class="divBox">
                    <span class="label">备注：</span>
                    <span class="info">{{form.remark||'--'}}</span>
                </div>


            </div>

        </el-dialog>
    </div>
</template>
<script>

    import moment from 'moment'

    export default {
        components: {},
        data() {
            return {
                moment: moment,
                dialogTableVisible: false,
                form: {},
            }
        },
        mounted() {

        },

        methods: {

            open(row = {}) {

                this.dialogTableVisible = true
                this.form = {...row}
            },
            closeFn() {
                this.form = {}
                this.dialogTableVisible = false
            },


        }
    }
</script>
<style scoped lang='scss'>
    /deep/ .el-dialog {
        width: 850px;
    }

.divBox{

    padding: 15px 0;
    border-bottom: 1px rgba(182, 182, 182, 0.12) solid;
    .label,.info{
        display: inline-block;
        font-size: 16px;
    }
    .label{

        vertical-align: top;
         width: 160px;
        opacity: .8;

    }
    .info{
        width: 630px;

    }
}
    .dialog {
        /deep/ .el-dialog__header {
            text-align: center;
        }
        /deep/ .el-dialog__body {
            padding: 20px;
            font-size: 20px;
            height:  calc(100vh - 240px);;
            overflow-y: auto;
        }
    }
</style>
