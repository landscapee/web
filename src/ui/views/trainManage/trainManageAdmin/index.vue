<template>
    <div>

         <router-view v-if="this.$route.path == '/addtrainManageAdminAdd'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/edittrainManageAdminAdd'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/infotrainManageAdminAdd'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/trainManageAdminPush'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/trainManageAdminResultsAdd'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/trainManageAdminResults'" :key="$route.path"></router-view>

        <div v-else-if="this.$route.path == '/trainManageAdmin'" :key="$route.path" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    培训管理
                </div>
                <div class="QheadRight">
                    <div v-if="isZDRole" @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div v-if="isZDRole" @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div v-if="isZDRole" @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div   @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <!--<a ref="a" :href="`${this.$ip}/mms-training/download/securityInformation`"></a>-->
                    <div   @click="exportExcel"><icon iconClass="export" ></icon>导出</div>
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                     <el-table-column align="center" slot="option" label="操作" :width="100" >
                        <template  slot-scope="scope">
                            <el-tooltip v-if="isZDRole" class="item" effect="dark" :enterable="false" content="推送员工" placement="top">
                                  <span @click="pushStaff(scope.row)" class="rowSvg">
                                        <icon iconClass="pushNew"  ></icon>
                                    </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="培训结果" placement="top">
                                 <span @click="trainResults(scope.row)" class="rowSvg" style="margin-left: 10px">
                                        <icon iconClass="trainResult"  ></icon>
                                    </span>
                            </el-tooltip>
                            <div>



                            </div>
                        </template>
                    </el-table-column>

                </SearchTable>

            </div>
        </div>
        <ExportTrain ref="ExportTrain"></ExportTrain>
    </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { trainManageAdminConfig } from './tableConfig.js';
import ExportTrain from './exportTrain';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable,ExportTrain
	},
    name: 'trainManageAdmin',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:trainManageAdminConfig({}),
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
        if(this.$route.path == '/trainManageAdmin'){
            this.getList();
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['trainType']
            }).then(d => {
                let obj=d.data
                this.tableConfig=trainManageAdminConfig(obj,this)
            });
        }
    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('PXKHZDGLY')
        },
    },
    methods: {
        open1() {
            this.$notify({
                title: '自定义位置',
                message: '右上角弹出的消息',
                position: 'center'

            });
        },
        pushStaff(row){
            this.$router.push({path:'/trainManageAdminPush',query:{id:row.id}})
         },
        trainResults(row){
            this.$router.push({path:'/trainManageAdminResults',query:{id:row.id}})

        },
        exportExcel(){
             // this.$refs.a.click()
            this.$refs.ExportTrain.open(this.row)
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
                this.$router.push({path:'/addtrainManageAdminAdd',query:{ }});
            }else if(tag == 'edit' || tag == 'info'){
                 let p='/'+tag+'trainManageAdminAdd'
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:p,query:{ id:this.row.id}});
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
                             url:`${this.$ip}/mms-training/trainingInfo/delete/`+this.selectId,
                            method: 'delete',
                            // params:{id:this.selectId}
                        }).then((data) => {
                                if(data.code==200){
                                    this.getList();
                                    this.selectId  = null;
                                    this.row  = {};
                                    this.$message({type: 'success',message: '删除成功'});
                                }
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });
            }
        },
        getList(){
            let data={...this.form}
            map(data,((k,l)=>{
                if(!k){
                    data[l]=null
                }
            }))
           request({
                url:`${this.$ip}/mms-training/trainingInfo/list`,
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


</style>
