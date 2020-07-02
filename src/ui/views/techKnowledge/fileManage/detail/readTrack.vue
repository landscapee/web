<template>
    <div class="addSysParameter">
        <div class="left">
            <div class="top-content">
                <div class="top-content-title">
                    <span><icon iconClass="file" class='wenjian'></icon> {{fileInfo.fileName}} <b>-阅读推送</b></span>
                </div>
            </div>
            <div class="main-content">
                <div class="lists">
                    <div class="list">
                        <div class='row' style='background:#f3f2f2;'>
                            <div class="l_left_b">
                                <icon iconClass="file" class='wenjian'></icon>
                            </div>
                            <div class="l_right_b">
                                <div class="l_r_b_t">
                                    <div class="l_r_b_t_name">{{fileInfo.fileName}}</div>
                                    <div class="l_r_b_t_version">{{fileInfo.version}}</div>
                                    <div class="l_r_b_t_size">{{fileInfo.size}}KB</div>
                                </div>
                                <div class="l_r_b_b">
                                    <div class="l_r_b_time">有效期 {{fileInfo.startTime | formatDate}} 至 {{fileInfo.endTime | formatDate}} </div>
                                    <div class="l_r_b_from">上传于 {{fileInfo.createTime | formatDate('YYYY-MM-DD HH:MM')}}  {{fileInfo.userName}}</div>
                                    <div class="l_r_b_load_count">{{fileInfo.downloadCount || '0'}}次下载</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main_form">
                    <el-form  label-position="right" align='left' :model="form" :rules="rules" ref="form" >
                        <div class="row_item_row row_item">
                            <el-form-item label="阅读推送：" prop="description">
                                <el-input v-model="form.description" readonly type="textarea" :rows="3"  placeholder="请选择阅读推送"></el-input>
                            </el-form-item>
                        </div>
                    </el-form>
                </div>
                <div class="list2">
                    <span class="text">已选{{selectedPersonList.length}}对象</span>
                    <el-button type="primary" @click="choiceSelectFn">对象选择</el-button>
                    <el-button type="primary" @click="confirmPushFn">确定推送</el-button>
                </div>
                <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
                <div class="cont">
                    <div class="c_header">
                        <div class="label">阅读跟踪：</div>
                        <div class="value">共推送{{readList.length}}人&nbsp;&nbsp;已读{{readList.filter(i=>i.read==2).length}}人&nbsp;&nbsp;未读{{readList.filter(i=>i.read=='0').length}}人</div>
                    </div>
                    <div class="readLists" v-show='readList.length'>
                        <div class="list" v-for='(item, index) in readList' :key='index' >
                            <div class="row">
                                <div class="name">{{item.downloadTime | formatDate('YYYY-MM-DD HH:MM')}}{{item.userName}}</div> <!--（维修）-->
                                <div class="type">{{readStatus[item.read]}}</div>
                                <div class="time">{{item.readingTime}}min</div>
                            </div>
                        </div>
                    </div>
                    <div class="readLists" v-show='!readList.length'>
                        <div class="list">
                            <div class="noData">
                                未推送
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Icon from '@components/Icon-svg/index'
import userTree from '@components/userTree/index';
import request from '@lib/axios.js'
import moment from 'moment'
export default {
    components:{
        Icon,
        userTree
    },
    filters: {
        formatDate (val, format='YYYY-MM-DD') {
            var val = Number(val);
            if (!isNaN(val)){
                return moment(val).format(format)
            }else{
                return '' // /file//recovery/{id}
            }
        }
    },
    data(){
        return{
            fileInfo:[],
            form:{
                description:''
            },
            rules: {  // 维修部 - 维修- 放行     勤务部 -> 勤务
                description: [{ required:true,message:'请选择阅读推送', trigger: "change" }]
            },
            readStatus:{
                '0': '未阅读',
                '1': '阅读中',
                '2': '已阅读'
            },
            selectedPersonList: [],
            deptList: [],
            readList:[]
        }
    },
    mounted(){
       this.init()
    },
    methods:{
        init(){
            this.getByIdFn()
            this.listByFileIdFn(this.$route.query.id)
        },
        getByIdFn(){
            request({
                url: `${this.$ip}/mms-knowledge/file/getById/${this.$route.query.id}`, 
                method: 'get',
            })
            .then((data) => {
                if(data.code==200){
                    this.fileInfo = data.data
                }else{
                    this.fileInfo = []
                }
            })
        },
        choiceSelectFn(){
            this.$refs.userBox.open(this.users, '选择推送对象', true);
        },
        handleUserSelected(selectedPersonList,deptList){
            this.selectedPersonList = selectedPersonList
            this.deptList = deptList
            this.form.description = this.selectedPersonList.map(item=>item.name).join(",")
        },
        confirmPushFn(){
            this.$refs['form'].validate(valid => {
                if (valid) {
                    this.pushBatchFn()
                }
               
            })
        },
        pushBatchFn(){
            let data
            let select = this.selectedPersonList.map(item=>{
                return {
                    userId:item.id,
                    userName:item.name
                }
            })
            data = {
                ids: this.$route.query.id.split(","),
                userVOList: select
            }
            request({
                url:`${this.$ip}/mms-knowledge/file/pushBatch`,
                method: 'post',
                data:data
            })
            .then((data) => {
                if(data.code==200){
                    this.$message.success("推送成功！");
                    this.init()
                    this.selectedPersonList = []
                    this.deptList = []
                    //this.form.description = this.selectedPersonList.map(item=>item.name).join(",")
                }else{
                    this.$message({
                        showClose: true,
                        message: '推送失败',
                        type: 'error'
                    });
                    return
                }
            })
        },
        listByFileIdFn(fileId){
            request({
                url:`${this.$ip}/mms-knowledge/fileStudy/listByFileId/${fileId}`,
                method: 'get',
            })
            .then((data) => {
                if(data.code==200){
                    this.readList = data.data
                }else{
                    this.readList = []
                }
                this.readModelShow = true
                console.log(data)
            })
        },
    }
}
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
    .addSysParameter {
        width: 800px;
        margin:14px auto 0;
        .left{
            position: relative;
            .top-content{
                .top-content-title{
                    span{
                        display: flex;
                        align-items: center;
                        font-size:26px;
                        b{
                            font-size:26px;
                            margin-left:6px;
                        }
                    }
                    .wenjian{
                        width:50px;
                        height:50px;
                    }
                }
            }
        }
    }
    .main-content{
        width:800px;
        overflow-y: auto;
        margin: 30px auto 0 !important;
        .lists{
            overflow-y:auto;
            .list{
                .row{
                    display:flex;
                    width:800px;
                    padding:30px;
                    font-size: 13px;
                    color: #222;
                    cursor: pointer;
                    margin-top:10px;
                    border:1px solid #d9d9d9;
                    position: relative;
                    .l_left_b{
                        width:80px;
                        font-size:30px;
                        display:flex;
                        justify-content: center;
                        align-items: center;
                        .wenjian{
                            font-size: 30px;
                            width:40px;
                            height:40px;
                        }
                    }
                    .l_right_b{
                        .l_r_b_t{
                            display:flex;
                            height: 34px;
                            .l_r_b_t_version{
                                margin:0 10px;
                            }
                            .l_r_b_t_size{
                                color:#999;
                            }
                        }
                        .l_r_b_b{
                            display:flex;
                            line-height:34px;
                            color:#666;
                            .l_r_b_from{
                                margin:0 10px;
                            }
                            .l_r_b_load_count{
                                color:#999;
                            }
                        }
                    }
                    .btn_box{
                        position: absolute;
                        right:10px;
                        top:50%;
                        transform:translateY(-50%);
                    }
                }
            }
        }
        .main_form{
            margin:14px auto 0;
            .el-form {
                width: 800px;
                /deep/ .el-form-item__label {
                    width: 100px;
                }
                /deep/ .el-form-item__content {
                    margin-left: 100px;
                }
                .row_item_row,.row_item{
                    /deep/ .el-form-item{
                        width:calc( 100% - 1px)!important;
                        .el-form-item__content{
                            width: calc( 100% - 100px)!important;
                        }
                        .el-input{
                            width: 100% !important;
                        }
                        .el-textarea{
                            width: 100% !important;
                        }

                    }
                }
                /deep/ .el-input{
                    width: 240px;
                    margin-right: 2px;
                }
                .row_custom{
                    /deep/ .el-form-item__content{
                        /*height: 40px;*/
                        width: 332px;
                        text-align: left;
                    }
                    @include common-input;
                    &:first-child {
                        .el-form-item {
                            &:last-child {
                                //margin-left: 93px;
                            }
                        }
                    }
                }
                .row_item_row{
                    .el-form-item {
                        width: calc(100% - 165px);
                    }
                }
            }
        }
        .list2{
            display:flex;
            align-items: center;
            justify-content: flex-end;
            .text{
                margin-right:10px;
            }
        }
        .cont{
            width:800px;
            padding:20px;
            .close_box{
                height:100px;
                position: relative;
                span{
                    display:block;
                    width:36px;
                    height: 36px;
                    position:absolute;
                    right: 0;
                    top:0;
                    cursor:pointer;
                    .close{
                        width:36px;
                        height:36px;
                    }
                }
            }
            .c_header{
                display:flex;
                .label{

                }
                .value{
                    margin-left:30px;
                }
            }
            .readLists{
                padding:20px 20px 0;
                height:300px;
                overflow-y:auto;
                .list{
                    .row{
                        display:flex;
                        justify-content: space-between;
                        line-height:50px;
                        font-size:14px;
                        .name{
                            width:320px;
                            text-align: left;
                        }
                        .type{
                            width:100px;
                            text-align:left;
                        }
                        .time{
                            width:80px;
                            text-align:right;
                        }
                    }
                    .noData{
                        line-height:50px;
                        text-align:center;
                        color:#999;
                        font-size:16px;
                    }
                }
            }
        }
    }
</style>