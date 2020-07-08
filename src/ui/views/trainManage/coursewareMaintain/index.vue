<template>
    <div>

         <router-view v-if="this.$router.history.current.path == '/coursewareMaintainAdd'" :key="$route.path"></router-view>

        <div v-else-if="this.$router.history.current.path == '/coursewareMaintain'" :key="$route.path" class="coursewareMaintain">
            <div class="top-content">
                <div class="top-content-title">
                    <span>课件维护</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <!--<div @click="exportExcel"><icon iconClass="export" ></icon><a ref="a" :href="`${this.$ip}/mms-training/download/securityInformation`"></a>导出</div>-->
                </div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <!--:show-overflow-tooltip="true"-->
                    <el-table-column align="center" slot="fileDown" label="操作" :width="120" >
                        <template  slot-scope="scope">
                            <form action="#" method="GET" ref="formLoad"></form>
                            <!--<el-button :disabled="!scope.row.courseFileId||scope.row.downloadPermission=='禁止下载'" class="QoptionButton"  >课件下载</el-button>-->
                            <el-button :disabled="!scope.row.courseFileId||scope.row.downloadPermission=='禁止下载'" class="QoptionButton" @click="fileDown(scope.row)">课件下载</el-button>
                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
    </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { coursewareConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: 'coursewareMaintain',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:coursewareConfig({}),
            params:{
				current: 1,
				size: 15,
            },
            filePath:'#',
            form:{},
            row:{},
            sort:{},
            selectId:null
        };
    },
   created() {
        if(this.$router.history.current.path == '/coursewareMaintain'){
            this.getList();
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["isUse", "loadPermission","CourseBusinessType",'coursewareType','applyObject' ]
            }).then(d => {
                let obj=d.data
                this.tableConfig=coursewareConfig(obj)

            });

        }

    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {
        fileDown(row){
            if(row.courseFileId){
                request({
                    // application/x-www-form-urlencoded
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-file/get-file-by-id/${row.courseFileId }`,
                     method:'GET',

                }).then((d) => {
                    if( d.data){
                        this.$refs.formLoad.action =  d.data.filePath;
                         this.$refs.formLoad.submit();
                     }
                });
            }else {
                this.$message.info('暂无附件')
            }
         },
        exportExcel(){
             this.$refs.a.click()
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
                this.selectId = row.id;
            }else {
                this.selectId   = null;
            }
             this.row = row;
            this.params.current = 1;
            console.log(row, column, event,199);
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
             if(tag=='add'){
                this.$router.push({path:'/coursewareMaintainAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/coursewareMaintainAdd',query:{type:tag,id:this.row.id}});
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
                             url:`${this.$ip}/mms-training/courseInfo/delete/`+this.selectId,
                            method: 'delete',
                            // params:{id:this.selectId}
                        })
                            .then((data) => {
                                this.getList();
                                this.selectId   = null;
                                this.$message({type: 'success',message: '删除成功'});
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
                url:`${this.$ip}/mms-training/courseInfo/list`,
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
        height: 600px;
    }
}

</style>
