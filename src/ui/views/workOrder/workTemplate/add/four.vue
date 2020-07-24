<template>
    <div class="three">
         <div class="threeBan">
            <div class="threeBanFirst" @contextmenu.prevent.stop="openMainMenuFn($event,null)">
                <!--<el-input-->
                <!--placeholder="输入关键字进行过滤"-->
                <!--v-model="filterText">-->
                <!--</el-input>-->
                <el-tree
                        node-key="id"
                        class="filter-tree"
                        :data="dataTree"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="tree">
                    <div class="custom-tree-node" slot-scope="{ node, data ,q,w}">
                        <div  @contextmenu.prevent.stop="openMainMenuFn($event,data)" >{{ node.label }}   </div>
                    </div>
                </el-tree>
            </div>
            <div class="threeBanSecond G_form">
                <el-form ref="form" label-position="left" :model="formItem" :rules="rules"  :inline="true"  >

                    <div class="row_one widthOne1">
                        <el-form-item  label="项次编号：" prop="number">
                            <el-input   v-model="formItem.number" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="工作大项名称：" prop="name">
                            <el-input   v-model="formItem.name" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="courseCode1">
                            <el-checkbox v-model="formItem.addLogo" :label="true">添加标识：</el-checkbox>
                            <el-checkbox :disabled="!formItem.addLogo" v-model="formItem.notApplicable" :label="true">N/A</el-checkbox>
                            <el-checkbox :disabled="!formItem.notApplicable" v-model="formItem.notApplicableImport" :label="true">导出显示</el-checkbox>
                            <i></i>
                            <el-checkbox :disabled="!formItem.addLogo" v-model="formItem.cycle" :label="true">○</el-checkbox>
                            <el-checkbox :disabled="!formItem.cycle" v-model="formItem.cycleImport" :label="true">导出显示○</el-checkbox>
                            <i></i>
                            <el-checkbox :disabled="!formItem.addLogo" v-model="formItem.hook" :label="true"> ✔</el-checkbox>
                            <el-checkbox :disabled="!formItem.hook" v-model="formItem.hookImport" :label="true">导出显示✔</el-checkbox>
                            <i></i>
                        </el-form-item>
                    </div>  <div class="row_one">
                    <el-form-item  label="" prop="noSignTime">
                        <el-checkbox   v-model="formItem.noSignTime"  :label="true">不显示签署时间</el-checkbox>

                    </el-form-item>
                </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="noSmallItem">
                            <el-checkbox @change="noSmallItemC"  v-model="formItem.noSmallItem"  :label="true">无工作小项</el-checkbox>
                        </el-form-item>
                    </div>
                    <div class="row_one widthOne" v-if="formItem.noSmallItem">
                        <el-form-item  label="角色权限控制：" prop="role">
                            <el-select    multiple=""  v-model="formItem.role" placeholder="请选择角色权限控制">
                                <el-option v-for="(opt,index) in options.roleControl" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_one widthOne" v-if="formItem.noSmallItem">
                        <div v-for="(item,index) in Limmit" :key="index">
                            <el-form-item  label="适用范围类型：" prop="type">
                                <el-select  @change="limmitTypeC(index)" v-model="item.type" placeholder="请选择适用范围类型">
                                    <el-option v-for="(opt,index) in options.applyRangeType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                </el-select>
                                <el-select multiple filterable v-if="item.type=='适用机型范围'"  v-model="item.values" placeholder="请选择机型">
                                    <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.name" :value="opt.name"> </el-option>
                                </el-select>
                                <el-select v-else multiple  v-model="item.values" placeholder="请选择发动机">
                                    <el-option v-for="(opt,index) in options.EngineNo" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                </el-select>
                                <el-button v-if="Limmit.length>1" class="QoptionButton" @click="delLimmit(index)"><i class="el-icon-delete"></i> </el-button>

                            </el-form-item>
                        </div>
                        <div style="text-align: right ;margin-right: 40px" >
                            <el-button class="QoptionButton" @click="addLimmit"><i class="el-icon-circle-plus-outline"></i>添加适用范围</el-button>
                        </div>
                    </div>
                </el-form>


            </div>
        </div>
        <ul v-show="visible" :style="{left:styleObj.left+'px',top:styleObj.top+'px'}" class="contextmenu">
            <li >
                新增
                <i class="el-icon-caret-right"></i>
                <ul>
                    <li @click='addBigItem' v-if="showFileItem.bigItem">工作大项</li>
                    <li @click='addChildItem' v-if="showFileItem.ChildItem">工作小项</li>
                    <li @click='addChildItem' v-if="showFileItem.content">工作内容</li>
                    <li @click='delData' v-if="showFileItem.instructionA">事前说明</li>
                    <li @click='delData' v-if="showFileItem.instructionB">事后说明</li>
                    <li @click='delData' v-if="showFileItem.AfterTable">事后附表</li>
                </ul>

            </li>
            <li @click='delData' v-if="showFileItem.del">删除</li>

        </ul>

    </div>
</template>

<script>
    import request from '@lib/axios.js';
    export default {
        name: "three",
        props:{
            type:String,
        },
        components: { },
        data() {
            return {
                Limmit:[{type:'',values:[]}],
                formItem:{addLogo:true,noSmallItem:true,noSignTime:true,},
                filterText:'',
                dataTreeObj:{},
                AircraftTypeObj:{},
                AircraftType:[],
                dataTree:[],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                options:{},
                showFileItem:{},
                visible:false,
                styleObj:{left:1,top:1},

                rules:{},
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            },
            visible(value) {
                console.log(value)
                if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                    console.log("删除contentMenu")
                    document.body.removeEventListener('click', this.closeMenu)
                }
            },

        },
        methods: {
            noSmallItemC(val){
                if(val){
                    this.Limmit=[{type:'',values:[]}]
                }else{
                    if(this.formItem.role){
                        this.formItem.role=null
                    }
                    this.Limmit=[]
                }
            },
            limmitTypeC(index){
                this.Limmit[index].values=[]
            },
            delLimmit(index){
              this.Limmit.splice(index,1)
            },
            addLimmit(){
              this.Limmit.push({type:'',values:[]})
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            addBigItem(){

            },
            addChildItem(){

            },
            openMainMenuFn(e,obj){
                const left = e.clientX// - offsetLeft // 15: margin right
                this.styleObj.left = left
                this.styleObj.top = e.clientY// - 60 // fix 位置bug
                if(obj){

                    if(obj.noSmallItem){
                        this.showFileItem={
                            del:true,
                             content:true,
                        }
                    }else{
                        this.showFileItem={
                            del:true,
                            ChildItem:true,
                         }
                    }
                }else{
                    this.showFileItem={
                        bigItem:true,
                        instructionA:true,
                        instructionB:true,
                        AfterTable:true,
                    }
                }
                this.visible = true
            },
            closeMenu() {
                this.visible = false
            },
            delData(){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        this.$message({type: 'success',message: '删除成功'});


                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });
            },
            save (form){
                return new Promise((resolve, reject)=>{
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            request({
                                url:`${this.$ip}/mms-workorder${url}`,
                                method: 'post',
                                data:obj,
                            }).then((data) => {
                                resolve(true)
                            })
                        }
                    });
                })
            },
            getInfo( ){
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                }).then((d) => {
                    if(d.code==200){
                        // this.tableData=d.data.contentVOList
                    }
                })
            }
        },
        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['roleControl','applyRangeType','EngineNo']
            }).then(d => {
                let obj=d.data
                this.options=obj
            });
            request({
                url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                method: 'get',
            }).then(d => {
                if( d.data&&d.data.length){
                    this.AircraftType=d.data
                    d.data.map((k,l)=>{
                        this.AircraftTypeObj[k.id]=k
                    })
                }
            });
        },
    }
</script>

<style lang="scss" scoped>

    .threeBan{
        margin-top: 30px;

        display: flex;
        justify-content: left;
        height:calc(100vh - 400px);
        border: 1px black solid;
        .threeBanFirst{
            border-right: 1px black solid;
            height:calc(100vh - 402px);
            width: 320px;
            padding: 15px;
        }
        .threeBanSecond{
            padding: 15px;
            margin: 0;
            width: calc(100% - 320px);
            overflow-y: auto;
            /deep/ .el-form{
                height:auto;
                text-align: left;
                width: 100%;
                margin: 0;
                padding: 0px;
                .widthOne{

                    .el-select:first-child{
                        width: 260px;
                    }
                    .el-select:nth-child(2){
                        width: calc(100% - 306px);
                    }
                }
                .widthOne1{
                    .el-input:first-child{
                        width: 260px;
                    }
                }
                .row_one{
                    .el-form-item__label{
                        width: 120px;
                        text-align: left;
                        padding: 0;
                    }
                    .el-form-item__content{
                        width: calc(100% - 120px);
                    }
                }
            };
        }
    }

    .contextmenu{
        list-style:none;
        position: absolute;
        width:100px;
         background: #fff;
        border-radius: 4px;
        margin:0;
        padding:0;
        border: 1px solid #d9d9d9;
        z-index: 110;
        li{
            position: relative;
            list-style:none;
             width:100%;
            line-height: 40px;
             padding:3px;
            text-align: center;
            border-bottom:1px solid #d9d9d9;
            &:hover{
                background:#ccc;
                cursor:pointer;
                ul{
                    display: block;
                }
            }
            &:last-child{
                border:none;
            }
            i{
                position: absolute;
                right:5px;
                top:calc(50% - 7px)
            }
            ul{
                display: none;
                list-style:none;
                position: absolute;
                width:200px;
                 background: #fff;
                border-radius: 4px;
                margin:0;
                padding:0;
                border: 1px solid #d9d9d9;
                z-index: 110;
                left:99px;
                top:0;

            }
        }
    }
</style>