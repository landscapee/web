export const intelligenceManageTable=[
        { slot: 'radio' , label: '选择',search:{width:'49',type:'text',label:'筛选'}},
        { prop: 'deptName', label: '员工编号', align: 'center',search:{sort:true,type:'input',placeholder:"请输入员工编号",data:'123',prop:'userNumber'} },
        { prop: 'deptName', label: '员工姓名', align: 'center',search:{sort:true,type:'input',placeholder:"请输入员工姓名",data:'123',prop:'userName'} },
        { prop: 'deptName', label: '资质证书号', align: 'center',search:{sort:true,type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zhengshuNumber'} },
        { prop: 'deptName', label: '资质名称', align: 'center',search:{sort:true,type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zzName'}},
        { prop: 'deptName', label: '资质类型', align: 'center' ,search:{sort:true,type:'select',placeholder:"请选择资质类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
        { prop: 'deptName', label: '颁发日期', align: 'center' ,search:{sort:true,type:'date',placeholder:"请选择颁发日期",data:'123',prop:'bfDate'}},
        { prop: 'deptName', label: '颁发单位', align: 'center' ,search:{sort:true,type:'input',placeholder:"请选择颁发单位",data:'123',prop:'bfUnit'}},
        { prop: 'deptName', label: '适用业务', align: 'center',search:{sort:true,type:'input',placeholder:"请输入适用业务",data:'123',prop:'syBusiness'} },
        { prop: 'deptName', label: '生效日期', align: 'center',search:{sort:true,type:'date',placeholder:"请选择生效日期",data:'123',prop:'shengxDate'} },
        { prop: 'deptName', label: '失效日期', align: 'center' ,search:{sort:true,type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
        { slot: 'relationInfo', label: '关联信息' ,search:{width:'149',type:'btn',label:'搜索',icon:"table_search"}}
];
