const socket = {
    state: {
        socket:null
    },
    mutations: {
        setSocket:(state,data)=>{
            state.socket = data
        }
    },
    getters: {
        getSocket:(state)=>{
            return state.socket
        }
    }
}

export default socket