<template>
	<div>
		<el-dialog :visible.sync="showDialog" title="修改密码" @close="close" center :before-close="close" width="30%">
			<el-form ref="pwdForm" :inline="true" label-width="110px" :rules="pwdRules" :model="pwdForm"
					 label-position="left"
					 style="text-align: center">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="pwdForm.username" placeholder="请输入用户名" type="text"></el-input>
				</el-form-item>
				<div>
					<el-form-item label="旧密码" prop="oldPwd">
						<el-input v-model="pwdForm.oldPwd" placeholder="请输入旧密码" type="password"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="新密码" prop="newPwd">
						<el-input v-model="pwdForm.newPwd" placeholder="请输入新密码" type="password"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="确认新密码" prop="confirmPwd">
						<el-input v-model="pwdForm.confirmPwd" placeholder="请再次输入新密码" type="password"></el-input>
					</el-form-item>
				</div>
			</el-form>
			<span class="dialog-footer" slot="footer">
					<el-button @click="close">取消</el-button>
					<el-button :loading="loading" @click="handleUpdatePwd" type="primary">提交</el-button>
				</span>
		</el-dialog>
	</div>
</template>

<script>
	import request from '@lib/axios.js';

	export default {
		name: "updatePwd",
		data() {
			return {
				loading: false,
				showDialog: false,
				pwdForm: {
					username: '',
					oldPwd: '',
					newPwd: '',
					confirmPwd: '',
				},
				pwdRules: {
					username: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
					],
					oldPwd: [
						{required: true, message: '请输入旧密码', trigger: 'blur'},
					],
					newPwd: [
						{required: true, message: '请输入新密码', trigger: 'blur'}
					],
					confirmPwd: [
						{required: true, message: '请再次输入新密码', trigger: 'blur'}
					],
				},
			}
		},
		methods: {
			open() {
				this.showDialog = true;
			},
			close() {
				this.loading = false;
				this.showDialog = false;
				this.pwdForm = {};
				this.pwdRules = {};
			},
			handleUpdatePwd() {
				this.$refs.pwdForm.validate(valid => {
					if (valid) {
						if (this.pwdForm.newPwd !== this.pwdForm.confirmPwd) {
							this.$message.warning("两次密码输入不相同!");
							return;
						}
						this.loading = true;

						request({
							url: `${this.$ip}/sso/login/login`,
							method: 'post',
							data: {username: this.pwdForm.username, password: this.pwdForm.oldPwd},
							headers: {
								'Authorization': '',
								'Accept': 'application/json',
							}
						})
							.then((data) => {
								debugger
								if (data.data.id) {
									request({
										url: `${this.$ip}/sys/user/changeUserPwd`,
										method: 'post',
										data: {
											id: data.data.id,
											oldPwd: this.pwdForm.oldPwd,
											newPwd: this.pwdForm.newPwd
										},
										headers: {
											'Authorization':data.data.token,
											'Accept': 'application/json',
										}
									}).then((data) => {
										if (data.responseCode === 1000) {
											this.$message.success("修改密码成功！");
											this.showDialog = false;
										} else {
											this.$message.error(data.responseMessage || '修改密码失败！');
										}
										this.loading = false;
									})
								} else {
									this.$message.error("用户名或旧密码错误！");
									this.loading = false;
								}
							}).catch((error) => {
							this.loading = false;
							this.$message.error(error || '修改密码失败！');
						});
					}
				})
			}
		}
	}
</script>

<style scoped>

	/deep/ .el-form-item__label {
		color: #222222;
		font-size: 16px;
		font-weight: 400;
		padding-left: 0;
	}

	/deep/ .el-input__inner {
		border: 1px solid #979797;
		border-radius: 2px;
		color: #222222;
		font-size: 16px;
	}


</style>
