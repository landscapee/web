<template>
    <div  class="assRecord">
        <div class="top-content">
            <div class="top-content-title">
                <span>{{$route.query.id}}-资质培训考核记录</span>
            </div>
            <div class="top-toolbar">
                <div class="isDisabled" ><icon iconClass="add" ></icon>新增</div>
                <div class="isDisabled" ><icon iconClass="edit" ></icon>编辑</div>
                <div class="isDisabled" ><icon iconClass="remove" ></icon>删除</div>
                <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                <div><icon iconClass="export" ></icon>导出Excel</div>
                <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
            </div>
        </div>
        <div class="main-content">
            <SearchTable  @requestTable="requestTable"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                <el-table-column slot="radio" label="选择" :width="49" >
                    <template slot-scope="{ row }">
                        <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                        <icon  iconClass="ky" class="tab_radio" v-else></icon>
                    </template>
                </el-table-column>
                <el-table-column slot="relationInfo" label="关联信息" :width="149" >
                    
                </el-table-column>
            </SearchTable>
        </div>
    </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { assRecordTable } from '../../tableConfig.js';
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
            tableConfig:assRecordTable,
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
        requestTable(searchData){
            console.log(searchData[0]);
        },
        headerSort(column){
            alert(123);
        },
        listenToCheckedChange(row, column, event){
          
        },
        getList(){
            request({
                url:'/api/material/query', 
                method: 'post',
                data:{searchKey: '',type: 'VEHICLE',deptId: "aa8ae7dcbe9440238ce751329ccba5ca"},
                params:{current: this.params.current,size: this.params.size},
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzYmFkNzRjYzEwZGU0NDI4YWNmOGRjMmExZGY0Njg3YiIsInVzZXJJZCI6IjNiYWQ3NGNjMTBkZTQ0MjhhY2Y4ZGMyYTFkZjQ2ODdiIiwidXNlckxvZ2luTmFtZSI6IuW-kOW4jCIsInVzZXJOYW1lIjoieHV4aSIsImRlcHRJZCI6Ijg2YzhhYzFkNzI5NDQ3MTRiODM1Zjk0MjRiYWY3YmJjIiwiZGVwdENvZGUiOiJPUi0xLTAxIiwiZGVwdE5hbWUiOiLpo57ooYzljLrnrqHnkIbpg6giLCJhZG1pbmlzdHJhdGl2ZUlkIjoiYWE4YWU3ZGNiZTk0NDAyMzhjZTc1MTMyOWNjYmE1Y2EiLCJhZG1pbmlzdHJhdGl2ZUNvZGUiOiJPUi0xLTAxLTAxIiwiYWRtaW5pc3RyYXRpdmVOYW1lIjoi5Zy65Yqh6YOoIiwiZ3JvdXBJZCI6IjNmMDI2NmNkYTljOTQwNTVhYzBjM2Q1MThlZWM0OTgwIiwiZ3JvdXBDb2RlIjoiT1ItMS0wMS0wMS0wMSIsImdyb3VwTmFtZSI6IuWcuumBk-i_kOihjOe7tOaKpOS4gOe7hCIsInJvbGVDb2RlcyI6IltBRE1JTklTVFJBVE9SLFJPLTAxLTAxLTA5LFJPLTAxLTAxLTAyX2xlYWRlcl0iLCJpYXQiOjE1OTA1NzA1MjYsImV4cCI6MTU5MDY1NjkyNn0.3wUyJBsuet7PDHGBsFeI2ZK1LSACPTtqGvCAAFec-Rc',
                    'Accept': 'application/json',
                }
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
.assRecord{
    margin-top:40px;
    
}
</style>
