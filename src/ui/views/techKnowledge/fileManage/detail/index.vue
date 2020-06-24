<template>
    <div class='index'>
        <div class='inner'>
            <div class='top_content'>
                <div class='header'><span>工单</span></div>
            
                <div class="top-toolbar">
                    <div class="left-toolbar">
                        <!-- <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                        <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                        <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                        <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div> -->
                    </div>
                    <div class="right-toolbar">
                        <div @click="rightMethods"><icon iconClass="add" ></icon>下载</div>
                        <div @click="rightMethods"><icon iconClass="edit" ></icon>移动到</div>
                        <div @click="rightMethods"><icon iconClass="remove" ></icon>批量推送</div>
                        <div @click="rightMethods"><icon iconClass="info" ></icon>新增</div>
                        <div @click="rightMethods"><icon iconClass="save" ></icon>编辑</div>
                        <div @click="rightMethods"><icon iconClass="reset" ></icon>删除</div>
                        <div @click="rightMethods"><icon iconClass="reset" ></icon>详情</div>
                        <div @click="rightMethods"><icon iconClass="reset" ></icon>到处Excel</div>
                    </div>
                </div>
            </div>
             <div class="main-content">
                <SearchTable
                    refTag="searchTable" 
                    ref="searchTable"  
                    @requestTable="requestTable(arguments[0])"   
                    @listenToCheckedChange="listenToCheckedChange(arguments[0])" 
                    @headerSort="HeaderSort(arguments[0])"   
                    :data="tableLeftData" 
                    :tableConfig="businessTableConfig"   
                >
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
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
import Icon from '@components/Icon-svg/index';
import { sysParameterTable } from '../tableConfig.js';
import SearchTable from '@/ui/components/SearchTable';
export default {
    components: {
       Icon,
       SearchTable
	},
    data() {
        return {
            businessTableConfig: sysParameterTable(),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            sort:{},
            tableLeftData:{records:[]},
        };
    },
    methods:{
        rightMethods(){

        },
        getList(){
           request({
                url:`${this.$ip}/mms-parameter/rest-api/sysParam/query`, 
                method: 'post',
                data:{...this.params,...this.sort,...this.form}
            })
            .then((data) => {
                if(this.params.current==1){
                    this.tableData = {records: data.data.items,current:1,size:this.params.size,total:data.data.total}
                }else{
                    this.tableData = {records: data.data.items,...this.params,total:data.data.total}
                }
            }).catch((error) => {
            
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
            this.sort[column.property] = column.order;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
            this.getList();
        },
        //表格选中事件
        listenToCheckedChange(row,tag,tableTag){
            let select = row.selected;
            this[tableTag].records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
            })
            row.selected  = !select;
            if(tag=="left"){
                if(row.selected){
                    this.leftSelectId = row.id;
                }else{
                    this.leftSelectId = null;
                }
                this.leftRowState = row.enableMaintain==0?false:true;
                this.rightParams.current = 1;
                this.getList('right');
            }else{
                if(row.selected){
                    this.rightSelectId = row.id;
                }else{
                    this.rightSelectId = null;
                }
            }
            this.$set(this[tableTag].records,row.index,row);
        },
    },
    watch: {
    },
   
}
</script>
<style scoped lang="scss">
@import "@/ui/views/basicData/businessData/assets/styles/businessData.scss"; 
.index{
    .inner{
        .top_content{
            padding-top: 20px;
            position: relative;
            padding-bottom: 20px;
            .header{
                margin: 0 auto;
                margin-bottom: 30px;
                width: 271px;
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
                padding: 0px 30px 0px 30px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .left-toolbar{
                    width:837px;
                    text-align: right;
                }
                .right-toolbar{
                    width:824px;
                    text-align: right;
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
                            margin-right: 0px;
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
        }
        .main-content{
            padding: 0px 30px 0px 30px;
            display: flex;
            justify-content: space-between;
            /deep/ .mainTable{
                height: 600px;
                overflow: auto;
                // /deep/ .el-table__body-wrapper{
                //     /deep/ tr:last-child{
                //         td{
                //             border-bottom:0px;
                //         }
                //     }
                // }
            }    
        }
    }
    
}
</style>
 
