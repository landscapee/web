<template>
    <div>
        <router-view v-if="this.$route.path == '/workCardVrifyAdd'" :key="$route.path"></router-view>
        <div v-else-if="this.$route.path == '/workCardVrify'" :key="$route.path"
             class="QCenterRight G_listOne">
            <div class=" ">
                <div class="QHead">
                    工卡核对
                </div>
                <div class="QheadRight">
                    <div @click="addOrEditOrInfo('add')">
                        <icon iconClass="add"></icon>
                        新增
                    </div>
                    <div @click="addOrEditOrInfo('edit')">
                        <icon iconClass="edit"></icon>
                        编辑
                    </div>
                    <!--<div @click="delData()">-->
                    <!--<icon iconClass="remove"></icon>-->
                    <!--删除-->
                    <!--</div>-->
                    <div @click="addOrEditOrInfo('info')">
                        <icon iconClass="info"></icon>
                        详情
                    </div>
                    <div @click="exportWord('info')">
                        <icon iconClass="export"></icon>
                        导出
                    </div>


                </div>
            </div>
            <div class="tableOneBox">
                <!--:tableRowClassName="tableRowClassName"-->
                <SearchTable @selectCheckBox="selectCheckBox" scrollHeight="370"
                             ref="searchTable" :data="tableData" :tableConfig="tableConfig" refTag="searchTable"
                             @requestTable="requestTable(arguments[0])" @listenToCheckedChange="listenToCheckedChange"
                             @headerSort="headerSort" @handleSizeChange="handleSizeChange"
                             @handleCurrentChange="handleCurrentChange" :showHeader="false" :showPage="true">

                    <el-table-column align="center" slot="enclosure" label="附件" :width="90">
                        <template slot-scope="{row}">
                            <el-tooltip class="item" effect="dark" :enterable="false" content="附件下载" placement="top">
                                <span @click="row.enclosure?downloadFile(row):''"
                                      :class="!row.enclosure?'rowSvg rowSvgInfo':'rowSvg'">
                                        <icon iconClass="download"></icon>
                                    </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
        <Download ref="downloadFile"></Download>

    </div>
</template>
<script>

    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import {workCardConfig} from './tableConfig.js';
    import request from '@lib/axios.js';
    import {extend, map} from 'lodash';
    import Download from '@/ui/components/download';

    export default {
        components: {
            Icon,
            SearchTable,Download
        },
        name: 'workCardVrify',
        data() {
            return {
                tableData: {records: []},
                tableConfig: workCardConfig({}),
                params: {
                    current: 1,
                    size: 15,
                },
                form: {},
                sort: {},
                checkArr: [],
            };
        },
        created() {
            if (this.$router.history.current.path == '/workCardVrify') {
                this.getList();
            }
        },

        methods: {
            downloadFile(row){
                if(row.enclosure){
                    request({
                        url:`${this.$ip}/mms-file/get-files-by-ids/`,
                        method: "post",
                        params: {fileIds:row.enclosure}
                    }).then((d)=>{
                        if(d.code==200&&d.data&&d.data.length>0){
                            this.$refs.downloadFile.open(d.data);
                        }else{
                            this.$message.warning('请求文件信息失败')
                        }
                    })
                 }else{
                    this.$message.warning("暂无文件可以下载");
                }
            },
            exportWord() {
                if (!this.checkArr.length) {
                    this.$message.error('请至少选中一行数据');
                    return false
                }
                let ids = this.checkArr.map((k, l) => {
                    return k.id
                })
                request({
                    header: {
                        'Content-Type': 'multipart/form-data'
                    },
                    url: `${this.$ip}/mms-workorder/cardCheck/export`,
                    method: 'post',
                    data: {ids: ids.join(',')},
                    responseType: 'blob'
                }).then(d => {
                    console.log();
                    let arr = []
                    if (d.headers['content-disposition'] && d.headers['content-disposition'].split('=')) {
                        arr = d.headers['content-disposition'].split('=')[1].split('.')
                    }
                    let content = d;
                    let blob = new Blob([content], {type: 'application/vnd.ms-excel'})
                    const fileName = `${decodeURI(arr[0])}.${arr[1]}`
                    if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    } else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                });
            },

            requestTable(searchData) {
                this.form = searchData;
                this.tableData = {records: []};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
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
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.params.current = 1;
                this.getList();
            },
            selectCheckBox(list) {
                this.checkArr = list
            },
            listenToCheckedChange(row, list) {
                this.checkArr = list
            },
            addOrEditOrInfo(tag) {
                if (tag == 'add') {
                    this.$router.push({path: '/workCardVrifyAdd', query: {type: 'add'}});
                } else if (tag == 'edit' || tag == 'info') {
                    if (this.checkArr.length != 1) {
                        let s = this.checkArr.length > 0 ? '只能选中一行数据' : '请先选中一行数据'
                        this.$message.error(s);
                    } else {
                        let data = this.checkArr[0].id
                        this.$router.push({path: '/workCardVrifyAdd', query: {id: data, type: tag}});
                    }
                }
            },
            delData() {
                if (this.checkArr.length != 1) {
                    let s = this.checkArr.length > 0 ? '只能选中一行数据' : '请先选中一行数据'
                    this.$message.error(s);
                    return false
                }
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    request({
                        url: `${this.$ip}/mms-workorder/authorization/delete/` + this.checkArr[0].id,
                        method: 'delete',
                    }).then((d) => {
                        if (d.code == 200) {
                            this.getList();
                            this.$message({type: 'success', message: '删除成功'});
                        }
                    })
                })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });

            },
            getList() {
                let data = {...this.form}
                request({
                    url: `${this.$ip}/mms-workorder/cardCheck/list`,
                    method: 'post',
                    data: {...this.sort, ...data},
                    params: {...this.params,}
                }).then((data) => {
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


</style>
