<template>
    <div>
         <router-view v-if="this.$router.history.current.path == '/safetyInformationAdd'" :key="$route.path"></router-view>
        <div v-else-if="this.$router.history.current.path == '/safetyInformationIndex'" :key="$route.path" class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>安全信息</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                     <div ><icon iconClass="export" ></icon>导出</div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column :show-overflow-tooltip="true" slot="remark" label="备注" :width="190" fixed="right">
                        <template  slot-scope="{ row }">
                            <span>{{row.remark}}</span>
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
import { sadetyInfoConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:sadetyInfoConfig(),
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
       this.getList();
    },
    watch:{

    },
    methods: {
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null,
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort={}
           column.order==""? column.order = 'desc':column.order=='asc'?column.order = 'desc':column.order = 'asc';
            this.sort[column.property] = column.order;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
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
            let data=JSON.stringify(this.row)
            if(tag=='add'){
                this.$router.push({path:'/safetyInformationAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/safetyInformationAdd',query:{type:tag,data:data}});
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
                            url:`http://173.100.1.126:3000/mock/639/securityInformation/delete`,
                            // url:`${this.$ip}/securityInformation/delete`,
                            method: 'delete',
                            params:{id:this.selectId}
                        })
                            .then((data) => {
                                this.getList();
                                this.selectId   = null;
                                this.$message({type: 'success',message: '删除成功'});
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
           request({
                // url:`${this.$ip}/securityInformation/list`,
                url:`http://173.100.1.126:3000/mock/639/securityInformation/list`,
                method: 'post',
                data:{...this.params,...this.sort,...this.form}
            })
            .then((data) => {
                // this.tableData = extend({}, this.tableData, data.data);
                 this.tableData = extend({}, this.tableData,
                    {
                        records:data.data
                    }
                    );
                console.log(this.tableData);
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
.sysParameter{
    margin-top:40px;
    
}
</style>
