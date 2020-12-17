<template>
    <div class='index'>
         <router-view  v-if="this.$route.path == '/readTrack1'" :key="$route.path"></router-view>
        <div v-else class='QCenterRight G_listOne'>
            <div  >
                <div class='QHead'>学习管理</div>
                <div class="QheadRight">
                    <div @click="readPushFn"><icon iconClass="pushNew" ></icon>阅读推送</div>
                </div>
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
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <el-checkbox :ref="row.id" @click.stop.native  v-model="selectObjs" :label="row">.</el-checkbox>
                        </template>
                    </el-table-column>
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
        <userTree ref="userBox" @onSelected="handleUserSelected" :dataRequire='true'></userTree>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import Icon from '@components/Icon-svg/index';
import { sysParameterTable } from './tableConfig.js';
import SearchTable from '@/ui/components/SearchTable';
import userTree from '@components/userTree/index';
export default {
    components: {
       Icon,
       SearchTable,
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
            selectObjs:[],
            selectedPersonList:[],
            deptList:[],
            users:[],
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
            this.businessTableConfig = sysParameterTable(this.issueDeptArr, this.positionArr,this.fileList)
        })
        // try{
        //     await this.listByCodesFn()
        //     await this.getFileList()
        //     console.log(this.fileList)
        //     this.businessTableConfig = sysParameterTable(this.issueDeptArr, this.positionArr,this.fileList)
        // }catch(err){
        //     throw new Error(err)
        // }
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
                this.selectObjs=[]
                if(this.params.current==1){
                    this.tableData = {records: data.data.records,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.records,...this.params,total:data.data.total}
                }
            })
        },
        requestTable(searchData){
            this.form = searchData
            this.selectObjs=[]
            this.tableData={records:[]}
            this.params.current = 1
            this.$refs.searchTable.$refs.body_table.setCurrentRow()
            this.getList()
        },
        headerSort(column){
            this.sort = {}
            this.sort = {
                order:`${column['property']},${column.order==='desc'?'0':'1'}`
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
                let arr = this.arrRemEleFn(this.selectObjs.map(i=>i.id), row.id)
                this.selectObjs = this.selectObjs.filter(item=>{
                    return arr.includes(item.id)
                })
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
            if(this.selectObjs.length){
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
                ids: this.selectObjs.map(i=>i.id),
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
    watch: {
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
                text-decoration: none;
            }
        }
    }
</style>

