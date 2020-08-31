<template>
    <div class="onlineTest "  >
        <div class="QCenterRight">
            <div class="QHead">
               考试推送员工
            </div>
            <div  class="QheadRight">

                <div @click="handleClear"  >
                    <icon  iconClass="reset "></icon>重置
                </div>
                <div @click="pushStaff"  >
                    <icon iconClass="save" style="width: 0"></icon>推送
                </div>
            </div>
        </div>
        <div class="bannerCenter "  >

        </div>
        <div style="display: flex;justify-content: center" >
            <div class="form"   >
                <div style="display: flex;justify-content: space-between;margin-top: 16px">
                    <span class="form_div_span" >考试名称：{{showInfo.examName}}</span>
                    <span  >时间：{{$moment(showInfo.examTime).format('YYYY-MM-DD HH:mm:ss')}} </span>
                    <span  >地点：{{showInfo.examSite}}</span>
                </div>
                <div style="margin: 20px 0 10px 0">
                    <span style="font-size: 14px; color: #222222;">已选择&nbsp;<span style="color:#3280e7">{{selectedPersonList.length}}</span>&nbsp;人</span>
                </div>
                <el-row>
                    <el-col class="rightBorder" :span="12">
                        <div>
                            <el-card class="box-card" shadow="never" border-radius="2px">
                                <el-scrollbar style="height:500px">
                                    <Tree :data="data" ref="tree" @handleSelect="getListById" :expand-on-click-node="false" :isShow="isShow" :isShow.input="false" :defaultUnCheck="true"> </Tree>
                                </el-scrollbar>
                            </el-card>
                        </div>
                    </el-col>
                    <el-col :span="12">
                        <div>
                        <el-card class="box-card" shadow="never" border-radius="2px">
                            <el-scrollbar style="height:500px">
                                <div v-show="personList.length == 0">该部门暂无人员</div>
                                <el-checkbox v-show="personList.length > 0" v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
                                <div class="item" v-for="(item, index) in personList" :key="item.id">
                                    <div class="item-time">
                                        <el-checkbox v-model="item.selected" @change="handleSelect(item)">{{ item.name }}</el-checkbox>
                                    </div>
                                </div>
                            </el-scrollbar>
                        </el-card>
                    </div></el-col
                    >
                </el-row>
                <!--<el-row>-->
                    <!--<el-col :span="24">-->
                        <!--<div>-->
                            <!--<el-card class="box-card" shadow="never" border-radius="2px">-->
                                <!--<div>已选择({{ selectedPersonList.length }})：<el-button style="float:right" size="mini" @click="handleClear">清空</el-button></div>-->
                                <!--<el-scrollbar style="height:120px ">-->
                                    <!--<el-tag :key="tag.id" v-for="tag in selectedPersonList" closable :disable-transitions="false" @close="handleRemove(tag.id)">-->
                                        <!--{{ tag.name }}-->
                                    <!--</el-tag>-->
                                <!--</el-scrollbar>-->
                            <!--</el-card>-->
                        <!--</div>-->
                    <!--</el-col>-->
                <!--</el-row>-->
                <!--<el-row>-->
                    <!--<el-col :span="24"></el-col>-->
                <!--</el-row>-->

            </div>


        </div>

     </div>
</template>
<script>
    import { formatTreeData } from '@lib/tools.js';
    import Tree from '@components/Tree/index';

    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend,flow ,map} from "lodash";
    export default {
        components: {
            Icon,Tree
        },
        name: "",
        data() {

            return {
                form: {employeeAnswer:'' },
                rules: {
                    aa:[{required:true,message:'请输入',trigger:'blue'}]
                },
                isShow: false,
                selectAll: false,
                 personList: [],
                selectedPersonList: [],
                data: {},
                showInfo: {},
                selectId: null,
                selectNode: {},
                type:""

            };
        },

        created() {
            if(this.$router.history.current.path == '/testManagePushStaff'){
                this.getTree(true );
                this.selectAll = false;
                this.selectedPersonList =   [];
                request({
                    url:`${this.$ip}/mms-training/examInfo/info/${this.$route.query.id}`,
                    method: "get",
                }).then(d => {
                    this.showInfo={...d.data }
                })
            }

         },
        mounted(){

        },
        methods: {
            pushStaff(){
                let employeeList=[]
                employeeList=  this.selectedPersonList.map((k,l)=>{
                    return{
                        employeeId:k.userNumber,
                        employeeName:k.name,
                    }
                })
                   request({
                    url: `${this.$ip}/mms-training/examInfo/send`,
                    method: 'post',
                    data:{
                        paperId:this.$route.query.paperId,
                        id:this.$route.query.id,
                        employeeList
                    },
                }).then((d) => {
                    if(d.code==200){
                        this.$message.success('推送成功')
                        this.$router.go((-1))
                    }
                });
            },
            resetForm(){

            },
            handleSelect(item) {
                console.log(item);
                console.log(this.selectedPersonList);
                if (item.selected) {
                    const idx = this.selectedPersonList.findIndex((d) => d.id === item.id);
                    if (idx == -1) {
                        this.selectedPersonList.push({
                            id: item.id,
                            name: item.name,
                        });
                    }
                } else {
                    this.doHandleRemove(item.id);
                }
            },
            handleSelectAll() {
                if (this.selectAll) {
                    this.personList.forEach(function(item) {
                        item.selected = true;
                    });
                } else {
                    this.personList.forEach(function(item) {
                        item.selected = false;
                    });
                }

                let _this = this;

                this.personList.forEach(function(item) {
                    _this.handleSelect(item);
                });
            },
            handleClear() {
                this.selectedPersonList = [];
                this.selectAll = false;
                this.personList.forEach(function(item) {
                    item.selected = false;
                });
            },
            handleRemove(id) {
                this.doHandleRemove(id);
                const idx = this.personList.findIndex((d) => d.id === id);
                if (idx > -1) {
                    this.personList[idx].selected = false;
                }
            },
            doHandleRemove(id) {
                const idx = this.selectedPersonList.findIndex((d) => d.id === id);
                if (idx > -1) {
                    this.selectedPersonList.splice(idx, 1);
                }
            },
            getListById(node) {
                if (node && node.id) {
                    this.selectId = node.id;
                    this.selectNode = node;
                    this.type = node.type;
                }
                let fetch;
                let param = { pageNum: 1, pageSize: 99999 };
                if (this.type == 'ORG') {
                    fetch = (params)=>{
                        return request({
                            headers: { 'Content-Type': 'text/plain' },
                            url: `/sys/user/getAllUserByOrgId`,
                            method: 'get',
                            params,
                        }).then((d) => {
                            return Promise.resolve(d);
                        });
                    }
                    param.orgId = this.selectId;
                } else {
                    fetch = (params)=>{
                        return request({
                            url: '/sys/user/getUsersByDeptId',
                            method: 'get',
                            params,
                        }).then((d) => {
                            return Promise.resolve(d);
                        });
                    }
                    param.deptId = this.selectId;
                }
                fetch(param).then((d) => {
                    let list = d.data.list ? d.data.list : d.data;
                    let idArry = [];
                    this.selectedPersonList.forEach((item) => {
                        idArry.push(item.id);
                    });
                    let flag = false;
                    list.forEach((item) => {
                        if (!idArry.includes(item.id)) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        this.selectAll = false;
                    } else {
                        this.selectAll = true;
                    }
                    flow([
                        (d) => {
                            return map(d, (f) => {
                                return {
                                    id: f.id,
                                    name: f.name,
                                    idCard: f.userExt==null?"":f.userExt.idCard,
                                    selected: this.isSelected(f.id),
                                };
                            });
                        },
                        (d) => {
                            this.personList = d;
                        },
                    ])(list);
                });
            },
            isSelected(id) {
                const idx = this.selectedPersonList.findIndex((d) => d.id === id);
                return idx > -1;
            },
            getTree(currentDept) {
                let orgId = this.$store.getters.userInfo.orgId;
                let deptId = this.$store.getters.userInfo.deptId;
                let administrativeId = this.$store.getters.userInfo.administrativeId;
                request({
                    url: '/sys/org/getAllTree',
                    method: 'get',
                    params:{},
                }).then((response) => {
                    if (currentDept) {
                        this.findCurrentDept(response.data[4], orgId);
                    } else {
                        this.data = formatTreeData(response.data);
                    }
                });
            },
            findCurrentDept(dept, deptId) {
                if (dept.data.id == deptId) {
                    // console.log('--------' + dept.data.id + '--' + dept.data.name + '---' + deptId);
                    this.data = formatTreeData([dept]);
                    return;
                }
                if (dept.children && dept.children.length > 0) {
                    for (let i = 0; i < dept.children.length; i++) {
                        let child = dept.children[i];
                        this.findCurrentDept(dept.children[i], deptId);
                    }
                }
            },
            handleClose() {
                this.dialogVisible = false;
            },
            handleSave() {
                this.handleClose();
                this.$emit('onSelected', this.selectedPersonList);
            },

            getList(num){
                request({
                    url: `${this.$ip}/mms-training/examLine/join`,
                    method:'post',
                    data:this.params
                }).then((d)=>{
                    // d.data


                })
            },
        }
    };
</script>
<style scoped lang="scss">
    .onlineTest{
        padding: 0 30px ;
        .form{
            width: 800px;
        }

    }
    /deep/ .el-row{
        border: 1px solid #888888;
        .rightBorder{
            border-right: 1px solid #888888;
        }
        .el-card{
            border:0;
            .item{
                margin: 20px 0;
            }
            .el-checkbox__label{
                padding-left: 15px;
            }
            .el-scrollbar__wrap{
                overflow-x: hidden;
            }
        }
    }

</style>
