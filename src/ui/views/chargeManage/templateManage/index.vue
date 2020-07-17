<template>
    <div class='index'>
        <router-view v-if="this.$router.history.current.path == '/templateAdd'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/templateHistory'" :key="$route.path"></router-view>
        <div class='inner' v-else>
            <div class='top_content'>
                <div class='header'><span>模版管理</span></div>
            </div>
            <div class="main-content">
                <div class="inner">
                    <div class="lists">
                        <div class="list" v-for='item in templateList' :key='item.id'>
                            <div class="l_content">
                                <div class="text1">{{item.name}}</div>
                                <div class="text2">最新版本：{{item.version}}</div>
                                <div class="text3">创建时间：{{item.createTime | formatDate('YYYY-MM-DD HH:mm')}}</div>
                                <div class="text3">创建人：{{item.createUserName}}</div>
                                <div class="text3">生效日期：{{item.startTime | formatDate}} 失效日期：{{item.endTime | formatDate}}</div>
                            </div>
                            <div class="l_btn_group">
                                <div class="btn_group">
                                    <span @click='toPushFn("/templateHistory",{id:item.id})'><icon iconClass="time" class="tab_radio"></icon>历史版本</span>
                                </div>
                                <div class="btn_group">
                                    <span @click='toDownloadFn(item)'><icon iconClass="download" class="tab_radio"></icon>下载</span>
                                </div>
                                <div class="btn_group">
                                    <span @click='toPushFn("/templateAdd",{type:"edit", id:item.id})'><icon iconClass="edit2" class="tab_radio"></icon>修改</span>
                                </div>
                            </div>
                        </div>
                        <div class="list">
                            <div class="add" @click='toPushFn("templateAdd",{type:"add"})'>
                                <div class="line1"></div>
                                <div class="line2"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import Icon from '@components/Icon-svg/index';
import moment from 'moment'
import SearchTable from '@/ui/components/SearchTable';
import userTree from '@components/userTree/index';
export default {
    components: {
       Icon,
       SearchTable,
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
    data() {
        return {
           templateList:[]
        };
    },
    mounted(){
       this.init()
    },
    methods:{
        init(){
            this.getTemplateListFn()
        },
        
        getTemplateListFn(){
            this.templateList = []
            request({
                url:`${this.$ip}/mms-charge/chargeTemplate/list`, 
                method: 'post',
                data:{}
            })
            .then((data) => {
                if(data.code==200&&data.data&&data.data.records&&data.data.records.length){
                    this.templateList = data.data.records
                }
            })
        },
        toPushFn(path='', query={}){
            this.$router.push({path, query})
            //this.$router.push({path:'/detail',query:{folderId:item.id}});
        },
        toDownloadFn(row){
            let Url = `${this.$ip}/mms-file/get-file-stream-by-file-path/?filePath=${row.fileUrl}`
            let a = document.createElement('a')
            document.body.appendChild(a)
            a.href = Url
            a.click()
            document.body.removeChild(a)
        }
    },
    watch: {
    },
   
}
</script>
<style scoped lang="scss">
@import "@/ui/views/basicData/businessData/assets/styles/businessData.scss"; 
.index{
    .inner{
        .top_content{
            padding-top: 20px;
            position: relative;
            padding-bottom: 20px;
            .header{
                margin: 0 auto;
                margin-bottom: 30px;
                width: 271px;
                font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                font-weight:500;
                color:rgba(34,34,34,1);
                height:24px;
                line-height:24px;
                span{
                    font-size:24px ;
                }
            }
        }
        .main-content{
            padding: 0px 30px 0px 30px;
            .inner{
               
                .lists{
                    display:flex;
                    flex-wrap: wrap;
                    .list{
                        margin-left: 20px;
                        margin-top: 20px;
                        width:480px;
                        height:300px;
                        border:1px solid #bcbcbc;
                        position: relative;
                        .l_content{
                            text-align: center;
                            .text1{
                                font-size: 24px;
                                font-family: AlibabaPuHuiTiM;
                                text-align: center;
                                color: #222222;
                                line-height: 33px;
                                margin-top:47px;
                            }
                            .text2{
                                margin-top:17px;
                                font-size: 14px;
                                font-family: AlibabaPuHuiTiR;
                                color: #222222;
                                line-height: 20px;
                            }
                            .text3{
                                margin-top:10px;
                                font-size: 14px;
                                font-family: AlibabaPuHuiTiR;
                                color: #222222;
                                line-height: 20px;
                            }
                        }
                        .l_btn_group{
                            width:100%;
                            position: absolute;
                            height:36px;
                            line-height: 36px;
                            left:0;
                            right:0;
                            bottom: 0;
                            display:flex;
                            .btn_group{
                                width:33.3333%;
                                text-align: center;
                                line-height: 36px;
                                border-right:1px solid #bcbcbc;
                                border-top: 1px solid #bcbcbc;
                                &:last-child {
                                    border-right:none
                                }
                                span{
                                    font-size: 14px;
                                    font-family: AlibabaPuHuiTiR;
                                    color: #3280e7;
                                    cursor: pointer;
                                    .tab_radio{
                                        width:16px;
                                        height:16px;
                                        margin-right:4px;
                                    }
                                }
                            }
                        }
                        .add{
                            width:30px;
                            height:30px;
                            position: absolute;
                            left:50%;
                            top:50%;
                            transform: translate(-50%, -50%);
                            cursor: pointer;
                            transition: all 0.3s linear;
                            &:hover{
                                transform: translate(-50%, -50%) scale(1.1, 1.1);
                            }
                            .line1{
                                width:2px;
                                height:100%;
                                background:#3280e7;
                                position: absolute;
                                left:50%;
                                top:0;
                                transform: translateX(-50%);
                            }
                            .line2{
                                height:2px;
                                width:100%;
                                background:#3280e7;
                                position: absolute;
                                top:50%;
                                left:0;
                                transform: translateY(-50%);
                            }
                        }
                    }
                }
            }
        }
    }
    
}
</style>
 
