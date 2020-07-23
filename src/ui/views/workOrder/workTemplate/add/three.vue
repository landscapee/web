<template>
    <div class="three">
        <div class="threeHead G_form">

                <el-form ref="form" label-position="right" :model="form" :rules="rules"  :inline="true"  >

                    <div class="row_five">
                        <el-form-item  label="内容布局方式：" prop="contentLayout">
                            <el-select      v-model="form.contentLayout" placeholder="请选择">
                                <el-option v-for="(opt,index) in options.contentLayoutType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item  label="项次标签：" prop="itemLabel">
                             <el-input   v-model="form.itemLabel" placeholder="请输入中文 "></el-input>
                             <el-input   v-model="form.itemLabelEnglish" placeholder="请输入英文 "></el-input>
                        </el-form-item>
                        <el-form-item  label="内容标签：" prop="contentLabel">
                            <el-input   v-model="form.contentLabel" placeholder="请输入中文 "></el-input>
                            <el-input   v-model="form.contentLabelEnglish" placeholder="请输入英文 "></el-input>                        </el-form-item>
                        <el-form-item  label="工作者标签：" prop="workerLabel	">
                            <el-input   v-model="form.workerLabel	" placeholder="请输入中文 "></el-input>
                            <el-input   v-model="form.workerLabelEnglish" placeholder="请输入英文 "></el-input>                        </el-form-item>
                        <el-form-item  label="指挥者标签：" prop="commanderLabel">
                            <el-input   v-model="form.commanderLabel" placeholder="请输入中文 "></el-input>
                            <el-input   v-model="form.commanderLabelEnglish" placeholder="请输入英文 "></el-input>
                        </el-form-item>
                    </div>
                </el-form>
        </div>
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

                    <div class="row_one widthOne">
                        <el-form-item  label="项次编号：" prop="courseCode1">
                            <el-input   v-model="formItem.courseName" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="工作大项名称：" prop="courseCode1">
                            <el-input   v-model="formItem.courseName" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="courseCode1">
                            <el-checkbox v-model="formItem.checked">添加标识：</el-checkbox>
                            <el-checkbox v-model="formItem.checked">N/A</el-checkbox>
                            <el-checkbox v-if="formItem.checked" v-model="formItem.checked">导出显示</el-checkbox>
                            <i></i>
                            <el-checkbox v-model="formItem.checked">N/A</el-checkbox>
                            <el-checkbox v-if="formItem.checked" v-model="formItem.checked">导出显示</el-checkbox>
                            <i></i>
                            <el-checkbox v-model="formItem.checked">N/A</el-checkbox>
                            <el-checkbox v-if="formItem.checked" v-model="formItem.checked">导出显示</el-checkbox>
                            <i></i>
                        </el-form-item>
                    </div>  <div class="row_one">
                        <el-form-item  label="" prop="courseCode1">
                            <el-input   v-model="formItem.courseName" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="courseCode1">
                            <el-input   v-model="formItem.courseName" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one widthOne">
                        <el-form-item  label="角色权限控制：" prop="courseCode1">
                            <el-input   v-model="formItem.courseName" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one widthOne">
                        <el-form-item  label="适用范围类型：" prop="courseCode1">
                            <el-input   v-model="formItem.courseName" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                </el-form>


            </div>
        </div>
        <ul v-show="visible" :style="{left:styleObj.left+'px',top:styleObj.top+'px'}" class="contextmenu">
            <li @click='addBigItem'>工作大项</li>
            <li @click='addChildItem'>新增子项</li>
            <li @click='addChildItem'>工作小项</li>
            <li @click='addChildItem'>工作内容</li>
             <li @click='delData'>删除</li>
             <li @click='delData'>事前说明</li>
             <li @click='delData'>事后说明</li>
             <li @click='delData'>事后附表</li>
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
                form:{},
                formItem:{},
                  filterText:'',
                dataTreeObj:{},
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

                }else{
                    this.showFileItem={
                        instruction:true,
                        bigItem:true,
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
                data:["contentLayoutType"]
            }).then(d => {
                let obj=d.data
                this.options=obj
            });
        },
    }
</script>

<style lang="scss" scoped>
    .threeHead{
        margin-bottom: 20px;
    }
    .threeBan{
        display: flex;
        justify-content: left;
        height:calc(100vh - 400px);
        border: 1px red solid;
        .threeBanFirst{
            border-right: 1px black solid;
            height:calc(100vh - 402px);
            width: 250px;
            padding: 15px;
        }
        .threeBanSecond{
            width: calc(100% - 250px);
            overflow-y: auto;
            /deep/ .el-form{
                height:auto;
                text-align: left;
                width: 100%;
                padding: 15px;
                .widthOne{
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
    .G_form{
         margin: 0;
         /deep/ .el-form{
             height:auto;

             text-align: left;
            width: 100%;
             padding: 0;
             .row_five{
                 .el-form-item{
                     padding-left: 30px;
                     margin : 0;
                 }
                 .el-form-item:first-child{
                     padding: 0 30px 0 0;
                 }
                 .el-form-item:nth-child(2){
                     border-left: 1px black solid;
                 }

                 .el-form-item__content{
                     width: 111px;
                 }
                 .el-input{
                     width:111px;
                 }
                 .el-form-item__label{
                     width: auto;
                     text-align: left;
                     padding: 0;
                 }
             }


        };

    }
      .contextmenu{
        list-style:none;
        position: absolute;
        width:300px;
        background: #fff;
        border-radius: 4px;
        margin:0;
        padding:0;
        border: 1px solid #d9d9d9;
        z-index: 110;
        li{
            list-style:none;
            text-indent: 2em;
            width:100%;
            line-height: 44px;
            text-align: left;
            padding:3px;
            border-bottom:1px solid #d9d9d9;
            &:hover{
                background:#ccc;
                cursor:pointer;
            }
            &:last-child{
                border:none;
            }
        }
    }
</style>