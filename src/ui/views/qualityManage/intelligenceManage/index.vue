<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addQualifications'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/intelligenceManage'" class="intelligenceManage">
            <div class="top-content">
                <div class="top-content-title">
                    <span>资质管理</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div><icon iconClass="export" ></icon>导出Excel</div>
                    <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                    <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable  @requestTable="requestTable"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49">
                        <template slot-scope="{ row , $index}">
                            <icon iconClass="sy" class="tab_radio" v-if="tableData.records[$index].selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                   <el-table-column slot="relationInfo" label="关联信息" :width="149">
                        <template >
                            <span><icon iconClass="kh" class="action_radio"></icon></span>
                            <span><icon iconClass="ks" class="action_radio"></icon></span>
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
import { intelligenceManageTable } from '../tableConfig.js';
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
            tableConfig:intelligenceManageTable,
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
            
        },
        listenToCheckedChange(row, column, event){
            this.tableData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
            })
            row.selected  = !row.selected;
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addQualifications',query:{type:'add'}});
            }else if(tag == 'edit'){
                this.$router.push({path:'/addQualifications',query:{type:'edit'}});
            }else{
                this.$router.push({path:'/addQualifications',query:{type:'info'}});
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
.intelligenceManage{
    margin-top:40px;
    .top-content{
        height: 82px;
       justify-content: center;
        position: relative;
        display: flex;
        align-items: center;
        .top-content-title{
            font-family:SourceHanSansCN-Medium,SourceHanSansCN;
            font-weight:500;
            color:rgba(34,34,34,1);
            height:24px;
            line-height:24px;
            span{
                font-size:24px ;
            }
        }
        .top-toolbar{
            position: absolute;
            right: 0px;
            .isDisabled{
                background: rgba(208,208,208,1);
                color: #6A7785;
                cursor: not-allowed;
                .svg-icon{
                    fill: rgba(208,208,208,1);
                }
            }
            div{
                user-select: none;
                cursor: pointer;
                display: inline-flex;
                justify-content: center;
                align-items: center;
                height: 32px;
                line-height: 32px;
                padding: 7px;
                border-radius:2px;
                border:1px solid rgba(208,208,208,1);
                margin-right: 12px;
                color: #3D568E;
                &:last-child{
                    margin-right: 30px;
                }
                .svg-icon{
                    height:18px;
                    width:18px;
                    margin-right: 4px;
                    vertical-align: text-top;
                }
            }
        }
    }
    .main-content{
        width: 100%;
        height: 100%;
        position: relative;
    }
}
</style>
