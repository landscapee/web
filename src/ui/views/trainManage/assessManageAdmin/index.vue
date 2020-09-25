<template>
    <div>

          <div v-if="this.$router.history.current.path == '/assessManageAdmin'" class="G_listTwo">
            <div class="QCenterRight">
                <div class="QHead_list">
                    <span>考核管理<span style="color:#888888">（管理员）</span></span>
                </div>
                <div class="QlistBody Qdisplay">
                    <div class="QlistLeft" style="width:45%">
                        <div class="QCenterRight" >
                            <div style="font-weight: bold; font-size: 16px">
                                培训
                            </div>
                        </div>
                        <SearchTable scrollHeight="400" ref="TableLeft" :data="tableLeftData" :tableConfig="leftTableConfig"  refTag="TableLeft" @requestTable="requestTable(arguments[0],'left','TableLeft')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'left','tableLeftData')" @headerSort="headerSort(arguments[0],'TableLeft','left','leftSort')" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                            <el-table-column slot="radio" label="选择" :width="49"  >
                                <template slot-scope="{ row }">
                                    <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                                    <icon  iconClass="ky" class="tab_radio" v-else></icon>
                                </template>
                            </el-table-column>


                        </SearchTable>

                    </div>
                    <div class="QlistRight " style="width:calc(55% - 30px)">
                        <div class="QCenterRight" >
                            <div style="font-weight: bold; font-size: 16px">
                                员工考核情况
                            </div>
                            <div class="QheadRight">
                                <div @click="moreconclusion(1)"><icon iconClass="add" style="width:0" ></icon>批量合格</div>
                                <div @click="moreRelative('edit')"><icon iconClass="edit" style="width:0"  ></icon>批量关联</div>
                                <div @click="morePush"><icon iconClass="remove" style="width:0" ></icon>批量推送</div>
                                <div @click="exportExcel()"><icon iconClass="export" ></icon>导出员工考核情况</div>

                                <!--<div><icon iconClass="export" ></icon>导出Excel</div>-->
                            </div>
                        </div>
                        <SearchTable scrollHeight="400" ref="TableRight" :data="tableRightData" :tableConfig="rightTableConfig"  refTag="TableRight" @requestTable="requestTable(arguments[0],'right','TableRight')"   @listenToCheckedChange="listenToCheckedChange(arguments[0],'right','tableRightData')" @headerSort="headerSort(arguments[0],'TableRight','right','rightSort')" @handleSizeChange="handleSizeChange1" @handleCurrentChange="handleCurrentChange1"   :showHeader="false" :showPage="true" >
                            <!--<el-table-column slot="radio" label="选择" :width="49"  >-->
                                <!--<template slot-scope="{ row }">-->
                                    <!--<icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>-->
                                    <!--<icon  iconClass="ky" class="tab_radio" v-else></icon>-->
                                <!--</template>-->
                            <!--</el-table-column>-->

                            <el-table-column slot="checkbox" align="center" label="选择" :width="50"   >
                                <template slot-scope="scope">
                                    <el-checkbox :ref="scope.row.id" @click.stop.native  v-model="checkArr" :label="scope.row.id" value="dasdasd"> </el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column slot="certificateNumber" align="center" label="证书编号" :width="140"   >
                                <template slot-scope="scope">
                                    <el-input class="rowinput" v-model="scope.row.certificateNo"
                                              @click.stop.native
                                               @keyup.enter.native="saveNumber(scope.row)"
                                             :placeholder="scope.row.qualifiedStatus!='合格'?'操作合格后可编辑':'可编辑'"
                                               :disabled="scope.row.qualifiedStatus!='合格'">
                                    </el-input>
                                 </template>
                            </el-table-column>
                            <el-table-column slot="option" align="center" label="操作" :width="100"    >
                                <template slot-scope="scope">
                                    <span @click="conclusion(scope.row,1)" class="rowSvg" style="margin-right: 10px">
                                        <icon iconClass="qualified" title="合格"></icon>
                                    </span>
                                    <span @click="conclusion(scope.row,0)" class="rowSvg">
                                        <icon iconClass="disqualification" title="不合格"></icon>
                                    </span>
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
            checkArr:[],
            getGet:get,
            tableLeftData:{records:[ ], },
            tableRightData:{records:[] },
            leftTableConfig:leftConfig({}),
            rightTableConfig:rightConfig({}),
            leftParams:{
				current: 1,
				size: 15,
            },
            rightParams:{
				current: 1,
				size: 15,
            },
            tableRightDataObj:{},
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

    },
    created() {
         this.leftParams.current = 1;
       this.getList('left');
        request({
            url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
            method: 'post',
            params:{delete:false},
            data:["trainSign", "trainType",'assessConclusion' ]
        }).then(d => {
            let obj=d.data
            this.rightTableConfig=rightConfig(obj)
            this.leftTableConfig=leftConfig(obj)

        });
    },
watch:{
    checkArr:function () {
        console.log(this.checkArr);
    }
},
　　mounted() {

    },

    methods: {
        saveNumber(row){
            console.log(row);
            request({
                url:`${this.$ip}/mms-training/trainingResult/updateNo`,
                method: 'get',
                params:{certificateNo:row.certificateNo,id:row.id}
            }).then(d => {
                if(d.code==200){
                    this.$message.success('编辑成功')
                    this.getList('right');
                }else if(d.code==416){
                    this.$message.error(d.message)
                }
            });
        },
        morePush(){
            if(this.checkArr.length){
                let ids=this.checkArr.join(',')
                request({
                    url:`${this.$ip}/mms-training/trainingResult/batchSend`,
                    method: 'post',
                    params:{ids:ids}
                }).then(d => {
                    if(d.code==200){
                        this.$message.success('操作成功')
                        this.checkArr=[]
                        this.getList('right');
                    }
                });
            }else {
                this.$message.error('请先选中一行或多行数据');
            }
        },

        moreRelative(){
            if(this.checkArr.length){
                let ids=this.checkArr.join(',')
                request({
                    url:`${this.$ip}/mms-training/trainingResult/batchAssociated`,
                    method: 'post',
                    params:{ids:ids}
                }).then(d => {
                    if(d.code==200){
                        this.checkArr=[]
                        this.$message.success('操作成功')
                        this.getList('right');
                    }
                });
            }else {
                this.$message.error('请先选中一行或多行数据');

            }
        },
        hege(ids,t){
            request({
                url:`${this.$ip}/mms-training/trainingResult/batchqualified`,
                method: 'post',
                params:{ids:ids,qualifiedStatus:t}
            }).then(d => {
               if(d.code==200){
                   this.checkArr=[]
                   this.$message.success('操作成功')
                   this.getList('right');
               }

            });
        },
        conclusion(row,num){
             if(row){
                let msg = num==1?'合格':'不合格'
                this.$confirm(`此操作将操作${row.trainingName}的考核结论为${msg}, 是否继续?`, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        this.hege(row.id,num)
                    })
                    .catch(() => {
                        this.$message.info('已取操作');
                    });
            }
        },
        moreconclusion(num){
             if(this.checkArr.length){
                 let ids=this.checkArr.join(',')
                 this.hege(ids,num)
            }else {
                 this.$message.error('请先选中一行或多行数据');

             }
        },
        exportExcel(){
            if(this.checkArr.length==1){
                // ${this.$ip}/mms-training/trainingResult/exportByEmplpoyeeId/${getGet(tableRightDataObj[ checkArr[0]],'employeeId')}
                request({
                    'Content-Type':'application/vnd.ms-excel',
                    // 'Content-Type':'application/octet-stream;charset=utf-8',
                    url: `${this.$ip}/mms-training/trainingResult/exportByEmplpoyeeId/${get(this.tableRightDataObj[ this.checkArr[0]],'employeeId')}`,
                    method: 'get',
                    responseType: 'blob',
                 }).then((d)=>{
                     const content = d
                    let blob = new Blob([content],{type:'application/vnd.ms-excel'})
                     const fileName = `员工考核情况（${get(this.tableRightDataObj[ this.checkArr[0]],'employeeName')}）`
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
            }else{
                if(this.checkArr.length){
                    this.$message.error('只能选中一行数据');
                }else {
                    this.$message.error('请先选中一行数据');
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
                this.checkArr=[]
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
                let numIndex =this.checkArr.indexOf(row.id)
                if(numIndex>-1){
                    this.checkArr.splice(numIndex,1)
                }else{
                    this.checkArr.push(row.id)
                }
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
                     url:`${this.$ip}/mms-training/trainingInfo/list`,
                    method: 'post',
                    data:{...this.leftForm,...this.leftSort,},
                    params:{...this.leftParams}
                })
                    .then((d) => {
                        this.tableLeftData={...d.data}

                    })
            }else{
                 if(this.leftSelectId!=null){
                    map(this.rightForm,((k,l)=>{
                        if(!k){
                            this.rightForm[l]=null
                        }
                    }))
                    request({
                         url:`${this.$ip}/mms-training/trainingResult/manager/list`,
                        method: 'post',
                        data:{...this.rightForm,trainingId:this.leftSelectId,...this.rightSort,},
                        params:{...this.rightParams}
                    })
                    .then((d) => {
                        this.tableRightData={...d.data}
this.tableRightData.records.map((k,l)=>{
    this.tableRightDataObj[k.id]=k
})
                    })
                }
            }
        },
        handleSizeChange(size) {
            this.leftParams.current = 1;
            this.leftParams.size = size;
            this.getList("left");
        },
        handleCurrentChange(current) {
            this.leftParams.current = current;
            this.getList('left');
        }, handleSizeChange1(size) {
            this.rightParams.current = 1;
            this.rightParams.size = size;
            this.getList('right');
        },
        handleCurrentChange1(current) {
            this.rightParams.current = current;
            this.getList('right');
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
