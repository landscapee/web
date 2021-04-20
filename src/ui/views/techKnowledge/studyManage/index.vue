<template>
    <div class='index'>
         <router-view  v-if="this.$route.path == '/readTrack1'" :key="$route.path"></router-view>
        <div v-else class='QCenterRight G_listOne'>
            <div  >
                <div class='QHead'>学习管理</div>
                <div class="QheadRight">

                    <div v-if="isZDRole" @click="readPushFn"><icon iconClass="pushNew" ></icon>阅读推送</div>
                    <div  @click="exportZip"  ><icon iconClass="export"></icon>完成情况</div>
                    <div  @click="exportWord"  ><icon iconClass="export"></icon>学习记录</div>
                </div>
            </div>
             <div class="tableOneBox">
                <SearchTable
                    refTag="searchTable"
                    ref="searchTable"
                    @selectCheckBox="selectCheckBox"
                    @requestTable="requestTable(arguments[0])"
                    @listenToCheckedChange="listenToCheckedChange"
                    @headerSort="headerSort(arguments[0])"
                    :data="tableData"
                    :tableConfig="businessTableConfig"
                    @handleSizeChange="handleSizeChange"
                    @handleCurrentChange="handleCurrentChange"
                >

                    <el-table-column slot="downloadRate" label="下载率"  align="center">
                        <span slot-scope="{ row }"  class="spanA">
                              <a href="#" @click="tosee(row)">{{row.downloadRate?row.downloadRate+'%':'0%'}}</a>
                        </span>
                    </el-table-column>
                    <el-table-column slot="readingRate" label="阅读率"  align="center" >
                        <span slot-scope="{ row }" class="spanA">
                            <a href="#" @click="tosee(row)">{{row.readingRate?row.readingRate+'%':'0%'}}</a>
                         </span>
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
        <StudyLog ref="StudyLog"></StudyLog>
        <userTree ref="userBox" @onSelected="handleUserSelected" :dataRequire='true'></userTree>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import Icon from '@components/Icon-svg/index';
import { sysParameterTable } from './tableConfig.js';
import SearchTable from '@/ui/components/SearchTable';
import userTree from '@components/userTree/index';
import StudyLog from './exportStudyLog'
export default {
    components: {
       Icon,
       SearchTable,StudyLog,
       userTree
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
            checkArr:[],
            selectedPersonList:[],
            deptList:[],
            users:[],
            fileList:[],
            issueDeptArr:[],
            positionArr:[]
        };
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('JSZLZDGLY')
        },
    },
    mounted(){

        this.init()
        Promise.all([this.listByCodesFn(),this.getFileList()]).then(res=>{
            console.log(res)
            this.businessTableConfig = sysParameterTable(this.issueDeptArr, this.positionArr,this.fileList)
        })

    },
    methods:{
        tosee(row){
            this.$router.push({path:'/readTrack1', query: {id:row.id}})

        },
        init(){
            this.getList()
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
                 if(this.params.current==1){
                    this.tableData = {records: data.data.records,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.records,...this.params,total:data.data.total}
                }
            })
        },
        exportZip(){
            if(!this.checkArr.length){
                this.$message.warning('请至少选中一行数据')
                return
            }
            let ids=this.checkArr.map((k,l)=>{
                return k.id
            })
            let obj={
                 ids:ids.join(',')
            }

            request({
                header:{
                    'Content-Type':'multipart/form-data'
                },
                url:`${this.$ip}/mms-knowledge/fileStudy/completeExport`,
                method: 'get',
                params:obj,
                responseType: 'blob'
            }).then(d => {
                let arr=[]
                if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                    arr=d.headers['content-disposition'].split('=')[1].split('.')
                }
                let content = d;
                let geshi=this.checkArr.length>1?'application/zip':'application/vnd.ms-excel'
                let blob = new Blob([content],{type:geshi})
                let filenames=arr.length>2?arr[0]+arr[1]:arr[0]
                if(this.checkArr.length>1){
                    filenames='学习完成情况'
                }
                const fileName = `${decodeURI(filenames)}`
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
        exportWord(){
            this.$refs.StudyLog.open()

        },
        requestTable(searchData){
            this.form = searchData
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

        selectCheckBox(list=[]) {
            this.checkArr = list
            console.log('se',this.checkArr,list);
        },
        listenToCheckedChange(row, list=[]) {
             this.checkArr = list
            console.log('s',this.checkArr,list);

        },
        arrRemEleFn(arr, val){
            var index = arr.indexOf(val);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr
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
        handleUserSelected(selectedPersonList,deptList){
            this.selectedPersonList = selectedPersonList
            this.deptList = deptList
            this.pushBatchFn()
        },
        readPushFn( ){
            console.log(this.checkArr);
            if(this.checkArr.length){
                this.$refs.userBox.open(this.users, '选择推送对象', true);
            }else{
                this.$message({
                    showClose: true,
                    message: '必须选择文件进行操作',
                    type: 'warning'
                });
                return
            }
        },
        pushBatchFn(){
            let data
            let select = this.selectedPersonList.map(item=>{
                return {
                    userId:item.id,
                    userName:item.name
                }
            })
            data = {
                ids: this.checkArr.map(i=>i.id),
                userVOList: select
            }
            request({
                url:`${this.$ip}/mms-knowledge/file/pushBatch`,
                method: 'post',
                data:data
            })
            .then((data) => {
                if(data.code==200){
                    this.$message.success("推送成功！");
                    this.init()
               } // else{
                //     this.$message({
                //         showClose: true,
                //         message: '推送失败',
                //         type: 'error'
                //     });
                //     return
                // }
            })
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


}
</script>
<style scoped lang="scss">
    /deep/ .mainTable {
        .el-checkbox__label {
            display: none;
        }
        .spanA{
            a{
                color:#3888ff;
                 text-decoration: none;
            }
        }
    }
</style>

