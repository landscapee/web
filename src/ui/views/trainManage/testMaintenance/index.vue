<template>
    <div>

         <router-view v-if="this.$route.path == '/addtestMaintenanceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/edittestMaintenanceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infotestMaintenanceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/addtestMaintenanceAddAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/edittestMaintenanceAddAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infotestMaintenanceAddAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/testMaintenanceSee'" :key="$route.path"></router-view>

        <div v-else-if="this.$route.path == '/testMaintenance'" :key="$route.path" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    试卷维护
                </div>
                <div class="QheadRight">
                    <div v-if="isZDRole" @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div v-if="isZDRole"  @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div  v-if="isZDRole" @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <!--<div @click="exportExcel"><icon iconClass="export" ></icon><a ref="a" :href="`${this.$ip}/mms-training/download/securityInformation`"></a>导出</div>-->
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
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
import { testMainConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: 'textMindex',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:testMainConfig({}),
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
        if(this.$route.path == '/testMaintenance'){
            this.getList();
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["testCategory", "paperCategory","qualificationType", "businessType","applyObject", "selectType",]
            }).then(d => {
                let obj=d.data
                this.tableConfig=testMainConfig(obj)

            });

        }

    },

    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('PXKHZDGLY')
        },
    },
    methods: {
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
                this.$router.push({path:'/addtestMaintenanceAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                 let p='/'+tag+'testMaintenanceAdd'
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
                             url:`${this.$ip}/mms-training/paperInfo/delete/`+this.selectId,
                            method: 'delete',
                            // params:{id:this.selectId}
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
                }else {
                    if(l=='infTime'){
                        data.infTimeStr=data.infTime.getFullYear()
                    }
                    delete data.infTime
                }
            }))
           request({
                url:`${this.$ip}/mms-training/paperInfo/list`,
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
