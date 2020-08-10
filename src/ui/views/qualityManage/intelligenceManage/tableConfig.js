import moment from "moment";

let timeInfo=(row)=>{
    if(row.awardTime){
        return  moment(row.awardTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
};
let timeInfo1=(row)=>{
    if(row.startTime){
        return  moment(row.startTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
};
let timeInfo2=(row)=>{
    if(row.endTime){
        return  moment(row.endTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
};
export const leftConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
            { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center',sort:true,search:{type:'input', prop:'userNumber',placeholder:"请输入"} },
            { prop: 'userName', label: '员工姓名',sortProp:"userName", align: 'center',sort:true,search:{type:'input', prop:'userName',placeholder:"请输入"} },
                { prop: 'name', label: '证书名称',sortProp:"name", align: 'center',sort:true,search:{type:'input', prop:'name',placeholder:"请输入"} },
                { prop: 'number', label: '证书编号',sortProp:"number", align: 'center',sort:true,search:{type:'input', prop:'number',placeholder:"请输入"} },
                { prop: 'majorCode', label: '专业代码',sortProp:"majorCode", align: 'center',sort:true,search:{type:'input', prop:'majorCode',placeholder:"请输入"} },
                { prop: 'certificateName', label: '资质名称',sortProp:"certificateName", align: 'center',sort:true,search:{type:'input', prop:'certificateName',placeholder:"请输入"} },
                { prop: 'certificateType', label: '资质类型',sortProp:"certificateType", align: 'center',sort:true,search:{type:'select', prop:'certificateTypeQuery',placeholder:"请输入",data:obj.Z_aptitudeType,selectProp:['valData','valData']} },
                { prop: 'awardUnit', label: '颁发单位',sortProp:"awardUnit", align: 'center',sort:true,search:{type:'input', prop:'awardUnit',placeholder:"请输入"} },
                { prop: 'awardTime', label: '颁发日期',formatter:timeInfo, sortProp:"awardTime", align: 'center',sort:true,search:{type:'date', prop:'awardTime',placeholder:"请选择"}},
            { slot: 'option', label: '关联信息查看' ,width:'230',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
              ]
};
export const rightConfig = (obj) => {
     return [
                { slot: 'radio' , label: '选择', width:49,search:{ type:'text',label:'过滤'}},
                 { prop: 'applicableBusiness', label: '适用业务', sortProp:"applicableBusiness", align: 'center',sort:true,search:{type:'input', prop:'applicableBusiness',placeholder:"请输入" } },
                { prop: 'award', label: '颁发人', sortProp:"award", align: 'center',sort:true,search:{type:'input', prop:'award',placeholder:"请输入"} },
                   {  prop: 'startTime', label: '颁发日期' ,formatter:timeInfo1,align: 'center', sortProp:"startTime", search:{type:'date', prop:'startTime', placeholder:"请选择"}},
                   {  prop: 'endTime', label: '失效日期' ,formatter:timeInfo2,align: 'center', sortProp:"endTime", search:{type:'date', prop:'endTime',extendType:'search', placeholder:"请选择"}},
               ]
};
 