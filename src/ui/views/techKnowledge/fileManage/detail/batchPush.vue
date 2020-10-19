<template>
    <div class="addSysParameter">
        <div class="left">
            <div class="top-content">
                <div class="top-content-title">
                    <span>批量推送</span>
                </div>
            </div>
            <div class="main_content">
                <div class="m_c_inner">
                    <div class="list" :class='item.active?"active":""' v-for='(item, index) in fileList' :key='index' @click="fileClickFn(item)">
                        <div class="l_left_b">
                            <icon iconClass="file" class='wenjian'></icon>
                        </div>
                        <div class="l_right_b">
                            <div class="l_r_b_t">
                                <div class="l_r_b_t_name">{{item.fileName}}</div>
                                <div class="l_r_b_t_version">{{item.version}}</div>
                                <div class="l_r_b_t_size">{{item.size}}KB</div>
                            </div>
                            <div class="l_r_b_b">
                                <div class="l_r_b_time">有效期 {{item.startTime | formatDate}} 至 {{item.endTime | formatDate}} </div>
                                <div class="l_r_b_from">上传于 {{item.createTime | formatDate('YYYY-MM-DD HH:MM')}}  {{item.userName}}</div>
                                <div class="l_r_b_load_count">{{item.downloadCount || '0'}}次下载</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="main-content">
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
            </div>
            <div class="cont" v-show='readModelShow'>
                <div class="close_box"><span @click="readCloseFn"><icon iconClass="close" class='close'></icon></span></div>
                <div class="c_header">
                    <div class="label">阅读跟踪：</div>
                    <div class="value">共推送{{readList.length}}人&nbsp;&nbsp;已读{{readList.filter(i=>i.read==2).length}}人&nbsp;&nbsp;未读{{readList.filter(i=>i.read=='0').length}}人</div>
                </div>
                <div class="lists" v-show='readList.length'>
                    <div class="list" v-for='(item, index) in readList' :key='index' >
                        <div class="row">
                            <div class="name">{{item.downloadTime | formatDate('YYYY-MM-DD HH:MM')}}{{item.userName}}</div> <!--（维修）-->
                            <div class="type">{{readStatus[item.read]}}</div>
                            <div class="time">{{item.readingTime}}min</div>
                        </div>
                    </div>
                </div>
                <div class="lists" v-show='!readList.length'>
                    <div class="list">
                        <div class="noData">
                            未推送
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
                return ''
            }

        }
    },
    data(){
        return{
            fileList:[],
            selectedPersonList: [],
            deptList: [],
            users:[],
            form:{
                description:''
            },
            rules: {  // 维修部 - 维修- 放行     勤务部 -> 勤务
                description: [{ required:true,message:'请选择阅读推送', trigger: "change" }]
            },
            readList:[],
            readStatus:{
                '0': '未阅读',
                '1': '阅读中',
                '2': '已阅读'
            },
            readModelShow:false
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getByIdsFn()
        },
        getByIdsFn(){
            let datas = this.$route.query.id.split(",")
            request({
                url:`${this.$ip}/mms-knowledge/file/getByIds`,
                method: 'post',
                data:datas
            })
            .then((data) => {
                if(data.code==200){
                    data.data.forEach(item=>{
                        item.active=false
                    })
                    this.fileList = data.data
                }else{
                    this.fileList = []
                }
                //console.log(data)
                // this.getList();
                // this.selectIds = [];
                // this.$message({type: 'success',message: '删除成功'});
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
        fileClickFn(item){
            this.fileList.forEach(i=>{
                i.active=false
            })
            item.active = true;
            this.listByFileIdFn(item.id)
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
                    this.readCloseFn()
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
        readCloseFn(){
            this.readList = []
            this.readModelShow = false
            this.fileList.forEach(i=>{
                i.active=false
            })
        }
    }
}
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_form.scss";
    .addSysParameter {
        width: 1400px;
        margin:14px auto 0;
        .left{
            position: relative;
        }
        .main_content{
            width:100%;
            .m_c_inner{
                .list{
                    display:flex;
                    width:770px;
                    padding:10px;
                    font-size: 13px;
                    color: #222;
                    cursor: pointer;
                    margin-top:10px;
                    border:2px solid transparent;
                    &.active{
                        border:2px solid #222;
                        border-radius:3px;
                    }
                    &:hover{
                        border:2px solid #222;
                        border-radius:3px;
                    }
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
                }
            }
        }
        .el-form {
            width: 800px;
            /deep/ .el-form-item__label {
                width: 110px;
            }
            /deep/ .el-form-item__content {
                margin-left: 110px;
            }
            .row_item_row,.row_item{
                /deep/ .el-form-item{
                    width:calc( 100% - 32px)!important;
                    .el-form-item__content{
                        width: calc( 100% - 110px)!important;
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
        justify-content: center;
        .text{
            margin-right:10px;
        }
    }
    .main-content{
        width:800px;
        overflow-y: auto;
        margin-top: 30px!important;

        .aRow_custom{
            text-align:left;
        }
    }
    .cont{
        width:500px;
        position: absolute;
        right:0;
        top:0;
        z-index: 100;
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
        .lists{
            margin-top:20px;
            overflow-y: auto;
            height: 500px;
            .list{
                .row{
                    display:flex;
                    line-height:50px;
                    font-size:14px;
                    .name{
                        width:320px;
                    }
                    .type{
                        width:100px;
                    }
                    .time{
                        width:80px;
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
</style>
