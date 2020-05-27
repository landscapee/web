<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addPersonDoc'" :key="$route.path"></router-view>
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
                    <div><icon iconClass="export" ></icon>导出Excel</div>
                    <div><icon iconClass="save" ></icon>保存</div>
                    <div><icon iconClass="reset" ></icon>重置</div>
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
.personDoc{
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
