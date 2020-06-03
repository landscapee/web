<template>
	<div class="searchTableWrapper" >
		<el-table   :class="noSearch?'noSearchTable headerTable':'headerTable'" @header-dragend="headerDragend"  :show-header="true"   :data="headerData" ref="header_table"  :row-key="getRowKeys"  highlight-current-row      tooltip-effect="dark"  border>
			<template v-for="(colConfig, index) in cloneTableConfig">
				<template v-if="colConfig.search">
					<el-table-column :fixed="colConfig.search.fixed" :index="index" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='text'" :key="index" :reserve-selection="true"> 
						<span >
							<div>{{colConfig.search.label}}</div>
						</span>
					</el-table-column>
					<el-table-column :fixed="colConfig.search.fixed" :index="index" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='btn'"   :key="index" :reserve-selection="true"> 
						<span>
							<el-button class="search-button" @click="requestTableData"><icon :iconClass="colConfig.search.icon" class="table_search"></icon>{{colConfig.search.label}}</el-button>
						</span>
					</el-table-column>
					<el-table-column :index="index" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='input'"   :key="index" :reserve-selection="true"> 
						<span slot-scope="{ row }">
							<el-input :placeholder="colConfig.search.placeholder" class="adv_filter" v-model="row[colConfig.search.prop]"></el-input>
							<icon class="table_search" @click.native="requestTableData" v-if="colConfig.search.extendType && colConfig.search.extendType=='search'" iconClass="table_search"></icon>
						</span>
					</el-table-column>
					<el-table-column :index="index" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='select'"   :key="index" :reserve-selection="true"> 
						<span slot-scope="{ row }">
							<el-select class="adv_filter" v-model="row[colConfig.search.prop]" :placeholder="colConfig.search.placeholder">
								<el-option v-for="item in colConfig.search.data" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<icon class="table_search" @click.native="requestTableData" v-if="colConfig.search.extendType && colConfig.search.extendType=='search'" iconClass="table_search"></icon>
						</span>
					</el-table-column>
					<el-table-column :index="index" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='date'"   :key="index" :reserve-selection="true"> 
						<span slot-scope="{ row }">
							<el-date-picker class="adv_filter"  type="date" :placeholder="colConfig.search.placeholder" v-model="row[colConfig.search.prop]" ></el-date-picker>
							<icon class="table_search" @click.native="requestTableData" v-if="colConfig.search.extendType && colConfig.search.extendType=='search'" iconClass="table_search"></icon>
						</span>
					</el-table-column>
				</template>
				<template v-else>
					<el-table-column :index="index" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label"  :key="index" :reserve-selection="true"></el-table-column>
				</template>
			</template>
		</el-table>
		<el-table   @scroll.passive="scroll($event)"  class="mainTable" :show-header="false"   :data="(this[this.tableTag]?this[this.tableTag]:tableData) instanceof Array ? (this[this.tableTag]?this[this.tableTag]:tableData) : (this[this.tableTag]?this[this.tableTag].records:tableData.records)" ref="body_table"  :row-key="getRowKeys" @current-change="currentRowChange" highlight-current-row @row-click="checkRow" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox" :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark" :row-class-name="tableRowClassName" border>
			<template v-for="(colConfig, index) in cloneTableConfig">
				<slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
				<el-table-column v-else :show-overflow-tooltip="true" v-bind="colConfig" :key="index" :reserve-selection="true"> </el-table-column>
			</template>
		</el-table>
		<el-pagination v-if="(this[this.tableTag]?this[this.tableTag].current:tableData.current)"    background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="(this[this.tableTag]?this[this.tableTag].current:tableData.current)" :page-sizes="[1, 15, 20, 50, 100]" :page-size="(this[this.tableTag]?this[this.tableTag].size:tableData.size)" layout="total, sizes, prev, pager, next, jumper" :total="(this[this.tableTag]?this[this.tableTag].total:tableData.total)"> </el-pagination>
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
	props: ['tableConfig', 'data', 'offsetTop', 'page','noSearch','refTag','tableTag'],
	data() {
		if(this.tableTag){
			return {
				resizeCallback:[],
				headerData:[{}],
				cloneTableConfig:this.tableConfig,
				[this.tableTag]:this.data
		   };

		}else{
			return {
				resizeCallback:[],
				headerData:[{}],
				cloneTableConfig:this.tableConfig,
				tableData:this.data
		   };
		}	
	},
	watch: {
		data: function(newVal, oldVal) {
			this[this.tableTag]?this[this.tableTag]:this.tableData = newVal;
			// 重新计算element表格组件布局
			setTimeout(() => {
				this.$refs.body_table.doLayout();
			}, 100);
		},
	},
	created() {
	},
	mounted() {
		window.addEventListener('scroll', this.scroll, true);
	},
	methods: {
		//计算滚动位置
		scroll() {
			if(this.$refs.body_table){
				var scrollL = this.$refs.body_table.bodyWrapper.scrollLeft;
		  		this.$refs.header_table.bodyWrapper.scrollLeft = scrollL;
			}
       },
		//监听头部拉伸宽度改变表格主体宽度
		headerDragend(newWidth, oldWidth, column, event){
			this.cloneTableConfig[column.index].width = newWidth;
			this.$set(this.cloneTableConfig,column.index,this.cloneTableConfig[column.index]);
		},
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
			let select = d.selected;
			this[this.tableTag]?this[this.tableTag]:this.tableData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
			})
			if(select){
				if(this.refTag){
					this.$parent.$refs[this.refTag].$refs.body_table.setCurrentRow();
				}else{
					this.$refs.body_table.setCurrentRow();
				}
            }else{
				if(this.refTag){
					this.$parent.$refs[this.refTag].$refs.body_table.setCurrentRow(d);
				}else{
					this.$refs.body_table.setCurrentRow(d);
				}
				
			}
			d.selected  = !select;
			
            this.$set(this[this.tableTag]?this[this.tableTag]:this.tableData.records,d.index,d);
			this.$emit('listenToCheckedChange', cloneDeep(d), cloneDeep(column), cloneDeep(event));
		},
		handleSelectionChange(val) {
			this.multipleSelection = val;
			this.$emit('listenToSelectionChange', val);
		},
	},
	
	beforeDestroy() {
		
	},
};
</script>

<style lang="scss" scoped >
.searchTableWrapper{
	/deep/ .el-pagination {
		text-align: center;
		margin-top: 20px;
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
			border-color:#C7CCD2 ;
		}
		/deep/ th{
			border-color:#C7CCD2 ;
		}
		/deep/ .el-table__row{
			height:40px;
		}
		/deep/ .table_search{
			height:22px;
			width:22px;
			position: relative;
			top: 2px;
		}
	}
	.noSearchTable{
		/deep/ .el-table__body-wrapper{
			display: none;
		}
	}
	.headerTable{
		/deep/ .el-table__fixed{
			height: 80px !important;
		}
		/deep/ .el-table__fixed-right{
			height: 80px !important;
		}
		/deep/ .el-table__body-wrapper{
			overflow-x: hidden;
		}
		/deep/ .el-table__row{
			background: #EFF2F3;
		}
		/deep/ .el-input__icon {
    		height: unset;
		}
		/deep/ .el-input{
			text-align: center;
			width: 140px;
			height: 30px;
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
	.el-table--scrollable-x + .mainTable{
		height: 620px !important;
		
	}
	.mainTable{
		// height: 600px;
		border-top: 0px;
		/deep/ .current-row > td {
			background-color: #A0CBF6;
		}
		/deep/ .el-table__fixed{
			height: 620px !important;
		}
		/deep/ .el-table__fixed-right{
			height: 620px !important;
		}
		/deep/ .el-table__row:nth-child(even){
			background: #EFF2F3;
		}
		/deep/ .el-table__row:nth-child(odd){
			background: #FFFFFF;
		}
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
