<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addInfoPlate'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/historyInfoPlate'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/infoPlate'" class="sysParameter">
            <div class="top-content">
                <div class="top-left-toolbar">
                    <span :class="isActive==index?'isActive':''" @click="switchTable(index)" v-for="(name,index) in ['发布信息','接收信息']" :key="index">{{name}}</span>
                </div>
                <div class="top-content-title">
                    <span>{{this.isActive==0?'发布信息':'接收信息'}}</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('history')"><icon iconClass="history" ></icon>历史</div>
                    <div :class="this.isActive!=0?'isDisabled':''" @click="this.isActive==0?addOrEditOrInfo('add'):()=>{}"><icon iconClass="add" ></icon>新增</div>
                    <div :class="this.isActive!=0?'isDisabled':''" @click="this.isActive==0?addOrEditOrInfo('edit'):()=>{}"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                    <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="relationInfo" label="关联信息" :width="148" >
                        <template >
                             <el-button size="mini" @click="clickAction()">发布</el-button>
                             <el-button size="mini" @click="clickAction()">接收处理</el-button>
                             <el-button size="mini" @click="clickAction()">关闭</el-button>
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
import { infoPlateReceiveTable,infoPlateSendTable } from '../tableConfig.js';
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
            tableConfig:infoPlateReceiveTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            selectId:null,
            isActive:0
        };
    },
   created() {
       this.getList();
    },
    watch:{
        params:{
            handler:function(val,oldval){
                this.getList();
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
    },
    methods: {
        switchTable(index){
            this.isActive = index;
            if(index==0){
                this.tableConfig = infoPlateReceiveTable();
            }else{
                this.tableConfig = infoPlateSendTable();
            }
            this.getList();
        },
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null,
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort = {};
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
            if(row.selected){
                this.selectId = row.id;
            }else{
                this.selectId = null;
            }
            this.params.current = 1;
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addInfoPlate',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info' ||  tag == 'history' ){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    if(tag == 'history'){
                         this.$router.push({path:'/historyInfoPlate',query:{type:tag,id:this.selectId,tag:this.isActive==0?'send':'receive'}});
                    }else{
                        this.$router.push({path:'/addInfoPlate',query:{type:tag,id:this.selectId}});
                    }
                }
            }
        },
        delData(){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                request({
                    url:`${this.$ip}/mms-parameter/rest-api/sysParam/del`, 
                    method: 'post',
                    data:{id:this.selectId}
                })
                .then((data) => {
                   this.$message({type: 'success',message: '删除成功'});
                    this.getList();
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        getList(){
           request({
                          
                url:this.isActive==0?`${this.$ip}/mms-parameter/notificationPublish/list`:`${this.$ip}/mms-parameter/notificationRecipient/list`, 
                method: 'post',
                data:{...this.sort,...this.form},
                params:this.params
            })
            .then((data) => {
                if(this.params.current==1){
                    this.tableData = {records: data.data.items,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.items,...this.params,total:data.data.total}
                }
            }).catch((error) => {
            
            });
        },
        handleSizeChange(size) {
            this.params.current = 1;
			this.params.size = size;
		},
		handleCurrentChange(current) {
			this.params.current = current;
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
    .main-content{
        /deep/ .mainTable{
            height: 600px;
            overflow: auto;
        }    
    }
}
</style>
