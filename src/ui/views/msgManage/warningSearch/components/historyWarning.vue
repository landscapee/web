<template>
        <div  class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>预警历史</span>
                </div>
                <div class="top-toolbar"></div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                     <el-table-column slot="relationInfo"  :width="148" ></el-table-column>
                </SearchTable>
            </div>
        </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { warningSearchHistoryTable } from '../../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:warningSearchHistoryTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{state:1},
            sort:{},
            selectId:null
        };
    },
   created() {
       this.getList();
    },
    watch:{
        params:{
            handler:function(val,oldval){
                this.getList();
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
    },
    methods: {
        requestTable(searchData){
            this.form = searchData;
            this.form.state = 1;
            this.selectId=null;
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort = {};
            let num = null;
            if(column.order=='desc'){
                num = 0
            }else if(column.order=='asc'){
                num = 1
            }else{
                num = 2
            }
            if(num!=2){
                this.sort['order'] = column.property+','+num;
            }
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
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
            if(row.selected){
                this.selectId = row.id;
            }else{
                this.selectId = null;
            }
            this.params.current = 1;
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addWarningConfig',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/addWarningConfig',query:{type:tag,id:this.selectId}});
                }
            }
        },
        delData(){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                request({
                    url:`${this.$ip}/mms-parameter/rest-api/sysParam/del`,
                    method: 'post',
                    data:{id:this.selectId}
                })
                .then((data) => {
                   this.$message({type: 'success',message: '删除成功'});
                    this.getList();
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        getList(){
           request({
                url:`${this.$ip}/mms-warning/warning/list`,
                method: 'post',
                data:{...this.sort,...this.form},
                params:this.params
            })
            .then((data) => {
                this.tableData = extend({}, this.tableData, data.data);
            }).catch((error) => {

            });
        },
        handleSizeChange(size) {
            this.params.current = 1;
			this.params.size = size;
		},
		handleCurrentChange(current) {
			this.params.current = current;
		},
		handleCheckedChange() {},
		handleSelectionChange() {},
    },
};
</script>
<style scoped lang="scss">
@import "@/ui/styles/common_list.scss";
.sysParameter{
    .main-content{
        /deep/ .mainTable{
            height: 600px;
        }
    }
}
</style>
