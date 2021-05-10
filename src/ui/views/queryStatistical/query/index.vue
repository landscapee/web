<template>
    <div>
        <div v-if="this.$route.path == '/queryIndex'" :key="$route.path" class="QCenterRight G_listOne queryIndex">
            <div >
                <div class="QHead">
                    综合查询
                </div>
            </div>
            <div class="tableOneBox">
                <div  >
                    <el-form :model="form1" :rules="rules" ref="myform" :inline="true">

                            <el-form-item label="航空公司：" class="firstWidth">
                                <el-select filterable   clearable   v-model="form1.airlineCompanyName" placeholder="请选择">
                                    <el-option v-for="(opt,index) in airlineCompanyName" :key="index" :label="opt.fullname" :value="opt.fullname">
                                        <span>{{opt.iata}}-{{opt.fullname}}</span></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="机型：" class="secWidth">
                                <el-select filterable   clearable   v-model="form1.airplaneIcao" placeholder="请选择">
                                    <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.iata" :value="opt.iata"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="飞机注册号：" class="threeItemForm">

                                <el-input   v-model="form1.flightRegisterNo" clearable placeholder="请输入"></el-input>

                            </el-form-item>
                            <el-form-item label="航班类型："  >
                                <el-select   clearable   v-model="form1.airlineType" placeholder="请选择">
                                    <el-option v-for="(opt,index) in options.W_flightType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="机位：">
                                <el-input  v-model="form1.seat" clearable placeholder="请输入"></el-input>

                            </el-form-item>

                        <br/>
                            <el-form-item label="航班日期：" class="firstWidth" prop="startTime">
                                <el-date-picker   @focus="focus" :picker-options="pickerOptions"  v-model="form1.startTime" clearable placeholder="请选择"></el-date-picker>
                             </el-form-item>
                            <el-form-item label="至" class="secWidth" prop="endTime">
                                 <el-date-picker   @focus="focus1" :picker-options="pickerOptions1" v-model="form1.endTime" clearable placeholder="请选择"></el-date-picker>
                            </el-form-item>
                        <el-form-item label="适用ETOPS运行：" class="threeItemForm">
                            <el-select    clearable   v-model="form1.etopEnable"  placeholder="请选择">
                                <el-option v-for="(opt,index) in options.applyETOP" :key="index" :label="opt.valData"  :value="opt.valCode==='false'?false:true"> </el-option>
                             </el-select>
                        </el-form-item>
                        <el-form-item label="保障人员：">
                            <el-input   v-model="form1.submitUserName" clearable placeholder="请输入"></el-input>
                        </el-form-item>
                            <el-form-item  >
                                <div class="button">
                                    <el-button style="margin-left: 15px" @click="getList1" type="primary" class="el-icon-search">查询</el-button>
                                    <el-button @click="resetForm" class="el-icon-refresh" >重置</el-button>
                                </div>
                            </el-form-item>
                    </el-form>
                </div>

                <div style="position: relative">
                    <ButtonList :buttonList="buttonList" @getButton="getButton"></ButtonList>
                    <div    class="QheadRight"   >
                        <div  @click="export2" >
                            <icon iconClass="export"></icon>导出
                        </div>
                    </div>
                </div>
                <SearchTable  :noSearch="true"  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
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
import { qiaozaiConfig,qinwuConfig,weixiuConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
     import {eleDateShow,inputLength} from '@lib/tools'

    export default {
    components: {
        Icon,
        SearchTable,ButtonList
	},
    name: 'queryIndex',
    data() {
        return {
            options:{},
            pickerOptions: {},
            pickerOptions1: {},
            airlineCompanyName:[],
            AircraftType:[],
            buttonList:[
                {name:'勤务工单查询',id:'1',api:'/mms-report/query/service',export:'/mms-report/export/service'},
                {name:'维修工单查询',id:'2',api:'/mms-report/query/maintenance',export:'/mms-report/export/maintenance'},
                {name:'桥载工单查询',id:'3',api:'/mms-report/query/bridgeLoad',export:'/mms-report/export/bridgeLoad'},
            ],
            buttonObj:{},
            configObj:{
                '1':qinwuConfig,
                '2':weixiuConfig,
                '3':qiaozaiConfig,
            },
            tableData:{records:[]},
            tableConfig:weixiuConfig({}),
            params:{
				current: 1,
				size: 15,
            },
             form:{},
            form1:{},
            row:{},
            sort:{},
            rules:{
                startTime:[{required:true,message:'请选择起始日期',trigger:'blur'}],
                endTime:[{required:true,message:'请选择结束日期',trigger:'blur'}],
            },
            selectId:null
        };
    },
   created() {
        this.buttonObj=this.buttonList[0]
        if(this.$route.path == '/queryIndex'){
            // this.getList(this.buttonObj);
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['dept','applyETOP','W_flightType','statisticType']
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
        mounted(){
            eleDateShow('el-input__prefix')
            inputLength(this)
        },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

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
            this.form1={}
            this.buttonObj=obj
            this.tableData={records:[]}
            this.tableConfig=this.configObj[this.buttonObj.id]( this.options)
            // this.getList();
        },
        resetForm(){
            this.params={
                current: 1,
                size: 15,
            }
            this.form1={};
            this.getList()
        },
        getList1(){
            this.$refs.myform.validate((blo)=>{
                if(blo){
                    this.params={
                        current: 1,
                        size: 15,
                    }
                    this.getList()
                }
            })
        },
        export2(){
            let data={...this.form1}
            request({
                header:{
                    'Content-Type':'multipart/form-data'
                },
                url:`${this.$ip}${this.buttonObj.export}`,
                method: 'post',
                data,
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
            let data={...this.form1}
            if (data.endTime) {
                data.endTime=new Date(data.endTime.getTime() + 24 * 60 * 60 * 1000 - 1)
            }
            map(data,((k,l)=>{
                  if(typeof k==='string'&&!k.replace(/(^\s*)|(\s*$)/g, "") ){
                     data[l]=null
                }
            }))
            // data.workOrderParam={...this.form1}
           request({
                url:`${this.$ip}${this.buttonObj.api}`,
                  method: 'post',
                data:{...this.sort,...data},
               params:{...this.params,}
            })
            .then((data) => {
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
                        return time.getTime() <= s.getTime()-8.64e7 ||time.getTime()> s.getTime()+180*8.64e7;
                     }
                },
            };
        },
    },
};
</script>
<style scoped lang="scss">

 .queryIndex{
    /deep/ .mainTable{
        height:calc(100vh - 500px)!important;

    }

    /deep/ .el-form{
        .el-input{
            width: 180px;
        }
        .el-form-item__label{
             text-align: left;
            padding-left: 15px;
        }
        .threeItemForm{
            .el-form-item__label{
                width: 150px;
            }
        }
        .firstWidth{
             .el-form-item__label{
                width: 85px;
                 padding-left: 0px;
                 position: relative;
             }
            .el-form-item__label:before{
                position: absolute;
                left:-11px;
            }
        }
        .secWidth{
             .el-form-item__label{
                width: 70px;
                 position: relative;
             }
            .el-form-item__label:before{
                position: absolute;
                left:1px;
            }
        }
    }
}

</style>
