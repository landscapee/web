<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addWarningManage'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/warningManage'" class="warningManage">
            <div class="top-content">
                <div class="top-content-title">
                    <span>预警管理</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    
                    <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                    <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable  @requestTable="requestTable"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                   <el-table-column slot="relationInfo" label="关联信息" :width="298">
                        <template >
                            <el-button size="mini" @click="clickAction('confirm')">收到确认</el-button>
                            <el-button size="mini" @click="clickAction('business')">业务处理</el-button>
                            <el-button size="mini" @click="clickAction('close')">关闭预警</el-button>
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
import { warningManageTable } from '../tableConfig.js';
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
            tableConfig:warningManageTable(),
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
        clickAction(tag){
            if(tag=='confirm'){
                
            }else if(tag == 'business'){

            }else if(tag == 'close'){

            }
        },
        requestTable(searchData){
            console.log(searchData[0]);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addWarningManage',query:{type:'add'}});
            }else if(tag == 'edit'){
                this.$router.push({path:'/addWarningManage',query:{type:'edit'}});
            }else{
                this.$router.push({path:'/addWarningManage',query:{type:'info'}});
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
.warningManage{
    margin-top:40px;
 
}
</style>
