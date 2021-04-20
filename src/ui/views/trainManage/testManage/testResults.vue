<template>
    <div>

        <router-view v-if="this.$route.path == '/testManagePushStaff'" :key="$route.path"></router-view>
        <div v-else-if="this.$route.path == '/testManageResults'" :key="$route.path" class="QCenterRight G_listOne">
            <div >
                <div class="QHead">
                    员工考试结果
                </div>
                <div class="QheadRight">
                    <div @click="exportExcel">
                        <icon iconClass="export" ></icon>
                        导出Excel
                    </div>
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
                    <el-table-column   slot="employeeFileId" label="试卷名称"   >
                        <template  slot-scope="scope">
                            <div @click="upload(scope.row)" class="G_cursor" style="color:#0a76a4;text-align: center">
                                附件
                                <a href="" ref="aA"></a>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column  v-if="isZDRole" slot="option" label="操作" :width="150" align='center' >
                        <template  slot-scope="scope">
                            <el-tooltip class="item" effect="dark" :enterable="false" content="分数录入" placement="top">
                                <span @click="!scope.row.employeeFileId?'':scoreEntry(scope.row)" :class="!scope.row.employeeFileId?'rowSvg rowSvgInfo':'rowSvg'">
                                    <icon iconClass="score"></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="考试结果推送" placement="top">
                                <span @click="testResults('/testManagePushStaff',scope.row)" class="rowSvg" style="margin:0 10px">
                                    <icon iconClass="push"></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="纸质试卷归档上传" placement="top">
                                <span @click="uploadTest( scope.row)" class="rowSvg">
                                    <icon iconClass="uploadingNew"></icon>
                                </span>
                            </el-tooltip>

                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
        <SeeImg ref="SeeImg"></SeeImg>
        <UploadTest ref="UploadTest" @getList="getList"></UploadTest>
        <ScoreEntry ref="ScoreEntry" @getList="getList"></ScoreEntry>
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
            tableData:{records:[ ]},
            tableConfig:testRuConfig({},{}),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            row:{},
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
       request({
           url:`${this.$ip}/mms-training/paperInfo/list`,
           method: 'post',
           data:{},
           params:{size:10000,current:1}
       }).then((data) => {
           request({
               url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
               method: 'post',
               params:{delete:false},
               data:["testType", "testCategory1","zizhiType",'businessType','testState' ]
           }).then(d => {
               let obj=d.data
               let arr=testRuConfig(data.data.records||[],obj)
               if(!this.isZDRole){
                  arr.splice(arr.length-1,1)
               }
               this.tableConfig =arr
           });
       })

       this.getList();
    },

    methods: {
        upload(row){
            if(row.employeeFileId){
                request({
                    // application/x-www-form-urlencoded
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-file/get-file-by-id/${row.employeeFileId }`,
                    method:'GET',

                }).then((d) => {
                    this.$refs.SeeImg.open(d.data,'纸制试卷查看')
                });
            }else {
                this.$message.info('暂无附件')
            }

        },
        testResults(path,row){
            request({
                url:`${this.$ip}/mms-training/examResult/send` ,
                method: 'post',
                data:{employeeId:row.employeeId,examId:row.examId,employeeName:row.employeeName}
            }).then((d) => {
                if(d.code==200){}
                    this.getList();
                    this.$message({type: 'success',message: '推送成功'});
                })
        },
        scoreEntry(row){

            this.$refs.ScoreEntry.open(row)
        },
        uploadTest(row){
             this.$refs.UploadTest.open(row.id)
        },

        exportExcel(){
            request({
                header:{
                    'Content-Type':'multipart/form-data'
                },
                url:`${this.$ip}/mms-training/examResult/exportByExamId/${this.$route.query.id}`,
                method: 'get',
                 responseType: 'blob'
            }).then(d => {
                let arr=[]
                if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                    arr=d.headers['content-disposition'].split('=')[1].split('.')
                }
                  let content = d;
                let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                const fileName = `${decodeURI(arr[0])}`
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
            });

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

        getList(){
            let data={...this.form}
            map(data,((k,l)=>{
                if(!k){
                    data[l]=null
                }
            }))
           request({
                url:`${this.$ip}/mms-training/examResult/list`,
                 method: 'post',
                data:{...this.sort,...data,examId:this.$route.query.id},
               params:{...this.params,}
            })
            .then((d) => {
                request({
                    url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                    method: "get",
                }).then(d1 => {
                    d.data.records= d.data.records.map((k,l)=>{
                        return {...d1.data,...k}
                    })
                    this.tableData = extend({},
                        {...d.data}
                    );
                    console.log(this.tableData,1,1);
                })

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
