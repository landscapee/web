<template>
    <div class="addTest">

        <div   class="top-content">
            <div class="top-content-title">
                <span>试卷{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
            </div>
            <div    class="top-toolbar">
                <div @click="preview"  >
                    <icon iconClass="info"></icon>预览
                </div>
                <!--<div @click="exportTest"  v-if="type!='add1'">-->
                    <!--<icon iconClass="export"></icon>导出-->
                <!--</div>-->
                <div @click="type!='info'?saveForm('form'):()=>{}" v-if="type!='info'" >
                    <icon iconClass="save"></icon>保存
                </div>
                <div @click="type!='info'?resetForm():()=>{}" v-if="type!='info'"  >
                    <icon iconClass="reset"></icon>重置
                </div>
            </div>
        </div>
        <div style="  font-size: 18px" >试卷基本信息</div>
        <div :class=" type=='info'?'main-content main-info':'main-content'"  >

            <el-form  label-position="right" :model="form" :rules="rules" ref="form" >
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
                        <span v-if="type=='info'">{{form.totalTime}}</span>
                        <el-input v-else type="number" v-model="form.totalTime" placeholder="请输入考试时长"></el-input>
                        <span style="position: absolute;top:0;right:-20px">分</span>
                    </el-form-item>
                    <el-form-item label="试卷类别：" prop="paperType">
                        <span v-if="type=='info'">{{form.paperType}}</span>
                        <el-select v-else clearable v-model="form.paperType" placeholder="请选择试卷类别">
                            <!--<el-option label="资质类" value="资质类"> </el-option>-->
                            <!--<el-option label="资质类" value="资质类"> </el-option>-->
                            <!--<el-option label="入职培训类" value="入职培训类"> </el-option>-->
                            <!--<el-option label="日常管理类" value="日常管理类"> </el-option>-->
                            <!--<el-option label="专业类" value="专业类"> </el-option>-->
                            <el-option v-for="(opt,index) in options.paperCategory" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                        </el-select>
                    </el-form-item>
                </div>
                <div class="row_custom">
                    <el-form-item label="考试类型：" prop="testType">
                        <span v-if="type=='info'">{{form.testType}}</span>
                         <el-select v-else clearable v-model="form.testType" placeholder="请选择考试类型">
                            <!--<el-option label="开放式" value="开放式"> </el-option>-->
                            <!--<el-option label="封闭式" value="封闭式"> </el-option>-->
                             <el-option v-for="(opt,index) in options.testCategory" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                         </el-select>
                    </el-form-item>
                    <el-form-item label="资质类型：" prop="qualificationType">
                        <span v-if="type=='info'">{{form.qualificationType}}</span>
                         <el-select v-else clearable v-model="form.qualificationType" placeholder="请选择考试资质类型">
                            <!--<el-option label="维修" value="维修"> </el-option>-->
                            <!--<el-option label="桥载" value="桥载"> </el-option>-->
                            <!--<el-option label="勤务" value="勤务"> </el-option>-->
                            <!--<el-option label="安全" value="安全"> </el-option>-->
                             <el-option v-for="(opt,index) in options.qualificationType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                         </el-select>
                    </el-form-item>
                    <el-form-item label="业务类型：" prop="businessType">
                    <span v-if="type=='info'">{{form.businessType}}</span>
                    <el-select v-else clearable v-model="form.businessType" placeholder="请选择业务类型">
                        <!--<el-option label="维修" value="维修"> </el-option>-->
                        <!--<el-option label="桥载" value="桥载"> </el-option>-->
                        <!--<el-option label="勤务" value="勤务"> </el-option>-->
                        <!--<el-option label="质量" value="质量"> </el-option>-->
                        <el-option v-for="(opt,index) in options.businessType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                    </el-select>
                </el-form-item>
                    <el-form-item label="适用对象：" prop="suitableUser">
                    <span v-if="type=='info'">{{form.suitableUser}}</span>
                    <el-select v-else clearable v-model="form.suitableUser" placeholder="请选择适用对象">
                        <!--<el-option label="机务部" value="机务部"> </el-option>-->
                        <!--<el-option label="桥载项目" value="桥载项目"> </el-option>-->
                        <!--<el-option label="勤务项目" value="勤务项目"> </el-option>-->
                        <!--<el-option label="维修项目" value="维修项目"> </el-option>-->
                        <!--<el-option label="质量室" value="质量室"> </el-option>-->
                        <!--<el-option label="培训室" value="培训室"> </el-option>-->
                        <!--<el-option label="工程技术资料室" value="工程技术资料室"> </el-option>-->
                        <el-option v-for="(opt,index) in options.applyObject" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>

                    </el-select>
                </el-form-item>
                </div>
                <div class="row_custom aRow_custom">
                    <el-form-item label="试题简介：" prop="description">
                        <span v-if="type=='info'">{{form.description}}</span>
                        <el-input v-else v-model="form.description" placeholder="请输入试题简介"></el-input>
                    </el-form-item>

                </div>
            </el-form>
        </div>
        <div class="headDiv1">
            <div style="font-size: 18px" >所含试题 <span style="color:#7F7F7F;font-size: 18px">（数量{{arrTable.length}}）</span></div>
            <div class="topToolbar">
                <div @click="importExcel"><icon iconClass="add" ></icon>导入</div>
                <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                <div @click="delData('left','leftSelectId')"><icon iconClass="remove" ></icon>删除</div>
                <div @click="addOrEditOrInfo('info')"><icon iconClass="remove" ></icon>详情</div>
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
        <ImportExcel ref="ImportExcel" @getTableData="getDetails"></ImportExcel>
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
                        url:`${this.$ip}/mms-training/paperInfo/verify?paperCode=${value}&id=${this.$route.query.id}`,
                        method: 'get',
                    }).then(response => {
                        console.log(response,10);
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该试卷编码已存在");
                        }
                    });
                }
            };
            return {
                form: {},
                formT:{},
                rules: {
                    paperName: [{ required: true, message: "请输入试卷名称", trigger: "blur" }],
                    totalTime: [{ required: true, message: "请输入考试时长", trigger: "blur" }],
                    paperCode: [{ required: true, message: "请输入试卷编码", trigger: "blur" }],
                    // paperCode: [{ validator:paperCode, trigger: "change" }],
                  },
                 tableConfig:testMainAddConfig({}),
                params:{
                  size:15,
                  current:1,
                },
                arrTable:[],
                options:{},
                 row:null,
                sort:{},
                selectId:null,
                type: "add"
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
        methods: {

            preview(){

                if(this.form.id){
                    this.$router.push({path:'/testMaintenanceSee',query:{ id:this.form.id, }});

                }else {
                    this.$message.error('请先保存试卷基本信息');
                }

            },
            exportTest() {
                console.log(1);
                this.$refs.ExportTest.open(this.form)
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

            getDetails() {
                request({
                    url:`${this.$ip}/mms-training/paperInfo/info/${this.$route.query.id}`,
                    method: 'get',
                }).then(data => {
                    console.log(data,10);
                     this.form={...data.data,questionInfoList:data.data.questionInfoList||[],}
                     this.arrTable=this.form.questionInfoList||[]
                    this.row=null
                });
            },
            resetForm(){
                if(this.form.id){
                    this.form = {id:this.form.id };
                }else{
                    this.form = { };
                }

                this.row=null
             },
            requestTable(searchData){
                this.formT = searchData;
                this.selectId=null;
                    this.tableData={records:[]};
                this.params.current = 1;
                this.$refs.searchTable.$refs.body_table.setCurrentRow();
                this.getDetails();
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
                console.log(column.property,column.order, this.sort,11);
                this.getDetails();
            },
            listenToCheckedChange(row, column, event){

                let select = row.selected;
                this.arrTable.map((r,l) =>{
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
                console.log(row, column, event,199);
                this.$set(this.arrTable,row.index,row);
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
                                     this.$router.push({path:'/testMaintenanceAdd',query:{type:"editor",id:d.data}})
                                        this.$set(this.form,'id',d.data)
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
                            this.$router.push({path:'/testMaintenanceAddAdd',query:{type:tag,id:this.form.id ,}});
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
                                  this.getDetails()
                            });
                        })
                }
            },
            handleSizeChange(size) {
                this.params.current = 1;
                this.params.size = size;
                this.getDetails();
            },
            handleCurrentChange(current) {
                this.params.current = current;
                this.getDetails();
            },
            handleCheckedChange() {},
            handleSelectionChange() {},
        }
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";

    @import "@/ui/styles/common_form.scss";
    .headDiv1{
        display: flex;
        justify-content: space-between;
    }

.top-toolbar{
    &>div{
        margin-left: 12px;
        margin-right: 0!important;
    }
}
    .addTest {
        padding: 0 40px ;
         .main-content{
            overflow-y: auto;
            overflow-x: hidden;
            /*height:calc(100vh - 260px);*/
            margin-top: 20px!important;
            .aRow_custom{
                text-align:left;
                /deep/ .el-form-item{
                    width:100%!important;
                    .el-form-item__content{
                        width: calc( 100% - 95px)!important;
                    }
                    .el-input{
                        width: 100% !important;
                    }

                }
            }
        }
        .main-info{
            span{
                font-weight: bold!important;
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
        /deep/ .mainTable{
            height: 360px;
            overflow: auto;

        }
        .el-form {
            width: 100%;

            /deep/ .el-form-item__label {
                width: 95px;
                text-align: right;
            }
            /deep/ .el-form-item__content {
                margin-left: 95px;
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
                    width: calc(100% - 95px);
                }
            }
        }


    }


</style>
