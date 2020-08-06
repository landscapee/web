<template>
    <div>
        <div class="courseware"  >
            <div class="QCenterRight">
                <div class="QHead">
                    {{form.userName}}培训考核
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
                            <td class="sTd" >
                                <span  >{{form.stationLevel}}</span>
                            </td>

                        </tr>
                        <tr>

                            <td class="fTd">岗位序列</td>
                            <td class="sTd" colspan="5" >
                                <span  >{{form.stationSequence}}</span>
                            </td>

                        </tr>

                    </table>


                </el-form>
                <div class="list ">
                    <div style=" text-align: center;font-size: 24px;padding:30px 0 20px 0">
                        培训记录
                    </div>
                    <SearchTable :noSearch="true" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable"   :showHeader="false"  >
                    </SearchTable>
                 </div>
                <div class="list " >
                    <div style=" text-align: center;font-size: 24px;padding:30px 0 20px 0">
                        考试记录
                    </div>
                    <SearchTable :noSearch="true" ref="searchTable" :data="tableData1" :tableConfig="tableConfig1"  refTag="searchTable"   :showHeader="false"  >
                    </SearchTable>
                 </div>

            </div>
        </div>



    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { testRuConfig,trainManageUserConfig } from './tableConfig.js';
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
                 form:{},
                tableData:[],
                tableData1:[],
                tableConfig:trainManageUserConfig({}),
                tableConfig1:testRuConfig({}),

            };
        },

        created() {
             this.getList();
             this.getList1();
            request({
                url:`${this.$ip}/mms-qualification/userRecord/getByUserNumber/${this.$route.query.id}`,
                method: "get",
            }).then(d => {
                if(d.data){
                    this.form={...this.form,
                        userName:d.data.userName,
                        userNumber:d.data.userNumber,
                    }
                    if(d.data.positionInfList&&d.data.positionInfList.length){
                        let obj=d.data.positionInfList[0]
                        this.form={...this.form,...obj,
                        }
                    }
                }
            })
        },
        methods: {


            getList() {
                request({
                    url: `${this.$ip}/mms-training/trainingResult/get/${this.$route.query.id}`,
                    method: 'get',
                    // data:{"employeeId":this.$route.query.id}
                }).then((d) => {
                    if (d.code==200 && d.data) {
                        this.tableData = d.data

                    }
                })
            }  ,
            getList1() {
                request({
                    url: `${this.$ip}/mms-training/examResult/get/${this.$route.query.id}`,
                    method: 'get',

                }).then((d) => {
                     if (d.data && d.data.length) {
                        this.tableData1 = d.data
                    }
                })
            }
        },

    };
</script>
<style scoped lang="scss">
    .list{

    }
    /deep/ .mainTable{

        height: 400px !important;
        overflow: auto;
    }
    .courseware{
        padding:0 30px;
    }

    .G_form1{
        margin-left: calc(50% - 650px);
        margin-top:50px ;
        padding: 0 50px;
        width:1300px;
        overflow: auto;
        height:calc(100vh - 230px);
        /deep/ .el-form{
            /*width: 90%;*/

        }
        .nomTable{
            width:1200px;
             border-collapse:collapse;border:none;
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
                    width: 100%;
                    display: inline-block;
                    white-space: nowrap;overflow: hidden;text-overflow: ellipsis;
                }
            }
        }

    }
</style>
