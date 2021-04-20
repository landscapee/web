<template>
    <div class='index'>
        <!-- <router-view v-else v-if="this.$router.history.current.path == '/addFile'" :key="$route.path"></router-view> -->
        <div class='QCenterRight G_listOne'>
            <div  >
                <div class='QHead'>工单变更审核</div>

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
                    <el-table-column v-if="isZDRole" slot="option" align='center' label="操作" :width="150"  >
                        <template  slot-scope="{ row }"> <!--||row.state==2--> <!--row.state==1-->
                            <el-tooltip class="item" effect="dark" :enterable="false" content="通过" placement="top">
                                 <span @click="toPassFn(row)" v-show='row.state===0' class="rowSvg" style="margin-right: 10px">
                                        <icon iconClass="pass"  ></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="拒绝" placement="top">
                                <span @click="torefuseFn(row)" v-show='row.state===0' class="rowSvg">
                                    <icon iconClass="nopass"  ></icon>
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
import { sysParameterTable } from './tableConfig.js';
import SearchTable from '@/ui/components/SearchTable';
export default {
    components: {
       Icon,
       SearchTable,
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
            positionArr:[]
        };
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('GDGLZDGLY')
        },
    },
    mounted(){

        if(!this.isZDRole){
            let arr=sysParameterTable()
            arr.splice(arr.length-1,1)
            this.businessTableConfig=arr
        }
        this.init()
    },
    methods:{
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
                    }
                    else{
                        this.$router.push({path: type,query: {type:query, id: this.selectObjs[0].id, folderId: this.$route.query.folderId}})
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
                this.$router.push({path:type,query:{type:query, folderId: this.$route.query.folderId}})
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
        getList(){
            request({
                url:`${this.$ip}/mms-workorder/changeReport/list?current=${this.params.current}&size=${this.params.size}`,
                method: 'post',
                data:{
                    ...this.sort,
                    ...this.form
                }
            })
            .then((data) => {
                // order:'number,0' // 0 倒序 1 正序
                // this.sort = {
                //     order:`${number},${data.order==='desc'?'0':'1'}`
                // }
                console.log(data)
                if(this.params.current==1){
                    this.tableData = {records: data.data.records,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.records,...this.params,total:data.data.total}
                }
            })
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
            console.log(column)
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

        },
        fileMoveFn(){
            this.$refs.fileMove.openFn(this.selectObjs[0].id)
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
        async toPassFn(row){
            let data = await this.auditFn(row, 1)
            this.getList()
        },
        async torefuseFn(row){
            let data = await this.auditFn(row, 2)
            this.getList()
        },
        auditFn(row, state){
            return new Promise((resolve,reject)=>{
                request({
                    url:`${this.$ip}/mms-workorder/changeReport/audit`,
                    method: 'get',
                    params:{
                        id:row.id,
                        state
                    }
                })
                .then((data) => {
                    if(data.code==200){
                        this.$message({
                            message: '操作成功',
                            type: 'success'
                        });
                    }

                    resolve(data)
                })
            })
        },
        handleSizeChange(size) {
            this.params.current = 1
            this.params.size = size
            this.getList()
		},
		handleCurrentChange(current) {
            this.params.current = current
            this.getList()
		}
    },
    watch: {
    },

}
</script>
<style scoped lang="scss">

</style>

