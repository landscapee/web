<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addInfoPlate'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/infoPlateDetails'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/historyInfoPlate'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/infoPlate'" class="sysParameter">
            <div class="top-content">
                <div class="top-left-toolbar">
                    <span :class="isActive==index?'isActive':''" @click="switchTable(index)" v-for="(name,index) in ['发布信息','接收信息']" :key="index">{{name}}</span>
                </div>
                <div class="top-content-title">
                    <span>{{this.isActive==0?'发布信息':'接收信息'}}</span>
                </div>
                <div class="top-toolbar">
                    <div :class="isActive==0?'isDisabled':''" @click="isActive==0?()=>{}:addOrEditOrInfo('history')"><icon iconClass="history" ></icon>历史</div>
                    <div :class="isActive!=0?'isDisabled':''" @click="isActive==0?addOrEditOrInfo('add'):()=>{}"><icon iconClass="add" ></icon>新增</div>
                    <div :class="isActive!=0?'isDisabled':''" @click="isActive==0?addOrEditOrInfo('edit'):()=>{}"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                    <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
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
                    <el-table-column slot="attachment" label="附件"  align="center" >
                        <template slot-scope="{ row }">
                            <el-button @click="downloadFile(row)" size="mini">下载</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column slot="relationInfo" label="关联信息" :width="148" align="center" >
                        <template slot-scope="{ row }">
                             <el-button size="mini" @click="clickAction('release',row.id)" v-if="isActive==0 && row.state==0">发布</el-button>
                             <el-button size="mini" @click="clickAction('receive',row.id)" v-if="isActive==1 && row.state==0">接收处理</el-button>
                             <el-button size="mini" @click="clickAction('close',row.id)" v-if="isActive==1 && row.state==1">关闭</el-button>
                        </template>
                    </el-table-column>
                </SearchTable>
            </div>
        </div>
        <Download ref="downloadFile"></Download>
    </div>
</template>
<script>
import Download from '@/ui/components/download';
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { infoPlateReceiveTable,infoPlateSendTable } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
import postal from 'postal';
export default {
    components: {
        Icon,
        SearchTable,
        Download
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:infoPlateSendTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            selectId:null,
            isActive:0,
            selectRow:{},
            infoSelect:[]
        };
    },
   created() {
       this.findDataDictionary();
      
    },
    mounted(){
        this.$eventBus.$on('infoPlate', msg => {
            if(msg == 'receive'){
                this.switchTable(1);
            }
        });
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
        downloadFile(row){
            this.$refs.downloadFile.open();
        },
        findDataDictionary(){
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: "post",
                data: ["infoTypeCode"]
            })
            .then(data => {
              this.infoSelect = data.data["infoTypeCode"];
              this.tableConfig = infoPlateSendTable(this.infoSelect);
               if(this.$route.query && this.$route.query.type=='receive'){
                    this.switchTable(1);
                }else{
                    this.getList();
                }
            })
            .catch(error => {
             this.$message.success(error);
            });
        },
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
        clickAction(action,id){
            let url = "";
            if(action=='release'){
                url =`${this.$ip}/mms-notice/notificationPublish/publish/${id}` ;
            }else if(action=='receive'){
                url =`${this.$ip}/mms-notice/notificationRecipient/handle/${id}` ;
            }else if(action=='close'){
                url =`${this.$ip}/mms-notice/notificationRecipient/close/${id}`  ;
            }
            request({url,method: 'get'}).then((data) => {
                if(action=='release'){
                    this.$message.success('发布成功');
                }else if(action=='receive'){
                    this.$message.success('处理成功');
                }else if(action=='close'){
                    this.$message.success('关闭成功');
                }
                this.findUnread();
                this.selectId=null,
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.params.current = 1;
                this.getList();
            }).catch((error) => {
            
            });
        },
        switchTable(index){
            this.isActive = index;
            if(index==0){
                this.tableConfig = infoPlateSendTable(this.infoSelect);
            }else{
                this.tableConfig = infoPlateReceiveTable(this.infoSelect);
            }
            this.getList();
        },
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null,
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort = {};
            this.sort[column.property] = column.order;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
            this.getList();
        },
        listenToCheckedChange(row, column, event){
            this.selectRow = row;
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
                this.$router.push({path:'/addInfoPlate',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info' ||  tag == 'history' ){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    if(tag == 'history'){
                        if(this.selectRow.state!=-1){
                            this.$message.error('该数据暂无历史');
                        }else{
                            this.$router.push({path:'/historyInfoPlate',query:{type:tag,id:this.selectId,tag:this.isActive==0?'send':'receive'}});
                        }
                    }else if(tag == 'info'){
                        this.$router.push({path:'/infoPlateDetails',query:{type:tag,id:this.selectId,tag:this.isActive==0?'send':'receive'}});
                    }else{
                        this.$router.push({path:'/addInfoPlate',query:{type:tag,id:this.selectId}});
                    }
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
                        url:this.isActive==0?`${this.$ip}/mms-notice/notificationPublish/delete/${this.selectId}`:`${this.$ip}/mms-notice/notificationRecipient/delete/${this.selectId}`, 
                        method: 'delete',
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
            request({
                url:this.isActive==0?`${this.$ip}/mms-notice/notificationPublish/list`:`${this.$ip}/mms-notice/notificationRecipient/list`, 
                method: 'post',
                data:this.isActive==0?{...this.sort,...this.form}:{...this.sort,...this.form,state:[0,1]},
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
            overflow: auto;
        }    
    }
}
</style>
