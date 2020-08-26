<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/WorkAbnormalDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/WorkPaperDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/WorkAbnormalAdd'" :key="$route.path"></router-view>

        <router-view v-else-if="this.$router.history.current.path == '/signControlAdd'" :key="$route.path"></router-view>
         <div v-else-if="this.$router.history.current.path == '/signControl'" :key="$route.path" class="signControl">
            <div class="top-content">
                <div class="top-content-title">
                    <span>工单完工管控</span>
                </div>
                <div class="top-toolbar">
                    <div  @click="seeOther(null,'WorkAbnormalAdd')"> <icon iconClass="#" style="width: 0;" ></icon>纸制填报工单导入</div>
                    <div @click="abnormalChange( )"><icon iconClass="edit" ></icon>异常更改</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" style="margin-right:0"></icon>详情</div>
                    <div @click="Export()"><icon iconClass="export" ></icon>导出Excel</div>
                    <div @click="moreExport()"><icon iconClass="export" ></icon>批量导出</div>
                 </div>
            </div>
            <div class="main-content">
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="checkbox" align="center" label="选择" :width="50"   >
                        <template slot-scope="scope">
                            <el-checkbox :ref="scope.row.id" @click.stop.native  v-model="checkArr" :label="scope.row" value="dasdasd"> </el-checkbox>
                        </template>
                    </el-table-column>
                     <el-table-column align="center" slot="option" label="操作" :width="80" >
                        <template  slot-scope="scope">
                            <div >
                                <!--签署工单-->
                                <el-button class="QoptionButton" @click="exportRow(scope.row)">导出</el-button>
                            </div>
                         </template>
                    </el-table-column>

                </SearchTable>
                <MoreExport ref="MoreExport"></MoreExport>
                <Export ref="Export"></Export>
            </div>
        </div>

    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { Config } from './tableConfig.js';
    import Export from './export';
    import MoreExport from './moreExport';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,MoreExport,Export
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
             if(this.$router.history.current.path == '/signControl'){
                this.getList();
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["worldorderType",'W_flightType','W_workType','applyETOP','workUserType',]
                }).then(d => {
                    let obj=d.data
                    this.tableConfig=Config(obj,[],[],[],[])
                    // request({
                    //     url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                    //     method: 'get',
                    // }).then(d1 => {
                    //
                    // });
                });
               }
        },

        methods: {
            moreExport(){
                if(this.checkArr.length){

                }else {
                    this.$message.error('请先选中一行或多行数据');
                }
            },
            Export(){

            },
            exportRow(row){
                this.$refs.Export.open(row)
            },
            seeOther(row,path){
                let src=path
                let data=row&&row.id
                if(row&&row.offlineFile){
                    src='/WorkPaperDetails'
                    data=row.offlineFile
                }
                this.$router.push({path:src,query:{ id:data}});

            },
            requestTable(searchData){
                this.form = searchData;
                this.selectId=null;
                this.tableData={records:[]};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.getList();
            },
            headerSort(column){
                this.sort={}
                let num =null
                if(column.order=='desc'){
                    num=0
                }else if(column.order=='asc'){
                    num=1
                }else{
                    num=2
                }
                if(num!=2){
                    this.sort['order'] = column.property+','+num;
                }
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
                let numIndex =this.checkArr.indexOf(row.id)
                if(numIndex>-1){
                    this.checkArr.splice(numIndex,1)
                }else{
                    this.checkArr.push(row.id)
                }
                if(row.selected ){
                    this.row = row;
                    this.selectId = row.id;
                }else {
                    this.selectId   = null;
                    this.row = null;

                }

                this.params.current = 1;
                 this.$set(this.tableData.records,row.index,row);
            },
            addOrEditOrInfo(tag){
                if(tag=='add'){
                    this.$router.push({path:'/addAuthorizeManage',query:{type:'add'}});
                }else if(tag == 'edit' || tag == 'info'){
                    if(this.selectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        this.$router.push({path:'/addAuthorizeManage',query:{type:tag,id:this.row.id}});
                    }
                }
            },
            abnormalChange( ){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/WorkAbnormalDetails',query:{id:this.selectId}});
                }
            },

            getList(){
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
                    url:`${this.$ip}/mms-workorder/workorder/list`,
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
    .signControl{
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
