const getters = {
	token: (state) => state.user.token,
	avatar: (state) => state.user.avatar,
	name: (state) => state.user.name,
	userInfo: (state) => state.user.userInfo,
    roles: (state) => state.user.roles,
    isZDRole: (state) =>{
		return (val)=>{
            let roles=state.user.roles||[]
           return  roles.some((k,l)=>{
               console.log(k.code, val);
               return k.code==val
             })
		}
	},
    permission_routes: (state) => state.permission.routes,

};
export default getters;
