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
					},
					{
						path: '/userQuali',
						component: () => import('@views/qualityManage/personDoc/components/userQuali'),
						name: '员工资质',
						meta: {	title: '员工资质',	icon: ''	},
						hidden:true
					},
					{
						path: '/userAuth',
						component: () => import('@views/qualityManage/personDoc/components/userAuth'),
						name: '员工授权',
						meta: {	title: '员工授权',	icon: ''	},
						hidden:true
					},
					{
						path: '/userAssRecord',
						component: () => import('@views/qualityManage/personDoc/components/userAssRecord'),
						name: '培训考核',
						meta: {	title: '培训考核',	icon: ''	},
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
					},
					{
						path: '/authUserQuali',
						component: () => import('@views/qualityManage/authorizeManage/components/userQuali'),
						name: '员工资质',
						meta: {	title: '员工资质',	icon: ''	},
						hidden:true
					},
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
			{
				path: '/selfCheckPlan',
				component: () => import('@views/qualityManage/selfCheckPlan/index'),
				name: '自查计划',
				meta: {title: '自查计划',icon: ''},
				children:[
                    {
                        path: '/safetyInformationAdd',
                        component: () => import('@views/qualityManage/safetyInformation/add'),
                        name: '法定自查检查计划新增',
                        meta: {title: '法定自查检查计划新增',icon: ''},
                    },
					// {
                    //     path: '/safetyInformationAddDetails',
                    //     component: () => import('@views/qualityManage/safetyInformation/planDetailsAdd.vue'),
                    //     name: '法定自查检查计划明细新增',
                    //     meta: {title: '法定自查检查计划明细新增',icon: ''},
                    // },
				]
			},
			// {
			// 	path: '/safetyPerformance',
			// 	component: () => import('@views/qualityManage/safetyPerformance/index'),
			// 	name: '安全绩效',
			// 	meta: {title: '安全绩效',icon: ''},
			// 	children:[
            //         // {
            //         //     path: '/safetyInformationAdd',
            //         //     component: () => import('@views/qualityManage/safetyPerformance/addMonth'),
            //         //     name: '部门月度安全绩效新增',
            //         //     meta: {title: '部门月度安全绩效新增',icon: ''},
            //         // },
			// 		// {
            //         //     path: '/safetyInformationAdd',
            //         //     component: () => import('@views/qualityManage/safetyPerformance/add'),
            //         //     name: '安全绩效明细新增',
            //         //     meta: {title: '安全绩效明细新增',icon: ''},
            //         // },{
            //         //     path: '/safetyInformationAdd',
            //         //     component: () => import('@views/qualityManage/safetyPerformance/add'),
            //         //     name: '部门年度安全绩效',
            //         //     meta: {title: '部门年度安全绩效',icon: ''},
            //         // },
			// 	]
			// },
			{
				path: '/safetyInformationIndex',
				component: () => import('@views/qualityManage/safetyInformation/index'),
				name: '安全信息',
				meta: {title: '安全信息',icon: ''},
				children:[
                    {
                        path: '/safetyInformationAdd',
                        component: () => import('@views/qualityManage/safetyInformation/add'),
                        name: '安全信息新增',
                        meta: {title: '安全信息新增',icon: ''},
                    },
				]
			},
			{
				path: '/dangerousDataIndex',
				component: () => import('@views/qualityManage/dangerousData/index'),
				name: '危险数据',
				meta: {title: '危险数据',icon: ''},
				children:[
					{
                        path: '/dangerousDataAdd',
                        component: () => import('@views/qualityManage/dangerousData/add'),
                        name: '危险数据新增',
                        meta: {title: '危险数据新增',icon: ''},
					},

				]
			},
		],
	},
	{
		path: '/WorkOrderManage',
		component: Layout,
		redirect: '/WorkOrderManage',
		name: '工单管理',
		meta: {title: '工单管理',icon: 'gdgl' },
		children: [],
	},
	{
		path: '/WorkOrderManage',
		component: Layout,
		redirect: '/WorkOrderManage',
		name: '收费管理',
		meta: {title: '收费管理',icon: 'sfgl' },
		children: [],
	},
	{
		path: '/WorkOrderManage',
		component: Layout,
		redirect: '/WorkOrderManage',
		name: '技术资料',
		meta: {title: '技术资料',icon: 'jszl' },
		children: [],
	},
	{
		path: '/peixunKaohe',
		component: Layout,
		redirect: '/WorkOrderManage',
		name: '培训考核',
		meta: {title: '培训考核',icon: 'pxkh' },
		children: [
			{
				path: '/WorkOrderManage',
				component: ()=>{},
				name: '课件维护',
				meta: {title: '课件维护',icon: 'xxgl' },
			},
			{
				path: '/WorkOrderManage',
				component: ()=>{},
				name: '试题维护',
				meta: {title: '试题维护',icon: 'xxgl' },
			},
			{
				path: '/WorkOrderManage',
				component: ()=>{},
				name: '培训管理',
				meta: {title: '培训管理',icon: 'xxgl' },
			},
			{
				path: '/WorkOrderManage',
				component: ()=>{},
				name: '考试管理',
				meta: {title: '考试管理',icon: 'xxgl' },
			},
			{
				path: '/WorkOrderManage',
				component: ()=>{},
				name: '在线考试',
				meta: {title: '在线考试',icon: 'xxgl' },
			},
			{
				path: '/WorkOrderManage',
				component: ()=>{},
				name: '考核管理',
				meta: {title: '考核管理',icon: 'xxgl' },
			},
		],
	},
	{
		path: '/WorkOrderManage',
		component: Layout,
		redirect: '/WorkOrderManage',
		name: '查询统计',
		meta: {title: '查询统计',icon: 'cxtj' },
		children: [],
	},
	{
		path: '/WorkOrderManage',
		component: Layout,
		redirect: '/WorkOrderManage',
		name: '消息管理',
		meta: {title: '消息管理',icon: 'xxgl' },
		children: [],
	},
	{
		path: '/basicData',
		component: Layout,
		redirect: '/businessData',
		name: '基础数据',
		meta: {title: '基础数据',icon: 'xxgl' },
		children: [
			{
				path: '/businessData',
				component: () => import('@views/basicData/businessData/index'),
				name: '业务数据类型',
				meta: {title: '业务数据类型',icon: '' },
				children:[
					{
						path: '/editBusinessData',
						component: () => import('@views/basicData/businessData/components/editBusinessData'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
					{
						path: '/editBusinessSubset',
						component: () => import('@views/basicData/businessData/components/editBusinessSubset'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
				]
			},
			{
				path: '/sysParameter',
				component:  () => import('@views/basicData/sysParameter/index'),
				name: '系统参数',
				meta: {title: '系统参数',icon: '' },
				children:[
					{
						path: '/addSysParameter',
						component: () => import('@views/basicData/sysParameter/components/addSysParameter'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
				]
			},
			{
				path: '/electronicFence',
				component: () => import('@views/basicData/electronicFence/index'),
				name: '机位电子围栏',
				meta: {title: '机位电子围栏',icon: '' },
				children:[
					{
						path: '/addElectronicFence',
						component: () => import('@views/basicData/electronicFence/components/addElectronicFence'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
				]
			}
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

