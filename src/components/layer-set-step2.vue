<template>
<div id="layer_set_step2">
    <el-dialog :visible.sync="nodeDialogShow" class="stepDialog" :show-close="false" center width="900px" :append-to-body="true">
        <template slot="title">
            <div class="el-dialog_header_step">业务模式配置</div>
        </template>
        <div class="addPlanButton" style="">
            <el-button round @click="addPlan" size="small">
                <i class="el-icon-plus"></i>
                增加模式
            </el-button>
        </div>
        <el-table class="dialogTable" stripe :data="gridData" border row-class-name="layerTableRow" cell-class-name="layerTableCol" header-row-class-name="layerTableHeadRow" header-cell-class-name="layerTableHeadCol">
            <el-table-column property="name" label="业务模式"></el-table-column>
            <el-table-column property="code" label="业务编码"></el-table-column>
            <el-table-column label="系统">
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
            <el-table-column property="enable" label="启用模式" width="60">
                <template slot-scope="scope">
                    <el-checkbox :name="scope.row.sysId" :value="scope.row.enable==1?true:false" @change="sysEnableHandle(scope,$event)"></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作"  width="140">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="setFlight(scope)" title="航班动态点选择">
                        <icon-svg iconClass="feiji" iconColor="#333"/>
                    </el-button>
                    <el-button type="text" size="small" @click="setProcessNode(scope)" title="监控进程节点选择">
                        <icon-svg iconClass="fenxi" iconColor="#333"/>
                    </el-button>
                    <el-dropdown style="margin-left:.1rem;" trigger="click" @command="optionComand">
                        <span class="el-dropdown-link" title="更多">
                            <i class="el-icon-more el-icon--right" style="cursor:pointer;"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown" >
                            <el-dropdown-item :command="{command:0,scope:scope}" @click="setMilepost(scope)"><icon-svg iconClass="qizi" iconColor="#3D568E"/>&nbsp;&nbsp;里程碑节点选择</el-dropdown-item>
                            <el-dropdown-item :command="{command:1,scope:scope}" @click="editPlan(scope)"><i class="el-icon-edit" style="color:#3D568E;"></i>&nbsp;&nbsp;修改该方案</el-dropdown-item>
                            <el-dropdown-item :command="{command:2,scope:scope}" @click="delPlan(scope)"><i class="el-icon-delete" style="color:#3D568E;"></i>&nbsp;&nbsp;删除该方案</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    <!-- <el-button type="text" size="small" @click="setMilepost(scope)" title="里程碑设置">
                        <icon-svg iconClass="qizi" iconColor="#3D568E"/>
                    </el-button>
                    <el-button type="text" size="small" @click="editPlan(scope)" title="修改该方案">
                        <i class="el-icon-edit" style="color:#3D568E;"></i>
                    </el-button>
                    <el-button type="text" size="small" @click="delPlan(scope)" title="删除该方案">
                        <i class="el-icon-delete" style="color:#3D568E;"></i>
                    </el-button> -->
                </template>
            </el-table-column>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="totalNum" :page-size="10" @current-change="planPageCB"></el-pagination>

        <div slot="footer" class="dialog-footer">
            <el-button @click="nodeDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="openStep3" v-if="config.department_config">下一步</el-button>
        </div>
    </el-dialog>
    <el-dialog :visible.sync="addPlanDialogShow" class="nodeDialog" :show-close="false" center width="400px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">增加动态点</div>
            <div class="blankDiv"></div>
        </template>
        <el-form label-position="right" label-width="90px" :model="planData" :rules="rules" ref="planData">
            <el-form-item  label="业务模式" prop="name">
                <el-input v-model="planData.name" placeholder="自定义业务模式名称"></el-input>
            </el-form-item>
            <el-form-item   label="业务编码" prop="code">
                <el-input v-model="planData.code" placeholder="自定义业务编码"></el-input>
            </el-form-item>
            <el-form-item label="系统" prop="sysId">
                <el-select v-model="planData.sysId" placeholder="选择系统">
                    <el-option :label="item.name" :value="item.id" v-for="item in sysLists" :key="item.id"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="是否启用" prop="enable">
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
            addPlanDialogShow:false,
            planData:{
                name:'',
                code:'',
                sysId:'',
                sysCode:'',
                enable:'0',
                model:"business",
                deleteFlag:0,
            },
            addPlaning:true,
            rules: {
                name: [
                    { validator: validateName, trigger: 'blur' }
                ],
                code: [
                    { validator: validateName, trigger: 'blur' }
                ],
                sysId: [
                    { validator: validateName, trigger: 'blur' }
                ],
                enable: [
                    { validator: validateName, trigger: 'blur' }
                ],
            },
            nodeDialogShow:false,
            sysLists:[],
            gridData:[],
            planPageNum:1,
            planPageSize:10,
            totalNum:0

		}
	},
	props: ["config"],
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
                    this.editPlan(data.scope)
                    break;
                case 2:
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
        planPageCB(pageNum){//分页回调
            this.planPageNum = pageNum
            this.getConfig()
        },
        getConfig(){//获取方案列表
            // let sysIds = _.join(this.$store.getters.getUserMsg.sysIds, ',');
            this.$axios.get("/planConfig/query",{
                params:{
                    pageNum:this.planPageNum,
                    pageSize:this.planPageSize,
                    model:"business"
                }
            })
            .then((res)=>{
                if(res.data){
                    this.totalNum = res.data.totalNum
                    this.gridData = res.data.items || []
                }
            })
        },
        getSysName(sysId){//匹配系统下拉名称
            let name = null
            let list = _.filter(this.sysLists,function(list){
                return list.id==sysId
            })
            return list[0]?list[0].name:''
        },
        sysNameHandel(command) {//下拉系统列表选择,并保存
            this.gridData[command.scope.$index].sysId=command.data.id
            this.gridData[command.scope.$index].sysCode=command.data.code
            this.gridData[command.scope.$index].model="business"
            let data = this.gridData[command.scope.$index]
            this.$axios.post("/planConfig/update",data)
        },

        sysEnableHandle(scope,enable){//是否启用,并保存
            this.gridData[scope.$index].enable=enable?1:0
            this.gridData[scope.$index].model="business"
            let data = this.gridData[scope.$index]
            this.$axios.post("/planConfig/update",data)
        },
        savePlan(planData){//新增和修改保存
            if(this.addPlaning){
                this.saveAddPlan(planData)
            }else{
                this.saveEditPlan(planData)
            }
        },
        addPlan(){//新增方案
            this.addPlaning = true
            this.planData = {
                name:'',
                code:'',
                sysId:'',
                sysCode:'',
                enable:'0',
                model:"business",
                deleteFlag:0,
            }
            this.addPlanDialogShow = true
        },
        saveAddPlan(planData){//新增保存
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
        editPlan(data){//修改方案
            this.addPlaning = false
            let row  = data.row
            row.enable = row.enable.toString()
            row.model= "business"
            this.planData = row
            this.addPlanDialogShow = true
        },
        saveEditPlan(planData){//新增保存
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
        setFlight(data){//航班动态点选择
           this.$emit("setFlight",data.row)
        },
        setProcessNode(data){//监控进程节点选择
            this.$emit("setProcessNode",data.row)
        },
        setMilepost(data){//里程碑设置
            this.$emit("setMilepost",data.row)
        },
        openStep3(){//下一步
            this.nodeDialogShow=false
            this.$emit("openStep3")
        },

	}
	
}
</script>

<style lang="scss" scoped>
.stepDialog{
    .addPlanButton{text-align: right;margin-bottom:15px;}
}
</style>
