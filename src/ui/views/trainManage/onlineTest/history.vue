<template>
    <div>
        <div class="QCenterRight G_listOne">
            <div>
                <div class="QHead">
                    历史考试记录
                </div>

            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig" refTag="searchTable"
                             @requestTable="requestTable(arguments[0])" @listenToCheckedChange="listenToCheckedChange"
                             @headerSort="headerSort" @handleSizeChange="handleSizeChange"
                             @handleCurrentChange="handleCurrentChange" :showHeader="false" :showPage="true">
                    <el-table-column slot="radio" label="选择" :width="49">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import {historyTest} from './tableConfig.js';
    import request from '@lib/axios.js';
    import {extend, map} from 'lodash';

    export default {
        components: {
            Icon,
            SearchTable
        },
        name: '',
        data() {
            return {
                tableData: {records: []},
                tableConfig: historyTest({}),
                params: {
                    current: 1,
                    size: 15,
                },
                form: {},
                row: {},
                sort: {},
                selectId: null
            };
        },
        created() {
            request({
                url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params: {delete: false},
                data: ["testType", "testCategory1", "zizhiType", 'businessType',]
            }).then(d => {
                let obj = d.data
                this.tableConfig = historyTest(obj)

            });
            this.getList();
        },

        methods: {



            requestTable(searchData) {
                this.form = searchData;
                this.selectId = null;
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
                console.log(column.property, column.order, this.sort, 11);
                this.getList();
            },
            listenToCheckedChange(row, column, event) {

                let select = row.selected;
                this.tableData.records.map(r => {
                    if (r.selected) {
                        r.selected = false;
                    }
                })
                row.selected = !select;
                if (row.selected) {
                    this.selectId = row.id;
                } else {
                    this.selectId = null;
                }
                this.row = row;
                this.params.current = 1;
                console.log(row, column, event, 199);
                this.$set(this.tableData.records, row.index, row);
            },



            getList(){
                let data={...this.form}
                map(data,((k,l)=>{
                    if(!k){
                        data[l]=null
                    }
                }))
                request({
                    url:`${this.$ip}/mms-training/examLine/list`,
                    method: 'post',
                    data:{...this.sort,...data,status:1,employeeId:this.$store.state.user.userInfo.id},
                    params:{...this.params,}
                })
                    .then((data) => {
                        console.log(data);
                        if(data.code==200){
                            data.data.records.map((k,l)=>{
                                k.id=l+1
                            })
                            this.tableData = extend({},
                                {...data.data}
                            );
                        }
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
