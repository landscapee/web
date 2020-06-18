<template>
	<div class="login-container">
		<div class="login-bg blur"></div>
		<div class="loginPanle">
			<div class="loginTitle"><span>成都天府机场机务管理系统</span></div>
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
							<img class="pwdicon" :src="pwdimg"  />
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
import './assets/index.scss';
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
							this.$store.commit('SET_USER_INFO',data.data);
                            this.$router.push({ path: '/qualityManage' });
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



