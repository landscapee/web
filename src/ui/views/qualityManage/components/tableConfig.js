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
            { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center',sort:false,search:{type:'input', prop:'userNumber',placeholder:"请输入"} },
            { prop: 'userName', label: '员工姓名',sortProp:"userName", align: 'center',sort:false,search:{type:'input', prop:'userName',placeholder:"请输入"} },
                { prop: 'name', label: '证书名称',sortProp:"name", align: 'center',sort:false,search:{type:'input', prop:'name',placeholder:"请输入"} },
                { prop: 'number', label: '证书编号',sortProp:"number", align: 'center',sort:false,search:{type:'input', prop:'number',placeholder:"请输入"} },
                { prop: 'majorCode', label: '专业代码',sortProp:"majorCode", align: 'center',sort:false,search:{type:'input', prop:'majorCode',placeholder:"请输入"} },
                { prop: 'certificateName', label: '资质名称',sortProp:"certificateName", align: 'center',sort:false,search:{type:'input', prop:'certificateName',placeholder:"请输入"} },
                { prop: 'certificateType', label: '资质类型',sortProp:"certificateType", align: 'center',sort:false,search:{type:'select', prop:'certificateType',placeholder:"请输入",data:obj.Z_aptitudeType,selectProp:['valData','valData']} },
                { prop: 'awardUnit', label: '颁发单位',sortProp:"awardUnit", align: 'center',sort:false,search:{type:'input', prop:'awardUnit',placeholder:"请输入"} },
                { prop: 'awardTime', label: '颁发日期',formatter:timeInfo, sortProp:"awardTime", align: 'center',sort:false,search:{type:'date', prop:'awardTime',placeholder:"请选择"}},
               ]
};
export const rightConfig = (obj) => {
    console.log(obj,11);
    return [
                { slot: 'radio' , label: '选择', width:49,search:{ type:'text',label:'过滤'}},
                 { prop: 'applicableBusiness', label: '适用业务', sortProp:"applicableBusiness", align: 'center',sort:false,search:{type:'select', prop:'applicableBusiness',placeholder:"请选择",selectProp:['valData','valData'],data:obj.checkProject} },
                { prop: 'award', label: '颁发人', sortProp:"award", align: 'center',sort:false,search:{type:'input', prop:'award',placeholder:"请输入"} },
                   {  prop: 'startTime', label: '颁发日期' ,formatter:timeInfo1, sortProp:"startTime", search:{type:'date', prop:'startTime', placeholder:"请选择"}},
                   {  prop: 'endTime', label: '失效日期' ,formatter:timeInfo2, sortProp:"endTime", search:{type:'date', prop:'endTime',extendType:'search', placeholder:"请选择"}},
               ]
};



let state=(row)=>{
    if(row.state===0){
        return '未授权'
    }else if(row.state===1){
        return '已授权'
    }else if(row.state===2){
        return '授权取消'
    }
};
let atime=(row)=>{
    if(row.endTime){
        return  moment(row.endTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}
let atime1=(row)=>{
    if(row.endTime){
        return  moment(row.endTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}
let atime2=(row)=>{
    if(row.endTime){
        return  moment(row.endTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}
export const authorizeConfig11 = (obj) => {
    return [
        { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
        { prop: 'userNumber', label: '授权名称',sortProp:"userNumber", align: 'center',sort:true,search:{type:'input', prop:'userNumber',placeholder:"请输入"} },
        { prop: 'userName', label: '资质名称',sortProp:"userName", align: 'center',sort:true,search:{type:'input', prop:'userName',placeholder:"请输入"} },
        { prop: 'dept', label: '执照编号',sortProp:"dept", align: 'center',sort:true,search:{type:'input', prop:'dept',placeholder:"请输入"} },
        { prop: 'post', label: '专业代号',sortProp:"post", align: 'center',sort:true,search:{type:'input', prop:'post',placeholder:"请输入"} },
        {  prop: 'endTime', label: '颁发日期' ,formatter:atime, sortProp:"endTime", search:{type:'date', prop:'endTime',extendType:'search', placeholder:"请选择"}},
        { prop: 'authorizedUnit', label: '授权单位',sortProp:"authorizedUnit", align: 'center',sort:true,search:{type:'input', prop:'authorizedUnit',placeholder:"请输入"} },
        { prop: 'modelRange', label: '机范围型',sortProp:"modelRange", align: 'center',sort:true,search:{type:'input', prop:'modelRange',placeholder:"请输入"} },
        { prop: 'modelRange', label: '签署日期',sortProp:"modelRange", align: 'center',sort:true,search:{type:'input', prop:'modelRange',placeholder:"请输入"} },
        { prop: 'modelRange', label: '签署人',sortProp:"modelRange", align: 'center',sort:true,search:{type:'input', prop:'modelRange',placeholder:"请输入"} },

         { prop: 'flightType', label: '航班类型',sortProp:"flightType", align: 'center',sort:true,search:{type:'select', prop:'flightType',placeholder:"请输入",data:obj.accreditFlightType,selectProp:['valData','valData']} },

        {  prop: '生效日期', label: '失效日期' ,formatter:atime1, sortProp:"endTime", search:{type:'date', prop:'endTime',extendType:'search', placeholder:"请选择"}},
        {  prop: 'endTime', label: '失效日期' ,formatter:atime2, sortProp:"endTime", search:{type:'date', prop:'endTime',extendType:'search', placeholder:"请选择"}},
        { prop: 'state', label: '授权状态',formatter:state,sortProp:"state", align: 'center',sort:true,search:{type:'select', prop:'state',placeholder:"请输入",data:obj.accreditState,selectProp:['valData','valCode']} },
     ]
};
let modelRange=(row)=>{
    let arr=[]
    if(row.modelRange){
        arr= row.modelRange.split(';').map((k,l)=>{
            let msgArr= k.split('__')[0].split('***')
            return msgArr.length>1? msgArr[0]+'（'+msgArr[1]+')':msgArr[0]
        })
    }
    return  arr.join(';')
}
export const authorizeConfig = (obj,arr) => {
    return [
        { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
         { prop: 'dept', label: '部门',sortProp:"dept", align: 'center',sort:true,search:{type:'input', prop:'dept',placeholder:"请输入"} },
        { prop: 'post', label: '岗位',sortProp:"post", align: 'center',sort:true,search:{type:'input', prop:'post',placeholder:"请输入"} },
        { prop: 'authorizationType', label: '授权类型',sortProp:"authorizationType", align: 'center',sort:true,search:{type:'select', prop:'authorizationType',placeholder:"请选择",data:obj.Z_accreditType,selectProp:['valData','valData']} },
        { prop: 'authorizedUnit', label: '授权单位',sortProp:"authorizedUnit", align: 'center',sort:true,search:{type:'input', prop:'authorizedUnit',placeholder:"请输入"} },
        { prop: 'flightType', label: '授权航班类型',sortProp:"flightType", align: 'center',sort:true,search:{type:'select', prop:'flightType',placeholder:"请选择",data:obj.accreditFlightType,selectProp:['valData','valData']} },
        { prop: 'modelRange', label: '授权机型',formatter:modelRange,sortProp:"modelRange", align: 'center',sort:true,search:{type:'select', prop:'modelRange',placeholder:"请选择",data:arr, selectProp:['name','id']} },
        { prop: 'state', label: '授权状态',formatter:state,sortProp:"state", align: 'center',sort:true,search:{type:'select', prop:'state',placeholder:"请选择",data:obj.accreditState,selectProp:['valData','valCode']} },
     ]
};
let  train=(row)=>{
    if(row.startTime){
        return moment(row.startTime).format('YYYY-MM-DD HH:mm')
    }else {
        return ''
    }
}
let  train1=(row)=>{
    if(row.endTime){
        return moment(row.endTime).format('YYYY-MM-DD HH:mm')
    }else {
        return ''
    }
}
export const trainManageUserConfig = (obj) => {
    return [

        { prop: 'trainingName', label: '培训项目',sortProp:"trainingName", align: 'center',sort: false,search:{type:'input', prop:'trainingName',placeholder:"请输入"} },
        { prop: 'startTime', label: '开始时间',formatter:  train,sortProp:"startTime", align: 'center',sort: false,search:{type:'date', prop:'startTime', placeholder:"请选择"}},
        { prop: 'endTime', label: '结束时间',formatter:  train1,sortProp:"endTime", align: 'center' ,sort: false,search:{type:'date', prop:'endTime' ,placeholder:"请选择"}},
        { prop: 'classHour', label: '学时',sortProp:"classHour", align: 'center' ,sort: false,search:{type:'input', prop:'classHour', placeholder:"请输入"}},
        { prop: 'trainingPlace', label: '地点',sortProp:"trainingPlace", align: 'center',sort: false,search:{type:'input', prop:'trainingPlace', placeholder:"请输入", } },
        // { prop: 'teacherName', label: '讲师', sortProp:"teacherName", align: 'center',sort: false,search:{type:'input', prop:'teacherName', placeholder:"请输入", } },
        { prop: 'qualifiedStatus',width:75, label: '考核成绩', sortProp:"qualifiedStatus", align: 'center',sort: false,search:{type:'input', prop:'qualifiedStatus', placeholder:"请输入", } },
        { prop: 'trainingType',width:120, label: '类别',sortProp:"trainingType", align: 'center',sort: false,search:{type:'select', prop:'trainingType',placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainType} },

        { prop: 'certificateNo', label: '证书编号', sortProp:"certificateNo", align: 'center',sort: false,search:{type:'input', prop:'certificateNo', placeholder:"请输入", } },
        { prop: 'remark', label: '备注', sortProp:"remark", align: 'center',sort: false,search:{type:'input', prop:'remark', placeholder:"请输入",extendType:'search' } },

    ]
};
let  test=(row)=>{
    if(row.examTime){
        return moment(row.examTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}
export const testRuConfig = ( obj) => {
    return [
         // { prop: 'employeeName', label: '员工姓名',  sortProp:"employeeName", align: 'center',sort: false ,search:{type:'input', prop:'employeeName',placeholder:"请输入"} },
        // { prop: 'employeeId', label: '员工编号',  sortProp:"employeeId", align: 'center',sort: false ,search:{type:'input', prop:'employeeId',placeholder:"请输入"} },
        { prop: 'examName', label: '考试名称',  sortProp:"examName", align: 'center',sort: false ,search:{type:'input', prop:'examName',placeholder:"请输入"} },
        { prop: 'examTime', label: '时间',formatter:test,sortProp:"examTime", align: 'center',sort: false,search:{type:'date', prop:'examTime',placeholder:"请选择"} },
        { prop: 'totalTime', label: '时长(分)',sortProp:"totalTime", align: 'center',sort: false, },
        { prop: 'examSite', label: '地点',sortProp:"examSite", align: 'center' ,sort: false, },
        { prop: 'examMode', label: '考试方式',sortProp:"examSite", align: 'center' ,sort: false, },
        { prop: 'examType', label: '考试类型',sortProp:"examType", align: 'center' ,sort: false, },
        { prop: 'qualificationType', label: '资质类型',sortProp:"qualificationType", align: 'center',sort: false,  },
        { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center',sort: false, },
        { prop: 'paperName', label: '试卷名称',sortProp:"paperName", align: 'center' ,sort: false, },
        // { slot: 'employeeFileId', label: '纸质试卷',sortProp:"employeeFileId", align: 'center' ,sort: false, },
        { prop: 'score', label: '分数', sortProp:"score", align: 'center',sort: false ,search:{type:'input', prop:'score',placeholder:"请输入"}},

      ]
};
