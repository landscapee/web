<template>
    <div :key="key">

        <router-view v-if="this.$router.history.current.path == '/addselfCheckPlanDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/editselfCheckPlanDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/infoselfCheckPlanDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/addselfCheckPlanAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/editselfCheckPlanAdd'" :key="$route.path"></router-view>
        <!--<router-view v-else-if="this.$router.history.current.path == '/infoselfCheckPlanAdd'" :key="$route.path"></router-view>-->
        <div v-else-if="this.$router.history.current.path == '/selfCheckPlan'" class="G_listTwo" >
            <div class="QCenterRight">
                <div class="QHead">
                     法定自查检查计划
                </div>
                <div class="QlistBody Qdisplay " ref="mainContent">

                    <div class="QlistLeft">
                        <div class="positiondiv">
                            <div class="twoHead">计划</div>
                            <div class="QheadRight">
                                <div v-if="isZDRole" @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                                <div v-if="isZDRole" @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                                <div v-if="isZDRole" @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                                <!--<div class="isDisabled" @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>-->
                                <div @click="exportExcel"><icon iconClass="export" ></icon>导出</div>
                            </div>

                        </div>
                        <SearchTable class="left-main-table" :data="tableLeftData" :tableConfig="businessTableConfig"  refTag="left-table" ref="left-table"  @requestTable="requestTable(arguments[0],'left','left-table')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="HeaderSort(arguments[0], 'left-table','left','leftSort')"     >
                            <el-table-column slot="radio" label="选择" :width="49" >
                                <template slot-scope="{ row }">
                                    <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                                    <icon  iconClass="ky" class="tab_radio" v-else></icon>
                                </template>
                            </el-table-column>
                        </SearchTable>

                    </div>
                    <div class="QlistRight"  >
                     <div class="positiondiv" >
                        <div class="twoHead">
                            计划明细
                        </div>
                        <div class="QheadRight">
                            <div v-if="isZDRole" @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                            <div v-if="isZDRole" @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                            <div v-if="isZDRole" @click="delData('right','rightSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            <div @click="rightAddOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                            <!--<div><icon iconClass="export" ></icon>导出Excel</div>-->
                        </div>
                    </div>
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

        </div>
    </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { selfCheckConfig,selfCheckDetailsConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend,map } from 'lodash';
import {debounce} from '@lib/tools';

export default {
    components: {
        Icon,
        SearchTable,
	},
    name: '',
    data() {
        return {
            key:true,
            tableLeftData:{records:[]},
            tableRightData:{records:[]},
            businessTableConfig:selfCheckConfig({}),
            businessSubsetConfig:selfCheckDetailsConfig({}),
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
            // toFrom:'',
            // rightIndex:null,
            rightForm:{},
            leftSelectId:null,
            rightSelectId:null,
             leftSort:{},
            rightSort:{}
        };
    },
    computed:{
        isZDRole(){
            return !this.$store.getters.isZDRole('ZLGLZDGLY')
        },
    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);
            if(val.path=='/selfCheckPlan'&&(nm.path=='/addselfCheckPlanAdd'||nm.path=='/editselfCheckPlanAdd'||nm.path=='/infoselfCheckPlanAdd')){
                this.key=!this.key
                this.leftParams.size=this.tableLeftData.records.length>18?this.tableLeftData.records.length:18
                this.leftParams.current=1
                this.getList('left');
            }else if(val.path=='/selfCheckPlan'&&(nm.path=='/addselfCheckPlanDetails'||nm.path=='/editselfCheckPlanDetails'||nm.path=='/infoselfCheckPlanDetails')){
                this.key=!this.key
                this.rightParams.size=this.tableRightData.records.length>18?this.tableRightData.records.length:18
                this.rightParams.current = 1
                this.getList('right');
                // this.toFrom=nm.query.type
            }else if(val.path=='/selfCheckPlan'){
                this.key=!this.key
                this.leftParams.size=18
                this.leftParams.current=1
                this.rightParams.current = 1
                this.leftRow={}
                this.rightRow={}
                this.leftForm={}
                this.rightForm={}
                this.leftSelectId=null
                this.rightSelectId=null
                this.tableRightData.records=[]
                this.tableLeftData.records=[]
                this.getList('left');
            }
            if (val.path == '/selfCheckPlan'){
                this.$nextTick(()=>{
                    this.$refs.mainContent.addEventListener('scroll', this.handleScroll, true);//监听函数

                })
            }
        }
    },
    created() {
         // console.log(this.$route,12);
        this.leftParams.current = 1;
       this.getList('left');
        request({
            url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
            method: 'post',
            params:{delete:false},
            data:["checkProject", "checkType",'checkObject','checkCategory','dept']
        }).then(d => {
            let obj=d.data
            this.businessSubsetConfig=selfCheckDetailsConfig(obj)
            this.businessTableConfig=selfCheckConfig(obj)

        });
    },
    beforeRouteLeave(to,from,next){
        this.$refs.mainContent&&this.$refs.mainContent.removeEventListener('scroll', this.handleScroll);
        next()
    },
　　mounted() {
        if( this.$refs.mainContent){
            this.$refs.mainContent.addEventListener('scroll', this.handleScroll,true);//监听函数
            // this.$refs.mainContent.removeEventListener('scroll', this.handleScroll,true);//监听函数
        }

    },

    methods: {
        exportExcel(){
             if(this.leftSelectId==null){
                this.$message.error('请先选中一行数据');
            }else{
                 request.interceptors.response.use(function (response) {
                     // Do something with response data
                     console.log(response,1,1,1);
                     return response;
                 }, function (error) {
                     // Do something with response error
                     return Promise.reject(error);
                 });
                request({
                    header:{
                        'content-disposition':'attachment;filename=total.xls',
                        'content-type':'application/octet-stream'
                    },
                    // 'Content-Type':'application/vnd.ms-excel',
                     url: `${this.$ip}/mms-qualification/download/examination/${this.leftSelectId}`,
                    method: 'get',
                    responseType: 'blob',
                    // responseType: 'arraybuffer',
                }).then((d,q,w)=>{
                    const content = d
                     let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                    const fileName = `法定自查检查计划（${this.leftRow.deptName}部${this.leftRow.year}年）`
                     if ('download' in document.createElement('a')) { // 非IE下载
                        const elink = document.createElement('a')
                        elink.download = fileName
                        elink.style.display = 'none'
                        elink.href = URL.createObjectURL(blob)
                        document.body.appendChild(elink)
                        elink.click()
                        URL.revokeObjectURL(elink.href) // 释放URL 对象
                        document.body.removeChild(elink)
                    }else { // IE10+下载
                        navigator.msSaveBlob(blob, fileName)
                    }
                })
            }
        },
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
            var tag = bady.parentElement.__vue__.$parent.refTag;
               if(scrollTop+windowHeight+1>=scrollHeight){
                if(tag=='left-table'){

                    debounce(()=>{
                        if(this.leftParams.size!=18){
                        this.leftParams.size=18
                        this.leftParams.current = 1
                    }else {
                        this.leftParams.current = ++this.leftParams.current ;
                    }

                        this.getList('left','scroll')
                    },100)()
                 }else{
                    debounce(()=>{
                        if(this.rightParams.size!=18){
                            this.rightParams.size=18
                            this.rightParams.current = 1
                        }else {
                            this.rightParams.current = ++this.rightParams.current ;
                        }
                        this.getList('right','scroll');
                    },100)()
                }
            }
        },
        //查询表头数据
        requestTable(searchData,tag,tableTag){
            if(tag=='left'){

                this.leftForm = searchData;
                this.leftSelectId=null,
                this.rightSelectId=null,
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
                this.leftParams.current = 1;
                this.leftSelectId=null
                this.rightSelectId=null

                this.rightParams.current = 1;
                this.tableRightData.records=[]

            }else{
                this.rightSelectId=null
                this.rightParams.current = 1;
            }
            this.$refs[str].$refs.body_table.setCurrentRow();

            this.getList(tag);
        },
        //表格选中事件
        listenToCheckedChange(row,tag,tableTag){
            console.log(row, tag, tableTag);
            let select = row.selected;
             this[tableTag].records.map((r,l) =>{
                if(r.selected){
                    r.selected = false;
                }
            })
            row.selected  = !select;
            if(tag=="left"){

                if(row.selected){
                    this.leftSelectId = row.id;
                    this.leftRow=row
                    this.rightSelectId = null;

                }else{
                    this.leftSelectId = null;
                    this.rightSelectId = null;
                    this.tableRightData.records=[]
                }
                 this.rightParams.current = 1;
                this.getList('right');
            }else{

                 if(row.selected){
                     this.rightSelectId = row.id;
                    this.rightRow=row
                }else{
                     this.rightSelectId = null;
                }
            }
            this.$set(this[tableTag].records,row.index,row);
        },
        //左侧表格新增编辑
        addOrEditOrInfo(tag){
            if(tag=='add'){
                this.$router.push({path:'/addselfCheckPlanAdd',query:{ }});
            }else if(tag == 'edit' || tag=='info'){
                let p='/'+tag+'selfCheckPlanAdd'
                if(this.leftSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    let data=JSON.stringify(this.leftRow)
                    this.$router.push({path:p,query:{  id:this.leftSelectId}});
                }
            }
        },
        //右侧表格新增编辑
        rightAddOrEditOrInfo(tag){
            if(tag=='add'){
                if(this.leftSelectId==null){
                   this.$message.error('请先选中左侧列表一行数据');
                }else{

                        this.$router.push({path:'/addselfCheckPlanDetails',query:{type:'add',id:this.leftSelectId}});

                }
            }else if(tag == 'edit' || tag=='info'){
                let p='/'+tag+'selfCheckPlanDetails'
                if(this.rightSelectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    let data=JSON.stringify(this.rightRow)

                    this.$router.push({path:p,query:{ id:this.rightSelectId}});
                }
            }
        },
        //删除表格行数据
        delData(tag,idstr){
            let url=null
            if(tag=='left'&&this.leftSelectId){
                url=`${this.$ip}/mms-qualification/examination/delete/${this.leftSelectId}`
             }else if(tag=='right'&&this.rightSelectId ){
                url=`${this.$ip}/mms-qualification/examinationDetail/delete/${this.rightSelectId}`
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
                    if(!k){
                        this.leftForm[l]=null
                    }
                }))
                request({
                     url:`${this.$ip}/mms-qualification/examination/list`,
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
                            this.leftParams.current = --this.leftParams.current;
                        }
                        if( this.leftRow){
                            this.$refs['left-table'].$refs.body_table.setCurrentRow( this.leftRow)
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
                         url:`${this.$ip}/mms-qualification/examinationDetail/list`,
                        method: 'post',
                        data:{...this.rightForm,examinationId:this.leftSelectId,...this.rightSort,},
                        params:{...this.rightParams}
                    })
                    .then((data) => {
                        data.data.records.map((k,l)=>{
                            if(k.id==this.rightSelectId){
                                k.selected=true
                                this.rightRow=k
                            }
                        })
                          if(this.rightParams.current==1){
                            this.tableRightData.records = data.data.records
                        }else{
                            this.tableRightData.records.push.apply(this.tableRightData.records,data.data.records);
                        }
                        if(scroll && data.data.records.length==0){
                            this.rightParams.current = --this.rightParams.current;
                        }
                        if( this.leftRow){
                            this.$refs['left-table'].$refs.body_table.setCurrentRow( this.leftRow)
                        }
                        if( this.rightRow){
                            this.$refs['right-table'].$refs.body_table.setCurrentRow( this.rightRow)
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
 </style>
