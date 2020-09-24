<template>
    <div class='index'>
        <!-- <router-view v-else v-if="this.$router.history.current.path == '/addFile'" :key="$route.path"></router-view> -->
        <div class='inner'>
            <div class='top_content'>
                <div class='header'><span>个人管理</span></div>
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
                        <!-- <div @click="readPushFn">阅读推送</div> -->
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
                <el-table-column slot="option" align='center' label="操作" :width="100"  >
                        <template  slot-scope="{ row }"> <!---->
                            <span @click="toDownloadFn(row)" class="rowSvg" style="margin-right: 10px">
                                <icon iconClass="downloadNew" title="下载"></icon>
                            </span>
                            <span @click="toCompleteFn(row)" class="rowSvg" :style="row.read===1?'':'visibility: hidden'">
                                <icon iconClass="finishRead" title="完成阅读"></icon>
                            </span>
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
        init(){
            this.getList()
        },
        getList(){
            request({
                url:`${this.$ip}/mms-knowledge/fileStudy/userStudyList?current=${this.params.current}&size=${this.params.size}`,
                method: 'post',
                data:{
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
                width: 290px;
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

