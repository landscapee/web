


let state=(row)=>{
    if(row.state===0){
         return '未授权'
    }else if(row.state===1){
        return '已授权'
    }else if(row.state===2){
        return '授权取消'
    }
};
let modelRange=(row)=>{
    return row.modelRange?row.modelRange.split('__')[0]:''
}
export const authorizeConfig = (obj) => {
        return [
            { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
            { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center',sort:true,search:{type:'input', prop:'userNumber',placeholder:"请输入"} },
            { prop: 'userName', label: '员工姓名',sortProp:"userName", align: 'center',sort:true,search:{type:'input', prop:'userName',placeholder:"请输入"} },
            { prop: 'dept', label: '部门',sortProp:"dept", align: 'center',sort:true,search:{type:'input', prop:'dept',placeholder:"请输入"} },
            { prop: 'post', label: '岗位',sortProp:"post", align: 'center',sort:true,search:{type:'input', prop:'post',placeholder:"请输入"} },
            { prop: 'authorizationType', label: '授权类型',sortProp:"authorizationType", align: 'center',sort:true,search:{type:'select', prop:'authorizationType',placeholder:"请输入",data:obj.Z_accreditType,selectProp:['valData','valData']} },
            { prop: 'authorizedUnit', label: '授权单位',sortProp:"authorizedUnit", align: 'center',sort:true,search:{type:'input', prop:'authorizedUnit',placeholder:"请输入"} },
            { prop: 'flightType', label: '授权航班类型',sortProp:"flightType", align: 'center',sort:true,search:{type:'select', prop:'flightType',placeholder:"请输入",data:obj.accreditFlightType,selectProp:['valData','valData']} },
            { prop: 'modelRange', label: '授权机型',formatter:modelRange,sortProp:"modelRange", align: 'center',sort:true,search:{type:'input', prop:'modelRange',placeholder:"请输入"} },
            { prop: 'state', label: '授权状态',formatter:state,sortProp:"state", align: 'center',sort:true,search:{type:'select', prop:'state',placeholder:"请输入",data:obj.accreditState,selectProp:['valData','valCode']} },
             { slot: 'option', label: '关联信息查看' ,width:'190',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
              ]
};

 