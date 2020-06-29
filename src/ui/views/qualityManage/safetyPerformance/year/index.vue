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
                         <el-select @change="getList" style="width:100px"   ref="year"  v-model="form.year" filterable >
                            <el-option v-for="item in yearS" :key="item.value" :label="item.label" :value="item.value"></el-option>
                        </el-select>
                        年度-安全绩效
                    </span>

                </div>
                <div class="top-toolbar">
                     <div @click="exportExcel()">
                        <icon iconClass="export" ></icon>导出
                        <a ref="a" :href="`${this.$ip}/mms-qualification/download/yearSecurityMerits?year=${form.year}&deptId=${form.deptId}`"></a>
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
                 deptData:[ ],
                deptDataObj:{

                },
                tableData:[],
                tableConfig:safetyYearConfig(),
                form:{},
                num:0,
                sum:0,
            };
        },
        created() {
            this.form = {
                deptId:'server',
                year:new Date().getFullYear()+'',
            };


            request({
                url:`${this.$ip}/mms-qualification/securityMerits/getYearList`,
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
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["dept",]

            }).then((d)=>{
                this.deptData=d.data.dept.map((k,l)=>{
                    this.deptDataObj[k.valCode]=k.valData
                     return{
                        label:k.valData,
                        value:k.valCode,
                    }
                })
                let num=this.deptDataObj[this.form.deptId].length*28+40
                this.$refs.dept.$el.style.width=`${num}px`
            })
            this.getList();
        },
        watch:{

        },
        mounted(){

        },
        methods: {
            deptFouce(val){
                let num=0
                console.log(val.length);
                if(val.length){
                    num=this.deptDataObj[this.form.deptId].length*28+40
                }
                console.log(num);
                this.$refs.dept.$el.style.width=`${num}px`
                this.getList()
            },

            exportExcel(){
                console.log(this.form);
                this.$refs.a.click()
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                if (columnIndex === 0) {

                    // console.log(rowIndex, columnIndex, row.col, row.oldCol);
                    if ((rowIndex - row.oldCol) % row.col === 0) {
                        return {
                            rowspan: row.col,
                            colspan: 1
                        };
                    } else {
                        return [0,0]
                    }
                }
            },
            getList(){
                request({
                    url:`${this.$ip}/mms-qualification/securityMerits/getList`,
                     method: 'post',
                    data:{deptId:this.form.deptId,year:Number(this.form.year)}
                }).then((d) => {
                        this.tableData =[]
                    let sss={...d}
                    sss.data.map((k,l)=>{
                             let data={}
                             let num=0
                        for (let i =0;i<l;i++){
                            num = (sss.data[i].securityMeritsDetails.length||1) + num
                         }
                         if(k.securityMeritsDetails.length){

                            k.securityMeritsDetails.map((q,w)=>{
                                data={
                                    month:k.month,
                                    ...q,
                                    col:k.securityMeritsDetails.length,
                                    oldCol:num,
                                }
                                this.tableData.push(data)
                            })
                        }else {

                            this.tableData.push({
                                month:k.month,
                                col:1,
                                oldCol:num,
                            })
                        }

                         })
                    console.log(this.tableData);
                })
            },


        },
    }
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";
    .sysParameter{
        margin-top:14px;

    }
    .top-content-title{
        height:38px!important;
        /deep/ .el-select{
            .el-input__inner{
                font-size: 24px;
                color:black;
                border: 0!important;
            }
        }

    }
    /deep/ .el-icon-arrow-up:before{
        color: black;
        font-size: 24px;
        content:'\e78f';
    }
    /deep/ .mainTable{
        height: 730px;
        overflow: auto;
    }
    /deep/ .el-table::before {

        width: 0;
     }
</style>
