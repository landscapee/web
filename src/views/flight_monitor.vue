<template>
    <div id="filghtControl">
        <com-glob-head :path="'flight_monitor'"></com-glob-head>
        <div class="titleButtonBox">
            <ul class="signFilterBox">
                <li v-for="(item,idx) in signFilterLists" :key="idx" :class="idx==filterFlag?'active':''" @click="signFilter(idx)">
                    <div class="filterName">{{item.name}}</div>
                    <div class="filterBage" v-show="item.count>0">{{item.count}}</div>
                </li>
            </ul>
            <div class="groupButtonBox">
                <div>
                    <el-radio-group v-model="area" @change="area_change">
                        <el-radio-button label="国内" ></el-radio-button>
                        <el-radio-button label="国际"></el-radio-button>
                    </el-radio-group>
                </div>
                <div>
                    <el-select v-model="filghtTypeValue" placeholder="航班类型" @change="fight_type_change">
                        <el-option v-for="(item,idx) in filghtType" :key="idx" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </div>
                <div>
                    <el-input placeholder="航班号 | 登机口 | 机号 | 机位 | 机场 | 二字码" v-model="searchStr" class="input-with-select" @keyup.enter.native="search">
                        <el-select v-model="searchSel" slot="prepend" placeholder="全部">
                            <el-option label="全部" value=""></el-option>
                            <el-option label="航班号" value="flightNo"></el-option>
                            <el-option label="登机口" value="flightExtra.gate"></el-option>
                            <el-option label="机尾号" value="aircraftNo"></el-option>
                            <el-option label="机位" value="seat"></el-option>
                            <el-option label="机场" value="5"></el-option>
                            <el-option label="二字码" value="6"></el-option>
                        </el-select>
                        <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
                    </el-input>
                </div>
                <div>
                    <el-button type="primary" icon="el-icon-search" @click="seniorSearch">高级查询</el-button>
                </div>
                <div class="flexSB" >
                    <!-- <el-button icon="el-icon-setting" @click="openLayerMilepost(2)"></el-button> -->
                    <com-set v-if="business_config||department_config" :config="{business_config,department_config}"></com-set>
                    <el-button icon="el-icon-time" @click="openLayerMilepost(0)" style="margin:0 5px"></el-button>
                    <el-button icon="el-icon-document-delete" @click="openLayerMilepost(1)"></el-button>
                </div>
            </div>
        </div>
        <div class="filght_container">
            <div class="filghtTableBox" :style="filghtTableBoxStyle" >
                <el-table :data="showTableData" border :height="'100%'" style="width:100%;" size="mini" header-row-class-name="filght_thead_tr" row-class-name="filght_body_tr" header-cell-class-name="headCell">
                    <el-table-column fixed width="30">
                        <template slot="header" slot-scope="scope">
                            <span>#</span>
                        </template>
                        <template slot-scope="scope">
                            <div class="bodyCell" :class="scope.row.sortType">
                                <span class="oneR" @click="$router.push({path: '/filghtMilepost', query: { flightId: showTableData[scope.$index].flightId } })">{{scope.$index+1+scrollTopIndex}}</span>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column fixed>
                        <template slot="header" slot-scope="scope">
                            <span class="caret-wrapper flexSC"><i class="el-icon-lock"></i></span>
                            <span>标记</span>
                        </template>
                        <template slot-scope="scope">
                            <div class="bodyCell" :class="scope.row.sortType">
                                <div class="wrapBox filght_mark_box">
                                    <div class="filght_mark oneR flexSC" :class="showTableData[scope.$index].sortType=='DELAY'?'active':''">D</div>
                                    <div class="filght_mark oneR flexSC" :class="showTableData[scope.$index].keyMaintaince?'active':''">I</div>
                                    <div class="filght_mark oneR flexSC" :class="showTableData[scope.$index].vipMark?'active':''">V</div>
                                    <div class="filght_mark oneR flexSC" :class="showTableData[scope.$index].flightExtra.quickFlag?'active':''">Q</div>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column v-for="(colData,idx) in tableGroupItem" :fixed="colData&&colData.flightNodeConfig&&colData.flightNodeConfig.show==1?true:false" :key="idx" :show-overflow-tooltip="true" :width="getbodyHeadWidth(colData)">
                        <template slot="header" slot-scope="scope">
                            <span class="caret-wrapper flexSC">
                                <i class="el-icon-lock" @click="locked_head(idx,0,'filght')" v-if="colData&&colData.flightNodeConfig&&colData.flightNodeConfig.show==1?true:false"></i>
                                <i class="el-icon-unlock" @click="locked_head(idx,1,'filght')"  v-else></i>
                            </span>
                            <span>{{colData.name}}</span>
                        </template>
                        <template slot-scope="scope">
                            <transition name="el-fade-in-linear">
                                <div class="bodyCell" :class="scope.row.sortType" :data-code="colData.code">
                                    <template v-if="colData.code=='flightExtra.route'">
                                        <el-popover placement="bottom"  trigger="hover">
                                            <div class="filghtLinePopover">
                                                <div class="filghtLinePopover_title">{{getfFilghtNo(scope.row)}}</div>
                                                <div class="filghtLinePopover_content" v-html="filghtLineName(scope.row)"></div>
                                            </div>
                                            <div class="wrapBox" slot="reference">
                                                <div class="oneR flexSC" v-for="(item,idx) in getFilghtLine(scope.row,colData.code)" :key="idx">
                                                    {{item}}
                                                </div>
                                            </div>
                                        </el-popover>
                                    </template> 
                                    <template v-else>
                                        <span :class="getTextClass(colData.code)" class="oneR" :style="getTextStyle()">
                                            {{getText(scope.row,colData.code)}}
                                        </span>
                                    </template>
                                </div>
                            </transition>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="openCloseBox">
                <div class="headbox"></div>
                <div class="bodybox" @click="scaleHandle('left')">
                    <div class="rightbox" @click.stop="scaleHandle('right')"></div>
                    <div class="leftbox1" @click.stop="scaleHandle('left')"></div>
                    <div class="leftbox2" @click.stop="scaleHandle('left')"></div>
                </div>
            </div>
            <div class="filghtProcessBox" :style="filghtProcessBoxStyle">
                <el-table :data="showTableData" border :height="'100%'" style="width:100%;" size="mini" header-row-class-name="filght_thead_tr" row-class-name="filght_body_tr" header-cell-class-name="headCell" >
                    <el-table-column v-for="(colData,idx) in tableProcessItem" :fixed="colData&&colData.processNodeConfig&&colData.processNodeConfig.show==1?true:false" :key="idx" :show-overflow-tooltip="true" :width="getbodyHeadWidth(tableProcessItem[idx])" >
                        <template slot="header" slot-scope="scope">
                            <span class="caret-wrapper flexSC">
                                <i class="el-icon-lock" @click="locked_head(idx,0,'process')" v-if="colData&&colData.processNodeConfig&&colData.processNodeConfig.show==1?true:false"></i>
                                <i class="el-icon-unlock" @click="locked_head(idx,1,'process')" v-else></i>
                            </span>
                            <span>{{tableProcessItem[idx].name}}</span>
                        </template>
                        <template slot-scope="scope">
                            <!-- <div  class="bodyCell" :data-code="colData.code" :class="getProcessCellClass(showTableData[scope.$index].processData,colData.code)"  @click="processCellHandle(showTableData[scope.$index],colData.code)">
                                <div class="wrapBox flexDC" >
                                    <template v-if="!showTableData[scope.$index].processData">
                                        <span class="orbiB proess_time" v-for="list in processShowLists" :key="list.id">--</span>
                                    </template>
                                    <template v-else-if="colData.code=='BoardingEnd'">
                                        <span class="orbiB proess_time">
                                            23:00
                                        </span>
                                        <el-button type="primary" size="mini" @click.stop="loginFilght">登机</el-button>
                                    </template>
                                    <template v-else>
                                        <span class="orbiB proess_time" v-for="list in processShowLists" :key="list.id">
                                            {{getCodeValue(showTableData[scope.$index].processData,colData.code,list)}}
                                        </span>
                                    </template>
                                    
                                </div>
                            </div> -->

                            
                            <div  class="bodyCell" :data-code="colData.code" :class="getProcessCellClass(processData[showTableData[scope.$index].flightId],colData.code)"  @click="processCellHandle(processData[showTableData[scope.$index].flightId],colData.code)">
                                <div class="wrapBox flexDC" >
                                    <template v-if="!processData[showTableData[scope.$index].flightId]">
                                        <span class="orbiB proess_time" v-for="list in processShowLists" :key="list.id">--</span>
                                    </template>
                                    <template v-else-if="colData.code=='BoardingEnd'">
                                        <span class="orbiB proess_time">
                                            23:00
                                        </span>
                                        <el-button type="primary" size="mini" @click.stop="loginFilght">登机</el-button>
                                    </template>
                                    <template v-else>
                                        <span class="orbiB proess_time" v-for="list in processShowLists" :key="list.id">
                                            {{getCodeValue(processData[showTableData[scope.$index].flightId],colData.code,list)}}
                                        </span>
                                    </template>
                                    
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="filghtOptinBox">
                <el-table :data="showTableData" border  size="mini" header-row-class-name="filght_thead_tr" row-class-name="filght_body_tr" header-cell-class-name="headCell">
                    <el-table-column  fixed>
                        <template slot="header" slot-scope="scope">
                            <span>操作</span>
                        </template>
                        <template slot-scope="scope">
                            <div class="bodyCell">
                                <div class="filght_option">
                                    <el-badge :value="0" :max="10" class="item" :hidden="true"> 
                                        <div class="iconBox" @click="openMsgLayer(scope)">
                                            <i v-if="scope.row.flightExt.status=='CONTROL_AND_CONTROL'" class="el-icon-warning" style="color:#ffde72;"></i>
                                            <i v-else  class="el-icon-chat-dot-square" style="color:#555;"></i>
                                        </div>
                                    </el-badge> 
                                    <div class="iconBox" v-if="scope.row.sortType!='TOP'" @click="toTop(scope)" title="置顶"><i class="el-icon-upload2" style="color:#555;"></i></div>
                                    <div class="iconBox" v-else @click="offTop(scope)" title="取消置顶"><i class="el-icon-download" style="color:#555;"></i></div>
                                    <el-dropdown trigger="click" @command="optionDown">
                                        <div class="iconBox" title="更多操作"><i class="el-icon-more" style="color:#555;"></i></div>
                                        <el-dropdown-menu slot="dropdown">
                                            <el-dropdown-item v-if="scope.row.flightExt.status=='CONTROL_AND_CONTROL'" :command="{command:1,scope:scope}" title="取消管控">取消管控</el-dropdown-item>
                                            <el-dropdown-item v-else  :command="{command:0,scope:scope}" title="管控">管控</el-dropdown-item>
                                            <el-dropdown-item :command="{command:2,scope:scope}" title="关闭">关闭</el-dropdown-item>
                                        </el-dropdown-menu>
                                    </el-dropdown>
                                </div>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="scrollBox">
                <el-table :data="tableData" border :height="'100%'" size="mini" header-row-class-name="filght_thead_tr" row-class-name="filght_body_tr">
                </el-table>
            </div>
        </div>
        <layer-milepost ref="ref_milepost"></layer-milepost>
        <layer-search ref="ref_search"></layer-search>
        <layer-set-milepost ref="ref_setMilepost"></layer-set-milepost>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
    data(){
        return {
            filghtProcessBoxShow:false,

            tableProcessItem:[],
            processShowLists:[],
            tableGroupItem:[],
            tableData: [],
            showTableData:[],
            filterFlag:0,
            signFilterLists: [
                { name: "全部航班", count: 0, type: 'all' },
                // 此处添加登录的用户数据
                { name: "管控航班", count: 0, type: 'CONTROL_AND_CONTROL', paramName: 'sortType' },
                { name: "未分配", count: 0 },
                { name: "延误", count: 0, type: 'DELAY', paramName: 'sortType' },
                { name: "备降", count: 0, type: 'B', paramName: 'flightType' },
            ],
            area:"国内",
            filghtType:[
                // {label:'全部',value:""},
                {label:'正班',value:"W"},
                {label:'补班',value:"Q"},
                {label:'货机',value:"Z，H，O，)"},
                {label:'备降',value:"B"},
                {label:'返航',value:"R"},
                {label:'调机',value:"N"},
                {label:'公务机',value:"U"},
                {label:'特殊',value:4},
                {label:'其他',value:"other"},
            ],
            filghtTypeValue: '',
            searchSel:"",
            searchStr:null,
            filghtTableBoxStyle:null,
            filghtProcessBoxStyle:null,
            scaleType:"mid",
            width1:70,
            flight_body:[],
            scrollTopIndex:0,
            loadBodyNum:23,
            optionWidth:0,
            business_config:false,
            department_config:false,
            userData:{},
            processData:{}
        }
    },
    components: {
        "com-glob-head" : () => import(/*webpackChunkName:"com-globHead"*/ '../components/com-glob-head'),
        "layer-milepost" : () => import(/*webpackChunkName:"lay-milepost"*/ '../components/layer-milepost'),
        "layer-search" : () => import(/*webpackChunkName:"lay-search"*/ '../components/layer-search'),
        "layer-set-milepost" : () => import(/*webpackChunkName:"lay-set-milepost"*/ '../components/layer-set-milepost'),
        "com-set" : () => import(/*webpackChunkName:"com-set"*/ '../components/com-set'),
        "get-list" : () => import(/*webpackChunkName:"com-getlist"*/ '../components/com-getlist'),

    },
    inject: ['reload'],
    computed: {
        ...mapGetters(['getUserMsg','getFilghtTpye'])
    },
    beforeMount () {
        this.postal.publish({
            channel:'worker.fpms',
            topic:'get_flight_schedule_data_by_db',
            data:{
                token:sessionStorage.getItem("token")
            }
        })
        // 获取在线用户数据
        this.getOnlineUsersFromServer();
    },
    mounted(){
        this.postal.subscribe({//初始化header
            channel: 'web.fpms',
            topic: 'flight_schedule_data_header',
            callback:data => {
                this.reset_data_header(data)
            }
        })
        this.postal.subscribe({//初始化body
            channel: 'web.fpms',
            topic: 'flight_schedule_data_body',
            callback:data => {
                this.reset_data_body(data)
            }
        })
        this.postal.subscribe({//单个item更新
            channel: 'web.fpms',
            topic: 'flight_schedule_body_item_update',
            callback:data => {
                if(data.option=="update") this.update_item_data(data.data)
                if(data.option=="add") this.add_item_data(data.data)
                if(data.option=="delete") this.delete_item_data(data.data)
            }
        })
        this.postal.subscribe({//航班动态变更消息
            channel: 'web.fpms',
            topic: 'flight_dynamic_message_update',
            callback:data => {
                console.log(data)

                this.changeCellStyle(data,".filghtTableBox")
                let filghtNo = this.getfFilghtNo(data.flight)
                // this.$notify({
                //     title:filghtNo,
                //     dangerouslyUseHTMLString: true,
                //     duration:0,
                //     position: 'bottom-right',
                //     message:`<table><tr><td>变更字段:</td><td>${data.name}</td></tr><tr><td>变更前:</td><td>${data.oldData?data.oldData:''}</td></tr><tr><td>变更后:</td><td>${data.newData?data.newData:''}</td></tr></table>`
                // });
            }
        })
        this.postal.subscribe({//航进程变更消息
            channel: 'web.fpms',
            topic: 'process_info_update',
            callback:data => {
                console.log(data)

                this.changeCellStyle(data,".filghtProcessBox")
                // let filghtNo = this.getfFilghtNo(data.flight)
                // this.$notify({
                //     title:filghtNo,
                //     dangerouslyUseHTMLString: true,
                //     duration:0,
                //     position: 'bottom-right',
                //     message:`<table><tr><td>变更字段:</td><td>${data.name}</td></tr><tr><td>变更前:</td><td>${data.oldData?data.oldData:''}</td></tr><tr><td>变更后:</td><td>${data.newData?data.newData:''}</td></tr></table>`
                // });
            }
        })

        // 在线用户数据更新
        this.postal.subscribe({
            channel: 'web.fpms',
            topic: 'online_users_data_is_update',
            callback: (data) => {
                console.log('在线用户数据', data);
                this.addUserToSignFilterLists(data);
            }
        })


        
        //一屏加载数量
        this.loadBodyNum = Math.ceil((window.innerHeight-this.realPx(120))/this.realPx(80))
        //注册滚动事件
        this.fightscroll()

        this.optionWidth = this.realPx(130)

        window.onresize = ()=>{
            // this.optionWidth = this.realPx(130)
            this.reload()
        }
        

        if(this.$store.getters.getUserMsg){
            this.userData = this.$store.getters.getUserMsg || {}
            this.getSetButtonShow()
        }

        // const loading = this.$loading({
        //   lock: true,
        //   text: 'Loading',
        //   spinner: 'el-icon-loading',
        //   background: 'rgba(0, 0, 0, 0.3)'
        // });
        // setTimeout(() => {
        //   loading.close();
        // }, 2000);
    },
    watch:{
        getUserMsg:function(val){
            this.userData = this.$store.getters.getUserMsg || {}
            this.getSetButtonShow()
        }
    },
    methods: {
        reset_data_header(data){//初始化list
            console.log(data)
            this.tableGroupItem = data.flight_header //动态头部
            this.processShowLists = data.monitorShow.monitorShow//进程显示时间
            setTimeout(()=>{
                this.tableProcessItem=data.process_header//进程头部
            },360)
        },
        reset_data_body(data){//初始化list
            console.log(data)
            let flight_body = data.flight_body
            let process_body = data.process_body
            let newData =  _.sortBy(flight_body,list=>{
                switch (list.sortType) {
                    case "TOP":
                        list.sort = 0
                        break;
                    case "DELAY":
                        list.sort = 1
                        break;
                    case "DROP_OFF_COMPLETED":
                        list.sort = 2
                        break;
                    case "DROP_OFF_NOT_COMPLETED":
                        list.sort = 3
                        break;
                    case "ETA":
                        list.sort = 4
                        break;
                    case "POST_TREATMENT":
                        list.sort = 5
                        break;
                    default:
                        list.sort = 6
                        break;
                }
                return list.sort
            }, 'scheduleTime');
            
            this.flight_body = newData //所有动态

            if(this.tableData.length==0){// 操作条数，滚动条高度
                this.tableData= newData
            }else{
                this.tableData= _.intersectionBy(this.flight_body,this.tableData,"flightId")
            }
            
            this.showTableData = this.tableData.slice(this.scrollTopIndex,this.loadBodyNum+this.scrollTopIndex) //初始显示数据
            this.processData = process_body[0]
            setTimeout(()=>{
                this.setNavCount()//设置nav数量
            },0)


            // setTimeout(() => {
                
            //     console.log(this.showTableData[3])
            //     this.showTableData[2].sortType = "TOP"
            //     this.changeCellStyle(this.showTableData[3],".filghtProcessBox")
                
            // }, 3000);
        },
        loginFilght(){

        },
        changeCellStyle(data,box){//动画变化背景，显示变化单元格
            // data.code = 'ACUnitOnEnd'
            let flightId = data.flightId
            let index = _.findIndex(this.showTableData,{'flightId':flightId})
            
            let $cell1 = $(box).find("table.el-table__body").eq(0).find('tr.filght_body_tr').eq(index).find(".bodyCell[data-code="+data.code+"]")
            let $cell2 = $(box).find("table.el-table__body").eq(1).find('tr.filght_body_tr').eq(index).find(".bodyCell[data-code="+data.code+"]")

            $cell1.addClass("transClass")
            $cell2.addClass("transClass")

            setTimeout(() => {
                $cell1.removeClass("transClass")
                $cell2.removeClass("transClass")
            }, 1500);
        },
        //操作按钮组
        toTop(data){//置顶
            let row = data.row
            this.$axios.post("/operation/top",{
                userId:this.userData.id,
                flightId:row.flightId
            })
        },
        offTop(data){//取消置顶
            let row = data.row
            this.$axios.get("/operation/cancelTop",{
                params:{
                    flightId:row.flightId
                }
            })
        },
        optionDown(data){//下拉
            let row = data.scope.row
            let url = ""
            if(data.command==0){//管控
                url = "/operation/controlAndControl"
            }
            if(data.command==1){//取消管控
                url = "/operation/cancelControlAndControl"
            }
            if(data.command==2){//关闭
                url = "/operation/close"
            }
            this.$axios.get(url,{
                params:{
                    flightId:row.flightId
                }
            })
        },
        openMsgLayer(data){//消息弹窗
            this.$refs.ref_milepost.initMessage(data)
        },
        // 导航点击
        signFilter (index) {
            this.filterFlag = index
            this.area = "国内"
            this.flightIndicatorList = null
            this.filghtTypeValue = ""
            this.filghtTpyeList = null
            this.searchStr = ""
            //滚动条还原
            this.scrollTopIndex = 0
            $(".scrollBox").find(".el-table__body-wrapper").scrollTop(0);
            // 当前点击项
            let item = this.signFilterLists[index];
            // 全部航班
            if (item.type === 'all') {
                this.tableData = this.flight_body;
                this.showTableData = _.slice(this.tableData, 0, this.loadBodyNum);
            } else if (item.type) {
                this.tableData = this.flight_body.filter(list=>{
                    return list[item.paramName] === item.type;
                });
                this.showTableData = this.tableData.slice(0, this.loadBodyNum);
            }
        },
        // 设置导航统计数
        setNavCount(){
            if (this.flight_body && _.isArray(this.flight_body)) {
                //总条数
                this.signFilterLists[0].count=this.flight_body.length
                
                //管控
                let controlIdx = _.findIndex(this.signFilterLists, (item) => {
                    return item.type === 'CONTROL_AND_CONTROL';
                })
                this.signFilterLists[controlIdx].count = this.flight_body.filter(list=>{
                    return list.sortType === "CONTROL_AND_CONTROL"
                }).length

                //延误
                let delayIdx = _.findIndex(this.signFilterLists, (item) => {
                    return item.type === 'DELAY';
                })
                this.signFilterLists[delayIdx].count = this.flight_body.filter(list=>{
                    return list.sortType === "DELAY"
                }).length

                //备降
                let bIdx = _.findIndex(this.signFilterLists, (item) => {
                    return item.type === 'B';
                })
                this.signFilterLists[bIdx].count = this.flight_body.filter(list=>{
                    return list.flightType === "B"
                }).length
            }

        },
        // 将用户数据添加到signFilterLists
        addUserToSignFilterLists (data) {
            if(!data) return;

            let currentList = [];
            // 获取当前显示的用户数据
            currentList = _.filter(this.signFilterLists, (item) => {
                return item.type === 'USER';
            })
            // 删除
            if (data.type === 'delete') {
                _.pullAllBy(currentList, data.list, 'userId')
            } else {
                currentList = _.unionBy(currentList, data.list, 'userId')
            }

            let dealList = [];
            _.map(currentList, (item) => {
                dealList.push(
                    { name: item.userName || item.name, type: 'USER', userId: item.userId },
                )
            })

            let tmp = _.filter(this.signFilterLists, (item) => {
                return item.type !== 'USER';
            });
            tmp.splice(1, 0, ...dealList);

            this.signFilterLists = tmp;
    
        },
        // 从服务器获取在线用户数据
        getOnlineUsersFromServer () {
            this.$axios.get("/userInfo/findDeptOnline")
            .then(res => {
                this.postal.publish({
                    channel: 'web.fpms',
                    topic: 'online_users_data_is_update',
                    data: {
                        list: res.data,
                        type: 'get'
                    }
                });
            })
        },
        processCellHandle(data,code){//偏离点击
            
            if(data&&data[code]){
                this.$refs.ref_milepost.initMilepostNode(data[code])
            }
            
        },
        fightscroll(){//联动滚动，滚动事件
            let _this = this;
            let bottom = false
            var scrollFunc = function(ev) {
                let bodyLength = _this.tableData.length
                let trHeight = $(".scrollBox").find(".el-table__body-wrapper")[0].scrollHeight/bodyLength
                var e = ev||event
                var b= false
                if (e.wheelDelta) {  //判断浏览器IE，谷歌滑轮事件
                    b = e.wheelDelta>0?true:false
                } else if (e.detail) {  //Firefox滑轮事件
                    b= e.detail<0?true:false
                }
                if(b){//向上滚动
                    _this.scrollTopIndex-=5
                    if(_this.scrollTopIndex<=0){
                        _this.scrollTopIndex = 0
                    }
                }else{//向下滚动
                    _this.scrollTopIndex+=5
                    if(_this.scrollTopIndex+_this.loadBodyNum>=bodyLength){
                        _this.scrollTopIndex=bodyLength-_this.loadBodyNum+1
                        bottom = true
                    }
                }

                $(".el-table__body-wrapper").scrollTop(0)
                $(".el-table__fixed-body-wrapper").scrollTop(0)

                $(".scrollBox").find(".el-table__body-wrapper").scrollTop(trHeight*_this.scrollTopIndex)
                
            } 
            if ($(".filght_container")[0].addEventListener) {
                $(".filght_container")[0].addEventListener('DOMMouseScroll', scrollFunc, false);
            }
            $(".filght_container")[0].onmousewheel = scrollFunc;//IE/Opera/Chrome


            $(".scrollBox").find(".el-table__body-wrapper").scroll(function(e){//拖动滚动条
                let bodyLength = _this.tableData.length
                let trHeight = $(".scrollBox").find(".el-table__body-wrapper")[0].scrollHeight/bodyLength
                let toplen = $(".scrollBox").find(".el-table__body-wrapper").scrollTop();

                if(bottom){
                    _this.scrollTopIndex = Math.floor(toplen/trHeight)+1
                    bottom=false
                }else{
                    _this.scrollTopIndex = Math.floor(toplen/trHeight)
                }
                _this.showTableData = _this.tableData.slice(_this.scrollTopIndex,_this.loadBodyNum+_this.scrollTopIndex)
            })
        },
        filterByMsg(searchSel,searchStr,filghtLists,type){//搜索逻辑
        console.log(filghtLists)
            if(!searchStr&&type=="search"){//为空时显示全部
                this.area = "国内"
                this.flightIndicatorList = null
                this.filghtTypeValue = ""
                this.filghtTpyeList = null
                this.searchStr=""
                this.showTableData = this.flight_body.slice(0,this.loadBodyNum)
                this.tableData = this.flight_body
                this.scrollTopIndex = 0
                $(".scrollBox").find(".el-table__body-wrapper").scrollTop(0)
                return false
            }
            let searchStrArr = []
            let filterArr  = []
            if(!searchSel){//全部搜索
                searchStrArr = ["flightNo","aircraftNo","seat","flightExtra.gate"]
            }else{//选择搜索
                searchStrArr = [searchSel]
            }
            // searchStrArr.map(arr=>{
            //     let a = _.filter(filghtLists,function(list){
            //         let searchArr = searchStr.toString().split("，")
            //         return _.find(searchArr,function(searchStr){
            //             let value = _.get(list,arr) || null
            //             return value&&value.toString().includes(searchStr)&&!_.find(filterArr,{flightId:list.flightId})
            //         })
            //     })
            //     filterArr = _.concat(filterArr,a)
            // })
            let searchArr = searchStr.toString().split("，")
            filghtLists.map(list=>{
                let a = _.filter(searchStrArr,arr=>{
                    return  _.find(searchArr,searchStr=>{
                        let value = _.get(list,arr) || null
                        return value&&value.toString().includes(searchStr)&&!_.find(filterArr,{flightId:list.flightId})
                    })
                })
                if(a.length>0){
                    filterArr = _.concat(filterArr,list)
                }
            })
            this.tableData = filterArr
            this.showTableData = filterArr.slice(0,this.loadBodyNum) //初始显示数据
            this.scrollTopIndex = 0
            $(".scrollBox").find(".el-table__body-wrapper").scrollTop(0)
            if(type == "flightIndicator"){
                this.flightIndicatorList = filterArr
                this.filghtTypeValue = ""
                this.filghtTpyeList = null
                this.searchStr=""
            }
            if(type == "filghtTpye"){
                this.filghtTpyeList = filterArr
            }
        },
        search(){//信息搜索
            this.filterByMsg(this.searchSel,this.searchStr,this.filghtTpyeList||this.flightIndicatorList||this.flight_body,"search")
        },
        fight_type_change(){//类型搜索
            this.filterByMsg('flightType',this.filghtTypeValue,this.flightIndicatorList||this.flight_body,'filghtTpye')
        },
        area_change(val){//国内国际radio
            let filterMsg = null
            if(val=="国内"){//D,M
                filterMsg = "D，M"
            }else{//I,R
                filterMsg = "I，R"
            }
            this.filterByMsg('flightIndicator',filterMsg,this.flight_body,'flightIndicator')
        },
        locked_head(index,locked,type){//锁定
            if(type=="filght"){
                var data = this.tableGroupItem[index]
                data.flightNodeConfig.show = locked
                this.postal.publish({
                    channel:'worker.fpms',
                    topic:'flight_schedule_header_data_is_update',
                    data:data
                })
            }
            if(type=="process"){
                var data = this.tableProcessItem[index]
                data.processNodeConfig.show = locked
                this.postal.publish({
                    channel:'worker.fpms',
                    topic:'process_schedule_header_data_is_update',
                    data:data
                })
            }
            
        },
        

        seniorSearch(){//高级查询
            this.$refs.ref_search.nodeDialogShow=true
        },
        openLayerMilepost(type){
            if(type==0){
            
                this.$refs.ref_setMilepost.init(this.tableProcessItem, this.processShowLists);
              
                // this.$refs.ref_milepost.initHandWarn()
            }
            if(type==1){
                this.$refs.ref_milepost.initEnsureDispatch();
            }
            if(type==2){
                this.$refs.ref_milepost.initMilepostNode();
            }
        },  
        realPx(px){//获取真实px
            let lealpx = px
            let bili = Number(_.split($("html")[0].style.fontSize,"p")[0])/100
            
            lealpx = px*bili
            return lealpx
        },
        scaleHandle(type){//左右滑动点击
            if(this.scaleType!="mid"){
                if(this.scaleType!=type){
                    this.scaleType="mid"
                    this.filghtTableBoxStyle = "width:60%;"
                    this.filghtProcessBoxStyle = "width:calc(40% - 1.8rem)"
                }
            }else{
                if(type=="left"){
                    this.scaleType="left"
                    this.filghtTableBoxStyle = "width:15%;"
                    this.filghtProcessBoxStyle = "width:calc(85% - 1.8rem)"
                }
                if(type=="right"){
                    this.scaleType="right"
                    this.filghtTableBoxStyle = "width:85%;"
                    this.filghtProcessBoxStyle = "width:calc(15% - 1.8rem)"
                }
            }

            
        },
        //页面加载
        
        getCodeValue(lists,code,key){//进程时间
            if(!lists)return "--"
            let list = lists[code]
            if(!list)return "--"
            let result = list[key]
            if(!result)return "--"
            return this.getTimeByFormat(result,"hh:mm")
        },
        getSetButtonShow(){//设置按钮权限
            let menus = this.userData.menus || []
            menus.map(list=>{
                if(list.code=='business_config'){
                    this.business_config = true
                }
                if(list.code=='department_config'){
                    this.department_config = true
                }
            })
        },
        getbodyHeadWidth(data){//td的宽度
            let width = this.realPx(60+data.name.length*18)
            if(data.code=="flightExtra.route"){
                width = 100
            }


            return width
        },
        getTextClass(code){
            let className = null
            switch (code) {
                case 'eta':
                case 'sta':
                case 'aircraftType':
                case 'aircraftNo':
                case 'successionFlightNo':
                    className = 'oneR'
                    break;
            
                default:
                    break;
            }
            return className
        },
        getTextStyle(){
            let style =null
            return style   
        },
        getText(row,code){
            let text = _.get(row,code) || "--"
            var reDateTime = /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1])) (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
            var isDateTime = reDateTime.test(text)
            if(isDateTime){//为时间
                text = this.getTimeByFormat(text,"hh:mm(DD)")
            }

            if(code=='flightNo'){
                text = this.getfFilghtNo(row)
            }
            if(code=='flightType'){
                text = this.getNameByfilghtType(row.flightType)
            }

            return text
        },
        getNameByfilghtType(flightType){
            let list = _.find(this.getFilghtTpye,{'type':flightType})
            return list.name
        },
        getFilghtLine(row,code){
            let value = _.get(row,code)
            
            let result = ['--','--']
            if(!value){
               return result
            }
            let arr = JSON.parse(value)
            let idx = _.indexOf(arr,"CTU")
            let arr1 = arr.slice(0,idx)
            let arr2 = arr.slice(idx+1,arr.length)

            if(arr1.length==1){
                result[0]=arr1[0]+"-CTU"
            }
            if(arr1.length>1){
                result[0]=arr1[0]+"-...-CTU"
            }
            if(arr2.length==1){
                result[1]="CTU-"+arr2[0]
            }
            if(arr2.length>1){
                result[1]="CTU-...-"+arr2[0]
            }
            return result
        },
        filghtLineName(row){
            
            let flightExtra = row.flightExtra
            let html = ``
            let route = flightExtra.route
            let routeName = flightExtra.routeName
            if(route&&routeName){
                route = JSON.parse(route)
                routeName = JSON.parse(routeName)

                 route.forEach((list,index)=>{
                    if(index==route.length-1){
                        html+=`<div class="flexDCC"><div>${list}</div><div>${routeName[index]}</div></div>`
                    }else{
                        html+=`<div class="flexDCC"><div>${list}</div><div>${routeName[index]}</div></div><div class="filghtImg"></div>`

                    }
                })
            }
            return html

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
        getProcessCellClass(processObj,code){
            let className = ""
            if(!processObj){
                return className
            }
            let processList = processObj[code]
            
            if(processList&&processList.deviationReportList){
                className+="bodyCell_p"
            }

            if(true){
                // className+="timeout"//超时完成
                // className+="delay"//超时未完成
            }
            

            return className

        },
        hasDeviationReportList(data,code){//是否偏离
            let list = _.find(data, { 'processCode': code})||{}
            return list.deviationReportList&&list.deviationReportList.length>0?true:false
        },
    },
}
</script>
<style lang="scss" scoped>
#filghtControl{background:rgba(238,238,238,1);height: 100%;position: relative;;
    .titleButtonBox{height: 50px;display: flex;background: #fff;padding: 0 10px;justify-content: space-between;;
        .signFilterBox{display:flex;justify-content:center;align-items: center;height: 50px;;
            li{display: flex;justify-content:center;align-items: center;height: 100%;margin: 0 10px;cursor: pointer;;
                .filterName{color: #666;}
                .filterBage{height:18px;;background: #bebebe;border-radius:9px;font-size: 12px;display: flex;align-items: center;color: #fff;padding:0 6px;margin-left: 5px;line-height:18px;;}
            }
            li.active{border-bottom: 2px solid #409EFF;;
                .filterName{color:#409EFF;}
                .filterBage{background:#409EFF;}
            }
        }
        .groupButtonBox{display:flex;justify-content:center;align-items: center;
            &>div{height: 40px;margin-right:10px ;}
        }
    }
    .filght_container{display:flex;height: calc(100% - .9rem);

    }
    .openCloseBox{width:30px;border: 1px solid #EBEEF5;;
        .headbox{width:30px;height: 40px;background: #3A3F43;}
        .bodybox{height: calc(100% - 34px);background:#3A3F43;position: relative;
            .rightbox{width: 80%;background:rgb(159, 187, 218);right: 0;height: 100%;position: absolute;}
            .leftbox1{width: 60%;background: #3A3F43;height:50%;position: absolute;left: 20%;z-index: 100;bottom: 0;}
            .leftbox2{width:0;height:0;border-right:18px solid transparent;border-bottom:18px solid #3A3F43;position: absolute;top:calc(50% - 18px);left: 20%;}
            // &>div{height: 100%;display: flex;justify-content:space-around;align-items: center;flex: 1;cursor: pointer;flex-direction: column;;}

        }
    }

}

</style>
<style lang="scss">
.el-table__fixed{height: calc(100% - 20px)!important;}
// .el-table__fixed-body-wrapper{height: calc(100% - 56px)!important;}
.filghtLinePopover{
    .filghtLinePopover_title{height:30px;background: #3D568E;color:#fff;text-align: center;line-height:30px;border-radius: 5px 5px 0 0;}
    .filghtLinePopover_content{height:80px;background: #fff;display: flex;align-items: center;padding:0 15px;;
        .filghtImg{height:80px;width:80px;background-image:url('../assets/img/feiji.png') ;background-size:100% 100% ;margin: 0 10px;}
    }
}
#filghtControl{
    .titleButtonBox{
        .groupButtonBox{
            .el-select{width: 150px;}
            .el-input-group__prepend{background-color: #fff;padding: 0;
                .el-select{margin: 0;width:100px;}
            }
            .el-input-group__append{background-color: #fff;}
            .el-button{height: 40px;padding: 0 10px;;
                i{font-size: 18px;}
            }
            .el-button + .el-button{margin-left:0;}
        }
    }
    

    .filghtTableBox,.openCloseBox,.filghtProcessBox,.filghtOptinBox,.scrollBox{transition-property:width;transition-duration:1s;overflow: hidden;;
        & *{overflow-y: hidden;}
        // .el-table,.el-table *{background: none;}
        .filght_thead_tr{height:40px;background: #3A3F43;
            th{padding: 0;background: #3A3F43;
                .cell{color:#fff;background: #3A3F43;text-align: center;line-height:40px;height: 100%;white-space:nowrap;}
            }
        }
        .el-table>.el-table__body-wrapper{overflow-x: scroll;overflow-y: hidden;}
        .filght_thead_tr{
            // .headCell{i{margin-right: 8px;}}
        }
        .filght_body_tr{height:80px;
            td{overflow: hidden;background:#eee;padding: 3px 0;;
                .cell{height:74px;display: flex;justify-content: center;align-items: center;white-space:nowrap;border: 1px solid transparent;width: 100%!important;padding: 0;;
                    .bodyCell{height:100%;width: 100%;;display: flex;justify-content: center;align-items: center;transition-property:all;transition-duration:1.5s;
                        .wrapBox{display:flex;flex-direction: column;justify-content: center;height: 100%;;
                            //标记
                            .filght_mark{width:24px;height: 24px;background: #C5C5C5;font-size: 12px;color: #fff;}
                            .filght_mark:nth-child(1).active{background: #FF0808;}
                            .filght_mark:nth-child(2).active{background: #2B9758;}
                            .filght_mark:nth-child(3).active{background: #FF9B00;}
                            .filght_mark:nth-child(4).active{background: #0067FF;}
                            //到达时间
                            .filght_arriveTime{display: flex;justify-content: center;align-items: center;padding:2px 0;;
                                img{width: 20px;height: 20px;margin-right:3px;}
                            }
                            .proess_time{text-align: center;font-size: 14px;}
                            .proess_time:nth-child(1){
                                    color:#666;
                            }
                            .proess_time:nth-child(2){
                                    color:#666;
                            }
                            .proess_time:nth-last-child(1){
                                    color:#3D568E;
                            }
                        }
                        .filght_mark_box{width:54px;height: 54px;display: flex;flex-direction: inherit;;justify-content: space-between;flex-wrap: wrap;align-items: center;}
                        .filght_option{display: flex;justify-content: center;align-items: center;background: #fff!important;height: 100%;width: 100%;;
                            .iconBox{display: flex;justify-content: center;align-items: center;height: 26px;width: 26px;border-radius:2px;border:1px solid rgba(216,216,216,1);margin: 0 4px;cursor: pointer;;
                                img{width: 20px;height: 20px;margin-right:3px;}
                            }
                            .el-badge .el-badge__content{background: red;}

                        }
                    }


                    .bodyCell.transClass{background-color:red!important;}
                    .bodyCell.TOP{background-color:rgba(105,190,255,.25);}//置顶
                    .bodyCell.DELAY{background-color:rgba(226, 60, 19, 0.25);}//延误
                    .bodyCell.DROP_OFF_COMPLETED{background-color:rgba(154,117,237,.25);}//下客完成
                    .bodyCell.DROP_OFF_NOT_COMPLETED{background-color:rgba(223,167,42,.25);}//下客未完成
                    .bodyCell.ETA{background-color:rgba(105,190,141,.25);}//预达
                    // .bodyCell.CONTROL_AND_CONTROL{background-color:rgba(17, 218, 184, 0.25);}//管控

                    
                    // .bodyCell.POST_TREATMENT{background-color:rgba(105,190,255,.25);}
                    .bodyCell_p:after{
                        text-align: center;
                        line-height:24px;
                        color: #fff;
                        background-color: #cb0000;
                        content: "\504F";
                        position: absolute;
                        right: 0px;
                        top:0px;
                        width: 40px;
                        height:40px;
                        font-size:14px;
                        -webkit-clip-path: polygon(50% 0,0 50%,100% 50%);
                        clip-path: polygon(50% 0,0 50%,100% 50%);
                        -webkit-transform: rotate(45deg);
                        transform: rotate(45deg);
                        font-weight: 800;
                    }   
                    
                }
            }
        }
    }
    .filghtTableBox{width: 60%; 
        .cell{
            .bodyCell{background-color:#fff;}
        }
    }
    .filghtOptinBox{width:130px;
        .el-badge{overflow:initial;}
    }
    .openCloseBox{
        .filght_body_tr{
            td{background:#000;
                .cell{background:#000;}
            }
        }
    }
    .scrollBox{width:20px;
        .el-table>.el-table__body-wrapper{overflow-x: hidden;overflow-y: scroll;}
    }
    .filghtProcessBox{width:calc(40% - 180px);
        td{background: #fff!important;}
        .cell{
            .bodyCell{background-color:rgba(227,234,242,1);cursor: pointer;}
            .bodyCell.delay{background-color: #ff9da2;}
            .bodyCell.timeout{background-color: #ffde72;}



        }
    
    }
    
}   
</style>