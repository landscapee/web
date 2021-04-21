<template>
    <div :key="key">
        <router-view v-if="this.$route.path == '/editBusinessData'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/editBusinessSubset'" :key="$route.path"></router-view>
         <div v-if="this.$route.path == '/businessData'" class=" QCenterRight G_listTwo">
            <div class="">
                <div class="QHead">
                    业务数据类型及业务数据
                </div>

            </div>
            <div class="QlistBody Qdisplay tableTwoBox" ref="mainContent"  >
                <div class="QlistLeft">
                     <div class=" positiondiv">
                        <div style="visibility: hidden">ddd</div>
                        <div class="QheadRight">
                            <div   @click="addOrEditOrInfo('add')">
                                <icon iconClass="add"></icon>
                                新增
                            </div>
                            <div  @click="addOrEditOrInfo('edit')">
                                <icon iconClass="edit"></icon>
                                编辑
                            </div>
                            <div  @click="delData('left','leftSelectId')">
                                <icon iconClass="remove"></icon>
                                删除
                            </div>
                            <div @click="addOrEditOrInfo('info')">
                                <icon iconClass="info"></icon>
                                详情
                            </div>

                        </div>
                    </div>
                    <SearchTable class="left-main-table" refTag="left-table" ref="left-table"
                                 @requestTable="requestTable(arguments[0],'left','left-table')"
                                 @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')"
                                 @headerSort="HeaderSort(arguments[0], 'left-table','left','leftSort')"
                                 :data="tableLeftData" :tableConfig="businessTableConfig">
                        <el-table-column slot="radio" label="选择" :width="49">
                            <template slot-scope="{ row }">
                                <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                                <icon iconClass="ky" class="tab_radio" v-else></icon>
                            </template>
                        </el-table-column>
                    </SearchTable>


                </div>
                <div class="QlistRight ">
                    <div class=" positiondiv">
                        <div style="visibility: hidden">ddd</div>
                        <div class="QheadRight">
                            <div  @click="rightAddOrEditOrInfo('add')">
                                <icon iconClass="add"></icon>
                                新增
                            </div>
                            <div  @click="rightAddOrEditOrInfo('edit')">
                                <icon iconClass="edit"></icon>
                                编辑
                            </div>
                            <div  @click="delData('right','rightSelectId')">
                                <icon iconClass="remove"></icon>
                                删除
                            </div>
                            <div @click="rightAddOrEditOrInfo('info')">
                                <icon iconClass="info"></icon>
                                详情
                            </div>
                        </div>
                    </div>
                    <SearchTable class="right-subset-table" refTag="right-table" ref="right-table"
                                 @requestTable="requestTable(arguments[0],'right','right-table')"
                                 @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')"
                                 @headerSort="HeaderSort(arguments[0], 'right-table','right','rightSort')"
                                 :data="tableRightData" :tableConfig="businessSubsetConfig">
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
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import {businessDataTable, businessSubsetTable} from '../tableConfig.js';
    import request from '@lib/axios.js';
    import {extend} from 'lodash';
    import {debounce} from '@lib/tools';

    export default {
        components: {
            Icon,
            SearchTable,
        },
        name: 'businessDataIndex',
        data() {
            return {
                key: true,
                tableLeftData: {records: []},
                tableRightData: {records: []},
                businessTableConfig: businessDataTable(),
                businessSubsetConfig: businessSubsetTable(),
                leftParams: {
                    current: 1,
                    size: 18,
                },
                rightParams: {
                    current: 1,
                    size: 18,
                },
                leftForm: {},
                rightForm: {},
                leftSelectId: null,
                rightSelectId: null,
                 leftSort: {},
                rightSort: {},
                scroll: 0
            };
        },

        watch: {

            '$route': function (val, nm) {
                 if (val.path == '/businessData' && nm.path == '/editBusinessData') {
                    this.key = !this.key
                    console.log('one',this.leftForm);
                    this.leftParams.size = this.tableLeftData.records.length > 18 ? this.tableLeftData.records.length : 18
                    this.leftParams.current = 1
                    this.getList('left');


                } else if (val.path == '/businessData' && nm.path == '/editBusinessSubset') {
                    this.key = !this.key
                    this.rightParams.size = this.tableRightData.records.length > 18 ? this.tableRightData.records.length : 18
                    this.rightParams.current = 1
                    this.getList('right');
                    console.log('two',this.leftForm);

                    // this.toFrom=nm.query.type
                } else if (val.path == '/businessData') {
                    console.log('three',this.leftForm);
                    this.key = !this.key
                    this.leftParams.size = 18
                    this.leftParams.current = 1
                    this.rightParams.current = 1
                    this.leftRow = {}
                    this.rightRow = {}
                    this.leftForm = {}
                    this.rightForm = {}
                    this.leftSelectId = null
                    this.rightSelectId = null
                    this.tableRightData.records = []
                    this.tableLeftData.records = []
                    this.getList('left');

                }
                if (val.path == '/businessData'){
                    this.$nextTick(()=>{
                        this.$refs.mainContent.addEventListener('scroll', this.handleScroll, true);//监听函数

                    })
                }
            }
        },
        created() {
            if(this.$route.path == '/businessData'){
                this.leftParams.current = 1;
                this.getList('left');
            }

        },

        beforeRouteLeave(to,from,next){
            this.$refs.mainContent&&this.$refs.mainContent.removeEventListener('scroll', this.handleScroll);
            next()
        },
        activated(){
            console.log('activated');
        },

        mounted() {
             if (this.$refs.mainContent) {
                 // this.$refs.mainContent.removeEventListener('scroll', this.handleScroll)
                this.$refs.mainContent.addEventListener('scroll', this.handleScroll, true);//监听函数
            }
        },

        methods: {
            //监听滚动
            handleScroll($event) {
                console.log(1);
                // 获取滚动条的dom
                var bady = $event.target;
                // 获取距离顶部的距离
                var scrollTop = bady.scrollTop;
                // 获取可视区的高度
                var windowHeight = bady.clientHeight;
                // 获取滚动条的总高度
                var scrollHeight = bady.scrollHeight;
                //获取滚动元素标识
                var tag = bady.parentElement.__vue__.$parent.refTag;
                this.scroll = scrollTop;
                console.log(scrollTop + windowHeight + 1, scrollHeight);
                if (scrollTop + windowHeight + 1 >= scrollHeight) {
                    if (tag == 'left-table') {
                        debounce(() => {
                            this.leftParams.current = ++this.leftParams.current;
                            this.getList('left', 'scroll');
                        }, 100)()

                    } else {
                        debounce(() => {
                            this.rightParams.current = ++this.rightParams.current;
                            this.getList('right', 'scroll');
                        }, 100)()
                    }
                }
            },
            //查询表头数据
            requestTable(searchData, tag, tableTag) {
                if (tag == 'left') {
                    this.leftForm = searchData;
                    this.leftSelectId = null,
                        this.rightSelectId = null,
                        this.leftRow = {},
                        this.tableRightData = {records: []};
                    this.leftParams.current = 1;
                } else {
                    this.rightForm = searchData;
                    this.rightSelectId = null;
                    this.rightParams.current = 1;
                }
                this.$refs[tableTag].$refs.body_table.setCurrentRow();

                this.getList(tag);
            },
            //表头排序
            HeaderSort(column, str, tag, sortTag) {
                this[sortTag] = {};
                this[sortTag][column.property] = column.order;
                if (tag == 'left') {
                    this.$refs[str].$refs.body_table.setCurrentRow();
                    this.leftParams.current = 1;
                } else {
                    this.rightParams.current = 1;
                }
                this.getList(tag);
            },
            //表格选中事件
            listenToCheckedChange(row, tag, tableTag) {
                console.log(row, tag, tableTag);
                let select = row.selected;
                this[tableTag].records.map(r => {
                    if (r.selected) {
                        r.selected = false;
                    }
                })
                row.selected = !select;
                if (tag == "left") {
                    if (row.selected) {
                        this.leftRow = row
                        this.leftSelectId = row.id;
                        this.rightSelectId = null;
                    } else {this.leftRow = {}
                        this.leftSelectId = null;
                        //左边未选中，清除右边显示数据
                        this.tableRightData.records = [];
                    }
                     this.rightParams.current = 1;
                    this.getList('right');
                } else {
                    if (row.selected) {
                        this.rightSelectId = row.id;
                        this.rightRow = row
                    } else {
                        this.rightSelectId = null;
                    }
                }
                this.$set(this[tableTag].records, row.index, row);
            },
            //左侧表格新增编辑
            addOrEditOrInfo(tag) {
                if (tag == 'add') {
                    this.$router.push({path: '/editBusinessData', query: {}});
                } else if (tag == 'edit' || tag == 'info') {
                     if (this.leftSelectId == null) {
                        this.$message.error('请先选中一行数据');
                    } else {
                        this.$router.push({path: '/editBusinessData', query: { id: this.leftSelectId}});
                    }
                }
            },
            //右侧表格新增编辑
            rightAddOrEditOrInfo(tag) {
                if (tag == 'add') {
                    if (this.leftSelectId == null) {
                        this.$message.error('请先选中左侧列表一行数据');
                    } else {
                        if (!this.leftRow.enableMaintain) {
                            this.$message.error('当前运行状态为不可维护');
                        } else {
                            this.$router.push({
                                path: '/editBusinessSubset',
                                query: {  id: this.leftSelectId}
                            });
                        }
                    }
                } else if (tag == 'edit' || tag == 'info') {
                     if (this.rightSelectId == null) {
                        this.$message.error('请先选中一行数据');
                    } else {
                        this.$router.push({path: '/editBusinessSubset', query: { id: this.rightSelectId}});
                    }
                }
            },
            //删除表格行数据
            delData(tag, idstr) {

                if (this[idstr] != null) {
                    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            request({
                                url: tag == 'left' ? `${this.$ip}/mms-parameter/rest-api/businessDictionary/del` : `${this.$ip}/mms-parameter/rest-api/businessDictionaryValue/del`,
                                method: 'post',
                                data: {id: this[idstr]}
                            })
                                .then((data) => {
                                    this.$message({type: 'success', message: '删除成功'});
                                    if (tag == 'left') {
                                        this.leftParams.current = 1;
                                    } else {
                                        this.rightParams.current = 1;
                                    }

                                    this.getList(tag);
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


            getList(tag, scroll) {
                if (tag == 'left') {
                      request({
                        url: `${this.$ip}/mms-parameter/rest-api/businessDictionary/query`,
                        method: 'post',
                        data: {...this.leftForm, ...this.leftSort, ...this.leftParams}
                    })
                        .then((d) => {
                             if (d.data && d.data.items) {
                                 d.data.items.map((k, l) => {
                                     if (k.id == this.leftSelectId) {
                                        k.selected = true
                                        this.leftRow = k
                                    }
                                })
                                if (this.leftParams.current == 1) {
                                    this.tableLeftData.records = d.data.items;
                                } else {
                                    this.tableLeftData.records.push.apply(this.tableLeftData.records, d.data.items);
                                }
                                if (scroll && d.data.items.length == 0) {
                                    this.leftParams.current = --this.leftParams.current;
                                }
                                if (this.leftRow) {
                                    this.$refs['left-table'].$refs.body_table.setCurrentRow(this.leftRow)
                                }
                            }
                        }).catch((error) => {

                    });
                } else {
                    if (this.leftSelectId != null) {
                        request({
                            url: `${this.$ip}/mms-parameter/rest-api/businessDictionaryValue/query`,
                            method: 'post',
                            data: {...this.rightForm, dicId: this.leftSelectId, ...this.rightSort, ...this.rightParams}
                        })
                            .then((data) => {
                                data.data.items.map((k, l) => {
                                    if (k.id == this.rightSelectId) {
                                        k.selected = true
                                        this.rightRow = k
                                    }
                                })
                                if (this.rightParams.current == 1) {
                                    this.tableRightData.records = data.data.items;
                                } else {
                                    this.tableRightData.records.push.apply(this.tableRightData.records, data.data.items);
                                }
                                if (scroll && data.data.items.length == 0) {
                                    this.rightParams.current = --this.rightParams.current;
                                }
                                if (this.leftRow) {
                                    this.$refs['left-table'].$refs.body_table.setCurrentRow(this.leftRow)
                                }
                                if (this.rightRow) {
                                    this.$refs['right-table'].$refs.body_table.setCurrentRow(this.rightRow)
                                }


                            }).catch((error) => {

                        });
                    }
                }
            },
        },
    };
</script>
<style scoped lang="scss">

</style>
