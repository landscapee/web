<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addInfoPlate'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/infoPlateDetails'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/historyInfoPlate'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/infoPlate'" class="QCenterRight G_listOne">
            <div  >

                <div class="QHead">
                   {{this.isActive==0?'发布信息':'接收信息'}}
                </div>
                <div class="QheadRight">
                    <div :class="isActive==0?'isDisabled':''" @click="isActive==0?()=>{}:addOrEditOrInfo('history')"><icon iconClass="history" ></icon>历史</div>
                    <div :class="isActive!=0?'isDisabled':''" @click="isActive==0?addOrEditOrInfo('add'):()=>{}"><icon iconClass="add" ></icon>新增</div>
                    <div :class="isActive!=0?'isDisabled':''" @click="isActive==0?addOrEditOrInfo('edit'):()=>{}"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                </div>
            </div>
            <div class="top-left-toolbar">
                <span :class="isActive==index?'isActive':''" @click="switchTable(index)" v-for="(name,index) in ['发布信息','接收信息']" :key="index">{{name}}</span>
            </div>
            <div class="tableOneBox">
                <SearchTable :key="isActive" ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="attachment" label="附件"  align="center" :width="70">
                        <template slot-scope="{ row }">
                            <span @click="(row.fileInfoList&&row.fileInfoList.length)?downloadFile(row):''" :class="(row.fileInfoList&&row.fileInfoList.length)?'rowSvg':'rowSvg rowSvgInfo'">
                                <el-tooltip class="item" effect="dark" :enterable="false" content="下载" placement="top">
                                    <icon iconClass="downloadNew"  ></icon>
                                </el-tooltip>
                            </span>
                        </template>
                    </el-table-column>
                    <el-table-column slot="relationInfo" label="关联信息" :width="80" align="center" >
                        <template slot-scope="{ row }">
                            <el-tooltip class="item" effect="dark" :enterable="false" content="发布" placement="top">
                               <span @click="clickAction('release',row.id)" v-if="isActive==0 && row.state==0" class="rowSvg" >
                                    <icon iconClass="publish"  ></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="接收处理" placement="top">
                                <span @click="clickAction('receive',row.id)" v-if="isActive==1 && row.state==0" class="rowSvg">
                                        <icon iconClass="receiveHandle"  ></icon>
                                </span>
                            </el-tooltip>
                            <el-tooltip class="item" effect="dark" :enterable="false" content="关闭" placement="top">
                               <span @click="clickAction('close',row.id)" v-if="isActive==1 && row.state==1" class="rowSvg" >
                                    <icon iconClass="nopass"  ></icon>
                                </span>
                            </el-tooltip>
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
            if(row.fileInfoList){
                this.$refs.downloadFile.open(row.fileInfoList);
            }else{
                this.$message.warning("暂无文件可以下载");
            }
        },
        findDataDictionary(){
            console.log("index findDataDictionary")
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: "post",
                data: ["infoType"]
            })
            .then(data => {
              this.infoSelect = data.data["infoType"];
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
            this.tableData = {records:[]};
            this.params.current = 1;
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
            // this.params.current = 1;
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addInfoPlate',query:{type:'add'}});
            }else if(tag == 'history' ){
                 this.$router.push({path:'/historyInfoPlate'});
            }else if(tag == 'edit' || tag == 'info'  ){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                   if(tag == 'info'){
                        this.$router.push({path:'/infoPlateDetails',query:{type:tag,id:this.selectId,tag:this.isActive==0?'send':'receive'}});
                    }else{
                       if (this.selectRow.state === 1) {
                           this.$message.info("信息已发布，无法编辑！")
                       } else {
                           this.$router.push({path: '/addInfoPlate', query: {type: tag, id: this.selectId}});
                       }
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
                data:this.isActive==0?{...this.sort,...this.form}:{...this.sort,...this.form,states:[0,1]},
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
    .G_listOne{
        /deep/ .mainTable{
            height:calc(100vh - 380px) !important;
            overflow: auto;
        }
    }

    .mainTable{
        height:calc(100vh - 500px) !important;
        overflow: auto;
    }
    .top-left-toolbar{
        .isActive{
            color: #fff;
            background-color: #3280e7;
        }
        span{
            display: inline-block;
            padding: 0px 10px;
            height: 32px;
            line-height: 32px;
            text-align: center;
            color: #3280e7;
            background-color: #fff;
            cursor: pointer;
        }
        span:first-child{
            border-radius: 3px 0 0 3px;
            border: solid 1px #3280e7;
        }
        span:last-child{
            border-radius: 0 3px 3px 0;
            border: solid 1px #3280e7;
        }
    }
</style>
