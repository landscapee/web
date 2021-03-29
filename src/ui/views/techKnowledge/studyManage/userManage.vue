<template>
    <div class='index'>
        <!-- <router-view v-else v-if="this.$router.history.current.path == '/addFile'" :key="$route.path"></router-view> -->
        <div class='QCenterRight G_listOne'>
            <div  >
                <div class='QHead'>个人管理</div>

            </div>
            <div class="top-left-toolbar">
                <span :class="isActive==index?'isActive':''" @click="switchTable(index)" v-for="(name,index) in ['推送文件','公开文件']" :key="index">{{name}}</span>
            </div>
             <div class="tableOneBox">
                <SearchTable
                    refTag="searchTable"
                    ref="searchTable"
                    @requestTable="requestTable(arguments[0])"
                    @listenToCheckedChange="listenToCheckedChange(arguments[0])"
                    @headerSort="headerSort(arguments[0])"
                    :data="tableData"
                    :tableConfig="businessTableConfig"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"
                >
                <el-table-column slot="option" align='center' label="操作" :width="100"  >
                        <template  slot-scope="{ row }">
                            <el-tooltip class="item" effect="dark" :enterable="false" content="下载" placement="top">
                             <span @click="toDownloadFn(row)" class="rowSvg" style="margin-right: 10px">
                                <icon iconClass="downloadNew"  ></icon>
                            </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="完成阅读" placement="top">
                             <span @click="toCompleteFn(row)" class="rowSvg" :style="row.read===1?'':'visibility: hidden'">
                                <icon iconClass="finishRead"  ></icon>
                            </span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import Icon from '@components/Icon-svg/index';
import { userParameterTable } from './tableConfig.js';
import SearchTable from '@/ui/components/SearchTable';
export default {
    components: {
       Icon,
       SearchTable,
	},
    data() {
        return {
            isActive:0,
            businessTableConfig: userParameterTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            tableData:{records:[]},
            selectObjs:[],
            fileList:[],
            issueDeptArr:[],
            positionArr:[]
        };
    },
    mounted(){
        // if(!this.$route.query.folderId){
        //     this.$router.push({path:'/fileManage'});
        // }
        this.init()
        Promise.all([this.listByCodesFn(),this.getFileList()]).then(res=>{
            console.log(res)
            this.businessTableConfig = userParameterTable(this.issueDeptArr, this.positionArr,this.fileList)
        })
    },
    methods:{
        switchTable(index){
            this.isActive = index;
            this.tableData = {records:[]};
            this.params.current = 1;
            this.getList();
        },
        init(){
            this.getList()
        },
        getList(){
            request({
                url:`${this.$ip}/mms-knowledge/fileStudy/userStudyList?current=${this.params.current}&size=${this.params.size}`,
                method: 'post',
                data:{
                    open: !!this.isActive,
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
        async toDownloadFn(row){
            let Url = `${this.$ip}/mms-file/get-file-stream-by-file-path/?filePath=${row.fileUrl}`
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.href = Url
            a.click()
            document.body.removeChild(a)

            this.selectObjs=[]
            await this.toDownloadRecodeFn(row)
            this.getList()
        },
        toDownloadRecodeFn(row){
            return new Promise((resolve,reject) => {
                request({
                    url:`${this.$ip}/mms-knowledge/fileStudy/download/${row.id}`,
                    method: 'get'
                })
                .then((data) => {resolve()})
            })
        },
        toCompleteFn(row){
            request({
                url:`${this.$ip}/mms-knowledge/fileStudy/completeRead/${row.id}`,
                method: 'get'
            })
            .then((data) => {
                if(data.code==200&&data.data){
                    this.$message.success("操作成功！")
                }else{
                    this.$message({
                        showClose: true,
                        message: '操作失败',
                        type: 'error'
                    });
                    return
                }
                this.getList()
            })
        },
        requestTable(searchData){
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
            console.log(column)
            this.sort = {
                order:`${column['property']}`,
                orderBy:`${column.order}`
            }
            //this.sort[column.property] = column.order
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
                this.arrRemEleFn(this.selectObjs.map(i=>i.id), row.id)
                //this.selectObjs = null
            }
            this.params.current = 1
            this.$set(this.tableData.records,row.index,row)
        },
         arrRemEleFn(arr, val){
            var index = arr.indexOf(val);
            if (index > -1) {
                arr.splice(index, 1);
            }
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
        listByCodesFn(){
            return new Promise((resolve, reject)=>{
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    data:["issueDept", "position",]
                }).then(d => {
                    if(d.code == 200){
                        this.issueDeptArr = d.data.issueDept
                        this.positionArr = d.data.position
                    }else{
                        this.issueDeptArr = []
                        this.positionArr = []
                    }
                    resolve()
                    // this.businessTableConfig = sysParameterTable(this.issueDeptArr, this.positionArr)
                })
            })
        },
        getFileList(){
            return new Promise((resolve,reject)=>{
                request({
                    url:`${this.$ip}/mms-knowledge/folder/folderNameList`,
                    method: 'post',
                })
                .then((data) => {
                    if(data.code==200){
                        this.fileList = data.data
                        this.fileList = this.fileList.map((item,index)=>{
                            return {
                                index: index,
                                label: item.name,
                                id: item.id,
                            }
                        })
                    }else{
                        this.fileList = []
                    }
                    resolve()
                })
            })
        },
    },
    watch: {
    },

}
</script>
<style scoped lang="scss">
    .G_listOne{
        /deep/ .mainTable{
            height:calc(100vh - 370px) !important;
        }
    }


    .top-left-toolbar{
        .isActive{
            color: #fff;
            background-color: #3280e7;
        }
        span{
            display: inline-block;
            padding: 0px 10px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #3280e7;
            background-color: #fff;
            cursor: pointer;
        }
        span:first-child{
            border-radius: 3px 0 0 3px;
            border: solid 1px #3280e7;
        }
        span:last-child{
            border-radius: 0 3px 3px 0;
            border: solid 1px #3280e7;
        }
    }
 </style>

