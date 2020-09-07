import moment from "moment"
let time=(row)=>{
    if(row.planDepartureTime){
        return moment(row.planDepartureTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}
let qarr=(obj)=>{
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
        { prop: 'planDepartureTime', label: '航班日期',formatter:time, sortProp:"planDepartureTime", align: 'center',sort:true,search:{type:'date', prop:'planDepartureTime',placeholder:"请输入"} },
        { prop: 'airlineCompanyName', label: '航空公司',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入"} },
        { prop: 'flightState', label: '机位',sortProp:"flightState", align: 'center',sort:true,search:{type:'input', prop:'flightState', placeholder:"请输入"}},
        { prop: 'flightNo', label: '航班号',sortProp:"flightNo", align: 'center' ,sort:true,search:{type:'select', prop:'flightNo',selectProp:['valData','valData'],data:obj.coursewareType||[],placeholder:"请选择"}},
        { prop: 'flightRegisterNo', label: '飞机注册号',sortProp:"flightRegisterNo", align: 'center' ,sort:true,search:{type:'select', prop:'flightRegisterNo',selectProp:['valData','valData'],data:obj.CourseflightRegisterNo||[],placeholder:"请选择"}},
        { prop: 'airplaneIcao', label: '机型',sortProp:"airplaneIcao", align: 'center',sort:true,search:{type:'input', prop:'airplaneIcao',placeholder:"请输入"} },
        { prop: 'airlineType', label: '宽窄体',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'bodySize', label: '航班类型',sortProp:"bodySize", align: 'center' ,sort:true,search:{type:'select', prop:'bodySize',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
    ]
}
 let qarr1=(obj)=>{
    return { prop: 'submitUserName', label: '保障人员',sortProp:"submitUserName", align: 'center' ,sort:true,search:{type:'select', prop:'submitUserName',selectProp:['valData','valData'],data:obj.coursewareType||[],placeholder:"请选择"}}

}
export const qiaozaiConfig = (obj) => {  //未完成
    let arr=[
        ...qarr(obj),
        { prop: 'airlineCompanyName', label: '是否使用桥载设备',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入"} },
        { prop: 'airlineType', label: '单双电源',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'airlineType', label: '桥载电源投入时间',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'airlineType', label: '桥载电源撤出时间',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'airlineType', label: '桥载电源适用时长',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'airlineType', label: '桥载空调投入时间',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'airlineType', label: '桥载空调撤出时间',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        { prop: 'airlineType', label: '桥载空调适用时长',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'select', prop:'airlineType',selectProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请选择"}},
        qarr1(obj),
        { slot: 'option', label: '操作',width:'120', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]

    return arr
};
export const qinwuConfig = (obj) => {
    let arr=[
        ...qarr(obj),
        qarr1(obj),
         { prop: 'airlineCompanyName', label: '保障时长',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入"} },
        { slot: 'option2', label: '操作',width:'120', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
    return arr
};
export const weixiuConfig = (obj) => {
    let arr=[
        ...qarr(obj),
        qarr1(obj),
        { prop: 'airlineCompanyName', label: '公司',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入"} },
        { slot: 'option3', label: '操作',width:'120', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
    return arr
};
