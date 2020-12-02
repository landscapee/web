<template>
    <div>
        <div class="courseware"  >
            <div class="QCenterRight">
                <div class="QHead">
                    <!--{{form.userName}}-->员工授权
                </div>

            </div>

            <div class="G_form1"   >
                <el-form ref="form" label-position="right" :model="form"      :inline="true"  >
                    <table class="nomTable">
                        <tr>
                            <td class="fTd">员工编号</td>
                            <td class="tTd">
                                     <span      >
                                        	<el-tooltip v-if="form.userNumber" class="item" effect="dark" :content="form.userNumber" placement="top-start">
												<div>{{ form.userNumber }}</div>
											</el-tooltip>
                                    </span>
                            </td>
                            <td class="fTd">员工姓名</td>
                            <td class="tTd">
                                     <span  >
                                        {{form.userName}}

                                    </span>
                            </td>
                            <td class="fTd">职务</td>
                            <td class="tTd" >
                                <span  >
                                    {{form.post}}

                                </span>
                            </td>

                        </tr>
                        <tr>
                            <td class="fTd">部门</td>
                            <td class="tTd">
                                <span  >{{form.dept}}</span>
                            </td>
                            <td class="fTd">岗位</td>
                            <td class="tTd">
                                <span  >{{form.station}}</span>

                            </td>
                            <td class="fTd">岗位等级</td>
                            <td class="tTd" >
                                <span  >{{form.stationLevel}}</span>
                            </td>

                        </tr>
                        <tr>

                            <td class="fTd">岗位序列</td>
                            <td class="tTd"   >
                                <span  >{{form.stationSequence}}</span>
                            </td>
                            <td class="fTd">资质证书号</td>
                            <td class="tTd1" colspan="4" >
                                <span  >
                                     <el-tooltip v-if="qualifyArr.length" class="item" effect="dark" :content="qualifyArr.join(';')" placement="top-start">
                                    <span>{{qualifyArr.join(';')}} </span>
                                </el-tooltip>
                                </span>
                            </td>

                        </tr>

                    </table>


                </el-form>

                    <div class="QlistBody Qdisplay">
                            <div class="QlistLeft"   ref="mainContent" >
                                <div class="QCenterRight" >
                                    <div style="font-weight: bold; font-size: 16px">
                                        授权信息
                                    </div>

                                </div>
                                <SearchTable   ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
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
        </div>



    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { authorizeConfig } from './tableConfig.js';
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
                tableData:{records:[]},
                tableConfig:authorizeConfig({}),
                params:{
                    current: 1,
                    size: 15,
                },
                qualifyArr:[],
                form:{},
                form1:{},
                row:{},
                sort:{},
                selectId:null
            };
        },

        created() {
             this.getList();
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["roleControl",'accreditState','accreditFlightType']
            }).then(d => {
                let obj=d.data||{}
                 request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                    method: 'get',
                }).then(d1 => {
                    this.tableConfig=authorizeConfig(obj,d1.data||[])
                });
            });
            request({
                url: `${this.$ip}/mms-qualification/qualify/getByUserNumber/${this.$route.query.id}`,
                method: 'get',

            }).then((d) => {
                this.qualifyArr=[]
                if (d.data && d.data.length) {
                   d.data.map((k,l)=>{
                        if(k.number){
                            this.qualifyArr.push(k.number)
                        }
                    })

                }
            })
            request({
                url:`${this.$ip}/mms-qualification/userRecord/getByUserNumber/${this.$route.query.id}`,
                method: "get",
            }).then(d => {
                 if(d.data){
                    this.form={...this.form,
                        userName:d.data.userName,
                        userNumber:d.data.userNumber,
                        dept:''
                    }
                    if(d.data.positionInfList&&d.data.positionInfList.length){
                        let obj=d.data.positionInfList[0]
                        this.form={...this.form,...obj,

                        }
                    }
                     request({
                         url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                         method: 'post',
                         params: {delete: false},
                         data: ['dept']
                     }).then(res => {
                         if (res.code === 200) {
                             res.data.dept.map((k, l) => {
                                 if (d.data.deptCode===k.valCode){
                                     this.form.dept=k.valData;
                                 }
                             })
                         }
                     });
                }

            })


        },

        methods: {
            requestTable(searchData){
                this.form1 = searchData;
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
                // console.log(column.property,column.order, this.sort,11);
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
                this.$set(this.tableData.records,row.index,row);
            },

            getList(){
                let data={...this.form1}
                map(data,((k,l)=>{
                    if(!k){
                        data[l]=null
                    }
                    if(l=='state'&&k){
                        data[l]= Number(k)
                    }
                }))
                request({
                    url:`${this.$ip}/mms-qualification/authorization/list`,
                    method: 'post',
                    data:{...this.sort,...data,userId:this.$route.query.id},
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
        },

    };
</script>
<style scoped lang="scss">
    /deep/ .mainTable{

        height:calc(100vh - 565px)!important;
    }
    .courseware{
        padding:0 30px;
    }

    .G_form1{

        margin-top:50px ;
        overflow: auto ;
        overflow-x: hidden ;
        width: 100%;
         height:calc(100vh - 230px);
        .QlistBody{
            margin-left: calc(50% - 550px);
        }
        /deep/ .el-form:last-child{
            /*width: 90%;*/

        }
        .searchTableWrapper{
            width:1100px;
            margin-left: calc(50% - 550px);

        }
        .nomTable{
            margin-left: calc(50% - 550px);
            width:1100px;
            border-collapse:collapse;
            border:none;

            .fTd{
                 width: 140px;
                text-align: center;
            }

            td{
                height:40px;
                border:1px solid rgba(151,151,151,1);
                font-size:16px;
                color:#222222;
                &>span  {
                    padding :0 15px 0 15px;

                    display: inline-block;
                    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
                }

            }
            .tTd{
                width: calc(33% - 140px);
                &>span  {

                }
            }
            .tTd1{
                 &>span  {
                    width:600px;
                }
            }
        }

    }
</style>
