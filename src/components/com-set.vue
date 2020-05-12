<template>
<div id="com_set">
    <el-button icon="el-icon-s-tools" @click="openSetStep"></el-button>
    <layer-set-step2 ref="ref_setStep2" :config="config" @openStep3="openSetStep3" @setFlight="setFlight" @setProcessNode="setProcessNode" @setMilepost="setMilepost"></layer-set-step2>
    <layer-set-step3 ref="ref_setStep3" :config="config" @openStep2="openSetStep2" @setPlan="setPlan" @setFlight="setFlight" @setProcessNode="setProcessNode" @setMilepost="setMilepost" @setButton="setButton"></layer-set-step3>
    <layer-set-node  ref="ref_setNode"  :colNameLists="colNameLists"></layer-set-node>
    <layer-set-plan  ref="ref_setnPlan"></layer-set-plan>
    <layer-set-milepost ref="ref_setMilepost"></layer-set-milepost>
</div>
</template>
<script>
export default{
	data(){
		return {
            colNameLists:[],
            gridData: [
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},
                {date: '2016-05-02',name: '王小虎',address: '上海市普陀区金沙江路 1518 弄'},

            ],
            //航班动态点
           flightLists:[
                {id:0,name:'标记'},
                {id:1,name:'类型'},
                {id:2,name:'航班号'},
                {id:3,name:'航线'},
                {id:4,name:'机型'},
                {id:5,name:'机号'},
                {id:6,name:'资源'},
                {id:7,name:'计划'},
                {id:8,name:'实际'},
                {id:9,name:'实际'},
            ],
            flightNameLists:[
                {name:"code",label:"动态点编码"},
                {name:"name",label:"航班监控动态点"},

            ],
            processNodeNameLists:[
                {name:"code",label:"进程节点编码"},
                {name:"name",label:"进程节点名称"},
            ],
            userButtonNameLists:[
                {name:"name",label:"按钮"}
            ]
		}
	},
    props: ['config'],
    components: {
        "layer-set-plan":r =>require.ensure([], () => r(require('./layer-set-plan')),"lay-setplan"),
		"layer-set-node":r =>require.ensure([], () => r(require('./layer-set-node')),"lay-setnode"),
		"layer-set-step2":r =>require.ensure([], () => r(require('./layer-set-step2')),"lay-setStep2"),
        "layer-set-step3":r =>require.ensure([], () => r(require('./layer-set-step3')),"lay-setStep3"),
		"layer-set-milepost":r =>require.ensure([], () => r(require('./layer-set-milepost')),"lay-setMilepost"),
    },
	mounted () {
        console.log(this.config)
	},
	watch: {

	},
	methods:{
        openSetStep(){
            if(this.config.business_config){
                this.openSetStep2()
                return false
            }
            if(this.config.department_config){
                this.openSetStep3()
            }
        },
        openSetStep2(){
            this.$refs.ref_setStep2.getSystem()
            this.$refs.ref_setStep2.getConfig()
            this.$refs.ref_setStep2.nodeDialogShow=true
        },
        openSetStep3(){
            this.$refs.ref_setStep3.getSystem()
            this.$refs.ref_setStep3.loadOfficeRoot()
            this.$refs.ref_setStep3.getConfig()
            this.$refs.ref_setStep3.nodeDialogShow=true
        },
        setPlan(data,office_data){
            this.$refs.ref_setnPlan.initPlan(data)
            this.$refs.ref_setnPlan.userOffice=office_data
            this.$refs.ref_setnPlan.nodeDialogShow=true
        },
        setFlight(data){
            this.colNameLists = this.flightNameLists
            this.$refs.ref_setNode.initTrends(data)
            this.$refs.ref_setNode.nodeName = "航班动态点配置"
            this.$refs.ref_setNode.nodeDialogShow=true
        },
        setProcessNode(data){
            this.colNameLists = this.processNodeNameLists
            this.$refs.ref_setNode.initProcess(data)
            this.$refs.ref_setNode.nodeName = "监控进程节点配置"
            this.$refs.ref_setNode.nodeDialogShow=true
        },
        setMilepost(data){
            this.$refs.ref_setMilepost.nodeDialogShow=true
        },
        setButton(data){
            this.colNameLists = this.userButtonNameLists
            this.$refs.ref_setNode.initButton(data)
            // this.gridData=this.userButtonLists
            this.$refs.ref_setNode.nodeName = "用例按钮配置"
            this.$refs.ref_setNode.nodeDialogShow=true
        }
	}
}
</script>

<style lang="scss" scoped>
#com_set{
    .setButtonBox{height:40px;width:40px;display: flex;justify-content: center;align-items: center;;}
}
</style>
