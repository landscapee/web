<template>
        <div  class="historyInfoPlate">
            <div class="top-content">
                <div class="top-content-title">
                    <span>发布信息-历史</span>
                </div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                     <el-table-column slot="relationInfo" label="关联信息" :width="148" >
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { historyPlateSendTable,historyPlateReceiveTable } from '../../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:historyPlateSendTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            selectId:null
        };
    },
   created() {
       this.getList();
    },
    watch:{
        '$route' (to, from) {
            if(from.query.tag=='send'){
                  this.tableConfig=historyPlateSendTable();
            }else{
                 this.tableConfig=historyPlateReceiveTable();
            }
        },
        params:{
            handler:function(val,oldval){
                this.getList();
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
    },
    methods: {
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null,
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort = {};
            this.sort[column.property] = column.order;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
            this.getList();
        },
        listenToCheckedChange(row, column, event){
            let select = row.selected;
            this.tableData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
            })
            row.selected  = !select;
            if(row.selected){
                this.selectId = row.id;
            }else{
                this.selectId = null;
            }
            this.params.current = 1;
            this.$set(this.tableData.records,row.index,row);
        },
        getList(){
           request({
                url:`${this.$ip}/mms-parameter/rest-api/sysParam/query`, 
                method: 'post',
                data:{...this.sort,...this.form},
                params:this.params
            })
            .then((data) => {
                if(this.params.current==1){
                    this.tableData = {records: data.data.items,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.items,...this.params,total:data.data.total}
                }
            }).catch((error) => {
            
            });
        },
        handleSizeChange(size) {
            this.params.current = 1;
			this.params.size = size;
		},
		handleCurrentChange(current) {
			this.params.current = current;
		},
		handleCheckedChange() {},
		handleSelectionChange() {},
    },
};
</script>
<style scoped lang="scss">
@import "@/ui/styles/common_list.scss"; 
.historyInfoPlate{
    margin-top:40px;
    .main-content{
        /deep/ .mainTable{
            height: 600px;
            overflow: auto;
        }    
    }
}
</style>
