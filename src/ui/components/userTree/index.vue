<template lang="html">
	<el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
		<el-row>
			<el-col :span="12">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">

						<div style="height:300px" v-loading="!data.length" >

							<Tree  :data="data" ref="tree" @handleSelect="getListById" :expand-on-click-node="false" :isShow="isShow"   :defaultUnCheck="true"  > </Tree>
						</div>

					</el-card>
				</div>
			</el-col>
			<el-col :span="12">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<el-scrollbar style="height:300px">
								<div v-show="personList.length == 0">该部门暂无人员</div>
							<div class="elinput" v-show="personList.length > 0">
								<el-input class="input"  ref="input" placeholder="输入关键字进行搜索" @input="filterTextC" v-model="filterText"> </el-input>
							</div>
								<el-checkbox v-show="personList.length > 0" v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
								<div class="item" v-for="(item, index) in personList" :key="item.id">
									<div class="item-time">
										<el-checkbox v-model="userSelect" @change="userSelectC"   :label="item">{{item.name}}</el-checkbox>
									</div>
							</div>
						</el-scrollbar>
					</el-card>
				</div></el-col
			>
		</el-row>
		<el-row>
			<el-col :span="24">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<div>已选择({{ userSelect.length }})：<el-button style="float:right" size="mini" @click="handleClear">清空</el-button></div>
						<el-scrollbar style="height:120px ">
							<el-tag :key="tag.id" v-for="(tag,index) in userSelect" closable :disable-transitions="false" @close="handleRemove(tag.id,index)">
								{{ tag.name }}
							</el-tag>
						</el-scrollbar>
					</el-card>
				</div>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24"></el-col>
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
            personListObj:{},
			userSelect:[],
 			title: '选择人员',
			isShow: {input:true},
			selectAll: false,
			dialogVisible: false,
			personList: [],
			personListOld: [],
 			data: [],
			selectId: null,
			selectNode: {},
			type:"",
			deptList:[],
            OrgUser:[],
			orgObj:{
                ORG:'orgId',
                DEPT:'deptId',
                GROUP:'groupId',
			}
		};
	},
	props:['treeType'],
	watch: {

    },


    methods: {
        filterTextC(val){
            this.personList=[]
            if (!val){
                this.personList=[...this.personListOld];
                return false
			}
             this.personListOld.map((k,l)=>{
                k.name.indexOf(val) !== -1? this.personList.push(k):''
            })
		},
		isAllSelect(){
            let flag=true
            this.personList.map((k,l)=>{
                const idx = this.userSelect.findIndex((d) => d.id === k.id);
                if( idx>-1){
                }else{
                    flag=false
                }
            })
			return flag
		},
        userSelectC(){
                this.selectAll = this.isAllSelect();
			},
		handleClear() {
			this.userSelect = [];
			this.selectAll = false;

		},
		handleRemove(id,index) {
			 this.userSelect.splice(index,1)
            this.selectAll = this.isAllSelect();
		},

        getAllUserByOrgId(param,arr){
            let url=''
            if (this.type == 'ORG') {
                url='/sys/user/getAllUserByOrgId'
                param.orgId = this.selectId;
            } else {
                url='/sys/user/getUsersByDeptId'
                param.deptId = this.selectId;
            }
            return request({
                headers: { 'Content-Type': 'text/plain' },
                url: url,
                method: 'get',
                params:param,
            }).then((d) => {

                this.OrgUser=d.data
                return Promise.resolve(d,arr);

            });

        },
        dealData(d,arr,node){
            if(node.user&&node.user.length){
                arr=node.user
			}else{
                d.map((k,l)=>{
                    if( node['id']==k[this.orgObj[this.type]]){
                        arr.push(k)
                    }
                })
			}


		},
		getListById1(node) {
              if (node && node.id) {
				this.selectId = node.id;
				this.selectNode = node;
				this.type = node.type;
			}
 			let param = { pageNum: 1, pageSize: 99999 };
			let arr11 = [];

            if(!this.OrgUser.length){
                this.getAllUserByOrgId(param).then((d)=>{
                    this.dealData(d||[],arr11,node)
                     node.user=arr11
                    this.personList = arr11;
                 })
			}else{
                this.dealData(this.OrgUser,arr11,node)
                node.children=arr11
                this.personList = arr11;
 			}
		},
        handleSelectAll() {
                this.personList.map((k,l)=>{
                    const idx = this.userSelect.findIndex((d) => d.id === k.id);
                           if(this.selectAll){
                               if( idx==-1){
                                   this.userSelect.push(k)
                               }
						   }  else{
                               if( idx>-1){
                                   this.userSelect.splice(idx,1)
                               }
						   }
                })
        },
		getListById(node) {
            this.filterText=''
              if (node && node.id) {
				this.selectId = node.id;
				this.selectNode = node;
				this.type = node.type;
			}
			let param = { pageNum: 1, pageSize: 99999 };
            this.getAllUserByOrgId(param).then((d) => {
                 let flag = true;
                this.personList =d.data.list ? d.data.list : d.data;
                this.personListOld = [...this.personList]
                this.personList.map((k,l)=>{
                    const idx = this.userSelect.findIndex((d) => d.id === k.id);
                    if( idx>-1){
                        this.userSelect.splice(idx,1,k)
                    }else{
                        flag=false
                    }
                })
                this.selectAll = flag;

			});
		},


		getTree( ) {
		    let userInfo= this.$store.getters.userInfo
            console.log(userInfo,5,6);
            let orgId = userInfo.orgId;
            // let deptId = userInfo.deptId;
            // let administrativeId = userInfo.administrativeId;
			request({
				url: 'sys/org/getOrgById',
				method: 'get',
				params:{id:orgId},
			}).then((d1) => {
               if(d1.responseCode==1000){
                   request({
                       url: 'sys/department/getAllDepartmentByOrgId',
                       method: 'get',
                       params:{orgId:orgId},
                   }).then((d) => {
                       this.data=[
                           {
                               name:d1.data.name,
                               type:'ORG',
                               id:d1.data.id,
                               children:d.data||[]
                           }
                       ]
                   });
			   }
			});
		},
		findCurrentDept(dept, deptId) {
 			if (dept.data.id == deptId) {
 				this.data = formatTreeData([dept]);
				return;
			}
			if (dept.children && dept.children.length > 0) {
				for (let i = 0; i < dept.children.length; i++) {
					let child = dept.children[i];
					this.findCurrentDept(dept.children[i], deptId);
				}
			}
		},
		handleClose() {
		    this.personList=[]
			this.dialogVisible = false;
		},
		handleSave() {
			this.handleClose();
 			this.$emit('onSelected', this.userSelect,this.deptList);
		},
		open(inputList, title, currentDept) {
  			this.getTree(currentDept || false);
			this.selectAll = false;
			this.title = title;
			this.userSelect = cloneDeep(inputList) || [];
			this.dialogVisible = true;
		},
	},
	created(){
	  this.getTree()
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
/deep/ .el-scrollbar{
	margin-top: 0px!important;

}
.el-card__body > div:first-child {
	padding: 0px;
	margin-top: 5px;
	line-height: 15px;
}
/deep/ .elinput {
	margin: 10px 0;
	height: 30px;
	// width: 100%;
}
/deep/ .el-input__inner {
	height: 30px;
	width: 100%;
}
</style>
