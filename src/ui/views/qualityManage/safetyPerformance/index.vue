
<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/safetyPerformanceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/safetyPerformanceDetailsAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/safetyPerformanceYear'" :key="$route.path"></router-view>
        <div v-else-if="this.$router.history.current.path == '/safetyPerformance'" class="businessData">
            <div class="top-content">
                <div class="top-content-title">
                    <span>安全绩效</span>
                </div>
                <div class="top-toolbar">
                    <div class="headDiv headDiv1">
                        <div>部门月度安全绩效</div>
                        <div class="left-toolbar">
                            <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                            <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                            <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            <!--<div class="isDisabled" @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>-->
                            <div><icon iconClass="export" ></icon>导出Excel</div>
                        </div>


                    </div>
                    <div class="headDiv headDiv2" >
                        <div>
                            安全绩效明细--维修部2020-2月
                        </div>
                        <div class="right-toolbar">
                            <div @click="rightyear('add')">部门年度安全绩效</div>
                            <div @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                            <div @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                            <div @click="delData('right','rightSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            <div @click="rightAddOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                            <div><icon iconClass="export" ></icon>导出Excel</div>
                        </div>


                    </div>
                </div>
            </div>
            <div class="main-content">
                <SearchTable class="left-main-table" :data="tableLeftData" :tableConfig="businessTableConfig"  refTag="left-table" ref="left-table"  @requestTable="requestTable(arguments[0],'left','left-table')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="HeaderSort(arguments[0], 'left-table','left','leftSort')"     >
                    <el-table-column slot="radio" label="选择" :width="49" >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column slot="option" label="操作" :width="130" >
                        <template slot-scope="{ row }">
                            <span>
                                <el-button class="copyButton">复制绩效明细</el-button>
                            </span>
                          </template>
                    </el-table-column>
                </SearchTable>
                <SearchTable class="right-subset-table" :data="tableRightData" :tableConfig="businessSubsetConfig" refTag="right-table" ref="right-table"   @requestTable="requestTable(arguments[0],'right','right-table')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')" @headerSort="HeaderSort(arguments[0], 'right-table','right','rightSort')"    >
                    <el-table-column slot="radio" label="选择" :width="49"   >
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
    import { safetyConfig,safetyDetailsConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend,map } from 'lodash';
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
                businessTableConfig:safetyConfig(),
                businessSubsetConfig:safetyDetailsConfig(),
                leftParams:{
                    current: 1,
                    size: 18,
                },
                rightParams:{
                    current: 1,
                    size: 18,
                },
                leftRow:{},
                rightRow:{},
                leftForm:{},
                rightForm:{},
                leftSelectId:null,
                rightSelectId:null,
                leftRowState:false,
                leftSort:{},
                rightSort:{}
            };
        },
        created() {
            this.leftParams.current = 1;
            this.getList('left');
        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll,true);//监听函数
        },
        watch:{

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
                this.$refs[tableTag].$refs.body_table.setCurrentRow();

                this.getList(tag);
            },
            //表头排序
            HeaderSort(column,str,tag,sortTag){
                this[sortTag] = {};

                let num =null
                if(column.order=='desc'){
                    num=0
                }else if(column.order=='asc'){
                    num=1
                }else{
                    num=2
                }
                if(num!=2){
                    this[sortTag]['order'] = column.property+','+num;
                }
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
                        this.leftRow={...row}
                    }else{
                        this.leftSelectId = null;
                        this.rightSelectId = null;
                        this.tableRightData.records=[]
                    }
                    this.leftRowState = row.enableMaintain==0?false:true;
                    this.rightParams.current = 1;
                    this.getList('right');
                }else{
                    if(row.selected){
                        this.rightSelectId = row.id;
                        this.rightRow={...row}
                    }else{
                        this.rightSelectId = null;
                    }
                }
                this.$set(this[tableTag].records,row.index,row);
            },
            //左侧表格新增编辑
            addOrEditOrInfo(tag){
                if(tag=='add'){
                    this.$router.push({path:'/safetyPerformanceAdd',query:{type:'add'}});
                }else if(tag == 'edit' || tag=='info'){

                    if(this.leftSelectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        let data=JSON.stringify(this.leftRow)
                        this.$router.push({path:'/safetyPerformanceAdd',query:{type:tag,data:data,id:this.leftSelectId}});
                    }
                }
            },
            //右侧表格新增编辑
            rightyear(tag){
                if(this.leftSelectId==null){
                    this.$message.error('请先选中左侧列表一行数据');
                }else{
                    // let data=JSON.stringify(this.leftRow)
                    this.$router.push({path:'/safetyPerformanceYear',query:{type:'add',id:this.leftSelectId}});
                }
            },
            rightAddOrEditOrInfo(tag){
                if(tag=='add'){
                    if(this.leftSelectId==null){
                        this.$message.error('请先选中左侧列表一行数据');
                    }else{

                        this.$router.push({path:'/safetyPerformanceDetailsAdd',query:{type:'add',id:this.leftSelectId}});

                    }
                }else if(tag == 'edit' || tag=='info'){
                    if(this.rightSelectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        let data=JSON.stringify(this.rightRow)

                        this.$router.push({path:'/safetyPerformanceDetailsAdd',query:{type:tag,data:data,id:this.rightSelectId}});
                    }
                }
            },
            //删除表格行数据
            delData(tag,idstr){
                let url=null
                let method=null
                if(tag=='left'&&this.leftSelectId){
                    // url=`${this.$ip}/qualification/securityMerits/delete/${this.leftSelectId}`
                    url=`http://173.100.1.126:3000/mock/639/securityMerits/delete/{id}`
                    method='delete'
                }else if(tag=='right'&&this.rightSelectId ){
                    // url=`${this.$ip}/qualification/securityMeritsDetail/delete/${this.rightSelectId}`
                    url=`http://173.100.1.126:3000/mock/639/securityMeritsDetail/delete/{id}`
                    method='get'
                }
                if(url){
                    this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            request({
                                url:url,
                                method: method,
                            }).then((data) => {
                                this.$message({type: 'success',message: '删除成功'});
                                if(tag=='left'){
                                    this.leftRow={}
                                    this.rightRow={}
                                    this.leftSelectId=null
                                    this.rightSelectId=null
                                    this.leftParams.current = 1;
                                    this.rightParams.current= 1;
                                    this.tableRightData.records=[]
                                }else{
                                    this.rightSelectId=null
                                    this.rightRow={}
                                    this.rightParams.current= 1;
                                }

                                this.getList(tag);
                            })
                        })
                        .catch(() => {
                            this.$message.info('已取消删除');
                        });
                }else {
                    this.$message.error('请先选中一行数据');
                }

            },

            getList(tag,scroll){
                if(tag=='left'){
                    map(this.leftForm,((k,l)=>{
                        if(!k){
                            this.leftForm[l]=null
                        }
                    }))
                    request({
                        url:`http://173.100.1.126:3000/mock/639/securityMerits/list`,
                        // url:`${this.$ip}/qualification/securityMerits/list`,
                        method: 'post',
                        data:{...this.leftForm,...this.leftSort,...this.leftParams}
                    })
                        .then((data) => {
                             if(this.leftParams.current==1){
                                this.tableLeftData.records = data.data;
                            }else{
                                this.tableLeftData.records.push.apply(this.tableLeftData.records,data.data);
                            }
                            if(scroll && data.data.items.length==0){
                                this.leftParams.current = --this.leftParams.current;
                            }
                        }).catch((error) => {

                    });
                }else{
                    if(this.leftSelectId!=null){
                        map(this.rightForm,((k,l)=>{
                            if(!k){
                                this.rightForm[l]=null
                            }
                        }))
                        request({
                            url:`http://173.100.1.126:3000/mock/639/securityMeritsDetail/list`,
                            // url:`${this.$ip}/qualification/securityMeritsDetail/list`,
                            method: 'post',
                            data:{...this.rightForm,dicId:this.leftSelectId,...this.rightSort,...this.rightParams}
                        })
                            .then((data) => {
                                if(this.rightParams.current==1){
                                    this.tableRightData.records = data.data;
                                }else{
                                    this.tableRightData.records.push.apply(this.tableRightData.records,data.data);
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
                .headDiv{
                    display: flex;justify-content: space-between;
                    align-items: center;
                    &>div:first-child{
                        font-size: 16px;
                    }
                }
                .headDiv1{
                    width:562px;
                }
                .headDiv2{
                    width:1096px;
                }
                .left-toolbar{
                    text-align: right;
                }
                .right-toolbar{
                    text-align: right;
                }
            }
        }
        .main-content{
            padding: 0px 30px 0px 30px;
            display: flex;
            justify-content: space-between;
            /deep/ .left-main-table{
                width:562px;
                /deep/ .el-table{
                    width:562px;
                }
                /deep/ .el-table_2_column_14{
                   /deep/  .cell{
                        padding: 2px!important;
                    }
                }
                .copyButton{
                    padding:7px 10px;
                    background: black;
                    color:white;
                }
            }
            /deep/ .right-subset-table{
                width:1096px;
                /deep/ .el-table{
                    width:1096px;
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

