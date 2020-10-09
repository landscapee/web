<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/MyWorkAbnormalDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/MyWorkPaperDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/MyWorkAbnormalAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/MySignControlAdd'" :key="$route.path"></router-view>
         <div v-else-if="this.$router.history.current.path == '/myWorkOrder'" :key="$route.path" class="myWorkOrder">
            <div class="top-content">
                <div class="top-content-title">
                    <span>我的工单</span>
                </div>
            </div>
            <div class="main-content">
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                     <el-table-column align="center" slot="option" label="操作" :width="59" >
                        <template  slot-scope="scope">
                            <div>
                                <span @click="abnormalChange(scope.row)" class="rowSvg">
                                    <icon iconClass="editNew" title="异常更改"></icon>
                                </span>
                            </div>
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
    import { Config } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,
        },
        name: 'authorizeManage',
        data() {
            return {
                tableData:{records:[]},
                tableConfig:Config({}),
                params:{
                    current: 1,
                    size: 15,
                },

                checkArr:[],
                form:{},
                row:{},
                sort:{},
                selectId:null
            };
        },
        created() {
             if(this.$router.history.current.path == '/myWorkOrder'){
                this.getList();
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["worldorderType",'W_flightType','W_workType','applyETOP','workUserType',]
                }).then(d => {
                    let obj=d.data
                    this.tableConfig=Config(obj,[],[],[],[])
                });
               }
        },

        methods: {
            requestTable(searchData){
                this.form = searchData;
                this.selectId=null;
                this.tableData={records:[]};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.checkArr=[]
                this.getList();
            },
            headerSort(column){
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
                this.checkArr=[]
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.params.current = 1;
                // console.log(column.property,column.order, this.sort,11);
                this.getList();
            },
            listenToCheckedChange(row, column, event){
                let select = row.selected;
                this.tableData.records.map(r =>{
                    if(r.selected){
                        r.selected = false;
                    }
                })
                row.selected  = !select;
                let numIndex =this.checkArr.findIndex((k,l)=>k.id==row.id)
                if(numIndex>-1){
                    this.checkArr.splice(numIndex,1)
                }else{
                    this.checkArr.push(row)
                }
                if(row.selected ){
                    this.row = row;
                    this.selectId = row.id;
                }else {
                    this.selectId   = null;
                    this.row = null;

                }
                  this.$set(this.tableData.records,row.index,row);
            },
            abnormalChange(row){
                let src = '/MyWorkAbnormalDetails';
                if (row.offlineFile) {
                    src = '/MyWorkAbnormalAdd';
                }
                this.$router.push({path: src, query: {id: row.id, type: 'edit',needSubmit:'1'}});
            },

            getList(){
                this.checkArr=[]
                let data={...this.form}
                map(data,((k,l)=>{
                    if(!k){
                        data[l]=null
                    }
                    if(l=='state'&&k){
                        data[l]= Number(k)
                     }
                }))
                request({
                    url:`${this.$ip}/mms-workorder/workorder/myList`,
                    method: 'post',
                    data:{...this.sort,...data},
                    params:{...this.params,}
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
            handleCheckedChange() {},
            handleSelectionChange() {},
        },
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";
    .myWorkOrder{
        margin-top:14px;
        /deep/ .mainTable{
            height:calc(100vh - 370px);
            .el-checkbox__label{
                display: none;
            }
        }
       /deep/ .cell> div{
            line-height: 20px!important;
        }
    }

</style>
