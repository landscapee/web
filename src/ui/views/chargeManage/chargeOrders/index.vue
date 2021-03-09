<template>
	<div>
		<router-view v-if="this.$router.history.current.path == '/chargeOrderAdd'" :key="$route.path"></router-view>
		<div v-else class="QCenterRight G_listOne">
			<div>
				<div class="QHead">
					收费单
				</div>

				<div class="QheadRight">
					<!--<div @click='sendFinanceFn'>-->
						<!--<icon iconClass="add"></icon>-->
						<!--发送财务-->
					<!--</div>-->
					<div @click='effectiveListFn'>
						<icon iconClass="add"></icon>
						导出收费单
					</div>
					<div class="xiala" >
						<icon iconClass="add"></icon>
						新增
						<el-dropdown   @command="toAdd">
							<el-button type="primary">
								新增<i class="el-icon-arrow-down el-icon--right"></i>
							</el-button>
							<el-dropdown-menu  slot="dropdown">
								<el-dropdown-item :command="0">国内</el-dropdown-item>
								<el-dropdown-item :command="1">国际</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>

					<div @click='addChargeOrderFn("/chargeOrderAdd","edit")'>
						<icon iconClass="edit"></icon>
						编辑
					</div>
					<div @click='removeOrderFn'>
						<icon iconClass="remove"></icon>
						删除
					</div>
					<div @click='addChargeOrderFn("/chargeOrderAdd","info")'>
						<icon iconClass="info"></icon>
						详情
					</div>
					<div @click='exportChargeFn("excel")'>
						<icon iconClass="info"></icon>
						导出Excel
					</div>
					<!-- <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
					<div class="isDisabled"><icon iconClass="reset" ></icon>重置</div> -->
				</div>
			</div>
			<div class='top-right'>
				<div class="header">机务服务非例行工作结算清单 <span>
                        {{approveNumber}} 单待审批｜
                        {{sendNumber}} 单待发送</span>
				</div>
			</div>
			<div class="tableOneBox">

				<SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"
							 @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort"
							 @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"
							 :data="tableData" :tableConfig="tableConfig" :showHeader="false" :showPage="true">
					<el-table-column slot="checkbox" label="选择" :width="49">
						<template slot-scope="scope">
							<el-checkbox :ref="scope.row.id" @click.stop.native v-model="selectIds"
										 :label="scope.row.id" value="">
							</el-checkbox>
							<!--                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>-->
							<!--                            <icon  iconClass="ky" class="tab_radio" v-else></icon>-->
						</template>
					</el-table-column>
					<el-table-column slot="option" align='center' label="操作" :width="80">
						<template slot-scope="{ row }">
                            <span @click='revokeFn(row)' v-if='row.sendFinance===1' class="rowSvg">
              					<el-tooltip class="item" effect="dark" :enterable="false" content="撤销" placement="top">
									<icon iconClass="resetNew"  ></icon>

								</el-tooltip>
                            </span>
							<span @click='approveFn(row,false)' v-else-if='row.sendFinance===0&&row.approveState==1'
								  class="rowSvg">
								<el-tooltip class="item" effect="dark" :enterable="false" content="不通过" placement="top">
									<icon iconClass="nopass"  ></icon>

								</el-tooltip>
                            </span>
							<span @click='approveFn(row,true)' v-else-if='row.sendFinance===0&&row.approveState!=1'
								  class="rowSvg">
								<el-tooltip class="item" effect="dark" :enterable="false" content="通过" placement="top">
									<icon iconClass="pass"  ></icon>

								</el-tooltip>
                            </span>
						</template>
					</el-table-column>
				</SearchTable>
			</div>
		</div>
		<el-dialog title="模板选择" center :visible.sync="dialogTemplateVisible" width='300px'>
			<el-form :model="form">
				<el-form-item label="模板" :label-width="'60px'">
					<el-select v-model="form.fileUrl" placeholder="请选择模板" style='width:86%;'>
						<el-option v-for='item in templateData' :label="item.name" :value="item.fileUrl"
								   :key='item.id'></el-option>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogTemplateVisible = false" style="margin-right:30px">取 消</el-button>
				<el-button type="primary" @click="exportChargeOthFn('charge')">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import {sysParameterTable} from '../tableConfig.js';
    import request from '@lib/axios.js';
    import {extend} from 'lodash';

    export default {
        components: {
            Icon,
            SearchTable
        },
        name: '',
        data() {
            return {

                tableData: {records: []},
                tableConfig: sysParameterTable(),
                params: {
                    current: 1,
                    size: 15,
                },
                form: {
                    fileUrl: ''
                },
                sort: {},
                selectId: null,
                selectIds: [],
                approveNumber: 0,
                sendNumber: 0,
                dialogTemplateVisible: false,
                templateData: [],
            };
        },
        created() {
            this.getList();
        },
        watch: {
            params: {
                handler: function (val, oldval) {
                    this.getList();
                },
                deep: true//对象内部的属性监听，也叫深度监听
            }
        },
        methods: {
            toAdd(inOrOut){

                this.addChargeOrderFn("/chargeOrderAdd","add",inOrOut)
			},
            getNumberFn() {
                this.approveNumber = 0
                this.sendNumber = 0
                request({
                    url: `${this.$ip}/mms-charge/chargeBillFlxgz/getNumber`,
                    method: 'post',
                })
                    .then((data) => {
                        console.log(data)
                        this.approveNumber = data.data.approve
                        this.sendNumber = data.data.send
                    })
            },
            revokeFn(row) {
                request({
                    url: `${this.$ip}/mms-charge/chargeBillFlxgz/revoke`,
                    method: 'post',
                    data: {
                        id: row.id,
                    }
                })
                    .then((data) => {
                        if (data.code == 200 && data.data) {
                            console.log(data)
                            this.$message({type: 'success', message: '撤销成功'});
                            this.getList();
                        } else {
                            this.$message({type: 'error', message: '撤销失败，请重试'});
                        }
                    })
            },
            approveFn(row = {}, type = false) {
                request({
                    url: `${this.$ip}/mms-charge/chargeBillFlxgz/approve`,
                    method: 'post',
                    data: {
                        id: row.id,
                        access: type
                    }
                })
                    .then((data) => {
                        if (data.code == 200 && data.data) {
                            this.$message({type: 'success', message: '操作成功'});
                            this.getList();
                        } else {
                            this.$message({type: 'error', message: '操作失败，请重试'});
                        }
                    })
            },
            sendFinanceFn() {
                if (this.selectIds.length === 0) {
                    this.$message({type: 'warning', message: '请选择一条发送财务'})
                    return
                } else if (this.selectIds.length > 1) {
                    this.$message({type: 'warning', message: '同时只能选择一条发送财务'})
                    return
                }
                let selectObj = this.tableData.records.find(item => item.id === this.selectIds[0])
                if (selectObj.approveState != 1) {
                    this.$message({type: 'warning', message: '审核未通过，不能发送财务'})
                    return
                }
                request({
                    url: `${this.$ip}/mms-charge/chargeBillFlxgz/send`,
                    method: 'post',
                    data: {
                        id: this.selectIds[0],
                    }
                })
                    .then((data) => {
                        if (data.code == 200 && data.data) {
                            this.$message({type: 'success', message: '发送成功'});
                        } else {
                            this.$message({type: 'error', message: '发送失败，请重试'});
                        }
                        this.getList();
                        this.selectIds = []
                    })
            },
            addChargeOrderFn(type, query,inOrOut) {
                var pushPath = {
                    path: type,
                    query: {type: query,  inOrOut:inOrOut||null},
                }
                if (query != 'add') {
                    if (this.selectIds.length === 0) {
                        this.$message({type: 'warning', message: '必须选择一项操作'});
                        return
                    } else if (this.selectIds.length > 1) {
                        this.$message({type: 'warning', message: '同时只能选择一条进行操作'})
                        return
                    }
                    if (query === 'edit') {
                        let selectObj = this.tableData.records.find(i => i.id === this.selectIds[0])
                        if (selectObj.approveState === 1) {
                            this.$message({type: 'warning', message: '已通过状态不能编辑'})
                            return
                        }
                    }
                    Object.assign(pushPath.query, {id: this.selectIds[0]})
                }
                this.$router.push(pushPath)
                //{
                //path: type,query: {type:query, id: this.selectObjs[0].id, folderId: this.$route.query.folderId}
                //path: type,
                //query: {type:query, id: this.selectId}
                //}
            },
            exportChargeOthFn(type) {
                if (this.selectIds.length === 0) {
                    this.$message({type: 'warning', message: '必须选择内容才能导出'});
                    return
                }
                let urlObj = {
                    charge: {
                        name: '/chargeBillFlxgz/flxgzExport',
                        ext: 'zip'
                    },
                    excel: {
                        name: '/chargeBillFlxgz/excelExport',
                        ext: 'xlsx'
                    }
                }
                if (!this.form.fileUrl) {
                    this.dialogTemplateVisible = false
                    reutrn
                }
                request({
                    // headers: {
                    //     //'Content-Type': 'application/vnd.ms-excel',
                    // },
                    url: `${this.$ip}/mms-charge${urlObj[type]['name']}?ids=${this.selectIds.join(',')}&fileUrl=${this.form.fileUrl}`,
                    method: 'get',
                    responseType: 'blob',
                }).then((d) => {
                    const content = d
                    const blob = new Blob([content]) //,{type:'application/vnd.ms-excel'}
                    const fileName = `机务服务非例行工作结算清单.${urlObj[type]['ext']}`
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    }
                    this.dialogTemplateVisible = false
                })
            },
            exportChargeFn(type) {
                if (this.selectIds.length === 0) {
                    this.$message({type: 'warning', message: '必须选择内容才能导出'});
                    return
                }
                let urlObj = {
                    charge: {
                        name: '/chargeBillFlxgz/flxgzExport',
                        ext: 'zip'
                    },
                    excel: {
                        name: '/chargeBillFlxgz/excelExport',
                        ext: 'xlsx'
                    }
                }
                request({
                    // headers: {
                    //     //'Content-Type': 'application/vnd.ms-excel',
                    // },
                    url: `${this.$ip}/mms-charge${urlObj[type]['name']}?ids=${this.selectIds.join(',')}`,
                    method: 'get',
                    responseType: 'blob',
                }).then((d) => {
                    const content = d
                    const blob = new Blob([content]) //,{type:'application/vnd.ms-excel'}
                    const fileName = `机务服务非例行工作结算清单.${urlObj[type]['ext']}`
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    }
                })
            },
            requestTable(searchData) {
                this.form = searchData;
                this.selectIds = [],
                    this.tableData = {records: []};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.getList();
            },
            removeOrderFn() {

                if (this.selectIds.length === 0) {
                    this.$message({type: 'warning', message: '请选择内容'});
                    return
                } else if (this.selectIds.length > 1) {
                    this.$message({type: 'warning', message: '同时只能选择一条进行删除'})
                    return
                }
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    request({
                        url: `${this.$ip}/mms-charge/chargeBillFlxgz/delete/${this.selectIds[0]}`,
                        method: 'delete',
                    })
                        .then((data) => {
                            if (data.code == 200 && data.data) {
                                this.$message({type: 'success', message: '删除成功'});
                            } else {
                                this.$message({type: 'error', message: '删除失败，请重试'});
                            }
                            this.getList();
                            this.selectIds = []
                        })
                }).catch(() => {

                })

            },
            headerSort(column) {
                this.sort = {};
                // this.sort = {
                //     order:`${column['property']},${column.order==='desc'?'0':'1'}`
                // }
                let num = null
                if (column.order == 'desc') {
                    num = 0
                } else if (column.order == 'asc') {
                    num = 1
                } else {
                    num = 2
                }
                if (num != 2) {
                    this.sort['order'] = column.property + ',' + num;
                }
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.params.current = 1;
                this.getList();
            },
            listenToCheckedChange(row, column, event) {
                let select = row.selected;
                // this.tableData.records.map(r =>{
                //     if(r.selected){
                //         r.selected = false;
                //     }
                // })
                row.selected = !select;
                if (row.selected) {
                    //this.selectId = row.id;
                    this.selectIds.push(row.id)  //row.id
                } else {
                    //this.selectId = null;
                    this.selectIds = this.arrRemEleFn(this.selectIds, row.id)
                    // this.selectIds = this.selectIds.filter(item=>{
                    //     return arr.includes(item.id)
                    // })
                }
                //this.params.current = 1;
                this.$set(this.tableData.records, row.index, row);
            },
            arrRemEleFn(arr, val) {
                var index = arr.indexOf(val);
                if (index > -1) {
                    arr.splice(index, 1);
                }
                return arr
            },
            addOrEditOrInfo(tag) {
                if (tag == 'add') {
                    this.$router.push({path: '/addSysParameter', query: {type: 'add'}});
                } else if (tag == 'edit' || tag == 'info') {
                    if (this.selectIds.length === 0) {
                        this.$message.error('请先选中一行数据');
                        return
                    } else if (this.selectIds.length > 1) {
                        this.$message({type: 'warning', message: '该操作只能选择一条数据'})
                        return
                    } else {
                        this.$router.push({path: '/addSysParameter', query: {type: tag, id: this.selectIds[0]}});
                    }
                }
            },
            delData() {
                if (this.selectIds.length === 1) {
                    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            request({
                                url: `${this.$ip}/mms-parameter/rest-api/sysParam/del`,
                                method: 'post',
                                data: {id: this.selectIds[0]}
                            })
                                .then((data) => {
                                    this.$message({type: 'success', message: '删除成功'});
                                    this.getList();
                                    this.selectIds = [];
                                })
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除',
                            });
                        });
                } else {
                    this.$message.error('请先选中一行数据');
                }
            },
            getList() {
                request({
                    url: `${this.$ip}/mms-charge/chargeBillFlxgz/list?current=${this.params.current}&size=${this.params.size}`,
                    method: 'post',
                    data: {...this.sort, ...this.form}
                })
                    .then((data) => {
                        if (this.params.current == 1) {
                            this.tableData = {
                                records: data.data.records,
                                current: 1,
                                size: this.params.size,
                                total: data.data.total
                            }
                        } else {
                            this.tableData = {records: data.data.records, ...this.params, total: data.data.total}
                        }
                        this.selectIds = []
                        this.getNumberFn()
                        console.log(this.tableData)
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
            handleCheckedChange() {
            },
            handleSelectionChange() {
            },
            effectiveListFn() {
                if (this.selectIds.length === 0) {
                    this.$message({type: 'warning', message: '必须选择内容才能导出'});
                    return
                }
                this.dialogTemplateVisible = true;
                request({
                    url: `${this.$ip}/mms-charge/chargeTemplate/effectiveList`,
                    method: 'post',
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.templateData = data.data
                        } else {
                            this.templateData = []
                        }
                    }).catch((error) => {
                    this.templateData = []
                });
            }
        },
    };
</script>
<style scoped lang="scss">
	.top-right {

		.header {
			font-size: 20px;
			span {
				margin-left: 40px;
			}
		}
	}
	.xiala{
		position: relative;
	}
	/deep/ .el-dropdown{
		position: absolute;
		top:0;
		.el-button{
			 opacity: 0;
			width: 69px;
			height: 31px;
		}
	}
	/deep/ .mainTable {
		.el-checkbox__label {
			display: none;
		}
	}
</style>
