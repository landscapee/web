export const businessDataTable=[
    { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
    { prop: 'dicCode', label: '业务数据类型编码', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",data:'123',prop:'dicCode'} },
    { prop: 'dicType', label: '业务数据类型', align: 'center',sort:true,sortProp:"dicTypeMode",search:{type:'select',placeholder:"请选择类型",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'dicType'} },
    { prop: 'dicSummary', label: '业务数据类型说明', align: 'center',sort:true,sortProp:"dicSummaryMode",search:{type:'input',placeholder:"请输入说明",data:'123',prop:'dicSummary'} },
    { prop: 'enableMaintain', label: '是否运行维护类型', align: 'center',
    formatter: function(row) {
        return row.enableMaintain==1?'是':'否';
    },
    sort:true,sortProp:"enableMaintainMode",search:{type:'select',extendType:'search',placeholder:"请选择是否运行维护类型",data:[{label:"是",value:1},{label:"否",value:0}],prop:'enableMaintain'}},
];
export const businessSubsetTable=[
    { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
    { prop: 'valData', label: '业务数据编码', align: 'center',sort:true,sortProp:"valDataMode",search:{type:'input',placeholder:"请输入编码",data:'123',prop:'valData'} },
    { prop: 'valCode', label: '业务数据', align: 'center',sort:true,sortProp:"valCodeMode",search:{type:'select',placeholder:"请选择数据",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'valCode'} },
    { prop: 'valSummary', label: '业务数据说明', align: 'center',sort:true,sortProp:"valSummaryMode",search:{type:'input',placeholder:"请输入说明",data:'123',prop:'valSummary'} },
    { prop: 'valStatus', label: '是否启用', align: 'center',
    formatter: function(row) {
        return row.valStatus==1?'是':'否';
    },
    sort:true,sortProp:"valStatusMode",search:{type:'select',extendType:'search',placeholder:"请选择是否启用",data:[{label:"是",value:1},{label:"否",value:0}],prop:'valStatus'}},
];
export const sysParameterTable=[
    { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
    { prop: '', label: '系统参数编码', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入参数编码",data:'123',prop:'valData'} },
    { prop: '', label: '系统参数', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入系统参数",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'valCode'} },
    { prop: '', label: '系统参数值', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入参数值",data:'123',prop:'valSummary'} },
    { prop: '', label: '系统参数说明',width:'990', align: 'center',sort:true,sortProp:"",search:{type:'input',extendType:'search',placeholder:"请输入系统参数说明",data:[{label:"是",value:1},{label:"否",value:0}],prop:'valStatus'}},
];
export const electronicFenceTable=[
    { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
    { prop: '', label: '机位号', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入参数编码",data:'123',prop:'valData'} },
    { prop: '', label: '定点经度', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入系统参数",data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],prop:'valCode'} },
    { prop: '', label: '定点纬度', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入参数值",data:'123',prop:'valSummary'} },
    { prop: '', label: '定点半径(米)', align: 'center',sort:true,sortProp:"",search:{type:'input',placeholder:"请输入参数值",data:'123',prop:'valSummary'} },
    { prop: '', label: '允许最大误差值(米)',width:'540', align: 'center',sort:true,sortProp:"",search:{type:'input',extendType:'search',placeholder:"请输入系统参数说明",data:[{label:"是",value:1},{label:"否",value:0}],prop:'valStatus'}},
];
