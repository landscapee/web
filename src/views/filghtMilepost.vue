<template>
    <div id="filghtMilepost">
        <com-glob-head :path="'flight_monitor'"></com-glob-head>
        <div class="backBox">
            <button @click="$router.push('/flight_monitor')"><i class="el-icon-arrow-left"></i>返 回</button>
        </div>
        <ul class="filghtDetails">
            <li v-for="(list,idx) in filghtDetailsList" :key="idx">
                <i class="iconfont" :class="list.icon"></i>
                <span>{{list.name}}：</span>
                <span>{{list.data}}</span>
            </li>
        </ul>
        <div class="filghtCard">
            <!--左侧卡片-->
            <div class="filghtCard_a" >
                <div class="cardTitle">
                    <div class="cardTitle_top">
                        <div class="cardTitle_top_left">
                            <div class="cardTitle_top">
                                <div class="filghtNo">
                                    <i class="icon"></i>
                                    {{ flightCardLeft.flightNo }}
                                </div>   
                                <div class="flightI">{{ setIndicator(flightCardLeft.flightIndicator) }}</div>
                                <div class="flightI">{{ setFlightType(flightCardLeft.flightType) }}</div>
                                <div class="flightI filghtVip" v-if="flightCardLeft.vipMark"></div>
                            </div>
                        </div>
                        <div class="cardTitle_top_right">
                            <i class="el-icon-date"></i>
                            {{ setTime(flightCardLeft.scheduleTime, 'yyyymmdd') }}
                        </div>
                    </div>
                    <div class="cardTitle_con">
                        <div class="filghtStatus">{{ setFlightStatus(flightCardLeft.flightStatus) }}</div>
                        <div class="filghtLine">
                            <div @mouseover="showCardWeather('left', true)" @mouseleave="showCardWeather('left', false)" class="filghtCity">
                                <div class="city sansB">--</div>
                                <div class="port">{{ setRoute(flightCardLeft, 0) }}</div>
                            </div>
                            <div class="filghtType">
                                <div class="img"></div>
                                <div class="type">{{ flightCardLeft.flightExtStatus }}</div>
                            </div>
                            <div @mouseover="showCardWeather('left', true)" @mouseleave="showCardWeather('left', false)" class="filghtCity">
                                <div class="city sansB">--</div>
                                <div class="port">{{ setRoute(flightCardLeft, 1) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cardTitle_footer">
                        <div class="aa aaL"></div>
                        <div class="line"></div>
                        <div class="shareFilght">共享航班：{{ flightCardLeft.flightExtra.masterFlightNo }}</div>
                        <div class="line"></div>
                        <div class="aa aaR"></div>
                    </div>
                </div>
                <!--其它信息-->
                <div v-show="!showLeftWeather" class="cardContent">
                    <div class="contentTr">
                        <div class="contentTd" v-for="(item,idx) in flightCardLeftOtherList.slice(0,6)" :key="idx">
                            <div class="value oneR">{{ item.val }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="contentTr border0">
                        <div class="contentTd" v-for="(item,idx) in flightCardLeftOtherList.slice(6)" :key="idx">
                            <div class="value oneR">{{ item.val }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <!--天气-->
                <div v-show="showLeftWeather" class="cardContent">
                    <div class="contentTr">
                        <div class="contentTd" v-for="(item,idx) in flightCardLeftWeather.header" :key="idx">
                            <div class="value iconfont" :class="item.icon"></div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="contentTr border0">
                        <div class="contentTd" v-for="(item,idx) in flightCardLeftWeather.body" :key="idx">
                            <div class="value oneR">{{ item.val }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                
            </div>
            <!--右侧卡片-->
            <div class="filghtCard_b">
                <div class="cardTitle">
                    <div class="cardTitle_top">
                        <div class="cardTitle_top_left">
                            <div class="cardTitle_top">
                                <div class="filghtNo">
                                    <i class="icon"></i>
                                    {{ flightCardRight.flightNo }}
                                </div>   
                                <div class="flightI">{{ setIndicator(flightCardRight.flightIndicator) }}</div>
                                <div class="flightI">{{ setFlightType(flightCardRight.flightType) }}</div>
                                <div class="flightI filghtVip" v-if="flightCardRight.vipMark"></div>
                            </div>
                        </div>
                        <div class="cardTitle_top_right">
                            <i class="el-icon-date"></i>
                            {{ setTime(flightCardRight.scheduleTime, 'yyyymmdd') }}
                        </div>
                    </div>
                    <div class="cardTitle_con">
                        <div class="filghtStatus">{{ setFlightStatus(flightCardRight.flightStatus) }}</div>
                        <div class="filghtLine">
                            <div @mouseover="showCardWeather('right', true)" @mouseleave="showCardWeather('right', false)" class="filghtCity">
                                <div class="city sansB">--</div>
                                <div class="port">{{ setRoute(flightCardRight, 0) }}</div>
                            </div>
                            <div class="filghtType">
                                <div class="img"></div>
                                <div class="type">{{ flightCardRight.flightExtStatus }}</div>
                            </div>
                            <div @mouseover="showCardWeather('right', true)" @mouseleave="showCardWeather('right', false)" class="filghtCity">
                                <div class="city sansB">--</div>
                                <div class="port">{{ setRoute(flightCardRight, 1) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cardTitle_footer">
                        <div class="aa aaL"></div>
                        <div class="line"></div>
                        <div class="shareFilght">共享航班：{{ flightCardRight.flightExtra.masterFlightNo }}</div>
                        <div class="line"></div>
                        <div class="aa aaR"></div>
                    </div>
                </div>
                <!--其它信息-->
                <div v-show="!showRightWeather" class="cardContent">
                    <div class="contentTr">
                        <div class="contentTd" v-for="(item,idx) in flightCardRightOtherList.slice(0,6)" :key="idx">
                            <div class="value oneR">{{ item.val }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="contentTr border0">
                        <div class="contentTd" v-for="(item,idx) in flightCardRightOtherList.slice(6)" :key="idx">
                            <div class="value oneR">{{ item.val }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <!--天气-->
                <div v-show="showRightWeather" class="cardContent">
                    <div class="contentTr">
                        <div class="contentTd" v-for="(item,idx) in flightCardRightWeather.header" :key="idx">
                            <div class="value iconfont" :class="item.icon"></div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                    <div class="contentTr border0">
                        <div class="contentTd" v-for="(item,idx) in flightCardRightWeather.body" :key="idx">
                            <div class="value oneR">{{ item.val }}</div>
                            <div class="name">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
        <div class="mileNode">
            <div class="mileNode_title">
                <div class="mileNode_title_left flexSC">
                    <div class="allNode"><i class="el-icon-s-operation"></i>全部节点</div>
                    <div class="hastime">
                        <i class="el-icon-time"></i>用时：0小时48分钟
                    </div>
                </div>
                <ul class="mileNode_title_right flexSC">
                    <li v-for="(item,idx) in nodeTypeList" :key="idx" class="flexSC">
                        <div></div>
                        <span>{{item.name}}</span>
                    </li>
                </ul>
            </div>
            <div>
                <milepost-chart ref="ref_milepostChart3" :nodeData="nodeData" id="milepostChart3"></milepost-chart>
            </div>
            
        </div>
        <div class="allNodeMsgTable">
            <table border="1">
                <thead>
                    <tr>
                        <th class="sansB">节点顺序号</th>
                        <th class="sansB">节点进程</th>
                        <th class="sansB">是否里程碑</th>
                        <th class="sansB">保障部门</th>
                        <th class="sansB">预计时间</th>
                        <th class="sansB">实际时间</th>
                        <th class="sansB">超时时间</th>
                        <th class="sansB">#</th>
                        <!-- <th>偏离上报信息</th>
                        <th>提前预警信息</th>
                        <th>延后预警信息</th>
                        <th>进程详情</th> -->
                    </tr>
                </thead>
                <tbody v-if="nodeTable.length">
                    <tr v-for="(item, idx) in nodeTable" :key="idx">
                        <td>{{ item.sort || '--' }}</td>
                        <td>{{ item.processName }}</td>
                        <td>{{ item.isMilestone == 1 ? '是' : '否' }}</td>
                        <td>{{ item.deptName || '--' }}</td>
                        <td>{{ item.expectTime || '--' }}</td>
                        <td>{{ item.actualTime || '--' }}</td>
                        <td>{{ item.timeOutTime ? item.timeOutTime + '分钟' : '--' }}</td>
                        <td>
                            <el-button v-if="item.deviationReportList" @click="showLayerNodeInfoHandle(item)" size="small" type="primary">详情</el-button>
                            <span v-else>--</span>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="8">暂无数据</td>
                    </tr>
                </tbody>
            </table>
        </div>
        <!--节点信息弹窗-->
        <layer-milepost-nodeInfo ref="layer_milepost_nodeInfo" />
    </div>
</template>
<script>
import '../assets/iconfonts/iconfont.css';

// 航班信息-初始数据
const _flightCardInfo = {
    flightNo: '', // 航班号
    flightIndicator: '', // 飞行区域
    flightType: '', // 航班类型
    vipMark: null, // 是否是vip
    scheduleTime: '', // 计划时间
    flightStatus: '', // 
    flightExtStatus: '', // 
    flightExtra: {
        masterFlightNo: '', // 共享航班
        route: '', // 航线
    },
}
// 航班其它信息-初始数据
const _flightCardOtherList = [
    { val: '--', name: '前方计划', paramName: 'scheduleTime', type: 'date' },
    { val: '--', name: '前方实际', paramName: 'actualTime', type: 'date' },
    { val: '--', name: '计划到达', paramName: 'sta', type: 'date' },
    { val: '--', name: '预计到达', paramName: 'eta', type: 'date' },
    { val: '--', name: '实际到达', paramName: 'ata', type: 'date' },
    { val: '--', name: '可变滑行', paramName: 'flightExtra.slipTime' },
    { val: '--', name: '停靠机位', paramName: 'seat' },
    { val: '--', name: '行李轮盘', paramName: 'flightExtra.carousel' },
    { val: '--', name: '落地跑道', paramName: 'runway' },
    { val: '--', name: '航站楼', paramName: 'terminal' },
    { val: '--', name: '乘机人数', paramName: '' },
    { val: '--', name: '飞行时长', paramName: '' },
]
// 航班天气信息-初始数据
const _flightCardWeather = {
    header: [
        { icon: 'icon-wendu', name: '温度' },
        { icon: 'icon-fengli', name: '风力' },
        { icon: 'icon-fengxiang', name: '风向' },
        { icon: 'icon-fengsu', name: '风速' },
        { icon: 'icon-nengjiandu', name: '能见度' },
        { icon: 'icon-qiya', name: '气压' },
        { icon: 'icon-ludian', name: '露点' },
    ],
    body: [
        { val: '--', name: 'T' },
        { val: '--', name: 'WV' },
        { val: '--', name: 'WS' },
        { val: '--', name: 'WD' },
        { val: '--', name: 'RVR' },
        { val: '--', name: 'QNH' },
        { val: '--', name: 'DP' },
    ]
}

// 航班飞行区域
const _flightIndicatorObj = {
    D: '国内',
    M: '混合',
    I: '国际',
    R: '地区',
}
// 航班类型数组
const _flightTypeList = [
    { label: '正班', value: "W" },
    { label: '补班', value: "Q" },
    { label: '货机', value: "Z，H，O，)" },
    { label: '备降',  value: "B" },
    { label: '返航', value: "R" },
    { label: '调机', value: "N" },
    { label: '公务机', value: "U" },
    { label: '特殊', value: 4 },
    { label: '其他', value: "other" },
]

export default {
    data () {
        return {
            filghtDetailsList:[
                {icon: "icon-jihao1", name:"机号", data:'--', paramName: 'aircraftNo'},
                {icon: "icon-jixing", name:"机型", data:'--', paramName: 'aircraftType'},
                {icon: "icon-yizhan", name:"翼展", data:'--', paramName: ''},
                {icon: "icon-yizhan", name:"机长", data:'--', paramName: ''},
                {icon: "icon-jilei1", name:"机类", data:'--', paramName: 'flightIndicator'},
                {icon: "icon-hangkonggongsi", name:"公司", data:'--', paramName: 'airlineCode'},
                {icon: "icon-chengkedaili", name:"乘客代理", data:'--', paramName: ''},
                {icon: "icon-jiwudaili1", name:"机务代理", data:'--', paramName: ''},
                {icon: "icon-qinwudaili", name:"勤务代理", data:'--', paramName: ''},
            ],
            // 左侧卡片信息
            flightCardLeft: _.cloneDeep(_flightCardInfo),
            flightCardLeftOtherList: _.cloneDeep(_flightCardOtherList),
            showLeftWeather: false,
            flightCardLeftWeather: _.cloneDeep(_flightCardWeather),
            // 右侧卡片信息
            flightCardRight: _.cloneDeep(_flightCardInfo),
            flightCardRightOtherList: _.cloneDeep(_flightCardOtherList),
            showRightWeather: false,
            flightCardRightWeather: _.cloneDeep(_flightCardWeather),
            // 节点数据
            nodeLists: [],
            nodeTypeList:[
                {name:'超时时间(分)',type:0},
                {name:'预警信息',type:1},
                {name:'未激活',type:2},
                {name:'已完成',type:3},
                {name:'超时未完成',type:4},
                {name:'超时完成',type:5},
                {name:'未开始',type:6},
            ],
            // 节点列表
            nodeTable: [],
            nodeData:{}
        }
    },
    components: {
        "milepost-chart" : () => import(/*webpackChunkName:"com-milepostChart"*/ '../components/com-milepost-chart'),
        "com-glob-head": () => import(/*webpackChunkName:"com-globHead"*/ '../components/com-glob-head'),
        "layer-milepost-nodeInfo" : () => import(/*webpackChunkName:"layer-milepost-nodeInfo"*/ '../components/layer-milepost-nodeInfo'),
    },
    beforeMount () {
        this.postal.publish({
            channel: 'worker.fpms',
            topic: 'get_flight_schedule_data_by_db',
            data:{
                token: sessionStorage.getItem("token")
            }
        })
    },
    mounted () {
        this.postal.subscribe({
            channel: 'web.fpms',
            topic: 'flight_schedule_data_body',
            callback: data => {
                this.resetData(data)
            }
        })
    },
    methods: {
        resetData (data) {
            if (!_.isArray(data)) return;
            // 航班id
            const flightId = this.$route.query.flightId;
            // 当前航班信息
            const flightItem = _.find(data, (item) => {
                return item.flightId == flightId;
            });
            //  未查询到数据项
            if(!flightItem) return;
            this.getNodeList(flightId);

            // 设置头部飞机信息
            _.map(this.filghtDetailsList, item => {
                item.data = _.get(flightItem, item.paramName, '--');
            });
            // 设置左边卡片信息
            _.forIn(this.flightCardLeft, (value, key) => {
                // 对象
                if (_.isObject(value)) {
                    let tmp = {};
                    // 目前只有两层对象
                    _.forIn(value, (value_, key_) => {
                        tmp[key_] = _.get(flightItem, key + '.' + key_) || '--';
                    });

                    // 变异处理
                    this.$set(this.flightCardLeft, key, tmp);
                } else {
                    this.flightCardLeft[key] = _.get(flightItem, key) || '--';
                }
            });
            // 设置左边卡片其它信息
            _.map(this.flightCardLeftOtherList, item => {
                let tmp = _.get(flightItem, item.paramName);

                if(item.paramName.indexOf('carousel') > -1){
                    item.val = tmp ? JSON.parse(tmp).code : '--';
                }else{
                    item.val = item.type === 'date' ?
                            this.setTime(tmp, 'hhmm') : (tmp || '--');
                }
                
            });

        },
        // 
        showCardWeather (type, off) {
            if(type === 'left'){
                this.showLeftWeather = off;
            }else if(type === 'right'){
                this.showRightWeather = off;
            }
        },
        // 获取节点数据
        getNodeList (flightId = '') {
            this.$axios.get("/process/findProcessNodeByFlightId",{ params:{ flightId } })
            .then(res=>{
                this.nodeTable = res.data || [];
            })
        },
        // 弹出节点信息
        showLayerNodeInfoHandle (data = {}) {
            // 获取航班号
            data.flightNo = this.flightCardLeft.flightNo;

            this.$refs.layer_milepost_nodeInfo.init(data);
            this.$refs.layer_milepost_nodeInfo.show(true);
        },
        // 设置飞行区域
        setIndicator (val) {
            return _flightIndicatorObj[val] || '--'
        },
        // 设置航班状态
        setFlightStatus (val) {
            return val || '--'
        },
        // 设置航班类型
        setFlightType (val) {
            let item = _.find(_flightTypeList, (item) => {
                return item.value === val;
            });

            return item ? item.label : '--';
        },
        // 设置时间
        setTime (date, type) {
            if(!date) return '--';
            
            let tmp = date.split(' ');
            if(type === 'yyyymmdd'){
                return tmp[0]
            }else if(type === 'hhmm'){
                return tmp[1].substring(0, 5)
            }else return '--'
        },
        // 设置航线
        setRoute (flightCardInfo, index) {
            let route = flightCardInfo.flightExtra.route;
            let ret = ['--', '--'];

            if(route){
                try {
                    let tmp = JSON.parse(route);
                    
                    if(_.isArray(tmp) && tmp.length > 1){
                        ret = tmp;
                    }else{
                        throw Error('航线数据异常');
                    }
                } catch (e) {
                    console.log(e);
                }
            }

            return ret[index]
        },
    },
}
</script>
<style lang="scss" scoped>
.no_data{
    padding: 10px 0;
}
#filghtMilepost{height: 100%;width:100%;background:linear-gradient(180deg,rgba(25,45,75,1) 0%,rgba(19,29,53,1) 100%);overflow: auto;padding-bottom: 30px;
    .backBox{margin-top: 15px;text-align: right;;
        button{background:linear-gradient(90deg,rgba(75,142,253,1) 0%,rgba(63,179,255,1) 100%);border: none;color:#fff;padding:10px 20px;border-radius: 50px 0 0 50px;cursor: pointer;;
            i{margin-right: 10px;}
        }
    }
    .filghtDetails{display: flex;flex-wrap:wrap ;margin:0 50px;
        li{flex:1;background:rgba(216,216,216,0.2);border-radius:2px;color:#fff;padding: 15px;margin:0 8px 8px 0;;
            span{font-size: 18px;}
        }
    }
    .filghtCard{display: flex;justify-content: space-between;margin:40px 50px 20px;;
        &>div{
            flex: 1;
            border-radius:15px ;
            background-position: center;
            background-size: cover;
            background-color: #1B8E29;
            .cardTitle{
                .cardTitle_top{display: flex;justify-content: space-between;
                    .cardTitle_top_left{
                        .filghtNo{display:flex;height: 36px;border-radius:15px 0 36px 0;line-height: 36px;text-align: center;width: 140px;color: #fff;
                            >.icon{
                                width: 35px;
                                height: 35px;
                                background: url('/src/assets/img/flight_front.png') no-repeat center;
                                background-size: 100%;
                                margin: 0 3px 0 5px;
                            }
                        }
                        .flightI{height: 24px;background:rgba(255,255,255,.3);border-radius:2px;line-height:20px;text-align: center;margin:4px 0 0 5px ;font-size: 12px;color:#fff;padding: 2px 5px;}
                        .filghtVip{background:url('/src/assets/img/vip.svg') no-repeat center;background-size: 100%;width: 30px;}
                    }
                    .cardTitle_top_right{line-height: 36px;color:#fff;margin-right: 30px;;

                    }
                }
                .cardTitle_con{margin-top:-20px;display: flex;flex-direction: column;align-items: center;;;
                    .filghtStatus{background:#9E72FF;border:2px solid #fff;height: 24px;border-radius:12px ;padding: 2px 16px;color: #fff;}
                    .filghtLine{display: flex;align-items: center;margin-top:4px;
                        .filghtCity{cursor: pointer;color:#fff;text-align: center;width: 80px;
                            .city{font-size: 30px;}
                            .port{margin-top: 4px;white-space: nowrap;}
                            }
                        .filghtCity:hover{
                            .city{color: #FFC300;}
                            .port{color: #FFC300;}
                        }


                        .filghtType{display: flex;flex-direction: column;margin:0 40px ;align-items:center ;;
                            .img{background:url('/src/assets/img/fight.svg') no-repeat;background-size: 100%;width: 100px;height: 30px;margin-top: 10px;}
                            .type{background:rgba(255,255,255,1);height: 18px;line-height: 18px;text-align: center;margin-top:10px ;border-radius:9px;font-size: 12px;}
                        }
                        
                    }
                }
                .cardTitle_footer{display:flex;justify-content:space-between;align-items: center;margin-top: 10px;;
                    .line{border: 1px dashed #fff;flex: 1;}
                    .shareFilght{background:rgba(216,216,216,.3);padding: 4px 10px;color: #fff;margin: 0 15px;}
                    .aa{height: 24px;width: 24px;border-radius:20px ;background:rgba(23,40,68,1);}
                    .aaL{margin-left: -12px;}
                    .aaR{margin-right: -12px;}
                }
            }
            .cardContent{padding:0 20px ;
                .contentTr{border-bottom: 1px dashed #fff;display: flex;;
                    .contentTd{margin:20px 0;border-right:1px dashed #fff ;flex: 1;
                        &:last-child{
                            border-right: none;
                        }
                        .value{font-size: 28px;color: #fff;text-align: center;}
                        .name{color: #fff;margin-top: 6px;text-align: center;}
                    }
                }
                
            }
            
        }
        .filghtCard_a{
            margin-right:10px;
            background-image: url('/src/assets/img/filghtCard_a.jpg');
            .filghtNo{
                background-color:rgba(40,180,87,1);
            }
        }
        .filghtCard_b{
            margin-left:10px;
            background-image: url('/src/assets/img/filghtCard_b.jpg');
            .filghtNo{
                background-color: #009af9;
            }
        }
    }
    .mileNode{margin:0 50px 30px;background:rgba(255,255,255,.05);border-radius:10px;padding: 25px;
        .mileNode_title{display: flex;justify-content: space-between;;
            .mileNode_title_left{
                .allNode{border-radius:4px;border:1px solid rgba(75,161,243,1);width:115px;height:38px;text-align: center;line-height: 38px;color: #fff;
                    i{margin-right: 5px;}
                }
                .hastime{color: #fff;margin-left:20px;}
            }
            .mileNode_title_right{
                li{margin-left:15px;
                    span{color: #fff;}
                }
                div{height: 16px;width: 16px;background:red;margin-right:10px;}
            }
        }
    }
    .allNodeMsgTable{margin:0 50px;
        table{width: 100%;border-collapse: collapse;border:1px solid rgba(151,151,151,1);
            thead{ background:rgba(255,255, 255, .2);
                tr{height: 40px;
                    th{text-align: center;color: #fff;border-color: rgba(151,151,151,1);}
                }
            }
            tbody{
                tr{height: 40px;
                    td{text-align: center;color: #fff;border-color: rgba(151,151,151,1);padding: 5px 0;}
                }
                tr:nth-child(even){ background:rgba(255,255, 255, .05);}
            }
        }
    }
}
</style>