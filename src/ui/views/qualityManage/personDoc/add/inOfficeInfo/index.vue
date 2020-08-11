<template>
    <div>

         <router-view v-if="this.$router.history.current.path == '/inOfficeInfoAdd'" :key="$route.path"></router-view>

        <div   class="sysParameter" v-else>
            <div class="top-content">
                <div class="top-content-title">
                    <span>任职信息</span>
                </div>
                <div class="top-toolbar">
                    <div @click="()=>type=='edit'?addOrEditOrInfo('add'):''" :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="add" ></icon></div>
                    <div @click="()=>type=='edit'?addOrEditOrInfo('edit'):''" :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="edit" ></icon></div>
                    <div @click="()=>type=='edit'?delData():''" :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="remove" ></icon></div>
                    <div @click="()=>type!='add'?addOrEditOrInfo('info'):''" :class="type=='edit'||type=='info'?'':'G_isDisabled'"  ><icon iconClass="info" ></icon></div>
                    <!--<div @click="exportExcel"><icon iconClass="export" ></icon><a ref="a" :href="`${this.$ip}/mms-training/download/securityInformation`"></a>导出Excel</div>-->
                </div>
            </div>
            <div class="main-content">
                <SearchTable :noSearch="true" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
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
import SearchTable from '@/ui/components/SearchTable';
 import Icon from '@components/Icon-svg/index';
import { inOfficeInfoConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    props:['type','id','tableData'],
    data() {
        return {
             tableConfig:inOfficeInfoConfig({},{}),
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

    },

    methods: {
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null;
            this.tableData=[];
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
            this.tableData.map(r =>{
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
            this.$set(this.tableData,row.index,row);
        },
        addOrEditOrInfo(tag){
             if(tag=='add'){
                this.$router.push({path:'/inOfficeInfoAdd',query:{type:'add',rId:this.id+','+this.type}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/inOfficeInfoAdd',query:{type:tag,rId:this.id+','+this.type,id:this.selectId}});
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
                             url:`${this.$ip}/mms-qualification/positionInf/delete/`+this.selectId,
                            method: 'delete',
                         })
                            .then((data) => {
                              if(data.code==200){
                                  this.$emit('getInfo')
                                  this.selectId   = null;
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
                url:`${this.$ip}/mms-training/examInfo/list`,
                 method: 'post',
                data:{...this.sort,...data},
               params:{...this.params,}
            })
            .then((data) => {
                if(data.code==200){
                    this.tableData = extend({}, {...data.data});
                }



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
.sysParameter{
    margin-top:14px;
.top-toolbar{
    margin-top: 10px;
    .G_isDisabled{
        &>svg{
            margin: 0;
        }
    }
   &>div{
       font-size: 20px;
       border: 0;
       margin: 0 0 0 12px;
   }
    &>div:last-child{
       margin: 0 0 0 12px;
   }
}
    .copyButton{
        margin: 0;
        padding:7px 10px;
        background: black;
        color:white;
    }
    .copyButton1{
        margin-right: 3px;
    }
}
/deep/ .mainTable{
    height: 300px;
    overflow: auto;
}
</style>
