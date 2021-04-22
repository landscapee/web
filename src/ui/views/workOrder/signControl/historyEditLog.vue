<template>
    <div>
        <el-dialog title="历史修改记录"    :visible.sync="dialogTableVisible" class="dialog">
            <SearchTable :noSearch="true" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable"    :showHeader="false" :showPage="true" >

            </SearchTable>
        </el-dialog>
    </div>
</template>
<script>
    import Icon from '@components/Icon-svg/index';
    import SearchTable from '@/ui/components/SearchTable/index';
    import { historyEditLogConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
     export default {
        components:{
            SearchTable,Icon
        },
        data() {
            return {
                 tableData:[],
                dialogTableVisible: false,
                tableConfig:historyEditLogConfig(),
            }
        },
        methods:{
            seeDetails(row){
                this.$refs.SafetyInfoDetails.open(row)
            },
            open(row){
                this.dialogTableVisible = true
                this.getList(row)
            },
            closeFn(){
               this.tableData=[]
                this.dialogTableVisible = false
            },
            getList(row){

                request({
                    url:`${this.$ip}/mms-workorder/exceptionRecord/list/${row.serialNo}`,
                    method: 'get',
                 }).then((data) => {
                         this.tableData = data.data
                })
            },
        }
    }
</script>
<style scoped lang='scss'>
    /deep/ .el-dialog{
        width: 850px;
    }

    .dialog {
        /deep/ .el-dialog__header{
            text-align: center;
        }
        /deep/ .el-dialog__body {
            padding:20px;
            font-size: 20px;
            height: 445px;
            overflow-y: auto;
        }
        /deep/ .mainTable{
            height:350px!important;
        }
        .mainTable{
            height:350px!important;
        }
    }
</style>
