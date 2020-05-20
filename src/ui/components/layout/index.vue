<template>
<el-container class="layout-container">
  <el-aside width="200px" class="left-menu" >
    <el-menu v-for="(item,index) in asyncRoutes"   :key="index" >
      <el-submenu :index="index" >
        <template slot="title">{{item.name}}</template>
		<el-menu-item  :index="index2" v-for="(obj,index2) in item.children" :key="index2">{{obj.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </el-aside>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span>王小虎</span>
    </el-header>
    <el-main>
      <router-view :key="key" />
    </el-main>
  </el-container>
</el-container>
</template>
<script>
import { asyncRoutes } from '@/ui/router';
  export default {
    data() {
      return {
		routeMenu:[],
		asyncRoutes
      }
	},
	computed: {
		key() {
			return this.$route.path;
		},
	},
  };
</script>

<style lang="scss" scoped>
.layout-container{
	height: 100%;
	/deep/ .el-menu{
		border:0px;
		background: unset;
		.el-menu-item{
			background: #162C41;
			color: #fff;
		}
		/deep/ .is-active:not(.el-submenu__title){
			background: #3280E7;
		}
		.el-submenu__title{
			color: #fff;
		}
		.el-submenu__title:hover{
			background: unset;
		}
	}
	.left-menu{
		background-image: url('./assets/img/leftNav.png');
	}
}

</style>