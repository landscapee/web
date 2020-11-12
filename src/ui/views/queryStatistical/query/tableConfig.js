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
        { prop: 'planDepartureTime', label: '航班日期',formatter:time, sortProp:"planDepartureTime", align: 'center',sort:true,search:{type:'date', prop:'planDepartureTime',placeholder:"请选择"} },
        { prop: 'airlineCompanyName', label: '航空公司',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入"} },
        { prop: 'seat', label: '机位',sortProp:"seat", align: 'center',sort:true,search:{type:'input', prop:'seat', placeholder:"请输入"}},
        { prop: 'flightNo', label: '航班号',sortProp:"flightNo", align: 'center' ,sort:true,search:{type:'input', prop:'flightNo',inputProp:['valData','valData'],data:obj.coursewareType||[],placeholder:"请输入"}},
        { prop: 'flightRegisterNo', label: '飞机注册号',sortProp:"flightRegisterNo", align: 'center' ,sort:true,search:{type:'input', prop:'flightRegisterNo',inputProp:['valData','valData'],data:obj.CourseflightRegisterNo||[],placeholder:"请输入"}},
        { prop: 'airplaneIcao', label: '机型',sortProp:"airplaneIcao", align: 'center',sort:true,search:{type:'input', prop:'airplaneIcao',placeholder:"请输入"} },
        { prop: 'bodySize', label: '宽窄体',sortProp:"bodySize", align: 'center' ,sort:true,search:{type:'input', prop:'bodySize',inputProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请输入"}},
        { prop: 'airlineType', label: '航班类型',sortProp:"airlineType", align: 'center' ,sort:true,search:{type:'input', prop:'airlineType',inputProp:['valData','valData'],data:obj.applyObject||[],placeholder:"请输入"}},
    ]
}
 let qarr1=(obj)=>{
    return { prop: 'submitUserName', label: '保障人员',sortProp:"submitUserName", align: 'center' ,sort:true,search:{type:'input', prop:'submitUserName',inputProp:['valData','valData'],data:obj.coursewareType||[],placeholder:"请输入"}}

}
export const qiaozaiConfig = (obj) => {  //未完成
    let arr=[
        ...qarr(obj),
       qarr1(obj),
		{ prop: 'serviceTime', label: '保障时长(分)',sortProp:"serviceTime", align: 'center',sort:true,search:{type:'input', prop:'serviceTime',placeholder:"请输入",isNumber:true} },
	]

    return arr
};
export const qinwuConfig = (obj) => {
    let arr=[
        ...qarr(obj),
        qarr1(obj),
         { prop: 'serviceTime', label: '保障时长(分)',sortProp:"serviceTime", align: 'center',sort:true,search:{type:'input', prop:'serviceTime',placeholder:"请输入",isNumber:true} },
    ]
    return arr
};
export const weixiuConfig = (obj) => {
    let arr=[
        ...qarr(obj),
        qarr1(obj),
        { prop: 'serviceTime', label: '保障时长(分)',sortProp:"serviceTime", align: 'center',sort:true,search:{type:'input', prop:'serviceTime',placeholder:"请输入",isNumber:true} },
        // { prop: 'airlineCompanyName', label: '公司',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入"} },

    ]
    return arr
};
