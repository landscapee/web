<template>
    <div>

        <router-view v-if="this.$router.history.current.path == '/WorkTemplateAdd'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$router.history.current.path == '/SuserTrain'" :key="$route.path"></router-view>
         <div v-else-if="this.$router.history.current.path == '/WorkTemplate'" :key="$route.path" class="coursewareMaintain">
            <div class="top-content">
                <div class="top-content-title">
                    <span>工单模板管理</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                </div>
            </div>

            <div class="main-content">
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="check" label="最新版本标识" :width="120" align="center" >
                        <template slot-scope="{ row }">
                                  <el-checkbox v-model="!row.history" :label="false" v-if="!row.history" ></el-checkbox>
                        </template>
                    </el-table-column>
                    <!--:show-overflow-tooltip="true"-->
                    <el-table-column align="center" slot="option" label="操作" :width="160" >
                        <template  slot-scope="scope">

                            <div >
                                <el-button class="QoptionButton" @click="enable(scope.row)"  v-if="scope.row.state===0&&scope.row.history===false">启用</el-button>

                                <el-button class="QoptionButton" @click="addOrEditOrInfo1(scope.row,'edit')" v-if="scope.row.state!==3">改版</el-button>
                                <el-button class="QoptionButton" @click="unEnable(scope.row)"  v-if="scope.row.state===1">停用</el-button>
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
    import { workOrderConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable
        },
        name: 'authorizeManage',
        data() {
            return {
                tableData:{records:[]},
                tableConfig:workOrderConfig({}),
                params:{
                    current: 1,
                    size: 15,
                },

                form:{},
                row:{},
                sort:{},
                selectId:null
            };
        },
        created() {
             if(this.$router.history.current.path == '/WorkTemplate'){
                this.getList();
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:[ 'W_versionState' ]
                }).then(d => {
                    let obj=d.data||{}
                    this.tableConfig=workOrderConfig(obj )
                });
               }
        },

        methods: {

            enable(row,path){
                request({
                    url:`${this.$ip}/mms-workorder/template/enable/${row.id}`,
                    method: 'get',
                 })
                    .then((data) => {
                        this.$message.success('操作成功')
                        this.getList()
                    })
            },
            unEnable(row,path){
                request({
                    url:`${this.$ip}/mms-workorder/template/invalid/${row.id}`,
                    method: 'get',
                }).then((data) => {
                        this.$message.success('操作成功')
                        this.getList()
                    })

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
                    this.$router.push({path:'/WorkTemplateAdd',query:{type:'add'}});
                }else if(tag == 'edit' || tag == 'info'){
                    if(this.selectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        this.$router.push({path:'/WorkTemplateAdd',query:{type:tag,id:this.row.id}});
                    }
                }
            },
            addOrEditOrInfo1(row,tag){
                request({

                    url:`${this.$ip}/mms-workorder/template/copyByVersion`,
                    method: 'post',
                    params:{id:this.$route.query.id},
                    data: {
                        code:row.code,
                        version:row.version,
                    }
                }).then(d => {
                    if( d.code==200){
                         this.$router.push({path:'/WorkTemplateAdd',query:{type:tag,id:d.data.typeVO.id}});
                    }
                });

            },
            delData(){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            
                            request({
                                url:`${this.$ip}/mms-workorder/template/delete/`+this.selectId,
                                method: 'delete',
                             })
                                .then((d) => {
                                    if(d.code==200){
                                        this.getList();
                                        this.selectId   = null;
                                        this.row   = null;
                                        this.$message({type: 'success',message: '删除成功'});
                                    }

                                })
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除',
                            });
                        });            }

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
                    url:`${this.$ip}/mms-workorder/template/list`,
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
    .coursewareMaintain{
        margin-top:14px;
        /deep/ .mainTable{
            height:calc(100vh - 370px);
        }
    }

</style>
