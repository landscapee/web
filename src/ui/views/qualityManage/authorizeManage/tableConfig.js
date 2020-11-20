


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
    let arr=[]
    if(row.modelRange){
        arr= row.modelRange.split(';').map((k,l)=>{
           let reg = /(.{1,})\*\*\*(.*)\$\$\$(.*)__(.*)/g;
           reg.test(k)
           let s=RegExp.$3?'$1（$3）':'$1'
            let bbb=  k.replace(reg,s)
             return bbb
       })
   }
    return  arr.join(';')
}
export const authorizeConfig = (obj,arr) => {
         return [
            { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
            { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center',sort:true,search:{type:'input', prop:'userNumber',placeholder:"请输入"} },
            { prop: 'userName', label: '员工姓名',sortProp:"userName", align: 'center',sort:true,search:{type:'input', prop:'userName',placeholder:"请输入"} },
            { prop: 'dept', label: '部门/项目',sortProp:"dept", align: 'center',sort:true,search:{type:'input', prop:'dept',placeholder:"请输入"} },
            { prop: 'post', label: '岗位',sortProp:"post", align: 'center',sort:true,search:{type:'input', prop:'post',placeholder:"请输入"} },
            { prop: 'authorizationType', label: '授权类型',sortProp:"authorizationType", align: 'center',sort:true,search:{type:'select', prop:'authorizationTypeQuery',placeholder:"请选择",data:obj.roleControl,selectProp:['valData','valData']} },
            { prop: 'authorizedUnit', label: '授权单位',sortProp:"authorizedUnit", align: 'center',sort:true,search:{type:'input', prop:'authorizedUnit',placeholder:"请输入"} },
            { prop: 'flightType', label: '授权航班类型',sortProp:"flightType", align: 'center',sort:true,search:{type:'select', prop:'flightType',placeholder:"请选择",data:obj.accreditFlightType,selectProp:['valData','valData']} },
            { prop: 'modelRange', label: '授权机型',formatter:modelRange,sortProp:"modelRange", align: 'center',sort:true,search:{type:'select', prop:'modelRange',placeholder:"请选择",data:arr,selectProp:['name','id']} },
            { prop: 'modelRangeRemark', label: '授权机型说明' ,sortProp:"modelRangeRemark", align: 'center',sort:true,search:{type:'input', prop:'modelRangeRemark',placeholder:"请输入" } },
            { prop: 'state', label: '授权状态',formatter:state,sortProp:"state", align: 'center',sort:true,search:{type:'select', prop:'state',placeholder:"请选择",data:obj.accreditState,selectProp:['valData','valCode']} },
             { slot: 'option', label: '关联信息查看' ,width:'120',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
              ]
};

