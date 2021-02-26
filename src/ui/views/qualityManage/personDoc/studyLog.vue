<template>
    <div >
      <div class="QCenterRight G_listOne">
            <div>
                <div class="QHead">
                    学习记录
                </div>
                <div class="QheadRight">
                    <!--<div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>-->
                </div>
            </div>
          <div class="top-left-toolbar">
              <span :class="isActive==index?'isActive':''" @click="switchTable(index)" v-for="(name,index) in ['推送文件','公开文件']" :key="index">{{name}}</span>
          </div>
            <div class="tableOneBox">
                <SearchTable :tableRowClassName="tableRowClassName" :noSearch="true"      ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="筛选" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
     </div>
</template>
<script>
     import SearchTable from '@/ui/components/SearchTable/table';
    import Icon from '@components/Icon-svg/index';
    import { studyLogConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable
        },
        name: 'personDoc',
        data() {
            return {
                tableData:{records:[]},
                tableConfig:studyLogConfig(),
                params:{
                    current: 1,
                    size: 15,
                },
                isActive:0,
                form:{},
                row:{},
                sort:{},
                selectId:null,
                tableRowClassName: (rowIndex, row) => {

                    if (row.read===0) {
                        return 'warning-row';
                    }
                    return 'tab-row';
                },
            };
        },
        created() {

            this.getList();
        },

        methods: {
            switchTable(index){
                this.isActive = index;
                this.tableData = {records:[]};
                this.params.current = 1;
                this.getList();
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
            getList(){
                request({
                    url:`${this.$ip}/mms-knowledge/fileStudy/userStudyList?current=${this.params.current}&size=${this.params.size}`,
                    method: 'post',
                    data:{
                        open: !!this.isActive,
                         ...this.sort,
                        ...this.form,
                        userId:this.$route.query.id
                    }
                })
                    .then((data) => {

                        this.selectObjs=[]
                        this.tableData = {...data.data}

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

    .G_listOne{
        /deep/ .mainTable{
            height:calc(100vh - 370px) !important;
        }
    }


    .top-left-toolbar{
        .isActive{
            color: #fff;
            background-color: #3280e7;
        }
        span{
            display: inline-block;
            padding: 0px 10px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #3280e7;
            background-color: #fff;
            cursor: pointer;
        }
        span:first-child{
            border-radius: 3px 0 0 3px;
            border: solid 1px #3280e7;
        }
        span:last-child{
            border-radius: 0 3px 3px 0;
            border: solid 1px #3280e7;
        }
    }
</style>



