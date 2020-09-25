<template>
    <div>

        <router-view v-if="this.$router.history.current.path == '/addPersonDoc'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/inOfficeInfoAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/workExperienceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/certificateAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/unsafeAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/userQuali'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/userAuth'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/userTrain'" :key="$route.path"></router-view>
         <div v-else-if="this.$router.history.current.path == '/personDoc'" :key="$route.path" class="coursewareMaintain">
            <div class="top-content">
                <div class="top-content-title">
                    <span>人员档案</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div @click="upDocInfo('info')"><icon iconClass="upload" ></icon>上传档案</div>

                </div>
            </div>
            <div class="main-content">
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="筛选" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <!--:show-overflow-tooltip="true"-->
                    <el-table-column align="center" slot="option" label="操作" :width="120" >
                        <template  slot-scope="scope">
                            <div>
                                <span @click="seeOther(scope.row,'/userQuali')" class="rowSvg">
                                    <icon iconClass="qualification" title="资质"></icon>
                                </span>
                                <span @click="seeOther(scope.row,'/userAuth')" class="rowSvg" style="margin: 0 10px">
                                    <icon iconClass="authorization" title="授权"></icon>
                                </span>
                                <span @click="seeOther(scope.row,'/userTrain')" class="rowSvg">
                                    <icon iconClass="check" title="培训考核"></icon>
                                </span>
                            </div>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
        <UpDocInfo ref="UpDocInfo" @getTableData="getList1"></UpDocInfo>
    </div>
</template>
<script>
    import UpDocInfo from '../components/uploadDocInfo'
    import SearchTable from '@/ui/components/SearchTable/index';
    import Icon from '@components/Icon-svg/index';
    import { personDocTable } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,UpDocInfo
        },
        name: 'personDoc',
        data() {
            return {
                tableData:{records:[]},
                tableConfig:personDocTable({}),
                params:{
                    current: 1,
                    size: 15,
                },
                filePath:'#',
                deptObj:{},

                form:{},
                row:{},
                sort:{},
                selectId:null
            };
        },
        created() {
            if(this.$router.history.current.path == '/personDoc'){
                this.getList();

                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["xingbie",'dept']
                }).then(d => {
                    if(d.code==200){
                         let obj=d.data
                         let deptObj={}
                         d.data.dept.map((k,l)=>{
                             deptObj[k.valCode]=k.valData
                        })
                        this.tableConfig=personDocTable(obj,deptObj)

                    }

                });

            }

        },
        watch:{
            '$route':function(val,nm){
                console.log(1,val,nm);

            }
        },
        methods: {
            upDocInfo(){
                this.$refs.UpDocInfo.open({api:'mms-qualification/userRecord/uploadExcel',title:'人员档案上传'})
            },
            getList1(){
                this.row={}
                this.selectId=null
                this.form={}
              this.getList()
            },
            seeOther(row,path){
                this.$router.push({path:path,query:{ id:row.userId}});

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
                if(row.selected ){
                    this.row = row;
                    this.selectId = row.id;
                }else {
                    this.selectId   = null;
                    this.row = null;

                }

                this.params.current = 1;
                 this.$set(this.tableData.records,row.index,row);
            },
            addOrEditOrInfo(tag){
                if(tag=='add'){
                    this.$router.push({path:'/addPersonDoc',query:{type:'add'}});
                }else if(tag == 'edit' || tag == 'info'){
                    if(this.selectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        this.$router.push({path:'/addPersonDoc',query:{type:tag,id:this.row.id}});
                    }
                }
            },
            delData(){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            request({
                                url:`${this.$ip}/mms-qualification/userRecord/delete/`+this.selectId,
                                method: 'delete',
                             })
                                .then((d) => {
                                    if(d.code==200){
                                        this.getList();
                                        this.selectId   = null;
                                        this.row   = null;
                                        this.$message({type: 'success',message: '删除成功'});
                                    }

                                })
                        })
                        .catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除',
                            });
                        });            }

            },
            getList(){
                let data={...this.form}
                map(data,((k,l)=>{
                    if(!k){
                        data[l]=null
                    }
                }))
                request({
                    url:`${this.$ip}/mms-qualification/userRecord/list`,
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
    .coursewareMaintain{
        margin-top:14px;
        /deep/ .mainTable{
            height:calc(100vh - 370px);
        }
    }

</style>
