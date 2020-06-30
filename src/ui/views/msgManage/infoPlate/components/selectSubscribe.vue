<template lang="html">
	<el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
		 <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
            <el-table-column slot="radio" label="选择" :width="49" >
                <template slot-scope="{ row }">
                    <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                    <icon  iconClass="ky" class="tab_radio" v-else></icon>
                </template>
            </el-table-column>
        </SearchTable>
		<div class="footer">
			<el-button @click="handleClose">取消</el-button>
			<el-button type="primary" @click="handleSave">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import request from '@lib/axios.js';
import { formatTreeData } from '@lib/tools.js';
import { selectSubscribeTable } from '../tableConfig.js';
import { extend, get, cloneDeep, filter, some, flow, concat, map } from 'lodash';
export default {
     components: {
        Icon,
        SearchTable
	},
	name: '',
	data() {
		return {
			dialogVisible:false,
			tableData:{records:[]},
            tableConfig:selectSubscribeTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            selectId:null,
		};
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
        handleClose(){
            this.dialogVisible = false;
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
		getList(){
           request({
                url:`${this.$ip}/mms-notice/notificationSubscribe/list`, 
                method: 'post',
                data:{...this.sort,...this.form},
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
		open() {
		
			
			this.dialogVisible = true;
		},
	},
};
</script>

<style scoped lang="scss">


</style>
