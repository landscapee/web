<template>
	<el-container  class="layout-container">
		<el-header class="layout-header">
			<img :src="logo" class="logo_icon" />
			<span class="header_title">{{sysname}}</span>
			<div class="header-right">
				<i class="bell_tips">{{tipsNumber}}</i>
				<span><img :src="usericon" />{{username}}</span>
				<span @click="goInfo"><img :src="bell" />消息</span>
				<span @click="logout"><img :src="esc" />退出</span>
			</div>
		</el-header>
		  <el-container>
		<el-aside  :class="isOpen?'open-menu':'left-menu'" >
			<el-menu  router :default-active="routePath" :unique-opened="true">
				<el-submenu :index="item.path" v-for="(item,index) in asyncRoutes" :key="index">
					<template slot="title">
						<icon :iconClass="item.meta.icon" ></icon>
          				<span>{{item.name}}</span>
					</template>
					<el-menu-item  :index="obj.path" v-for="obj in item.children" :key="obj.path"  >
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
import { asyncRoutes } from '@/ui/router';
import logo from './assets/img/logo.png';
import bell from './assets/img/ic_bell.png';
import esc from './assets/img/ic_esc.png';
import usericon from './assets/img/usericon.png';
import Breadcrumb from './components/Breadcrumb/index';
import Icon from '@components/Icon-svg/index';
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
		tipsNumber:0,
		logo,
		bell,
		esc,
		usericon,
		routePath:this.$route.path,
		isOpen:false
      }
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
		
	},
	mounted(){
      postal.subscribe({
			channel: 'websocket_msg',
			topic: 'message',
			callback: async data => {
				this.tipsNumber = data.content.count;
				this.$notify({
					title: '收到一条消息',
					message: data.content.content,
					position: 'bottom-right'
				});
			}
		});
		postal.subscribe({
			channel: 'websocket_count',
			topic: 'count',
			callback: async data => {
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
			this.$router.push({ path: '/' });
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
		.header-right{
			position: absolute;
			right: 0px;
			color: #fff;
			img{
				vertical-align: text-bottom;
				margin-right: 8px;
				width: 16px;
				height:16px;
			}
			.bell_tips{
				position: absolute;
				left:95px;
				top: -11px;
				padding: 1px;
				background: #E93570;
				color: #fff;
				border-radius: 5px;
				font-size:10px;
				font-style:normal;
				font-family:SourceHanSansCN-Medium,SourceHanSansCN;
				font-weight:500;
				line-height:10px;
			}
			span{
				margin-right: 15px;
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
	/deep/ .spread-icon{
		position: absolute;
		left: 150px;
		top: 50%;
		width: 8px;
		height:45px;
		cursor: pointer;
		z-index: 9999999999;
	}
	/deep/ .open-spread-icon{
		left: 0px;
		transform:rotate(180deg);
	}
	
}

</style>