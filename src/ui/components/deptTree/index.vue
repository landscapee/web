<template lang="html">
	<el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
		<el-row>
			<el-col :span="12">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<div style="height:300px" v-loading="!data.length" >
							<Tree  :showCheckbox="true" @handleCheck="handleCheck" :checkedArrIdArr="deptSelectIdArr" :data="data" ref="tree"   :expand-on-click-node="false" :isShow="isShow"   :defaultUnCheck="true"  > </Tree>
						</div>
					</el-card>
				</div>
			</el-col>
			<el-col :span="12">
				<div style="height:300px">
					<el-card class="box-card" shadow="never" border-radius="2px">
						<div>已选择({{ deptSelect.length }})：<el-button style="float:right"  size="mini" @click="handleClear">清空</el-button></div>
						<el-scrollbar style="height:290px ">
							<el-tag :key="tag.id" v-for="(tag,index) in deptSelect" closable :disable-transitions="false" @close="handleRemove(tag.id,index)">
								{{ tag.name }}
							</el-tag>
						</el-scrollbar>
					</el-card>
				</div>
			</el-col>
		</el-row>

		<div class="Qfooter" style="margin-top: 15px">
			<el-button @click="handleClose">取消</el-button>
			<el-button type="primary" @click="handleSave">确定</el-button>
		</div>
	</el-dialog>
</template>

<script>
    import request from '@lib/axios.js';
    import Tree from '@components/Tree/index';
    import { formatTreeData } from '@lib/tools.js';
    import { extend, get, cloneDeep, filter, some, flow, concat, map } from 'lodash';
    export default {
        name: 'Users',
        data() {
            return {
                filterText:'',
                deptSelect:[],
                deptSelectIdArr:[],
                title: '选择人员',
                isShow: {input:true},
                dialogVisible: false,
                personList: [],
                deptList: [],
                data: [],

            };
        },
        props:{
            dataRequire: {
                type: Boolean,
                default: false
            }
        },
        watch: {

        },


        methods: {

            handleClear() {
                this.deptSelect = [];
                this.setCheckedKeys([])
            },
            handleRemove(id,index) {
                this.deptSelect.splice(index,1)
				let arr=this.deptSelect.map((k,l)=> k.id)
				this.setCheckedKeys(arr)
             },

            setCheckedKeys(arr){
                this.$refs.tree.setCheckedKeys(arr)
			},
             handleCheck(data,node){
                 this.deptSelect=node.checkedNodes
             },
           getTree() {
                 let orgId = this.$store.getters.userInfo.orgId;
                request({
                    url: 'sys/department/getAllDepartmentByOrgId',
                    method: 'get',
                    params:{orgId:orgId},
                }).then((d) => {
                    if(d.responseCode==1000){
                         this.data=d.data||[]
                    }

                });
            },

            handleClose() {
                  this.data =[]
                  this.filterText =''
                    this.deptSelectIdArr=[]
                    this.deptSelect =[]
                this.dialogVisible = false;
            },
            handleSave() {
                if(this.dataRequire && !this.deptSelect.length){
                    this.$message({
                        message: '请选择需要推送的对象',
                        type: 'warning'
                    })
                    return
                }
                this.$emit('onSelected', this.deptSelect,this.deptList);
                this.handleClose();
            },
            open(inputList, title, currentDept) {
                this.getTree();
                 this.title = title||'部门选择';
                this.deptSelect = inputList||[];
                this.dialogVisible = true;
                this.deptSelectIdArr=inputList&&inputList.map((k,l)=>{
                    return k.id
				})
            },
        },
        created(){
            // this.getTree()
        },
        components: {
            Tree,
        },
    };
</script>

<style scoped lang="scss">
	.users-dialog {
		.el-tag {
			margin: 5px;
		}
	}
	.el-scrollbar__wrap {
		overflow-x: hidden;
	}
	.el-card__body {
		padding: 10px;
		.item{
			margin: 20px 0;
		}
		.el-checkbox__label{
			padding-left: 15px;
		}
		.el-scrollbar__wrap{
			overflow-x: hidden;
		}

	}
	  .el-scrollbar{
		margin-top: 0px!important;

	}
	/deep/ .el-scrollbar{
		margin-top: 0px!important;

	}
	.el-card__body > div:first-child {
		padding: 0px;
		margin-top: 5px;
		line-height: 15px;
	}
	  .elinput {
		margin: 10px 0;
		height: 30px;
		// width: 100%;
	}
	/deep/ .elinput {
		margin: 10px 0;
		height: 30px;
		// width: 100%;
	}
	.box-card{
		  .el-button{
			margin-top: -10px;
		}
		/deep/ .el-button{
			margin-top: -10px;
		}
	}
	  .el-input__inner {
		height: 30px;
		width: 100%;
	}
	/deep/ .el-input__inner {
		height: 30px;
		width: 100%;
	}
</style>
