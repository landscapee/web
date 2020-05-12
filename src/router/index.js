import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const login = () => import(/*webpackChunkName:"index"*/ '../views/login')
const flight_dynamics = () => import(/*webpackChunkName:"flight_dynamics"*/ '../views/flight_dynamics')//航班动态

const flight_monitor = () => import(/*webpackChunkName:"flight_monitor"*/ '../views/flight_monitor')//航班监控
const filghtMilepost = () => import(/*webpackChunkName:"filghtMilepost"*/ '../views/filghtMilepost')
const support_monitor = () => import(/*webpackChunkName:"support_monitor"*/ '../views/support_monitor')//作业保障监控




// const login = r => require.ensure([], () => r(require('../views/login')), 'login')//登录
// const index = r => require.ensure([], () => r(require('../views/index')), 'index')//首页



var routes=[
  {path: '/',name: 'login',component:login},
  {path: '/flight_dynamics',name: 'flight_dynamics',component:flight_dynamics},
  {path: '/flight_monitor',name: 'flight_monitor',component:flight_monitor},
  {path: '/filghtMilepost',name: 'filghtMilepost',component:filghtMilepost},
  {path: '/support_monitor',name: 'support_monitor',component:support_monitor},
]

export default new Router({
	fallback:false,
	routes:routes
})
