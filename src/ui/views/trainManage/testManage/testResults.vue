<template>
    <div>

         <router-view v-if="this.$router.history.current.path == '/testManagePushStaff'" :key="$route.path"></router-view>
        <div v-else-if="this.$router.history.current.path == '/testManageResults'" :key="$route.path" class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>员工考试结果</span>
                </div>
                <div class="top-toolbar">
                    <!--<div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>-->
                    <!--<div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>-->
                    <!--<div @click="delData()"><icon iconClass="remove" ></icon>删除</div>-->
                    <!--<div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>-->
                    <div @click="exportExcel">
                        <icon iconClass="export" ></icon>
                        <a ref="a" :href="`${this.$ip}/mms-qualification/download/securityInformation`"></a>
                        导出Excel
                    </div>
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
                    <el-table-column   slot="option" label="操作" :width="210"  >
                        <template  slot-scope="{ row }">
                            <el-button    @click="scoreEntry(row)"
                                          style=" padding:3px 7px; background: black; color:white;margin: 0">
                                <div>分数</div>
                                <div>录入</div>
                            </el-button>
                            <el-button  class="copyButton" @click="testResults('/testManagePushStaff',row)"
                                        style=" padding:3px 7px; background: black; color:white;margin: 0">

                                <div>考试结果</div>
                                <div>推送</div>
                            </el-button>
                            <el-button  class="copyButton" @click="uploadTest( row)"
                                        style=" padding:3px 7px; background: black; color:white;margin: 0">

                                <div>纸质试卷</div>
                                <div>归档上传</div>
                            </el-button>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
        <UploadTest ref="UploadTest"></UploadTest>
        <ScoreEntry ref="ScoreEntry"></ScoreEntry>
    </div>
</template>
<script>
    import UploadTest from './uploadTest'
    import ScoreEntry from './scoreEntry'
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { testRuConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable,UploadTest,ScoreEntry
	},
    name: '',
    data() {
        return {
            tableData:{records:[{infNumber:'dsd'}]},
            tableConfig:testRuConfig(),
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
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {
        testResults(path,row){
            this.$router.push(path,row)
        },
        scoreEntry(row){
            this.$refs.ScoreEntry.open(row)

        },
        uploadTest(row){
            this.$refs.UploadTest.open(row)
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
            let data=JSON.stringify(this.row)
            if(tag=='add'){
                this.$router.push({path:'/testMaintenanceAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/testMaintenanceAdd',query:{type:tag,data:data}});
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
                             url:`${this.$ip}/mms-qualification/securityInformation/delete/`+this.selectId,
                            method: 'delete',
                            // params:{id:this.selectId}
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
                url:`${this.$ip}/mms-qualification/securityInformation/list`,
                 method: 'post',
                data:{...this.sort,...data},
               params:{...this.params,}
            })
            .then((data) => {
                  this.tableData = extend({},
                     {...data.data}
                 );

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
