export const businessDataTable=[
    { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
    { prop: 'deptName', label: '业务数据类型编码', align: 'center',sort:true,search:{type:'input',placeholder:"请输入编码",data:'123',prop:'userNumber'} },
    { prop: 'deptName', label: '业务数据类型', align: 'center',sort:true,search:{type:'select',placeholder:"请选择类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'} },
    { prop: 'deptName', label: '业务数据类型说明', align: 'center',sort:true,search:{type:'input',placeholder:"请输入说明",data:'123',prop:'zhengshuNumber'} },
    { prop: 'deptName', label: '是否运行维护类型', align: 'center',sort:true,search:{type:'select',extendType:'search',placeholder:"请选择类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
];
export const businessSubsetTable=[
    { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
    { prop: 'deptName', label: '业务数据编码', align: 'center',sort:true,search:{type:'input',placeholder:"请输入编码",data:'123',prop:'userNumber'} },
    { prop: 'deptName', label: '业务数据', align: 'center',sort:true,search:{type:'select',placeholder:"请选择数据",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'} },
    { prop: 'deptName', label: '业务数据说明', align: 'center',sort:true,search:{type:'input',placeholder:"请输入说明",data:'123',prop:'zhengshuNumber'} },
    { prop: 'deptName', label: '是否启用', align: 'center',sort:true,search:{type:'select',extendType:'search',placeholder:"请选择是否启用",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
];