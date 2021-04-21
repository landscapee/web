<template>
    <div>

        <router-view v-if="this.$route.path == '/addPersonDoc/add'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/addPersonDoc/edit'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoaddPersonDoc'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoaddPersonDoc1'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/inOfficeInfoAdd/add'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/inOfficeInfoAdd/edit'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoinOfficeInfoAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoinOfficeInfoAdd1'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/workExperienceAdd/add'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/workExperienceAdd/edit'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoworkExperienceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoworkExperienceAdd1'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/certificateAdd/add'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/certificateAdd/edit'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infocertificateAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infocertificateAdd1'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/unsafeAdd/add'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/unsafeAdd/edit'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infounsafeAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infounsafeAdd1'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/userQuali'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/userAuth'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/userTrain'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/workStyle/add'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/workStyle/edit'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoworkStyle'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoworkStyle1'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/studyLog'" :key="$route.path"></router-view>
         <div v-else-if="this.$route.path == '/personDoc'" :key="$route.path"
              class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    人员档案
                </div>
                <div class="QheadRight">
                    <div v-if="isZDRole" @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div v-if="isZDRole"  @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div v-if="isZDRole"  @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div v-if="isZDRole"  @click="upDocInfo('info')"><icon iconClass="upload" ></icon>上传档案</div>
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable v-if="tableConfig.length"    ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="筛选" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <!--&lt;!&ndash;:show-overflow-tooltip="true"&ndash;&gt;effect="dark" :enterable="false"-->

                    <el-table-column align="center" slot="option" label="操作" :width="140" >
                        <template  slot-scope="scope">
                            <el-tooltip class="item"     effect="dark" content="资质" placement="top">
                                <span @click="seeOther(scope.row,'/userQuali')" class="rowSvg">
                                    <icon iconClass="qualification"  ></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="授权" placement="top">
                              <span @click="seeOther(scope.row,'/userAuth')" class="rowSvg" style="margin: 0 10px">
                                    <icon iconClass="authorization"  ></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="培训考核" placement="top">
                            <span @click="seeOther(scope.row,'/userTrain')" class="rowSvg">
                                    <icon iconClass="check"  ></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="学习记录" placement="top">
                            <span @click="seeOther(scope.row,'/studyLog')" style="margin-left: 10px" class="rowSvg">
                                    <icon iconClass="studyLog"  ></icon>
                                </span>
                            </el-tooltip>
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
                tableConfig:[],
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
        computed:{

            isZDRole(){
                return !this.$store.getters.isZDRole('ZLGLZDGLY')
            },
        },
        created() {
            if(this.$route.path == '/personDoc'){
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
                        // this.$set(this.tableConfig  ,3,{search:{type:'select',placeholder:"请选择", prop:'sex',data:obj.xingbie||[],selectProp:['valData','valData']}})
                        // this.$set(this.tableConfig ,5,obj.xingbie)
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
                    this.$router.push({path:'/addPersonDoc/add',query:{ }});
                }else if(tag == 'edit'  ){
                    if(this.selectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        this.$router.push({path:'/addPersonDoc/'+tag,query:{ id:this.row.id,userId:this.row.userId}});
                    }
                }else if(  tag == 'info'){
                    if(this.selectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        this.$router.push({path:'/infoaddPersonDoc',query:{ id:this.row.id,userId:this.row.userId}});
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
     /*.coursewareMaintain{*/
         /*/deep/ .mainTable{*/
            /*height:calc(100vh - 370px);*/
        /*}*/
    /*}*/

</style>
