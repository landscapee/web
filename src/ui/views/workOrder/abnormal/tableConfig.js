




export const authorizeConfig = (obj,arr) => {
        return [
            { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
            { prop: 'userNumber', label: '工单模板版本号',sortProp:"userNumber", align: 'center',sort:false },
            { prop: 'userName', label: '最新版本标识',sortProp:"userName", align: 'center',sort:false,search:{type:'input', prop:'userName',placeholder:"请输入"} },
            { prop: 'dept', label: '工单模板编码',sortProp:"dept", align: 'center',sort:true,search:{type:'input', prop:'dept',placeholder:"请输入"} },
            { prop: 'post', label: '工单标题',sortProp:"post", align: 'center',sort:true,search:{type:'input', prop:'post',placeholder:"请输入"} },
            { prop: 'authorizationType', label: '模板启用日期',sortProp:"authorizationType", align: 'center',sort:true,search:{type:'date', prop:'authorizationType',placeholder:"请选择", } },
            { prop: 'authorizedUnit', label: '模板编制人',sortProp:"authorizedUnit", align: 'center',sort:true,search:{type:'input', prop:'authorizedUnit',placeholder:"请输入"} },
            { prop: 'flightType', label: '版本发布日期',sortProp:"flightType", align: 'center',sort:true,search:{type:'date', prop:'flightType',placeholder:"请选择" } },
            { prop: 'flightType', label: '版本生效日期',sortProp:"flightType", align: 'center',sort:true,search:{type:'date', prop:'flightType',placeholder:"请选择" } },
            { prop: 'flightType', label: '版本失效日期',sortProp:"flightType", align: 'center',sort:true,search:{type:'date', prop:'flightType',placeholder:"请选择" } },
            { prop: 'modelRange', label: '版本状态', sortProp:"modelRange", align: 'center',sort:true,search:{type:'select', prop:'modelRange',placeholder:"请选择",data:arr,selectProp:['name','id']} },
              { slot: 'option', label: '操作' ,width:'160',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
              ]
};

 