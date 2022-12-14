import router,{resetRouter} from './src/ui/router';
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
                    console.log("router", router)
                    resetRouter()
                     router.addRoutes(accessRoutes);
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
			next();
		} else {
			next(`/login?redirect=${to.path}`);
		}
	}
});
router.onReady(() => {

	const hasToken = getToken();
       if (hasToken) {
		store.dispatch('user/getInfo').then((userInfo) => {
			store.dispatch('permission/generateRoutes', userInfo.menus).then((accessRoutes) => {
                resetRouter()
				router.addRoutes(accessRoutes);
 			});
		});
	}
});
router.afterEach((to, from, next) => {

});
