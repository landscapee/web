<template>
    <div>
         <router-view v-if="this.$router.history.current.path == '/safetyInformationAdd'" :key="$route.path"></router-view>
        <div v-else-if="this.$router.history.current.path == '/safetyInformationIndex'" :key="$route.path" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    安全信息
                </div>
                <div class="QheadRight">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div @click="exportExcel"><icon iconClass="export" ></icon> 导出</div>
                    <div @click="upDocInfo('info')"><icon iconClass="upload" ></icon>安全信息上传</div>

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
                    <el-table-column :show-overflow-tooltip="true" slot="remark" label="备注" :width="190" fixed="right">
                        <template  slot-scope="{ row }">
                            <span>{{row.remark}}</span>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
        <UpDocInfo ref="UpDocInfo" @getTableData="getList1"></UpDocInfo>

    </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { sadetyInfoConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
import UpDocInfo from '../components/uploadDocInfo'

export default {
    components: {
        UpDocInfo,
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:sadetyInfoConfig({}),
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
       request({
           url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
           method: 'post',
           data:["Q_BadMistake", "Q_securityServices",]
       }).then(d => {
           let obj=d.data
           this.tableConfig=sadetyInfoConfig(obj)

       });
    },
    watch:{

    },
    methods: {
        upDocInfo(){
            this.$refs.UpDocInfo.open({api:'mms-qualification/securityInformation/uploadExcel',title:'安全信息上传'})
        },
        getList1(){
            this.row={}
            this.selectId=null
            this.form={}
            this.getList()
        },
        exportExcel(){
            request({
                'Content-Type':'application/vnd.ms-excel',
                // 'Content-Type':'application/octet-stream;charset=utf-8',
                url: `${this.$ip}/mms-qualification/download/securityInformation`,
                method: 'get',
                responseType: 'blob',
                params:{startTime:this.form.startTime,endTime:this.form.endTime }
            }).then((d)=>{
                const content = d

                const blob = new Blob([content],{type:'application/vnd.ms-excel'})
                const fileName = '安全信息'
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
                this.$router.push({path:'/safetyInformationAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/safetyInformationAdd',query:{type:tag,id:this.row.id}});
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
    margin-top:14px;
    
}
/deep/ .mainTable{
    height:calc(100vh - 240px);
    /*overflow: auto;*/
}
</style>
