<template>
<div id="layer_set_plan"> 
    <el-dialog :visible.sync="handWarnShow" class="nodeDialog" :show-close="false" center width="400px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">手动预警</div>
            <div class="blankDiv"></div>
        </template>
        <el-form ref="form" :model="handWarnMsg" label-width="80px">
            <el-form-item label="提前预警信息">
                <el-input v-model="handWarnMsg.beforeMsg" placeholder="提前预警信息"></el-input>
            </el-form-item>
            <el-form-item label="延后预警信息">
                <el-input v-model="handWarnMsg.afertMsg" placeholder="延后预警信息"></el-input>
            </el-form-item>
            <el-form-item label="进程情况说明">
                <el-input v-model="handWarnMsg.mark" placeholder="进程情况说明"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="handWarnShow = false">取 消</el-button>
            <el-button type="primary" @click="saveHandWarn">提 交</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="ensureDispatchShow" class="nodeDialog ensureDispatchDialog" :show-close="false" center width="660px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">保障调度干预</div>
            <div class="blankDiv">
                <i class="el-icon-circle-close" @click="ensureDispatchShow = false"></i>
            </div>
        </template>
        <div class="sansB" style="margin-bottom:.15rem;">
            xxxx节点
        </div>
        <div class="remindBox contentBox">
            <div class="title">
                <div>提醒</div>
            </div>
            <div class="content">
                <el-input type="textarea" v-model="remind" placeholder='编辑文字说明(监控各成员内部查看消息，便于各班次任务的交接、说明)' ></el-input>
            </div>
            <div class="footer">
                <el-button type="primary" @click="remindSend">发送</el-button>
            </div>
        </div>
        <div class="demandBox contentBox">
            <div class="title">
                <div>需求</div>
            </div>
            <div class="content">
                <el-input type="textarea" v-model="demand" placeholder='编辑文字说明(提出保障需求或者事务说明等)' ></el-input>
            </div>
            <div class="footer">
                <el-button type="primary" @click="demandSend">发送</el-button>
            </div>
        </div>
        <div class="UrgeBox contentBox">
            <div class="title">
                <div>催办</div>
            </div>
            <div class="content">
                <el-radio-group v-model="UrgeRadio">
                    <el-radio :label="item.id" v-for="item in UrgeMsgList" :key="item.id">{{item.content}}</el-radio>
                </el-radio-group>
            </div>
            <div style="color:rgba(102,102,102,1);padding:.1rem 0 0 .3rem">勾选项需做说明或者其他情况：</div>
            <div class="footer">
                <el-input placeholder="编辑文字说明" v-model="UrgeMsg" style="width:calc(100% - .9rem)"></el-input>
                <el-button type="primary" @click="urgeSend">发送</el-button>
            </div>
        </div>
        <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <el-dialog :visible.sync="milepostNodeShow" class="nodeDialog milepostNodeDialog" :show-close="false" center width="540px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">航班(8L9666/8L811)撤梯车</div>
            <div class="blankDiv">
                <i class="el-icon-circle-close" @click="milepostNodeShow = false"></i>
            </div>
        </template>
        <div class="nodeOperation" v-for="(value,key) in userDeviateList" :key="key">
            <div class="userName">{{key}}</div>
            <ul>
                <li v-for="(item,idx) in value" :key="idx">
                    <div class="operationNode">
                        <div class="name">{{item.processName}}</div>
                        <div class="time">
                            <font>实</font>:{{getTimeByFormat(item.actualTime,"hh:mm")}}<font>计</font>:{{getTimeByFormat(item.scheduleTime,"hh:mm")}}<font>预</font>:{{getTimeByFormat(item.expectTime,"hh:mm")}}
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <div class="nodeDetail" v-for="(item,idx) in processData.deviationReportList" :key="idx">
            <div class="name">
                {{item.operatorName}}<span>{{getTimeByFormat(item.reportTime,"hh:mm(DD)")}}</span>
            </div>
            <div class="detail">{{item.reportContent}}</div>
        </div>
        <ul class="msgBox">
            <li v-for="item in UrgeMsgList" :key="item.id" >{{item.content}}</li>
        </ul>
        <div>
            <el-input placeholder="Ctrl + Enter" v-model="UrgeMsg" style="width:calc(100% - .9rem)" @keyup.enter.ctrl.native="urgeSend">
                <template slot="prepend">催办</template>
            </el-input>
            <el-button type="primary" @click="urgeSend">发送</el-button>
        </div>
        <div slot="footer" class="dialog-footer"></div>
    </el-dialog>
    <el-dialog :visible.sync="messageShow" class="nodeDialog messageShowDioalog" :show-close="false" center width="800px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">航班({{messageTitle}})管控</div>
            <div class="blankDiv"></div>
        </template>
        <div class="flexSB check_point">
            <div class="flexSB" @click="checkHandle(0)">
                <div class="flexSC">
                    <i class="el-icon-check"></i>
                </div>
                <span>入位检查</span>
                <span>13:39</span>
            </div>
            <div class="flexSB active">
                <div class="flexSC">
                    <i class="el-icon-check"></i>
                </div>
                <span>登机控制检查</span>
                <span>13:39</span>
            </div>
            <div class="flexSB">
                <div class="flexSC">
                    <i class="el-icon-check"></i>
                </div>
                <span>推出前检查</span>
                <span>13:39</span>
            </div>
        </div>
        <div class="message_content">
            <el-tabs v-model="messageNavFlag" type="card">
                <el-tab-pane label="消息" name="0">
                    <el-timeline>
                        <el-timeline-item timestamp="2018/4/12" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/12 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/3" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/3 20:46</p>
                            </el-card>
                        </el-timeline-item>
                        <el-timeline-item timestamp="2018/4/2" placement="top">
                            <el-card>
                                <h4>更新 Github 模板</h4>
                                <p>王小虎 提交于 2018/4/2 20:46</p>
                            </el-card>
                        </el-timeline-item>
                    </el-timeline>

                </el-tab-pane>
                <el-tab-pane label="偏离上报" name="1">
                    <div class="nodeDetail" v-for="(item,idx) in 3" :key="idx">
                        <div class="name">
                            王小虎<span>12：00</span>
                        </div>
                        <div class="detail">粉底哦ifhdosafhodsaf</div>
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="message_footer">
            <el-input placeholder="Ctrl + Enter" v-model="message" style="width:calc(100% - .9rem)" @keyup.enter.ctrl.native="sendMessage">
                <template slot="prepend">催办</template>
            </el-input>
            <el-button type="primary" @click="sendMessage">发送</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default{
	data(){
		return {
            handWarnShow:false,
            handWarnMsg:{
                beforeMsg:null,
                afertMsg:null,
                mark:null,
            },
            ensureDispatchShow:false,
            UrgeRadio:0,
            UrgeMsg:null,
            remind:null,
            demand:null,
            milepostNodeShow:false,
            UrgeMsgList:[
                // {name:"请注意保障时间，如有特殊情况请及时偏离上报",id:0},
                // {name:"请偏离上报",id:1},
                // {name:"时间节点已到，异常请偏离上报",id:2},
                // {name:"请注意机位/登机口变更",id:3},
                // {name:"请注意保障时间",id:4},
                // {name:"过站时间不足",id:5}
            ],
            deviateData:{},
            processData:{},
            userDeviateList:[],



            messageShow:false,
            messageTitle:null,
            messageNavFlag:"0",
            message:null

		}
	},
	props: [],
	mounted () {
        

	},
	watch: {

	},
    methods:{
        initHandWarn(){
            this.handWarnShow=true
        },
        saveHandWarn(){
            console.log(this.handWarnMsg)
        },
        initEnsureDispatch(){
            this.ensureDispatchShow=true
        },
        remindSend(){
            console.log(this.remind)
        },
        demandSend(){
            console.log(this.demand)
        },
        urgeSend(){
            console.log(this.UrgeMsg,this.UrgeRadio)
        },
        initMilepostNode(data){
            console.log(data)
            this.processData = data
            this.milepostNodeShow=true


            this.userDeviate(data)
            this.getUrgeList()
        },
        userDeviate(data){//用户操作信息
            this.$axios.get("/process/findByFlightIdAndTaskId",{
                params:{
                    flightId:data.flightId,
                    taskId:data.taskId
                }
            })
            .then((res)=>{
                if(res.data){
                   this.userDeviateList = res.data
                }
            })
        },
        getUrgeList(){//催办消息列表
            this.$axios.get("/reminder/findByDeptId")
            .then((res)=>{
                if(res.data){
                    this.UrgeMsgList=res.data||[]
                }
            })
        },
        initMessage(data){
            console.log(data)
            this.messageShow = true
            this.messageTitle=this.getfFilghtNo(data.row)
        },
        checkHandle(index){

        },
        getfFilghtNo(filght){
            let flightNo = filght.flightNo
            let successionFlightNo = filght.successionFlightNo
            let result = flightNo+"/"
            if(flightNo==successionFlightNo||!successionFlightNo){
                result+="-"
            }else{
                let count = 0
                for(var i=0;i<flightNo.length;i++){
                    if(flightNo[i]==successionFlightNo[i]){
                        count++
                    }else{
                        break;
                    }
                }
                result+=successionFlightNo.substring(count,successionFlightNo.length);
            }
            return result
        },
        sendMessage(){
            console.log(this.message)
        }
	}
}
</script>

<style lang="scss" scoped>
.ensureDispatchDialog{
    .blankDiv{text-align: right;
        i{color: #fff;cursor: pointer;font-size: 24px;}
    }
    .contentBox{height: 160px;border:1px solid rgba(220,220,220,1);border-radius:4px;display: flex;flex-direction:column;margin-bottom: 10px;;
        .title{
            div{width: 70px;height: 30px;background:url("/src/assets/img/img1.png");background-size: 100% 100%;color:rgba(61,86,142,1);text-align: center;line-height: 30px;}
        }
        .content{flex: 1;
            .el-textarea__inner{border:none;}
        }
        .footer{margin:10px;text-align: right; }
    }
    .UrgeBox{height:260px;}
}
.milepostNodeDialog{
    .blankDiv{text-align: right;
        i{color: #fff;cursor: pointer;font-size: 24px;}
    }
    .nodeOperation{display: flex;
        .userName{display: flex;align-items: center;

        }
        ul{flex:1;display: flex;flex-wrap: wrap;;
            li{display: flex;margin:6px;;
                .arrow{margin:0 8px;display: flex;align-items: center;  }
                .operationNode{display: flex;flex-direction: column;margin:0 8px;;
                    .name{color:rgba(61,86,142,1);font-weight:bold;font-size: 14px;text-align: center;margin-bottom: 6px;}
                    .time{font-size: 12px;
                        font{font-size: 12px;color:#3d568e}
                    }
                }
            }
        }
    }
    .nodeDetail{border:1px dashed rgba(61,86,142,1);padding: 15px 20px;margin-bottom: 15px;position: relative;;
        .name{color:rgba(61,86,142,1);margin-bottom: 5px;;
            span{color:rgba(136,136,136,1);font-size: 12px;margin-left: 10px;}

        }
        .detail{color:rgba(102,102,102,1);}
    }
    .nodeDetail:after{
        text-align: center;
        line-height:33px;
        color: #fff;
        background-color: #3D568E;
        content: "\504F";
        position: absolute;
        left:-8px;
        top:-8px;
        width: 52px;
        height:52px;
        font-size:14px;
        -webkit-clip-path: polygon(50% 0,0 50%,100% 50%);
        clip-path: polygon(50% 0,0 50%,100% 50%);
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        font-weight: 800;
    }   
    .msgBox{display: flex;flex-wrap: wrap;margin-bottom: 10px;;
            li{background:rgba(229,233,242,1);  border-radius:2px;padding:4px 10px;color:rgba(61,86,142,1);margin:0 5px 5px 0;cursor: pointer;}
        }
}
.messageShowDioalog{
    .check_point{height: 34px;
        &>div{height: 100%;width:30%;background: #eee;border-radius: 30px;padding: 2px 15px 2px 2px ;cursor: pointer;;
            &>div{height: 30px;width: 30px;border-radius: 30px;background-color:#fff ;}
            span{font-size: 14px ;}
        }
        &>div.active{background:#5d9cf9!important;
            i{color: #5d9cf9!important;}
            span{color:#fff;}
        }


    }
    .message_content{height: 500px;margin:10px 0;
        .nodeDetail{border:1px dashed rgba(61,86,142,1);padding: 15px 20px;margin-bottom: 15px;position: relative;;
            .name{color:rgba(61,86,142,1);margin-bottom: 5px;;
                span{color:rgba(136,136,136,1);font-size: 12px;margin-left: 10px;}

            }
            .detail{color:rgba(102,102,102,1);}
        }
        .nodeDetail:after{
            text-align: center;
            line-height:33px;
            color: #fff;
            background-color: #3D568E;
            content: "\504F";
            position: absolute;
            left:-8px;
            top:-8px;
            width: 52px;
            height:52px;
            font-size:14px;
            -webkit-clip-path: polygon(50% 0,0 50%,100% 50%);
            clip-path: polygon(50% 0,0 50%,100% 50%);
            -webkit-transform: rotate(-45deg);
            transform: rotate(-45deg);
            font-weight: 800;
        }   
    }
    .message_footer{margin-bottom: 15px;}

}
</style>
<style lang="scss">
.ensureDispatchDialog{
    
    .contentBox{
        .content{
            .el-textarea{height: 100%;}
            .el-textarea__inner{border:none;height: 100%;display: flex;justify-content: center;align-items: center;resize: none;;}
            .el-radio{width: 50%;margin: 0;padding:10px 0 10px 20px;}
        }
    }
}
.messageShowDioalog{
    .el-tabs{height: 100%;
        *{border-width: 1px;border-color: #a4b7c1;}
        .el-tabs__content{height:calc(100% - 50px);margin-top:1px;background-color: #eee;}
        .el-tab-pane{padding:15px;}
    }
    .el-tabs__header{margin: 0;background-color: #fff!important;}
}


</style>
