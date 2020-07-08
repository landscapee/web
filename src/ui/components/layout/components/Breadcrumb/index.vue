<template>
	<div class="breadcrumb_main">
		<transition-group name="breadcrumb">
			<span v-for="(item, index) in levelList" :key="item.path">

				<img v-if="index == 0" :src="ic_arrow"  class="source_img"/>
				<img v-if="index != 0" :src="ic_arrow_2" class="arrow_img"/>
				<span v-if="index == levelList.length - 1" class="no-redirect no-redirect-last">{{ item.meta.title }}</span>
				<a v-else @click.prevent="handleLink(item)" class="no-redirect">{{ item.meta.title }}</a>
			</span>
		</transition-group>
	</div>
</template>

<script>
import pathToRegexp from 'path-to-regexp';
import ic_arrow from '../../assets/img/ic_arrow.png';
import ic_arrow_2 from '../../assets/img/ic_arrow_2.png';

export default {
	data() {
		return {
			levelList: null,
			ic_arrow,
			ic_arrow_2
		};
	},
	watch: {
		$route() {
			this.getBreadcrumb();
		},
	},
	created() {
		this.getBreadcrumb();
	},
	methods: {
		getBreadcrumb() {
			// only show routes with meta.title
			let matched = this.$route.matched.filter((item) => item.meta && item.meta.title);
			const first = matched[0];

			// if (!this.isDashboard(first)) {
			//   matched = [{ path: '/home', meta: { title: '首页' }}].concat(matched)
			// }

            this.levelList = matched.filter((item) => item.meta && item.meta.title && item.meta.breadcrumb !== false);
            console.log(this.levelList)
		},
		isDashboard(route) {
			const name = route && route.name;
			if (!name) {
				return false;
			}
			return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase();
		},
		pathCompile(path) {
			// To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
			const { params } = this.$route;
			var toPath = pathToRegexp.compile(path);
			return toPath(params);
		},
		handleLink(item) {
			const { redirect, path } = item;
			if (redirect) {
				this.$router.push(redirect);
				return;
			}
			this.$router.push(path);
		},
	},
};
</script>

<style lang="scss" scoped>
.breadcrumb_main{
	display: flex;
	align-items: center;
	height: 40px;
	width: 100%;

	color: #6A7785;
	border-bottom:solid 1px #E4E8EB;
	img{
		vertical-align: top;
	}
	.source_img{
		margin:0px 6px 0px 30px;
		height: 16px;
		width: 16px;
	}
	.arrow_img{
		margin:1px 2px 0px 2px;
		height: 14px;
		width: 14px;
	}
	.no-redirect{
		cursor: pointer;
	}
}
</style>
