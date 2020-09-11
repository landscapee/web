<template>
    <div>


        <div v-if="this.$router.history.current.path == '/statisticalIndex'" :key="$route.path" class="statisticalIndex">
            <div class="top-content">
                <div class="top-content-title">
                    <span>综合统计</span>
                </div>
            </div>
            <div class="main-content">
                <div style="padding:30px 30px 0px 30px">
                    <el-form :model="form1" :inline="true">

                        <el-form-item label="航空公司：" class="firstWidth">
                            <el-select filterable @change="getList1" clearable   v-model="form1.airlineCompanyName" placeholder="请选择">
                                <el-option v-for="(opt,index) in airlineCompanyName" :key="index" :label="opt.fullname" :value="opt.fullname">
                                    <span>{{opt.iata}}-{{opt.fullname}}</span></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="机型："  class="secWidth">
                            <el-select filterable @change="getList1" clearable   v-model="form1.airplaneIcao" placeholder="请选择">
                                <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.name" :value="opt.name"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="飞机注册号：">
                            <el-input @keyup.enter.native="getList1" v-model="form1.flightRegisterNo" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="航班类型：">
                            <el-select @change="getList1" clearable   v-model="form1.airlineType" placeholder="请选择">
                                <el-option v-for="(opt,index) in options.W_flightType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="机位：">
                            <el-input @keyup.enter.native="getList1" v-model="form1.seat" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <el-form-item label="保障人员：" >
                            <el-input @keyup.enter.native="getList1" v-model="form1.submitUserName" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                        <br/>
                        <el-form-item label="日期：" class="firstWidth">
                            <el-date-picker @change="getList1"  @focus="focus" :picker-options="pickerOptions"  v-model="form1.startTime" clearable placeholder="请选择"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="至" class="secWidth">
                            <el-date-picker @change="getList1" @focus="focus1" :picker-options="pickerOptions1" v-model="form1.endTime" clearable placeholder="请选择"></el-date-picker>
                        </el-form-item>
                        <el-form-item  >
                            <div class="button ">
                                <el-button style="margin-left: 15px" @click="getList1" type="primary">查询</el-button>
                                <el-button @click="resetForm"  >重置</el-button>
                            </div>
                        </el-form-item>
                        <br>
                        <el-form-item  >
                            <el-checkbox v-model="form1.etopEnable"  >适用ETOPS运行</el-checkbox>
                        </el-form-item>
                        <br>
                        <el-form-item class="firstWidth" label="部门/项目：" prop="department">
                            <!--<el-select @change="getList1" clearable   v-model="form1.department" placeholder="请选择">-->
                                <!--<el-option v-for="(opt,index) in options.dept" :key="index" :label="opt.valData" :value="opt.valCode"> </el-option>-->
                            <!--</el-select>-->
                            <el-checkbox-group  @change="getList1"  v-model="form1.checkList">
                                <el-checkbox  v-for="(opt,index) in options.dept" :key="index" :label="opt.valCode"  >{{opt.valData}} </el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <br>
                        <el-form-item class="firstWidth" label="统计维度：" prop="dateType">
                            <el-radio-group @change="getList1"     v-model="form1.dateType">
                                <el-radio  v-for="(opt,index) in options.statisticType" :key="index" :label="opt.valData" :value="opt.valCode">{{opt.valData}}</el-radio>
                             </el-radio-group>
                        </el-form-item>

                    </el-form>
                </div>

                <div style="position: relative">
                    <ButtonList :buttonList="buttonList" @getButton="getButton"></ButtonList>
                    <div    class="QheadRight" style="right:30px" >
                        <div  @click="export2" >
                            <icon iconClass="export"></icon>导出
                        </div>
                    </div>
                </div>
                <SearchTable  :noSearch="true"  scrollHeight="370" ref="searchTable" :key="buttonObj.id" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(item) in options.unsafeType" :key="item.valCode"  align="center" :slot="item.valCode" :label="item.valData"   >
                        <template  slot-scope="scope">
                            {{scope.row.data?scope.row.data[item.valData]:''}}
                        </template>
                    </el-table-column>
                    <!--:show-overflow-tooltip="true"-->
                </SearchTable>
            </div>
        </div>
    </div>
</template>
<script>
    import ButtonList from "../component/buttonList"
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { filghtConfig,unsafeConfig,workloadConfig,workePositiveConfig,modelAnalysisConfig,taskNumConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable,ButtonList
        },
        name: 'statisticalIndex',
        data() {
            return {
                options:{},
                pickerOptions: {},
                pickerOptions1: {},
                airlineCompanyName:[],
                AircraftType:[],
                buttonList:[

                    {name:'航班量统计',ref:'searchTable',id:'1',api:'/mms-report/count/flights',export:'/mms-report/export/flights'},
                    {name:'员工工作量统计',ref:'searchTable1',id:'2',api:'/mms-report/count/workload',export:'/mms-report/export/workload'},
                    {name:'员工到位及时性统计',ref:'searchTable2',id:'3',api:'/mms-report/count/workInTime',export:'/mms-report/export/workInTime'},
                    {name:'保障航班航司/机型分析',ref:'searchTable3',id:'4',api:'/mms-report/count/airLineIcao',export:'/mms-report/export/airLineIcao'},
                    {name:'保障任务量统计',ref:'searchTable4',id:'5',api:'/mms-report/count/task',export:'/mms-report/export/task'},
                    {name:'人员不安全事件统计',ref:'searchTable5',id:'6',api:'/mms-report/count/unsafe',export:'/mms-report/export/unsafe'},
                    // {name:'桥载工单查询',id:'3'},
                ],
                buttonObj:{},
                configObj:{
                    '1':filghtConfig,
                    '2':workloadConfig,
                    '3':workePositiveConfig,
                    '4':modelAnalysisConfig,
                    '5':taskNumConfig,
                    '6':unsafeConfig,
                },
                tableData:{records:[]},
                tableConfig:filghtConfig({}),
                params:{
                    current: 1,
                    size: 15,
                },
                form:{},
                form1:{checkList:[]},
                row:{},
                sort:{},

                selectId:null
            };
        },
        created() {
            this.buttonObj=this.buttonList[0]
            if(this.$route.path == '/statisticalIndex'){
                this.getList(this.buttonObj);
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:['dept','applyETOP','W_flightType','statisticType','unsafeType']
                }).then(d => {
                    this.options=d.data
                    this.tableConfig=this.configObj[this.buttonObj.id](this.options)
                    console.log(this.tableConfig,73,2);
                });
                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=Airline`,
                    method: 'get',
                }).then(d => {
                    if( d.data&&d.data.length){
                        this.airlineCompanyName=[]
                        d.data.map((k,l)=>{
                            if(!k.parentCode){
                                // this.AirlineObj[k.iata]=k.fullname
                                this.airlineCompanyName.push(k)
                            }
                        })
                    }
                });
                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                    method: 'get',
                }).then(d => {
                    if( d.data&&d.data.length){
                        this.AircraftType=d.data
                        // d.data.map((k,l)=>{
                        //     this.AircraftTypeObj[k.id]=k
                        // })
                    }
                });
            }

        },

        methods: {
            getButton(obj){
                 this.params={
                    current: 1,
                    size: 15,
                }
                this.sort={}
                this.form={}
                this.form1={checkList:[]}
                this.buttonObj=obj
                this.tableConfig=this.configObj[this.buttonObj.id](this.options)
                 this.getList();
            },
            resetForm(){
                this.params={
                    current: 1,
                    size: 15,
                }
                this.form1={checkList:[]};
                this.getList()
            },
            getList1(){
                this.params={
                    current: 1,
                    size: 15,
                }
                if(this.form.checkList){
                    this.$set(this.form,'department',this.form.checkList.join(','))
                }
                this.getList()
            },
            export2(){
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}${this.buttonObj.export}`,
                    method: 'post',
                    data:{},
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

            requestTable(searchData){
                this.form = searchData;
                this.selectId=null;
                this.tableData={records:[]};
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
                if(row.selected ){

                    this.row = row;
                    this.selectId = row.id;
                }else {
                    this.selectId   = null;
                    this.row = null;

                }

                this.params.current = 1;
                console.log(row, column, event,199);
                this.$set(this.tableData.records,row.index,row);
            },

            getList( ){
                let data={...this.form}
                map(data,((k,l)=>{
                    if(!k){
                        data[l]=null
                    }
                }))
                data.workOrderParam={...this.form1}
                request({
                    url:`${this.$ip}${this.buttonObj.api}`,
                    method: 'post',
                    data:{...this.sort,...data},
                    params:{...this.params,}
                }).then((data) => {
                        this.tableData = extend({}, {...data.data});
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
            focus(val){
                let e=this.form1.endTime?new Date(this.form1.endTime):''
                this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() >= e.getTime();
                        }
                    },
                };
            } ,
            focus1(val){
                let s=this.form1.startTime?new Date(this.form1.startTime):''
                this.pickerOptions1 = {
                    disabledDate(time) {
                        if (s) {
                            return time.getTime() <= s.getTime() ;
                        }
                    },
                };
            },
        },
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";
    .statisticalIndex{
        margin-top:14px;
        /deep/ .mainTable{
            height:calc(100vh - 740px);

        }
        /deep/ .cell> div{
            line-height: 20px!important;
        }
        /deep/ .el-form{
            .el-input{
                width: 180px;
            }
            .el-form-item__label{
                text-align: left;
                padding-left: 15px;
            }
            .firstWidth{
                .el-form-item__label{
                    width: 90px;
                    padding-left: 0px;
                }
            }
            .secWidth{
                .el-form-item__label{
                    width: 70px;
                }
            }
        }
    }

</style>
