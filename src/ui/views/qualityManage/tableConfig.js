export const intelligenceManageTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
                { prop: 'deptName', label: '员工编号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工编号",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '员工姓名', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工姓名",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '资质证书号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '资质名称', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zzName'}},
                { prop: 'deptName', label: '资质类型', align: 'center' ,sort:true,search:{type:'select',placeholder:"请选择资质类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
                { prop: 'deptName', label: '颁发日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择颁发日期",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '颁发单位', align: 'center' ,sort:true,search:{type:'input',placeholder:"请选择颁发单位",data:'123',prop:'bfUnit'}},
                { prop: 'deptName', label: '适用业务', align: 'center',sort:true,search:{type:'input',placeholder:"请输入适用业务",data:'123',prop:'syBusiness'} },
                { prop: 'deptName', label: '生效日期', align: 'center',sort:true,search:{type:'date',placeholder:"请选择生效日期",data:'123',prop:'shengxDate'} },
                { prop: 'deptName', label: '失效日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { slot: 'relationInfo', label: '关联信息' ,width:'148',search:{type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const exaRecordTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
                { prop: 'deptName', label: '员工编号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工编号",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '员工姓名', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工姓名",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '资质证书号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '资质名称', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zzName'}},
                { prop: 'deptName', label: '资质类型', align: 'center' ,sort:true,search:{type:'select',placeholder:"请选择资质类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
                { prop: 'deptName', label: '颁发日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择颁发日期",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '颁发单位', align: 'center' ,sort:true,search:{type:'input',placeholder:"请选择颁发单位",data:'123',prop:'bfUnit'}},
                { prop: 'deptName', label: '适用业务', align: 'center',sort:true,search:{type:'input',placeholder:"请输入适用业务",data:'123',prop:'syBusiness'} },
                { prop: 'deptName', label: '生效日期', align: 'center',sort:true,search:{type:'date',placeholder:"请选择生效日期",data:'123',prop:'shengxDate'} },
                { prop: 'deptName', label: '失效日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { slot: 'relationInfo', label: '关联信息' ,width:'148',search:{type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const assRecordTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
                { prop: 'deptName', label: '培训名称', align: 'center',sort:true,search:{type:'input',placeholder:"请输入培训名称",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '培训时间', align: 'center',sort:true,search:{type:'date',placeholder:"请选择培训时间",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '培训课程', align: 'center',sort:true,search:{type:'input',placeholder:"请输入培训课程",data:'123',prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '培训讲师', align: 'center',sort:true,search:{type:'input',placeholder:"请输入培训讲师",data:'123',prop:'zzName'}},
                { prop: 'deptName', label: '讲师等级', align: 'center' ,sort:true,search:{type:'select',placeholder:"请选择讲师等级",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
                { prop: 'deptName', label: '培训资质类型', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入资质类型",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '培训业务范围', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入业务范围",data:'123',prop:'bfUnit'}},
                { prop: 'deptName', label: '考核结果', align: 'center',sort:true,search:{type:'select',placeholder:"请选择考核结果",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'syBusiness'} },
                { prop: 'deptName', label: '培训评价' ,width:'148',search:{type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const personDocTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'筛选'}},
                { prop: 'deptName', label: '员工编号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工编号",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '员工姓名', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工姓名",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '身份证号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入身份证号",data:'123',prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '性别', align: 'center',sort:true,search:{type:'input',placeholder:"请输入性别",data:'123',prop:'zzName'}},
                { prop: 'deptName', label: '入职日期', align: 'center' ,sort:true,search:{type:'select',placeholder:"请选择入职日期",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
                { prop: 'deptName', label: '在岗状态', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择在岗状态",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '所在项目', align: 'center' ,sort:true,search:{type:'input',placeholder:"请选择颁发单位",data:'123',prop:'bfUnit'}},
                { prop: 'deptName', label: '上级员工编码', align: 'center',sort:true,search:{type:'input',placeholder:"请输入适用业务",data:'123',prop:'syBusiness'} },
                { prop: 'deptName', label: '上级姓名', align: 'center',sort:true,search:{type:'date',placeholder:"请选择生效日期",data:'123',prop:'shengxDate'} },
                { prop: 'deptName', label: '档案失效日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { slot: 'relationInfo', label: '操作' ,width:'298',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const userQualiTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'筛选'}},
                { prop: 'deptName', label: '资质证书号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '资质名称', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质名称",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '资质类型', align: 'center',sort:true,search:{type:'select',placeholder:"请选择资质类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '颁发资质日期', align: 'center',sort:true,search:{type:'date',placeholder:"请选择颁发资质日期",data:'123',prop:'zzName'}},
                { prop: 'deptName', label: '颁发资质单位', align: 'center' ,sort:true,search:{type:'select',placeholder:"请选择颁发资质单位",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
                { prop: 'deptName', label: '资质生效日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择资质生效日期",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '资质失效日期', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择资质失效日期",data:'123',prop:'bfUnit'}},
                { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const userAuthTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49'},
                { prop: 'deptName', label: '所属部门', align: 'center',sort:true },
                { prop: 'deptName', label: '授权类型', align: 'center',sort:true},
                { prop: 'deptName', label: '基础执照编号', align: 'center',sort:true },
                { prop: 'deptName', label: '专业', align: 'center',sort:true},
                { prop: 'deptName', label: '航班类型权限', align: 'center' ,sort:true},
                { prop: 'deptName', label: '机型范围', align: 'center' ,sort:true},
                { prop: 'deptName', label: '授权单位', align: 'center' ,sort:true},
                { prop: 'deptName', label: '授权生效日期', align: 'center',sort:true},
                { prop: 'deptName', label: '授权失效日期', align: 'center',sort:true},
                { prop: 'deptName', label: '授权状态', align: 'center' ,sort:true},
        ]
};
export const useAssRecordTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49'},
                { prop: 'deptName', label: '培训名称', align: 'center',sort:true },
                { prop: 'deptName', label: '培训时间', align: 'center',sort:true },
                { prop: 'deptName', label: '培训课程', align: 'center',sort:true },
                { prop: 'deptName', label: '培训讲师', align: 'center',sort:true},
                { prop: 'deptName', label: '讲师等级', align: 'center' ,sort:true},
                { prop: 'deptName', label: '培训业务类型', align: 'center' ,sort:true},
                { prop: 'deptName', label: '培训业务范围', align: 'center' ,sort:true},
                { prop: 'deptName', label: '培训结论', align: 'center',sort:true},
                { prop: 'deptName', label: '培训评价', align: 'center',sort:true},
        ]
};
export const authorizeManageTable = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'筛选'}},
                { prop: 'deptName', label: '员工编号',width:'148', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工编号",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '员工姓名',width:'148', align: 'center',sort:true,search:{type:'input',placeholder:"请输入员工姓名",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '所在部门',width:'148', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '授权类型',width:'148', align: 'center',sort:true,search:{type:'input',placeholder:"请输入资质证书号",data:'123',prop:'zzName'}},
                { prop: 'deptName', label: '基础执照编号',width:'148', align: 'center' ,sort:true,search:{type:'select',placeholder:"请选择资质类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzType'}},
                { prop: 'deptName', label: '专业',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择颁发日期",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '航班类型权限',width:'148', align: 'center' ,sort:true,search:{type:'input',placeholder:"请选择颁发单位",data:'123',prop:'bfUnit'}},
                { prop: 'deptName', label: '机型范围',width:'148', align: 'center',sort:true,search:{type:'input',placeholder:"请输入适用业务",data:'123',prop:'syBusiness'} },
                { prop: 'deptName', label: '授权单位',width:'148', align: 'center',sort:true,search:{type:'date',placeholder:"请选择生效日期",data:'123',prop:'shengxDate'} },
                { prop: 'deptName', label: '档案生效日期',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择档案生效日期",data:'123',prop:'shixDate'}},
                { prop: 'deptName', label: '档案失效日期',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { prop: 'deptName', label: '授权状态',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { prop: 'deptName', label: '授权状态',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { prop: 'deptName', label: '授权状态',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { prop: 'deptName', label: '授权状态',width:'148', align: 'center' ,sort:true,search:{type:'date',placeholder:"请选择失效日期",data:'123',prop:'shixDate'}},
                { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const warningManageTable= () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
                { prop: 'deptName', label: '预警发送日期', align: 'center',sort:true,search:{type:'date',placeholder:"请选择预警发送日期",data:'123',prop:'userNumber'} },
                { prop: 'deptName', label: '预警内容', align: 'center',sort:true,search:{type:'input',placeholder:"请输入预警内容",data:'123',prop:'userName'} },
                { prop: 'deptName', label: '预警类型', align: 'center',sort:true,search:{type:'input',placeholder:"请选择预警类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zhengshuNumber'} },
                { prop: 'deptName', label: '预警来源', align: 'center',sort:true,search:{type:'input',placeholder:"请选择预警来源",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'zzName'}},
                { prop: 'deptName', label: '来源员工编号', align: 'center' ,sort:true,search:{type:'select',placeholder:"请输入来源员工编号",data:'123',prop:'zzType'}},
                { prop: 'deptName', label: '来源员工', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入来源员工",data:'123',prop:'bfDate'}},
                { prop: 'deptName', label: '员工上级', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入员工上级",data:'123',prop:'bfUnit'}},
                { prop: 'deptName', label: '预警状态', align: 'center',sort:true,search:{type:'select',placeholder:"请选择预警状态",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'syBusiness'} },
                { slot: 'relationInfo', label: '操作' ,width:'298',search:{type:'btn',label:'搜索',icon:"table_search"}}
        ]
};