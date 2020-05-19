<template>
	<div class="login-container">
		<div class="login-bg blur"></div>
		<div class="loginPanle">
			<div class="loginTitle"><span>机务管理系统</span></div>
			<el-row class="left">
					<img :src="logo" alt="" />
			</el-row>
			<el-row class="right">
				<el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">
					<el-form-item prop="username" class="input-panel-g">
						<span class="imgbox">
							<img :src="userimg"  />
						</span>
						<el-input ref="username" v-model="loginForm.username" placeholder="请输入您的用户名" name="username" type="text" tabindex="1" auto-complete="on" />
					</el-form-item>
					<el-form-item prop="password" class="input-panel-r">
						<span class="imgbox">
							<img :src="pwdimg"  />
						</span>
						<el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="请输入您的密码" name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
					</el-form-item>
					<el-button :loading="loading" class="loginBtn"  @click.native.prevent="handleLogin">登录 →</el-button>
				</el-form>
			</el-row>
		</div>
	</div>
</template>

<script>
import { MessageBox, Message } from 'element-ui';
import request from '@lib/axios.js';
import logo from './assets/img/login-logo.png';
import userimg from './assets/img/login-username.png';
import pwdimg from './assets/img/login-password.png';
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
			logo,
			userimg,
			pwdimg,
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
	    height: 0.36rem ;
		width: 85%;
		
		input {
			height: 0.36rem ;
    		line-height: 0.36rem ;
			background: transparent;
			border: 0px;
			-webkit-appearance: none;
			border-radius: 0px;
			padding: 12px 5px 12px 0px;
			color: $light_gray;
			// height: 47px;
			caret-color: $cursor;

			&:-webkit-autofill {
				// box-shadow: 0 0 0px 1000px $bg inset !important;
				-webkit-text-fill-color: $cursor !important;
			}
			&::-webkit-input-placeholder {
				color: #89A3B5;
			}
   
		}
	}

	.el-form-item {
		// border: 1px solid rgba(255, 255, 255, 0.1);
		background: #e9f4ff;
		border-radius: 2px;
	}
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
	position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
	overflow: hidden;
	.login-bg{
		position: absolute;
		top: -9px;
		bottom: -9px;
		left: -9px;
		right: -9px;
		background-image: url('./assets/img/bg.png');
		background-repeat: no-repeat;
		background-size: cover;
		background-position: center center;
		z-index: -1;
		transition:all 3s ease 0s;
		-webkit-transition:all 3s ease 0s;
	}
	.loginPanle {
		width: 8.3222rem;
        height: 4.52rem;
		display: flex;
        position: relative;
		.loginTitle {
			width:2.74rem;
			height: 35.7px;
			background-size: 2.74rem  35.7px;
			background: url('./assets/img/loginTitle.png') no-repeat;
			position: absolute;
			right: 0px;
    		top: -35.7px;
			color: #fff;
			text-align: center;
			line-height: 35.7px;
			 box-shadow:  0px 4px 16px rgba(0, 0, 0, 0.3);
			 z-index: 10;
			span{
				font-size: 16px;
			}
		}
		.left{
			border-radius: 10px 0 0 10px;
			width: 50%;
			height: 100%;
			background-image: linear-gradient(to bottom, rgba(208,224,248,1), rgba(208,224,248,0.9));
			display: flex;
			justify-content: center;
			align-items: center;
			img{
				width: 3.45rem;
			}
		}
		.right{
			border-radius: 0 0px 10px 0;
			width: 50%;
			height: 100%;
			background-image: linear-gradient(to bottom, RGBA(216, 229, 248, 1), RGBA(216, 229, 248, 0.9));
			display: flex;
			align-items: center;
			justify-content: center;
			.login-log {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
			}
			.el-form-item {
				position: relative;
				height: 0.36rem;
				.imgbox{
					vertical-align: middle;
					height: 33px;
					line-height:33px ;
					width: 30px;
					display: inline-block;
					color: #889aa4;
					text-align: center;
					img{
						width: 1.05em;
    					height: 1.2em;
						vertical-align: -0.15em;
						fill: currentColor;
						overflow: hidden;
					}
				}
				/deep/ .el-form-item__content {
					height: 0.35rem !important;
    				line-height: 0.35rem !important;
					.svg-container {
						vertical-align: baseline;
						 height: 0.36rem ;
						padding-top: 0;
						padding-bottom: 0;
					}
					.el-input {
						    height: 0.36rem !important;
					}
				}
				&.input-panel-g::after,
				&.input-panel-r::after {
					position: absolute;
					content: ' ';
					width: 96%;
					left: 6px;
					height: 2px;
				}
				&.input-panel-g {
					margin-bottom: 25px !important;
					&::after {
						background-color: #446ED6;
					}
				}
				&.input-panel-r {
					margin-bottom: 34.7px !important;
					&::after {
						background-color: #169F3E;
					}
				}
			}
			.loginBtn {
				width: 100%;
				border: none !important;
				height: 35.5px;
				background-image: linear-gradient(to right, #0ACFFE, #495AFF) !important;
				color: #fff;
				border-radius: 5px;
				border:none;
				box-shadow:  0px 5px 15px rgba(73, 90, 255, 0.3);
				position: relative;
				/deep/ span{
					font-size: 15px;
					font-weight: 400;
					font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,sans-serif;
				}
			}
			.loginBtn:active{
				box-shadow: 0 0 0 0 rgba(46,103,246,.5);
			}
		}
		.el-row,
		.el-col {
			height: 100%;
		}
		
	}

	.login-form {
		position: relative;
		width: 323px;
		max-width: 100%;
		padding: 0px 35px 0px;
		margin: 0 auto;
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
