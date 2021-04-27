<template>
    <div>

        <router-view v-if="this.$route.path == '/addWorkTemplateAdd'" :key="$route.path"></router-view>
         <!--<router-view v-else-if="this.$router.history.current.path == '/SuserTrain'" :key="$route.path"></router-view>-->
         <router-view v-else-if="this.$route.path == '/editWorkTemplateAdd'" :key="$route.path"></router-view>
         <router-view v-else-if="this.$route.path == '/infoWorkTemplateAdd'" :key="$route.path"></router-view>
         <div v-else-if="this.$route.path == '/WorkTemplate'" :key="$route.path" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    工单模板管理
                </div>
                <div class="QheadRight">
                    <div v-if="isZDRole" @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div  v-if="isZDRole"  @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div  v-if="isZDRole" @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div  v-if="isZDRole" @click="upTemplate()"><icon iconClass="upload" ></icon>上传模板</div>
                    <div @click="exportTemplate()"><icon iconClass="export" ></icon>导出</div>
                </div>
            </div>

            <div class="tableOneBox">
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="check" label="最新版本标识" :width="120" align="center" >
                        <template slot-scope="{ row }">
                                  <el-checkbox class="nocurser" :value="!row.history" :label="false" v-if="!row.history" ></el-checkbox>
                         </template>
                    </el-table-column>
                    <!--:show-overflow-tooltip="true"-->
                    <el-table-column   v-if="isZDRole" align="center" slot="option" label="操作" :width="100">
                        <template  slot-scope="scope">
                            <div >
                                <el-tooltip class="item" effect="dark" :enterable="false" content="改版" placement="top">
                                    <span @click="addOrEditOrInfo1(scope.row,'edit')" class="rowSvg" v-if="scope.row.canCopy">
                                        <icon iconClass="revision"  ></icon>
                                    </span>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :enterable="false" content="启用" placement="top">
                                    <span  @click="enable(scope.row)" class="rowSvg" v-if="scope.row.canEnable">
                                        <icon iconClass="enable"  ></icon>
                                    </span>
                                </el-tooltip>
                                <el-tooltip class="item" effect="dark" :enterable="false" content="停用" placement="top">
                                    <span  @click="unEnable(scope.row)"  class="rowSvg" v-if="scope.row.canInvalid">
                                        <icon iconClass="disable"  ></icon>
                                    </span>
                                </el-tooltip>

                            </div>
                         </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
        <UploadModule ref="UploadModule"  @getList="getList"></UploadModule>
        <SelectAirline ref="SelectAirline"   ></SelectAirline>
    </div>
</template>
<script>
    import SelectAirline from './selecAlrline'
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { workOrderConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    import UploadModule from './add/uploadModule'
    export default {
        components: {
            Icon,
            SearchTable,SelectAirline,
            UploadModule
        },
        name: 'authorizeManage',
        data() {
            return {
                tableData:{records:[]},
                tableConfig:workOrderConfig({}),
                params:{
                    current: 1,
                    size: 15,
                },

                form:{},
                row:{},
                sort:{},
                selectId:null
            };
        },
        created() {
             if(this.$router.history.current.path == '/WorkTemplate'){
                this.getList();
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:[ 'W_versionState' ]
                }).then(d => {
                    let obj=d.data||{}
                    let arr=workOrderConfig(obj )||[]
                    if(!this.isZDRole){
                        arr.splice(arr.length-1,1)
                    }
                    this.tableConfig=arr
                });
               }
        },
        computed:{
            isZDRole(){
                return !this.$store.getters.isZDRole('GDGLZDGLY')
            },
        },
        methods: {
            exportTemplate(){
                this.$refs.SelectAirline.open()
            },
            upTemplate(){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$refs.UploadModule.open(this.row.id)
                }

            },
            enable(row,path){
                let url=`${this.$ip}/mms-workorder/template/enable/${row.id}`
                this.optionsPrompt('启用',url,row)

            },
            addOrEditOrInfo1(row){
                this.optionsPrompt('改版',()=>{
                    request({
                        url:`${this.$ip}/mms-workorder/template/copyByVersion`,
                        method: 'post',
                        params:{id:this.$route.query.id},
                        data: {
                            code:row.code,
                            version:row.version,
                        }
                    }).then(d => {
                        if( d.code==200){
                            this.$router.push({path:'/editWorkTemplateAdd',query:{ id:d.data.typeVO.id}});
                        }
                    });
                })
            },
            optionsPrompt(text,url,row){
                let msg = '';
                if ('启用' == text && !row.airlineTemplateFile && !row.bureauTemplateFile && !row.internalTemplateFile) {
                    msg = '当前工单暂未上传模板，';
                }
                this.$confirm(`此操作将${text}该工单模板，${msg}是否继续`,'提示',{
                    confirmButtonTex:'确定',
                    cancelButtonTex:'取消',
                    type:'warning'
                }).then(()=>{
                   if( typeof url=='string'){
                       request({
                           url:url,
                           method: 'get',
                       }).then((d) => {
                           if(d.code==200){
                               this.$message.success('操作成功')
                               this.getList()
                           }
                       })
                   }else{
                       url()
                   }
                }).catch((d)=>{
                    this.$message.info('已取消操作')
                })
            },
            unEnable(row,path){
                let url=`${this.$ip}/mms-workorder/template/invalid/${row.id}`
                this.optionsPrompt('停用',url)
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
                    this.$router.push({path:'/addWorkTemplateAdd',query:{ }});
                }else if(tag == 'edit' || tag == 'info'){
                    let p='/'+tag+'WorkTemplateAdd'
                    if(this.selectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        this.$router.push({path:p,query:{type:tag,id:this.row.id}});
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
                                url:`${this.$ip}/mms-workorder/template/delete/`+this.selectId,
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
                    if(!k&&k!==0){
                        data[l]=null
                    }
                    if(l=='state'&&k){
                        data[l]= Number(k)
                     }
                }))
                request({
                    url:`${this.$ip}/mms-workorder/template/list`,
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
.nocurser{
    cursor: text;
    /deep/ .el-checkbox__input{
        cursor: text;
    }
}
</style>
