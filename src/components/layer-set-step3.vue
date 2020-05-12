<template>
<div id="layer_set_step3">
    <el-dialog :visible.sync="nodeDialogShow" class="stepDialog" :show-close="false" center width="900px" :append-to-body="true">
        <template slot="title">
            <div class="el-dialog_header_step">部门方案设置</div>
        </template>
        <div class="addPlanButton">
            <el-button round @click="addPlan" size="small">
                <i class="el-icon-plus"></i>
                增加部门方案
            </el-button>
        </div>
        <el-table class="dialogTable" stripe :data="gridData" border row-class-name="layerTableRow" cell-class-name="layerTableCol" header-row-class-name="layerTableHeadRow" header-cell-class-name="layerTableHeadCol">
            <el-table-column property="name" label="部门方案"></el-table-column>
            <el-table-column label="授权部门">
                <template slot-scope="scope">
                    <el-cascader v-model="scope.row.deptId" :options="userOffice" :show-all-levels="false" :props="userOfficeProps" clearable @change="change_office(scope)"></el-cascader>
                </template>
            </el-table-column>
            <el-table-column label="监控类型">
                <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="controlNameHandel">
                        <span class="el-dropdown-link">
                            {{getControlName(scope.row.type)}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in controlTypeList" :key="item.type" :command="{data:item,scope:scope}">
                                {{item.name}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column property="address" label="是否席位配置" width="90">
                 <template slot-scope="scope">
                    <el-checkbox :value="scope.row.seatFlag==1?true:false" @change="seatEnableHandle(scope,$event)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label="系统模式">
                <template slot-scope="scope">
                    <el-dropdown trigger="click" @command="sysNameHandel">
                        <span class="el-dropdown-link">
                            {{getSysName(scope.row.sysId)}}
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item v-for="item in sysLists" :key="item.id" :command="{data:item,scope:scope}">
                                {{item.name}}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column property="address" label="是否启用方案" width="90">
                <template slot-scope="scope">
                    <el-checkbox :name="scope.row.sysId" :value="scope.row.enable==1?true:false" @change="sysEnableHandle(scope,$event)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="选择"  width="180">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="setPlan(scope)" title="方案选择">
                        <!-- <icon-svg iconClass="xuanze" iconColor="#333"/> -->
                        <i class="el-icon-finished" style="cursor:pointer;color:#333;"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="setFlight(scope)" title="航班动态点选择">
                        <icon-svg iconClass="feiji" iconColor="#333"/>
                    </el-button>
                    <el-button type="text" size="small" @click="setProcessNode(scope)" title="监控进程节点选择">
                        <icon-svg iconClass="fenxi" iconColor="#333"/>
                    </el-button>
                    <el-dropdown style="margin-left:.1rem;" trigger="click"  @command="optionComand">
                        <span class="el-dropdown-link" title="更多">
                            <i class="el-icon-more el-icon--right" style="cursor:pointer;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{command:0,scope:scope}"><icon-svg iconClass="qizi" iconColor="#3D568E"/>&nbsp;&nbsp;里程碑节点选择</el-dropdown-item>
                            <el-dropdown-item :command="{command:1,scope:scope}"><icon-svg iconClass="qukuaihuafen" iconColor="#3D568E"/>&nbsp;&nbsp;用例按钮选择</el-dropdown-item>
                            <el-dropdown-item :command="{command:2,scope:scope}"><i class="el-icon-edit" style="color:#3D568E;"></i>&nbsp;&nbsp;修改该方案</el-dropdown-item>
                            <el-dropdown-item :command="{command:3,scope:scope}"><i class="el-icon-delete" style="color:#3D568E;"></i>&nbsp;&nbsp;删除该方案</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination background layout="prev, pager, next" :total="totalNum" @current-change="planPageCB"></el-pagination>

        <div slot="footer" class="dialog-footer">
            <el-button @click="nodeDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="openStep2" v-if="config.business_config">上一步</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="addPlanDialogShow" class="nodeDialog" :show-close="false" center width="400px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">增加部门方案</div>
            <div class="blankDiv"></div>
        </template>
        <el-form label-position="right" label-width="100px" :model="planData" :rules="rules" ref="planData">
            <el-form-item label="部门方案" prop="name">
                <el-input v-model="planData.name" placeholder="部门方案"></el-input>
            </el-form-item>
            <el-form-item label="方案编码" prop="code">
                <el-input v-model="planData.code" placeholder="方案编码"></el-input>
            </el-form-item>
            <el-form-item   label="授权部门">
                <el-cascader v-model="planData.deptId" :options="userOffice" :show-all-levels="false" :props="userOfficeProps" clearable></el-cascader>
            </el-form-item>
            <el-form-item label="监控类型" prop="type">
                <el-select v-model="planData.type" placeholder="监控类型">
                    <el-option :label="item.name" :value="item.type" v-for="item in controlTypeList" :key="item.type"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="配置席位">
                <el-radio v-model="planData.seatFlag" label="1">是</el-radio>
                <el-radio v-model="planData.seatFlag" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="系统模式" prop="sysId">
                <el-select v-model="planData.sysId" placeholder="选择系统">
                    <el-option :label="item.name" :value="item.id" v-for="item in sysLists" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用">
                <el-radio v-model="planData.enable" label="1">是</el-radio>
                <el-radio v-model="planData.enable" label="0">否</el-radio>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addPlanDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="savePlan('planData')">确 定</el-button>
        </div>

    </el-dialog>
</div>
</template>
<script>
let id = 0;
export default{
	data(){
        var validateName = (rule, value, callback) => {
            if (value === '' || value === null) {
                callback(new Error('该值不能为空'));
            } else {
                callback();
            }
        };
		return {
            nodeDialogShow:false,
            dialogName:null,
            sysLists:[],
            userOffice:[],
            userOfficeProps:{
                value:'id',
                label:"name",
                // multiple:true
            },
            planPageNum:1,
            planPageSize:10,
            totalNum:0,
            gridData:[],
            controlTypeList:[
                {name:"监控",type:'monitor'},
                {name:"里程碑",type:'milestone'},

            ],
            addPlanDialogShow:false,
            planData:{
                name:'',
                code:'',
                deptId:'',
                type:'',
                seatFlag:'0',
                sysId:'',
                sysCode:'',
                enable:'0',
                model:"department",
                deleteFlag:0,
            },
            rules: {
                name: [{ validator: validateName, trigger: 'blur' }],
                type:[{ validator: validateName, trigger: 'blur' }],
                code: [{ validator: validateName, trigger: 'blur' }],
                sysId: [{ validator: validateName, trigger: 'blur' }],
            },
		}
    },
    props: ["config"],
    beforeMount () {
        
    },
	mounted () {

	},
	watch: {
        'planData.sysId':function(val){
            if(!val)return
            let arr = _.filter(this.sysLists,function(list){
                return list.id == val
            })
            this.planData.sysCode = arr[0].code
        }
	},
	methods:{
        
        optionComand(data){
            switch (Number(data.command)) {
                case 0:
                    this.setMilepost(data.scope)
                    break;
                case 1:
                    this.setButton(data.scope)
                    break;
                case 2:
                    this.editPlan(data.scope)
                    break;
                case 3:
                    this.delPlan(data.scope)
                    break;
            }
        },
        getSystem(){//获取系统列表
            this.$axios.get("/system/find")
            .then((res)=>{
                this.sysLists = res.data || []
            })
        },
        getSysName(sysId){//匹配系统下拉名称
            let name = null
            let list = _.filter(this.sysLists,function(list){
                return list.id==sysId
            })
            return list[0]?list[0].name:''
        },
        
        getControlName(type){//匹配监控类型下拉名称
            let name = null
            let list = _.filter(this.controlTypeList,function(list){
                return list.type==type
            })
            return list[0]?list[0].name:''
        },
        change_office(scope){//部门人员改变，保存
            if(_.isArray(scope.row.deptId)){
                scope.row.deptId = _.join(tscope.row.deptId,",")
            }
            this.gridData[scope.$index].deptId=scope.row.deptId
            let data = this.gridData[scope.$index]
            this.$axios.post("/planConfig/update",data)
        },
        sysNameHandel(command) {//下拉系统列表选择,并保存
            this.gridData[command.scope.$index].sysId=command.data.id
            this.gridData[command.scope.$index].model="department"
            let data = this.gridData[command.scope.$index]
            this.$axios.post("/planConfig/update",data)
        },
        controlNameHandel(command){//监控类型
            this.gridData[command.scope.$index].type=command.data.type
            this.gridData[command.scope.$index].model="department"
            let data = this.gridData[command.scope.$index]
            this.$axios.post("/planConfig/update",data)
        },
        sysEnableHandle(scope,enable){//是否启用,并保存
            this.gridData[scope.$index].enable=enable?1:0
            this.gridData[scope.$index].model="department"
            let data = this.gridData[scope.$index]
            this.$axios.post("/planConfig/update",data)
        },
        seatEnableHandle(scope,enable){//席位配置
            this.gridData[scope.$index].seatFlag=enable?1:0
            this.gridData[scope.$index].model="department"
            let data = this.gridData[scope.$index]
            this.$axios.post("/planConfig/update",data)
        },
        getConfig(){//获取方案列表
            // let sysIds = _.join(this.$store.getters.getUserMsg.sysIds, ',');
            this.$axios.get("/planConfig/query",{
                params:{
                    pageNum:this.planPageNum,
                    pageSize:this.planPageSize,
                    model:"department"
                }
            })
            .then((res)=>{
                if(res.data){
                    this.totalNum = res.data.totalNum
                    this.gridData = res.data.items || []
                }
            })
        },
        loadOfficeRoot(){
            let orgId =  this.$store.getters.getUserMsg.orgId
            this.$axios.get("/sys/department/getDepartmentByOrgId",{
                params:{orgId}
            })
            .then((res)=>{
                this.userOffice=res.data
            })  
        },
        loadOfficeChild(){

        },
        planPageCB(pageNum){
            this.planPageNum = pageNum
            this.getConfig()
        },
        addPlan(){//新增方案
            this.addPlaning = true
            this.planData={
                name:'',
                code:'',
                deptId:'',
                type:'',
                seatFlag:'0',
                sysId:'',
                sysCode:'',
                enable:'0',
                model:"department",
                deleteFlag:0,
            },
            this.addPlanDialogShow = true
        },
        editPlan(data){//修改方案
            this.addPlaning = false
            let row  = data.row
            row.enable = row.enable.toString()
            row.seatFlag = row.seatFlag.toString()
            row.model= "department"
            this.planData = row
            this.addPlanDialogShow = true
        },
        saveEditPlan(planData){//新增保存
            if(_.isArray(this.planData.deptId)){
                this.planData.deptId = _.join(this.planData.deptId,",")
            }
            this.$refs[planData].validate((valid) => {
                if (valid) {
                    this.$axios.post("/planConfig/update",this.planData)
                    .then((res)=>{
                        this.addPlanDialogShow=false
                        this.planPageCB(1)
                        this.$alert(res.msg, '提示', {
                            type: 'success',
                            center: true
                        })
                    })
                } else {
                    this.$alert("修改数据不符合要求", '提示', {
                        type: 'error',
                        center: true
                    })
                    return false;
                }
            });
        },
        savePlan(planData){//新增和修改保存
            if(this.addPlaning){
                this.saveAddPlan(planData)
            }else{
                this.saveEditPlan(planData)
            }
        },
        saveAddPlan(planData){//新增保存
            if(_.isArray(this.planData.deptId)){
                this.planData.deptId = _.join(this.planData.deptId,",")
            }
            this.$refs[planData].validate((valid) => {
                if (valid) {
                    this.$axios.post("/planConfig/save",this.planData)
                    .then((res)=>{
                        this.addPlanDialogShow=false
                        this.planPageCB(1)
                        this.$alert(res.msg, '提示', {
                            type: 'success',
                            center: true
                        })

                    })
                } else {
                    this.$alert("新增数据不符合要求", '提示', {
                        type: 'error',
                        center: true
                    })
                    return false;
                }
            });
        },
        
        delPlan(data){//删除方案
            this.$confirm('确定删除该方案?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let params = [{"id":data.row.id}]
                this.$axios.delete("/planConfig/batchDelete",{
                    data:params
                })
                .then((res)=>{
                    this.planPageCB(this.pageNum)
                    this.$alert(res.msg, '提示', {
                        type: 'success',
                        center: true
                    })
                })
            })
        },
        openStep2(){
            this.nodeDialogShow=false
            this.$emit("openStep2")
        },
        setPlan(data){
            this.$emit("setPlan",data.row,this.userOffice)
        },
        setFlight(data){
           this.$emit("setFlight",data.row)
        },
        setProcessNode(data){
            this.$emit("setProcessNode",data.row)
        },
        setMilepost(data){
            this.$emit("setMilepost",data.row)
        },
        setButton(data){
            this.$emit("setButton",data.row)
        },
	}
}
</script>

<style lang="scss" scoped>
    .stepDialog{
        .addPlanButton{text-align: right;margin-bottom:15px;
    }
}
</style>
