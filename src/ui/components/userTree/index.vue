<template lang="html">
	<el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
		<el-row>
			<el-col :span="12">
				<div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<el-scrollbar style="height:300px">
							<Tree :data="data" ref="tree" @handleSelect="getListById" :expand-on-click-node="false" :isShow="isShow" :isShow.input="false" :defaultUnCheck="true"> </Tree>
						</el-scrollbar>
					</el-card>
				</div>
			</el-col>
			<el-col :span="12"
				><div>
					<el-card class="box-card" shadow="never" border-radius="2px">
						<el-scrollbar style="height:300px">
							<div v-show="personList.length == 0">该部门暂无人员</div>
							<el-checkbox v-show="personList.length > 0" v-model="selectAll" @change="handleSelectAll">全选</el-checkbox>
							<div class="item" v-for="(item, index) in personList" :key="item.id">
								<div class="item-time">
									<el-checkbox v-model="item.selected" @change="handleSelect(item)">{{ item.name }}</el-checkbox>
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
						<div>已选择({{ selectedPersonList.length }})：<el-button style="float:right" size="mini" @click="handleClear">清空</el-button></div>
						<el-scrollbar style="height:120px ">
							<el-tag :key="tag.id" v-for="tag in selectedPersonList" closable :disable-transitions="false" @close="handleRemove(tag.id)">
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
		<div class="footer">
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
			title: '',
			isShow: false,
			selectAll: false,
			dialogVisible: false,
			personList: [],
			selectedPersonList: [],
			data: {},
			selectId: null,
			selectNode: {},
			type:"",
			deptList:[]
		};
	},
	methods: {
		getAllUserByDeptId() {
			getAllUserByDeptId({ deptId: '' }).then((d) => {});
		},
		handleSelect(item) {
			console.log(item);
			console.log(this.selectedPersonList);
			if (item.selected) {
				const idx = this.selectedPersonList.findIndex((d) => d.id === item.id);
				if (idx == -1) {
					
					this.selectedPersonList.push({
						id: item.id,
						name: item.name,
					});
				}
			} else {
				this.doHandleRemove(item.id);
			}
		},
		handleSelectAll() {
			if (this.selectAll) {
				this.personList.forEach(function(item) {
					item.selected = true;
				});
			} else {
				this.personList.forEach(function(item) {
					item.selected = false;
				});
			}

			let _this = this;

			this.personList.forEach(function(item) {
				_this.handleSelect(item);
			});
		},
		handleClear() {
			this.selectedPersonList = [];
			this.selectAll = false;
			this.personList.forEach(function(item) {
				item.selected = false;
			});
		},
		handleRemove(id) {
			this.doHandleRemove(id);
			const idx = this.personList.findIndex((d) => d.id === id);
			if (idx > -1) {
				this.personList[idx].selected = false;
			}
		},
		doHandleRemove(id) {
			const idx = this.selectedPersonList.findIndex((d) => d.id === id);
			if (idx > -1) {
				this.selectedPersonList.splice(idx, 1);
			}
		},
		getListById(node) {
			if (node && node.id) {
				this.selectId = node.id;
				this.selectNode = node;
				this.type = node.type;
			}
			let fetch;
			let param = { pageNum: 1, pageSize: 99999 };
			if (this.type == 'ORG') {
				fetch = (params)=>{
					return request({
						headers: { 'Content-Type': 'text/plain' },
						url: `/api/sys/user/getAllUserByOrgId`,
						method: 'get',
						params,
					}).then((d) => {
						return Promise.resolve(d);
					});
				} 
				param.orgId = this.selectId;
			} else {
				fetch = (params)=>{
					return request({
						url: '/api/sys/user/getUsersByDeptId',
						method: 'get',
						params,
					}).then((d) => {
						return Promise.resolve(d);
					});
				} 
				param.deptId = this.selectId;
			}
			fetch(param).then((d) => {
				let list = d.data.list ? d.data.list : d.data;
				let idArry = [];
				this.selectedPersonList.forEach((item) => {
					idArry.push(item.id);
				});
				let flag = false;
				list.forEach((item) => {
					if (!idArry.includes(item.id)) {
						flag = true;
					}
				});
				if (flag) {
					this.selectAll = false;
				} else {
					this.selectAll = true;
				}
				this.deptList = d.data.map(d => {
					return {
						id: d.administrativeId,
						name: d.administrativeName,
					};
				});
					
				flow([
					(d) => {
						return map(d, (f) => {
							return {
								id: f.id,
								name: f.name,
								idCard: f.userExt==null?"":f.userExt.idCard,
								selected: this.isSelected(f.id),
							};
						});
					},
					
					(d) => {
						this.personList = d;
					},
				])(list);
			});
		},
		isSelected(id) {
			const idx = this.selectedPersonList.findIndex((d) => d.id === id);
			return idx > -1;
		},
		getTree(currentDept) {
            let orgId = this.$store.getters.userInfo.orgId;
            let deptId = this.$store.getters.userInfo.deptId;
            let administrativeId = this.$store.getters.userInfo.administrativeId;
			request({
				url: '/api/sys/org/getAllTree',
				method: 'get',
				params:{},
			}).then((response) => {
				if (currentDept) {
					this.findCurrentDept(response.data[4], orgId);
				} else {
					this.data = formatTreeData(response.data);
				}
			});
		},
		findCurrentDept(dept, deptId) {
 			if (dept.data.id == deptId) {
				// console.log('--------' + dept.data.id + '--' + dept.data.name + '---' + deptId);
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
			this.dialogVisible = false;
		},
		handleSave() {
			this.handleClose();
			this.$emit('onSelected', this.selectedPersonList,this.deptList);
		},
		open(inputList, title, currentDept) {
			this.getTree(currentDept || false);
			this.selectAll = false;
			this.title = title;
			this.selectedPersonList = cloneDeep(inputList) || [];
			this.dialogVisible = true;
		},
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
}
.el-card__body > div:first-child {
	padding: 0px;
	margin-top: 5px;
	line-height: 15px;
}
</style>
