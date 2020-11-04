import router from './src/ui/router';
import store from './src/ui/store';
import { Message } from 'element-ui';
import { getToken } from './lib/auth'; // get token from cookie
import getPageTitle from './lib/get-page-title';
const whiteList = ['/','/login']; // no redirect whitelist
router.beforeEach(async (to, from, next) => {
 	// document.title = getPageTitle(to.meta.title);
 	const hasToken = getToken();
 	if (hasToken) {
 		if (to.path === '/login') {
 			next({ path: '/' });
		} else {
  			const hasRoles = store.getters.roles !== null;
			if (hasRoles) {
				next();
			} else {
				try {
					// get user info
					let userInfo = await store.dispatch('user/getInfo');
 					let accessRoutes = await store.dispatch('permission/generateRoutes', userInfo.menus);
                     router.addRoutes(accessRoutes);
                     let blo=false
						for(let i=0;i<accessRoutes.length;i++)	{
                             accessRoutes[i].path===to.path?blo=true:''
						}
 					if(!blo&&to.path=="/qualityManage")to.path=accessRoutes[0].path
                    next({ ...to ,replace:true});
				} catch (error) {
					// remove token and go to login page to re-login
					await store.dispatch('user/resetToken');
					Message.error(error || 'Has Error');
					// next(`/login?redirect=${to.path}`);
					next(`/login?redirect=${to.path}`);
				}
			}
		}
	} else {
		/* has no token */
 		if (whiteList.indexOf(to.path) !== -1) {
			// in the free login whitelist, go directly
			next();
		} else {
			// other pages that do not have permission to access are redirected to the login page.
			// next(`/login`);
			next(`/login?redirect=${to.path}`);
		}
	}
});
router.onReady(() => {
	const hasToken = getToken();
	debugger
     if (hasToken) {
		store.dispatch('user/getInfo').then((userInfo) => {
			store.dispatch('permission/generateRoutes', userInfo.menus).then((accessRoutes) => {
				router.addRoutes(accessRoutes);
 			});
		});
	}
});
router.afterEach((to, from, next) => {

});
