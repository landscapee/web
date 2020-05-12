<template>
<div id="layer_set_plan"> 
    <el-dialog :visible.sync="nodeDialogShow" class="nodeDialog" :show-close="false" center width="400px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">选择需要复制的默认方案</div>
            <div class="blankDiv"></div>
        </template>
        <el-form label-position="right" label-width="90px" :model="planData">
            <el-form-item   label="部门方案名称">
                <el-input v-model="planData.name"></el-input>
            </el-form-item>
            <el-form-item label="启用方案">
                <el-select v-model="planData.planId" placeholder="选择方案">
                    <el-option :label="item.name" :value="item.id" v-for="(item,idx) in planList" :key="idx"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="授权部门">
                <!-- <el-select v-model="planData.deptId" placeholder="选择授权部门">
                    <el-option label="区域一" value="0"></el-option>
                    <el-option label="区域二" value="1"></el-option>
                </el-select> -->
                <el-cascader v-model="planData.deptId" :options="userOffice" :show-all-levels="false" :props="userOfficeProps" clearable></el-cascader>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="nodeDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="saveStepData">确 定</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
export default{
	data(){
		return {
            nodeDialogShow:false,
            planData:{
                name:"",
                planId:"",
                deptId:""
            },
            planList:[],
            userOffice:[],
            userOfficeProps:{
                value:'id',
                label:"name",
                // multiple:true
            },
		}
	},
	props: ["colNameLists"],
	mounted () {
        

	},
	watch: {

	},
    methods:{
        initPlan(data){
            this.rowData = data
            this.planData = {
                name:data.name,
                planId:data.planId,
                deptId:data.deptId
            }
            this.getConfig()
        },
        getConfig(){//获取方案列表
            this.$axios.get("/planConfig/query",{
                params:{
                    pageNum:1,
                    pageSize:20,
                    model:"business"
                }
            })
            .then((res)=>{
                if(res.data){
                //     this.totalNum = res.data.totalNum
                    this.planList = res.data.items || []
                }
            })
        },
        saveStepData(){
            let data = this.rowData
            data.name = this.planData.name
            data.planId = this.planData.planId
            data.deptId = this.planData.deptId
            if(_.isArray(this.planData.deptId)){
                this.planData.deptId = _.join(this.planData.deptId,",")
            }
            this.nodeDialogShow=false
            this.$axios.post("/planConfig/update",data)
        },
        getIndex(index){
            return index+1
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
