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
                <SearchTable class="left-main-table" refTag="left-table" ref="left-table"  @requestTable="leftRequestTable"   @listenToCheckedChange="listenToLeftCheckedChange" @headerSort="leftHeaderSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableLeftData" :tableConfig="businessTableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                </SearchTable>
                <SearchTable class="right-subset-table" refTag="right-table" ref="right-table"   @requestTable="rightRequestTable"   @listenToCheckedChange="listenToRightCheckedChange" @headerSort="rightHeaderSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableRightData" :tableConfig="businessSubsetConfig"  :showHeader="false" :showPage="true" >
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
            leftForm:{enableMaintain:1},
            rightForm:{},
            leftSelectId:null,
            rightSelectId:null,
            leftRowState:false,
            sorts:{}
        };
    },
   created() {
       this.getList('left');
    },
　　mounted() {
       window.addEventListener('scroll', this.handleScroll,true);//监听函数
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
        handleScroll($event){
            var bady = $event.target;   // 获取滚动条的dom
　　　　　　　　　// 获取距离顶部的距离
            var scrollTop = bady.scrollTop;
            // 获取可视区的高度
            var windowHeight = bady.clientHeight;
            // 获取滚动条的总高度
            var scrollHeight = bady.scrollHeight;
            if(scrollTop+windowHeight>=scrollHeight){
               
               
            }
        },
        leftRequestTable(searchData){
           this.leftForm = searchData[0];
           this.leftSelectId=null,
           this.rightSelectId=null,
           this.leftRowState=false,
           this.tableRightData={records:[]};
           this.$refs["left-table"].$refs.body_table.setCurrentRow();
           this.getList('left');
        },
        rightRequestTable(searchData){
           this.rightForm = searchData[0];
           this.rightSelectId=null;
           this.$refs["right-table"].$refs.body_table.setCurrentRow();
           this.getList('right');
        },
        leftHeaderSort(column){
          column.order==""? column.order = 'desc':column.order=='asc'?column.order = 'desc':column.order = 'asc';
          this.sorts[column.property] = column.order;
          this.getList('left');
        },
        rightHeaderSort(column){
          column.order==""? column.order = 'desc':column.order=='asc'?column.order = 'desc':column.order = 'asc';
          this.sorts[column.property] = column.order;
          this.getList('right');
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
          this.leftRowState = row.enableMaintain==0?false:true;
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
            }else if(tag == 'edit' || tag=='info'){
                if(this.leftSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/editBusinessData',query:{type:tag,id:this.leftSelectId}});
                }
            }
        },
        rightAddOrEditOrInfo(tag){
            if(tag=='add'){
                if(this.leftSelectId==null){
                   this.$message.error('请先选中左侧列表一行数据');
                }else{
                    if(!this.leftRowState){
                         this.$message.error('当前运行状态为不可维护');
                    }else{
                         this.$router.push({path:'/editBusinessSubset',query:{type:'add',id:this.leftSelectId}});
                    }
                }
            }else if(tag == 'edit' || tag=='info'){
                if(this.rightSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/editBusinessSubset',query:{type:tag,id:this.rightSelectId}});
                }
            }
        },
        rightDelData(){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                request({
                    url:`${this.$ip}/rest-api/businessDictionaryValue/del`, 
                    method: 'post',
                    data:{id:this.rightSelectId}
                })
                .then((data) => {
                   this.$message({type: 'success',message: '删除成功'});
                   this.getList('right');
                })
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
                request({
                    url:`${this.$ip}/rest-api/businessDictionary/del`, 
                    method: 'post',
                    data:{id:this.leftSelectId}
                })
                .then((data) => {
                   this.$message({type: 'success',message: '删除成功'});
                   this.getList('left');
                })
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
                    url:`${this.$ip}/rest-api/businessDictionary/query`, 
                    method: 'post',
                    data:{...this.leftForm,...this.sorts}
                })
                .then((data) => {
                    this.tableLeftData.records =  data.data;
                }).catch((error) => {
            
                });
            }else{
                if(this.leftSelectId!=null){
                    request({
                        url:`${this.$ip}/rest-api/businessDictionaryValue/query`, 
                        method: 'post',
                        data:{...this.rightForm,dicId:this.leftSelectId,...this.sorts}
                    })
                    .then((data) => {
                        this.tableRightData.records =  data.data;
                    }).catch((error) => {
                
                    });
                }
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
        /deep/ .mainTable{
            height: 600px;
            overflow: auto;
        }    
    }
   
}
</style>
