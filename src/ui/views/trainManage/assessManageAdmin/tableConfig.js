
import moment from 'moment'
let  timeInfo=(row)=>{
    if(row.startTime){
        return moment(row.startTime).format('YYYY-MM-DD HH:mm')
    }else {
        return ''
    }
}
let  timeInfo1=(row)=>{
    if(row.endTime){
        return moment(row.endTime).format('YYYY-MM-DD HH:mm')
    }else {
        return ''
    }
}
export const leftConfig = (obj) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
        { prop: 'trainingType', label: '类别',sortProp:"trainingType", align: 'center',sort:true,search:{type:'select', prop:'trainingType',placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainType} },
        { prop: 'trainingName', label: '培训项目',sortProp:"trainingName", align: 'center',sort:true,search:{type:'input', prop:'trainingName',placeholder:"请输入"} },
        { prop: 'startTime', label: '开始时间',formatter:timeInfo,sortProp:"startTime", align: 'center',sort:true,search:{type:'date', prop:'startTime', placeholder:"请选择"}},
        { prop: 'endTime', label: '结束时间',formatter:timeInfo1,sortProp:"endTime", align: 'center' ,sort:true,search:{type:'date', prop:'endTime' ,placeholder:"请选择",extendType:'search',}},
       ]
};
export const rightConfig = (obj) => {
    return [
        // { slot: 'checkbox' , label: '选择',width:'50',search:{ type:'text',label:'过滤'}},
        { type: 'selection' , label: '选择',width:'50',search:{type:'allSelected',label:'全选'}},

        { prop: 'employeeName', label: '员工姓名',sortProp:"employeeName", align: 'center',sort:true,search:{type:'input', prop:'employeeName',placeholder:"请输入", } },
        { prop: 'employeeNo', label: '员工编号',sortProp:"employeeNo", align: 'center',sort:true,search:{type:'input', prop:'employeeNo',placeholder:"请输入", } },
        { prop: 'signStatus', label: '是否签到',sortProp:"signStatus", align: 'center' ,sort:true,search:{type:'select', prop:'signStatus', placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainSign}},
         { prop: 'qualifiedStatus', label: '考核结论',sortProp:"qualifiedStatus", align: 'center' ,sort:true,search:{type:'select', prop:'qualifiedStatus', placeholder:"请输入",selectProp:['valData','valData'],data:obj.assessConclusion}},
        { slot: 'certificateNumber', width:'140',label: '证书编号',sortProp:"certificateNo", align: 'center',sort:true,search:{type:'input', prop:'certificateNo', placeholder:"请输入", } },
         { slot: 'option', label: '操作',width:'100', sortProp:"description", align: 'center', search:{ type:'btn',label:'搜索',icon:"table_search"} },
    ]
};
