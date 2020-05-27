<template>
	<div class="searchTableWrapper" >
		<el-table class="headerTable" :show-header="true"   :data="headerData" ref="header_table"  :row-key="getRowKeys"  highlight-current-row      tooltip-effect="dark"  border>
			<template v-for="(colConfig, index) in tableConfig">
				<el-table-column :width="colConfig.search.width"  :label="colConfig.label" v-if="colConfig.search.type=='text'"   :key="index" :reserve-selection="true"> 
					<span >
						<div>{{colConfig.search.label}}</div>
					</span>
				</el-table-column>
				<el-table-column :width="colConfig.search.width"  :label="colConfig.label" v-if="colConfig.search.type=='btn'"   :key="index" :reserve-selection="true"> 
					<span>
						<el-button class="search-button" @click="requestTableData"><icon :iconClass="colConfig.search.icon" class="table_search"></icon>{{colConfig.search.label}}</el-button>
					</span>
				</el-table-column>
				<el-table-column :width="colConfig.search.width" :render-header="colConfig.search.sort?renderHeaderRow:()=>{}" :label="colConfig.label" v-if="colConfig.search.type=='input'"   :key="index" :reserve-selection="true"> 
				 	<span slot-scope="{ row }">
						<el-input :placeholder="colConfig.search.placeholder" class="adv_filter" v-model="row[colConfig.search.prop]"></el-input>
					</span>
				</el-table-column>
				<el-table-column :width="colConfig.search.width" :render-header="colConfig.search.sort?renderHeaderRow:()=>{}" :label="colConfig.label" v-if="colConfig.search.type=='select'"   :key="index" :reserve-selection="true"> 
				 	<span slot-scope="{ row }">
						<el-select class="adv_filter" v-model="row[colConfig.search.prop]" :placeholder="colConfig.search.placeholder">
							<el-option v-for="item in colConfig.search.data" :key="item.value" :label="item.label" :value="item.value"></el-option>
						</el-select>
					</span>
				</el-table-column>
				<el-table-column :width="colConfig.search.width" :render-header="colConfig.search.sort?renderHeaderRow:()=>{}" :label="colConfig.label" v-if="colConfig.search.type=='date'"   :key="index" :reserve-selection="true"> 
				 	<span slot-scope="{ row }">
						 <el-date-picker class="adv_filter"  type="date" :placeholder="colConfig.search.placeholder" v-model="row[colConfig.search.prop]" style="width: 100%;"></el-date-picker>
					</span>
				</el-table-column>
			</template>
		</el-table>
		<el-table class="mainTable" :show-header="false"   :data="data instanceof Array ? data : data.records" ref="body_table"  :row-key="getRowKeys" @current-change="currentRowChange" highlight-current-row @row-click="checkRow" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox" :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark" :row-class-name="tableRowClassName" border>
			<template v-for="(colConfig, index) in tableConfig">
				<slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
				<el-table-column v-else :show-overflow-tooltip="true" v-bind="colConfig" :key="index" :reserve-selection="true"> </el-table-column>
			</template>
		</el-table>
		<el-pagination v-if="data.current"    background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.current" :page-sizes="[1, 15, 20, 50, 100]" :page-size="data.size" layout="total, sizes, prev, pager, next, jumper" :total="data.total"> </el-pagination>
	</div>
</template>
<script>
import { cloneDeep } from 'lodash';
import { fixPx } from '@lib/viewSize.js';
import Icon from '@components/Icon-svg/index';
export default {
	components: {
        Icon,
	},
	name: 'SearchTable',
	props: ['tableConfig', 'data', 'offsetTop', 'page'],
	data() {
		return {
			resizeCallback:[],
			headerData:[{}]
		};
	},
	watch: {
		data: function(newVal, oldVal) {
			// 重新计算element表格组件布局
			setTimeout(() => {
				this.$refs.body_table.doLayout();
			}, 100);
		},
	},
	created() {
		console.log(this.tableConfig);
	},
	methods: {
		requestTableData(){
			this.$emit('requestTable', this.headerData);
		},
		renderHeaderRow(h,  { column, $index }){
			return (
                <div>
                    <span>{column.label}</span>
                    <Icon iconClass="sort" nativeOnClick={ () => {this.$emit('headerSort', column);}  } ></Icon>
                </div>
            );
		},
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

<style lang="scss" scoped >
.searchTableWrapper{
	/deep/ .el-pagination {
		text-align: center;
		margin-top: 50px;
	}
	/deep/ .el-table{
		width:1700px;
		border:1px solid rgba(199,204,210,1);
		margin: 0 auto;
		/deep/ .cell{
			padding:0px;
			line-height:40px;
		}
		/deep/ .el-table__header{
			height:40px;
		}
		/deep/ td{
			width: 148px;
			height:40px;
			text-align: center;
			padding: 0;
		}
		/deep/ .el-table__row{
			height:40px;
		}
	}
	.headerTable{
		border-bottom: 0px;
		/deep/ .el-input{
			text-align: center;
		}
		/deep/ .el-input__inner{
			width:140px;
			height:30px;
			background:rgba(255,255,255,1);
			border-radius:2px;
			border:1px solid rgba(216,216,216,1);
			padding-left:10px;
		}
		/deep/ .el-input__prefix{
				left: unset;
				right: 13px;
			.el-input__icon{
				width: 14px;
				font-size: 15px;
			}
		}
		/deep/ th{
			width: 148px;
			height:40px;
			background:#CFD4DC;
			font-size:14px;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(34,34,34,1);
			text-align: center;
			border-right:solid 1px #C7CCD2;
			padding: 0px;
			/deep/ .svg-icon{
				width: 11px;
				height: 14px;
				margin-left: 6px;
			}
		}
		/deep/ .search-button{
			width:80px;
			height:30px;
			display: inline-flex;
			align-items: center;
			background:rgba(255,255,255,1);
			border-radius:2px;
			border:1px solid rgba(208,208,208,1);
			font-size:14px;
			font-family:SourceHanSansCN-Regular,SourceHanSansCN;
			font-weight:400;
			color:rgba(61,86,142,1);
			.table_search{
				width: 14px;
				height: 16px;
				margin-right: 4px;
			}
		}
	}
	.mainTable{
		height: 600px;
		border-top: 0px;
		/deep/ .tab_radio{
			height: 16px;
			width: 16px;
		}
		/deep/ .action_radio{
			height: 16px;
			width: 16px;
		}
		/deep/ .cell:last-child{
			span:first-child{
				.action_radio{
					margin-right: 20px;
				}
			}
		} 
	}
}


</style>
