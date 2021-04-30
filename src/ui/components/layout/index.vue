<template>
	<el-container  class="layout-container">
		<el-header class="layout-header">
			<icon iconClass="logo" class="logo_icon"></icon>
			<span class="header_title">{{sysname}}</span>
			<div class="header-right">

				<span class="buttons"><icon iconClass="usericon"></icon>{{username}}</span>
				<span class="buttons" @click="goInfo">
					<span style="position: relative">
						<icon iconClass="msg"></icon>
						<i class="bell_tips">{{tipsNumber}}</i>
					</span>
					消息
				</span>
				<span class="buttons" @click="logout"><icon iconClass="logout" ></icon>退出</span>
			</div>
		</el-header>
		<el-container>
		<el-aside  :class="isOpen?'open-menu':'left-menu'" >
 			<el-menu  router :default-active="routePath" :unique-opened="true">
				<el-submenu v-if="item.meta&&!item.hidden"  :index="item.path" v-for="(item,index) in permission_routes" :key="index">
					<template slot="title">
						<icon :iconClass="item.meta.icon" ></icon>
          				<span>{{item.name}}</span>
					</template>
					<el-menu-item  v-if="!item.hidden" :index="obj.path" v-for="obj in item.children" :key="obj.path"  >
						<span >{{obj.name}}</span>
					</el-menu-item>
				</el-submenu>
			</el-menu>
			<icon  iconClass="spread" :class="isOpen?'spread-icon open-spread-icon':'spread-icon'" @click.native="onSpread"></icon>
		</el-aside>
		<el-container class="main-layout">
			<el-main>
				<breadcrumb  />
				<keep-alive>
					<router-view v-if="$route.meta.keepAlive" :key="routePath"></router-view>
				</keep-alive>
				<router-view v-if="!$route.meta.keepAlive" :key="routePath"></router-view>
			</el-main>
		</el-container>
		</el-container>
	</el-container>
</template>
<script>
 import postal from 'postal';
 import { mapGetters } from 'vuex';
 import { resetRouter,asyncRoutes } from '@router';
import logo from './assets/img/logo.png';
import bell from './assets/img/ic_bell.png';
import esc from './assets/img/ic_esc.png';
import usericon from './assets/img/usericon.png';
import Breadcrumb from './components/Breadcrumb/index';
import Icon from '@components/Icon-svg/index';
import {setUserInfo,setToken,removeToken,removeUserInfo} from '@lib/auth';
import request from '@lib/axios.js';
  export default {
	components: {
		Breadcrumb,
		Icon
	},
    data() {
      return {
		routeMenu:[],
		asyncRoutes,
		username:this.$store.getters.userInfo.name,
		sysname:'成都天府机场机务管理系统',
		tipsNumber:localStorage.getItem("msg_count")?localStorage.getItem("msg_count"):0,
		logo,
		bell,
		esc,
		usericon,
		routePath:this.$route.path,
		isOpen:false
      }
	},
      computed: {
          ...mapGetters(['permission_routes']),
      },
	watch: {
		$route: {
			handler: function(val, oldVal){
				this.routePath = val.path;
			},
			// 深度观察监听
			deep: true
		}
	},
	created(){
        console.log(this.permission_routes);
    },
	mounted(){
        if(window.postal){
             postal.unsubscribe(window.postal)

        }
     window.postal= postal.subscribe({
			channel: 'websocket_msg',
			topic: 'message',
			callback: async data => {
                request({
                    url:`${this.$ip}/mms-notice/notificationRecipient/countUndo`,
                    method: 'get',
                })
                .then((data) => {
                    this.tipsNumber = data.data
                })
                 if(data.content&&data.content.content){
                    this.$notify({
                        title: '收到一条消息',
                        message: data.content&&data.content.content,
						position: 'bottom-right',
						duration: -1
                    });
				}
			}
		});
		postal.subscribe({
			channel: 'websocket_count',
			topic: 'count',
			callback: async data => {
                console.log(data,3,6,9);
				localStorage.setItem("msg_count",data);
				this.tipsNumber = data;
			}
		})
	},
	methods:{
		goInfo(){
			this.$router.push({ path: '/infoPlate' ,query:{type:'receive'}});
			this.$eventBus.$emit('infoPlate', 'receive');
		},
		logout(){
			this.$confirm('是否确定退出？')
				.then(()=>{
					let sessionId= localStorage.getItem('socketId');
					this.$store.commit('user/SET_TOKEN','');
					this.$store.commit('user/SET_ROLES',null);
					this.$store.commit('user/SET_USER_INFO','');
					removeToken();
					removeUserInfo();
					resetRouter();
					this.$router.push({ path: '/' });
					if(window.SOCKET){
						window.SOCKET.close()
						//清空socket对象
						window.SOCKET = null
					}
				});

		},
		onSpread(){
			this.isOpen = !this.isOpen;
		}
	}
  };
</script>

<style lang="scss" scoped>
.layout-container{
	position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    display: flex;
    overflow: hidden;
	.main-layout{
		.el-main{
			padding:0px;
		}
	}
	.layout-header{
		height: 48px !important;
		background: url('./assets/img/nav_bg.png') no-repeat;
		background-size: cover;
		width:100%;
		padding: 0px;
		display: flex;
		align-items: center;
		.header_title{
			font-size:22px;
			font-family:SourceHanSansCN-Medium,SourceHanSansCN;
			font-weight:500;
			color:rgba(255,255,255,1);
			margin-left: 65px;
		}

		.logo_icon{
			margin-left:63px;
			width:109px;
			height:34px;
		}
	}
	/deep/ .el-menu{
		border:0px;
		background: unset;

		.el-menu-item{
			background: #162C41;
			color: #fff;
			cursor: pointer;
		}
		.el-menu-item::before{
			content: ' ';
            position: absolute;
			right: 169px;
            top: 24px;
            width:4px;
			height:4px;
			background:rgba(255,255,255,1);
			border-radius: 2px;
		}
		.el-submenu__title{
			color: #fff;
		}
		.el-submenu__title:hover{
			background: unset;
		}
		.el-submenu__icon-arrow{
			display: none;
		}
		/deep/ .svg-icon {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
		.svg-icon {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
	}
	.el-menu{
		border:0px;
		background: unset;

		.el-menu-item{
			background: #162C41;
			color: #fff;
			cursor: pointer;
		}
		.el-menu-item::before{
			content: ' ';
            position: absolute;
			right: 169px;
            top: 24px;
            width:4px;
			height:4px;
			background:rgba(255,255,255,1);
			border-radius: 2px;
		}
		.el-submenu__title{
			color: #fff;
		}
		.el-submenu__title:hover{
			background: unset;
		}
		.el-submenu__icon-arrow{
			display: none;
		}

		.svg-icon {
			width: 16px;
			height: 16px;
			vertical-align: middle;
		}
	}
	  .el-menu--inline{
		 .is-active{
			background: #3280E7;
		}
	}
	/deep/ .el-menu--inline{
		/deep/ .is-active{
			background: #3280E7;
		}
	}
	.open-menu{
		width: 3px !important;
		transition: width 0.28s;
		background: url('./assets/img/leftNav.png') no-repeat;
		height: calc(100vh - 48px);
		background-size:cover;
		overflow-x: hidden;
		padding-top: 55px;
		&::-webkit-scrollbar-track-piece {
			background: #d3dce6;
		}
		&::-webkit-scrollbar {
			width: 6px;
		}
		&::-webkit-scrollbar-thumb {
			background: #99a9bf;
			border-radius: 20px;
		}
		&::after{
			content: '';
			height: calc(100% - 48px);
			width: 3px;
			position: absolute;
			top: 48px;
			left: 0px;
			background: #265FE2;
		}
	}
	.left-menu{
		transition: width 0.28s;
		width: 160px !important;
		background: url('./assets/img/leftNav.png') no-repeat;
		height: calc(100vh - 48px);
		background-size:cover;
		overflow-x: hidden;
		padding-top: 55px;
		&::-webkit-scrollbar-track-piece {
			background: #d3dce6;
		}
		&::-webkit-scrollbar {
			width: 6px;
		}
		&::-webkit-scrollbar-thumb {
			background: #99a9bf;
			border-radius: 20px;
		}
		&::after{
			content: '';
			height: calc(100% - 48px);
			width: 3px;
			position: absolute;
			top: 48px;
			left: 157px;
			background: #265FE2;
		}
	}
	  .spread-icon{
		position: absolute;
		left: 150px;
		top: 50%;
		width: 8px;
		height:45px;
		cursor: pointer;
		z-index: 9999999999;
	}
	/deep/ .spread-icon{
		position: absolute;
		left: 150px;
		top: 50%;
		width: 8px;
		height:45px;
		cursor: pointer;
		z-index: 9999999999;
	}
	  .open-spread-icon{
		left: 0px;
		transform:rotate(180deg);
	}
	/deep/ .open-spread-icon{
		left: 0px;
		transform:rotate(180deg);
	}

}
.header-right svg{

	width: 16px;
	height: 16px;
	margin-right: 8px;
	vertical-align: middle;
}

.header-right{
	margin-right: 15px;
	position: absolute;
	right: 0px;
	color: #fff;
	display: flex;
	justify-content: flex-end ;
	.bell_tips{
		position: absolute;
		right:2px;
		top: -8px;
		padding: 1px 4px;
		background: #E93570;
		color: #fff;
		border-radius: 8px;
		font-size:8px;
		font-style:normal;
		font-family:SourceHanSansCN-Medium,SourceHanSansCN;
		font-weight:500;
 	}
	span{
		cursor: pointer;
	}
	span:not(:last-child):after{
		content:'|';
		width:2px;
		height:16px;
		color:#00549A;
		margin-left: 12px;
	}
}
.buttons{
	margin-left: 15px;
	display: flex;
	flex-direction: row;
	justify-content: right;
	align-items: center;
}
</style>
