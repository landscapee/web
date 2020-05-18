<template>
	<div class="login-container">
		<div class="loginPanle">
			<el-row>
				<el-col :span="12" style="position:relative;">
					<div class="login-log"></div>
				</el-col>
				<el-col :span="12">
					<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
						<el-form-item prop="username" class="input-panel-g">
							<!-- <span class="svg-container">
								<svg-icon icon-class="user" />
							</span> -->
							<el-input ref="username" v-model="loginForm.username" placeholder="用户名" name="username" type="text" tabindex="1" auto-complete="on" />
						</el-form-item>
						<el-form-item prop="password" class="input-panel-r">
							<!-- <span class="svg-container">
								<svg-icon icon-class="password" />
							</span> -->
							<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
							<!-- <span class="show-pwd" @click="showPwd">
								<svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
							</span> -->
						</el-form-item>
						<el-button :loading="loading" class="loginBtn" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登录</el-button>
					</el-form>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
import { MessageBox, Message } from 'element-ui';
import request from '@lib/axios.js';
export default {
	name: 'Login',
	data() {
		const validateUsername = (rule, value, callback) => {
			if (!value.trim().length > 0) {
				callback(new Error('请输入正确的用户名'));
			} else {
				callback();
			}
		};
		const validatePassword = (rule, value, callback) => {
			if (value.length < 4) {
				callback(new Error('密码不能少于4位'));
			} else {
				callback();
			}
		};
		return {
			loginForm: {
				username: '',
				password: '',
			},
			loginRules: {
				username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				password: [{ required: true, trigger: 'blur', validator: validatePassword }],
			},
			loading: false,
			passwordType: 'password',
			redirect: undefined,
		};
	},
	watch: {
		$route: {
			handler: function(route) {
				this.redirect = route.query && route.query.redirect;
			},
			immediate: true,
		},
	},
	mounted() {},
	methods: {
		showPwd() {
			if (this.passwordType === 'password') {
				this.passwordType = '';
			} else {
				this.passwordType = 'password';
			}
			this.$nextTick(() => {
				this.$refs.password.focus();
			});
		},
		handleLogin() {
			this.$refs.loginForm.validate((valid) => {
				if (valid) {
                    this.loading = true;
					request({
						url:'/api/sso/login/login', 
						method: 'post',
						data:this.loginForm,
					})
					.then((data) => {
                         if (data.responseCode != 1000) {
                            this.$message.error( data.responseMessage);
                         }else{
							localStorage.setItem("userInfo",JSON.stringify(data));
                            this.$router.push({ path: '/workOrder' });
                         }
                         this.loading = false;
					}).catch((error) => {
						 this.loading = false;
					});
				} else {
					console.log('error submit!!');
					return false;
				}
			});
		},
	},
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #222;
$cursor: #222;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
	.login-container .el-input input {
		color: $cursor;
	}
}

/* reset element-ui css */
.login-container {
	.el-input {
		display: inline-block;
		height: 40px;
		width: 85%;

		input {
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 15px;
			color: $light_gray;
			// height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				// box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
		}
	}

	.el-form-item {
		// border: 1px solid rgba(255, 255, 255, 0.1);
		background: #e9f4ff;
		border-radius: 5px;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
	position: relative;
	min-height: 100%;
	width: 100%;
	background-image: url('assets/img/bg.png');
	background-repeat: no-repeat;
	background-size: cover;
	overflow: hidden;
	.loginPanle {
		position: absolute;
		width: 920px;
		height: 500px;
		left: 50%;
		top: 50%;
		margin-left: -460px;
		margin-top: -250px;
		&::before {
			position: absolute;
			right: 4px;
			top: -33px;
			content: '';
			width: 362px;
			height: 68px;
		}
		&::after {
			position: absolute;
			font-size: 20px;
			right: 161px;
            top: 99px;
			content: '机务管理系统';
			color: #fff;
		}
		.el-row,
		.el-col {
			height: 100%;
		}
		.login-log {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
		}
		.el-form-item {
			position: relative;
			height: 40px;
			width: 280px;
			/deep/ .el-form-item__content {
				height: 40px !important;
				.svg-container {
					vertical-align: baseline;
					height: 40px;
					padding-top: 0;
					padding-bottom: 0;
				}
				.el-input {
					height: 40px !important;
				}
			}
			&.input-panel-g::after,
			&.input-panel-r::after {
				position: absolute;
				content: ' ';
				width: 98%;
				left: 4px;
				height: 1px;
			}
			&.input-panel-g {
				margin-bottom: 25px !important;
				&::after {
					background-color: #169f3e;
				}
			}
			&.input-panel-r {
				margin-bottom: 40px !important;
				&::after {
					background-color: #db4d54;
				}
			}
		}
		.loginBtn {
			background: linear-gradient(90deg, #0acffe 0%, #495aff 100%) !important;
			border: none !important;
			color: #fff;
		}
	}

	.login-form {
		position: relative;
		width: 350px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}

	.tips {
		font-size: 14px;
		color: #fff;
		margin-bottom: 10px;

		span {
			&:first-of-type {
				margin-right: 16px;
			}
		}
	}

	.svg-container {
		padding: 6px 5px 6px 15px;
		color: $dark_gray;
		vertical-align: middle;
		width: 30px;
		display: inline-block;
	}

	.title-container {
		position: relative;

		.title {
			font-size: 26px;
			color: $light_gray;
			margin: 0px auto 40px auto;
			text-align: center;
			font-weight: bold;
		}
	}

	.show-pwd {
		position: absolute;
		right: 10px;
		top: 7px;
		font-size: 16px;
		color: $dark_gray;
		cursor: pointer;
		user-select: none;
	}
}
</style>
