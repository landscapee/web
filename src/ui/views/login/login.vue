<template>
	<div>
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
						<el-button :loading="loading" class="loginBtn"  @click.native.prevent="handleLogin('loginForm')">登录 →</el-button>
						<div style="text-align: right;margin-top: 20px">
							<span class="updatePwd" @click="openDialog('loginForm')">修改密码</span>
						</div>
					</el-form>
				</el-row>
			</div>
		</div>
		<UpdatePwd @login="EAlogin" ref="pwd"></UpdatePwd>
	</div>

</template>

<script>
    import {encryptedData,decrypt} from '@/ui/lib/des-coder.js';

import { initWebsocket } from '../../../../initSocket.js';
import {setUserInfo,setToken,removeToken} from '@lib/auth';
import request from '@lib/axios.js';
import {filterAsyncRoutes} from '@store/modules/permission.js';
import { asyncRoutes, constantRoutes,resetRouter } from '@/ui/router';

import logo from './assets/img/login-logo.png';
import userimg from './assets/img/login-username.png';
import pwdimg from './assets/img/login-password.png';
import './assets/index.scss';
import postal from 'postal';
import UpdatePwd from "./updatePwd";
import router from '@/ui/router';

export default {
	name: 'Login',
	components: {UpdatePwd},
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
				// username: [{ required: true, trigger: 'blur', validator: validateUsername }],
				// password: [{ required: true, trigger: 'blur', validator: validatePassword }],
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
        EAlogin(data){
            this.loginForm={
                username:data.name,
                password:data.newPwd,
			}
           this.handleLogin('form')
		},
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
		findUnread(){
			request({
				url:`${this.$ip}/mms-notice/notificationRecipient/countUndo`,
				method: 'get',
			})
			.then((data) => {
				postal.publish({
					channel: 'websocket_count',
					topic: 'count',
					data: data.data
				});
			}).catch((error) => {

			});
		},
		loginAfter(data){
            if (data.responseCode === 1000||data.responseCode === 30003||data.responseCode === 30002||data.responseCode === 30010) {
                setToken(data.data.token);
                setUserInfo(data.data);
                this.$store.commit('user/SET_TOKEN',data.data.token);
                this.$store.commit('user/SET_USER_INFO',data.data);
                initWebsocket(this);
                this.findUnread();
                //跳转到修改密码页面
                if(data.responseCode === 30010){
                    this.$message.warning(data.responseMessage)
                }
                if(data.responseCode === 30003||data.responseCode === 30002){
                    this.$refs['pwd'].open(data.responseMessage,data.data);
                }else {
                    let accessedRoutes = filterAsyncRoutes(asyncRoutes, data.data.menus||[])
                    if(accessedRoutes[0].path=='*'){
                        this.$message.warning('您没有此系统任何菜单权限，请联系管理员配置相应权限。')
                        this.loading = false;
                        return false
                    }
                    resetRouter()
                    router.addRoutes(accessedRoutes);
                    // let index=data.data.menus.findIndex((i)=>i.component=='R_qualityManage')
                    // let path=index>-1?'/qualityManage':accessedRoutes[0].children[0].path
                    let path=accessedRoutes[0].children[0].path
                    this.$router.push({ path: path,replace:true});
                }
            }else{
                this.$message.error( data.responseMessage);
            }
		},
		handleLogin() {
 			this.$refs.loginForm.validate((valid) => {
 				if (valid) {
 				    if(!this.loginForm.username.trim()||!this.loginForm.password.trim()){
 				        this.$message.warning('用户名或密码不能为空')
						return false
					}
					this.loading = true;
					removeToken();
					request({
						url:`${this.$ip}/sso/login/loginWithRsa`,
						method: 'post',
 						data:{
                            username:encryptedData(this.loginForm.username),
                            password:encryptedData(this.loginForm.password),
						},
						headers: {
							'Authorization':'' ,
							'Accept': 'application/json',
						}
					})
					.then((data) => {
						console.log(data.data,'login');
						this.loginAfter(data)
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
		openDialog(){
			this.$refs['pwd'].open('',null);
		},
	},
};
</script>



