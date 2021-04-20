<template lang="html">
    <div class="onlineTest "  >
        <div class="QCenterRight">
            <div class="QHead">
                {{this.$route.path == '/testManagePushStaff'?'考试推送员工':'培训推送员工'}}
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
                    <span class="form_div_span" >{{this.$route.path == '/testManagePushStaff'?'考试名称':'培训名称'}}：{{showInfo.examName}}</span>
                    <span  >时间：{{$moment(showInfo.examTime).format('YYYY-MM-DD HH:mm:ss')}} </span>
                    <span  >地点：{{showInfo.examSite}}</span>
                </div>
                <div style="margin: 20px 0 10px 0">
                    <span style="font-size: 14px; color: #222222;">已选择&nbsp;<span style="color:#3280e7">{{userSelect.length}}</span>&nbsp;人</span>
                </div>
                <div  class="rowDiv">
                    <el-row>
                        <el-col :span="12" class="rightBorder" >
                            <div>
                                <el-card class="box-card" shadow="never" border-radius="2px">
                                    <div style="height:300px" v-loading="!data.length" >
                                        <Tree  :data="data" ref="tree" @handleSelect="getListById" :expand-on-click-node="false" :isShow="isShow"   :defaultUnCheck="true"  > </Tree>
                                    </div>
                                </el-card>
                            </div>
                        </el-col>
                        <el-col :span="12">
                            <div>
                                <el-card class="box-card" shadow="never" border-radius="2px">
                                    <el-scrollbar style="height:310px">

                                        <div class="elinput" >
                                            <el-input class="input"  ref="input" placeholder="输入关键字进行搜索" @input="filterTextC" v-model="filterText"> </el-input>
                                        </div>
                                        <div v-show="personList.length == 0">暂无数据</div>
                                        <el-checkbox v-show="personList.length > 0" v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
                                        <div class="item" v-for="(item, index) in personList" :key="item.id">
                                            <div class="item-time">
                                                <el-checkbox v-model="userSelect" @change="userSelectC"   :label="item">{{item.name}}</el-checkbox>
                                            </div>
                                        </div>
                                    </el-scrollbar>
                                </el-card>
                            </div></el-col
                        >
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div>
                                <el-card class="box-card" shadow="never" border-radius="2px">
                                    <div>已选择({{ userSelect.length }})：<el-button style="float:right" size="mini" @click="handleClear">清空</el-button></div>
                                    <el-scrollbar style="height:120px ">
                                        <el-tag :key="tag.id" v-for="(tag,index) in userSelect" closable :disable-transitions="false" @close="handleRemove(tag.id,index)">
                                            {{ tag.name }}
                                        </el-tag>
                                    </el-scrollbar>
                                </el-card>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
     import Tree from '@components/Tree/index';
    import { formatTreeData } from '@lib/tools.js';
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
     import { extend, get, cloneDeep, filter, some, flow, concat, map } from 'lodash';
    export default {
        name: 'Users',
        components: {
            Tree,Icon
        },
        data() {
            return {
                form: {employeeAnswer:'' },
                rules: {
                    aa:[{required:true,message:'请输入',trigger:'blue'}]
                },
                selectedPersonList: [],
                showInfo: {},
                 filterText:'',
                personNodeIdObj:{},
                userSelect:[],

                isShow: {input:true},
                first: true,
                selectAll: false,
                 personList: [],
                deptList: [],
                data: [],
                selectId: null,
                selectNode: {},
                type:"",
                OrgUser:[],
                OrgUserObj:{},
                orgObj:{
                    ORG:'orgId',
                    DEPT:'deptId',
                    GROUP:'groupId',
                }
            };
        },
        props:['treeType'],
        watch: {

        },
        methods: {
            filterTextC(val){
                if (!val){
                    this.personList= this.personNodeIdObj[this.selectNode.id]
                    return false
                }
                this.personList=[]
                this.personNodeIdObj[this.selectNode.id].map((k,l)=>{
                    k.name.indexOf(val) !== -1? this.personList.push(k):''
                })
            },
            isAllSelect(){
                let flag=true
                this.personList.map((k,l)=>{
                    const idx = this.userSelect.findIndex((d) => d.id === k.id);
                    if( idx==-1){
                        flag=false
                    }
                })
                return flag
            },
            userSelectC(){
                this.selectAll = this.isAllSelect();
            },
            pushStaff(){
                let employeeList=[]
                employeeList=  this.userSelect.map((k,l)=>{
                    return{
                         employeeNo:k.workNumber,
                        employeeId:k.id,
                        employeeName:k.name,
                    }
                })
                let url='examInfo/send'
                let obj={
                    paperId:this.$route.query.paperId,
                    id:this.$route.query.id,
                    employeeList
                }
                if(this.$route.path == '/trainManageAdminPush'){
                    url='trainingInfo/send';
                }
                request({
                    url: `${this.$ip}/mms-training/${url}`,
                    method: 'post',
                    data:obj,
                }).then((d) => {
                    if(d.code==200){
                        this.$message.success('推送成功')
                        this.$router.go((-1))
                    }
                });
            },
            handleClear() {
                 this.selectAll = false;
                this.userSelect=[]
            },
            handleRemove(id,index) {
                this.userSelect.splice(index,1)
                this.selectAll = this.isAllSelect();
            },

            getAllUserByOrgId(param,arr){
                let url=''
                if (this.type == 'ORG') {
                    url='/sys/user/getAllUserByOrgId'
                    param.orgId = this.selectId;
                } else {
                    url='/sys/user/getUsersByDeptId'
                    param.deptId = this.selectId;
                }
                return request({
                    headers: { 'Content-Type': 'text/plain' },
                    url: url,
                    method: 'get',
                    params:param,
                }).then((d) => {
                    if(this.first===true){
                        this.OrgUser=d.data
                        this.first=1
                        let arr=[...this.userSelect]
                        this.userSelect=[]
                        d.data.map((k,l)=>{
                            const idx = arr.findIndex((op) => op.id === k.id);
                            if( idx>-1){
                                arr.splice(idx,1)
                                this.userSelect.push(k)
                            }
                        })
                    }else{
                        this.first=2
                    }

                    return Promise.resolve(d,null);

                });

            },
            dealData(d,arr,node){
                if(node.user&&node.user.length){
                    arr=node.user
                }else{
                    d.map((k,l)=>{
                        if( node['id']==k[this.orgObj[this.type]]){
                            arr.push(k)
                        }
                    })
                }


            },
            handleSelectAll(val) {
                this.personList.map((k,l)=>{
                    const idx = this.userSelect.findIndex((d) => d.id === k.id);
                    if(this.selectAll){
                        if( idx==-1){
                            this.userSelect.push(k)
                        }
                    }  else{
                        if( idx>-1){
                            this.userSelect.splice(idx,1)
                        }
                    }
                })
            },
            getListById(node) {
                this.filterText=''
                if (node && node.id) {
                    this.selectId = node.id;
                    this.selectNode = node;
                    this.type = node.type;
                }
                if(this.personNodeIdObj[node.id]){
                    this.personList=this.personNodeIdObj[node.id]
                    return false
                }
                let param = { pageNum: 1, pageSize: 99999 };
                this.getAllUserByOrgId(param).then((d) => {
                    let arr=d.data

                    if(this.first===2){  //非第一次
                        arr=d.data.map((k,l)=>{
                            let index=this.OrgUser.findIndex((k1)=>k1.id==k.id)
                            return this.OrgUser[index]
                        })
                    }
                    this.personNodeIdObj[node.id]=arr
                    this.personList =this.personNodeIdObj[node.id]
                    this.selectAll = this.isAllSelect();
                });
            },


            getTree() {
                let userInfo= this.$store.getters.userInfo
                console.log(userInfo,5,6);
                let orgId = userInfo.orgId;
                // let deptId = userInfo.deptId;
                // let administrativeId = userInfo.administrativeId;
                request({
                    url: 'sys/org/getOrgById',
                    method: 'get',
                    params:{id:orgId},
                }).then((d1) => {
                    if(d1.responseCode==1000){
                        request({
                            url: 'sys/department/getAllDepartmentByOrgId',
                            method: 'get',
                            params:{orgId:orgId},
                        }).then((d) => {
                            this.data=[
                                {
                                    name:d1.data.name,
                                    type:'ORG',
                                    id:d1.data.id,
                                    children:d.data||[]
                                }
                            ]
                        });
                    }
                });
            },
            findCurrentDept(dept, deptId) {
                if (dept.data.id == deptId) {
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
                this.type='ORG'
                this.personList=[]
                this.data =[]
                this.OrgUser =[]
                this.first=true
                this.selectId=null
                this.selectNode={}
                this.personNodeIdObj={}
                this.dialogVisible = false;
            },
            handleSave() {

                this.$emit('onSelected', this.userSelect,this.deptList);
                this.handleClose();
            },

        },
        created(){

            if(this.$route.path == '/testManagePushStaff'||this.$route.path == '/trainManageAdminPush'){
                this.getTree( );
                this.selectAll = false;
                this.selectedPersonList =   [];
                let url=this.$route.path == '/testManagePushStaff'?'examInfo/info':'trainingInfo/info'
                request({
                    url:`${this.$ip}/mms-training/${url}/${this.$route.query.id}`,
                    method: "get",
                }).then(d => {
                    if(d.code==200){
                        if(this.$route.path == '/testManagePushStaff'){
                            this.showInfo={...d.data }
                        }else{
                            this.showInfo={
                                examName:d.data.trainingName,
                                examTime:d.data.startTime,
                                examSite:d.data.trainingPlace,
                            }
                        }
                    }

                })
            }

        },

    };
</script>

<style scoped lang="scss">
    .onlineTest{
        padding: 0 30px ;
        .form{
            width: 800px;
        }

    }
    /deep/  .el-row:first-child{
        border-bottom:1px solid #979797;
    }
    .rowDiv{
        border:1px solid #979797;
        border-radius: 2px;
    }
    /deep/ .el-row{
         .rightBorder{
            border-right: 1px solid #979797;
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
   /deep/ .el-scrollbar__view{
       .el-tag{
           height:30px;
           margin:5px  5px 0px 0;
       }
   }
    /deep/ .elinput {
        margin: 10px 0;
        height: 30px;
        width:100%;
        .el-input{
            width:calc(100% - 2px);
        }
    }
    /deep/ .el-input__inner {
        height: 30px;
        width: 100%;
    }
</style>
