import { getToken, setToken, setRoleCode, removeToken, removeRoleCode, getUserInfo, setUserInfo, removeUserInfo } from '@lib/auth';
import { resetRouter } from '@router';
import { extend, get } from 'lodash';

const state = {
	token: getToken(),
	name: '',
	avatar: '/static/img/default_user.df927a67.png',
	userInfo: getUserInfo(),
	roles: null,
};

const mutations = {
	SET_TOKEN: (state, token) => {
		state.token = token;
	},
	SET_USER_INFO: (state, userInfo) => {
		state.userInfo = extend({}, userInfo);
	},
	SET_NAME: (state, name) => {
		state.name = name;
	},
	SET_AVATAR: (state, avatar) => {
		state.avatar = avatar;
	},
	SET_ROLES: (state, roles) => {
		state.roles = roles;
	},
};

const actions = {
	// user login
	login({ commit }, userInfo) {
		const { username, password } = userInfo;
		return new Promise((resolve, reject) => {
            request({
                url: `${this.$loginIp}/sso/login/login`,
                method: 'post',
                data:{ username: username.trim(), password: password },
            })
				.then((response) => {
					if (response.responseCode !== 1000) {
						return reject(response.responseMessage);
					}
                    console.log(response,'login')
                   const { data } = response;
					commit('SET_ROLES', null);
					commit('SET_TOKEN', data.token);
					commit('SET_USER_INFO', data);
					commit('SET_AVATAR', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif');
					setToken(data.token);
					let roleCodeArry = data.roles.length > 0 ? data.roles.map((item) => item.code) : [];
					let flag = roleCodeArry.map((item) => item.startsWith('ADMINISTRATOR'));
					if (flag.includes(true)) {
						setRoleCode('');
					} else {
						setRoleCode('NOAUTH');
					}
					setUserInfo(data);
					resolve();
				})
				.catch((error) => {
					reject(error);
				});
		});
	},

	// get user info
	getInfo({ commit, state }) {
		commit('SET_ROLES', get(state.userInfo, 'roles', []));
		return new Promise((resolve, reject) => {
			resolve(state.userInfo);
		});
	},

	// user logout
	logout({ commit, state }) {
		return new Promise((resolve, reject) => {
			commit('SET_TOKEN', '');
			commit('SET_ROLES', null);
			removeToken();
			removeRoleCode();
			resetRouter();
			removeUserInfo();
			resolve();
		});
	},

	// remove token
	resetToken({ commit }) {
		return new Promise((resolve) => {
			commit('SET_TOKEN', '');
			removeToken();
			resolve();
		});
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	actions,
};
