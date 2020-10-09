import { asyncRoutes, constantRoutes } from '@/ui/router';
import {map} from 'lodash'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
	if (route.meta && route.meta.roles) {
		// let arr = [];
		let mergeRoles = [];
		function unique(arr) {
			return Array.from(new Set(arr));
		}
 		roles.map((role) => {
 			if (role.component) {
                mergeRoles.push(role.component);
			}
		});
 		mergeRoles = unique(mergeRoles);
 		// for (var i = 0; i < mergeRoles.length; i++) {
		// 	var oneleal = mergeRoles[i].split('/')[0];
		// 	if (!arr.includes(oneleal)) {
		// 		arr.push(oneleal);
		// 	}
		// 	arr.push(mergeRoles[i]);
		// }
		// arr = unique(arr);
		return mergeRoles.includes(route.meta.roles[0]);
	} else {
		return true;
	}
}
// 判断页面按钮权限
 /**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
	const res = [];
	routes.forEach((route) => {
		const tmp = { ...route };
        console.log(tmp.component);
        if (hasPermission(roles, tmp)) {
			if (tmp.children) {
				tmp.children = filterAsyncRoutes(tmp.children, roles);
			}
			res.push(tmp);
		}
	});
	return res;
}

const state = {
	routes: [],
	addRoutes: [],
};

const mutations = {
	SET_ROUTES: (state, routes) => {
		state.addRoutes = routes;
		state.routes = constantRoutes.concat(routes);
	},
};
 const actions = {
	generateRoutes({ commit }, roles) {
  		return new Promise((resolve) => {
			let accessedRoutes;
			// if (roles.includes('admin')) {
			// 	accessedRoutes = asyncRoutes || [];
			// } else {
				accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
			// }
			commit('SET_ROUTES', accessedRoutes);
  			resolve(accessedRoutes);
		});
	},
};
export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
