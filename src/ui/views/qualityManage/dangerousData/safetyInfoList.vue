<template>
    <div>
        <el-dialog title="相关安全信息列表"    :visible.sync="dialogTableVisible" class="dialog">

            <SearchTable :noSearch="true" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable"    :showHeader="false" :showPage="true" >

                <el-table-column align="center" slot="option" label="操作" :width="90" >
                    <template slot-scope="{ row }">

                        <el-tooltip class="item" effect="dark" :enterable="false" content="详情" placement="top">
                                <span @click="seeDetails(row)" class="rowSvg">
                                    <icon iconClass="info"  ></icon>
                                </span>
                        </el-tooltip>
                    </template>
                </el-table-column>

            </SearchTable>
            <SafetyInfoDetails ref="SafetyInfoDetails"></SafetyInfoDetails>
        </el-dialog>
    </div>
</template>
<script>
    import Icon from '@components/Icon-svg/index';

    import SearchTable from '@/ui/components/SearchTable/index';
    import { safetyInfoListConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import SafetyInfoDetails from './safetyInfoDetails';

     export default {
        components:{
            SearchTable,SafetyInfoDetails,Icon
        },
        data() {
            return {
                 tableData:[],
                dialogTableVisible: false,

                tableConfig:safetyInfoListConfig(),
            }
        },
        mounted(){

        },

        methods:{
            seeDetails(row){
                this.$refs.SafetyInfoDetails.open(row)

            },
            open(str){

                this.dialogTableVisible = true
                this.getList(str)
            },
            closeFn(){
               this.tableData=[]
                this.dialogTableVisible = false
            },

            getList(str){

                request({
                    url:`${this.$ip}/mms-qualification/securityInformation/listByNumbers`,
                    method: 'post',
                    data:{infNumber:str},
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
    /deep/ .mainTable{
        height:350px!important;
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
    }
</style>
