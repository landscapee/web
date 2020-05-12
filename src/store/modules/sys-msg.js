const sysMsg = {
    state: { 
        userMsg:null,
        filghtTpye:[
            {name:"播种",type:'0'},
            {name:"表演",type:'1'},
            {name:"航摄",type:'2'},
            {name:"灭火",type:'3'},
            {name:"农化",type:'4'},
            {name:"试航",type:'5'},
            {name:"降雨",type:'6'},
            {name:"护林",type:'7'},
            {name:"校飞",type:'8'},
            {name:"其它运输飞行（包括运兵）",type:'9'},
            {name:"支线",type:'-'},
            {name:"未知",type:'#'},
            {name:"客加班",type:'('},
            {name:"货加班",type:')'},
            {name:"日航",type:'*'},
            {name:"地航",type:'?'},
            {name:"B/W",type:'['},
            {name:"摩发",type:'\\'},
            {name:"养调",type:']'},
            {name:"采矿",type:'^'},
            {name:"鱼苗",type:'|'},
            {name:"熟练",type:'+'},
            {name:"磁测",type:'='},
            {name:"专机",type:'A'},
            {name:"备降",type:'B'},
            {name:"普客加班",type:'C'},
            {name:"带飞",type:'D'},
            {name:"急救",type:'E'},
            {name:"校验",type:'F'},
            {name:"技术",type:'G'},
            {name:"货包",type:'H'},
            {name:"要客",type:'I'},
            {name:"班专",type:'J'},
            {name:"本训",type:'K'},
            {name:"包机",type:'L'},
            {name:"视察",type:'M'},
            {name:"调机",type:'N'},
            {name:"货加",type:'O'},
            {name:"首飞",type:'P'},
            {name:"补班",type:'Q'},
            {name:"返航",type:'R'},
            {name:"试飞",type:'S'},
            {name:"训练",type:'T'},
            {name:"公务",type:'U'},
            {name:"转场",type:'V'},
            {name:"正班",type:'W'},
            {name:"测试",type:'X'},
            {name:"夜航",type:'Y'},
            {name:"货班",type:'Z'},
        ]

    },
    mutations: {
        setUserMsg:(state,data)=>{
            state.userMsg = data
        }
    },
    getters: {
        getUserMsg:(state)=>{
            return state.userMsg
        },
        getFilghtTpye:(state)=>{
            return state.filghtTpye
        },
    }
}

export default sysMsg