<template>
	<div class="searchTableWrapper" :key="$route.path">

		<el-table    :class="noSearch?'noSearchTable headerTable':'headerTable'" @header-dragend="headerDragend"  :show-header="true"   :data="headerData" ref="header_table"  :row-key="getRowKeys"     highlight-current-row      tooltip-effect="dark"  border>
			<template  v-for="(colConfig, index) in tableConfig">
				<template v-if="colConfig.search">
					<el-table-column :fixed="colConfig.search.fixed" :index="index" :property="colConfig.sortProp"  :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='text'" :key="index" :reserve-selection="true">
						<span >
							<div>{{colConfig.search.label}}</div>
						</span>
					</el-table-column>
					<el-table-column align="center" :fixed="colConfig.search.fixed" :index="index"
									 :property="colConfig.sortProp" :width="colConfig.width"
									 :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
									 :label="colConfig.label" v-if="colConfig.search.type=='btn'" :key="index"
									 :reserve-selection="true">
						<span>
							<span   @click="requestTableData" class="rowSvg">
								<icon :iconClass="colConfig.search.icon" title="搜索"></icon>
							</span>
						</span>
					</el-table-column>
					<el-table-column :fixed="colConfig.search.fixed" :index="index" :property="colConfig.sortProp"
									 :width="colConfig.width"
									 :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
									 :label="colConfig.label" v-if="colConfig.search.type=='input'" :key="index"
									 :reserve-selection="true">
						<span slot-scope="{ row }" :class="colConfig.search.extendType==='search'?'searchClass':''">
							<el-input @keyup.enter.native="requestTableData" :width="140"
									  :type="colConfig.search.type1||'text'"
									  :clearable="colConfig.search.clear===undefined?true:colConfig.search.clear"
									  :placeholder="colConfig.search.placeholder" class="adv_filter"
									  v-model="row[colConfig.search.prop]"></el-input>

							<span   @click="requestTableData" class="rowSvg"
									v-if="colConfig.search.extendType && colConfig.search.extendType=='search'">
								<icon  iconClass="table_search" title="搜索"></icon>
							</span>
						</span>
					</el-table-column>
					<el-table-column :fixed="colConfig.search.fixed" :index="index" :property="colConfig.sortProp"
									 :width="colConfig.width"
									 :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
									 :label="colConfig.label "
									 v-if="colConfig.search.type=='select'&& colConfig.search.data&&colConfig.search.data.length" :key="index"
									 :reserve-selection="true">
						<span slot-scope="{ row }" :class="colConfig.search.extendType==='search'?'searchClass':''">
							<el-select
									@change="requestTableData" clearable filterable class="adv_filter"
									   v-model="row[colConfig.search.prop]" :placeholder="colConfig.search.placeholder">
								<el-option v-for="item in colConfig.search.data||[]" :key="item.value"
										   :label="colConfig.search.selectProp?item[colConfig.search.selectProp[0]]:item.label"
										   :value="colConfig.search.selectProp?item[colConfig.search.selectProp[1]]:item.value">
								</el-option>
							</el-select>
							<icon class="table_search" @click.native="requestTableData"
								  v-if="colConfig.search.extendType && colConfig.search.extendType=='search'"
								  iconClass="table_search"></icon>
						</span>
					</el-table-column>
					<el-table-column  :fixed="colConfig.search.fixed" :index="index" :property="colConfig.sortProp"  :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label" v-if="colConfig.search.type=='date'"   :key="index" :reserve-selection="true">
						<span slot-scope="{ row }" :class="colConfig.search.extendType==='search'?'searchClass':''">
							<el-date-picker @change="requestTableData" class="adv_filter"  :type="colConfig.search.time||'date'" :placeholder="colConfig.search.placeholder" v-model="row[colConfig.search.prop]" ></el-date-picker>
							<icon class="table_search" @click.native="requestTableData" v-if="colConfig.search.extendType && colConfig.search.extendType=='search'" iconClass="table_search"></icon>
						</span>
					</el-table-column>
				</template>
				<template v-else>

					<el-table-column :index="index" :property="colConfig.sortProp" :width="colConfig.width" :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}" :label="colConfig.label"  :key="index" :reserve-selection="true">
					</el-table-column>
				</template>
			</template>
		</el-table>

		<el-table  :span-method="spanMethod"  @scroll.passive="scroll($event)"  class="mainTable" :show-header="false"   :data="data instanceof Array ? data : data.records" ref="body_table"  :row-key="getRowKeys" @current-change="currentRowChange" highlight-current-row @row-click="checkRow" @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox" :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark" :row-class-name="tableRowClassName1" border>
			<template v-for="(colConfig, index) in tableConfig">
				<slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
				<el-table-column v-else-if="colConfig.prop=='index'" type="index" v-bind="colConfig" :key="index"
								 :reserve-selection="true">
				</el-table-column>
				<el-table-column v-else :show-overflow-tooltip="true" v-bind="colConfig" :key="index"
								 :fixed="colConfig.search&&colConfig.search.fixed?colConfig.search.fixed:false"
								 :reserve-selection="true">
				</el-table-column>
			</template>
		</el-table>
		<el-pagination v-if="data.current"    background  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.current" :page-sizes="[1, 15, 20, 50, 100]" :page-size="data.size" layout="total, sizes, prev, pager, next, jumper" :total="data.total"> </el-pagination>
	</div>
</template>
<script>
    import { cloneDeep ,forEach} from 'lodash';
    import { fixPx } from '@lib/viewSize.js';
    import Icon from '@components/Icon-svg/index';
    export default {
        components: {
            Icon,
        },
        name: 'SearchTable',
        props: ['tableConfig', 'tableRowClassName', 'data', 'offsetTop', 'page','noSearch','refTag','spanMethod'],
        data () {
            return {
                resizeCallback:[],
                headerData:[{}],
                 updateWidth:false,
            };
        },
        computed:{
            tableRowClassName2(){
                return ({rowIndex,row})=>{
                    let ss= this.tableRowClassName&&this.tableRowClassName(rowIndex,row)||'tab-row'
                    return ss
                }
            },
        },
        watch: {

            data: function(newVal, oldVal){
                // this.data = newVal;
                // 重新计算element表格组件布局
                 setTimeout(() => {
                    if(this.$refs.body_table.doLayout){
                        this.$refs.body_table.doLayout();
                    }
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
            scroll($event) {
                if(this.$refs.body_table){
                    var scrollL = this.$refs.body_table.bodyWrapper.scrollLeft;
                    this.$refs.header_table.bodyWrapper.scrollLeft = scrollL;
                }
            },
            //监听头部拉伸宽度改变表格主体宽度
            headerDragend(newWidth, oldWidth, column, event){
                this.updateWidth = true;
                this.$set(this.tableConfig[column.index],'width',newWidth);
                this.$refs.body_table.columns[column.index].realWidth = newWidth;
            },
            requestTableData(){
                this.$emit('requestTable', this.headerData[0]);
            },
            renderHeaderRow(h,  { column, $index }){
                return (
                    <div>
                    <span>{column.label}</span>
                <Icon iconClass="sort" class="tableSort" nativeOnClick={
                () => {
                    column.order==""? column.order = 'desc':column.order=='desc'?column.order = 'asc':column.order == 'asc'?column.order="":column.order='desc';
                    this.$emit('headerSort', column);
                }
            } >
            </Icon>
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
            tableRowClassName1({ row, rowIndex }) {
                row.index=rowIndex
                return this.tableRowClassName2({ row, rowIndex })

                //
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
		/deep/ .tableSort {
			fill: #222;
		}
		/deep/ .tableSort:hover {
			fill: #eee;
		}
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
				padding: 0;
				border-color:#C7CCD2 ;
			}
			/deep/ td:first-child{
				text-align: center;
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
			/deep/ .cell{
				padding:0 3px;
			}
			/deep/ .el-input{
				text-align: center;
				width: 100%;
				/*width:140px;*/
				height: 30px;
			}
			/deep/ .el-select{
				text-align: center;
				width: 100%;
				/*width:140px;*/
				height: 30px;
			}
			.searchClass{
				& > /deep/ .el-input{
					width: calc(100% - 30px);
				}
				/deep/ .el-select{
					width: calc(100% - 30px);
				}
			}
			/deep/ .el-input__inner{

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
				padding:0;
				/deep/ span{
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					height: 100%;
				}
				.table_search{
					width: 14px;
					height: 16px;
					margin-right: 4px;
				}
			}
		}
		.el-table--scrollable-x + .mainTable{
			height: 620px ;

		}
		/deep/ .el-table--scrollable-x .el-table__body-wrapper{
			height: 100%;
		}
		/deep/ .is-scrolling-left{
			height: 100%;
		}
		.mainTable{
			// height: 600px;
			overflow-y: auto;
			border-top: 0px;
			/deep/ .current-row > td {
				background-color: #A0CBF6;
			}
			/deep/ .el-table__fixed{
				/*height: 620px !important;*/
			}
			/deep/ .el-table__fixed-right{
				/*height: 620px !important;*/
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