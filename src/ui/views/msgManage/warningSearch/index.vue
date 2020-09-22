<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/historyWarning'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/warningSearch'" class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>预警查询</span>
                </div>
                <div class="top-toolbar">
                    <div @click="addOrEditOrInfo()"><icon iconClass="history" ></icon>历史</div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="relationInfo" align='center' :width="148" >
                        <template slot-scope="{ row }" v-if="row.state==0">
                            <el-button size="mini" @click="clickAction(row)">已读</el-button>
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
import { warningSearchTable } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
import postal from 'postal';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:warningSearchTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{state:0},
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
         findUnread(){
			request({
				url:`${this.$ip}/mms-notice/notificationRecipient/countUndo`,
				method: 'get',
			})
			.then((data) => {
				postal.publish({
					channel: 'websocket_count',
					topic: 'count',
					data: data.data
				});
			}).catch((error) => {

			});
		},
        clickAction(row){
            request({
                url:`${this.$ip}/mms-warning/warning/read/${row.id}`,
                method: 'get',
            })
            .then((data) => {
                this.$message.success("已读成功！");
                this.findUnread();
                this.getList();
            }).catch((error) => {

            });
        },
        requestTable(searchData){
            this.form = searchData;
            this.form.state = 0;
            this.selectId=null,
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
           this.$router.push({path:'/historyWarning',query:{id:this.selectId}});
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
