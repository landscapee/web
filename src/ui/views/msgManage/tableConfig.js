export const warningConfigTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'subject', label: '预警名称', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入预警名称"} },
        { prop: 'contentTemplate', label: '预警模板', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入预警模板"} },
        {  label: '推送对象',width:'540', align: 'center',
        formatter: (row, column, cellValue) => {
            let arr = [];
            row.recipientType.map(item=>{
                item.value.map(item2=>{
                    if(item2.name != null && item2.name){
                        arr.push(item2.name);
                    }
                })
            })
            return arr.join(",");
        },
        search:{prop: '',type:'input',extendType:'search',placeholder:"请输入推送对象"}},
    ]
};
export const warningSearchTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: '', label: '日期', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择日期"} },
        { prop: '', label: '来源', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入来源"} },
        { prop: '', label: '内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入内容"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const warningSearchHistoryTable = () => {
    return [
        { prop: '', label: '日期', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择日期"} },
        { prop: '', label: '来源', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入来源"} },
        { prop: '', label: '内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入内容"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const subscribeConfigTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: '', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择日期"} },
        { prop: '', label: '是否启用', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入来源"} },
        { prop: '', label: '接收单位', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入内容"} },
        { prop: '', label: '接收人',width:'540', align: 'center',search:{prop: '',type:'select',extendType:'search',placeholder:"请选择接收人"}},
    ]
};
export const infoPlateSendTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: '', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择信息类型"} },
        { prop: '', label: '发送时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择发送时间"} },
        { prop: '', label: '发送内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送内容"} },
        { prop: '', label: '接收单位', align: 'center',search:{prop:'',type:'input',placeholder:"请输入接收单位"} },
        { prop: '', label: '接收人', align: 'center',search:{prop:'',type:'input',placeholder:"请输入接收人"} },
        { prop: '', label: '是否接收处理', align: 'center',search:{prop:'',type:'input',placeholder:"请选择是否接收处理"} },
        { prop: '', label: '要求处理时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择要求处理时间"} },
        { prop: '', label: '附件', align: 'center',search:{prop:'',type:'input',placeholder:"请输入附件"} },
        { prop: '', label: '信息状态', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入信息状态"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const infoPlateReceiveTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: '', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择信息类型"} },
        { prop: '', label: '发送时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择发送时间"} },
        { prop: '', label: '发送单位', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送单位"} },
        { prop: '', label: '发送人', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送人"} },
        { prop: '', label: '发送内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送内容"} },
        { prop: '', label: '是否接收处理', align: 'center',search:{prop:'',type:'input',placeholder:"请选择是否接收处理"} },
        { prop: '', label: '要求处理时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择要求处理时间"} },
        { prop: '', label: '附件', align: 'center',search:{prop:'',type:'input',placeholder:"请输入附件"} },
        { prop: '', label: '信息状态', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入信息状态"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const historyInfoPlateTable = () => {
    return [
        { prop: '', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择信息类型"} },
        { prop: '', label: '发送时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择发送时间"} },
        { prop: '', label: '发送内容', width:300,align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送内容"} },
        { prop: '', label: '接收单位', align: 'center',search:{prop:'',type:'input',placeholder:"请输入接收单位"} },
        { prop: '', label: '接收人', align: 'center',search:{prop:'',type:'input',placeholder:"请输入接收人"} },
        { prop: '', label: '是否接收处理', align: 'center',search:{prop:'',type:'input',placeholder:"请选择是否接收处理"} },
        { prop: '', label: '要求处理时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择要求处理时间"} },
        { prop: '', label: '附件', align: 'center',search:{prop:'',type:'input',placeholder:"请输入附件"} },
        { prop: '', label: '信息状态', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入信息状态"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
