<template>
    <div>
        <div class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>收费单</span>
                </div>
                <div class="top-toolbar">
                    <div><icon iconClass="add" ></icon>发送财务</div>
                    <div><icon iconClass="add" ></icon>导出收费单</div>
                    <div><icon iconClass="add" ></icon>新增</div>
                    <div><icon iconClass="edit" ></icon>编辑</div>
                    <div><icon iconClass="remove" ></icon>删除</div>
                    <div><icon iconClass="info" ></icon>详情</div>
                    <div><icon iconClass="info" ></icon>导出Excel</div>
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
                     <el-table-column slot="option" align='center' label="操作" :width="230">
                        <template  slot-scope="{ row }">
                            <el-button size='mini' class="copyButton" >通过</el-button>
                            <el-button size='mini' class="copyButton" >不通过</el-button>
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
import { sysParameterTable } from '../tableConfig.js';
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
            tableConfig:sysParameterTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            selectId:null
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
                this.$router.push({path:'/addSysParameter',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/addSysParameter',query:{type:tag,id:this.selectId}});
                }
            }
        },
        delData(){
            if(this.selectId!=null){
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
                        this.selectId = null;
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
            }else{
                this.$message.error('请先选中一行数据');
            }
        },
        getList(){
           request({  
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/list`, 
                method: 'post',
                data:{...this.params,...this.sort,...this.form}
            })
            .then((data) => {
                if(this.params.current==1){
                    this.tableData = {records: data.data.records,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.records,...this.params,total:data.data.total}
                }
                console.log(this.tableData)
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
    .main-content{
        /deep/ .mainTable{
            height: 600px;
            overflow: auto;
        }    
    }
}
</style>
