<template>
    <div class="addSysParameter">
        <div class="left">
            <div class="top-content">
                <div class="top-content-title">
                    <span><icon iconClass="file" class='wenjian'></icon> {{historyList.length?historyList[0].fileName:'无文件'}} <b>-历史版本</b></span>
                </div>
            </div>
            <div class="main-content">
                <div class="lists">
                    <div class="list" v-for='(item, index) in historyList' :key='index'>
                        <div class='row' v-if='index===0' style='background:#f3f2f2;'>
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
                            <div class="btn_box">
                                <el-button type="primary" @click='fileDownloadFn(item)'>下载</el-button>
                            </div>
                        </div>
                        <div class='row' v-else>
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
                            <div class="btn_box">
                                <el-button type="primary" @click='recoverFn(item)'>恢复</el-button>
                                <el-button type="primary" @click='fileDownloadFn(item)'>下载</el-button>
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
            historyList:[]
        }
    },
    mounted(){
       this.init()
    },
    methods:{
        init(){
            this.historyListFn()
        },
        historyListFn(){
            request({
                url: `${this.$ip}/mms-knowledge/file/historyList/${this.$route.query.id}`, 
                method: 'get',
            })
            .then((data) => {
                if(data.code==200){
                    this.historyList = data.data
                }else{
                    this.historyList = []
                }
            })
        },
        recoverFn(item) {
            request({
                url:`${this.$ip}/mms-knowledge/file/recovery/${item.id}`,
                method: 'get',
            }).then((data) => {
                if(data.code==200){
                    this.$message.success("操作成功！");
                    this.init()
                }else{
                    this.$message({
                        showClose: true,
                        message: '文件操作失败',
                        type: 'error'
                    });
                    return
                }
            })
        },
        fileDownloadFn(item){
            let Url = `${this.$ip}/mms-file/get-file-stream-by-file-path/?filePath=${item.fileUrl}`
            let a = document.createElement('a');
            document.body.appendChild(a);
            a.href = Url;
            a.click();
            document.body.removeChild(a);
        },
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
        width:1300px;
        overflow-y: auto;
        margin-top: 30px!important;
        .lists{
            height: 600px;
            overflow-y:auto;
            padding:0 50px;
            .list{
                .row{
                    display:flex;
                    width:1200px;
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
    }
</style>