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
import { extend, get, cloneDeep, filter, some, flow, concat, map } from 'lodash';
export default {
     components: {
        Icon,
        SearchTable
	},
	name: '',
	data() {
		return {
			dialogVisible:false
		};
	},
	methods: {
        handleClose(){
            this.dialogVisible = false;
        },
		open() {
		
			
			this.dialogVisible = true;
		},
	},
};
</script>

<style scoped lang="scss">


</style>
