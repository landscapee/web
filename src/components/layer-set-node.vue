<template>
<div id="layer_set_node"> 
    <el-dialog :visible.sync="nodeDialogShow" class="nodeDialog" :show-close="false" center width="840px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">{{nodeName}}</div>
            <div class="blankDiv"></div>
            <!-- <el-button round size="mini" @click="addProcessNode">增加节点</el-button> -->
        </template>
        <el-table class="dialogTable" stripe :data="gridData" border row-class-name="layerTableRow" cell-class-name="layerTableCol" header-row-class-name="layerTableHeadRow" header-cell-class-name="layerTableHeadCol">
            <el-table-column type="index" :index="getIndex" label="序号" width="80"></el-table-column>
            <el-table-column :property="item.name" :label="item.label" v-for="(item,idx) in colNameLists" :key="idx"></el-table-column>
            <template v-if="nodeIng=='process'||nodeIng=='trends'">
                <el-table-column label="默认显示" width="120">
                    <template slot-scope="scope">
                        <template v-if="nodeIng=='process'">
                            <el-checkbox :value="scope.row.processNodeConfig&&scope.row.processNodeConfig.show==1?true:false"  :name="scope.row.id"  @change="nodeEnableHandle(scope,$event,'show')"></el-checkbox>
                        </template>
                        <template v-if="nodeIng=='trends'">
                            <el-checkbox :value="scope.row.flightNodeConfig&&scope.row.flightNodeConfig.show==1?true:false"  :name="scope.row.id"  @change="nodeEnableHandle(scope,$event,'show')"></el-checkbox>
                        </template>
                    </template>
                </el-table-column>
            </template>
            <el-table-column label="启用模式" width="120" >
                <template slot-scope="scope">
                    <template v-if="nodeIng=='process'">
                        <el-checkbox :value="scope.row.processNodeConfig&&scope.row.processNodeConfig.enable==1?true:false"  :name="scope.row.id"  @change="nodeEnableHandle(scope,$event,'enable')"></el-checkbox>
                    </template>
                    <template v-if="nodeIng=='trends'">
                        <el-checkbox :value="scope.row.flightNodeConfig&&scope.row.flightNodeConfig.enable==1?true:false"  :name="scope.row.id"  @change="nodeEnableHandle(scope,$event,'enable')"></el-checkbox>
                    </template>
                    <template v-if="nodeIng=='button'">
                        <el-checkbox :value="scope.row.checked==1?true:false"  @change="nodeEnableHandle(scope,$event,'button')"></el-checkbox>
                    </template>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="totalNum" :page-size="10"  @current-change="nodePageCB"></el-pagination>
        <div slot="footer" class="dialog-footer">
            <el-button @click="nodeDialogShow = false">取 消</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default{
	data(){
		return {
            nodeName:null,
            nodeDialogShow:false,
            sysLists:[
                {name:1,id:0},
                {name:2,id:2},
                {name:3,id:3},
                {name:4,id:4},
                {name:5,id:5},
            ],
            pageNum:1,
            totalNum:0,
            rowData:{},
            gridData:[],
            //用例按钮选择
            userButtonLists:[
                {id:0,name:'置顶',checked:0},
                {id:0,name:'关闭/开启席位',checked:0},
                {id:0,name:'调度干预',checked:0},
            ],
            nodeIng:null
		}
	},
	props: ["colNameLists"],
	mounted () {
        

	},
	watch: {
        colNameLists:function(val){
            console.log(val)
        }
	},
	methods:{
        getIndex(index){
            return index+1+(this.pageNum-1)*10
        },
        nodeEnableHandle(data,enable,type){
            let row = data.row
            switch (this.nodeIng) {
                case "process"://进程节点
                    if(row.processNodeConfig){//更新修改
                        let data = {
                            id:row.processNodeConfig.id,
                            code:row.processNodeConfig.code,
                            planConfigId:this.rowData.id
                        }
                        data[type]=enable?1:0
                        this.$axios.post("/processNodeConfig/update",data)
                        .then(res=>{
                            this.getProcessNode()
                        })
                    }else{//新增
                        let data = {
                            code:row.code,
                            planConfigId:this.rowData.id
                        }
                        data[type]=enable?1:0
                        this.$axios.post("/processNodeConfig/save",data)
                        .then(res=>{
                            this.getProcessNode()
                        })
                    }
                    break;
                case "trends"://航班动态点
                    if(row.flightNodeConfig){//更新修改
                        let data = {
                            id:row.flightNodeConfig.id,
                            code:row.flightNodeConfig.code,
                            planConfigId:this.rowData.id
                        }
                        data[type]=enable?1:0
                        this.$axios.post("/flightNodeConfig/update",data)
                        .then(res=>{
                            this.getTrendsNode()
                        })
                    }else{//新增
                        let data = {
                            code:row.code,
                            planConfigId:this.rowData.id
                        }
                        data[type]=enable?1:0
                        this.$axios.post("/flightNodeConfig/save",data)
                        .then(res=>{
                            this.getTrendsNode()
                        })
                    }
                    break;
                
                    
                default:
                    break;
            }
        },

        nodePageCB(pageNum){
            this.pageNum = pageNum
            switch (this.nodeIng) {
                case "process":
                    this.getProcessNode()
                    break;
                case "trends":
                    this.getTrendsNode()
                    break;
                default:
                    break;
            }
            
        },
        initProcess(data){
            this.nodeIng = "process"
            this.rowData = data
            this.getProcessNode()
        },
        getProcessNode(){
            this.$axios.get("/process/findAllByPlanConfigId",{
                params:{
                    planConfigId:this.rowData.id,
                    businessPlanConfigId:this.rowData.planId
                }
            })
            .then((res)=>{
                this.totalNum = (res.data || []).length
                this.nodeList = _.chunk(res.data || [],10)
                this.gridData = this.nodeList[this.pageNum-1]
            })
        },
        initButton(data){
            this.nodeIng = "button"
            this.rowData = data
            this.gridData = this.userButtonLists
        },
        initTrends(data){
            this.nodeIng = "trends"
            this.rowData = data
            this.getTrendsNode()
        },
        getTrendsNode(){
            this.$axios.get("/flightNode/findAllByPlanConfigId",{
                params:{
                    planConfigId:this.rowData.id
                }
            })
            .then((res)=>{

                this.totalNum = (res.data || []).length
                this.nodeList = _.chunk(res.data || [],10)
                this.gridData = this.nodeList[this.pageNum-1]
                console.log(this.gridData)
            })
        }
	}
}
</script>

<style lang="scss" scoped>
    #layer_set_step2{
        .addbutton{text-align: right;margin-bottom:15px;
            .el-button{padding: .1rem .2rem;}
        }
    }
</style>
