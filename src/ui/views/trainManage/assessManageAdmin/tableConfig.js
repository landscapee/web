
import moment from "moment";

let timeInfo=(row)=>{
    if(row.examTime){
        return  moment(row.examTime).format('YYYY-MM-DD')

    }else {
        return ''
    }

}
export const leftConfig = (obj) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
        { prop: 'totalTime', label: '培训项目',sortProp:"totalTime", align: 'center',sort:true,search:{type:'input', prop:'totalTime',placeholder:"请输入"} },

        { prop: 'paperName', label: '类别',sortProp:"paperName", align: 'center',sort:true,search:{type:'select', prop:'paperName',placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainType} },
        { prop: 'startTime', label: '开始时间',sortProp:"startTime", align: 'center',sort:true,search:{type:'date', prop:'startTime', placeholder:"请选择"}},
        { prop: 'endTime', label: '结束时间',sortProp:"endTime", align: 'center' ,sort:true,search:{type:'date', prop:'endTime' ,placeholder:"请选择",extendType:'search',}},
       ]
};
export const rightConfig = (obj) => {
    return [
        { slot: 'checkbox' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},

        { prop: 'paperName', label: '员工姓名',sortProp:"paperName", align: 'center',sort:true,search:{type:'input', prop:'paperName',placeholder:"请输入", } },
        { prop: 'paperName', label: '员工编号',sortProp:"paperName", align: 'center',sort:true,search:{type:'input', prop:'paperName',placeholder:"请输入", } },
         { prop: 'businessType', label: '是否签到',sortProp:"businessType", align: 'center' ,sort:true,search:{type:'select', prop:'businessType', placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainSign}},
         { prop: 'businessType', label: '考核结论',sortProp:"businessType", align: 'center' ,sort:true,search:{type:'select', prop:'businessType', placeholder:"请输入",selectProp:['valData','valData'],data:obj.assessConclusion}},
        { slot: 'certificateNumber', label: '证书编号',sortProp:"suitableUser", align: 'center',sort:true,search:{type:'input', prop:'suitableUser', placeholder:"请输入", } },
         { slot: 'option', label: '操作',width:'140',sortProp:"description", align: 'center',sort:true,search:{type:'btn',label:'搜索',icon:"table_search"} },
    ]
};
