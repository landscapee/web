<template>
    <div>
         <div  class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">

                     <span class="dept">
                         <el-select  @change="deptFouce" ref="dept"  v-model="form.deptId" filterable >
                            <el-option v-for="item in deptData" :key="item.value" :label="item.label" :value="item.value"></el-option>
                         </el-select>
                    </span>
                    <span>
                         <el-select style="width:100px"   ref="year"  v-model="form.year" filterable >
                            <el-option v-for="item in yearS" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        年度-安全绩效
                    </span>

                </div>
                <div class="top-toolbar">
                     <div @click="exportExcel()">
                        <icon iconClass="export" ></icon>导出
                        <a ref="a" :href="`${this.$ip}/qualification/download/yearSecurityMerits?year=${form.year}&deptId=${form.deptId}`"></a>
                    </div>

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
                 deptData:[{label:'qweqweqwe',value:'1'},{label:'qweqqsdfsdfsdweqwe',value:'ddfd'},],
                deptDataObj:{
                    ddfd:'qweqqsdfsdfsdweqwe',
                    '1':'qweqweqwe',
                },
                tableData:[],
                tableConfig:safetyYearConfig(),
                form:{},
            };
        },
        created() {
            this.form = {
                deptId:'1',
                year:new Date().getFullYear()+'',
            };


            request({
                url:`${this.$ip}/qualification/securityMerits/getYearList`,
                method: 'get',
             }).then((d)=>{
                this.yearS=d.data.map((k,l)=>{
                     return{
                        label:k,
                        value:k,
                    }
                })
            })
            request({
                url:`${this.$ip}/qualification/businessDictionaryValue/listByCode/dept`,
                method: 'get',
             }).then((d)=>{
                this.deptData=d.data.map((k,l)=>{
                     return{
                        label:k,
                        value:k,
                    }
                })
            })
            this.getList();
        },
        watch:{

        },
        mounted(){
            let num=this.deptDataObj[this.form.deptId].length*15+40
            this.$refs.dept.$el.style.width=`${num}px`
        },
        methods: {
            deptFouce(val){

                let num=0
                console.log(val.length);
                if(val.length){
                    num=this.deptDataObj[this.form.deptId].length*15+40
                }
                console.log(num);
                this.$refs.dept.$el.style.width=`${num}px`
            },

            exportExcel(){
                console.log(this.form);
                this.$refs.a.click()
            },
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
                    data:{deptName:this.form.dept,year:this.form.year}
                }).then((data) => {
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
                font-size: 24px;
                color:black;
                border: 0!important;
            }
            .el-input__suffix{

            }
        }

    }
    /deep/ .el-icon-arrow-up:before{
        color: black;
        font-size: 24px;
        content:'\e78f';
    }
    .dept{

    }
</style>
