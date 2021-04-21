<template>
    <div>
        <div   class="G_listOne"  >
            <div class="QCenterRight personTable">
                <div class="QHead QHead1">
                    不安全事件及诚信记录
                </div>
                <div class="QheadRight">
                    <div v-if="showButton"  @click="()=>type=='edit'?addOrEditOrInfo('add'):''" :class="type=='edit'?'':'G_isDisabled'">
                        <el-tooltip class="item" effect="dark" :enterable="false" content="新增" placement="top">
                            <icon iconClass="add"></icon>
                        </el-tooltip>
                    </div>
                    <div v-if="showButton"  @click="()=>type=='edit'?addOrEditOrInfo('edit'):''" :class="type=='edit'?'':'G_isDisabled'">
                        <el-tooltip class="item" effect="dark" :enterable="false" content="编辑" placement="top">
                            <icon iconClass="edit"></icon>
                        </el-tooltip>
                    </div>
                    <div  v-if="showButton"  @click="()=>type=='edit'?delData():''" :class="type=='edit'?'':'G_isDisabled'">
                        <el-tooltip class="item" effect="dark" :enterable="false" content="删除" placement="top">
                            <icon iconClass="remove" ></icon>
                        </el-tooltip>
                    </div>
                    <div @click="()=>type!='add'?addOrEditOrInfo('info'):''" :class="type=='edit'||type=='info'?'':'G_isDisabled'">
                        <el-tooltip class="item" effect="dark" :enterable="false" content="详情" placement="top">
                            <icon iconClass="info" ></icon>
                        </el-tooltip>
                    </div>
                </div>
            </div>
            <div class="tableOneBox">
                <SearchTable :noSearch="true" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
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
import { inOfficeInfoConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: '',
    props:['type','id','tableData','userId'],
    data() {
        return {
            tableConfig:inOfficeInfoConfig({},{}),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            unsafeTypeObj:{},
            row:{},
            sort:{},

            selectId:null
        };
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('ZLGLZDGLY')
        },
        showButton(){
            console.log(this.isZDRole, this.type == 'edit');
            return this.isZDRole&&this.type=='edit'
        }  ,
    },
   created() {
        if(this.unsafeType){

        }
       if(this.$route.path=='/addPersonDoc'){
           request({
               url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
               method: 'post',
               params:{delete:false},
               data:["unsafeType"]
           }).then(d => {
               let obj=d.data
               this.options=obj
               this.options.unsafeType.map((k,l)=>{
                   this.unsafeTypeObj[k.valCode]=k.valData
               })
               this.tableConfig=inOfficeInfoConfig({},this.unsafeTypeObj)
           });
        }

    },

    methods: {
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null;
            this.tableData=[];
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort={}
            let num =null
            if(column.order=='desc'){
                num=0
            }else if(column.order=='asc'){
                num=1
            }else{
                num=2
            }
            if(num!=2){
                this.sort['order'] = column.property+','+num;
            }

            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
            console.log(column.property,column.order, this.sort,11);
            this.getList();
        },
        listenToCheckedChange(row, column, event){

            let select = row.selected;
            this.tableData.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
            })
            row.selected  = !select;
            if(row.selected ){
                this.selectId = row.id;
            }else {
                this.selectId   = null;
            }
             this.row = row;
            this.params.current = 1;
            console.log(row, column, event,199);
            this.$set(this.tableData,row.index,row);
        },
        addOrEditOrInfo(tag){
            let p='/unsafeAdd/'+tag
            if(tag=='info'){
                p='/infounsafeAdd'
            }
            if(this.$route.path=='/infoaddPersonDoc'){
                p='/infounsafeAdd1'
            }
            if(this.$route.path=='/ZuserDoc'){
                p='/ZunsafeAdd'
            }else if(this.$route.path=='/SuserDoc'){
                p='/SunsafeAdd'
            }
              if(tag=='add'){
                this.$router.push({path:p,query:{type:'add',rId:this.id+','+this.type+','+this.userId}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:p,query:{type:tag,rId:this.id+','+this.type+','+this.userId,id:this.selectId}});
                }
            }
        },
        delData(){
            if(this.selectId==null){
                this.$message.error('请先选中一行数据');
            }else{
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        request({
                             url:`${this.$ip}/mms-qualification/sincerityInf/delete/`+this.selectId,
                            method: 'delete',
                         })
                            .then((data) => {
                               if(data.code==200){
                                   this.$emit('getInfo')
                                   this.selectId   = null;
                                   this.$message({type: 'success',message: '删除成功'});
                               }
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });            }

        },
        getList(){
            let data={...this.form}
            map(data,((k,l)=>{
                if(!k){
                    data[l]=null
                }
            }))
           request({
                url:`${this.$ip}/mms-training/examInfo/list`,
                 method: 'post',
                data:{...this.sort,...data},
               params:{...this.params,}
            })
            .then((data) => {
                if(data.code==200){
                    this.tableData = extend({}, {...data.data});
                }



             })
        },
        handleSizeChange(size) {
            this.params.current = 1;
			this.params.size = size;
            this.getList();
		},
		handleCurrentChange(current) {
			this.params.current = current;
            this.getList();
		},
		handleCheckedChange() {},
		handleSelectionChange() {},
    },
};
</script>
<style scoped lang="scss">
    .tableOneBox /deep/ .mainTable{
        height:300px !important;
        overflow: auto;
    }
</style>
