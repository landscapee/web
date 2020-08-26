import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@components/layout';

Vue.use(Router);

let authRoutes = [
  {
    	path: '/qualityManage',
		component: Layout,
		redirect: '/personDoc',
		name: '质量管理',
		meta: {title: '质量管理',icon: 'zlgl' },
		children: [
            {
                path: '/personDoc',
                component: () => import('@views/qualityManage/personDoc/index'),
                name: '人员档案',
                meta: {	title: '人员档案',icon: ''},
                children:[
                    {
                        path: '/addPersonDoc',
                        component: () => import('@views/qualityManage/personDoc/add/addPersonDoc'),
                        name: '新增',
                        meta: {	title: '新增',	icon: '',paramsId:''	},
                        hidden:true,
                        children:[
                            {
                                path: '/inOfficeInfoAdd',
                                component: () => import('@views/qualityManage/personDoc/add/inOfficeInfo/add'),
                                name: '任职信息新增',
                                meta: {	title: '任职信息新增',	icon: ''	},
                                hidden:true,

                            },  {
                                path: '/workExperienceAdd',
                                component: () => import('@views/qualityManage/personDoc/add/workExperience/add'),
                                name: '工作经验新增',
                                meta: {	title: '工作经验新增',	icon: ''	},
                                hidden:true,

                            }, {
                                path: '/certificateAdd',
                                component: () => import('@views/qualityManage/personDoc/add/certificate/add'),
                                name: '证书新增',
                                meta: {	title: '证书新增',	icon: ''	},
                                hidden:true,

                            },{
                                path: '/unsafeAdd',
                                component: () => import('@views/qualityManage/personDoc/add/unsafe/add'),
                                name: '不安全事件及诚信记录新增',
                                meta: {	title: '不安全事件及诚信记录新增',	icon: ''	},
                                hidden:true,

                            },

                        ]
                    },
                    {
                        path: '/userQuali',
                        component: () => import('@views/qualityManage/components/userQuali'),
                        name: '员工资质',
                        meta: {	title: '员工资质',	icon: ''	},
                        hidden:true
                    },
                    {
                        path: '/userAuth',
                        component: () => import('@views/qualityManage/components/userAuth'),
                        name: '员工授权',
                        meta: {	title: '员工授权',	icon: ''	},
                        hidden:true
                    },
                    {
                        path: '/userTrain',
                        component: () => import('@views/qualityManage/components/userTrain.vue'),
                        name: '培训考核',
                        meta: {	title: '培训考核',	icon: ''	},
                        hidden:true
                    }
                ]
            },
			{
				path: '/intelligenceManage',
				component: () => import('@views/qualityManage/intelligenceManage/index'),
				name: '资质管理',
				meta: {	title: '资质管理',	icon: '',keepAlive:true	},
				children:[
					{
						path: '/addQualifications',
						component: () => import('@views/qualityManage/intelligenceManage/add'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
					{
						path: '/addQualificationsDetails',
						component: () => import('@views/qualityManage/intelligenceManage/addDetails'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
                    {
                        path: '/ZuserDoc',
                        component: () => import('@views/qualityManage/components/userDoc/index'),
                        name: '员工档案',
                        meta: {	title: '员工档案',	icon: ''	},
                        hidden:true
                    },
                    {
                        path: '/ZuserAuth',
                        component: () => import('@views/qualityManage/components/userAuth'),
                        name: '员工授权',
                        meta: {	title: '员工授权',	icon: ''	},
                        hidden:true
                    },
                    {
                        path: '/ZuserTrain',
                        component: () => import('@views/qualityManage/components/userTrain.vue'),
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
						component: () => import('@views/qualityManage/authorizeManage/add'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
                    {
                        path: '/SuserQuali',
                        component: () => import('@views/qualityManage/components/userQuali'),
                        name: '员工资质',
                        meta: {	title: '员工资质',	icon: ''	},
                        hidden:true
                    },
                    {
                        path: '/SuserDoc',
                        component: () => import('@views/qualityManage/components/userDoc/index'),
                        name: '员工档案',
                        meta: {	title: '员工档案',	icon: ''	},
                        hidden:true
                    },
                    {
                        path: '/SuserTrain',
                        component: () => import('@views/qualityManage/components/userTrain.vue'),
                        name: '培训考核',
                        meta: {	title: '培训考核',	icon: ''	},
                        hidden:true
                    }
				]
			},

			{
				path: '/selfCheckPlan',
				component: () => import('@views/qualityManage/selfCheckPlan/index'),
				name: '自查计划',
				meta: {title: '自查计划',icon: '',keepAlive: true},
				children:[
                    {
                        path: '/selfCheckPlanAdd',
                        component: () => import('@views/qualityManage/selfCheckPlan/add'),
                        name: '法定自查检查计划新增',
                        meta: {title: '法定自查检查计划新增',icon: ''},
                    },
					{
                        path: '/selfCheckPlanDetails',
                        component: () => import('@views/qualityManage/selfCheckPlan/planDetailsAdd.vue'),
                        name: '法定自查检查计划明细新增',
                        meta: {title: '法定自查检查计划明细新增',icon: ''},
                    },
				]
			},
			{
				path: '/safetyPerformance',
				component: () => import('@views/qualityManage/safetyPerformance/index'),
				name: '安全绩效',
				meta: {title: '安全绩效',icon: '',keepAlive: true},
				children:[
                    {
                        path: '/safetyPerformanceAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/add'),
                        name: '部门月度安全绩效新增',
                        meta: {title: '部门月度安全绩效新增',icon: ''},
                    },
					{
                        path: '/safetyPerformanceDetailsAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/detailsAdd'),
                        name: '安全绩效明细新增',
                        meta: {title: '安全绩效明细新增',icon: ''},
                    },{
                        path: '/safetyPerformanceYear',
                        component: () => import('@views/qualityManage/safetyPerformance/year/index'),
                        name: '部门年度安全绩效',
                        meta: {title: '部门年度安全绩效',icon: ''},
                    },
				]
			},
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
                        meta: {title: '危险数据新增',icon: '',keepAlive:true},
					},

				]
			},
		],
	},
	{
		path: '/WorkOrderManage',
		component: Layout,
		redirect: '/WorkTemplate',
		name: '工单管理',
		meta: {title: '工单管理',icon: 'gdgl' },
		children: [
            // {
            //     path: '/orderEditorDemo',
            //     component: () => import('@views/orderEditorDemo/index.vue'),
            //     name: '编辑',
            //     meta: {title: '编辑',icon: '',keepAlive:true},
            // },
            {
                path: '/WorkTemplate',
                component: () => import('@views/workOrder/workTemplate/index'),
                name: '模板管理',
                meta: {title: '模板管理',icon: 'xxgl' },
                children:[
                    {
                        path: '/WorkTemplateAdd',
                        component: () => import('@views/workOrder/workTemplate/add/index'),
                        name: '新增工单模板配置',
                        meta: {title: '新增工单模板配置',icon: 'xxgl' },
                    }
                ]
            },
            {
                path: '/signControl',
                component: () => import('@views/workOrder/signControl/index'),
                name: '完工签署',
                meta: {title: '完工签署',icon: 'xxgl' },
                children:[
                    {
                        path: '/signControlAdd',
                        component: () => import('@views/workOrder/signControl/add'),
                        name: '完工签署详情',
                        meta: {title: '完工签署详情',icon: 'xxgl' },
                    },
                    {
                        path: '/WorkAbnormalDetails',
                        component: () => import('@views/workOrder/abnormal/details'),
                        name: '异常更改',
                        meta: {title: '异常更改',icon: 'xxgl' },
                    },
                    {
                        path: '/WorkPaperDetails',
                        component: () => import('@views/workOrder/abnormal/detailsPaper.vue'),
                        name: '异常更改',
                        meta: {title: '异常更改',icon: 'xxgl' },
                    },
                    {
                        path: '/WorkAbnormalAdd',
                        component: () => import('@views/workOrder/abnormal/add'),
                        name: '纸制填报工单导入',
                        meta: {title: '纸制填报工单导入',icon: 'xxgl' },
                    },
                ]
            },
            // {
            //     path: '/WorkAbnormal',
            //     component: () => import('@views/workOrder/abnormal/index'),
            //     name: '异常管理',
            //     meta: {title: '工单异常管理',icon: 'xxgl' },
            //     children:[
            //         {
            //             path: '/WorkAbnormalDetails',
            //             component: () => import('@views/workOrder/abnormal/details'),
            //             name: '工单详情',
            //             meta: {title: '工单详情',icon: 'xxgl' },
            //         },
            //         {
            //             path: '/WorkPaperDetails',
            //             component: () => import('@views/workOrder/abnormal/detailsPaper.vue'),
            //             name: '工单详情',
            //             meta: {title: '工单详情',icon: 'xxgl' },
            //         },
            //         {
            //             path: '/WorkAbnormalAdd',
            //             component: () => import('@views/workOrder/abnormal/add'),
            //             name: '纸制填报工单导入',
            //             meta: {title: '纸制填报工单导入',icon: 'xxgl' },
            //         },
            //     ],
            //     hidden:true
            // },
            {
                path: '/workOrderChange',
                component: () => import('@views/workOrder/workOrderChange/index'),
                name: '变更审核',
                meta: {title: '变更审核',icon: 'xxgl' },
                children:[

                ]
            },
        ],
	},
	{
		path: '/WorkOrderManage3',
		component: Layout,
		redirect: '/templateManage',
		name: '收费管理',
		meta: {title: '收费管理',icon: 'sfgl' },
		children: [
            {
				path: '/templateManage',
				component: () => import('@views/chargeManage/templateManage/index'),
				name: '模板管理',
                meta: {title: '模板管理',icon: 'xxgl' },
                children:[
                    {
                        path: '/templateAdd',
                        component: () => import('@views/chargeManage/templateManage/templateAdd'),
                        name: '新增',
                        meta: {title: '新增',icon: 'xxgl' }
                    },
                    {
                        path: '/templateHistory',
                        component: () => import('@views/chargeManage/templateManage/templateHistory'),
                        name: '历史版本',
                        meta: {title: '历史版本',icon: 'xxgl' }
                    }
                ]
            },
            {
				path: '/chargeOrders',
				component: () => import('@views/chargeManage/chargeOrders/index'),
				name: '收费单',
                meta: {title: '收费单',icon: 'xxgl' },
                children:[
                    {
                        path: '/chargeOrderAdd',
                        component: () => import('@views/chargeManage/chargeOrders/chargeOrderAdd'),
                        name: '新增',
                        meta: {title: '新增',icon: 'xxgl' }
                    }
                ]
            }
                
        ],
	},
	{
		path: '/WorkOrderManage5',
		component: Layout,
		redirect: '/fileManage',
		name: '技术资料',
		meta: {title: '技术资料',icon: 'jszl' },
		children: [
            {
				path: '/fileManage',
				component: () => import('@views/techKnowledge/fileManage/index'),
				name: '文件管理',
                meta: {title: '文件管理',icon: 'xxgl' },
                children:[
                    {
                        path: '/detail',
                        component: () => import('@views/techKnowledge/fileManage/detail/index'),
                        name: '工单',
                        meta: {title: '工单',icon: 'xxgl' }
                    },
                    {
                        path: '/addFile',
                        component: () => import('@views/techKnowledge/fileManage/detail/addFile'),
                        name: '新增文件',
                        meta: {title: '新增文件',icon: 'xxgl' },
                    },
                    {
                        path: '/batchPush',
                        component: () => import('@views/techKnowledge/fileManage/detail/batchPush'),
                        name: '批量推送',
                        meta: {title: '批量推送',icon: 'xxgl' },
                    },
                    {
                        path: '/fileHistory',
                        component: () => import('@views/techKnowledge/fileManage/detail/fileHistory'),
                        name: '工单历史版本',
                        meta: {title: '工单历史版本',icon: 'xxgl' },
                    },
                    {
                        path: '/readTrack',
                        component: () => import('@views/techKnowledge/fileManage/detail/readTrack'),
                        name: '工单阅读推送',
                        meta: {title: '工单阅读推送',icon: 'xxgl' },
                    }
                ]
            },
            {
                path:'/studyManage',
                component:() => import('@views/techKnowledge/studyManage/index'),
                name:'学习管理',
                meta: {title: '学习管理',icon: 'xxgl' }
            },
            {
                path:'/userManage',
                component:() => import('@views/techKnowledge/studyManage/userManage'),
                name:'个人管理',
                meta: {title: '个人管理',icon: 'xxgl' }
            }
        ],
	},
	{
		path: '/peixunKaohe',
		component: Layout,
		redirect: '/testMaintenance',
		name: '培训考核',
		meta: {title: '培训考核',icon: 'pxkh' },
		children: [
			{
				path: '/coursewareMaintain',
                component: () => import('@views/trainManage/coursewareMaintain/index'),
				name: '课件维护',
				meta: {title: '课件维护',icon: 'xxgl' },
                children:[
                    {
                        path: '/coursewareMaintainAdd',
                        component: () => import('@views/trainManage/coursewareMaintain/add'),
                        name: '课件维护新增',
                        meta: {title: '课件维护新增',icon: 'xxgl' },

                    },
                ]
			},
			{
				path: '/testMaintenance',
				component: () => import('@views/trainManage/testMaintenance/index'),
				name: '试卷维护',
				meta: {title: '试卷维护',icon: 'xxgl' , },
                children:[
					{
                        path: '/testMaintenanceAdd',
                        component: () => import('@views/trainManage/testMaintenance/add'),
                        name: '试卷新增',
                        meta: {title: '试卷新增',icon: 'xxgl' },
                        children:[

                        ]
					},
					{
                        path: '/testMaintenanceAddAdd',
                        component: () => import('@views/trainManage/testMaintenance/addAdd'),
                        name: '试题维护',
                        meta: {title: '试题维护',icon: 'xxgl' },
                        children:[

                        ]
					},{
                        path: '/testMaintenanceSee',
                        component: () => import('@views/trainManage/testMaintenance/see'),
                        name: '预览',
                        meta: {title: '预览',icon: 'xxgl' },
                        children:[

                        ]
					},
				]
			},
			{
				path: '/trainManageAdmin',
                component: () => import('@views/trainManage/trainManageAdmin/index'),
				name: '培训管理',
				meta: {title: '培训管理',icon: 'xxgl' },
                children:[
                    {
                        path: '/trainManageAdminAdd',
                        component: () => import('@views/trainManage/trainManageAdmin/add'),
                        name: '培训管理新增',
                        meta: {title: '培训管理新增',icon: 'xxgl' },
                    },
					{
                        path: '/trainManageAdminPush',
                        component: () => import('@views/trainManage/trainManageAdmin/pushStaff.vue'),
                        name: '培训推送员工',
                        meta: {title: '培训推送员工',icon: 'xxgl' },
                    },
					{
                        path: '/trainManageAdminResults',
                        component: () => import('@views/trainManage/trainManageAdmin/trainResults/index'),
                        name: '员工培训结果',
                        meta: {title: '员工培训结果',icon: 'xxgl',paramsId:''  },
                        children:[
                            {
                                path: '/trainManageAdminResultsAdd',
                                component: () => import('@views/trainManage/trainManageAdmin/trainResults/add'),
                                name: '培训管理新增',
                                meta: {title: '培训管理新增',icon: 'xxgl' },
                            },
                        ]
                    },


                ]
			},
			{
				path: '/trainManageUser',
                component: () => import('@views/trainManage/trainManageUser/index'),
				name: '我的培训',
				meta: {title: '我的培训',icon: 'xxgl' },
                children:[
                    {
                        path: '/trainManageUserAdd',
                        component: () => import('@views/trainManage/trainManageUser/add'),
                        name: '我的培训详情',
                        meta: {title: '我的培训详情',icon: 'xxgl' },
                    },
                ]
			},
			{
				path: '/testManage',
				component: () => import('@views/trainManage/testManage/index'),
				name: '考试管理',
				meta: {title: '考试管理',icon: 'xxgl' },
                children:[
                    {
                        path: '/testManageAdd',
                        component: () => import('@views/trainManage/testManage/add'),
                        name: '考试管理-新增',
                        meta: {title: '考试管理-新增',icon: 'xxgl' },
                        children:[

                        ]
                    },
                    {
                        path: '/testManagePushStaff',
                        component: () => import('@views/trainManage/testManage/pushStaff.vue'),
                        name: '考试推送员工',
                        meta: {title: '考试推送员工',icon: 'xxgl' },

                    },

                    {
                        path: '/testManageResults',
                        component: () => import('@views/trainManage/testManage/testResults.vue'),
                        name: '员工考试结果',
                        meta: {title: '员工考试结果',icon: 'xxgl' },

                    },
                ]
			},
			{
				path: '/onlineTestIndex',
				component:() => import('@views/trainManage/onlineTest/index.vue'),
				name: '在线考试',
				meta: {title: '在线考试',icon: 'xxgl' },
                children:[
					{   path: '/onlineTestDo',
                        component: () => import('@views/trainManage/onlineTest/add.vue'),
                        name: '在线考试',
                        meta: {title: '在线考试',icon: 'xxgl' },
					},
				]
			},
			{
				path: '/assessManageAdmin',
                component: () => import('@views/trainManage/assessManageAdmin/index'),
				name: '考核管理',
				meta: {title: '考核管理',icon: 'xxgl' },


			},
		],
	},
	{
		path: '/WorkOrderManage55',
		component: Layout,
		redirect: '/WorkOrderManage66',
		name: '查询统计',
		meta: {title: '查询统计',icon: 'cxtj' },
		children: [],
	},
	{
		path: '/msgManage',
		component: Layout,
		redirect: '/warningConfig',
		name: '消息管理',
		meta: {title: '消息管理',icon: 'xxgl' },
		children: [
			{
				path: '/warningConfig',
				component: () => import('@views/msgManage/warningConfig/index'),
				name: '预警配置',
				meta: {title: '预警配置',icon: '' },
				children:[
					{
						path: '/addWarningConfig',
						component: () => import('@views/msgManage/warningConfig/components/addWarningConfig'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					}
				]
			},{
				path: '/warningSearch',
				component: () => import('@views/msgManage/warningSearch/index'),
				name: '预警查询',
				meta: {title: '预警查询',icon: ''},
				children:[
					{
						path: '/historyWarning',
						component: () => import('@views/msgManage/warningSearch/components/historyWarning'),
						name: '历史',
						meta: {	title: '历史',	icon: ''	},
						hidden:true
					}
				]
			},{
				path: '/subscribeConfig',
				component: () => import('@views/msgManage/subscribeConfig/index'),
				name: '订阅配置',
				meta: {title: '订阅配置',icon: '' },
				children:[
					{
						path: '/addSubscribeConfig',
						component: () => import('@views/msgManage/subscribeConfig/components/addSubscribeConfig'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					}
				]
			},{
				path: '/infoPlate',
				component: () => import('@views/msgManage/infoPlate/index'),
				name: '信息平台',
				meta: {title: '信息平台',icon: ''},
				children:[
					{
						path: '/addInfoPlate',
						component: () => import('@views/msgManage/infoPlate/components/addInfoPlate'),
						name: '新增',
						meta: {	title: '新增',	icon: ''	},
						hidden:true
					},
					{
						path: '/infoPlateDetails',
						component: () => import('@views/msgManage/infoPlate/components/infoPlateDetails'),
						name: '详情',
						meta: {	title: '详情',	icon: ''	},
						hidden:true
					},
					{
						path: '/historyInfoPlate',
						component: () => import('@views/msgManage/infoPlate/components/historyInfoPlate'),
						name: '历史',
						meta: {	title: '历史',	icon: ''	},
						hidden:true
					}
				]
			},
		],
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
				meta: {title: '业务数据类型',icon: '',keepAlive: true },
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
