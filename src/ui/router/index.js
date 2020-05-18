import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

var routes=[
  {path: '/',name: 'login',	component: () => import('@/ui/views/login/login')},
  {path: '/table',name: 'table',	component: () => import('@/ui/views/table/table')},
  {path: '/workOrder',name: 'workOrder',	component: () => import('@/ui/views/workOrder/workOrder')},
]

export default new Router({
	fallback: false,
	routes: routes
})
