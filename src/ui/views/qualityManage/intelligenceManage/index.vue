<template>
    <div>
        <router-view v-if="this.$router.history.current.path == '/addQualifications'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/addQualificationsDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/ZuserDoc'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/ZuserAuth'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/ZuserTrain'" :key="$route.path"></router-view>
        <div v-else="this.$router.history.current.path == '/intelligenceManage'" class="G_listTwo">
            <div class="QCenterRight">
                <div class="QHead_list">
                    <span> 资质管理</span>
                </div>
                <div class="QlistBody Qdisplay">
                    <div class="QlistLeft" style="width:65%" ref="mainContent">
                        <div class="QCenterRight" >
                            <div style="font-weight: bold; font-size: 16px">
                                员工资质证书
                            </div>
                            <div class="QheadRight">
                                <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                                <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                                 <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            </div>
                        </div>
                        <SearchTable scrollHeight="400" ref="TableLeft" :data="tableLeftData" :tableConfig="leftTableConfig"  refTag="TableLeft" @requestTable="requestTable(arguments[0],'left','TableLeft')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="headerSort(arguments[0],'TableLeft','left','leftSort')"    >
                            <el-table-column slot="radio" label="选择" :width="49"  >
                                <template slot-scope="{ row }">
                                    <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                                    <icon  iconClass="ky" class="tab_radio" v-else></icon>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" slot="option" label="操作" :width="230" >
                                <template  slot-scope="scope">
                                    <div >
                                        <el-button class="QoptionButton" @click="seeOther(scope.row,'/ZuserDoc')">档案</el-button>
                                        <el-button class="QoptionButton" @click="seeOther(scope.row,'/ZuserAuth')">授权</el-button>
                                        <el-button class="QoptionButton" @click="seeOther(scope.row,'/ZuserTrain')">培训考核</el-button>

                                    </div>

                                </template>
                            </el-table-column>

                        </SearchTable>

                    </div>
                    <div class="QlistRight " style="width:calc(35% - 30px)">
                        <div class="QCenterRight" >
                            <div style="font-weight: bold; font-size: 16px">
                                证书的资质清单
                            </div>
                            <div class="QheadRight">
                                <div @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                                <div @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                                <div @click="delData('right','rightSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            </div>
                        </div>
                        <SearchTable scrollHeight="400" ref="TableRight" :data="tableRightData" :tableConfig="rightTableConfig"  refTag="TableRight" @requestTable="requestTable(arguments[0],'right','TableRight')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')" @headerSort="headerSort(arguments[0],'TableRight','right','rightSort')"   >
                            <el-table-column slot="radio" label="选择" :width="49"  >
                                <template slot-scope="scope">
                                     <icon iconClass="sy" class="tab_radio" v-if="scope.row.selected"></icon>
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
    import { rightConfig,leftConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend,map,get } from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,
        },
        name: '',
        data() {
            return {

                getGet:get,
                tableLeftData:{records:[ ], },
                tableRightData:{records:[] },
                leftTableConfig:leftConfig({}),
                rightTableConfig:rightConfig({}),
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
                 console.log(1,val,nm);
                if(val.path=='/intelligenceManage'&&nm.path=='/addQualifications'){
                    this.leftParams.size=this.tableLeftData.records.length>18?this.tableLeftData.records.length:18
                    this.leftParams.current=1
                    this.getList('left');
                }else if(val.path=='/intelligenceManage'&&nm.path=='/addQualificationsDetails'){
                    this.rightParams.size=this.tableRightData.records.length>18?this.tableRightData.records.length:18
                    this.rightParams.current = 1
                    this.getList('right');
                    // this.toFrom=nm.query.type
                }else if(val.path=='/intelligenceManage'){
                      this.getList('left');
                }else if(val.path!='/intelligenceManage'){
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
                }
            }
        },
        created() {
            if(this.$router.history.current.path == '/intelligenceManage'){
                this.leftParams.current = 1;
                this.getList('left');
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["Z_aptitudeType"]
                }).then(d => {
                    let obj=d.data
                    this.rightTableConfig=rightConfig(obj)
                    this.leftTableConfig=leftConfig(obj)

                });
            }

        },

        mounted() {
            if( this.$refs.mainContent){
                this.$refs.mainContent.addEventListener('scroll', this.handleScroll,true);//监听函数
            }
        },
        methods: {
            seeOther(row,path){
                this.$router.push({path:path,query:{ id:row.userNumber}});

            },
            //左侧表格新增编辑
            addOrEditOrInfo(tag){
                if(tag=='add'){
                    this.$router.push({path:'/addQualifications',query:{type:'add'}});
                }else if(tag == 'edit' || tag=='info'){

                    if(this.leftSelectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{
                        let data=JSON.stringify(this.leftRow)
                        this.$router.push({path:'/addQualifications',query:{type:tag, id:this.leftSelectId}});
                    }
                }
            },
            //右侧表格新增编辑
            rightAddOrEditOrInfo(tag){
                if(tag=='add'){
                    if(this.leftSelectId==null){
                        this.$message.error('请先选中左侧列表一行数据');
                    }else{

                        this.$router.push({path:'/addQualificationsDetails',query:{type:'add',lId:this.leftSelectId}});

                    }
                }else if(tag == 'edit' || tag=='info'){
                    if(this.rightSelectId==null){
                        this.$message.error('请先选中一行数据');
                    }else{

                        this.$router.push({path:'/addQualificationsDetails',query:{type:tag,lId:this.leftSelectId, id:this.rightSelectId}});
                    }
                }
            },
            //删除表格行数据
            delData(tag,idstr){
                let url=null
                if(tag=='left'&&this.leftSelectId){
                    url=`${this.$ip}/mms-qualification/qualify/delete/${this.leftSelectId}`
                }else if(tag=='right'&&this.rightSelectId ){
                    url=`${this.$ip}/mms-qualification/qualifyDetail/delete/${this.rightSelectId}`
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
            //查询表头数据
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
                    if(tag=='TableLeft'){
                        if(this.leftParams.size!=18){
                            this.leftParams.size=18
                            this.leftParams.current = 1
                        }else {
                            this.leftParams.current = ++this.leftParams.current ;
                        }
                        this.getList('left','scroll');
                    }
                }
            },
            requestTable(searchData,tag,tableTag){
                if(tag=='left'){

                    this.leftForm = searchData;
                    this.leftSelectId=null,
                        this.rightSelectId=null,
                        this.tableRightData={records:[]};
                    this.leftParams.current = 1;
                }else{
                    this.rightForm = searchData;
                    if(searchData.checkMethod){
                        this.rightForm.checkMethod=searchData.checkMethod.join('')||null
                    }
                    this.rightSelectId=null;
                    this.rightParams.current = 1;
                }
                this.$refs[tableTag].$refs.body_table.setCurrentRow();

                this.getList(tag);
            },
            //表头排序
            headerSort(column,str,tag,sortTag){
                console.log(column, str, tag, sortTag);
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
                    this.leftSelectId=null
                    this.rightSelectId=null

                    this.rightParams.current = 1;
                    this.tableRightData.records=[]

                }else{
                    this.rightSelectId=null
                    this.rightParams.current = 1;
                }
                this.getList(tag);
            },
            //表格选中事件
            listenToCheckedChange(row,tag,tableTag){

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
                        this.leftRow={...row}
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
                        this.rightRow={...row}
                    }else{
                        this.rightSelectId = null;
                    }
                }
                this.$set(this[tableTag].records,row.index,row);
            },


            getList(tag,scroll){
                 if(tag=='left'){
                    map(this.leftForm,((k,l)=>{
                        if(!k){
                            this.leftForm[l]=null
                        }
                    }))
                    request({
                        url:`${this.$ip}/mms-qualification/qualify/list`,
                        method: 'post',
                        data:{...this.leftForm,...this.leftSort,},
                        params:{...this.leftParams}
                    })
                        .then((d) => {
                            if(d.data&& d.data.records){
                                d.data.records.map((k,l)=>{
                                    if(k.id==this.leftSelectId){
                                        k.selected=true
                                        this.leftRow=k
                                    }
                                })
                                if(this.leftParams.current==1){
                                    this.tableLeftData.records = d.data.records;
                                }else{
                                    this.tableLeftData.records.push.apply(this.tableLeftData.records,d.data.records);
                                }
                                if(scroll && d.data.records.length==0){
                                    this.leftParams.current = --this.leftParams.current;
                                }
                            }


                        })
                }else{
                    if(this.leftSelectId!=null){
                        map(this.rightForm,((k,l)=>{
                            if(!k){
                                this.rightForm[l]=null
                            }
                        }))
                        request({
                            url:`${this.$ip}/mms-qualification/qualifyDetail/list`,
                            method: 'post',
                            data:{...this.rightForm,qualifyId:this.leftSelectId,...this.rightSort,},
                            params:{...this.rightParams}
                        })
                            .then((d) => {
                                if(d.data&& d.data.length){
                                    d.data.map((k,l)=>{
                                        if(k.id==this.rightSelectId){
                                            k.selected=true
                                            this.rightRow=k
                                        }
                                    })
                                    this.tableRightData.records = d.data
                                }

                            })
                    }
                }
            },


        },

    };
</script>
<style scoped lang="scss">
    .G_listTwo{
        /deep/ .mainTable{
            /*height:calc(100vh - 400px)*/
        }
        /deep/ .el-checkbox__label{
            display: none;
        }
        .rowinput{
            /deep/ .el-input__inner{
                border: 0;
                height:30px
            }
            /deep/ .el-input{
                height:30px;
            }
        }
    }
</style>
