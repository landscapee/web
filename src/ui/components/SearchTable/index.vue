<template>

    <div class="searchTableWrapper" ref="componentTable" :key="$route.path">

        <el-table :height="noSearch?42:82"
                  :class="noSearch?`noSearchTable headerTable ${'header_table'+refTag||''}`:` headerTable ${'header_table'+refTag||''}`"
                  @header-dragend="headerDragend"
                  :show-header="true" :data="headerData" ref="header_table" :row-key="getRowKeys" highlight-current-row
                  tooltip-effect="dark" border>
            <template v-for="(colConfig, index) in tableConfig">
                <template v-if="colConfig.search">
                    <el-table-column :resizable="false" :fixed="colConfig.search.fixed" :index="index"
                                     :property="colConfig.sortProp" :width="colConfig.width"
                                     :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
                                     :label="colConfig.label" v-if="colConfig.search.type=='text'" :key="index"
                                     :reserve-selection="true">
						<span>
							<div>{{colConfig.search.label}}</div>
						</span>
                    </el-table-column>
                    <el-table-column :resizable="false" align="center" :fixed="colConfig.search.fixed" :index="index"
                                     :property="colConfig.sortProp" :width="colConfig.width"
                                     :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
                                     :label="colConfig.label" v-if="colConfig.search.type=='btn'" :key="index"
                                     :reserve-selection="true">
						<span>
							<span @click="requestTableData" class="rowSvg">
								<icon :iconClass="colConfig.search.icon" title="搜索"></icon>
							</span>
						</span>
                    </el-table-column>
                    <el-table-column :resizable="false" :fixed="colConfig.search.fixed" :index="index"
                                     :property="colConfig.sortProp"
                                     :width="colConfig.width"
                                     :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
                                     :label="colConfig.label" v-if="colConfig.search.type=='input'" :key="index"
                                     :reserve-selection="true">
						<span slot-scope="{ row }" :class="colConfig.search.extendType==='search'?'searchClass':''">
							<el-input @keyup.enter.native="requestTableData" :width="140"
                                      :type="colConfig.search.type1||'text'"
                                      :clearable="colConfig.search.clear===undefined?true:colConfig.search.clear"
                                      :placeholder="colConfig.search.placeholder" class="adv_filter"
                                      :maxlength="colConfig.search.isNumber?10: ''"
                                      v-model="row[colConfig.search.prop]"
                                      @input="filterNumber($event,row,colConfig.search.prop,colConfig.search)"></el-input>
							<span @click="requestTableData" class="rowSvg"
                                  v-if="colConfig.search.extendType && colConfig.search.extendType=='search'">
								<icon iconClass="table_search" title="搜索"></icon>
							</span>
						</span>
                    </el-table-column>
                    <el-table-column :resizable="false" :fixed="colConfig.search.fixed" :index="index"
                                     :property="colConfig.sortProp"
                                     :width="colConfig.width"
                                     :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
                                     :label="colConfig.label "
                                     v-if="colConfig.search.type=='select'&& colConfig.search.data&&colConfig.search.data.length"
                                     :key="index"
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
                    <el-table-column :resizable="false" :fixed="colConfig.search.fixed" :index="index"
                                     :property="colConfig.sortProp" :width="colConfig.width"
                                     :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
                                     :label="colConfig.label" v-if="colConfig.search.type=='date'" :key="index"
                                     :reserve-selection="true">
						<span @mouseenter="mousemoveDate(this,$event)" @mouseleave="mouseleaveDate(this,$event)"
                              slot-scope="{ row }" :class="colConfig.search.extendType==='search'?'searchClass':''">


                             <el-time-picker
                                     v-if="colConfig.search.time=='time'"
                                     @change="requestTableData" class="adv_filter"
                                     :placeholder="colConfig.search.placeholder"
                                     v-model="row[colConfig.search.prop]">
                            </el-time-picker>

                            <el-date-picker v-else @change="requestTableData" class="adv_filter"
                                            :type="colConfig.search.time||'date'"
                                            :placeholder="colConfig.search.placeholder"
                                            v-model="row[colConfig.search.prop]">

                            </el-date-picker>
							<icon class="table_search" @click.native="requestTableData"
                                  v-if="colConfig.search.extendType && colConfig.search.extendType=='search'"
                                  iconClass="table_search"></icon>
						</span>
                    </el-table-column>
                </template>
                <template v-else>

                    <el-table-column :resizable="false" :index="index" :property="colConfig.sortProp"
                                     :width="colConfig.width"
                                     :render-header="colConfig.sort?renderHeaderRow:()=>{return colConfig.label}"
                                     :label="colConfig.label" :key="index" :reserve-selection="true">
                    </el-table-column>
                </template>
            </template>
        </el-table>

        <el-table :height="580" :span-method="spanMethod" @scroll.passive="scroll($event)" class="mainTable"
                  :show-header="false"
                  :data="data instanceof Array ? data : data.records" :class="'body_table'+refTag||''" ref="body_table"
                  :row-key="getRowKeys"
                  @current-change="currentRowChange" highlight-current-row @row-click="checkRow"
                  @selection-change="handleSelectionChange" @select="selectCheckBox" @select-all="selectAllCheckBox"
                  :header-row-class-name="tableheaderRowClassName" tooltip-effect="dark"
                  :row-class-name="tableRowClassName1" border>
            <template v-for="(colConfig, index) in tableConfig">
                <slot v-if="colConfig.slot" :name="colConfig.slot"></slot>
                <el-table-column :resizable="false" v-else-if="colConfig.prop=='index'" type="index" v-bind="colConfig"
                                 :key="index"
                                 :reserve-selection="true">
                </el-table-column>
                <el-table-column :resizable="false" v-else :show-overflow-tooltip="true" v-bind="colConfig" :key="index"
                                 :fixed="colConfig.search&&colConfig.search.fixed?colConfig.search.fixed:false"
                                 :reserve-selection="true">
                </el-table-column>
            </template>
        </el-table>
        <div class="tablepage">
            <el-pagination v-if="data.current" background @size-change="handleSizeChange"
                           @current-change="handleCurrentChange" :current-page="data.current"
                           :page-sizes="[1, 15, 20, 50, 100]" :page-size="data.size"
                           layout="total, sizes, prev, pager, next, jumper" :total="data.total"></el-pagination>

        </div>

    </div>
</template>
<script>
    import {cloneDeep, forEach} from 'lodash';
    import {fixPx} from '@lib/viewSize.js';
    import Icon from '@components/Icon-svg/index';

    export default {
        components: {
            Icon,
        },
        name: 'SearchTable',
        props: ['tableConfig', 'tableRowClassName', 'data', 'offsetTop', 'page', 'noSearch', 'refTag', 'spanMethod'],
        data() {
            return {
                timer: null,
                timer1: null,
                resizeCallback: [],
                headerData: [{}],
                updateWidth: false,
            };
        },
        computed: {
            tableRowClassName2() {
                return ({rowIndex, row}) => {
                    let ss = this.tableRowClassName && this.tableRowClassName(rowIndex, row) || 'tab-row'
                    return ss
                }
            },
            len(){
                if(this.data){
                    return this.data.length || this.data.length || this.data.records && this.data.records.length
                }else{
                    return 0
                }
            },

        },
        watch: {

            data: {
                handler(n) {
                    this.resizeOption1()
                    setTimeout(() => {
                        if (this.$refs.body_table.doLayout) {
                            this.$refs.body_table.doLayout();
                        }
                    }, 100);
                },
                immediate: true,
                // this.data = newVal;
                // 重新计算element表格组件布局

            },
        },
        created() {

        },
        beforeDestroy() {
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
        },
        mounted() {
             window.addEventListener('resize', this.resizeOption1, true)

            window.addEventListener('scroll', this.scroll, true);
            if (this.timer) {
                clearInterval(this.timer)
                this.timer = null
            }
            this.timer = setInterval(() => {
                this.resizeOption1()
            }, 100)
            setTimeout(()=>{
                clearInterval(this.timer)
                this.timer = null
            },2000)
        },
        methods: {

            resizeOption1() {
                this.$nextTick(() => {
                    let len = this.data.length || this.data.length || this.data.records && this.data.records.length
                     if (!len) {
                        return false
                    }
                    if (this.timer) {
                        clearInterval(this.timer)
                        this.timer = null
                    }
                    let bs = 'body_table' + this.refTag || ''
                    let hs = 'header_table' + this.refTag || ''
                    let body_table = document.getElementsByClassName(bs)[0]
                    let header_table = document.getElementsByClassName(hs)[0]
                    if (!this.$refs.body_table || !header_table) {
                        console.log(2, 2, len);
                        return false
                    }
                     let tr = header_table.getElementsByClassName('el-table__row')[0]
                     let num = this.noSearch ? 1 : 2
                    let hHeight = tr.clientHeight * num + 2
                    let thHeight = tr.clientHeight * num + 1
                    if (tr) {
                        console.log(tr.clientHeight * len, parseFloat(body_table.clientHeight));
                        if (tr.clientHeight * len > parseFloat(body_table.clientHeight)) {
                            header_table.style.cssText = `height:${thHeight}px;overflow-y:hidden;`
                            this.$refs.body_table.doLayout();
                        } else {
                            header_table.style.cssText = `height:${hHeight}px;overflow-y:hidden`
                        }
                    }

                })

            },
            mousemoveDate(t, e) {
                console.log(1, t, e.target);
                if (e.target.getElementsByClassName('el-input__inner')[0].value) {
                    e.target.getElementsByClassName('el-icon-date')[0].style = "display:none"
                }
            },
            mouseleaveDate(t, e) {
                if (e.target.getElementsByClassName('el-input__inner')[0].value) {
                    e.target.getElementsByClassName('el-icon-date')[0].style = "display:black"
                }
            },
            doLayout() {
                this.$refs.body_table.doLayout();
            },
            //计算滚动位置
            scroll($event) {
                if (this.$refs.body_table) {

                    var scrollL = this.$refs.body_table.bodyWrapper.scrollLeft;
                    this.$refs.header_table.bodyWrapper.scrollLeft = scrollL;
                }
            },
            //监听头部拉伸宽度改变表格主体宽度
            headerDragend(newWidth, oldWidth, column, event) {
                this.updateWidth = true;
                this.$set(this.tableConfig[column.index], 'width', newWidth);
                this.$refs.body_table.columns[column.index].realWidth = newWidth;
            },
            requestTableData() {
                this.$emit('requestTable', {...this.headerData[0]});
            },
            renderHeaderRow(h, {column, $index}) {
                let icon;
                if (column.order == "") {
                    icon = "nomal";
                } else if (column.order == "desc") {
                    icon = "down";
                } else if (column.order == "asc") {
                    icon = "up";
                }
                return h(
                    'div',
                    [
                        h('span', column.label),
                        h('icon-svg', {
                            props: {
                                iconClass: icon,
                            },
                            nativeOn: {
                                click: () => {
                                    column.order == "" ? column.order = 'desc' : column.order == 'desc' ? column.order = 'asc' : column.order == 'asc' ? column.order = "" : column.order = 'desc';
                                    this.$emit('headerSort', column);
                                }
                            },

                        })
                    ],
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
            tableheaderRowClassName({row, rowIndex}) {
                return 'tab-header-row';
            },
            tableRowClassName1({row, rowIndex}) {
                row.index = rowIndex
                return this.tableRowClassName2({row, rowIndex})

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
                if (select) {
                    if (this.refTag) {
                        this.$parent.$refs[this.refTag].$refs.body_table.setCurrentRow();
                    } else {
                        this.$refs.body_table.setCurrentRow();
                    }
                } else {
                    if (this.refTag) {
                        this.$parent.$refs[this.refTag].$refs.body_table.setCurrentRow(d);
                    } else {
                        this.$refs.body_table.setCurrentRow(d);
                    }
                }
                this.$emit('listenToCheckedChange', cloneDeep(d), cloneDeep(column), cloneDeep(event));
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
                this.$emit('listenToSelectionChange', val);
            },
            filterNumber(value, row, prop, search) {
                if (search.isNumber) {
                    row[prop] = value.replace(/[^\d]/g, '');
                } else if (search.isMinute) {
                    let reg = /([^\d])?(\d{1,})([^(\+|-])?(\+|-)?([^(\+|-])?/g;
                    let a = reg.test(value);
                    let s = RegExp.$2 + RegExp.$4;
                    row[prop] = value.replace(value, s);
                }
            }
        },

        beforeDestroy() {

        },
    };
</script>

<style lang="scss" scoped>
    .mainTable {
        overflow-y: auto;
        border-top: 0px!important;
        /deep/ .current-row > td {
            background-color: #A0CBF6;
        }
		/deep/ .current-row:hover > td {
            background-color: #A0CBF6;
        }
        /deep/ .el-table__fixed {
            /*height: 620px !important;*/
        }
        /deep/ .el-table__fixed-right {
            /*height: 620px !important;*/
        }
        /deep/ .el-table__row:nth-child(even) {
            background: #EFF2F3;
        }
        /deep/ .el-table__row:nth-child(odd) {
            background: #FFFFFF;
        }
        /deep/ .tab_radio {
            height: 16px;
            width: 16px;
        }
        /deep/ .action_radio {
            height: 16px;
            width: 16px;
        }

        /deep/ .cell:last-child {
            span:first-child {
                .action_radio {
                    margin-right: 20px;
                }
            }
        }
    }

    .searchTableWrapper {

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
        /deep/ .el-table {
            border: 1px solid rgba(199, 204, 210, 1);
            margin: 0 auto;
            /deep/ .cell {
                padding: 0px 3px;
                /*line-height:40px;*/
            }
            /deep/ .el-table__header {
                height: 40px;
            }
            /deep/ td {
                width: 148px;
                height: 40px;
                padding: 0;
                border-color: #C7CCD2;
            }
            /deep/ td:first-child {
                text-align: center;
                .cell {
                    display: flex;
                    align-items: center;
                    justify-content: center
                }
            }
            /deep/ th {

                border-color: #C7CCD2;
            }
            /deep/ .el-table__row {
                height: 40px;
            }
            /deep/ .table_search {
                height: 22px;
                width: 22px;
                position: relative;
                top: 2px;
            }
        }
        .noSearchTable {
            /deep/ .el-table__body-wrapper {
                /*display: none;*/
            }
        }
        .headerTable {
            ::-webkit-scrollbar-thumb {
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 6px #fff;
                background-color: #fff;

            }
            ::-webkit-scrollbar-track {
                border-radius: 4px;
                -webkit-box-shadow: inset 0 0 6px #fff;
                background-color: #fff;

            }
            ::-webkit-scrollbar {
                background-color: #fff;
            }
            /deep/ th {
                .cell {
                    line-height: 1em
                }
                div, span {
                    font-weight: bold;
                }
            }
            /deep/ .el-table__fixed {
                height: 80px !important;
                background: #EFF2F3;
                border-right: 1px #C7CCD2 solid;
                td {
                    border-bottom: 0;
                }
            }
            /deep/ .el-table__fixed-right {
                height: 80px !important;
                background: #EFF2F3;
                border-right: 1px #C7CCD2 solid !important;
            }
            /deep/ .el-table__fixed-body-wrapper {
                height: 40px !important;
            }
            /deep/ .el-table__body-wrapper {
                td {
                    border-bottom: 0;
                }
                overflow-x: hidden;
            }
            /deep/ .el-table__row {
                background: #EFF2F3;
            }

            /deep/ .el-input__icon {
                height: unset;
            }
            /deep/ .cell {
                padding: 0 3px;
            }
            /deep/ .el-input {
                text-align: center;
                width: 100%;
                /*width:140px;*/
                height: 30px;
            }
            /deep/ .el-select {
                text-align: center;
                width: 100%;
                /*width:140px;*/
                height: 30px;
            }
            .searchClass {
                & > /deep/ .el-input {
                    width: calc(100% - 30px);
                }
                /deep/ .el-select {
                    width: calc(100% - 30px);
                }
            }
            /deep/ .el-input__inner {
                line-height: 30px;
                height: 30px;
                background: rgba(255, 255, 255, 1);
                border-radius: 2px;
                border: 1px solid rgba(216, 216, 216, 1);
                padding-left: 10px;
            }
            /deep/ .el-input__icon {
                line-height: 30px;
                height: 30px;
                width: 14px;
                font-size: 15px;
            }
            /deep/ .el-input__prefix {

                left: unset;
                right: 13px;

            }

            /deep/ th {
                width: 148px;
                height: 40px;
                background: #CFD4DC;
                font-size: 14px;
                font-family: PingFangSC-Medium, PingFang SC;
                font-weight: 500;
                color: rgba(34, 34, 34, 1);
                text-align: center;
                border-right: solid 1px #C7CCD2;
                padding: 0px;
                /deep/ .svg-icon {
                    width: 11px;
                    height: 14px;
                    margin-left: 6px;
                }
            }
            /deep/ .search-button {
                width: 80px;
                height: 30px;
                display: inline-flex;
                align-items: center;
                background: rgba(255, 255, 255, 1);
                border-radius: 2px;
                border: 1px solid rgba(208, 208, 208, 1);
                font-size: 14px;
                font-family: SourceHanSansCN-Regular, SourceHanSansCN;
                font-weight: 400;
                color: rgba(61, 86, 142, 1);
                padding: 0;
                /deep/ span {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                }
                .table_search {
                    width: 14px;
                    height: 16px;
                    margin-right: 4px;
                }
            }
        }
        .el-table--scrollable-x + .mainTable {
            /*height: 620px ;*/

        }
        /deep/ .el-table--scrollable-x .el-table__body-wrapper {
            height: 100%;
        }
        /deep/ .is-scrolling-left {
            height: 100%;
        }

    }


</style>
