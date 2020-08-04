<template>
	<el-dialog :close-on-click-modal="false" class="dialog-deptTransfer" title="选择部门" center append-to-body :visible.sync="dialogVisible" width="1000px" :before-close="close">
		<div class="contentWrapper">
			<vue-draggable-resizable :w="lw" :z="1003" :min-width="100" :max-width="1170 - this.rw - 100" :y="0" axis="x" :active="true" :handles="['mr']" :parent="true" :draggable="false" @resizing="lResiz" :preventDeactivation="true">
				<div class="header">部门结构</div>
				<div width="100%" style="text-align:center;" class="main-Tree">
					<Tree :data="result" :no-first="true" ref="tree" @handleSelect="getListById" class="resourceTree" :expand-on-click-node="false" :isShow="isShow" :defaultUnCheck="true"> </Tree>
				</div>
			</vue-draggable-resizable>
			<div class="right-content">
				<div class="department">
					<div class="header">未选中</div>
					<div style="padding-left:10px">
						<el-input v-model="searchName" placeholder="请输入中文名" style="width:250px"></el-input>
					</div>
					<div class="selectPersonPanel">
						<el-button :disabled="department.type == 'ORG'" v-for="department in showDepartment" :key="department.id" @dblclick.native="handleSelect(department)" @click="handleSelect(department)">{{ department.name }}</el-button>
					</div>
				</div>
				<div class="selectDepartment">
					<div class="header">已选中</div>
					<div class="rolePersonPanel">
						<el-button v-for="department in departments" :key="department.id" @dblclick.native="handleCancel(department)" @click="handleCancel(department)">{{ department.name }}</el-button>
					</div>
				</div>
			</div>
		</div>
		<div style="text-align:center;margin-top:10px;">
			<el-button style="margin:0 auto;" @click="close">取消</el-button>
			<el-button style="margin:0 auto;" type="primary" @click="onSubmit">保存</el-button>
		</div>
	</el-dialog>
</template>
<script>
import Tree from '../Tree/index';
import { debounce, formatTreeData } from '@lib/tools.js';
import { extend, get, cloneDeep, filter, some, concat, map } from 'lodash';
import request from '@lib/axios.js';
export default {
	name: '',
	data() {
		return {
			dialogVisible: false,
			checkboxGroup: {},
			organizations: [], // 所有的组织 需要组织名字 userId deptId
			searchName: '',
			userid: '',
			result: [],
			data: [],
			showDepartmentTemp: [],
			departments: [],
			showDepartment: [],
			departmentsFromDep: [],
			lw: 300,
			mx: 300,
			mw: 600,
			rw: 270,
			rx: 900,
			isShow: {
				input: true,
				tip: false,
				number: true,
			},
		};
	},
	components: { Tree },
	computed: {},
	mounted() {},
	created() {},
	watch: {
		searchName(val) {
			debounce(() => {
				if (val == '') {
					this.showDepartment = this.showDepartmentTemp;
				} else {
					this.showDepartment = this.showDepartment.filter(function(item) {
						if (item.name.indexOf(val) !== -1) {
							return true;
						} else {
							return false;
						}
					});
				}
			})();
		},
	},
	methods: {
		handleSelect(department) {
			const idx = this.departments.findIndex((d) => d.id === department.id);
			if (idx == -1) {
				this.departments.push(department);
			}
			this.checkboxGroup.userId = this.userid;
			this.checkboxGroup.deptId = department.id;
		},
		handleCancel() {
			this.departments = [];
			this.checkboxGroup = {};
		},
		open(val) {
			this.getAllorganization();
			this.departments = [];
			this.checkboxGroup = {};
			this.userid = val.id;
			this.showDepartment = [];
			this.dialogVisible = true;
		},
		close() {
			this.dialogVisible = false;
			this.departments = [];
			this.checkboxGroup = {};
			this.showDepartment = [];
			this.result = [];
		},
		onSubmit() {
			if (!this.checkboxGroup.userId) {
				this.$message({
					message: '请选择相应的部门或班组',
					type: 'warning',
				});
				return false;
			}
			this.$emit('onSelected', this.departments);
			this.dialogVisible = false;
			this.departments = [];
			this.checkboxGroup = {};
			this.showDepartment = [];
			this.result = [];
		},
		getAllorganization() {
			request({
                url: '/sys/org/getAllTree',
                method: 'get',
                params:{},
            }).then((response) => {
				this.result = formatTreeData(response.data);
			});
		},
		filterTree(data) {
			let result = [];
			data.forEach((item) => {
				const aaa = { ...item };
				const tmp = {};
				tmp.label = item.data.name;
				tmp.deptId = item.data.id;
				tmp.userId = this.userid;
				tmp.type = item.type;
				if (aaa.children) {
					tmp.children = this.filterTree(aaa.children);
				}
				result.push(tmp);
			});
			return result;
		},
		getListById(node) {
			if (node && node.id) {
				let that = this;
				this.selectId = node.id;
				this.selectNode = node;
				this.type = node.type;
				this.showDepartment = node.children;
				this.showDepartmentTemp = cloneDeep(node.children);
				if (this.searchName != '') {
					this.showDepartment = this.showDepartment.filter(function(item) {
						if (item.name.indexOf(that.searchName) !== -1) {
							return true;
						} else {
							return false;
						}
					});
				}
			}
		},
		lResiz(left, top, width, height) {
			this.lw = width;
			this.mx = width;
			this.mw = 1170 - width - this.rw;
		},
		change() {},
		changeButton() {},
	},
};
</script>
<style lang="scss">
.dialog-deptTransfer {
	.main-Tree{
		 height: calc(100% - 50px) !important;
			.resourceTree {
			height: 100%;
			.el-tree {
				height: calc(100% - 50px) !important;
			}
		}
	}
	.vdr {
		top: 0 !important;
		height: 100%!important;
		border: none!important;
		.handle-mr {
			margin-top: 0 !important;
			width: 0 !important;
			border: none !important;
			border-right: 1px solid black !important;
			right: -1px !important;
			height: 100%!important;
            background-color: #2b2b2b;
            top: 0!important;
		}
		.scroll {
			height: calc(70vh - 60px);
			overflow-y: auto;
		}
	}
	.contentWrapper {
		position: relative;
		height:580px;
		width: 100%;
		display: flex;
		border: 1px solid black;
		.right-content {
			position: absolute;
			right: 0px;
			width: 646px;
			height: calc(100vh - 360px);
			overflow-y: auto;
		}
		.tree {
		}
		.department {
			height: 50% !important;

			border-bottom: 1px solid black;
			.selectPersonPanel {
				overflow: auto;
				height: 216px;
				padding: 10px;
				.el-button {
					margin-bottom: 10px;
					margin-right: 10px;
					& + .el-button {
						margin-left: 0;
					}
				}
			}
		}
		.selectDepartment {
			height: 50% !important;
			.rolePersonPanel {
				overflow: auto;
				height: 259px;
				padding: 10px;
				.el-button {
					margin-bottom: 10px;
					margin-right: 10px;
					& + .el-button {
						margin-left: 0;
					}
				}
			}
		}
		.header {
			height: 30px;
			line-height: 30px;
			text-align: center;
		}
	}
}
</style>
