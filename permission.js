import router from './src/ui/router';
import store from './src/ui/store';
import { Message } from 'element-ui';
import { getToken } from './lib/auth'; // get token from cookie
// import getPageTitle from '@/utils/get-page-title';
// import { registSockChannel } from './initSocket.js';


const whiteList = ['/login']; // no redirect whitelist

router.beforeEach(async (to, from, next) => {

	// set page title
	// document.title = getPageTitle(to.meta.title);

	// determine whether the user has logged in
	const hasToken = getToken();

	if (hasToken) {
		if (from.fullPath === '/legalList') {
			if (to.name !== '法定自查任务详情') {
				localStorage.removeItem('leaglList', '');
			}
		}
		if (to.path === '/login') {
			// if is logged in, redirect to the home page
			next({ path: '/' });
		} else {
			// const hasGetUserInfo = store.getters.name;
			const hasRoles = store.getters.roles !== null;
			if (hasRoles) {
				let fromPath = from.path;
				if (!(fromPath == '/fillInItem' || fromPath == '/scopeOfBusiness' || fromPath == '/checkItem' || fromPath == '/workUnit')) {
					store.dispatch('workooderConfig/changeSearchKey', '');
					store.dispatch('workooderConfig/changeParams', { size: 20, current: 1 });
				}
				next();
			} else {
				try {
					// get user info
					let userInfo = await store.dispatch('user/getInfo');
					// registSockChannel('schedule', userInfo.id, (d) => {
					// 	console.log('socket::receive::', d);
					// 	store.commit('socket/UPDATE', d);
					// });
					// console.log('角色');
					let accessRoutes = await store.dispatch('permission/generateRoutes', userInfo.roles);
					router.addRoutes(accessRoutes);
					next();
					// next({ ...to, replace: true });
				} catch (error) {
					// remove token and go to login page to re-login
					await store.dispatch('user/resetToken');
					Message.error(error || 'Has Error');
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
			next(`/login?redirect=${to.path}`);
		}
	}
});
router.onReady(() => {
	const hasToken = getToken();
	if (hasToken) {
		store.dispatch('user/getInfo').then((userInfo) => {
			store.dispatch('permission/generateRoutes', userInfo.roles).then((accessRoutes) => {
				router.addRoutes(accessRoutes);
			});
		});
	}
});

