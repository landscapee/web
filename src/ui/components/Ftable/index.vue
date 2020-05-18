<template>
	<div class="fTableWrapper" >
		<el-table style="height: 94%;" :data="data instanceof Array ? data : data.records" ref="table"  :row-key="getRowKeys" @current-change="currentRowChange" highlight-current-row @row-click="checkRow" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox" :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark" :row-class-name="tableRowClassName" border>
			<template v-for="(colConfig, index1) in tableConfig">
				<el-table-column v-if="colConfig.components" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '1'">
					<template slot-scope="scope">
						<component v-for="(component, index) in colConfig.components" :key="index" :is="component.component" :componentProps="component.componentProps" v-bind="component.componentProps" :handleClick="component.handleClick" :colConfig="colConfig" :row="scope.row" :tableData="data instanceof Array ? data : data.records"> </component>
					</template>
				</el-table-column>
				<el-table-column v-else-if="colConfig.component" :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '2'">
					<template slot-scope="scope" v-if="colConfig.component">
						<component :is="colConfig.component" :componentProps="colConfig.componentProps" v-bind="colConfig.componentProps" :handleClick="colConfig.handleClick" :colConfig="colConfig" :row="scope.row" :tableData="data instanceof Array ? data : data.records"> </component>
					</template>
				</el-table-column>
				<slot v-else-if="colConfig.slot" :name="colConfig.slot"></slot>
				<el-table-column v-else :show-overflow-tooltip="true" v-bind="colConfig" :key="index1 + '3'" :reserve-selection="true"> </el-table-column>
			</template>
		</el-table>
		<el-pagination style="height: 6%;"  background v-if="data.current" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.current" :page-sizes="[1, 10, 20, 50, 100]" :page-size="data.size" layout="total, sizes, prev, pager, next, jumper" :total="data.total"> </el-pagination>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
import { fixPx } from '@lib/viewSize.js';

export default {
	name: 'Ftable',
	props: ['tableConfig', 'data', 'offsetTop', 'page'],
	data() {
		return {
			// total: this.data ? this.data.total : 0,
			// size: this.data ? this.data.size : 20,
			// current: this.data ? this.data.current : 0,
			resizeCallback:[]
		};
	},
	watch: {
		data: function(newVal, oldVal) {
			// if (newVal.records.length != 0) {
			// 重新计算element表格组件布局
			setTimeout(() => {
				this.$refs.table.doLayout();
			}, 100);

			// }
		},
	},
	created() {
		console.log(this.tableConfig);
	},
	methods: {
		// 确定唯一的key值
		getRowKeys(row) {
			return row.id; // 每条数据的唯一识别值
		},
		handleSizeChange(size) {
			this.size = size;
			this.$emit('handleSizeChange', size);
		},
		handleCurrentChange(cur) {
			this.$emit('handleCurrentChange', cur);
		},
		tableheaderRowClassName({ row, rowIndex }) {
			return 'tab-header-row';
		},
		tableRowClassName({ row, rowIndex }) {
			row.index = rowIndex;
			return 'tab-row';
		},
		currentRowChange(row, oldRow) {
			this.$emit('currentRowChange', row, oldRow);
		},
		selectCheckBox(select, row) {
			this.$emit('selectCheckBox', cloneDeep(select), cloneDeep(row));
		},
		selectAllCheckBox(select) {
			this.$emit('selectAllCheckBox', cloneDeep(select));
		},
		checkRow(d, column, event) {
			this.selectData = d;
			this.$emit('listenToCheckedChange', cloneDeep(d), cloneDeep(column), cloneDeep(event));
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.$emit('listenToSelectionChange', val);
		},
	},
	mounted() {
	
	},
	beforeDestroy() {
		
	},
};
</script>

<style lang="scss" scoped>
/deep/ .tab-header-row {
	height: 40px;
}
/deep/ .tab-row {
	height: 40px;
	td {
		height: 40px;
		padding: 0;
	}
}
/deep/ .el-pagination {
	text-align: center;
	padding: 10px 0;
}
</style>
