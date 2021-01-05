<template>
    <div  :key="key">
        <router-view v-if="this.$route.path ==getUrl('inOfficeInfoAdd')" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == getUrl('workExperienceAdd')" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == getUrl('certificateAdd')" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == getUrl('unsafeAdd')" :key="$route.path"></router-view>
        <router-view v-else-if="this.$route.path == getUrl('workStyle')" :key="$route.path"></router-view>

        <router-view v-else-if="this.$router.history.current.path == '/addQualifications'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/addQualificationsDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/ZuserDoc'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/ZuserAuth'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/ZuserTrain'" :key="$route.path"></router-view>
        <div v-else="this.$router.history.current.path == '/intelligenceManage'"
             class="G_listTwo" >
            <div class="QCenterRight">
                <div class="QHead">
                      资质管理
                </div>
                <div class="buttons"     >
                    <div  @click="exportWord"  >
                        <icon iconClass="export"></icon>导出Excel
                    </div>
                    <div @click="upDocInfo('info')"><icon iconClass="upload" ></icon>资质上传</div>

                </div>
                <div class="QlistBody Qdisplay tableTwoBox" ref="mainContent">
                    <div class="QlistLeft" style="width:65%" >
                        <div class=" positiondiv" >
                            <div class="twoHead">
                                员工资质证书
                            </div>
                            <div class="QheadRight">
                                <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                                <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                                 <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            </div>
                        </div>
                        <SearchTable  ref="TableLeft" :data="tableLeftData" :tableConfig="leftTableConfig"  refTag="TableLeft" @requestTable="requestTable(arguments[0],'left','TableLeft')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="headerSort(arguments[0],'TableLeft','left','leftSort')"    >
                            <el-table-column slot="radio" label="选择" :width="49"  >
                                <template slot-scope="{ row }">
                                    <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                                    <icon  iconClass="ky" class="tab_radio" v-else></icon>
                                </template>
                            </el-table-column>
                            <el-table-column align="center" slot="option" label="操作" :width="120">
                                <template slot-scope="scope">

                                        <el-tooltip class="item" effect="dark" :enterable="false" content="档案" placement="top">
                                              <span @click="seeOther(scope.row,'/ZuserDoc')" class="rowSvg">
                                            <icon iconClass="personDoc" title="档案"></icon>
                                        </span>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" :enterable="false" content="授权" placement="top">
                                             <span @click="seeOther(scope.row,'/ZuserAuth')" class="rowSvg" style="margin: 0 10px">
                                            <icon iconClass="authorization" title="授权"></icon>
                                        </span>
                                        </el-tooltip>
                                        <el-tooltip class="item" effect="dark" :enterable="false" content="培训考核" placement="top">
                                        <span @click="seeOther(scope.row,'/ZuserTrain')" class="rowSvg">
                                            <icon iconClass="check" title="培训考核"></icon>
                                        </span>
                                        </el-tooltip>
                                </template>
                            </el-table-column>

                        </SearchTable>

                    </div>
                    <div class="QlistRight " style="width:calc(35% - 30px)">
                        <div class=" positiondiv" >
                            <div class="twoHead">
                                证书的资质清单
                            </div>
                            <div class="QheadRight">
                                <div @click="rightAddOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                                <div @click="rightAddOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                                <div @click="delData('right','rightSelectId')"><icon iconClass="remove" ></icon>删除</div>
                            </div>
                        </div>
                        <SearchTable  :tableRowClassName="tableRowClassName"  scrollHeight="400" ref="TableRight" :data="tableRightData" :tableConfig="rightTableConfig"  refTag="TableRight" @requestTable="requestTable(arguments[0],'right','TableRight')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')" @headerSort="headerSort(arguments[0],'TableRight','right','rightSort')"   >
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
            <UpDocInfo ref="UpDocInfo" @getTableData="getList1"></UpDocInfo>

        </div>
    </div>
</template>
<script>

    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { rightConfig,leftConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend,map,get } from 'lodash';
    import UpDocInfo from '../components/uploadDocInfo'

    export default {
        components: {
            Icon,
            SearchTable,UpDocInfo
        },
        name: '',
        computed:{
            getUrl(){
                return (p)=>{
                    let s='/Z'

                    return s+p
                }
            },
        },
        data() {
            return {
                key:true,
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
                tableRowClassName: (rowIndex, row) => {
                    if (this.overdue !== -1) {
                        let num = 60 * 60 * 24 * 1000 * this.overdue;
                        if (row.endTime <= new Date().getTime() + num) {
                            return 'warning-row';
                        }
                    }
                    return 'tab-row';
                },
                overdue:-1,
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
                    this.key=!this.key
                    this.leftParams.size=this.tableLeftData.records.length>18?this.tableLeftData.records.length:18
                    this.leftParams.current=1
                    this.getList('left');
                }else if(val.path=='/intelligenceManage'&&nm.path=='/addQualificationsDetails'){
                    this.key=!this.key
                    this.rightParams.size=this.tableRightData.records.length>18?this.tableRightData.records.length:18
                    this.rightParams.current = 1
                    this.getList('right');
                    // this.toFrom=nm.query.type
                }else if(val.path=='/intelligenceManage'){
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
            }
        },
        created() {
            console.log(1);
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
            request({
                url:`${this.$ip}/mms-parameter/rest-api/sysParam/query`,
                method: 'post',
                data:{'sysParamCode':'ZZGQ','current':1,'size':15}
            }).then(d => {
                this.overdue = d.data.items[0].sysParamValue;
            });
        },

        mounted() {

            if( this.$refs.mainContent){
                this.$refs.mainContent.addEventListener('scroll', this.handleScroll,true);//监听函数
            }
        },
        methods: {
            upDocInfo(){
                this.$refs.UpDocInfo.open({api:'mms-qualification/qualify/uploadExcel',title:'资质上传'})
            },
            getList1(){
                this.row={}
                this.selectId=null
                this.form={}
                this.getList('left')
             },
            exportWord(){
                let obj={
                    qualifyId:this.leftSelectId||null,
                    userNumber:this.leftForm.userNumber||null,
                    userName:this.leftForm.userName||null,
                    certificateType:this.leftForm.certificateTypeQuery||null,
                    applicableBusiness:this.rightForm.applicableBusiness||null,
                }

                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-qualification/download/qualify`,
                    method: 'get',
                    params:obj,
                    responseType: 'blob'
                }).then(d => {
                    let arr=[]
                    if(d.headers['content-disposition']&&d.headers['content-disposition'].split('=')){
                        arr=d.headers['content-disposition'].split('=')[1].split('.')
                    }
                    let content = d;
                    let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                    const fileName = `${decodeURI(arr[0])}`
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
                });

            },
            seeOther(row,path){
                this.$router.push({path:path,query:{ userId:row.userId,type:'info'}});

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
                                if(data.code!=200) return false
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
                // if(bady.parentElement.getAttribute('class').includes('headerTable')){
                //     return false
                // }
                // 获取距离顶部的距离
                var scrollTop = bady.scrollTop;
                // 获取可视区的高度
                var windowHeight = bady.clientHeight;
                // 获取滚动条的总高度
                var scrollHeight = bady.scrollHeight;
                //获取滚动元素标识
                 var tag = bady.parentElement.__vue__.$parent.refTag;
                 if(scrollTop+windowHeight+1>=scrollHeight){

                    if(tag=='TableLeft'){
                        if(this.leftParams.size!=18){
                            this.leftParams.size=18
                            this.leftParams.current = 1
                        }else {
                            this.leftParams.current = ++this.leftParams.current ;
                        }
                        console.log(1, 32);
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
                            if( this.leftRow){
                                this.$refs.TableLeft.$refs.body_table.setCurrentRow( this.leftRow)
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

                                }
                                this.tableRightData.records = d.data
                                if( this.leftRow){
                                    this.$refs.TableLeft.$refs.body_table.setCurrentRow( this.leftRow)
                                }
                                if( this.rightRow){
                                    this.$refs.TableRight.$refs.body_table.setCurrentRow( this.rightRow)
                                }

                            })
                    }
                }
            },


        },

    };
</script>
<style scoped lang="scss">

    /deep/.QlistLeft{
        /deep/ .el-table {
            .el-table__body{
                width: 65% !important;
            }
        }
    }
    /deep/.QlistRight{
        /deep/ .el-table {
            .el-table__body{
                width: calc(35% - 30px) !important;
            }
        }
    }
    .buttons{
        position: absolute;
        right:0;
        top:0;
        .isDisabled{
            background: rgba(208,208,208,1);
            color: #6A7785;
            cursor: not-allowed;
            .svg-icon{
                fill: rgba(208,208,208,1);
            }
        }
        &>div{
            user-select: none;
            cursor: pointer;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 2.28571rem;
            line-height: 2.28571rem;
            padding: 0.5rem;
            border-radius: 3px;
            margin-left:10px;
            color: #fff;
            background-color: #3280E7;
        }
        .svg-icon{
            height:18px;
            width:18px;
            margin-right: 4px;
            vertical-align: text-top;
            fill: #fff;
        }
    }
</style>
