<template>
    <div v-loading="loading"
            class="signboxdiv"
            element-loading-text="文件下载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(0, 0, 0, 0.8)">
         <router-view v-if="this.$route.path == '/WorkAbnormalDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/WorkPaperDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/WorkAbnormalAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/signControlAdd'" :key="$route.path"></router-view>
        <div v-else-if="this.$route.path == '/signControl'"
             :key="$route.path"
             class="QCenterRight G_listOne">
            <div class="">
                <div class="QHead">
                    工单完工签署
                </div>
                <div class="QheadRight">
                    <div @click="seeOther(null,'WorkAbnormalAdd')">
                        <icon iconClass="#" style="width: 0;"></icon>
                        纸制填报工单导入
                    </div>
                    <!--                    <div @click="abnormalChange( )"><icon iconClass="edit" ></icon>异常更改</div>-->
                    <div @click="addOrEditOrInfo('info')">
                        <icon iconClass="info" style="margin-right:0"></icon>
                        详情
                    </div>
                    <div @click="Export()">
                        <icon iconClass="export"></icon>
                        导出Excel
                    </div>
                    <div @click="moreExport()">
                        <icon iconClass="export"></icon>
                        批量导出
                    </div>
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"
                             refTag="searchTable" @selectCheckBox="selectCheckBox"
                             @requestTable="requestTable(arguments[0])" @listenToCheckedChange="listenToCheckedChange"
                             @headerSort="headerSort" @handleSizeChange="handleSizeChange"
                             @handleCurrentChange="handleCurrentChange" :showHeader="false" :showPage="true">
                    <el-table-column slot="checkbox" align="center" label="选择" :width="49">
                        <template slot-scope="scope">
                            <el-checkbox :ref="scope.row.id" @click.stop v-model="checkArr" :label="scope.row"
                                         value="dasdasd"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column align="center" slot="option" label="操作" :width="90">
                        <template slot-scope="scope">
                            <div>

                                <el-tooltip class="item" effect="dark" :enterable="false"
                                            :content="scope.row.offlineFile?'下载':'导出'" placement="top">
                                  <span v-if="scope.row.offlineFile" @click="Download(scope.row)" class="rowSvg">
                                        <icon iconClass="downloadNew"></icon>
                                    </span>
                                    <span v-else @click="scope.row.state!==3?'':exportRow(scope.row)"
                                          :class="scope.row.state!==3?'rowSvg rowSvgInfo':'rowSvg'">
                                        <icon iconClass="exportNew"></icon>
                                    </span>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :enterable="false" content="解锁" placement="top">
                                     <span v-if="scope.row.state===3 && scope.row.isOffline==='线上' && scope.row.template.type==='WXGD'"
                                           @click="unlock(scope.row)" class="rowSvg" style="margin-left: 10px">
                                        <icon iconClass="unlock"></icon>
                                    </span>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :enterable="false" content="异常更改"
                                            placement="top">
                                     <span v-if="(scope.row.template.type!=='WXGD') || (scope.row.isOffline==='线下')"
                                           @click="isLineWX(scope)  ? '':abnormalChange(scope.row)"
                                           :class="isLineWX(scope) ? 'rowSvg rowSvgInfo':'rowSvg'"
                                           style="margin-left: 10px">
                                        <icon iconClass="editNew"></icon>
                                    </span>
                                </el-tooltip>


                            </div>
                        </template>
                    </el-table-column>

                </SearchTable>
                <Download ref="Download"></Download>
                <MoreExport ref="MoreExport"></MoreExport>
                <Export ref="Export"></Export>
                <exportTopExcel ref="exportTopExcel" @isCLick="isCLick"></exportTopExcel>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import {Config} from './tableConfig.js';
    import Export from './export';
    import exportTopExcel from './exportTopExcel';
    import MoreExport from './moreExport';
    import request from '@lib/axios.js';
    import {extend, map} from 'lodash';

    export default {
        components: {
            Icon,
            SearchTable, MoreExport, Export, exportTopExcel
        },
        name: 'authorizeManage',
        computed: {
            isLineWX() {
                return (scope) => {
                    return scope.row.state !== 3 && scope.row.template.type !== 'WXGD' && scope.row.isOffline === '线上'
                }
            }
        },
        data() {
            return {
                tableData: {records: []},
                tableConfig: Config({}),
                params: {
                    current: 1,
                    size: 15,
                },
                loading: false,
                checkArr: [],
                form: {},
                row: {},
                sort: {},
                selectId: null
            };
        },
        created() {
            if (this.$router.history.current.path == '/signControl') {
                this.getList();
                request({
                    url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params: {delete: false},
                    data: ["worldorderType", 'W_flightType', 'QZ_workType', 'W_workType', 'applyETOP', 'workUserType',]
                }).then(d => {
                    if (d.code == 200) {
                        let obj = {
                            ...d.data,
                            W_workType: [...d.data.QZ_workType, ...d.data.W_workType,]
                        }
                        console.log('obj', obj);
                        this.tableConfig = Config(obj)
                    } else {
                        let obj = {
                            worldorderType: [],
                            W_flightType: [],
                            QZ_workType: [],
                            W_workType: [],
                            applyETOP: [],
                            workUserType: [],
                        }
                        this.tableConfig = Config(obj)
                    }

                });
            }
        },

        methods: {
            isCLick(val) {
                this.loading = val
            },
            Download(row) {
                request({
                    'Content-Type': 'application/x-www-form-urlencoded',
                    url: `${this.$ip}/mms-file/get-files-by-ids/`,
                    method: 'post',
                    params: {fileIds: row.offlineFile}
                }).then(d => {
                    if (d.code == 200) {
                        this.$refs.Download.open(d.data)
                    }
                });
            },
            moreExport() {
                if (this.checkArr.length) {
                    let arr = this.checkArr.filter((k, l) => {
                        return !k.offlineFile && k.state == 3
                    })
                    if (arr.length) {
                        this.$refs.MoreExport.open(arr)
                    } else {
                        this.$message.error('请选中至少一行已完成的线上工单');
                    }
                } else {
                    this.$message.error('请先选中一行或多行数据');
                }
            },
            Export() {
                this.$refs.exportTopExcel.open()

            },
            exportRow(row) {

                this.$refs.Export.open(row)
            },
            seeOther(row, path) {
                let src = path
                let data = row && row.id
                if (row && row.offlineFile) {
                    src = '/WorkPaperDetails'
                    data = row.offlineFile
                }
                this.$router.push({path: src, query: {type: 'add', id: data}});

            },
            requestTable(searchData) {
                this.form = searchData;
                this.selectId = null;
                this.tableData = {records: []};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.checkArr = []
                this.getList();
            },
            headerSort(column) {
                this.sort = {}
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
                this.checkArr = []
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.params.current = 1;
                // console.log(column.property,column.order, this.sort,11);
                this.getList();
            },
            selectCheckBox(list) {
                this.checkArr = list
            },
            listenToCheckedChange(row, list) {

                this.checkArr = list
                if (row.selected) {
                    this.row = row;
                    this.selectId = row.id;
                } else {
                    this.selectId = null;
                    this.row = null;
                }
            },
            addOrEditOrInfo(tag) {
                if (this.checkArr.length != 1) {
                    let s = this.checkArr.length > 0 ? '只能选中一行数据' : '请先选中一行数据'
                    this.$message.error(s);
                } else {
                    let src = '/WorkAbnormalDetails'

                    let data = this.checkArr[0].id
                    if (this.checkArr[0] && this.checkArr[0].offlineFile) {
                        src = '/WorkAbnormalAdd'
                    }
                    this.$router.push({path: src, query: {id: data, type: 'info'}});
                }
            },
            unlock(row) {
                this.$confirm('是否确认将此维修工单异常更改解锁?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    request({
                        url: `${this.$ip}/mms-workorder/workorder/unlock`,
                        method: 'get',
                        params: {id: row.id}
                    }).then((d) => {
                        if (d.code === 200) {
                            this.getList();
                            this.$message({type: 'success', message: '解锁成功'});
                        }
                    })
                });
            },
            abnormalChange(row) {
                if (row.state === 3) {
                    let src = '/WorkAbnormalDetails';
                    let data = row.id;
                    if (row.offlineFile) {
                        src = '/WorkAbnormalAdd'
                    }
                    localStorage.setItem('refresh', 'true')
                    this.$router.push({path: src, query: {id: data, type: 'edit'}});

                } else {
                    this.$message.error('请先完成工单');
                }
            },

            getList() {
                let data = {...this.form}
                map(data, ((k, l) => {
                    if (k !== 0 && !k) {
                        data[l] = null
                    }
                    if (l == 'state' && k) {
                        data[l] = Number(k)
                    }
                }))
                request({
                    url: `${this.$ip}/mms-workorder/workorder/list`,
                    method: 'post',
                    data: {...this.sort, ...data},
                    params: {...this.params,}
                })
                    .then((data) => {
                        this.tableData = extend({}, {...data.data});
                    })
            },
            handleSizeChange(size) {
                this.params.current = 1;
                this.params.size = size;
                this.getList();
            },
            handleCurrentChange(current) {
                this.params.current = current;
                this.getList();
            },
            handleCheckedChange() {
            },
            handleSelectionChange() {
            },
        },
    };
</script>
<style scoped lang="scss">
        .signboxdiv{
            padding:34px 30px 24px 30px;
            .QCenterRight{
                margin: 0;
            }
        }
    /deep/ .mainTable {
        height: calc(100vh - 370px);

        .el-checkbox__label {
            display: none;
        }
    }

    /deep/ .cell > div {
        line-height: 20px !important;
    }


</style>
