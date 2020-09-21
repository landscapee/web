<template>
	<el-dialog class="AddVehiclVeiw" title="文件下载" center append-to-body :visible.sync="dialogVisible" :before-close="close">
		<div class="diaDiv" v-if="dialogRow.length">
			<div v-for="(item, index) in dialogRow" :key="index">
				<span>{{ index * 1 + 1 }}.</span><span class="col1"> {{ item.fileName }}</span>
				<span>
					<el-button @click="xiazai(item)" class="">下载</el-button>
				</span>
			</div>
		</div>

		<span v-else> </span>
		<form action="#" method="GET" ref="formLoad"></form>
	</el-dialog>
</template>

<script>
import request from '@lib/axios.js';
export default {
	name: 'download',
	data() {
		return {
			filePath: '',
			dialogRow: [],
			dialogVisible: false,
		};
	},
	methods: {
		close() {
			this.dialogVisible = false;
			this.filePath = '';
			this.dialogRow = [];
		},
		xiazai(row) {
			let filePath = `${this.$ip}/mms-file/get-file-stream-by-id/${row.id}`;
			this.$refs.formLoad.action = filePath;
			this.$refs.formLoad.submit();
		},
		open(data) {
			this.dialogVisible = true;
			this.dialogRow = data;
		},
	},
};
</script>

<style lang="scss" scoped>
/deep/ .el-dialog {
	width: 650px;
	/*height: 300px;*/
	.diaDiv {
		padding: 40px 20px;
		& > div {
			border-bottom: 1px #e0e0e0 solid;
			padding: 20px 0;
			font-size: 14px;
			& > span:nth-child(2) {
				color: #23bbd2;
				margin-right: 30px;
			}
			& > span:nth-child(3) {
				.el-button {
					color: white;
					padding: 10px 17px;
					background: #4993fd;
				}
			}
		}
	}
}
</style>
