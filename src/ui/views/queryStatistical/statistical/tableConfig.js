let timeInfo=(row)=>{
        if(row.infTime){
            return this.$moment(row.infTime).format('YYYY-MM-DD')
        }else {
                return ''
        }
}
let qarr=[
    { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
    { prop: 'department', label: '部门/项目', sortProp:"department", align: 'center',sort:true,search:{type:'input', prop:'department',placeholder:"请输入"} }
];
// inputProp:['valData','valData'],data:obj.coursewareType||[],
let yearMonthArr=(obj)=>{
   return [
        { prop: 'year', label: '年',sortProp:"year", align: 'center',sort:true,search:{type:'input', prop:'year',placeholder:"请输入"} },
        { prop: 'month', label: '月',sortProp:"month", align: 'center',sort:true,search:{type:'input', prop:'month', placeholder:"请输入"}},
        { prop: 'day', label: '日',sortProp:"day", align: 'center' ,sort:true,search:{type:'input', prop:'day',placeholder:"请输入"}},
        { prop: 'hour', label: '小时',sortProp:"hour", align: 'center' ,sort:true,search:{type:'input', prop:'hour', placeholder:"请输入"}}

    ];
}
let workInfo=(obj)=>{
   return [
         { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center' ,sort:true,search:{type:'input', prop:'userNumber' ,placeholder:"请输入"}},
        { prop: 'submitUserName', label: '员工名称',sortProp:"submitUserName", align: 'center' ,sort:true,search:{type:'input', prop:'submitUserName', placeholder:"请输入"}}
    ];
}
let taskNum=(obj)=>{
   return [
         { prop: 'taskCount', label: '任务次数',sortProp:"taskCount", align: 'center' ,sort:true,search:{type:'input', prop:'taskCount', placeholder:"请输入"}}
     ];
}
let flight=(obj)=>{
   return [
         { prop: 'airlineCompanyName', label: '航空公司',sortProp:"airlineCompanyName", align: 'center' ,sort:true,search:{type:'input', prop:'airlineCompanyName', placeholder:"请输入"}}
     ];
}
export const filghtConfig = (obj) => { //航班量统计
        let arr=[
            ...qarr,
             ...flight(obj),
            ...yearMonthArr(obj),
            { prop: 'flightsCount', label: '航班数量',sortProp:"flightsCount", align: 'center' ,sort:true,search:{type:'input', prop:'flightsCount', placeholder:"请输入"}}
        ]
        return arr
};
export const workloadConfig = (obj) => {////员工工作量统计
        let arr=[
            ...qarr,
            ...workInfo(obj),
            ...yearMonthArr(obj),
            ...taskNum(obj),
            // { prop: 'workHour', label: '工作时长',sortProp:"workHour", align: 'center' ,sort:true,search:{type:'input', prop:'workHour', placeholder:"请输入"}}
        ]
         return arr
};
export const workePositiveConfig = (obj) => {//员工到位及时性统计
        let arr=[
            ...qarr,
            ...workInfo(obj),
            ...yearMonthArr(obj),
            ...taskNum(obj),
            { prop: 'startInTimeCount', label: '及时到位次数',sortProp:"startInTimeCount", align: 'center' ,sort:true,search:{type:'input', prop:'startInTimeCount', placeholder:"请输入"}},
            { prop: 'executeInTimeCount', label: '及时执行次数',sortProp:"executeInTimeCount", align: 'center' ,sort:true,search:{type:'input', prop:'executeInTimeCount', placeholder:"请输入"}}
        ]
         return arr
};
export const modelAnalysisConfig = (obj) => {//保障航班航司/机型分析
        let arr=[
            { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
            ...flight(obj),
            { prop: 'airplaneIcao', label: '机型',sortProp:"airplaneIcao", align: 'center' ,sort:true,search:{type:'input', prop:'airplaneIcao', placeholder:"请输入"}},
            ...(yearMonthArr(obj).slice(0,3)),
            ...taskNum(obj)
         ]
         return arr
};
export const taskNumConfig = (obj) => {//保障任务量统计
    let arr=[
        ...qarr,
        ...flight(obj),
        { prop: 'airplaneIcao', label: '机型',sortProp:"airplaneIcao", align: 'center' ,sort:true,search:{type:'input', prop:'airplaneIcao', placeholder:"请输入"}},
        { prop: 'airlineType', label: '航班类型',sortProp:"airlineType", align: 'center',sort:true,search:{type:'input', prop:'airlineType',placeholder:"请输入"} },
        { prop: 'seat', label: '机位',sortProp:"seat", align: 'center',sort:true,search:{type:'input', prop:'seat',placeholder:"请输入"} },
        { prop: 'flightRegisterNo', label: '飞机注册号',sortProp:"flightRegisterNo", align: 'center',sort:true,search:{type:'input', prop:'flightRegisterNo',placeholder:"请输入"} },
        ...yearMonthArr(obj),
        ...taskNum(obj)
    ]
    return arr
};

export const unsafeConfig = (obj) => {//不安全事件
    let option=obj.unsafeType
    let arr=[
        { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
        { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center' ,sort:true },
        { prop: 'userName', label: '员工姓名',sortProp:"userName", align: 'center' ,sort:true },
        // { prop: 'dept11', label: '部门',sortProp:"dept11", align: 'center'  },
    ]
    if(option){
        for(let i=0;i<option.length;i++){
            let obj={ slot:option[i].valCode , label: option[i].valData, align: 'center' }
                arr.push(obj)
        }
    }
    return arr
};