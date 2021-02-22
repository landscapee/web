import moment from 'moment'
let dateInfo=(row)=>{
        if(row.infDate){
             return  moment(row.infDate).format('YYYY-MM-DD')
        }else {
                return ''
        }

}
let timeInfo=(row)=>{
        if(row.infTime){
             return  moment(row.infTime).format('HH:mm:ss')
        }else {
                return ''
        }

}
let tranBlo=(row,key)=>{
    return row[key]===true?'是':row[key]===false?'否':'--'
}
let arr=[{value:true,label:'是'},{value:false,label:'否'}]
export const sadetyInfoConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '信息编号', width:'148',sortProp:"infNumber", align: 'center',sort:true,search:{type:'input', prop:'infNumber',placeholder:"请输入"} },
                { prop: 'infRemark', label: '信息描述',width:'148',sortProp:"infRemark", align: 'center',sort:true,search:{type:'input', prop:'infRemark',placeholder:"请输入"} },
                { prop: 'infSources', label: '信息来源',width:'148',sortProp:"infSources", align: 'center',sort:true,search:{type:'input', prop:'infSources',placeholder:"请输入"} },
                { prop: 'infDate', label: '日期',formatter:dateInfo,width:'110',sortProp:"infDate", align: 'center',sort:true,search:{type:'date',time:'year', prop:'infDateStr',placeholder:"请选择"}},
                { prop: 'infTime', label: '时间',formatter:timeInfo,width:'100',sortProp:"infTime", align: 'center',sort:false,},
                { prop: 'place', label: '地点',width:'148',sortProp:"place", align: 'center' ,sort:true,search:{type:'input', prop:'place',placeholder:"请输入"}},
                { prop: 'seat', label: '机位号',sortProp:"seat", align: 'center' ,sort:true,search:{type:'input', prop:'seat',placeholder:"请输入"}},
                { prop: 'teamName', label: '班组名称',width:'148',sortProp:"teamName", align: 'center' ,sort:true,search:{type:'input', prop:'teamName',placeholder:"请输入"}},
                { prop: 'reasonType', label: '原因分类',width:'148',sortProp:"reasonType", align: 'center' ,sort:true,search:{type:'input', prop:'reasonType',placeholder:"请输入"}},
                { prop: 'responsibleUnit', label: '负责人/单位',width:'148',sortProp:"responsibleUnit", align: 'center' ,sort:true,search:{type:'input', prop:'responsibleUnit',placeholder:"请输入"}},
                { prop: 'deptName', label: '所属系统',width:'148',sortProp:"deptName", align: 'center' ,sort:true,search:{type:'input', prop:'deptName',placeholder:"请输入"}},
                { prop: 'situation', label: '违规/差错',width:'80',sortProp:"situation", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择",selectProp:['valData','valData'],data:obj.Q_BadMistake,} },
                { prop: 'reason', label: '原因分析',width:'148',sortProp:"reason", align: 'center',sort:true,search:{type:'input', prop:'reason',placeholder:"请输入"} },
                { prop: 'measures', label: '整改措施',width:'148',sortProp:"measures", align: 'center' ,sort:true,search:{type:'input', prop:'measures',placeholder:"请输入"}},
                {  prop: 'controlState', label: '控制状态' ,width:'148',sortProp:"controlState",align: 'center', search:{type:'input', prop:'controlState', placeholder:"请输入"}},
                {  prop: 'workLink', label: '工作环节' ,width:'148',sortProp:"workLink",align: 'center', search:{type:'input', prop:'workLink', placeholder:"请输入"}},
                {  prop: 'keyWord', label: '关键词' ,width:'148',sortProp:"keyWord", align: 'center',search:{type:'input', prop:'keyWord', placeholder:"请输入"}},
                {  prop: 'serviceEvents', label: '是否安全/服务事件' ,width:'100',align: 'center',sortProp:"serviceEvents", search:{type:'select',prop:'serviceEvents', placeholder:"请选择",selectProp:['valData','valData'], data:obj.Q_securityServices,}},
                {  prop: 'repeatedViolations', label: '是否重复违规' ,width:'100',formatter:(row)=>{return tranBlo(row,'repeatedViolations')},align: 'center',sortProp:"repeatedViolations", search:{type:'select',prop:'repeatedViolations', placeholder:"请选择",selectProp:['label','value'], data:arr,}},
                {  prop: 'coreRisk', label: '是否核心风险' ,width:'100',formatter:(row)=>{return tranBlo(row,'coreRisk')},align: 'center',sortProp:"coreRisk", search:{type:'select',prop:'coreRisk', placeholder:"请选择",selectProp:['label','value'], data:arr,}},

            {  slot:'remark',label: '备注' ,width:'190',sortProp:"remark",search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
