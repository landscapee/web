import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
const login = r => require.ensure([], () => r(require('../views/login')), 'login')//登录
const index = r => require.ensure([], () => r(require('../views/index')), 'index')//首页

var routes=[
  {path: '/',name: 'login',component:login},
  {path: '/index',name: 'index',component:index},
]

export default new Router({
	fallback: false,
	routes: routes
})
