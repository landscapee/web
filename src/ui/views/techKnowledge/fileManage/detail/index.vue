<template>
    <div class='index'>
         <div class='inner'>
            <div class='top_content'>
                <div class='header'><span id='fileName'>工单</span></div>
                <div class="top-toolbar">
                        <div></div>
                    <div class="right-toolbar">
                        <div @click="rightMethods('','download')"><icon iconClass="download3"></icon>下载</div>
                        <div v-if="isZDRole" @click="rightMethods('','move')"><icon iconClass="yidong" ></icon>移动到</div>
                        <div v-if="isZDRole" @click="batchPushFn"><icon iconClass="push" ></icon>批量推送</div>
                        <div v-if="isZDRole" @click="rightMethods('/addFile','add')"><icon iconClass="add"></icon>新增</div>
                        <div v-if="isZDRole" @click="rightMethods('/editFile','edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div v-if="isZDRole" @click="rightMethods('','delete')"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="rightMethods('/infoFile','info')"><icon iconClass="info" ></icon>详情</div>
                     </div>
                </div>
            </div>
             <div class="main-content">
                <SearchTable
                    refTag="searchTable"
                    ref="searchTable"
                    @requestTable="requestTable(arguments[0])"
                    @listenToCheckedChange="listenToCheckedChange(arguments[0])"
                    @headerSort="headerSort(arguments[0])"
                    :data="tableData"
                    :tableConfig="businessTableConfig"
                    :tableRowClassName="tableRowClassName"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"
                >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <el-checkbox :ref="row.id" @click.stop.native  v-model="selectObjs" :label="row"></el-checkbox>
                        </template>
                    </el-table-column>
                    <el-table-column  slot="option" align='center' label="操作" :width="100"  >
                        <template  slot-scope="{ row }">
                            <el-tooltip class="item" effect="dark" :enterable="false" content="历史版本" placement="top">
                                <span @click="toHistoryListFn(row)" class="rowSvg" style="margin-right: 10px">
                                    <icon iconClass="historyNew"></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip  v-if="isZDRole" class="item" effect="dark" :enterable="false" content="阅读推送" placement="top">
                                <span @click="row.open?'':toReadTrackFn(row)"   :class="row.open?'rowSvg rowSvgInfo':'rowSvg'">
                                    <icon iconClass="pushNew"></icon>
                                </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
        <file-move ref="fileMove" @onupdate='fileMoveSuccessFn'></file-move>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
import Icon from '@components/Icon-svg/index';
import { sysParameterTable } from '../tableConfig.js';
import SearchTable from '@/ui/components/SearchTable';
import fileMove from '@/ui/components/fileMove';
export default {
    components: {
       Icon,
       SearchTable,
       fileMove
	},
    data() {
        return {
            businessTableConfig: sysParameterTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            tableData:{records:[]},
            selectObjs:[],
            issueDeptArr:[],
            positionArr:[],
            tableRowClassName:(rowIndex,row)=>{
                if (this.overdue!==-1){
                    let num=60*60*24*1000*this.overdue
                    if (row.endTime&&row.endTime<=new Date().getTime()+num &&row.state!==0) {
                        return 'warning-row';
                    }
                }
                return 'tab-row';
            },
            overdue:-1
        };
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('JSZLZDGLY')
        },
    },
    mounted(){
        // if(!this.$route.query.folderId){
        //     this.$router.push({path:'/fileManage'});
        // }
        this.init()
        this.$nextTick(()=>{
            request({
                url:`${this.$ip}/mms-knowledge/folder/getById/${this.$route.query.folderId}`,
                method: 'get',
            })
            .then((data) => {
                if(data.code==200){
                    document.querySelector(".no-redirect-last").innerHTML = data.data.name
                    document.querySelector("#fileName").innerHTML = data.data.name
                }
            })
        })
        this.getOptions()
        request({
            url:`${this.$ip}/mms-parameter/rest-api/sysParam/query`,
            method: 'post',
            data:{'sysParamCode':'WJGQTJ','current':1,'size':15}
        }).then(d => {
            this.overdue=d.data.items[0].sysParamValue;
        });
    },
    methods:{
        getOptions(){
             let position=new Promise((resolve,reject)=>{
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    data:[ "position",]
                }).then(d => {
                    if(d.code == 200){
                         this.positionArr = d.data.position
                        resolve(this.positionArr)
                    }
                    reject()
                }).catch(()=>{
                    reject()
                })
            })
            let airline=new Promise(((resolve,reject) => {
                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=Airline`,
                    method: 'get',
                }).then(d => {
                    let Airline=[]
                    if( d.data&&d.data.length){
                        d.data.map((k,l)=>{
                            if(!k.parentCode){
                                 Airline.push(k)
                            }
                        })
                        resolve(Airline)
                    }
                    reject()
                }).catch(()=>{
                    reject()
                });
            }))
            Promise.all([airline,position]).then((d)=>{
                this.businessTableConfig = sysParameterTable(d[0],d[1])
            }).catch(()=>{
                this.businessTableConfig = sysParameterTable([],[])
            })
        },
        init(){
            this.getList()
        },
        rightMethods(type,query){
            if(query!='add'){
                if(this.selectObjs.length==1){
                    if(query === 'delete'){
                        this.deleteConfirmFn()
                    }else if(query === 'move'){
                        this.fileMoveFn()
                    }else if(query==='download'){
                        this.fileDownloadFn()
                    } else{
                        this.$router.push({path: type,query: { id: this.selectObjs[0].id, folderId: this.$route.query.folderId}})
                    }
                }else if(this.selectObjs.length>1){
                    this.$message({
                        showClose: true,
                        message: '只能选择一个文件操作',
                        type: 'warning'
                    });
                    return
                }else if(this.selectObjs.length==0){
                    this.$message({
                        showClose: true,
                        message: '必须选择一个文件操作',
                        type: 'warning'
                    });
                    return
                }
            }else{
                this.$router.push({path:type,query:{  folderId: this.$route.query.folderId}})
            }
        },
        deleteConfirmFn(){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(async () => {
                let res = await this.fileDeleteFn()
                if(res.code == 200 && res.data){
                    this.getList();
                    this.selectObjs = [];
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message({
                        type: 'error',
                        message: '删除失败!'
                    });
                    this.getList();
                    this.selectObjs = [];
                }
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
            return
        },
        fileDeleteFn(){
            let _this = this
            return new Promise((resolve, reject)=>{
                request({
                    url:`${this.$ip}/mms-knowledge/file/delete/${_this.selectObjs[0].id}`,
                    method: 'delete',
                })
                .then((data) => {
                    resolve(data)
                    // this.getList();
                    // this.selectObjs = [];
                    // this.$message({type: 'success',message: '删除成功'});
                })
            })
        },
        fileAddFn(){
            request({
                url:`${this.$ip}/mms-knowledge/file/save`,
                method: 'post',
                data:{

                }
            })
            .then((data) => {
                this.getList();
                this.selectObjs   = [];
                this.$message({type: 'success',message: '删除成功'});
            })
        },
        getList(){
           request({
                url:`${this.$ip}/mms-knowledge/file/list?current=${this.params.current}&size=${this.params.size}`,
                method: 'post',
                data:{
                    folderId: this.$route.query.folderId,
                    //...this.params,
                    ...this.sort,
                    ...this.form
                }
            })
            .then((data) => {
                // order:'number,0' // 0 倒序 1 正序
                console.log(data)
                // this.sort = {
                //     order:`${number},${data.order==='desc'?'0':'1'}`
                // }
                this.selectObjs=[]
                if(this.params.current==1){
                    this.tableData = {records: data.data.records,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.records,...this.params,total:data.data.total}
                }
            })
       },
       requestTable(searchData){
           console.log(searchData)
            this.form = searchData
            if(this.form.sizeQuery){
                this.form.sizeQuery = parseFloat(this.form.sizeQuery)
            }
            this.selectObjs=[]
            this.tableData={records:[]}
            this.params.current = 1
            this.$refs.searchTable.$refs.body_table.setCurrentRow()
            this.getList()
        },
        headerSort(column){
            this.sort = {}
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
            this.$refs.searchTable.$refs.body_table.setCurrentRow()
            this.params.current = 1
            this.getList()
        },
        //表格选中事件
        listenToCheckedChange(row,tag,tableTag){
            // console.log(row)
            // console.log(tag)
            // console.log(tableTag)
            let select = row.selected
            // this.tableData.records.map(r =>{
            //     if(r.selected){
            //         r.selected = false
            //     }
            // })
            row.selected  = !select
            if(row.selected){
                this.selectObjs.push(row)  //row.id
            }else{
                let arr = this.arrRemEleFn(this.selectObjs.map(i=>i.id), row.id)
                this.selectObjs = this.selectObjs.filter(item=>{
                    return arr.includes(item.id)
                })
                //this.selectObjs = null
            }
            this.params.current = 1
            this.$set(this.tableData.records,row.index,row)
        },
        fileMoveFn(){
            this.$refs.fileMove.openFn(this.selectObjs[0].id)
        },
        fileMoveSuccessFn(val){
            this.getList()
        },
        arrRemEleFn(arr, val){
            var index = arr.indexOf(val);
            if (index > -1) {
                arr.splice(index, 1);
            }
            console.log(arr)
            return arr

        },
        // 批量推送
        batchPushFn(){
            if(this.selectObjs.length>0){
                this.$router.push({path: '/batchPush',query: {id: this.selectObjs.map(i=>i.id).join(','), folderId: this.$route.query.folderId}})
            }else{
                this.$message({
                    showClose: true,
                    message: '必须选择文件才能批量推送',
                    type: 'warning'
                });
                return
            }
        },
        fileDownloadFn(){
            let Url = `${this.$ip}/mms-file/get-file-stream-by-file-path/?filePath=${this.selectObjs[0].fileUrl}`
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.href = Url
            a.click()
            document.body.removeChild(a)
            this.getList()
            this.selectObjs=[]
        },
        toHistoryListFn(row){
            this.$router.push({path: '/fileHistory', query: {id:row.id}})
        },
        toReadTrackFn(row){
            this.$router.push({path: '/readTrack', query: {id:row.id}})
        },
        handleSizeChange(size) {
            this.params.current = 1
            this.params.size = size
            this.getList()
		},
		handleCurrentChange(current) {
            this.params.current = current
            this.getList()
		},
            // request({
            //     url:`${this.$ip}/mms-file/get-file-stream-by-file-path/`,
            //     method: 'get',
            //     params:{
            //         filePath:'/M00/00/01/rWQBjl78OA2ABsKmAAApuVAdayM314.jpg'
            //     }
            // })
            // .then((data) => {
            //     console.log(data)
            // })
    },
    watch: {
    },

}
</script>
<style scoped lang="scss">
@import "@/ui/views/basicData/businessData/assets/styles/businessData.scss";
.index{
    .inner{
        .top_content{
            padding-top: 20px;
            position: relative;
            padding-bottom: 20px;
            .header{
                margin: 0 auto;
                margin-bottom: 30px;
                text-align: center;
                font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                font-weight:500;
                color:rgba(34,34,34,1);
                height:24px;
                line-height:24px;
                span{
                    font-size:24px ;
                }
            }
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
                    div{
                        user-select: none;
                        cursor: pointer;
                        display: inline-flex;
                        justify-content: center;
                        align-items: center;
                        height: 32px;
                        line-height: 32px;
                        padding: 7px;
                        border-radius:2px;
                        border:1px solid rgba(208,208,208,1);
                        margin-right: 12px;
                        color: #3D568E;
                        &:last-child{
                            margin-right: 0px;
                        }
                        .svg-icon{
                            height:18px;
                            width:18px;
                            margin-right: 4px;
                            vertical-align: text-top;
                            fill: #3D568E;
                        }
                    }
                }
            }
        }
        .main-content{
            padding: 0px 30px 0px 30px;
            display: flex;
            justify-content: space-between;
            .searchTableWrapper{
                width: 100%;
            }
            /deep/ .mainTable{
                height: 500px;
                overflow: auto;
                .el-checkbox__label{
                    display: none;
                }
                // /deep/ .el-table__body-wrapper{
                //     /deep/ tr:last-child{
                //         td{
                //             border-bottom:0px;
                //         }
                //     }
                // }
            }
        }
    }

}
</style>

