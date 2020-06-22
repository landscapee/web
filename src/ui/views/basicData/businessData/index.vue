<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/editBusinessData'" :key="$route.path"></router-view>
        <router-view v-if="this.$router.history.current.path == '/editBusinessSubset'" :key="$route.path"></router-view>
        <div v-if="this.$router.history.current.path == '/businessData'" class="businessData">
            <div class="top-content">
                <div class="top-content-title">
                    <span>业务数据类型及业务数据</span>
                </div>
                <div class="top-toolbar">
                    <div class="left-toolbar">
                        <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                        <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                        <!-- <div><icon iconClass="export" ></icon>导出Excel</div> -->
                        <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                        <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                    </div>
                    <div class="right-toolbar">
                        <div @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                        <div @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                        <div @click="delData('right','rightSelectId')"><icon iconClass="remove" ></icon>删除</div>
                        <div @click="rightAddOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                        
                        <div class="isDisabled"><icon iconClass="save" ></icon>保存</div>
                        <div class="isDisabled"><icon iconClass="reset" ></icon>重置</div>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable class="left-main-table" refTag="left-table" ref="left-table"  @requestTable="requestTable(arguments[0],'left','left-table')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="HeaderSort(arguments[0], 'left-table','left','leftSort')"   :data="tableLeftData" :tableConfig="businessTableConfig"   >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                </SearchTable>
                <SearchTable class="right-subset-table" refTag="right-table" ref="right-table"   @requestTable="requestTable(arguments[0],'right','right-table')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')" @headerSort="HeaderSort(arguments[0], 'right-table','right','rightSort')"   :data="tableRightData" :tableConfig="businessSubsetConfig" >
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
import { businessDataTable,businessSubsetTable } from '../tableConfig.js';
import request from '@lib/axios.js';
import {  extend } from 'lodash';
export default {
    components: {
        Icon,
        SearchTable,
	},
    name: '',
    data() {
        return {
            tableLeftData:{records:[]},
            tableRightData:{records:[]},
            businessTableConfig:businessDataTable(),
            businessSubsetConfig:businessSubsetTable(),
            leftParams:{
				current: 1,
				size: 18,
            },
            rightParams:{
				current: 1,
				size: 18,
            },
            leftForm:{},
            rightForm:{},
            leftSelectId:null,
            rightSelectId:null,
            leftRowState:false,
            leftSort:{},
            rightSort:{},
            scroll:0
        };
    },
    watch:{

    },
    created() {
        this.leftParams.current = 1;
        this.getList('left');
    },
　　mounted() {
       this.$eventBus.$on('updatedata', msg => {
            if(msg == 'left'){
                this.leftParams.current = 1;
                this.getList('left');
            }else if(msg == 'right'){
                this.rightParams.current = 1;
                this.getList('right');
            }
       });
       window.addEventListener('scroll', this.handleScroll,true);//监听函数
    },
    methods: {
        //监听滚动
        handleScroll($event){
            // 获取滚动条的dom
            var bady = $event.target;   
　　　　　　 // 获取距离顶部的距离
            var scrollTop = bady.scrollTop;
            // 获取可视区的高度
            var windowHeight = bady.clientHeight;
            // 获取滚动条的总高度
            var scrollHeight = bady.scrollHeight;
            //获取滚动元素标识
            var tag = bady.parentElement.__vue__.refTag;
            this.scroll = scrollTop;
            if(scrollTop+windowHeight>=scrollHeight){
                if(tag=='left-table'){
                    this.leftParams.current = ++this.leftParams.current ;
                    this.getList('left','scroll');
                }else{
                    this.rightParams.current = ++this.rightParams.current ;
                    this.getList('right','scroll');
                }
            }
        },
        //查询表头数据
        requestTable(searchData,tag,tableTag){
            if(tag=='left'){
                this.leftForm = searchData;
                this.leftSelectId=null,
                this.rightSelectId=null,
                this.leftRowState=false,
                this.tableRightData={records:[]};
                this.leftParams.current = 1;
            }else{
                this.rightForm = searchData;
                this.rightSelectId=null;
                this.rightParams.current = 1;
            }
            this.leftSelectId
           this.$refs[tableTag].$refs.body_table.setCurrentRow();
         
           this.getList(tag);
        },
        //表头排序
        HeaderSort(column,str,tag,sortTag){
            this[sortTag] = {};
            this[sortTag][column.property] = column.order;
            if(tag=='left'){
                this.$refs[str].$refs.body_table.setCurrentRow();
                this.leftParams.current = 1;
            }else{
                this.rightParams.current = 1;
            }
            this.getList(tag);
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
        //左侧表格新增编辑
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/editBusinessData',query:{type:'add'}});
            }else if(tag == 'edit' || tag=='info'){
                if(this.leftSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/editBusinessData',query:{type:tag,id:this.leftSelectId}});
                }
            }
        },
        //右侧表格新增编辑
        rightAddOrEditOrInfo(tag){
            if(tag=='add'){
                if(this.leftSelectId==null){
                   this.$message.error('请先选中左侧列表一行数据');
                }else{
                    if(!this.leftRowState){
                         this.$message.error('当前运行状态为不可维护');
                    }else{
                         this.$router.push({path:'/editBusinessSubset',query:{type:'add',id:this.leftSelectId}});
                    }
                }
            }else if(tag == 'edit' || tag=='info'){
                if(this.rightSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$router.push({path:'/editBusinessSubset',query:{type:tag,id:this.rightSelectId}});
                }
            }
        },
        //删除表格行数据
        delData(tag,idstr){
            this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
				confirmButtonText: '确定',
				cancelButtonText: '取消',
				type: 'warning',
			})
            .then(() => {
                request({
                    url:tag=='left'?`${this.$ip}/mms-parameter/rest-api/businessDictionary/del`:`${this.$ip}/mms-parameter/rest-api/businessDictionaryValue/del`, 
                    method: 'post',
                    data:{id:this[idstr]}
                })
                .then((data) => {
                   this.$message({type: 'success',message: '删除成功'});
                   if(tag=='left'){
                       this.leftParams.current = 1;
                   }else{
                       this.rightParams.current= 1;
                   }
                 
                   this.getList(tag);
                })
            })
            .catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除',
                });
            });
        },
        getList(tag,scroll){
            if(tag=='left'){
                request({
                    url:`${this.$ip}/mms-parameter/rest-api/businessDictionary/query`, 
                    method: 'post',
                    data:{...this.leftForm,...this.leftSort,...this.leftParams}
                })
                .then((data) => {
                    if(this.leftParams.current==1){
                        this.tableLeftData.records = data.data.items;
                    }else{
                        this.tableLeftData.records.push.apply(this.tableLeftData.records,data.data.items);
                    }
                    if(scroll && data.data.items.length==0){
                       this.leftParams.current = --this.leftParams.current;
                    }
                }).catch((error) => {
             
                });
            }else{
                if(this.leftSelectId!=null){
                    request({
                        url:`${this.$ip}/mms-parameter/rest-api/businessDictionaryValue/query`, 
                        method: 'post',
                        data:{...this.rightForm,dicId:this.leftSelectId,...this.rightSort,...this.rightParams}
                    })
                    .then((data) => {
                        if(this.rightParams.current==1){
                            this.tableRightData.records = data.data.items;
                        }else{
                            this.tableRightData.records.push.apply(this.tableRightData.records,data.data.items);
                        }
                        if(scroll && data.data.items.length==0){
                            this.rightParams.current = --this.rightParams.current;
                        }
                    }).catch((error) => {
                
                    });
                }
            }
        },
    },
};
</script>
<style scoped lang="scss">
@import "@/ui/views/basicData/businessData/assets/styles/businessData.scss"; 
.businessData{
    margin-top:40px;
    .top-content{
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
            }
        }
    }
    .main-content{
        padding: 0px 30px 0px 30px;
        display: flex;
        justify-content: space-between;
         /deep/ .left-main-table{
            width:837px;
            /deep/ .el-table{
                width:837px;
            }
        }
        /deep/ .right-subset-table{
            width:824px;
            /deep/ .el-table{
                width:824px;
            }
        }
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
</style>
