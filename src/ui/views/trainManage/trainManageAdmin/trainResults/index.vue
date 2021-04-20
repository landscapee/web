<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/trainManageAdminResultsAdd'" :key="$route.path"></router-view>

        <div v-else="this.$router.history.current.path == '/trainManageAdminResults'" :key="$route.path" class="QCenterRight G_listOne">
            <div >
                <div class="QHead">
                    员工培训结果
                </div>
                <div class="QheadRight">
                    <div @click="addOrEditOrInfo('info')">
                        <icon iconClass="info" ></icon>详情</div>
                    <div @click="exportExcel">
                        <icon iconClass="export" ></icon>
                        导出Excel
                    </div>
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable scrollHeight="370"  ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>

                    <el-table-column   slot="remark" label="备注" align="center" :width="200"  >
                        <template  slot-scope="scope">
                            <!--style="height:40px;line-height: 26px;text-align: center"-->
                            <div class="divInput">
                                <el-input   @keyup.enter.native="requestTableData(scope.row)" v-model="scope.row.remark" placeholder="请输入"></el-input>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column v-if="isZDRole"  slot="option" label="操作" align="center" :width="100"  >
                        <template  slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :enterable="false" content="培训签到&评价" placement="top">
                                <span @click="SignEvaluation(scope.row)" class="rowSvg" style="margin-right: 10px">
                                    <icon iconClass="evaluate"></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="评价推送上级" placement="top">
                                <span @click="testResults(scope.row)" class="rowSvg">
                                    <icon iconClass="pushNew"></icon>
                                </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
         <SignEvaluation ref="SignEvaluation" @getList="getList"></SignEvaluation>
    </div>
</template>
<script>
     import SignEvaluation from './signEvaluation'
 import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { trainAdminResultsConfig } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map,get} from 'lodash';
export default {
    components: {
        Icon, SearchTable,SignEvaluation,
	},
    name: '',
    data() {
        return {
            tableData:{records:[ ]},
            tableConfig:trainAdminResultsConfig({},{}),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            row:{},
            visible:false,
            sort:{},
            selectId:null,
        };
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('PXKHZDGLY')
        },
    },
   created() {
        if(this.$router.history.current.path == '/trainManageAdminResults'){
            this.$route.meta.paramsId={id:this.$route.query.id}

            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['trainType']
            }).then(d => {
                let obj=d.data
               let arr =trainAdminResultsConfig( obj)
                if(!this.isZDRole){
                   arr.splice(arr.length-1,1)
                }
                this.tableConfig=arr
            });
            this.getList();
        }



    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {

        requestTableData( row){
            request({
                url:`${this.$ip}/mms-training/trainingResult/remark` ,
                method: 'get',
                params:{
                    id:row.id,
                    remark:row.remark,
                }
             }).then((d) => {
                if(d.code==200){
                    this.getList();
                    this.$message({type: 'success',message: '修改成功'});
                }
            })
        },  testResults( row){
            request({
                url:`${this.$ip}/mms-training/trainingResult/sendAppraise/${row.id}` ,
                method: 'get',
             }).then((d) => {
                if(d.code==200){
                    this.getList();
                    this.$message({type: 'success',message: '推送成功'});
                }
            })
        },
        SignEvaluation(row){
            this.$refs.SignEvaluation.open(row)
        },

        exportExcel(){
            if(this.tableData.records.length){
            request({
                'Content-Type':'application/vnd.ms-excel',
                // 'Content-Type':'application/octet-stream;charset=utf-8',
                url: `${this.$ip}/mms-training/trainingResult/exportByTrainingId/${this.$route.query.id}`,
                method: 'get',
                responseType: 'blob',
            }).then((d)=>{
                const content = d
                const blob = new Blob([content],{type:'application/vnd.ms-excel'})
                console.log(blob);
                const fileName = `${this.tableData.records[0].trainingName }员工培训结果`
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                }else { // IE10+下载
                    navigator.msSaveBlob(blob, fileName)
                }
            })
            }else {
                this.$message.info('暂无数据')
            }
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
                this.$router.push({path:'/trainManageAdminResultsAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/trainManageAdminResultsAdd',query:{type:tag,id:this.selectId}});
                }
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
               url:`${this.$ip}/mms-training/trainingResult/manager/list`,
               method: 'post',
               data:{...this.sort,...data,trainingId:this.$route.query.id},
               params:{...this.params,}
            })
            .then((d) => {
                 this.tableData = extend({},
                    {...d.data}
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


</style>
