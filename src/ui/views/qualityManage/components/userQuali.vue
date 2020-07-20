<template>
    <div>
        <div class="courseware"  >
            <div class="QCenterRight">
                <div class="QHead">
                    {{form.userName}}资质
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
                <div   class="G_listTwo">
                    <div class="">

                        <div class="QlistBody Qdisplay">
                            <div class="QlistLeft" style="width:65%" ref="mainContent">
                                <div class="QCenterRight" >
                                    <div style="font-weight: bold; font-size: 16px">
                                        员工资质证书
                                    </div>

                                </div>
                                <SearchTable :noSearch="true" ref="TableLeft" :data="tableLeftData" :tableConfig="leftTableConfig"  refTag="TableLeft" @requestTable="requestTable(arguments[0],'left','TableLeft')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="headerSort(arguments[0],'TableLeft','left','leftSort')"    >
                                    <el-table-column slot="radio" label="选择" :width="49"  >
                                        <template slot-scope="{ row }">
                                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                                        </template>
                                    </el-table-column>


                                </SearchTable>

                            </div>
                            <div class="QlistRight " style="width:calc(35% - 30px)">
                                <div class="QCenterRight" >
                                    <div style="font-weight: bold; font-size: 16px">
                                        证书的资质清单
                                    </div>

                                </div>
                                <SearchTable  :noSearch="true" ref="TableRight" :data="tableRightData" :tableConfig="rightTableConfig"  refTag="TableRight" @requestTable="requestTable(arguments[0],'right','TableRight')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')" @headerSort="headerSort(arguments[0],'TableRight','right','rightSort')"   >
                                    <!--<el-table-column slot="radio" label="选择" :width="49"  >-->
                                        <!--<template slot-scope="scope">-->
                                            <!--<icon iconClass="sy" class="tab_radio" v-if="scope.row.selected"></icon>-->
                                            <!--<icon  iconClass="ky" class="tab_radio" v-else></icon>-->
                                        <!--</template>-->
                                    <!--</el-table-column>-->


                                </SearchTable>
                            </div>
                        </div>
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
                tableLeftDataObj:{},
                form:{},

                tableLeftData:[],
                tableRightData:[],
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

        created() {
                 this.leftParams.current = 1;
                this.getList('left');

            request({
                url:`${this.$ip}/mms-qualification/userRecord/getByUserNumber/${this.$route.query.id}`,
                method: "get",
            }).then(d => {
                if(d.data){

                    this.form={...this.form,
                        userName:d.data.userName,
                        userNumber:d.data.userNumber,
                    }
                    // dept:obj.dept,
                    //     post:obj.station,
                    //     postLevel:obj.stationLevel,
                    //     postSeri:obj.stationSequence,
                    //     job:obj.post,
                    if(d.data.positionInfList&&d.data.positionInfList.length){
                        let obj=d.data.positionInfList[0]
                        this.form={...this.form,...obj,

                        }
                    }
                }

            })


        },


        methods: {



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
                this[tableTag].map((r,l) =>{
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
                        this.tableRightData=[]
                    }
                    this.rightParams.current = 1;
                    this.$set(this[tableTag],row.index,row);
                     this.tableRightData=   this.tableLeftDataObj[row.id]||[]
                }
            },


            getList(tag,scroll) {
                if (tag == 'left') {
                    request({
                        url: `${this.$ip}/mms-qualification/qualify/getByUserNumber/${this.$route.query.id}`,
                        method: 'get',

                    }).then((d) => {
                            if (d.data && d.data.length) {
                                this.tableLeftData = d.data
                                d.data.map((k,l)=>{
                                    this.tableLeftDataObj[k.id]=k.qualifyDetailList
                                })
                            }
                        })
                }
            }
        },

    };
</script>
<style scoped lang="scss">
    .G_listTwo{
        /*width: 90%;*/
         padding: 0;

        /deep/ .mainTable{
            height:calc(100vh - 500px)!important;
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
    .courseware{
        padding:0 30px;
    }

    .G_form1{

        margin-top:50px ;
        overflow: auto ;
        width: 90%;
         margin-left: 5%;
         height:calc(100vh - 230px);
        /deep/ .el-form{
            /*width: 90%;*/

        }
        .nomTable{
            margin-left: calc(50% - 550px);
            width:1100px;
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
