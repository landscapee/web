<template>
    <div class="addTest">

        <div   class="QCenterRight">
            <div class="QHead">
              试卷{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
            </div>
            <div    class="QheadRight">
                <div @click="preview"  >
                    <icon iconClass="info"></icon>预览
                </div>
                <div :class="type!='add'?'':'isDisabled'" @click="exportTest"  >
                    <icon iconClass="export"></icon>导出
                </div>
                <div @click="type!='info'?saveForm('form'):()=>{}" v-if="type!='info'" >
                    <icon iconClass="save"></icon>保存
                </div>
                <div @click="type!='info'?resetForm():()=>{}" v-if="type!='info'"  >
                    <icon iconClass="reset"></icon>重置
                </div>
            </div>
        </div>
        <div style="  font-size: 18px;font-weight: bold" >试卷基本信息</div>
        <div :class=" type=='info'?'main-content main-info G_formInfo':'main-content'"  >

            <el-form  label-position="right"  :model="form" :rules="rules" ref="form" >
                <div></div>
                <div class="row_custom">
                    <el-form-item label="试卷名称：" prop="paperName">
                        <span v-if="type=='info'">{{form.paperName}}</span>
                        <el-input v-else v-model="form.paperName" placeholder="请输入试卷名称"></el-input>
                    </el-form-item>
                    <el-form-item label="试卷编码：" prop="paperCode">
                        <span v-if="type=='info'">{{  form.paperCode}}</span>
                        <el-input v-else v-model="form.paperCode" placeholder="请输入试卷编码"></el-input>
                    </el-form-item>
                    <el-form-item style="position: relative" label="考试时长：" prop="totalTime">
                        <span v-if="type=='info'">{{form.totalTime}}分钟</span>
                        <el-input v-else type="number" v-model="form.totalTime" placeholder="请输入考试时长"></el-input>
                        <span v-if="type!='info'" style="position: absolute;top:0;right:-20px">分</span>
                    </el-form-item>
                    <el-form-item label="试卷类别：" prop="paperType">
                        <span v-if="type=='info'">{{form.paperType}}</span>
                        <el-select v-else clearable v-model="form.paperType" placeholder="请选择试卷类别">

                            <el-option v-for="(opt,index) in options.paperCategory" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="考试类型：" prop="testType">
                        <span v-if="type=='info'">{{form.testType}}</span>
                         <el-select v-else clearable v-model="form.testType" placeholder="请选择考试类型">
                             <el-option v-for="(opt,index) in options.testCategory" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                         </el-select>
                    </el-form-item>
                    <el-form-item label="资质类型：" prop="qualificationType">
                        <span v-if="type=='info'">{{form.qualificationType}}</span>
                         <el-select v-else clearable v-model="form.qualificationType" placeholder="请选择考试资质类型">
                             <el-option v-for="(opt,index) in options.qualificationType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                         </el-select>
                    </el-form-item>
                    <el-form-item label="业务类型：" prop="businessType">
                    <span v-if="type=='info'">{{form.businessType}}</span>
                    <el-select v-else clearable v-model="form.businessType" placeholder="请选择业务类型">
                        <el-option v-for="(opt,index) in options.businessType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                    </el-select>
                </el-form-item>
                    <el-form-item label="适用对象：" prop="suitableUser">
                    <span v-if="type=='info'">{{form.suitableUser}}</span>
                    <el-select v-else clearable v-model="form.suitableUser" placeholder="请选择适用对象">
                        <el-option v-for="(opt,index) in options.applyObject" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                    </el-select>
                </el-form-item>
                </div>
                <div class="row_custom aRow_custom">
                    <el-form-item label="试卷简介：" prop="description">
                        <span v-if="type=='info'">{{form.description}}</span>
                        <el-input v-else v-model="form.description" placeholder="请输入试题简介"></el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="headDiv1">
            <div  > <span style="font-size: 18px;font-weight: bold">所含试题</span>  <span style="color:#7F7F7F;font-size: 18px">（数量{{arrTable.records&&arrTable.records.length}}）</span></div>
            <div class="topToolbar">
                <div @click="type=='info'?'':importExcel() " :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="add"  ></icon>导入</div>
                <div @click="type=='info'?'':addOrEditOrInfo('add') "   :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="add" ></icon>新增</div>
                <div @click="type=='info'?'':addOrEditOrInfo('edit') "   :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="edit" ></icon>编辑</div>
                <div @click="type=='info'?'':delData('left','leftSelectId') "   :class="type=='edit'?'':'G_isDisabled'"><icon iconClass="remove" ></icon>删除</div>
                <div @click="addOrEditOrInfo('info')"  ><icon iconClass="info" ></icon>详情</div>
                <!--<div @click="exportExcel()">-->
                    <!--<icon iconClass="export" ></icon>导出-->
                    <!--<a ref="a" :href="`${this.$ip}/mms-training/download/securityMerits`"></a>-->
                <!--</div>-->
            </div>
        </div>
        <div class="TableContent main-content ">
            <SearchTable  ref="searchTable" :data=" arrTable" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                    <template slot-scope="{ row }">
                        <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                        <icon  iconClass="ky" class="tab_radio" v-else></icon>
                    </template>
                </el-table-column>
            </SearchTable>

        </div>
        <ExportTest ref="ExportTest" ></ExportTest>
        <ImportExcel ref="ImportExcel" @getTableData="getList"></ImportExcel>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import ExportTest from './exportTest';
    import ImportExcel from './inportExcel';
    import Icon from '@components/Icon-svg/index';
    import { testMainAddConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,SearchTable,ExportTest,ImportExcel
        },
        name: "",
        data() {
            const paperCode = (rule, value, callback) => {
                if (!value) {
                     return callback(new Error('试卷编码不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-training/paperInfo/verify?paperCode=${value}&id=${this.$route.query.id||null}`,
                        method: 'get',
                    }).then(d => {
                        console.log(d,10);
                        if(d.code==200){
                            if (!d.data) {
                                callback();
                            } else {
                                callback("该试卷编码已存在");
                            }
                        }else {
                            callback("该试卷编码已存在");
                        }

                    });
                }
            };
            const paperName = (rule, value, callback) => {
                if (!value) {
                     return callback(new Error('试卷编码不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-training/paperInfo/verifyName?paperName=${value}&id=${this.$route.query.id||null}`,
                        method: 'get',
                    }).then(d => {
                         if(d.code==200){
                            if (!d.data) {
                                callback();
                            } else {
                                callback("该试卷名称已存在");
                            }
                        }else {
                            callback("该试卷名称已存在");
                        }

                    });
                }
            };
            return {
                form: {},
                formT:{},
                rules: {
                    paperName: [{required: true, validator:paperName, trigger: "blur" }],
                    totalTime: [{ required: true, message: "请输入考试时长", trigger: "blur" }],
                    testType: [{ required: true, message: "请选择考试类型", trigger: "blur" }],
                     paperCode: [{ required: true, validator:paperCode, trigger: "blur" }],
                  },
                 tableConfig:testMainAddConfig({}),
                params:{
                  size:15,
                  current:1,
                },
                arrTable:{},
                options:{},
                 row:null,
                sort:{},
                selectId:null,
                type: "add",

            };
        },


        created() {
            if(this.$router.history.current.path == '/testMaintenanceAdd'){
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    data:["testCategory",'selectType', "paperCategory","qualificationType","businessType","applyObject",]
                }).then(d => {
                    this.options=d.data
                    let obj=d.data
                    this.tableConfig=testMainAddConfig(obj)
                });

            }
            this.initPage()

        },
        methods: {
            initPage(){
                if (this.$route.query ) {
                    console.log(1,1,this.$router);
                    this.type = this.$route.query.type;

                    this.$route.meta.title =
                        this.type == "add"
                            ? "试卷-新增"
                            : this.type == "edit"
                            ? "试卷-编辑"
                            : this.type == "info"
                                ? "试卷-详情"
                                : "";
                    if(this.type!='add'){
                        this.getDetails()

                    }
                }
            },
            preview(){

                if(this.form.id){
                    this.$router.push({path:'/testMaintenanceSee',query:{ type:this.type,id:this.form.id, }});

                }else {
                    this.$message.error('请先保存试卷基本信息');
                }

            },
            exportTest() {
                console.log(1);
                if(this.type!='add'){
                    this.$refs.ExportTest.open(this.form)
                }
            },
            importExcel() {
                console.log(1);
                if(this.$route.query.id){
                    this.$refs.ImportExcel.open(this.form.id)
                }else {
                    this.$message.error('请先保存试卷基本信息');
                }
            },
            exportExcel() {

            },
            getList(){
                request({
                    url:`${this.$ip}/mms-training/questionInfo/list`,
                    method: 'post',
                    params:this.params,
                    data:{paperId:this.form.id,...this.formT ,...this.sort}
                }).then(data => {
                     if(data.code==200){
                        this.arrTable=data.data
                        this.row=null
                    }

                });
            },
            getDetails() {
                request({
                    url:`${this.$ip}/mms-training/paperInfo/info/${this.$route.query.id}`,
                    method: 'get',
                }).then(data => {
                     if(data.code==200){
                        this.form={...data.data,questionInfoList:data.data.questionInfoList||[],}
                        this.getList()
                     }

                });
            },
            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id };
                }else{
                    this.form = {};
                }
                this.row=null
             },
            requestTable(searchData){
                this.formT = searchData;
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
                this.arrTable.records.map((r,l) =>{
                    if(r.selected){
                        r.selected = false;
                    }

                })
                 row.selected  = !select;
                if(row.selected ){
                    this.row = row;
                }else {
                    this.row  = null;
                }

                this.params.current = 1;
                 this.$set(this.arrTable.records,row.index,row);
             },

            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                            if (this.type == "add"&&!this.form.id) {
                                url = `${this.$ip}/mms-training/paperInfo/save`
                            } else {
                                url = `${this.$ip}/mms-training/paperInfo/update`
                            }
                            request({
                                url,
                                method: "post",
                                data: this.form
                            })
                                .then(d => {
                                    this.$message.success("保存成功！");
                                    if(this.type == "add"){
                                        this.$router.push({path:'/testMaintenanceAdd',query:{type:"edit",id:d.data}})
                                        this.$set(this.form,'id',d.data)
                                        this.initPage()
                                    }

                                 })
                                .catch(error => {
                                    this.$message.success(error);
                                });
                        } else {
                            console.log("error submit!!");
                            return false;
                        }
                    });
                }
            },
            addOrEditOrInfo(tag){
                //  let row
                // if(this.row){
                //       row=JSON.stringify(this.row)
                // }else {
                //     row=''
                // }
                if(this.form.id){
                    if(tag=='add'){
                        this.$router.push({path:'/testMaintenanceAddAdd',query:{type:'add',id:this.form.id, }});
                    }else if(tag == 'edit' || tag == 'info'){
                        if(this.row==null){
                            this.$message.error('请先选中一行数据');
                        }else{
                            this.$router.push({path:'/testMaintenanceAddAdd',query:{type:tag,id:this.form.id ,sId:this.row.id}});
                        }
                    }
                }else {
                    this.$message.error('请先保存试卷基本信息');
                }

            },
            delData() {
                if (this.row == null) {
                    this.$message.error('请先选中一行数据');
                } else {
                    this.$confirm('此操作将删除该试题, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    })
                        .then(() => {
                            request({
                                url:`${this.$ip}/mms-training/questionInfo/delete/${this.row.id}`,
                                method: 'delete',
                            }).then(data => {
                                  this.getList()
                            });
                        })
                }
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
        }
    };
</script>
<style scoped lang="scss">

    @import "@/ui/styles/common_form.scss";
    .headDiv1{
        display: flex;
        justify-content: space-between;
    }
.main-info{
    /deep/ .el-form-item{
        margin-bottom: 10px!important;
    }
}

    .addTest {
        padding: 0 40px ;
        /deep/ .mainTable{
            height: 320px!important;
            overflow: auto;
            /deep/ .el-table__fixed{
                height: 319px !important;
            }
        }
         .main-content{
            overflow-y: auto;
            overflow-x: hidden;
             margin-top: 20px!important;
            .aRow_custom{
                text-align:left;
                /deep/ .el-form-item{
                    width:100%!important;
                    .el-form-item__content{
                        width: calc( 100% - 110px)!important;
                    }
                    .el-input{
                        width: 100% !important;
                    }

                }
            }
        }
        .main-info{
            span{
                /*font-weight: bold!important;*/
            }


        }
        /deep/ .el-table{
            margin: 0!important;
        }
        .headDiv1{
            &>div{
                line-height: 32px;


            }
            .topToolbar>div{
                margin-left: 12px;
                margin-right: 0!important;
            }
            margin: 15px 0 10px 0;
        }
        .TableContent.main-content{
            margin: 0!important;
        }

        .el-form {
            width: 100%;

            /deep/ .el-form-item__label {
                width: 110px;
                text-align: right;
            }
            /deep/ .el-form-item__content {
                margin-left: 110px;
            }
            /deep/ .el-input{
                width: 220px!important;
                margin-right: 5px;
            }


            .row_custom{
                @include common-input;
                display: flex;
                justify-content: space-between;
                /deep/ .el-form-item__content{
                    width: 220px;
                    text-align: left;
                }
                &:first-child {
                    .el-form-item {
                        &:last-child {
                            margin-left: 93px;
                        }
                    }
                }
            }
            .row_item_row{
                .el-form-item {
                    width: calc(100% - 110px);
                }
            }
        }


    }

    /deep/ .el-form-item:not(.is-required){
        .el-form-item__label{
            padding-left: 11px;
        }
    }

</style>
