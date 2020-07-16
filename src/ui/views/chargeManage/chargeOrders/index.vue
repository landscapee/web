<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/chargeOrderAdd'" :key="$route.path"></router-view>
        <div v-else class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>收费单</span>
                </div>
                <div class='top-right'>
                    <div class="header">机务服务非例行工作结算清单 <span>
                        {{tableData.records.filter(item=>item.approveState==0).length}} 单待审批｜
                        {{tableData.records.filter(item=>item.sendFinance==0).length}} 单待发送</span></div>
                </div>
                <div class="top-toolbar">
                    <div @click='sendFinanceFn'><icon iconClass="add"></icon>发送财务</div>
                    <div @click='exportChargeFn("charge")'><icon iconClass="add" ></icon>导出收费单</div>
                    <div @click='addChargeOrderFn("/chargeOrderAdd","add")'><icon iconClass="add" ></icon>新增</div>
                    <div @click='addChargeOrderFn("/chargeOrderAdd","edit")'><icon iconClass="edit" ></icon>编辑</div>
                    <div @click='removeOrderFn'><icon iconClass="remove" ></icon>删除</div>
                    <div @click='addChargeOrderFn("/chargeOrderAdd","info")'><icon iconClass="info" ></icon>详情</div>
                    <div @click='exportChargeFn("excel")'><icon iconClass="info" ></icon>导出Excel</div>
                    <!-- <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                    <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div> -->
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
                            <el-button @click='revokeFn(row)' v-if='row.sendFinance===1' size='mini' class="copyButton" >撤销</el-button>
                            <el-button @click='approveFn(row,false)' v-else-if='row.sendFinance===0&&row.approveState==1' size='mini' class="copyButton" >不通过</el-button>
                            <el-button @click='approveFn(row,true)' v-else-if='row.sendFinance===0&&row.approveState!=1' size='mini' class="copyButton" >通过</el-button>
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
            selectId: null
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
        revokeFn(row){
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/revoke`, 
                method: 'post',
                data:{
                    id:row.id,
                }
            })
            .then((data) => {
                if(data.code==200&&data.data){
                    console.log(data)
                    this.$message({type: 'success', message: '撤销成功'});
                    this.getList();
                }else{
                    this.$message({type: 'error', message: '撤销失败，请重试'});
                }
            })
        },
        approveFn(row={}, type=false){
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/approve`, 
                method: 'post',
                data:{
                    id:row.id,
                    access:type
                }
            })
            .then((data) => {
                if(data.code==200&&data.data){
                    this.$message({type: 'success', message: '操作成功'});
                    this.getList();
                }else{
                    this.$message({type: 'error', message: '操作失败，请重试'});
                }
            })
        },
        sendFinanceFn(){
            if(!this.selectId){
                this.$message({type: 'warning', message: '请选择一条发送财务'})
                return
            }
            let selectObj = this.tableData.records.find(item=>item.id === this.selectId)
            if(selectObj.approveState !=1){
                this.$message({type: 'warning', message: '审核未通过，不能发送财务'})
                return
            }
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/send`, 
                method: 'post',
                data:{
                    id:this.selectId,
                }
            })
            .then((data) => {
                if(data.code==200 && data.data){
                    this.$message({type: 'success', message: '发送成功'});
                }else{
                    this.$message({type: 'error', message: '发送失败，请重试'});
                }
                this.getList();
                this.selectId = null
            })
        },
        addChargeOrderFn(type, query){
            var pushPath = {
                    path: type,
                    query: {type:query}
                }
            if(query!='add'){
                if(!this.selectId){
                    this.$message({type: 'warning', message: '必须选择一项操作'});
                    return
                }
                Object.assign(pushPath.query,{id: this.selectId})
            }
            this.$router.push(pushPath)
            //{
                //path: type,query: {type:query, id: this.selectObjs[0].id, folderId: this.$route.query.folderId}
                //path: type,
                //query: {type:query, id: this.selectId}
            //}
        },
        exportChargeFn(type){
            let urlObj = {
                charge: {
                    name:'/chargeBillFlxgz/flxgzExport',
                    ext:'zip'
                },
                excel:{
                    name:'/chargeBillFlxgz/excelExport',
                    ext:'xlsx'
                } 
            }
            request({
                // headers: {
                //     //'Content-Type': 'application/vnd.ms-excel',
                // },
                url: `${this.$ip}/mms-charge${urlObj[type]['name']}?ids=${this.selectId}`,
                method: 'get',
                responseType: 'blob',
            }).then((d)=>{
                const content = d
                const blob = new Blob([content]) //,{type:'application/vnd.ms-excel'}
                const fileName = `机务服务非例行工作结算清单.${urlObj[type]['ext']}` 
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                }
            })
        },
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null,
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        removeOrderFn(){
            request({
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/delete/${this.selectId}`, 
                method: 'delete',
            })
            .then((data) => {
                if(data.code==200 && data.data){
                    this.$message({type: 'success', message: '删除成功'});
                }else{
                    this.$message({type: 'error', message: '删除失败，请重试'});
                }
                this.getList();
                this.selectId = null
            })
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
                url:`${this.$ip}/mms-charge/chargeBillFlxgz/list?current=${this.params.current}&size=${this.params.size}`, 
                method: 'post',
                data:{...this.sort,...this.form}
            })
            .then((data) => {
                if(this.params.current==1){
                    this.tableData = {records: data.data.records,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.records,...this.params,total:data.data.total}
                }
                this.selectId = null
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
    .top-right{
        position: absolute;
        left: 30px;
        top: 40px;
        .header{
            font-size:24px;
            span{
                margin-left:40px;
            }
        }
    }
    .main-content{
        /deep/ .mainTable{
            height: 600px;
            overflow: auto;
        }    
    }
}
</style>
