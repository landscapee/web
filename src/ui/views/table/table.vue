<template>
        <Ftable class="index_table" ref="ftable"  :data="tableData" :tableConfig="tableConfig"  @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange" @listenToCheckedChange="handleCheckedChange" @listenToSelectionChange="handleSelectionChange">
            <el-table-column slot="option" :width="400" fixed="right" label="操作" align="center">
                <span slot-scope="{ row }">
                    <el-button class="option-item" @click="showInfo(row, 'query')">详情</el-button>
                    <el-button class="option-item" @click="editData(row, 'query')" >编辑</el-button>
                    <el-button class="option-item" @click="delData(row.id)">删除</el-button>
                    <el-button   style="padding:0px;" >
                        <template>
                            <el-dropdown trigger="click" @command="handleCommand">
                                <span class="el-dropdown-link" >更多</span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item  :command="beforeHandleCommand(row, 'b')">迁移</el-dropdown-item>
                                    <el-dropdown-item  :command="beforeHandleCommand(row, 'a')">绑定角色</el-dropdown-item>
                                    <el-dropdown-item  :command="beforeHandleCommand(row, 'c')">修改密码</el-dropdown-item>
                                    <el-dropdown-item  :command="beforeHandleCommand(row, 'd')">资质</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </template>
                    </el-button>
                </span>
            </el-table-column>
        </Ftable>
</template>
<script>
import Ftable from '@/ui/components/Ftable';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    data(){
        return {
            tableData:[],
            tableConfig: [
                { type: 'index', prop: 'aa', label: '序号', align: 'center' },
                { prop: 'number', width: '189', label: '物资编号', align: 'center' },
                { prop: 'assetsNumber', label: '资产编号', align: 'center' },
                { prop: 'name', width: '175', label: '物资名称', align: 'center' },
                {
                    prop: 'categoryBig',
                    label: '物资大类-小类',
                    align: 'center',
                    formatter: function(row) {
                        return row.categoryBig + '-' + row.categorySmall;
                    },
                },
                { prop: 'vehicleNumber', label: '车牌号', align: 'center' },
                { prop: 'brand', label: '车辆品牌', align: 'center' },
                { prop: 'vehicleModel', label: '规格型号', align: 'center' },
                { prop: 'deptName', label: '归属部门', align: 'center' },
                { prop: 'responsibleName', label: '责任人', align: 'center' },
                { prop: 'updateMileage', label: '当前里程（km）', align: 'center' },
                // { slot: 'qrCode' },
                { slot: 'option' },
            ],
            params:{
				current: 1,
				size: 10,
			}
        }
    },
    components: {
        Ftable
    },
    watch:{
        params:{
            handler:function(val,oldval){
                this.getList();
            },
            deep:true//对象内部的属性监听，也叫深度监听
        }
    },
    created() {
       this.getList();
    },
    mounted(){
        
    },
    methods: {
        beforeHandleCommand(row, command) {
			return {
				row: row,
				command: command,
			};
		},
		handleCommand(command) {
			switch (command.command) {
				case 'a': // 绑定角色
					
					break;
				case 'b': // 迁移
					
					break;
				case 'c': // 修改密码
				
					break;
				case 'd': // 资质管理（飞行区需求）
					
					break;
			}
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
        showInfo(){

        },
        editData(){

        },
        delData(){

        }
    },
}
</script>
<style lang="scss" >
.index_table{
    height:800px;
}
.el-dropdown-link {
    display: inline-block;
    padding: 0.12rem 0.2rem;
}
</style>