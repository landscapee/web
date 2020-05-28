import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@components/layout';

Vue.use(Router);

let authRoutes = [
  {
    	path: '/qualityManage',
		component: Layout,
		redirect: '/intelligenceManage',
		name: '质量管理',
		meta: {title: '质量管理',icon: 'zlgl' },
		children: [
			{
				path: '/intelligenceManage',
				component: () => import('@views/qualityManage/intelligenceManage/index'),
				name: '资质管理',
				meta: {	title: '资质管理',	icon: ''	},
				children:[
					{
						path: '/addQualifications',
						component: () => import('@views/qualityManage/intelligenceManage/components/addQualifications'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
					{
						path: '/assRecord',
						component: () => import('@views/qualityManage/intelligenceManage/components/assRecord'),
						name: '资质培训考核记录',
						meta: {	title: '资质培训考核记录',	icon: ''	},
						hidden:true
					},
					{
						path: '/exaRecord',
						component: () => import('@views/qualityManage/intelligenceManage/components/exaRecord'),
						name: '人员资质考试记录',
						meta: {	title: '人员资质考试记录',	icon: ''	},
						hidden:true
					}
				]
			},
			{
				path: '/personDoc',
				component: () => import('@views/qualityManage/personDoc/index'),
				name: '人员档案',
				meta: {	title: '人员档案',icon: ''},
				children:[
					{
						path: '/addPersonDoc',
						component: () => import('@views/qualityManage/personDoc/components/addPersonDoc'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					}
				]
			},
			{
				path: '/authorizeManage',
				component: () => import('@views/qualityManage/authorizeManage/index'),
				name: '授权管理',
				meta: {title: '授权管理',	icon: ''},
				children:[
					{
						path: '/addAuthorizeManage',
						component: () => import('@views/qualityManage/authorizeManage/components/addAuthorizeManage'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					}
				]
			},
			{
				path: '/warningManage',
				component: () => import('@views/qualityManage/warningManage/index'),
				name: '预警管理',
				meta: {title: '预警管理',icon: ''},
				children:[
					{
						path: '/addWarningManage',
						component: () => import('@views/qualityManage/warningManage/components/addWarningManage'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					}
				]
			},
		],
	}
];
let defaultRoutes = [
  {path: '/',name: 'login',	component: () => import('@views/login/login')},
  {path: '/table',name: 'table',	component: () => import('@views/table/table')},
  {path: '/workOrder',name: 'workOrder',	component: () => import('@views/workOrder/workOrder')},
  {path: '/404',component: () => import('@views/notFound/404')},

];
//无权限
export const constantRoutes = defaultRoutes;
//带权限
export const asyncRoutes = authRoutes;

const createRouter = () =>
	new Router({
		scrollBehavior: () => ({x: 0, y: 0 }),
		routes: constantRoutes.concat(asyncRoutes),
		fallback: false,
	});
const router = createRouter();

export function resetRouter() {
	const newRouter = createRouter();
	router.matcher = newRouter.matcher;
}
export default router;

