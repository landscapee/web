
<template>
    <div>
          <router-view v-if="this.$router.history.current.path == '/safetyPerformanceAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/safetyPerformanceDetailsAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/safetyPerformanceYear'" :key="$route.path"></router-view>
        <div v-else-if="this.$router.history.current.path == '/safetyPerformance'" class="businessData">
            <div class="top-content">
                <div class="top-content-title">
                    <span style="font-weight: 500;color:rgba(51,51,51,1)">安全绩效</span>
                </div>
                <div class="top-toolbar">
                    <div class="headDiv headDiv1">
                        <div style="font-weight: bold; " >部门月度安全绩效</div>
                        <div class="left-toolbar">
                            <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                            <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                            <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>

                            <div @click="exportExcel()">
                                  <icon iconClass="export" ></icon>导出
                              </div>


                        </div>


                    </div>
                    <div class="headDiv headDiv2" >
                        <div>
                            <span style="font-weight: bold; font-size: 16px"  >安全绩效明细</span>
                            <span v-if="leftRow.year" style="font-weight:400;color:rgba(136,136,136,1);font-size: 16px" >&nbsp;&nbsp;{{leftRow.deptName}}&nbsp;{{leftRow.year}}年-{{leftRow.month}}月</span>

                        </div>
                        <div class="right-toolbar">
                             <div @click="rightyear('add')"><icon  style="width: 0!important;" iconClass=""></icon>部门年度安全绩效</div>
                            <div @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                            <div @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                            <div @click="delData('right','rightSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            <div @click="rightAddOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
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
                    <el-table-column slot="option" label="操作" align="center" :width="80" >
                        <template slot-scope="{ row }" >
                                <span style="padding:2px  " class="rowSvg"  @click="row.copy?'':copyDetails(row)" :class="row.copy?'G_isDisabled':''" >
                                    <icon iconClass="copyjx" title="复制绩效明细" ></icon>
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
        <CopyDetails ref="CopyDetails" @getList="getList('left')"></CopyDetails>

    </div>
</template>
<script>
    import CopyDetails from './copyDetails'
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { safetyConfig,safetyDetailsConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend,map } from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,
            CopyDetails,
        },
        name: '',
        data() {
            return {
                tableLeftData:{records:[]},
                tableRightData:{records:[]},
                businessTableConfig:safetyConfig({}),
                businessSubsetConfig:safetyDetailsConfig({}),
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
                 leftSort:{},
                rightSort:{}
            };
        },
        watch:{
            '$route':function(val,nm){
                 console.log(1,val.path,nm.path);
                if(val.path=='/safetyPerformance'&&nm.path=='/safetyPerformanceAdd'){
                     this.leftParams.size=this.tableLeftData.records.length>18?this.tableLeftData.records.length:18
                    this.leftParams.current=1
                    this.getList('left');
                }else if(val.path=='/safetyPerformance'&&nm.path=='/safetyPerformanceDetailsAdd'){
                    this.rightParams.size=this.tableRightData.records.length>18?this.tableRightData.records.length:18
                    this.rightParams.current = 1
                    this.getList('right');
                }else if(val.path=='/safetyPerformance'){
                    this.leftParams.size=18;
                    this.leftParams.current=1;
                    this.rightParams.current = 1;
                    this.leftRow={};
                    this.rightRow={};
                    this.leftForm={};
                    this.rightForm={};
                    this.leftSelectId=null;
                    this.rightSelectId=null;
                    this.tableRightData.records=[];
                    this.tableLeftData.records=[];
                    this.getList('left');
                   }
            }
        },
        activated(q,b){

            // this.getList('left');
        },
            created() {

            this.leftParams.current = 1;
            if(this.$router.history.current.path == '/safetyPerformance'){
                this.getList('left');
            }
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data:["dept",]
            }).then(d => {
                let obj=d.data
                this.businessTableConfig=safetyConfig(obj)

            });
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["indicateType",]
            }).then(d => {
                let obj=d.data
                this.businessSubsetConfig=safetyDetailsConfig(obj)

            });

        },
        mounted() {
            window.addEventListener('scroll', this.handleScroll,true);//监听函数
        },

        methods: {

            exportExcel(){
                console.log(1);
            // <a ref="a" :href="`${this.$ip}/mms-qualification/download/securityMerits/${this.leftSelectId}`"></a>

                if(this.leftSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    request({
                        'Content-Type':'application/vnd.ms-excel',
                         url: `${this.$ip}/mms-qualification/download/securityMerits/${this.leftSelectId}`,
                        method: 'get',
                        responseType: 'blob',
                    }).then((d)=> {
                        const content = d
                        let blob = new Blob([content], {type: 'application/vnd.ms-excel'})
                        const fileName = `月度安全绩效（${this.leftRow.deptName}部${this.leftRow.year}年${this.leftRow.month}月） `
                        if ('download' in document.createElement('a')) { // 非IE下载
                            const elink = document.createElement('a')
                            elink.download = fileName
                            elink.style.display = 'none'
                            elink.href = URL.createObjectURL(blob)
                            document.body.appendChild(elink)
                            elink.click()
                            URL.revokeObjectURL(elink.href) // 释放URL 对象
                            document.body.removeChild(elink)
                        } else { // IE10+下载
                            navigator.msSaveBlob(blob, fileName)
                        }
                    })
                }
            },
            copyDetails(row){
                console.log(row);

                this.$refs.CopyDetails.open(row,this.leftSelectId)
            },
            //监听滚动
            handleScroll($event){
                console.log($event);

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
                        if(this.leftParams.size!=18){
                            this.leftParams.size=18
                            this.leftParams.current = 1
                        }else {
                            this.leftParams.current = ++this.leftParams.current ;
                        }
                        this.getList('left','scroll');
                    }else{
                        if(this.rightParams.size!=18){
                            this.rightParams.size=18
                            this.rightParams.current = 1
                        }else {
                            this.rightParams.current = ++this.rightParams.current ;
                        }
                         this.getList('right','scroll');
                    }
                }
            },
            //查询表头数据
            requestTable(searchData,tag,tableTag){
                if(tag=='left'){
                    this.leftForm = searchData;
                    this.leftSelectId=null;
                        this.rightSelectId=null;
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
                        this.rightSelectId = null;

                        this.leftRow={...row}
                    }else{

                        this.leftRow={}
                        this.leftSelectId = null;
                        this.rightSelectId = null;
                        this.tableRightData.records=[]
                    }
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
                        this.$router.push({path:'/safetyPerformanceAdd',query:{type:tag, id:this.leftSelectId}});
                    }
                }
            },
            //右侧表格新增编辑
            rightyear(tag){
                this.$router.push({path:'/safetyPerformanceYear'});
            },
            rightAddOrEditOrInfo(tag){
                if(tag=='add'){
                    if(this.leftSelectId==null){
                        this.$message.error('请先选中左侧列表一行数据');
                    }else{
                        this.$router.push({path:'/safetyPerformanceDetailsAdd',query:{type:'add',securityMeritsId:this.leftSelectId}});
                    }
                }else if(tag == 'edit' || tag=='info'){
                    if(this.rightSelectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        let data=JSON.stringify(this.rightRow)

                        this.$router.push({path:'/safetyPerformanceDetailsAdd',query:{type:tag,securityMeritsId:this.leftSelectId,id:this.rightSelectId}});
                    }
                }
            },
          
            //删除表格行数据
            delData(tag,idstr){
                let url=null
                 if(tag=='left'&&this.leftSelectId){
                    url=`${this.$ip}/mms-qualification/securityMerits/delete/${this.leftSelectId}`
                }else if(tag=='right'&&this.rightSelectId ){
                    url=`${this.$ip}/mms-qualification/securityMeritsDetail/delete/${this.rightSelectId}`
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
                                method: 'delete',
                            }).then((data) => {
                               if(data.code==200){
                                   this.$message({type: 'success',message: '删除成功'});
                                   if(tag=='left'){
                                       this.leftParams.current = 1;
                                       this.rightParams.current= 1;
                                       this.rightSelectId=null
                                       this.rightRow={}
                                       this.leftSelectId=null
                                       this.leftRow={}
                                       this.tableRightData.records=[]
                                   }else{
                                       this.rightSelectId=null
                                       this.rightRow={}
                                       this.rightParams.current= 1;
                                   }
                                   this.getList(tag);
                               }
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
                        console.log(k==='', l);
                        if(k==''){
                            this.leftForm[l]=null
                        }else{
                            if(l=='year'||l=='month'){
                                this.leftForm[l]= k===null?null:Number(k)
                            }
                        }

                    }))
                    request({
                         url:`${this.$ip}/mms-qualification/securityMerits/list`,
                        method: 'post',
                        data:{...this.leftForm,...this.leftSort,},
                        params:{...this.leftParams}
                    })
                        .then((data) => {
                            data.data.records.map((k,l)=>{
                                if(k.id==this.leftSelectId){
                                    k.selected=true
                                    this.leftRow=k
                                }
                            })
                             if(this.leftParams.current==1){
                                 this.tableLeftData.records = data.data.records;
                            }else{
                                this.tableLeftData.records.push.apply(this.tableLeftData.records,data.data.records);
                            }
                            if(scroll && data.data.records.length==0){
                                this.leftParams.current = this.leftParams.current-1;
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
                            url:`${this.$ip}/mms-qualification/securityMeritsDetail/list`,
                            method: 'post',
                            data:{...this.rightForm,securityMeritsId:this.leftSelectId,...this.rightSort},
                            params:{...this.rightParams}
                        }).then((data) => {
                            data.data.records.map((k,l)=>{
                                if(k.id==this.rightSelectId){
                                    k.selected=true
                                    this.rightRow=k
                                }
                            })
                                if(this.rightParams.current==1){
                                    this.tableRightData.records = data.data.records;
                                }else{
                                    this.tableRightData.records.push.apply(this.tableRightData.records,data.data.records);
                                }
                                if(scroll && data.data.records.length==0){
                                    this.rightParams.current = --this.rightParams.current;
                                }
                            // this.rightParams.current=data.data.current

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
        margin-top:14px;
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

