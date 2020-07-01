<template>
        <div  class="historyInfoPlate">
            <div class="top-content">
                <div class="top-content-title">
                    <span>接收信息-历史</span>
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
                     <el-table-column slot="attachment" label="附件"  align="center" >
                        <template slot-scope="{ row }">
                              <el-button @click="downloadFile(row)" size="mini">下载</el-button>
                        </template>
                    </el-table-column>
                     <el-table-column slot="relationInfo" label="关联信息" :width="148" >
                    </el-table-column>
                </SearchTable>
            </div>
             <Download ref="downloadFile"></Download>
        </div>
</template>
<script>
import Download from '@/ui/components/download';
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { historyPlateReceiveTable } from '../../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable,
          Download
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:historyPlateReceiveTable(),
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
       this.findDataDictionary();
       this.getList();
    },
    watch:{
        params:{
            handler:function(val,oldval){
                this.getList();
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
    },
    methods: {
        downloadFile(row){
            if(row.fileInfoList){
                this.$refs.downloadFile.open(row.fileInfoList);
            }else{
                this.$message.warning("暂无文件可以下载");
            }
        },
         findDataDictionary(){
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: "post",
                data: ["infoTypeCode"]
            })
            .then(data => {
              let infoSelect = data.data["infoTypeCode"];
              this.tableConfig = historyPlateReceiveTable(infoSelect);
            })
            .catch(error => {
             this.$message.success(error);
            });
        },
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
                url:`${this.$ip}/mms-notice/notificationRecipient/list`, 
                method: 'post',
                data:{...this.sort,...this.form,state:-1},
                params:this.params
            })
            .then((data) => {
               this.tableData = extend({}, this.tableData, data.data);
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
    .main-content{
        /deep/ .mainTable{
            height: 600px;
        }    
    }
}
</style>
