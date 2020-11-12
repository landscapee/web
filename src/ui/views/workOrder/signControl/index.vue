<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/WorkAbnormalDetails'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$router.history.current.path == '/WorkPaperDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/WorkAbnormalAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/signControlAdd'" :key="$route.path"></router-view>
         <div v-else-if="this.$router.history.current.path == '/signControl'" :key="$route.path" class="signControl">
            <div class="top-content">
                <div class="top-content-title">
                    <span>工单完工签署</span>
                </div>
                <div class="top-toolbar">
                    <div  @click="seeOther(null,'WorkAbnormalAdd')"> <icon iconClass="#" style="width: 0;" ></icon>纸制填报工单导入</div>
<!--                    <div @click="abnormalChange( )"><icon iconClass="edit" ></icon>异常更改</div>-->
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" style="margin-right:0"></icon>详情</div>
                    <div @click="Export()"><icon iconClass="export" ></icon>导出Excel</div>
                    <div @click="moreExport()"><icon iconClass="export" ></icon>批量导出</div>
                 </div>
            </div>
            <div class="main-content">
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="checkbox" align="center" label="选择" :width="49"   >
                        <template slot-scope="scope">
                            <el-checkbox :ref="scope.row.id" @click.stop.native  v-model="checkArr" :label="scope.row" value="dasdasd"> </el-checkbox>
                        </template>
                    </el-table-column>
                     <el-table-column align="center" slot="option" label="操作" :width="80" >
                        <template  slot-scope="scope">
                            <div >
                                <span v-if="scope.row.offlineFile" @click="Download(scope.row)" class="rowSvg">
                                    <icon iconClass="downloadNew" title="下载"></icon>
                                </span>
                                <span v-else @click="scope.row.state!==3?'':exportRow(scope.row)" :class="scope.row.state!==3?'rowSvg rowSvgInfo':'rowSvg'">
                                    <icon iconClass="exportNew" title="导出"></icon>
                                </span>
                                <span v-if="scope.row.state===3 && scope.row.isOffline==='线上' && scope.row.template.type==='WXGD'"
                                      @click="unlock(scope.row)" class="rowSvg" style="margin-left: 10px">
                                    <icon iconClass="unlock" title="解锁"></icon>
                                </span>
                                <span v-if="(scope.row.template.type!=='WXGD') || (scope.row.isOffline==='线下')"
                                      @click="isLineWX(scope)  ? '':abnormalChange(scope.row)"
                                      :class="isLineWX(scope) ? 'rowSvg rowSvgInfo':'rowSvg'"
                                      style="margin-left: 10px">
                                    <icon iconClass="editNew" title="异常更改"></icon>
                                </span>
                            </div>
                         </template>
                    </el-table-column>

                </SearchTable>
                <Download ref="Download"></Download>
                <MoreExport ref="MoreExport"></MoreExport>
                <Export ref="Export"></Export>
            </div>
        </div>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { Config } from './tableConfig.js';
    import Export from './export';
    import MoreExport from './moreExport';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,MoreExport,Export
        },
        name: 'authorizeManage',
        computed:{
          isLineWX(){
              return (scope)=>{
                  return scope.row.state!==3 && scope.row.template.type!=='WXGD' &&scope.row.isOffline==='线上'
              }
          }
        },
        data() {
            return {
                tableData:{records:[]},
                tableConfig:Config({}),
                params:{
                    current: 1,
                    size: 15,
                },

                checkArr:[],
                form:{},
                row:{},
                sort:{},
                selectId:null
            };
        },
        created() {
             if(this.$router.history.current.path == '/signControl'){
                this.getList();
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["worldorderType",'W_flightType','W_workType','applyETOP','workUserType',]
                }).then(d => {
                    let obj=d.data
                    this.tableConfig=Config(obj,[],[],[],[])
                });
               }
        },

        methods: {
            Download(row){
                request({
                    'Content-Type':'application/x-www-form-urlencoded',
                    url:`${this.$ip}/mms-file/get-files-by-ids/`,
                    method: 'post',
                     params:{fileIds:row.offlineFile}
                }).then(d => {
                    if(d.code==200){
                        this.$refs.Download.open(d.data)
                    }
                });
            },
            moreExport(){
                if(this.checkArr.length){
                    let arr=this.checkArr.filter((k,l)=>{
                        return !k.offlineFile&&k.state==3
                    })
                    if(arr.length){
                        this.$refs.MoreExport.open(arr)
                    }else{
                        this.$message.error('请选中至少一行已完成的线上工单');
                    }
                }else {
                    this.$message.error('请先选中一行或多行数据');
                }
            },
            Export(){
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-workorder/workorder/exportExcel`,
                    method: 'post',
                    data:{},
                    responseType: 'blob'
                }).then(d => {
                     let arr=['工单','xlsx']
                    if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                        arr=d.headers['content-disposition'].split('=')[1].split('.')
                    }
                     let content = d;
                     let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                    // let blob = new Blob([content],{type:'application/msword'})
                    const fileName = `${decodeURI(arr[0])}` + '.' + arr[1]
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
            exportRow(row){

                this.$refs.Export.open(row)
            },
            seeOther(row,path){
                let src=path
                let data=row&&row.id
                if(row&&row.offlineFile){
                    src='/WorkPaperDetails'
                    data=row.offlineFile
                }
                this.$router.push({path:src,query:{type:'add', id:data}});

            },
            requestTable(searchData){
                this.form = searchData;
                this.selectId=null;
                this.tableData={records:[]};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.checkArr=[]
                this.getList();
            },
            headerSort(column){
                this.sort = {}
                let num = null
                if (column.order == 'desc') {
                    num = 0
                } else if (column.order == 'asc') {
                    num = 1
                } else {
                    num = 2
                }
                if (num != 2) {
                    this.sort['order'] = column.property + ',' + num;
                }
                this.checkArr=[]
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.params.current = 1;
                // console.log(column.property,column.order, this.sort,11);
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
                let numIndex =this.checkArr.findIndex((k,l)=>k.id==row.id)
                if(numIndex>-1){
                    this.checkArr.splice(numIndex,1)
                }else{
                    this.checkArr.push(row)
                }
                if(row.selected ){
                    this.row = row;
                    this.selectId = row.id;
                }else {
                    this.selectId   = null;
                    this.row = null;

                }
                  this.$set(this.tableData.records,row.index,row);
            },
            addOrEditOrInfo(tag){
                if(this.checkArr.length!=1){
                    let s= this.checkArr.length>0?'只能选中一行数据':'请先选中一行数据'
                    this.$message.error(s);
                }else{
                    let src='/WorkAbnormalDetails'

                    let data=this.checkArr[0].id
                    if(this.checkArr[0]&&this.checkArr[0].offlineFile){
                        src='/WorkAbnormalAdd'
                    }
                    this.$router.push({path:src,query:{ id:data,type:'info'}});
                 }
            },
            unlock(row){
                this.$confirm('是否确认将此维修工单异常更改解锁?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                    request({
                        url: `${this.$ip}/mms-workorder/workorder/unlock`,
                        method: 'get',
                        params:{id:row.id}
                    }).then((d) => {
                        if (d.code === 200) {
                            this.getList();
                            this.$message({type: 'success', message: '解锁成功'});
                        }
                    })
                });
            },
            abnormalChange(row){
                if(row.state===3){
                    let src='/WorkAbnormalDetails';
                    let data=row.id;
                    if(row.offlineFile){
                        src='/WorkAbnormalAdd'
                    }
                    localStorage.setItem('refresh','true')
                    this.$router.push({path:src,query:{ id:data,type:'edit'}});

                }else{
                    this.$message.error('请先完成工单');
                }
            },

            getList(){
                this.checkArr=[]
                let data={...this.form}
                map(data,((k,l)=>{
                    if(k!==0 && !k){
                        data[l]=null
                    }
                    if(l=='state'&&k){
                        data[l]= Number(k)
                     }
                }))
                request({
                    url:`${this.$ip}/mms-workorder/workorder/list`,
                    method: 'post',
                    data:{...this.sort,...data},
                    params:{...this.params,}
                })
                    .then((data) => {
                        this.tableData = extend({}, {...data.data});
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
    .signControl{
        margin-top:14px;
        /deep/ .mainTable{
            height:calc(100vh - 370px);
            .el-checkbox__label{
                display: none;
            }
        }
       /deep/ .cell> div{
            line-height: 20px!important;
        }
    }

</style>
