<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addPersonDoc'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/userAssRecord'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/userAuth'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/userQuali'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/personDoc'" class="personDoc">
            <div class="top-content">
                <div class="top-content-title">
                    <span>人员档案</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div @click="exportExcel"><icon iconClass="export" ></icon><a ref="a" :href="`${this.$ip}/mms-qualification/download/securityInformation`"></a>导出</div>

                </div>
            </div>
            <div class="main-content">
                <SearchTable  @requestTable="requestTable"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                   <el-table-column slot="relationInfo" label="关联信息" :width="298" fixed="right">
                        <template >
                            <el-button size="mini" @click="showUserList('quali')">员工资质</el-button>
                            <el-button size="mini" @click="showUserList('auth')">员工授权</el-button>
                            <el-button size="mini" @click="showUserList('exa')">培训考核</el-button>
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
import { personDocTable } from '../tableConfig.js';
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
            tableData:{},
            tableConfig:personDocTable(),
            params:{
				current: 1,
				size: 15,
            },
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
        exportExcel(){
            this.$refs.a.click()
        },

       showUserList(tag){
            if(tag=='quali'){
                 this.$router.push({path:'/userQuali',query:{id:"123"}});
            }else if(tag=='auth'){
                 this.$router.push({path:'/userAuth',query:{id:"123"}});
            }else if(tag=='exa'){
                 this.$router.push({path:'/userAssRecord',query:{id:"123"}});
            }
        },
        requestTable(searchData){
            console.log(searchData[0]);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addPersonDoc',query:{type:'add'}});
            }else if(tag == 'edit'){
                this.$router.push({path:'/addPersonDoc',query:{type:'edit'}});
            }else{
                this.$router.push({path:'/addPersonDoc',query:{type:'info'}});
            }
        },
        delData(){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                // request({
                //     url:'/api/delete', 
                //     method: 'delete',
                //     params:{id:""}
                // })
                // .then((data) => {
                //    this.$message({type: 'success',message: '删除成功'});
                // })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        renderHeader(h,  { column, $index }) {
            return (
                <div>
                    <span>{column.label}</span>
                    <Icon iconClass="sort" nativeOnClick={ () => {this.headerSort() }  } ></Icon>
                </div>
            );
        },
        headerSort(){
            alert(123);
        },
        listenToCheckedChange(row, column, event){
           let select = row.selected;
          this.tableData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
		  })
          row.selected  = !select;
          this.$set(this.tableData.records,row.index,row);
        },
        getList(){
            request({
                url:'/api/material/query', 
                method: 'post',
                data:{searchKey: '',type: 'VEHICLE',deptId:JSON.parse(localStorage.getItem("userInfo")).administrativeDeptId},
                params:{current: this.params.current,size: this.params.size}
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
.personDoc{
    margin-top:15px;

}
</style>
