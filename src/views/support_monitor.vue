<template>
    <div id="filghtPlace">
        <com-glob-head :path="'support_monitor'"></com-glob-head>
        <div class="container">
            <div class="container_title flexSB">
                <div class="container_title_left">
                    <div class="titleText" @click="typeChangeHandle" title="点击切换模式">{{typeName}}</div>
                    <div class="datePickerBox">
                        <el-date-picker v-model="searchTime" type="datetime" placeholder="选择日期时间" @change="searchTimeHandle" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"></el-date-picker>
                    </div>
                </div>
                <div class="container_title_right">
                    <el-input placeholder="机位 | 航班号 | 机尾号 | 航班ID" v-model="searchStr" class="input-with-select" @keyup.enter.native="filterByMsg(searchSel,searchStr)">
                        <el-select v-model="searchSel" slot="prepend" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="机位" value="seat"></el-option>
                            <el-option label="航班号" value="flightNo"></el-option>
                            <el-option label="机尾号" value="aircraftNo"></el-option>
                            <el-option label="航班ID" value="flightId"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="filterByMsg(searchSel,searchStr)"></el-button>
                    </el-input>
                </div>
                

            </div>
            <div class="body flexSB">
                <div class="place_gantt">
                    <div class="gantt_title flexSB">
                        <div class="gantt_title_left flexSC" >机位</div>
                        <div class="gantt_title_right">
                            <com-time-line ref="ref_timeLine" @getFilghtData="getFilghtData" @dividerPoLeft="dividerPoLeft" @updateTime="updateTime"></com-time-line>
                        </div>
                    </div>
                    <div class="gantt_ul">
                        <div class="com_divider" :style="'left:'+dividerLeft+'px;'" v-show="liBgWidth>0&&liBgWidth<100"></div>
                        <div class="left_com_line" :style="left_com_line_style" v-show="show_time_line_show"></div>
                        <div class="right_com_line" :style="right_com_line_style" v-show="show_time_line_show"></div>
                        <div class="left_static_line" :style="left_static_line_style" v-show="show_time_line_left_show">
                            <div class="div1">{{left_line_text}}</div>
                            <div class="div2">
                                <div></div>
                            </div>
                        </div>
                        <div class="right_static_line" :style="right_static_line_style" v-show="show_time_line_right_show">
                            <div class="div1">{{right_line_text}}</div>
                            <div class="div2">
                                <div></div>
                            </div>
                        </div>
                        <div class="mid_static_line" :style="mid_static_line_style" v-show="show_time_line_show">
                            <div class="div1">{{mid_line_text}}</div>
                            <div class="div2"></div>
                        </div>
                        <div class="gantt_li flexSB" v-for="list in filghtPlaceList" :key="list.name">
                            <div class="gantt_li_left a flexSC" :style="list.color?'background-color:#11a3e9;':'background-color:#2c569e;'">
                                <div class="flexSC a">C</div>{{list.name}}
                            </div>
                            <ul class="gantt_li_right" :style="'background-size:'+(liBgWidth>100?100:liBgWidth)+'% 100%;'">
                                <template v-for="(filght,index) in list.data">
                                    <el-popover placement="bottom-start" width="600" v-for="item in filght.flightList"  :style="getPosition(filght)" trigger="click"  :key="index+item.id" v-if="filght.flightList&&filght.flightList.length>1?item.movement=='A':true">
                                        <div class="processTable_place">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <td v-for="(colData,idx) in processHeader" :key="idx">{{colData.name}}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td v-for="(colData,idx) in processHeader" :key="idx">
                                                            <div class="wrapBox flexDC">
                                                                <span class="orbiB proess_time" v-for="list in processShowLists" :key="list.id">
                                                                    {{getCodeValue(activeProcessBody,colData.code,list)}}
                                                                </span>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <li slot="reference"  :title="item.flightNo" class="flexSC oneR" :class="fightFlag==item.id?'active':''"  @click="filghtHandle(filght,item)" @mouseenter="show_time($event)" @mouseleave="show_time_line_show=false;show_time_line_left_show=false;show_time_line_right_show=false">
                                            <div class="mark" :style="getMarkColor(item.flight_indicator)"></div>
                                            <div class="flexSC seatType a">C</div>
                                            {{getfFilghtNo(item)}}
                                            <div class="vip" v-show="item.vipMark"></div>
                                        </li>
                                    </el-popover>
                                </template>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="filght_detail flexSB">
                    <div class="filght_detail_title">
                        <div class="back_box_box">
                            <div class="back_box flexSC" @click="filght_detail_body_show_handle">
                                <i class="el-icon-d-arrow-right" v-show="filght_detail_body_show"></i>
                                <i class="el-icon-d-arrow-left" v-show="!filght_detail_body_show"></i>
                            </div>
                        </div>
                        <ul>
                            <li v-for="(item,idx) in detailNavList" :key="idx" class="flexSC" :class="idx==detailNavFlag?'active':''">
                                <i class="el-icon-d-arrow-right" ></i>
                            </li>
                        </ul>
                    </div>
                    <div class="filght_detail_body" v-show="filght_detail_body_show">
                        <div class="detail_name flexSC">航班信息</div>
                        <div class="detail_detail">
                            <div class="filght_deltail">航班号:&nbsp;{{getfFilghtNo(activeFilght_A)}}</div>
                            <div class="filght_deltail">停机位:&nbsp;{{activeFilght_A.seat}}</div>
                            <div class="filght_deltail">登机口:&nbsp;{{getCode(activeFilght_A.flightExtra?activeFilght_A.flightExtra.gate:'')}}</div>
                            <div class="filght_deltail">机号:&nbsp;{{activeFilght_A.aircraftNo}}</div>
                            <div class="filght_deltail">机型:&nbsp;{{activeFilght_A.aircraftType}}</div>
                            <div class="filght_deltail">翼展:&nbsp;</div>
                            <div class="filght_deltail">翼尖小翼:&nbsp;</div>
                            <div class="filght_deltail">机长:&nbsp;</div>
                            <div class="filght_deltail">机类:&nbsp;</div>
                            <div class="filght_deltail">航空公司:&nbsp;{{activeFilght_A.airlineCode}}</div>
                            <div class="filght_deltail">旅客代理:&nbsp;</div>
                            <div class="filght_deltail">机务代理:&nbsp;</div>
                            <div class="filght_deltail">勤务代理:&nbsp;</div>
                            <div class="divider"></div>
                            <div class="filght_deltail">进港航班号:&nbsp;{{activeFilght_A.flightNo}}</div>
                            <div class="filght_deltail">进港机位(优):&nbsp;{{activeFilght_A.seat}}</div>
                            <div class="filght_deltail">行李转盘:&nbsp;{{getCode(activeFilght_A.flightExtra?activeFilght_A.flightExtra.carousel:'')}}</div>
                            <div class="filght_deltail">落地跑道:&nbsp;{{activeFilght_A.runway}}</div>
                            <div class="filght_deltail">航班类别:&nbsp;{{activeFilght_A.flightType}}</div>
                            <div class="filght_deltail">航班标识:&nbsp;</div>
                            <div class="filght_deltail">前站机场:&nbsp;</div>
                            <div class="filght_deltail">运营状态:&nbsp;</div>
                            <div class="filght_deltail">电子进程单状态:&nbsp;{{activeFilght_A.flightExtra?activeFilght_A.flightExtra.elecSate:''}}</div>
                            <div class="filght_deltail">前方计划起飞:&nbsp;{{getTime(activeFilght_A.preStd)}}</div>
                            <div class="filght_deltail">前方实际起飞:&nbsp;{{getTime(activeFilght_A.preAtd)}}</div>
                            <div class="filght_deltail">计划时间:&nbsp;{{getTime(activeFilght_A.originalTime)}}</div>
                            <div class="filght_deltail">ETA:&nbsp;{{getTime(activeFilght_A.eta)}}</div>
                            <div class="filght_deltail">ATA:&nbsp;{{getTime(activeFilght_A.ata)}}</div>
                            <div class="filght_deltail">入位:&nbsp;{{getTime(activeFilght_A.aircraftIn)}}</div>
                            <div class="filght_deltail">VTT:&nbsp;</div>
                            <div class="divider"></div>
                            <div class="filght_deltail">离岗航班号:&nbsp;{{activeFilght_D.successionFlightNo}}</div>
                            <div class="filght_deltail">离岗机位(优):&nbsp;{{activeFilght_D.seat}}</div>
                            <div class="filght_deltail">值机柜台:&nbsp;{{activeFilght_D.flightExtra?activeFilght_D.flightExtra.checkinCounter:''}}</div>
                            <div class="filght_deltail">起飞跑道:&nbsp;</div>
                            <div class="filght_deltail">航班类别:&nbsp;</div>
                            <div class="filght_deltail">航班标识:&nbsp;</div>
                            <div class="filght_deltail">终点机场:&nbsp;</div>
                            <div class="filght_deltail">运营状态:&nbsp;</div>
                            <div class="filght_deltail">计划时间:&nbsp;</div>
                            <div class="filght_deltail">计算撤轮档COBT:&nbsp;{{getTime(activeFilght_D.cobt)}}</div>
                            <div class="filght_deltail">计算起飞CTOT:&nbsp;{{getTime(activeFilght_D.ctot)}}</div>
                            <div class="filght_deltail">推出:&nbsp;{{getTime(activeFilght_D.out)}}</div>
                            <div class="filght_deltail">实际起飞ATD:&nbsp;</div>
                            <div class="filght_deltail">离岗VTT:&nbsp;</div>
                            <div class="filght_deltail">前站离岗:&nbsp;</div>
                            <div class="divider"></div>
                            <div class="filght_deltail">进ID:&nbsp;{{activeFilght_A.flightId}}</div>
                            <div class="filght_deltail">离ID:&nbsp;{{activeFilght_D.successionId}}</div>
                            <div class="divider"></div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div>

        </div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            detailNavList:[
                {name:'收起',icon:'el-icon-d-arrow-right'},
                {name:'收起',icon:'el-icon-d-arrow-right'},
                {name:'收起',icon:'el-icon-d-arrow-right'},
            ],
            searchTime:null,
            startTime:null,
            detailNavFlag:0,
            filghtPlaceList:[],
            activeFilght_A:{},
            activeFilght_D:{},
            filght_detail_body_show:false,
            processHeader:[],
            activeProcessBody:[],
            processShowLists:[],
            dividerLeft:0,
            fightFlag:null,
            show_time_line_show:false,
            show_time_line_left_show:false,
            show_time_line_right_show:false,
            left_com_line_style:null,
            right_com_line_style:null,
            left_static_line_style:null,
            right_static_line_style:null,
            mid_static_line_style:null,
            left_line_text:null,
            mid_line_text:null,
            right_line_text:null,
            startDate:null,
            endDate:null,
            typeName:'监控模式',
            liBgWidth:25,
            searchStr:null,
            searchSel:""
        }
    },
    components: {
		"com-glob-head":r =>require.ensure([], () => r(require('../components/com-glob-head')),"com-globHead"),
        "com-time-line":r =>require.ensure([], () => r(require('../components/com-time-line')),"com-timeLine"),
    },
    beforeMount(){
        setTimeout(()=>{
            this.postal.publish({
                channel:'worker.fpms',
                topic:'get_flight_schedule_data_by_db',
                data:{
                    token:sessionStorage.getItem("token")
                }
            })
        },0)
        
        window.onresize = ()=>{
            this.dividerPoLeft()
        }
    },
    mounted(){
        this.postal.subscribe({//初始化header
            channel: 'web.fpms',
            topic: 'flight_schedule_data_header',
            callback:data => {
                this.reset_data_header(data)
            }
        })
        
    },
    methods: {
        filterByMsg(searchSel,searchStr){
            let searchStrArr = []
            let filterArr = []
            if(searchSel){//节点搜索
                searchStrArr.push(searchSel)
            }else{//全部搜索
                searchStrArr = ["seat","flightNo","aircraftNo","flightId"]
            }
            searchStrArr.map(arr=>{
                let a = _.filter(this.filghtData,function(list){
                    return _.find(list.flightList,function(filght){
                        list.aircraftNo = filght.aircraftNo
                        let value = _.get(list,arr) || null
                        return value&&value.toString().includes(searchStr)&&!_.find(filterArr,{aircraftNo:filght.aircraftNo})
                        
                    })
                })
                filterArr = _.concat(filterArr,a)
            })
            this.loadFilghtData(filterArr)
        },
        filght_detail_body_show_handle(){
            this.filght_detail_body_show = !this.filght_detail_body_show
            this.$nextTick(function(){
                this.dividerPoLeft()
            })
            
        },
        typeChangeHandle(){
            if(this.typeName == "查询模式"){
                this.typeName = "监控模式"
                this.$refs.ref_timeLine.getHourList(new Date(new Date()-6*60*60*1000),"control")
            }else{
                this.searchTimeHandle(this.startDate)
            }
        },
        searchTimeHandle(val){
            this.typeName = "查询模式"
            this.startDate = new Date(val)
            this.$refs.ref_timeLine.getHourList(this.startDate,"search")
        },
        getTime(time){//获取时间hh-mm-ss
            return time?time.split(" ")[1]:"--"
        },
        getCode(data){//登机口,行李转盘
            let result = null
            if(data){
                result = JSON.parse(data).code
            }
            return result
        },
        updateTime(){
            this.loadFilghtData(this.filghtData)
        },
        dividerPoLeft(){

            let bili = (new Date().getTime()-this.startDate.getTime())/(24*60*60*1000)
            this.liBgWidth = bili * 100
            this.dividerLeft = $(".gantt_title").find(".gantt_title_right").width()*bili + 80 -1
        },
        getMarkColor(flight_indicator){
            let result = ""
            switch (flight_indicator) {
                case "I":
                    result = 'red'
                    break;
                case "M":
                    result = 'yellow'
                    break;
                case "R":
                    result = '#CCC'
                    break;
                default:
                    break;
            }
            return "border-top-color:"+result+";"
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
        show_time(e){
            this.show_time_line_show=true
            let $span = $(e.target).parent()
            let $ul = $span.parent()
            let $preSpan = $span.prev()
            if($preSpan.length>0){
                let line_left = $preSpan[0].offsetLeft+80+$preSpan[0].offsetWidth
                let line_width = $span[0].offsetLeft+80-line_left
                let line_top = $ul[0].offsetTop-this.realPx(16)
                this.left_static_line_style = `width:${line_width}px;left:${line_left}px;top:${line_top}px;`
                let leftDate = this.formatDuring((line_width/$ul[0].offsetWidth) *24*60*60*1000)
                this.left_line_text= `${leftDate.mm}:${leftDate.ss}`
                this.show_time_line_left_show=true
            }else{
                this.show_time_line_left_show=false
            }
            //右边横线
            let $nextSpan = $span.next()
            if($nextSpan.length>0){
                let line_left = $span[0].offsetLeft+80+$span[0].offsetWidth
                let line_width = $nextSpan[0].offsetLeft+80-line_left
                let line_top = $ul[0].offsetTop-this.realPx(16)
                this.right_static_line_style = `width:${line_width}px;left:${line_left}px;top:${line_top}px;`
                let rightDate = this.formatDuring((line_width/$ul[0].offsetWidth) *24*60*60*1000)
                this.right_line_text= `${rightDate.mm}:${rightDate.ss}`
                this.show_time_line_right_show=true
            }else{
                this.show_time_line_right_show=false
            }

            //中间线
             
            let midDate = this.formatDuring(($span[0].offsetWidth/$ul[0].offsetWidth) *24*60*60*1000)
            this.mid_line_text= `${midDate.mm}:${midDate.ss}`
            this.mid_static_line_style = `width:${$span[0].offsetWidth}px;left:${$span[0].offsetLeft+80}px;top:${$ul[0].offsetTop-this.realPx(19)}px;`
            
            //左边竖线
            this.left_com_line_style = `left:${$span[0].offsetLeft+80}px;`
            //右边竖线
            this.right_com_line_style = `left:${$span[0].offsetLeft+80+$span[0].offsetWidth}px;`
        },
        formatDuring: function(mss) {
            var minutes = parseInt(mss/(60*1000));
            var seconds = parseInt(mss % (1000 * 60)/1000);
            
            return {
                mm:minutes,
                ss:seconds
            }
        },
        realPx(px){
            let lealpx = px
            let bili = Number(_.split($("html")[0].style.fontSize,"p")[0])/100
            
            lealpx = px*bili
            return lealpx
        },
        reset_data_header(data){
            this.processShowLists = data.monitorShow.monitorShow//进程显示时间
            this.processHeader=data.process_header//进程头部
        },
        filghtHandle(data,item){
            console.log(data)
            this.activeFilght_A = _.find(data.flightList,{movement:"A"})||{}
            this.activeFilght_D = _.find(data.flightList,{movement:"D"})||{}
            this.fightFlag = item.id
            this.filght_detail_body_show = true
            this.$nextTick(function(){
                this.dividerPoLeft()
            })
            this.activeProcessBody = []
            this.$axios.get("/process/findByFlightId",{
                params:{
                    flightId:item.flightId
                }
            })
            .then((res)=>{
                if(res.data){
                    this.activeProcessBody = res.data.body || []
                }
            })
        },
        getFilghtData(startDate,endDate){
            let startTime = this.getNowFormatDate(startDate)
            this.searchTime = startTime


            this.startDate = startDate//时间线开始时间
            this.endDate = new Date(new Date(startDate).getTime()+24*60*60*1000)//时间线结束时间，不包含多余

            this.$axios.get("/flight/findByTime",{
                params:{
                    startTime:startTime,
                    endTime:this.getNowFormatDate(endDate)
                }
            })
            .then((res)=>{
                if(res.data){
                    this.filghtData = res.data
                    this.loadFilghtData(res.data)
                }
            })
        },
        getCodeValue(lists,code,key){
            let list = _.find(lists, { 'processCode': code})
            let result = list?list[key]:''
            if(result){
                result = result.split(" ")[1].substring(0,5)
            }
            return  result?result:"--";
        },
        loadFilghtData(data){
            let filghtPlaceList = []
            this.dividerPoLeft()
            _.map(data,(list)=>{
                // if(list.flightList[0].seat){
                    let flightScheduleSeatVoList = list.flightScheduleSeatVoList
                    flightScheduleSeatVoList.map(seatList=>{
                        
                        if(new Date(this.startDate).getTime()>new Date(seatList.seatEndTime).getTime()){
                            return;
                        }   

                        let str = seatList.seat
                        if(_.includes(seatList.seat, "\"")){
                            str = seatList.seat.match(/"(\S*)"/)[1];
                        }
                        
                        let deepData = _.cloneDeep(list);
                        deepData.seatStartTime = seatList.seatBeginTime
                        deepData.seatEndTime = seatList.seatEndTime
                        deepData.seat = str

                        let listArr =  _.find(filghtPlaceList,{'name':str})
                        if(listArr){
                            listArr.data.push(deepData)
                        }else{
                            filghtPlaceList.push({name:str,data:[deepData]})
                        }
                    })
                // }
            })


            filghtPlaceList = _.sortBy(filghtPlaceList, function(list) { 
                list.data = _.sortBy(list.data, function(filght) { 
                    let at = new Date(filght.seatStartTime || new Date().getTime()-21600000).getTime()
                    return at
                })
                return list.name; 
            });

            filghtPlaceList.forEach((list,idx)=>{
                if(idx==0){
                    list.color=true
                }else{
                    if(list.name.substring(0,2)==filghtPlaceList[idx-1].name.substring(0,2)){
                        list.color = filghtPlaceList[idx-1].color
                    }else{
                        list.color = !filghtPlaceList[idx-1].color
                    }
                }
            })
            this.filghtPlaceList = filghtPlaceList


            //divider线的位置
            // dividerPoLeft


            console.log(filghtPlaceList)
        },
        getPosition(data){
            let filght = _.find(data.flightList,{movement:"A"})||_.find(data.flightList,{movement:"D"})
            let result = ""

            let newDate = new Date().getTime()
            let startDate = new Date(this.startDate).getTime()//时间表坐端
            let endDate = new Date(this.endDate).getTime()//时间表右端


            let at = data.seatStartTime //本站到达时间
            let lt = data.seatEndTime //本站离开时间

            at = at?new Date(at).getTime():startDate
            lt = lt?new Date(lt).getTime():endDate
            // at = at?new Date(at).getTime():new Date(new Date(lt).getTime()-2*60*60*1000).getTime()
            // lt = lt?new Date(lt).getTime():new Date(new Date(at).getTime()+2*60*60*1000).getTime()


            //背景颜色
            //前站预计起飞,未起飞,绿色
            // let pre_etd = filght.preEtd || filght.preStd
            // if(pre_etd){
            //     console.log(pre_etd,filght.flightNo)
                result = "background-color:rgba(82, 213, 110, 0.5);color:#666;"
            // }
            
            //前站已起飞,紫色
            let pre_atd = filght.preAtd 
            if(pre_atd){
                result = "background-color:rgba(183, 150, 255, 0.4);;border-color:#000;color:#000;"
            }

            //滑行，浅蓝色
            let slip_time = filght.flightExtra.slipTime
            if(at<newDate&&at+slip_time>newDate){
                result = "background-color:green;border-color:#000;color:#666;"
            }

            //保障中，深蓝

            if(at&&at+slip_time<newDate&&lt>newDate){
                result ="background-color:rgba(46, 103, 246, 0.3);border-color:#000;color:#000;"
            }

            //本站已起飞，灰色
            if(lt&&lt<newDate){
                result ="background-color:rgba(176, 187, 202, 0.5);border-color:rgb(176, 187, 202);color:#000;"
            }



            //lef

            //left位置，及宽度
            
            let leftTime = at-startDate
            let left=(100/24)*(leftTime>0?leftTime:0)/3600000


            
            let stopTime = (lt-endDate>0?endDate:lt) - (leftTime>0?at:startDate)
            let width = (100/24)*stopTime/3600000
            result += `width:${width}%;left:${left}%;`

            return result
        },
        getNowFormatDate(date) {
            var seperator1 = "-";
            var seperator2 = ":";
            var MM = date.getMonth() + 1;
            var DD = date.getDate();
            var hh = date.getHours();
            var mm = date.getMinutes();
            var ss = date.getSeconds();

            if (MM >= 1 && MM <= 9) {
                MM = "0" + MM;
            }
            if (DD >= 0 && DD <= 9) {
                DD = "0" + DD;
            }
            if (hh >= 0 && hh <= 9) {
                hh = "0" + hh;
            }
            if (mm >= 0 && mm <= 9) {
                mm = "0" + mm;
            }
            if (ss >= 0 && ss <= 9) {
                ss = "0" + ss;
            }
            var currentdate = date.getFullYear() + seperator1 + MM + seperator1 + DD
                    + " " + hh + seperator2 + mm + seperator2 + ss;
            return currentdate;
        }
    },
}
</script>
<style lang="scss" scoped>
#filghtPlace{height: 100%;width:100%;
    .container{height: calc(100% - 40px);width: 100%;
        .container_title{height: 50px;display:flex;;
            .container_title_left{display:flex;align-items: center;height: 100%;
                .titleText{color: #2e67f6;font-size: 24px;height: 100%;line-height: 50px;padding: 0 10px;cursor: pointer;}
            }
            .container_title_right{padding-right: 10px;}
            // .datePickerBox{

            // }
        }
        .body{height: calc(100% - 50px);
            .place_gantt{flex: 1;height: 100%;
                
                .gantt_title{margin: 0;height: 30px;background: black;overflow-y: scroll;;
                    .gantt_title_left{width:80PX;background:#2e67f6;height:100%;color:#fff;}
                    .gantt_title_right{height: 100%;width:calc(100% - 80PX);}
                }
                .gantt_ul{overflow-y: scroll;height: calc(100% - 30px);position: relative;;
                    .com_divider{position: fixed;top:1.2rem;height:calc(100% - 1.2rem);width: 1px;background:rgb(62,84,150);z-index: 1000;}

                    .left_com_line{width: 1px;top:1.2rem;height:calc(100% - 1.2rem);left:0;background: red;position: fixed;z-index: 1000;;}
                    .right_com_line{width: 1px;top:1.2rem;height:calc(100% - 1.2rem);left:0;background: red;position: fixed;z-index: 1000;;}
                    .left_static_line{height:23px;width:0px;top:0;left:0;;position: absolute;z-index: 1000;display: flex;flex-direction: column;
                        .div1{font-size: 12px;color: red;height:20px;text-align: center;line-height: 20px;margin-bottom: -10px;}
                        .div2{border:2px solid red;height: 12px;border-top: none;border-bottom: none;display: flex;align-items: center;;;
                            div{height: 1px ;width: 100%;background: red;}
                        }
                    }
                    .right_static_line{height:33px;width: 0px;top:0;left:0;;position: absolute;z-index: 1000;
                        .div1{font-size: 12px;color: red;height:20px;text-align: center;line-height: 20px;margin-bottom: -10px;;}
                        .div2{border:2px solid red;height: 12px;border-top: none;border-bottom: none;display: flex;align-items: center;;;
                            div{height: 1px ;width: 100%;background: red;}
                        }
                    }
                    .mid_static_line{height:20px;width:0;top:0;left:0;;position: absolute;z-index: 1000;border-bottom: 1px solid red;color: red;text-align: center;line-height: 20px;;
                    }

                    .gantt_li{height:40px;margin-bottom: 5px;border: 1px solid #ddd;;;
                        
                        .gantt_li_left{width: 80PX;height: 100%;color:#fff;;
                            div{height: 20px;width: 20px;border-radius:30px ;color: #fff;margin-right:5px;}
                            div.a{background: rgb(50,105,240);}
                        }

                        // .gantt_li_left.a{background: rgb(70,160,230);color:#fff;}
                        // .gantt_li_left.b{background:rgb(50,85,155);color:#fff;}
                        .gantt_li_right{height: 100%;width:calc(100% - 80PX);background: url("../assets/img/list-2.png");background-size:25% 100%;background-repeat: no-repeat;position: relative;overflow: hidden;;
                            &>span{position: absolute;top:0;display:inline-block;height: 100%;border:1px solid transparent;cursor: pointer;}
                            li{position: relative;height: 100%;;
                                .mark{width:0;height:0;border-right:10px solid transparent;border-top:10px solid transparent;position: absolute;top:-1px;left:-1px;}
                                .vip{height:30px ;width: 30px;background-image: url("../assets/img/vip.svg");background-size:100% 100% ;margin-left:10px;}
                                .seatType{height: 20px;width: 20px;border-radius:30px ;color: #fff;margin-right:10px;}
                                .seatType.a{background: rgb(50,105,240);}
                            }
                            li.a{background: rgb(190,200,240);border-color:#333;}
                            li.b{background: rgb(177,1225,186);color:#666;}
                            li.a{background: rgb(230,260,70);border-color:#333;}

                            

                            


                            li.active{  background: rgb(232,165,72)!important;border-color:#333!important;color:#000!important;}
                        }
                    }
                }
            }
            .filght_detail{height: 100%;;background: #eee;
                .filght_detail_title{height: 100%;
                    .back_box_box{border-bottom: 1px solid #ccc;
                        .back_box{height: 30px;width: 30px;border-radius: 30px;background: #ccc;margin-left:10px;cursor: pointer;}
                    }
                    ul{width: 40px;height: 100%;
                        li{height: 40px;border-bottom: 1px solid #ccc;}
                        .active{background:#2f61d5;color:#fff;}
                    }
                    
                }
                .filght_detail_body{height:100%;display:flex;flex-direction: column;width: 360px;align-items: start;border-bottom: 1px solid #ccc;
                    .detail_name{height: 30px;background:#2e67f6 ;color: #fff;line-height: 30px;padding: 0 15px;border-radius:0 15px 15px 0;}
                    .detail_detail{height:100%;width:100%;background: #fff;overflow: auto;padding:20px 40px ;
                    
                        .filght_deltail{color: #666;margin:5px 0;font-size: 14px;}
                        .divider{border: 1px dashed #666;margin: 15px 0;}
                    }

                }
            }
        }
    }
}
</style>
<style lang="scss">
#filghtPlace{
    .container_title{
        .el-select{width: 1rem;}
    }
    
    .el-date-editor.el-input{width: 2.8rem;}
    
}
.el-popover{padding: 0;}
.processTable_place{overflow: auto;;
    table{table-layout: fixed;
        thead{
            tr{background:black;height: 30px;
                td{height: 30px; word-break: keep-all;color: #fff;padding:0 10px ;text-align: center;}
            }
        }
        tbody{
            tr{height: 60px;
                .wrapBox{background:rgba(227,234,242,1);border: 1px solid #fff; }
                td{

                    span{text-align: center;word-break: keep-all;padding:0 10px ;}
                }
            }
        }
    }
}

</style>