<template>
    <div class="addSysParameter">
        <div class="left">
            <div class="top-content">
                <div class="top-content-title"> <!--{{historyList.length?historyList[0].fileName:'无文件'}} -->
                    <span><b>历史版本</b></span>
                </div>
            </div>
            <div class="main-content">
                <div class="lists">
                    <div class="list" v-for='(item, index) in historyList' :key='index'>
                        <div class='row' v-if='index===0'>
                           <div class='row_left'>
                               <span class='ver'>{{item.version}}</span>
                           </div>
                           <div class='row_center'>
                               <div class='line'>
                                   <div class='line1'>
                                       <div class='line2'></div>
                                   </div>
                                   <div class='line3'></div>
                               </div>
                               <div class="row_c_li">
                                   <div class="row_c_li_t">
                                       <span class="text1">{{item.name}}</span>
                                       <span class="text2">{{(item.size/1024).toFixed(1)}}kb</span>
                                       <span class="text3">
                                           <img :src="newVersion" class='wenjian'>
                                           <!-- <icon iconClass="new_version" class='wenjian'></icon> -->
                                        </span>
                                   </div>
                                   <div  class="row_c_li_b">
                                       <span class="text1">{{item.createTime | formatDate('YYYY-MM-DD HH:mm')}}</span>
                                       <span class="text2">{{item.createUserName}}</span>
                                       <span class="text3">生效/失效日期：{{item.startTime | formatDate}}/{{item.endTime | formatDate}}</span>
                                   </div>
                               </div>
                           </div>
                           <div class='row_right'>
                               <div clss="row_btn_group">
                                   <el-button type="primary" icon="el-icon-download">下载</el-button>
                               </div>
                           </div>
                        </div>
                        <div class='row' v-else>
                           <div class='row_left'>
                               <span class='ver'>{{item.version}}</span>
                           </div>
                           <div class='row_center'>
                               <div class='line'>
                                   <div class='_line1'>
                                       <!-- <div class='line2' ></div> -->
                                   </div>
                                   <div class='_line3_' v-if='index===historyList.length-1'></div>
                                   <div class='_line3' v-else></div>
                               </div>
                               <div class="row_c_li">
                                   <div class="row_c_li_t">
                                       <span class="text1">{{item.name}}</span>
                                       <span class="text2">{{(item.size/1024).toFixed(1)}}kb</span>
                                       <span class="text3">
                                           <!-- <img src="../../../assets/img/new_version.png" class='wenjian'> -->
                                           <!-- <icon iconClass="new_version" class='wenjian'></icon> -->
                                        </span>
                                   </div>
                                   <div  class="row_c_li_b">
                                       <span class="text1">{{item.createTime | formatDate('YYYY-MM-DD HH:mm')}}</span>
                                       <span class="text2">{{item.createUserName}}</span>
                                       <span class="text3">生效/失效日期：{{item.startTime | formatDate}}/{{item.endTime | formatDate}}</span>
                                   </div>
                               </div>
                           </div>
                           <div class='row_right'>
                               <div clss="row_btn_group">
                                   <el-button type="primary" icon="el-icon-download">下载</el-button>
                               </div>
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
import newVersion from '@/ui/assets/img/new_version.png'
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
                return '-' // /file//recovery/{id}
            }
        }
    },
    data(){
        return{
            historyList:[],
            newVersion,
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
                url: `${this.$ip}/mms-charge/chargeTemplate/historyList/${this.$route.query.id}`, 
                method: 'get',
            })
            .then((data) => {
                console.log(data)
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
        width: 1000px;
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
        width:100%;
        overflow-y: auto;
        margin-top: 30px!important;
        .lists{
            height: 600px;
            overflow-y:auto;
            padding:0 50px;
            .list{
                .row{
                    display:flex;
                    width:100%;
                    padding:30px;
                    font-size: 13px;
                    color: #222;
                    position: relative;
                    .row_left{
                        width:120px;
                        .ver{
                            font-size: 18px;
                            font-family: AlibabaPuHuiTiM;
                            text-align: center;
                            color: #373737;
                            line-height: 25px;
                            font-weight: bold;
                        }
                    }
                    .row_center{
                        display: flex;
                        width:700px;
                        .line{
                            position: relative;
                            width:50px;
                            height:100%;
                            .line1{
                                width: 14px;
                                height: 14px;
                                background: #ffffff;
                                border: 2px solid #3280e7;
                                position: absolute;
                                left:19px;
                                top:5px;
                                border-radius: 50%;
                                z-index: 100;
                                .line2{
                                    width: 6px;
                                    height: 6px;
                                    background: #3280e7;
                                    position: absolute;
                                    left:50%;
                                    top:50%;
                                    margin-left:-3px;
                                    margin-top: -3px;
                                    border-radius:50%;
                                }
                            }
                            ._line1{
                                width: 14px;
                                height: 14px;
                                background: #ffffff;
                                border: 2px solid #222222;
                                position: absolute;
                                left:19px;
                                top:5px;
                                border-radius: 50%;
                                z-index: 100;
                            }
                            .line3{
                                width: 2px;
                                height:100%;
                                position: absolute;
                                top:19px;
                                left:50%;
                                margin-left:-1px;
                                background:#979797;
                            }
                            ._line3{
                                width: 2px;
                                height:200%;
                                position: absolute;
                                top:-100%;
                                left:50%;
                                margin-left:-1px;
                                background:#979797;
                            }
                            ._line3_{
                                width: 2px;
                                height:100%;
                                position: absolute;
                                top:-100%;
                                left:50%;
                                margin-left:-1px;
                                margin-top:5px;
                                background:#979797;
                            }
                        }
                        .row_c_li{
                            .row_c_li_t{
                                padding-bottom: 16px;
                                text-align: left;
                                .text1{
                                    font-size: 18px;
                                    font-family: AlibabaPuHuiTiM;
                                    text-align: center;
                                    color: #2b2b2b;
                                    line-height: 25px;
                                    font-weight: bold;
                                }
                                .text2{
                                    font-size: 18px;
                                    font-family: AlibabaPuHuiTiR;
                                    text-align: center;
                                    color: #888888;
                                    line-height: 25px;
                                }
                                .text3{
                                    margin-left:10px;
                                    .wenjian{
                                        width:58px;
                                        height:20px;
                                    }
                                }
                            }
                            .row_c_li_b{
                                padding-bottom: 10px;
                                .text1{
                                    font-size: 14px;
                                    font-family: AlibabaPuHuiTiR;
                                    text-align: center;
                                    color: #222222;
                                    line-height: 20px;
                                }
                                .text2{
                                    font-size: 14px;
                                    font-family: AlibabaPuHuiTiR;
                                    text-align: center;
                                    color: #373737;
                                    line-height: 20px;
                                }
                                .text3{
                                    font-size: 14px;
                                    font-family: AlibabaPuHuiTiR;
                                    text-align: center;
                                    color: #222222;
                                    line-height: 20px;
                                }
                             }
                        }
                    }
                    .row_right{
                        padding-left:100px;
                    }
                }
            }
        }
    }
</style>