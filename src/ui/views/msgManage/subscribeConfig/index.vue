<template>
    <div>
        <router-view v-if="this.$route.path == '/addSubscribeConfig'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/editSubscribeConfig'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == '/infoSubscribeConfig'" :key="$route.path"></router-view>
        <div v-else-if="this.$route.path == '/subscribeConfig'" class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    信息订阅配置
                </div>
                <div class="QheadRight">
                    <div v-if="isZDRole" @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div v-if="isZDRole"  @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div  v-if="isZDRole" @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>

                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"  :data="tableData" :tableConfig="tableConfig"  :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
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
import { subscribeConfigTable } from '../tableConfig.js';
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
            tableData:{records:[]},
            tableConfig:subscribeConfigTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            selectId:null,
        };
    },
   created() {
       this.findDataDictionary();
       this.getList();
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('XXGLZDGLY')
        },
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
        findDataDictionary(){
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: "post",
                data: ["infoTypeCode"]
            })
            .then(data => {
              let infoSelect = data.data["infoTypeCode"];
              this.tableConfig = subscribeConfigTable(infoSelect);
            })
            .catch(error => {
             this.$message.success(error);
            });
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
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addSubscribeConfig',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                let p='/'+tag+'SubscribeConfig'
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:p,query:{type:tag,id:this.selectId}});
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
                        url:`${this.$ip}/mms-notice/notificationSubscribe/delete/${this.selectId}`,
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
                url:`${this.$ip}/mms-notice/notificationSubscribe/list`,
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

</style>
