<template>
    <div class='index'>
        <!-- <router-view v-else v-if="this.$router.history.current.path == '/addFile'" :key="$route.path"></router-view> -->
        <div class='inner'>
            <div class='top_content'>
                <div class='header'><span>学习管理</span></div>
                <div class="top-toolbar">
                    <div class="left-toolbar">
                        <!-- <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                        <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                        <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                        <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div> -->
                    </div>
                    <div class="right-toolbar">
                        <div @click="readPushFn">阅读推送</div>
                        <!-- <div @click="rightMethods"><icon iconClass="reset" ></icon>导出Excel</div> -->
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
                    @handleSizeChange="handleSizeChange" 
                    @handleCurrentChange="handleCurrentChange"
                >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
        <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
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
        readPushFn(){
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
                }else{
                    this.$message({
                        showClose: true,
                        message: '推送失败',
                        type: 'error'
                    });
                    return
                }
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
                    url:`${this.$ip}/mms-knowledge/folder/list`, 
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
                width: 271px;
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
                        }
                    }
                }
            }
        }
        .main-content{
            padding: 0px 30px 0px 30px;
            display: flex;
            justify-content: space-between;
            /deep/ .mainTable{
                height: 500px!important;
                overflow: auto;
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
 
