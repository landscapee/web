<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addAuthorizeManage'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/authorizeManage'" class="authorizeManage">
            <div class="top-content">
                <div class="top-content-title">
                    <span>授权管理</span>
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
                <Ftable class="headerTable" :data="tableHeaderData" :tableConfig="tableHeaderConfig" :showHeader="true" :showPage="false" >
                        <el-table-column  :width="80"   slot="radio" label="选择" >
                            <span slot-scope="{ row }">
                                <div>筛选</div>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="userNumber" label="员工编号" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="userName" label="员工姓名" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="zhengshuh" label="资质证书号" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="zzmc" label="资质名称" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="zzlx" label="资质类型" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="bfrq" label="颁发日期" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="bfdw" label="颁发单位" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="syyw" label="适用业务" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="sxrqone" label="生效日期" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="sxrqtwo" label="失效日期" :render-header="renderHeader">
                            <span slot-scope="{ row }">
                                <el-input class="require_des" v-model="row.userNumber"></el-input>
                            </span>
                        </el-table-column>
                        <el-table-column   slot="glxx" label="关联信息" :width="120" >
                            <span slot-scope="{ row }">
                                <el-button>搜索</el-button>
                            </span>
                        </el-table-column>
                </Ftable>
                <Ftable  class="mainTable"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="80">
                        <template slot-scope="scope">
                            <icon iconClass="ky" class="tab_radio"></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="relationInfo" label="关联信息" :width="120">
                        <template slot-scope="scope">
                            <span><icon iconClass="kh" class="tab_radio"></icon></span>
                            <span><icon iconClass="ks" class="tab_radio"></icon></span>
                        </template>
                    </el-table-column>
                    
                </Ftable>
            </div>
        </div>
    </div>
</template>
<script>
import Ftable from '@/ui/components/Ftable';
import Icon from '@components/Icon-svg/index';
import { intelligenceManageTable,intelligenceManageHeaderTable } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        Ftable
	},
    name: '',
    data() {
        return {
            tableHeaderData:{
                current: 1,
                records: [{}],
                size: 1,
            },
            tableData:{},
            tableConfig:intelligenceManageTable,
            tableHeaderConfig:intelligenceManageHeaderTable,
            params:{
				current: 1,
				size: 10,
			}
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
                this.$router.push({path:'/addAuthorizeManage',query:{type:'add'}});
            }else if(tag == 'edit'){
                this.$router.push({path:'/addAuthorizeManage',query:{type:'edit'}});
            }else{
                this.$router.push({path:'/addAuthorizeManage',query:{type:'info'}});
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
.authorizeManage{
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
        /deep/ .el-table{
           width:1700px;
           border:1px solid rgba(199,204,210,1);
           margin: 0 auto;
        }
        /deep/ .headerTable{
            /deep/ .el-table{
                border-bottom: 0px;
            }
        }
        /deep/ .mainTable{
             /deep/ .el-table{
                border-top: 0px;
            }
            .tab_radio{
                height: 16px;
                width: 16px;
            }
        }
        /deep/ .el-table__header{
            height:40px;
        }
        /deep/ th{
             width: 148px;
             height:40px;
             background:#CFD4DC;
             font-size:14px;
             font-family:PingFangSC-Medium,PingFang SC;
             font-weight:500;
             color:rgba(34,34,34,1);
             text-align: center;
             border-right:solid 1px #C7CCD2;
        }
        /deep/ td{
           width: 148px;
           height:40px;
           text-align: center;
        }
        /deep/.svg-icon{
            height:13.59px;
            width:10.57px;
            margin-right: 4px;
            vertical-align: text-top;
        }
    }
}
</style>
