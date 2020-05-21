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
      },
      {
				path: '/personDoc',
				component: () => import('@views/qualityManage/personDoc/index'),
				name: '人员档案',
				meta: {	title: '人员档案',icon: ''},
      },
      {
				path: '/authorizeManage',
				component: () => import('@views/qualityManage/authorizeManage/index'),
				name: '授权管理',
				meta: {title: '授权管理',	icon: ''},
      },
      {
				path: '/warningManage',
				component: () => import('@views/qualityManage/warningManage/index'),
				name: '预警管理',
				meta: {title: '预警管理',icon: ''},
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

