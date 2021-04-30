import Vue from 'vue';
import Router from 'vue-router';
import Layout from '@components/layout';

const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router);

let authRoutes = [
    {
        path: '/qualityManage',
        component: Layout,
        redirect: '/personDoc',
        name: '质量管理',
         meta: {title: '质量管理', icon: 'zlgl', roles: ['R_qualityManage']},
        children: [
            {
                path: '/personDoc',
                component: () => import('@views/qualityManage/personDoc/index'),
                name: '人员档案',
                meta: {title: '人员档案', icon: '', roles: ['R_qualityManage/personDoc']},
                children: [
                    {
                        path: '/addPersonDoc/:id',
                        component: () => import('@views/qualityManage/personDoc/add/addPersonDoc'),
                        name: 'D新增',
                        meta: {title: '新增', icon: '', paramsId: '', roles: ['R_qualityManage/addPersonDoc']},
                        hidden: true,
                        children: [
                            {
                                path: '/inOfficeInfoAdd/:id',
                                component: () => import('@views/qualityManage/personDoc/add/inOfficeInfo/add'),
                                name: 'D任职信息新增',
                                meta: {title: '任职信息新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/infoinOfficeInfoAdd',
                                component: () => import('@views/qualityManage/personDoc/add/inOfficeInfo/add'),
                                name: 'D任职信息详情',
                                meta: {title: '任职信息详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/workExperienceAdd/:id',
                                component: () => import('@views/qualityManage/personDoc/add/workExperience/add'),
                                name: 'D工作经验新增',
                                meta: {title: '工作经验新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/infoworkExperienceAdd',
                                component: () => import('@views/qualityManage/personDoc/add/workExperience/add'),
                                name: 'D工作经验详情',
                                meta: {title: '工作经验详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/certificateAdd/:id',
                                component: () => import('@views/qualityManage/personDoc/add/certificate/add'),
                                name: 'D证书新增',
                                meta: {title: '证书新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/infocertificateAdd',
                                component: () => import('@views/qualityManage/personDoc/add/certificate/add'),
                                name: 'D证书详情',
                                meta: {title: '证书详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/unsafeAdd/:id',
                                component: () => import('@views/qualityManage/personDoc/add/unsafe/add'),
                                name: 'D不安全事件及诚信记录新增',
                                meta: {title: '不安全事件及诚信记录新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/infounsafeAdd',
                                component: () => import('@views/qualityManage/personDoc/add/unsafe/add'),
                                name: 'D不安全事件及诚信记录详情',
                                meta: {title: '不安全事件及诚信记录详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/workStyle/:id',
                                component: () => import('@views/qualityManage/personDoc/add/workWay/add'),
                                name: 'D作风建设量化考核记录新增',
                                meta: {title: '作风建设量化考核记录新增', icon: ''},
                                hidden: true,
                            }, {
                                path: '/infoworkStyle',
                                component: () => import('@views/qualityManage/personDoc/add/workWay/add'),
                                name: 'D作风建设量化考核记录详情',
                                meta: {title: '作风建设量化考核记录详情', icon: ''},
                                hidden: true,
                            },

                        ]
                    },
                    {
                        path: '/infoaddPersonDoc',
                        component: () => import('@views/qualityManage/personDoc/add/addPersonDoc'),
                        name: '人员档案详情',
                        meta: {title: '详情', icon: '', paramsId: '', roles: ['R_qualityManage/infoaddPersonDoc']},
                        hidden: true,
                        children: [
                            {
                                path: '/infoinOfficeInfoAdd1',
                                component: () => import('@views/qualityManage/personDoc/add/inOfficeInfo/add'),
                                name: 'x任职信息详情',
                                meta: {title: '任职信息详情', icon: ''},
                                hidden: true,
                            },
                            {
                                path: '/infoworkExperienceAdd1',
                                component: () => import('@views/qualityManage/personDoc/add/workExperience/add'),
                                name: 'x工作经验详情',
                                meta: {title: '工作经验详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/infocertificateAdd1',
                                component: () => import('@views/qualityManage/personDoc/add/certificate/add'),
                                name: 'x证书详情',
                                meta: {title: '证书详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/infounsafeAdd1',
                                component: () => import('@views/qualityManage/personDoc/add/unsafe/add'),
                                name: 'x不安全事件及诚信记录详情',
                                meta: {title: '不安全事件及诚信记录详情', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/infoworkStyle1',
                                component: () => import('@views/qualityManage/personDoc/add/workWay/add'),
                                name: 'x作风建设量化考核记录详情',
                                meta: {title: '作风建设量化考核记录详情', icon: ''},
                                hidden: true,
                            },

                        ]
                    },

                    {
                        path: '/userQuali',
                        component: () => import('@views/qualityManage/components/userQuali'),
                        name: 'D员工资质',
                        meta: {title: '员工资质', icon: ''},
                        hidden: true
                    },
                    {
                        path: '/userAuth',
                        component: () => import('@views/qualityManage/components/userAuth'),
                        name: 'D员工授权',
                        meta: {title: '员工授权', icon: ''},
                        hidden: true
                    },
                    {
                        path: '/userTrain',
                        component: () => import('@views/qualityManage/components/userTrain.vue'),
                        name: 'D培训考核',
                        meta: {title: '培训考核', icon: ''},
                        hidden: true
                    },
                    {
                        path: '/studyLog',
                        component: () => import('@views/qualityManage/personDoc/studyLog.vue'),
                        name: 'D学习记录',
                        meta: {title: '学习记录', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/intelligenceManage',
                component: () => import('@views/qualityManage/intelligenceManage/index'),
                name: '资质管理',
                meta: {title: '资质管理', icon: '', keepAlive: true, roles: ['R_qualityManage/intelligenceManage']},
                children: [
                    {
                        path: '/addQualifications',
                        component: () => import('@views/qualityManage/intelligenceManage/add'),
                        name: '资质证书-新增',
                        meta: {title: '新增', icon: '', roles: ['R_qualityManage/addQualifications']},
                        hidden: true
                    },

                    {
                        path: '/editQualifications',
                        component: () => import('@views/qualityManage/intelligenceManage/add'),
                        name: '资质证书-编辑',
                        meta: {title: '编辑', icon: '', roles: ['R_qualityManage/addQualifications']},
                        hidden: true
                    },

                    {
                        path: '/addQualificationsDetails',
                        component: () => import('@views/qualityManage/intelligenceManage/addDetails'),
                        name: '资质证书清单-新增',
                        meta: {title: '新增', icon: '', roles: ['R_qualityManage/addQualificationsDetails']},
                        hidden: true
                    },
                    {
                        path: '/editQualificationsDetails',
                        component: () => import('@views/qualityManage/intelligenceManage/addDetails'),
                        name: '资质证书清单-编辑',
                        meta: {title: '新增', icon: '', roles: ['R_qualityManage/addQualificationsDetails']},
                        hidden: true
                    },
                    {
                        path: '/ZuserDoc',
                        component: () => import('@views/qualityManage/personDoc/add/addPersonDoc'),
                        // component: () => import('@views/qualityManage/components/userDoc/index'),
                        name: 'Z员工档案',
                        meta: {title: '员工档案', icon: ''},
                        hidden: true,
                        children: [
                            {
                                path: '/ZinOfficeInfoAdd',
                                component: () => import('@views/qualityManage/personDoc/add/inOfficeInfo/add'),
                                name: 'Z任职信息新增',
                                meta: {title: '任职信息新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/ZworkExperienceAdd',
                                component: () => import('@views/qualityManage/personDoc/add/workExperience/add'),
                                name: 'Z工作经验新增',
                                meta: {title: '工作经验新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/ZcertificateAdd',
                                component: () => import('@views/qualityManage/personDoc/add/certificate/add'),
                                name: 'Z证书新增',
                                meta: {title: '证书新增', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/ZunsafeAdd',
                                component: () => import('@views/qualityManage/personDoc/add/unsafe/add'),
                                name: 'Z不安全事件及诚信记录新增',
                                meta: {title: '不安全事件及诚信记录新增', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/ZworkStyle',
                                component: () => import('@views/qualityManage/personDoc/add/workWay/add'),
                                name: 'Z作风建设量化考核记录新增',
                                meta: {title: '作风建设量化考核记录新增', icon: ''},
                                hidden: true,
                            },

                        ]
                    },
                    {
                        path: '/ZuserAuth',
                        component: () => import('@views/qualityManage/components/userAuth'),
                        name: 'Z员工授权',
                        meta: {title: '员工授权', icon: ''},
                        hidden: true
                    },
                    {
                        path: '/ZuserTrain',
                        component: () => import('@views/qualityManage/components/userTrain.vue'),
                        name: 'Z培训考核',
                        meta: {title: '培训考核', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/authorizeManage',
                component: () => import('@views/qualityManage/authorizeManage/index'),
                name: '授权管理',
                meta: {title: '授权管理', icon: '', roles: ['R_qualityManage/authorizeManage']},
                children: [
                    {
                        path: '/addAuthorizeManage',
                        component: () => import('@views/qualityManage/authorizeManage/add'),
                        name: '授权管理新增',
                        meta: {title: '新增', icon: '', roles: ['R_qualityManage/addAuthorizeManage']},
                        hidden: true
                    }, {
                        path: '/editAuthorizeManage',
                        component: () => import('@views/qualityManage/authorizeManage/add'),
                        name: '授权管理编辑',
                        meta: {title: '授权管理编辑', icon: '', roles: ['R_qualityManage/addAuthorizeManage']},
                        hidden: true
                    },
                    {
                        path: '/infoAuthorizeManage',
                        component: () => import('@views/qualityManage/authorizeManage/add'),
                        name: '授权管理详情',
                        meta: {title: '授权管理编辑', icon: '', roles: ['R_qualityManage/infoAuthorizeManage']},
                        hidden: true
                    },
                    {
                        path: '/SuserQuali',
                        component: () => import('@views/qualityManage/components/userQuali'),
                        name: '授权管理员工资质',
                        meta: {title: '员工资质', icon: ''},
                        hidden: true
                    },
                    {
                        path: '/SuserDoc',
                        component: () => import('@views/qualityManage/personDoc/add/addPersonDoc'),
                        // component: () => import('@views/qualityManage/components/userDoc/index'),
                        name: '授权管理员工档案',
                        meta: {title: '员工档案', icon: ''},
                        hidden: true,
                        children: [
                            {
                                path: '/SinOfficeInfoAdd',
                                component: () => import('@views/qualityManage/personDoc/add/inOfficeInfo/add'),
                                name: '授权管理任职信息新增',
                                meta: {title: '任职信息新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/SworkExperienceAdd',
                                component: () => import('@views/qualityManage/personDoc/add/workExperience/add'),
                                name: '授权管理工作经验新增',
                                meta: {title: '工作经验新增', icon: ''},
                                hidden: true,

                            }, {
                                path: '/ScertificateAdd',
                                component: () => import('@views/qualityManage/personDoc/add/certificate/add'),
                                name: '授权管理证书新增',
                                meta: {title: '证书新增', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/SunsafeAdd',
                                component: () => import('@views/qualityManage/personDoc/add/unsafe/add'),
                                name: '授权管理不安全事件及诚信记录新增',
                                meta: {title: '不安全事件及诚信记录新增', icon: ''},
                                hidden: true,

                            },
                            {
                                path: '/SworkStyle',
                                component: () => import('@views/qualityManage/personDoc/add/workWay/add'),
                                name: '授权管理作风建设量化考核记录新增',
                                meta: {title: '作风建设量化考核记录新增', icon: ''},
                                hidden: true,
                            },

                        ]
                    },
                    {
                        path: '/SuserTrain',
                        component: () => import('@views/qualityManage/components/userTrain.vue'),
                        name: '授权管理质量培训考核',
                        meta: {title: '培训考核', icon: ''},
                        hidden: true
                    }
                ]
            },

            {
                path: '/selfCheckPlan',
                component: () => import('@views/qualityManage/selfCheckPlan/index'),
                name: '自查计划',
                meta: {title: '自查计划', icon: '', keepAlive: true, roles: ['R_qualityManage/selfCheckPlan']},
                children: [
                    {
                        path: '/addselfCheckPlanAdd',
                        component: () => import('@views/qualityManage/selfCheckPlan/add'),
                        name: '法定自查检查计划新增',
                        meta: {title: '法定自查检查计划新增', icon: '', roles: ['R_qualityManage/addselfCheckPlanAdd']},
                    }, {
                        path: '/editselfCheckPlanAdd',
                        component: () => import('@views/qualityManage/selfCheckPlan/add'),
                        name: '法定自查检查计划编辑',
                        meta: {title: '法定自查检查计划编辑', icon: '', roles: ['R_qualityManage/addselfCheckPlanAdd']},
                    },
                    // {
                    //     path: '/infoselfCheckPlanAdd',
                    //     component: () => import('@views/qualityManage/selfCheckPlan/add'),
                    //     name: '法定自查检查计划新增',
                    //     meta: {title: '法定自查检查计划新增',icon: ''},
                    // },
                    {
                        path: '/addselfCheckPlanDetails',
                        component: () => import('@views/qualityManage/selfCheckPlan/planDetailsAdd.vue'),
                        name: '法定自查检查计划明细新增',
                        meta: {title: '法定自查检查计划明细新增', icon: '', roles: ['R_qualityManage/addselfCheckPlanDetails']},
                    },
                    {
                        path: '/editselfCheckPlanDetails',
                        component: () => import('@views/qualityManage/selfCheckPlan/planDetailsAdd.vue'),
                        name: '法定自查检查计划明细编辑',
                        meta: {title: '法定自查检查计划明细编辑', icon: '', roles: ['R_qualityManage/addselfCheckPlanDetails']},
                    },
                    {
                        path: '/infoselfCheckPlanDetails',
                        component: () => import('@views/qualityManage/selfCheckPlan/planDetailsAdd.vue'),
                        name: '法定自查检查计划明细详情',
                        meta: {title: '法定自查检查计划明细详情', icon: '', roles: ['R_qualityManage/infoselfCheckPlanDetails']},
                    },
                ]
            },
            {
                path: '/safetyPerformance',
                component: () => import('@views/qualityManage/safetyPerformance/index'),
                name: '安全绩效',
                meta: {title: '安全绩效', icon: '', keepAlive: true, roles: ['R_qualityManage/safetyPerformance']},
                children: [
                    {
                        path: '/addsafetyPerformanceAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/add'),
                        name: '部门月度安全绩效新增',
                        meta: {title: '部门月度安全绩效新增', icon: '', roles: ['R_qualityManage/addsafetyPerformanceAdd']},
                    },
                    {
                        path: '/editsafetyPerformanceAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/add'),
                        name: '部门月度安全绩效编辑',
                        meta: {title: '部门月度安全绩效编辑', icon: '', roles: ['R_qualityManage/addsafetyPerformanceAdd']},
                    },
                    {
                        path: '/infosafetyPerformanceAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/add'),
                        name: '部门月度安全绩效详情',
                        meta: {title: '部门月度安全绩效详情', icon: '', roles: ['R_qualityManage/infosafetyPerformanceAdd']},
                    },
                    {
                        path: '/addsafetyPerformanceDetailsAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/detailsAdd'),
                        name: '安全绩效明细新增',
                        meta: {title: '安全绩效明细新增', icon: '', roles: ['R_qualityManage/addsafetyPerformanceDetailsAdd']},
                    },
                    {
                        path: '/editsafetyPerformanceDetailsAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/detailsAdd'),
                        name: '安全绩效明细编辑',
                        meta: {title: '安全绩效明细编辑', icon: '', roles: ['R_qualityManage/addsafetyPerformanceDetailsAdd']},
                    }, {
                        path: '/infosafetyPerformanceDetailsAdd',
                        component: () => import('@views/qualityManage/safetyPerformance/detailsAdd'),
                        name: '安全绩效明细详情',
                        meta: {title: '安全绩效明细详情', icon: '', roles: ['R_qualityManage/infosafetyPerformanceDetailsAdd']},
                    },
                    {
                        path: '/safetyPerformanceYear',
                        component: () => import('@views/qualityManage/safetyPerformance/year/index'),
                        name: '部门年度安全绩效',
                        meta: {title: '部门年度安全绩效', icon: '', roles: ['R_qualityManage/safetyPerformanceYear']},
                    },
                ]
            },
            {
                path: '/safetyInformationIndex',
                component: () => import('@views/qualityManage/safetyInformation/index'),
                name: '安全信息',
                meta: {title: '安全信息', icon: '', roles: ['R_qualityManage/safetyInformationIndex']},
                children: [
                    {
                        path: '/addsafetyInformationAdd',
                        component: () => import('@views/qualityManage/safetyInformation/add'),
                        name: '安全信息新增',
                        meta: {title: '安全信息新增', icon: '', roles: ['R_qualityManage/addsafetyInformationAdd']},
                    }, {
                        path: '/editsafetyInformationAdd',
                        component: () => import('@views/qualityManage/safetyInformation/add'),
                        name: '安全信息编辑',
                        meta: {title: '安全信息编辑', icon: '', roles: ['R_qualityManage/addsafetyInformationAdd']},
                    }, {
                        path: '/infosafetyInformationAdd',
                        component: () => import('@views/qualityManage/safetyInformation/add'),
                        name: '安全信息详情',
                        meta: {title: '安全信息详情', icon: '', roles: ['R_qualityManage/infosafetyInformationAdd']},
                    },
                ]
            },
            {
                path: '/dangerousDataIndex',
                component: () => import('@views/qualityManage/dangerousData/index'),
                name: '危险数据',
                meta: {title: '危险数据', icon: '', roles: ['R_qualityManage/dangerousDataIndex']},
                children: [
                    {
                        path: '/adddangerousDataAdd',
                        component: () => import('@views/qualityManage/dangerousData/add'),
                        name: '危险数据新增',
                        meta: {title: '危险数据新增', icon: '', roles: ['R_qualityManage/adddangerousDataAdd']},
                    },
                    {
                        path: '/editdangerousDataAdd',
                        component: () => import('@views/qualityManage/dangerousData/add'),
                        name: '危险数据编辑',
                        meta: {title: '危险数据编辑', icon: '', roles: ['R_qualityManage/adddangerousDataAdd']},
                    },
                    {
                        path: '/infodangerousDataAdd',
                        component: () => import('@views/qualityManage/dangerousData/add'),
                        name: '危险数据详情',
                        meta: {title: '危险数据详情', icon: '', roles: ['R_qualityManage/infodangerousDataAdd']},
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
        meta: {title: '工单管理', icon: 'gdgl', roles: ['R_WorkOrderManage']},
        children: [
            {
                path: '/WorkTemplate',
                component: () => import('@views/workOrder/workTemplate/index'),
                name: '工单模板管理',
                meta: {title: '模板管理', icon: 'xxgl', roles: ['R_WorkOrderManage/WorkTemplate']},
                children: [
                    {
                        path: '/addWorkTemplateAdd',
                        component: () => import('@views/workOrder/workTemplate/add/index'),
                        name: '新增工单模板配置',
                        meta: {title: '新增工单模板配置', icon: 'xxgl', roles: ['R_WorkOrderManage/addWorkTemplateAdd']},
                    }, {
                        path: '/editWorkTemplateAdd',
                        component: () => import('@views/workOrder/workTemplate/add/index'),
                        name: '编辑工单模板配置',
                        meta: {title: '编辑工单模板配置', icon: 'xxgl', roles: ['R_WorkOrderManage/addWorkTemplateAdd']},
                    }, {
                        path: '/infoWorkTemplateAdd',
                        component: () => import('@views/workOrder/workTemplate/add/index'),
                        name: '工单模板配置详情',
                        meta: {title: '工单模板配置详情', icon: 'xxgl', roles: ['R_WorkOrderManage/infoWorkTemplateAdd']},
                    },
                ]
            },
            {
                path: '/signControl',
                component: () => import('@views/workOrder/signControl/index'),
                name: '完工签署',
                meta: {title: '完工签署', icon: 'xxgl', roles: ['R_WorkOrderManage/signControl']},
                children: [

                    {
                        path: '/editWorkAbnormalDetails',
                        component: () => import('@views/workOrder/abnormal/details'),
                        name: '完工签署异常更改',
                        meta: {title: '异常更改', icon: 'xxgl', roles: ['R_WorkOrderManage/addWorkAbnormalDetails']},
                    },
                    {
                        path: '/infoWorkAbnormalDetails',
                        component: () => import('@views/workOrder/abnormal/details'),
                        name: '完工签署详情（线上）',
                        meta: {title: '异常更改', icon: 'xxgl', roles: ['R_WorkOrderManage/infoWorkAbnormalDetails']},
                    },


                    {
                        path: '/addWorkAbnormalAdd',
                        component: () => import('@views/workOrder/abnormal/add'),
                        name: '完工签署纸制填报工单导入',
                        meta: {title: '纸制填报工单导入', icon: 'xxgl', roles: ['R_WorkOrderManage/addWorkAbnormalAdd']},
                    },
                    {
                        path: '/editWorkAbnormalAdd',
                        component: () => import('@views/workOrder/abnormal/add'),
                        name: '完工签署纸制填报工单导入编辑',
                        meta: {title: '纸制填报工单导入编辑', icon: 'xxgl', roles: ['R_WorkOrderManage/addWorkAbnormalAdd']},
                    }, {
                        path: '/infoWorkAbnormalAdd',
                        component: () => import('@views/workOrder/abnormal/add'),
                        name: '完工签署纸制填报工单导入详情',
                        meta: {title: '纸制填报工单导入详情', icon: 'xxgl', roles: ['R_WorkOrderManage/infoWorkAbnormalAdd']},
                    },
                ]
            },

            {
                path: '/workOrderChange',
                component: () => import('@views/workOrder/workOrderChange/index'),
                name: '变更审核',
                meta: {title: '变更审核', icon: 'xxgl', roles: ['R_WorkOrderManage/workOrderChange']},
                children: []
            },
            {
                path: '/myWorkOrder',
                component: () => import('@views/workOrder/myWorkOrder/index'),
                name: '我的工单',
                meta: {title: '我的工单', icon: 'xxgl', roles: ['R_WorkOrderManage/myWorkOrder']},
                children: [

                    {
                        path: '/editMyWorkAbnormalDetails',
                        component: () => import('@views/workOrder/abnormal/details'),
                        name: '我的工单异常更改',
                        meta: {title: '异常更改', icon: 'xxgl', roles: ['R_myWorkOrder/addMyWorkAbnormalDetails']},
                    },

                    {
                        path: '/editMyWorkAbnormalAdd',
                        component: () => import('@views/workOrder/abnormal/add'),
                        name: '我的纸制填报工单导入',
                        meta: {title: '我的纸制填报工单导入', icon: 'xxgl', roles: ['R_myWorkOrder/addMyWorkAbnormalAdd']},
                    },
                ]
            },
            {
                path: '/workCardVrify',
                component: () => import('@views/workOrder/workCardVrify/index'),
                name: '工卡核对',
                meta: {title: '工卡核对', icon: 'xxgl', roles: ['R_WorkOrderManage/workCardVrify']},
                children: [
                    {
                        path: '/addworkCardVrifyAdd',
                        component: () => import('@views/workOrder/workCardVrify/add'),
                        name: '新增工卡核对',
                        meta: {title: '新增工卡核对', icon: 'xxgl', roles: ['R_WorkOrderManage/addworkCardVrifyAdd']},
                    }, {
                        path: '/editworkCardVrifyAdd',
                        component: () => import('@views/workOrder/workCardVrify/add'),
                        name: '编辑工卡核对',
                        meta: {title: '编辑工卡核对', icon: 'xxgl', roles: ['R_WorkOrderManage/addworkCardVrifyAdd']},
                    }, {
                        path: '/infoworkCardVrifyAdd',
                        component: () => import('@views/workOrder/workCardVrify/add'),
                        name: '详情工卡核对',
                        meta: {title: '详情工卡核对', icon: 'xxgl', roles: ['R_WorkOrderManage/infoworkCardVrifyAdd']},
                    }
                ]
            },
        ],
    },
    {
        path: '/WorkOrderManage3',
        component: Layout,
        redirect: '/templateManage',
        name: '收费管理',
        meta: {title: '收费管理', icon: 'sfgl', roles: ['R_WorkOrderManage3']},
        children: [
            {
                path: '/templateManage',
                component: () => import('@views/chargeManage/templateManage/index'),
                name: '模板管理',
                meta: {title: '模板管理', icon: 'xxgl', roles: ['R_WorkOrderManage3/templateManage']},
                children: [
                    {
                        path: '/templateAdd',
                        component: () => import('@views/chargeManage/templateManage/templateAdd'),
                        name: '模板管理新增',
                        meta: {title: '新增', icon: 'xxgl'}
                    },
                    {
                        path: '/templateHistory',
                        component: () => import('@views/chargeManage/templateManage/templateHistory'),
                        name: '历史版本',
                        meta: {title: '历史版本', icon: 'xxgl'}
                    }
                ]
            },
            {
                path: '/chargeOrders',
                component: () => import('@views/chargeManage/chargeOrders/index'),
                name: '收费单',
                meta: {title: '收费单', icon: 'xxgl', roles: ['R_WorkOrderManage3/chargeOrders']},
                children: [
                    {
                        path: '/chargeOrderAdd',
                        component: () => import('@views/chargeManage/chargeOrders/chargeOrderAdd'),
                        name: '收费单新增',
                        meta: {title: '新增', icon: 'xxgl'}
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
        meta: {title: '技术资料', icon: 'jszl', roles: ['R_WorkOrderManage5']},
        children: [
            {
                path: '/fileManage',
                component: () => import('@views/techKnowledge/fileManage/index'),
                name: '文件管理',
                meta: {title: '文件管理', icon: 'xxgl', roles: ['R_WorkOrderManage5/fileManage']},
                children: [
                    {
                        path: '/detail',
                        component: () => import('@views/techKnowledge/fileManage/detail/index'),
                        name: '文件夹文件列表',
                        meta: {title: '文件夹文件', icon: 'xxgl', roles: ['R_WorkOrderManage5/detail']}
                    },
                    {
                        path: '/addFile',
                        component: () => import('@views/techKnowledge/fileManage/detail/addFile'),
                        name: '新增文件',
                        meta: {title: '新增文件', icon: 'xxgl', roles: ['R_WorkOrderManage5/addFile']},
                    }, {
                        path: '/editFile',
                        component: () => import('@views/techKnowledge/fileManage/detail/addFile'),
                        name: '编辑文件',
                        meta: {title: '编辑文件', icon: 'xxgl', roles: ['R_WorkOrderManage5/addFile']},
                    }, {
                        path: '/infoFile',
                        component: () => import('@views/techKnowledge/fileManage/detail/addFile'),
                        name: '详情文件',
                        meta: {title: '详情文件', icon: 'xxgl', roles: ['R_WorkOrderManage5/infoFile']},
                    },
                    {
                        path: '/batchPush',
                        component: () => import('@views/techKnowledge/fileManage/detail/batchPush'),
                        name: '文件管理批量推送',
                        meta: {title: '批量推送', icon: 'xxgl', roles: ['R_WorkOrderManage5/batchPush']},
                    },
                    {
                        path: '/fileHistory',
                        component: () => import('@views/techKnowledge/fileManage/detail/fileHistory'),
                        name: '文件历史版本',
                        meta: {title: '文件历史版本', icon: 'xxgl', roles: ['R_WorkOrderManage5/fileHistory']},
                    },
                    {
                        path: '/readTrack',
                        component: () => import('@views/techKnowledge/fileManage/detail/readTrack'),
                        name: '文件阅读推送',
                        meta: {title: '文件阅读推送', icon: 'xxgl', roles: ['R_WorkOrderManage5/readTrack']},
                    }
                ]
            },
            {
                path: '/studyManage',
                component: () => import('@views/techKnowledge/studyManage/index'),
                name: '学习管理',
                meta: {title: '学习管理', icon: 'xxgl', roles: ['R_WorkOrderManage5/studyManage']},
                children: [
                    {
                        path: '/readTrack1',
                        component: () => import('@views/techKnowledge/fileManage/detail/readTrack'),
                        name: '学习管理阅读推送',
                        meta: {title: '阅读推送', icon: 'xxgl', roles: ['R_WorkOrderManage5/readTrack1']},
                    }
                ]
            },
            {
                path: '/userManage',
                component: () => import('@views/techKnowledge/studyManage/userManage'),
                name: '个人管理',
                meta: {title: '个人管理', icon: 'xxgl', roles: ['R_WorkOrderManage5/userManage']}
            }
        ],
    },
    {
        path: '/peixunKaohe',
        component: Layout,
        redirect: '/testMaintenance',
        name: '培训考核',
        meta: {title: '培训考核', icon: 'pxkh', roles: ['R_peixunKaohe']},
        children: [
            {
                path: '/coursewareMaintain',
                component: () => import('@views/trainManage/coursewareMaintain/index'),
                name: '课件维护',
                meta: {title: '课件维护', icon: 'xxgl', roles: ['R_peixunKaohe/coursewareMaintain']},
                children: [
                    {
                        path: '/addcoursewareMaintainAdd',
                        component: () => import('@views/trainManage/coursewareMaintain/add'),
                        name: '课件维护新增',
                        meta: {title: '课件维护', icon: 'xxgl', roles: ['R_peixunKaohe/addcoursewareMaintainAdd']},
                    }, {
                        path: '/editcoursewareMaintainAdd',
                        component: () => import('@views/trainManage/coursewareMaintain/add'),
                        name: '课件维护编辑',
                        meta: {title: '课件维护编辑', icon: 'xxgl', roles: ['R_peixunKaohe/addcoursewareMaintainAdd']},
                    }, {
                        path: '/infocoursewareMaintainAdd',
                        component: () => import('@views/trainManage/coursewareMaintain/add'),
                        name: '课件维护详情',
                        meta: {title: '课件维护详情', icon: 'xxgl', roles: ['R_peixunKaohe/infocoursewareMaintainAdd']},
                    },
                ]
            },
            {
                path: '/testMaintenance',
                component: () => import('@views/trainManage/testMaintenance/index'),
                name: '试卷维护',
                meta: {title: '试卷维护', icon: 'xxgl', roles: ['R_peixunKaohe/testMaintenance']},
                children: [
                    {
                        path: '/addtestMaintenanceAdd',
                        component: () => import('@views/trainManage/testMaintenance/add'),
                        name: '试卷新增',
                        meta: {title: '试卷新增', icon: 'xxgl', roles: ['R_peixunKaohe/addtestMaintenanceAdd']},

                    }, {
                        path: '/edittestMaintenanceAdd',
                        component: () => import('@views/trainManage/testMaintenance/add'),
                        name: '试卷编辑',
                        meta: {title: '试卷编辑', icon: 'xxgl', roles: ['R_peixunKaohe/addtestMaintenanceAdd']},

                    },
                    {
                        path: '/infotestMaintenanceAdd',
                        component: () => import('@views/trainManage/testMaintenance/add'),
                        name: '试卷详情',
                        meta: {title: '试卷详情', icon: 'xxgl', roles: ['R_peixunKaohe/infotestMaintenanceAdd']},

                    },
                    {
                        path: '/addtestMaintenanceAddAdd',
                        component: () => import('@views/trainManage/testMaintenance/addAdd'),
                        name: '试题维护新增',
                        meta: {title: '试题维护', icon: 'xxgl', roles: ['R_peixunKaohe/addtestMaintenanceAddAdd']},

                    }, {
                        path: '/edittestMaintenanceAddAdd',
                        component: () => import('@views/trainManage/testMaintenance/addAdd'),
                        name: '试题维护编辑',
                        meta: {title: '试题维护编辑', icon: 'xxgl', roles: ['R_peixunKaohe/addtestMaintenanceAddAdd']},

                    }, {
                        path: '/infotestMaintenanceAddAdd',
                        component: () => import('@views/trainManage/testMaintenance/addAdd'),
                        name: '试题维护详情',
                        meta: {title: '试题维护详情', icon: 'xxgl'},
                    },
                    {
                        path: '/testMaintenanceSee',
                        component: () => import('@views/trainManage/testMaintenance/see'),
                        name: '预览',
                        meta: {title: '预览', icon: 'xxgl'},
                    },
                ]
            },
            {
                path: '/trainManageAdmin',
                component: () => import('@views/trainManage/trainManageAdmin/index'),
                name: '培训管理',
                meta: {title: '培训管理', icon: 'xxgl', roles: ['R_peixunKaohe/trainManageAdmin']},
                children: [
                    {
                        path: '/addtrainManageAdminAdd',
                        component: () => import('@views/trainManage/trainManageAdmin/add'),
                        name: '培训管理新增',
                        meta: {title: '培训管理新增', icon: 'xxgl', roles: ['R_peixunKaohe/addtrainManageAdminAdd']},
                    }, {
                        path: '/edittrainManageAdminAdd',
                        component: () => import('@views/trainManage/trainManageAdmin/add'),
                        name: '培训管理编辑',
                        meta: {title: '培训管理编辑', icon: 'xxgl', roles: ['R_peixunKaohe/addtrainManageAdminAdd']},
                    }, {
                        path: '/infotrainManageAdminAdd',
                        component: () => import('@views/trainManage/trainManageAdmin/add'),
                        name: '培训管理详情',
                        meta: {title: '培训管理详情', icon: 'xxgl', roles: ['R_peixunKaohe/infotrainManageAdminAdd']},
                    },
                    {
                        path: '/trainManageAdminPush',
                        component: () => import('@views/trainManage/testManage/pushStaff.vue'),
                        name: '培训推送员工',
                        meta: {title: '培训推送员工', icon: 'xxgl', roles: ['R_peixunKaohe/trainManageAdminPush']},
                    },
                    {
                        path: '/trainManageAdminResults',
                        component: () => import('@views/trainManage/trainManageAdmin/trainResults/index'),
                        name: '员工培训结果',
                        meta: {
                            title: '员工培训结果',
                            icon: 'xxgl',
                            paramsId: '',
                            roles: ['R_peixunKaohe/trainManageAdminResults']
                        },
                        children: [
                            {
                                path: '/trainManageAdminResultsAdd',
                                component: () => import('@views/trainManage/trainManageAdmin/trainResults/add'),
                                name: '培训结果新增',
                                meta: {title: '培训结果新增', icon: 'xxgl'},
                            },
                        ]
                    },
                ]
            },
            {
                path: '/trainManageUser',
                component: () => import('@views/trainManage/trainManageUser/index'),
                name: '我的培训',
                meta: {title: '我的培训', icon: 'xxgl', roles: ['R_peixunKaohe/trainManageUser']},
                children: [
                    {
                        path: '/trainManageUserAdd',
                        component: () => import('@views/trainManage/trainManageUser/add'),
                        name: '我的培训详情',
                        meta: {title: '我的培训详情', icon: 'xxgl'},
                    },
                ]
            },
            {
                path: '/testManage',
                component: () => import('@views/trainManage/testManage/index'),
                name: '考试管理',
                meta: {title: '考试管理', icon: 'xxgl', roles: ['R_peixunKaohe/testManage']},
                children: [
                    {
                        path: '/addtestManageAdd',
                        component: () => import('@views/trainManage/testManage/add'),
                        name: '考试管理-新增',
                        meta: {title: '考试管理-新增', icon: 'xxgl', roles: ['R_peixunKaohe/addtestManageAdd']},
                    }, {
                        path: '/edittestManageAdd',
                        component: () => import('@views/trainManage/testManage/add'),
                        name: '考试管理-编辑',
                        meta: {title: '考试管理-编辑', icon: 'xxgl', roles: ['R_peixunKaohe/addtestManageAdd']},
                    }, {
                        path: '/infotestManageAdd',
                        component: () => import('@views/trainManage/testManage/add'),
                        name: '考试管理-详情',
                        meta: {title: '考试管理-详情', icon: 'xxgl', roles: ['R_peixunKaohe/infotestManageAdd']},
                    },
                    {
                        path: '/testManagePushStaff',
                        component: () => import('@views/trainManage/testManage/pushStaff.vue'),
                        name: '考试推送员工',
                        meta: {title: '考试推送员工', icon: 'xxgl', roles: ['R_peixunKaohe/testManagePushStaff']},

                    },

                    {
                        path: '/testManageResults',
                        component: () => import('@views/trainManage/testManage/testResults.vue'),
                        name: '员工考试结果',
                        meta: {title: '员工考试结果', icon: 'xxgl', roles: ['R_peixunKaohe/testManageResults']},

                    },
                ]
            },
            {
                path: '/onlineTestIndex',
                component: () => import('@views/trainManage/onlineTest/index.vue'),
                name: '在线考试',
                meta: {title: '在线考试', icon: 'xxgl', roles: ['R_peixunKaohe/onlineTestIndex']},
                children: [
                    {
                        path: '/onlineTestDo',
                        component: () => import('@views/trainManage/onlineTest/add.vue'),
                        name: '参加在线考试',
                        meta: {title: '在线考试', icon: 'xxgl'},
                    },
                    {
                        path: '/historyTestLog',
                        component: () => import('@views/trainManage/onlineTest/history.vue'),
                        name: '历史考试记录',
                        meta: {title: '历史考试记录', icon: 'xxgl'},
                    },
                ]
            },
            {
                path: '/assessManageAdmin',
                component: () => import('@views/trainManage/assessManageAdmin/index'),
                name: '考核管理',
                meta: {title: '考核管理', icon: 'xxgl', roles: ['R_peixunKaohe/assessManageAdmin']},
            },
        ],
    },
    {
        path: '/queryStatistical',
        component: Layout,
        redirect: '/queryIndex',
        name: '查询统计',
        meta: {title: '查询统计', icon: 'cxtj', roles: ['R_queryStatistical']},
        children: [
            {
                path: '/queryIndex',
                component: () => import('@views/queryStatistical/query/index'),
                name: '综合查询',
                meta: {title: '综合查询', icon: '', roles: ['R_queryStatistical/queryIndex']},

            },
            {
                path: '/statisticalIndex',
                component: () => import('@views/queryStatistical/statistical/index'),
                name: '综合统计',
                meta: {title: '综合统计', icon: '', roles: ['R_queryStatistical/statisticalIndex']},
            },
        ],
    },
    {
        path: '/msgManage',
        component: Layout,
        redirect: '/warningConfig',
        name: '消息管理',
        meta: {title: '消息管理', icon: 'xxgl', roles: ['R_msgManage']},
        children: [
            {
                path: '/warningConfig',
                component: () => import('@views/msgManage/warningConfig/index'),
                name: '预警配置',
                meta: {title: '预警配置', icon: '', roles: ['R_msgManage/warningConfig']},
                children: [
                    {
                        path: '/addWarningConfig',
                        component: () => import('@views/msgManage/warningConfig/components/addWarningConfig'),
                        name: '预警配置新增',
                        meta: {title: '新增', icon: '', roles: ['R_msgManage/addWarningConfig']},
                        hidden: true
                    }, {
                        path: '/editWarningConfig',
                        component: () => import('@views/msgManage/warningConfig/components/addWarningConfig'),
                        name: '预警配置bj',
                        meta: {title: 'bj', icon: '', roles: ['R_msgManage/addWarningConfig']},
                        hidden: true
                    }, {
                        path: '/infoWarningConfig',
                        component: () => import('@views/msgManage/warningConfig/components/addWarningConfig'),
                        name: '预警配置xq',
                        meta: {title: 'xq', icon: '', roles: ['R_msgManage/infoWarningConfig']},
                        hidden: true
                    },
                ]
            },
            {
                path: '/warningSearch',
                component: () => import('@views/msgManage/warningSearch/index'),
                name: '预警查询',
                meta: {title: '预警查询', icon: '', roles: ['R_msgManage/warningSearch']},
                children: [
                    {
                        path: '/historyWarning',
                        component: () => import('@views/msgManage/warningSearch/components/historyWarning'),
                        name: '预警查询历史',
                        meta: {title: '历史', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/subscribeConfig',
                component: () => import('@views/msgManage/subscribeConfig/index'),
                name: '订阅配置',
                meta: {title: '订阅配置', icon: '', roles: ['R_msgManage/subscribeConfig']},
                children: [
                    {
                        path: '/addSubscribeConfig',
                        component: () => import('@views/msgManage/subscribeConfig/components/addSubscribeConfig'),
                        name: '订阅配置新增',
                        meta: {title: '新增', icon: '', roles: ['R_msgManage/addSubscribeConfig']},
                        hidden: true
                    }, {
                        path: '/editSubscribeConfig',
                        component: () => import('@views/msgManage/subscribeConfig/components/addSubscribeConfig'),
                        name: '订阅配置编辑',
                        meta: {title: '编辑', icon: '', roles: ['R_msgManage/addSubscribeConfig']},
                        hidden: true
                    }, {
                        path: '/infoSubscribeConfig',
                        component: () => import('@views/msgManage/subscribeConfig/components/addSubscribeConfig'),
                        name: '订阅配置详情',
                        meta: {title: '详情', icon: '', roles: ['R_msgManage/infoSubscribeConfig']},
                        hidden: true
                    }
                ]
            },
            {
                path: '/infoPlate',
                component: () => import('@views/msgManage/infoPlate/index'),
                name: '信息平台',
                meta: {title: '信息平台', icon: '', roles: ['R_msgManage/infoPlate']},
                children: [
                    {
                        path: '/addInfoPlate',
                        component: () => import('@views/msgManage/infoPlate/components/addInfoPlate'),
                        name: 'addInfoPlate',
                        meta: {title: '新增', icon: '', roles: ['R_msgManage/addInfoPlate']},
                        hidden: true
                    }, {
                        path: '/editInfoPlate',
                        component: () => import('@views/msgManage/infoPlate/components/addInfoPlate'),
                        name: 'editInfoPlate',
                        meta: {title: 'bj', icon: '', roles: ['R_msgManage/addInfoPlate']},
                        hidden: true
                    },
                    {
                        path: '/infoPlateDetails',
                        component: () => import('@views/msgManage/infoPlate/components/infoPlateDetails'),
                        name: 'infoPlateDetails',
                        meta: {title: '详情', icon: '', roles: ['R_msgManage/infoPlateDetails']},
                        hidden: true
                    },
                    {
                        path: '/historyInfoPlate',
                        component: () => import('@views/msgManage/infoPlate/components/historyInfoPlate'),
                        name: '历史',
                        meta: {title: '历史', icon: ''},
                        hidden: true
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
        meta: {title: '基础数据', icon: 'basicData', roles: ['R_basicData']},
        children: [
            {
                path: '/businessData',
                component: () => import('@views/basicData/businessData/index'),
                name: '业务数据类型',
                meta: {title: '业务数据类型', icon: '', keepAlive: true, roles: ['R_basicData/businessData']},
                children: [
                    {
                        path: '/editBusinessData',
                        component: () => import('@views/basicData/businessData/components/editBusinessData'),
                        name: 'editBusinessData',
                        meta: {title: '新增', icon: ''},
                        hidden: true
                    },
                    {
                        path: '/editBusinessSubset',
                        component: () => import('@views/basicData/businessData/components/editBusinessSubset'),
                        name: 'editBusinessSubset',
                        meta: {title: '新增', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/sysParameter',
                component: () => import('@views/basicData/sysParameter/index'),
                name: '系统参数',
                meta: {title: '系统参数', icon: '', roles: ['R_basicData/sysParameter']},
                children: [
                    {
                        path: '/addSysParameter',
                        component: () => import('@views/basicData/sysParameter/components/addSysParameter'),
                        name: 'addSysParameter',
                        meta: {title: '新增', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/tailInfo',
                component: () => import('@views/basicData/AirInfo/index'),
                name: '机尾号信息',
                meta: {title: '机尾号信息', icon: '', roles: ['R_basicData/tailInfo']},
                children: [
                    {
                        path: '/tailInfoAdd',
                        component: () => import('@views/basicData/AirInfo/add'),
                        name: 'tailInfoAdd',
                        meta: {title: '新增', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/electronicFenceConfig',
                component: () => import('@views/basicData/electronicFence/index'),
                name: '电子围栏误差配置',
                meta: {title: '电子围栏误差配置', icon: '', roles: ['R_basicData/electronicFence']},
                children: [
                    {
                        path: '/addElectronicFence',
                        component: () => import('@views/basicData/electronicFence/components/addElectronicFence'),
                        name: 'addElectronicFence',
                        meta: {title: '新增', icon: ''},
                        hidden: true
                    }
                ]
            },
            {
                path: '/electronicFence',
                component: () => import('@views/electronicFence/index'),
                name: '电子围栏展示',
                meta: {title: '电子围栏展示', icon: 'xxgl', roles: ['R_basicData/electronicFence']},
            },
        ],
    },

    {
        path: '*', name: '无权限访问',
        meta: {title: '无权限访问', icon: 'xxgl'},
        component: Layout,
        redirect: '/404',
        hidden: true,
        children: [
            {
                path: '/404',
                component: () => import('@views/notFound/404'),
                hidden: true,
            }
        ],
    }
];
let defaultRoutes = [
    {path: '/', name: 'login', component: () => import('@views/login/login')},
    // {path: '/404',component: () => import('@views/notFound/404')},

];
//无权限
export const constantRoutes = defaultRoutes;
//带权限
export const asyncRoutes = authRoutes;
export const createRouter = () =>
    new Router({
        scrollBehavior: () => ({x: 0, y: 0}),
        // routes: constantRoutes,
        routes: constantRoutes,
        fallback: false,
    });
const router = createRouter();

export function resetRouter() {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;
}

export default router;
