<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addElectronicFence'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/electronicFenceConfig'" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    电子围栏误差配置
                </div>
                <div class="QheadRight">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>

<!--                    <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>-->
<!--                    <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>-->
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
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
import { electronicFenceTable } from '../tableConfig.js';
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
            tableConfig:electronicFenceTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
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
            this.selectId=null,
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            console.log(JSON.stringify(column))
            this.sort = {};
            this.sort[column.property] = column.order;
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
                this.$router.push({path:'/addElectronicFence',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/addElectronicFence',query:{type:tag,id:this.selectId}});
                }
            }
        },
        delData(){
            if(this.selectId!=null){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                .then(() => {
                    request({
                        url:`${this.$ip}/mms-parameter/rest-api/electronicFence/del`,
                        method: 'post',
                        data:{id:this.selectId}
                    })
                    .then((data) => {
                        this.$message({type: 'success',message: '删除成功'});
                        this.getList();
                        this.selectId = null;
                    })
                })
                .catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除',
                    });
                });
            }else{
                this.$message.error('请先选中一行数据');
            }
        },
        getList(){
            for (let v of this.tableConfig){
                console.log(v)
                if (this.form[v.prop]){
                    if(v.search.type1 === 'number'){
                        let numV = parseInt(this.form[v.prop]);
                        this.form[v.prop] = numV;
                    }
                }
            }
           request({
                url:`${this.$ip}/mms-parameter/rest-api/electronicFence/query`,
                method: 'post',
                data:{...this.params,...this.sort,...this.form}
            })
            .then((data) => {
                if(this.params.current==1){
                    this.tableData = {records: data.data.items,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.items,...this.params,total:data.data.total}
                }
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
.electronicFence{
    .main-content{
        /deep/ .mainTable{
            height: 600px;
            overflow: auto;
        }
          .mainTable{
            height: 600px;
            overflow: auto;
        }
    }
}
</style>
