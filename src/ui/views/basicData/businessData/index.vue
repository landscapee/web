<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/editBusinessData'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/editBusinessSubset'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/businessData'" class="businessData">
            <div class="top-content">
                <div class="top-content-title">
                    <span>业务数据类型及业务数据</span>
                </div>
                <div class="top-toolbar">
                    <div class="left-toolbar">
                        <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                        <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                        <div><icon iconClass="export" ></icon>导出Excel</div>
                        <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                        <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                    </div>
                    <div class="right-toolbar">
                        <div @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                        <div @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div @click="rightDelData()"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="rightAddOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                        <div><icon iconClass="export" ></icon>导出Excel</div>
                        <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                        <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable class="left-main-table" refTag="left-table" ref="left-table"  @requestTable="leftRequestTable"   @listenToCheckedChange="listenToLeftCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableLeftData" :tableConfig="businessTableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                </SearchTable>
                <SearchTable class="right-subset-table" refTag="right-table" ref="right-table"   @requestTable="rightRequestTable"   @listenToCheckedChange="listenToRightCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableRightData" :tableConfig="businessSubsetConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
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
import { businessDataTable,businessSubsetTable } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable,
	},
    name: '',
    data() {
        return {
            tableLeftData:{records:[]},
            tableRightData:{records:[]},
            businessTableConfig:businessDataTable,
            businessSubsetConfig:businessSubsetTable,
            params:{
				current: 1,
				size: 15,
            },
            leftForm:{},
            rightForm:{},
            leftSelectId:null,
            rightSelectId:null
        };
    },
   created() {
       this.getList('left');
    },
    watch:{
        params:{
            handler:function(val,oldval){
                this.getList('left');
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
    },
    methods: {
        leftRequestTable(searchData){
           this.leftForm = searchData[0];
           this.getList('left');
        },
        rightRequestTable(searchData){
           this.rightForm = searchData[0];
           this.getList('right');
        },
        headerSort(column){
            alert(123);
        },
        listenToLeftCheckedChange(row, column, event){
            let select = row.selected;
            this.tableLeftData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
			})
          row.selected  = !select;
          this.leftSelectId = row.id;
          this.$set(this.tableLeftData.records,row.index,row);
          this.getList('right');
        },
        listenToRightCheckedChange(row, column, event){
            let select = row.selected;
            this.tableRightData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
			})
            row.selected  = !select;
          this.rightSelectId = row.id;
          this.$set(this.tableRightData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/editBusinessData',query:{type:'add'}});
            }else if(tag == 'edit'){
                if(this.leftSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/editBusinessData',query:{type:'edit',id:this.leftSelectId}});
                }
               
            }else{
                this.$router.push({path:'/editBusinessData',query:{type:'info'}});
            }
        },
        rightAddOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/editBusinessSubset',query:{type:'add'}});
            }else if(tag == 'edit'){
                if(this.rightSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/editBusinessSubset',query:{type:'edit',id:this.rightSelectId}});
                }
            }else{
                this.$router.push({path:'/editBusinessSubset',query:{type:'info'}});
            }
        },
        rightDelData(){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                // request({
                //     url:'/api/delete', 
                //     method: 'delete',
                //     params:{id:""}
                // })
                // .then((data) => {
                //    this.$message({type: 'success',message: '删除成功'});
                // })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        delData(){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                // request({
                //     url:'/api/delete', 
                //     method: 'delete',
                //     params:{id:""}
                // })
                // .then((data) => {
                //    this.$message({type: 'success',message: '删除成功'});
                // })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        getList(tag){
            if(tag=='left'){
                request({
                    url:'http://173.100.1.134:18000/rest-api/businessDictionary/query', 
                    method: 'post',
                    data:this.leftForm
                })
                .then((data) => {
                    this.tableLeftData.records =  data.data;
                }).catch((error) => {
            
                });
            }else{
                request({
                    url:'http://173.100.1.134:18000/rest-api/businessDictionaryValue/query', 
                    method: 'post',
                    data:this.rightForm
                })
                .then((data) => {
                    this.tableRightData.records =  data.data;
                }).catch((error) => {
            
                });
            }
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
@import "@/ui/views/basicData/businessData/assets/styles/businessData.scss"; 
.businessData{
    margin-top:40px;
    .top-content{
        .top-toolbar{
            padding: 0px 30px 0px 30px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            .left-toolbar{
                width:837px;
                text-align: right;
            }
            .right-toolbar{
                width:824px;
                text-align: right;
            }
        }
    }
    .main-content{
        padding: 0px 30px 0px 30px;
        display: flex;
        justify-content: space-between;
         /deep/ .left-main-table{
            width:837px;
            /deep/ .el-table{
                width:837px;
            }
        }
        /deep/ .right-subset-table{
            width:824px;
            /deep/ .el-table{
                width:824px;
            }
        }
    }
   
}
</style>
