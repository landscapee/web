<template>
    <div>
         <router-view v-if="this.$router.history.current.path == '/tailInfoAdd'" :key="$route.path"></router-view>
        <div v-else-if="this.$router.history.current.path == '/tailInfo'" :key="$route.path" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    机尾号信息
                </div>
                <div class="QheadRight">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
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
import { Config } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:Config({}),
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
        if(this.$route.path == '/tailInfo'){
            this.getList();
        }

       // request({
       //     url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
       //     method: 'post',
       //     data:["Q_BadMistake", "Q_securityServices",]
       // }).then(d => {
       //     let obj=d.data
       //     this.tableConfig=Config(obj)
       //
       // });
    },
    watch:{

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
            if(row.selected ){
                this.selectId = row.id;
            }else {
                this.selectId   = null;
            }
             this.row = row;
            this.params.current = 1;
             this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/tailInfoAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/tailInfoAdd',query:{type:tag,id:this.row.id}});
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
                             url:`${this.$ip}/mms-parameter/rest-api/airplaneInfo/delete`,
                            method: 'post',
                            data:{id:this.selectId}
                        })
                            .then((data) => {
                              if(data.code==200){
                                  this.getList();
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
                url:`${this.$ip}/mms-parameter/rest-api/airplaneInfo/list`,
                method: 'post',

                data:{...data,...this.params,...this.sort}
            }).then(d => {
                if(d.code==200){
                    this.tableData={
                        total:d.data.total,
                        records:d.data.items,
                        size:this.params.size,
                        current:this.params.current,
                    }
                }

            });
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
    
}
/deep/ .mainTable{
    height:calc(100vh - 370px);
    overflow: auto;
}
</style>
