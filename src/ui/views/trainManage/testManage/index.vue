<template>
    <div>

         <router-view v-if="this.$route.path == '/addtestManageAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/edittestManageAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infotestManageAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/testManagePushStaff'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/testManageResults'" :key="$route.path"></router-view>

        <div v-else-if="this.$route.path == '/testManage'" :key="$route.path" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    考试管理
                </div>
                <div class="QheadRight">
                    <div v-if="isZDRole"  @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div v-if="isZDRole"  @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div v-if="isZDRole"  @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <!--<div @click="exportExcel"><icon iconClass="export" ></icon><a ref="a" :href="`${this.$ip}/mms-training/download/securityInformation`"></a>导出Excel</div>-->
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column   slot="option" label="操作" align="center" :width="100"  >
                        <template  slot-scope="scope">
                            <el-tooltip v-if="isZDRole" class="item" effect="dark" :enterable="false" content="考试推送员工" placement="top">
                                <span @click="pushStaff('/testManagePushStaff',scope.row)" class="rowSvg">
                                        <icon iconClass="pushNew"  ></icon>
                                    </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="员工考试结果" placement="top">
                                <span @click="testPush('/testManageResults',scope.row)" class="rowSvg" style="margin-left:10px">
                                        <icon iconClass="trainResult"  ></icon>
                                    </span>
                            </el-tooltip>
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
import { testConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:testConfig({},{}),
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
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('PXKHZDGLY')
        },
    },
   created() {
        if(this.$route.path == '/testManage'){
            this.getList();
            request({
                url:`${this.$ip}/mms-training/paperInfo/list`,
                method: 'post',
                data:{},
                params:{size:10000,current:1}
            }).then((data) => {
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["testType", "testCategory1","zizhiType",'businessType','testState' ]
                }).then(d => {
                    let obj=d.data
                    this.tableConfig =testConfig(data.data.records||[],obj)

                });
            })

        }

    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {
        // row:JSON.stringify(row)
        testPush(path,row){
          this.$router.push({path:path,query:{id:row.id,}})
        },
        pushStaff(path,row){
          this.$router.push({path:path,query:{id:row.id,paperId:row.paperId}})
        },
        exportExcel(){
             this.$refs.a.click()
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
            console.log(column.property,column.order, this.sort,11);
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
                this.selectId = row.id;
            }else {
                this.selectId   = null;
            }
             this.row = row;
            this.params.current = 1;
            console.log(row, column, event,199);
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
             if(tag=='add'){
                this.$router.push({path:'/addtestManageAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                 let p='/'+tag+'testManageAdd'
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:p,query:{type:tag,id:this.row.id}});
                }
            }
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
                             url:`${this.$ip}/mms-training/examInfo/delete/`+this.selectId,
                            method: 'delete',
                         })
                            .then((data) => {
                                if(data.code==200){
                                    this.getList();
                                    this.selectId   = null;
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
            }))
           request({
                url:`${this.$ip}/mms-training/examInfo/list`,
                 method: 'post',
                data:{...this.sort,...data},
               params:{...this.params,}
            })
            .then((data) => {
                if(data.code==200){
                    this.tableData = extend({}, {...data.data});
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
		handleCheckedChange() {},
		handleSelectionChange() {},
    },
};
</script>
<style scoped lang="scss">
 
</style>
