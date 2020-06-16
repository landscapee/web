<template>
    <div>
         <div  class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <!--<span>{{yearData.deptName}}-{{yearData.year}}年度-安全绩效</span>-->
                    <el-select v-model="form.dept" filterable >
                        <el-option v-for="item in deptData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <el-select v-model="form.year" filterable >
                        <el-option v-for="item in yearS" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div class="top-toolbar">
                      <div ><icon iconClass="export" ></icon>导出</div>
                </div>
            </div>

            <div class="main-content">
                <SearchTable :noSearch="true" :spanMethod="objectSpanMethod" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable"       :showHeader="false" :showPage="true" >
                </SearchTable>
            </div>

        </div>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { safetyYearConfig } from '../tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable
        },
        name: '',
        data() {
            return {
                yearS:[],
                deptData:[{label:1111,value:11111}],
                tableData:[],
                tableConfig:safetyYearConfig(),
                form:{},
                yearData:{},

            };
        },
        created() {
            this.yearData = {
                deptName:'',
                year:new Date().getFullYear(),
            };
            this.getList();
        },
        watch:{

        },
        methods: {

            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {
                    if (row.col>1&&rowIndex % row.col === 0) {
                        return {
                            rowspan: row.col,
                            colspan: 1
                        };
                    } else {
                        return {
                            rowspan: 1,
                            colspan: 1 ,

                        };
                    }
                }
            },
            getList(){
                request({
                    url:`${this.$ip}/qualification/securityMerits/getList`,
                     method: 'post',
                    data:{...this.yearData}
                })
                    .then((data) => {
                        this.tableData =[]
                        data.data.map((k,l)=>{
                             let data={}
                            console.log(k.month,111);
                            k.securityMeritsDetails.map((q,w)=>{
                              data={
                                  month:k.month,
                                      ...q,
                                  col:k.securityMeritsDetails.length,
                              }
                                this.tableData.push(data)
                             })

                         })
                     })
            },


        },
    }
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";
    .sysParameter{
        margin-top:40px;

    }
    .top-content-title{
        /deep/ .el-select{

            .el-input__inner{
                border: 0!important;
            }
            .el-input__suffix{

            }
        }

    }
</style>
