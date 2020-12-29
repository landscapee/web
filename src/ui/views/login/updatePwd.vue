<template>
	<div>
		<el-dialog :visible.sync="showDialog" title="修改密码" @close="close" center :before-close="close" width="30%">
			<div class="hint">
				<span v-if="msg">{{msg}}</span>
			</div>
			<el-form ref="pwdForm" :inline="true" label-width="110px" :rules="pwdRules" :model="pwdForm"
					 label-position="left"
					 style="text-align: center">
				<el-form-item label="用户名" prop="name">

					<el-input :disabled="user" v-model="pwdForm.name" key="12" placeholder="请输入用户名" type="text"
							  auto-complete="off"></el-input>
				</el-form-item>
				<div>
					<el-form-item label="旧密码" prop="oldPwd">
						<el-input v-model="pwdForm.oldPwd" placeholder="请输入旧密码" type="password"
								  auto-complete="off"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="新密码" prop="newPwd">
						<el-input v-model="pwdForm.newPwd" placeholder="请输入新密码" type="password"
								  auto-complete="new-password" maxlength="16"></el-input>
					</el-form-item>
				</div>
				<div>
					<el-form-item label="确认新密码" prop="confirmPwd">
						<el-input v-model="pwdForm.confirmPwd" placeholder="请再次输入新密码" type="password"
								  auto-complete="new-password" maxlength="16"></el-input>
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
    import {encryptedData} from '@/ui/lib/des-coder.js';

	export default {
		name: "updatePwd",
		data() {
			const validatePass = (rule, value, callback) => {
				if (value === '' || value === undefined) {
					callback(new Error('请输入新密码'));
				} else {
					const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![&*!,./@_]+$)[\da-zA-Z&*!,./@_]{6,16}$/;
					console.log("正则-----" + reg.test(value));
					if (reg.test(value)) {
						callback();
					} else {
						this.$message({
							type:'warning',
							message: '密码必须由6-16位数字、字母和特殊字符（只包括&*!,./@_）至少两种组成',
							duration: 5000
						});
						callback(new Error(' '));
					}
				}
			};
			const validatePass2 = (rule, value, callback) => {
				if (value === this.pwdForm.newPwd) {
					callback();
				} else {
					callback(new Error('两次新密码输入不相同！'));
				}
			};
			return {
				loading: false,
				showDialog: false,
				pwdForm: {
					name: '',
					oldPwd: '',
					newPwd: '',
					confirmPwd: '',
				},
				user: {
					id: '',
					username: '',
					password: '',
					token: '',
				},
				msg: '',
				pwdRules: {
					name: [
						{required: true, message: '请输入用户名', trigger: 'blur'},
					],
					oldPwd: [
						{required: true, message: '请输入旧密码', trigger: 'blur'},
					],
					newPwd: [
						{required: true, validator: validatePass, trigger: 'blur'}
					],
					confirmPwd: [
						{required: true, validator: validatePass2, trigger: 'blur'}
					],
				},
			}
		},
		methods: {
			open(msg, user) {
				this.showDialog = true;
				this.msg = msg;
				this.user = user;
				this.pwdForm.name = user.userName;
			},
			close() {
				this.loading = false;
				this.showDialog = false;
				this.pwdForm = {};
 			},
			handleUpdatePwd() {
				this.$refs.pwdForm.validate(valid => {
					if (valid) {
						if (this.pwdForm.newPwd !== this.pwdForm.confirmPwd) {
							this.$message.warning("两次新密码输入不相同!");
							return;
						}
						this.loading = true;
						let obj={...this.pwdForm}
						if (this.user) {
							//登录后返回长时间未修改密码跳转过来的
							this.editPwd(this.user);
						} else {
							request({
								url: `${this.$ip}/sso/login/loginWithRsa`,
								method: 'post',
								data: {username: encryptedData(obj.name), password: encryptedData(obj.oldPwd)},
								headers: {
									'Authorization': '',
									'Accept': 'application/json',
								}
							})
								.then((data) => {
									if (data.data.id) {
										this.editPwd(data.data);
									} else {
										this.$message.error("用户名或旧密码错误！");
										this.loading = false;
									}
								}).catch((error) => {
								this.loading = false;
								this.$message.error(error || '修改密码失败！');
							});
						}
					}
				})
			},
			editPwd(user) {
                let obj={...this.pwdForm}
				request({
					url: `${this.$ip}/sys/user/changeUserPwd`,
					method: 'post',
					data: {
						id: user.id,
 						oldPwd: encryptedData(obj.oldPwd),
						newPwd: encryptedData(obj.newPwd)
					},
					headers: {
						'Authorization': user.token,
						'Accept': 'application/json',
					}
				}).then((data) => {
					if (data.responseCode === 1000) {
						this.$message.success("修改密码成功！");
						this.showDialog = false;
						if (this.user) {
							this.$router.push({path: '/qualityManage'});
						}
					} else {
						this.$message.error(data.responseMessage || '修改密码失败！');
					}
					this.loading = false;
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

	.hint {
		text-align: center;
		color: #F56C6C;
		margin-bottom: 20px;
	}

</style>
