<template>
    <div>

        <div   class="trainResults">
            <div class="top-content">
                <div class="top-content-title">
                    <span>员工培训结果<span style="color:#888888">（管理员）</span></span>
                </div>
                <div class="top-toolbar">
                    <!--<div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>-->
                    <!--<div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>-->
                    <!--<div @click="delData()"><icon iconClass="remove" ></icon>删除</div>-->
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div @click="exportExcel">
                        <icon iconClass="export" ></icon>
                        <a ref="a" :href="`${this.$ip}/mms-training/download/securityInformation`"></a>
                        导出Excel
                    </div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column   slot="employeeFileId" label="试卷名称"   >
                        <template  slot-scope="scope">
                            <div @click="upload(scope.row)" class="G_cursor" style="color:#0a76a4;text-align: center">
                                附件
                                <a href="" ref="aA"></a>
                            </div>

                        </template>
                    </el-table-column>
                    <el-table-column   slot="option" label="操作" align="center" :width="260"  >
                        <template  slot-scope="scope">
                            <!--style="height:40px;line-height: 26px;text-align: center"-->
                            <div style="position:relative">
                                <!--style=" padding:3px 7px; background: black; color:white;margin: 0"-->
                                <el-button  class="QoptionButton"  @click="SignEvaluation(scope.row)">
                                    <!--<div>分数</div>-->
                                    <!--<div>录入</div>-->
                                    培训签到&评价
                                </el-button>
                                <el-button  class="QoptionButton" @click="testResults(scope.row)">
                                    <!--<div>考试结果</div>-->
                                    <!--<div>推送</div>-->
                                    评价推送上级
                                </el-button>

                            </div>

                        </template>
                    </el-table-column>

                </SearchTable>
            </div>
        </div>
         <SignEvaluation ref="SignEvaluation" @getList="getList"></SignEvaluation>
    </div>
</template>
<script>
     import SignEvaluation from './signEvaluation'
 import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { trainAdminResultsConfig } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon, SearchTable,SignEvaluation, 
	},
    name: '',
    data() {
        return {
            tableData:{records:[ ]},
            tableConfig:trainAdminResultsConfig({},{}),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            row:{},
            visible:false,
            sort:{},
            selectId:null,
        };
    },
   created() {
        if(this.$router.history.current.path == '/trainManageAdminResults'){
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['trainType']
            }).then(d => {
                let obj=d.data
                this.tableConfig =trainAdminResultsConfig( obj)
            });
            this.getList();
        }



    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {
        upload(row){
            if(row.employeeFileId){
                request({
                    // application/x-www-form-urlencoded
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-file//get-file-by-id/${row.employeeFileId }`,
                    method:'GET',

                }).then((d) => {
                    this.$refs.SeeImg.open(d.data)
                });
            }else {
                this.$message.info('暂无附件')
            }

        },
        testResults( row){
            request({
                url:`${this.$ip}/mms-training/examResult/send` ,
                method: 'post',
                data:{employeeId:row.employeeId,examId:row.examId,employeeName:row.employeeName}
            }).then((d) => {
                if(d.code==200){}
                    this.getList();
                     this.$message({type: 'success',message: '推送成功'});
                })
        },
        SignEvaluation(row){
            this.$refs.SignEvaluation.open(row)
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
            console.log(column.property,column.order, this.sort,11);
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

            let data=JSON.stringify(this.row)
            if(tag=='add'){
                this.$router.push({path:'/trainManageAdminResultsAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/trainManageAdminResultsAdd',query:{type:tag,id:this.selectId}});
                }
            }
        },

        getList(){
            let data={...this.form}
            map(data,((k,l)=>{
                if(!k){
                    data[l]=null
                }
            }))
           request({
                url:`${this.$ip}/mms-training/examResult/list`,
                 method: 'post',
                data:{...this.sort,...data,examId:this.$route.query.id},
               params:{...this.params,}
            })
            .then((d) => {
                d.data.records=[{}]
                this.tableData = extend({},
                    {...d.data}
                );
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
.trainResults{
    margin-top:14px;

}

</style>
