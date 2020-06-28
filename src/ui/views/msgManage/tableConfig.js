export const warningConfigTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'subject', label: '预警名称', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入预警名称"} },
        { prop: 'contentTemplate', label: '预警模板', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入预警模板"} },
        {  label: '推送对象',width:'540', align: 'left',
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
        { prop: 'sendDate', label: '日期',
        formatter: (row, column, cellValue) => {
            console.log(row);
        },align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择日期"} },
        { prop: 'source', label: '来源', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入来源"} },
        { prop: 'content', label: '内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入内容"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const warningSearchHistoryTable = () => {
    return [
        { prop: 'sendDate', label: '日期', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择日期"} },
        { prop: 'source', label: '来源', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入来源"} },
        { prop: 'content', label: '内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入内容"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const subscribeConfigTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择日期"} },
        { prop: 'enable', label: '是否启用', formatter: (row, column, cellValue) => {
            return cellValue?'是':'否';
        },align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入来源"} },
        { prop: '',formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptPerson){
                row.receiptPerson.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }
        }, label: '接收单位', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入内容"} },
        { prop: '', formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptDepartment){
                row.receiptDepartment.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }
           
           
        },label: '接收人',width:'540', align: 'center',search:{prop: '',type:'select',extendType:'search',placeholder:"请选择接收人"}},
    ]
};
export const infoPlateSendTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择信息类型"} },
        { prop: 'sendDate', label: '发送时间', align: 'center', 
        formatter: (row, column, cellValue) => {
            return cellValue?'是':'否';
        }, 
        sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择发送时间"} },
        { prop: 'content', label: '发送内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送内容"} },
        { prop: 'receiptDepartment', label: '接收单位', align: 'center',search:{prop:'',type:'input',placeholder:"请输入接收单位"} },
        { prop: 'receiptPerson', label: '接收人', align: 'center',search:{prop:'',type:'input',placeholder:"请输入接收人"} },
        { prop: 'require', label: '是否接收处理',
        formatter: (row, column, cellValue) => {
            return cellValue?'是':'否';
        }, align: 'center',search:{prop:'',type:'input',placeholder:"请选择是否接收处理"} },
        { prop: 'deadline', label: '要求处理时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择要求处理时间"} },
        { prop: 'attachment', label: '附件', align: 'center',search:{prop:'',type:'input',placeholder:"请输入附件"} },
        { prop: 'state', label: '信息状态', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入信息状态"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const infoPlateReceiveTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择信息类型"} },
        { prop: 'sendDate', label: '发送时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择发送时间"} },
        { prop: '', label: '发送单位', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送单位"} },
        { prop: '', label: '发送人', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送人"} },
        { prop: 'content', label: '发送内容', align: 'center',search:{prop:'',type:'input',placeholder:"请输入发送内容"} },
        { prop: 'require', label: '是否接收处理', align: 'center',search:{prop:'',type:'input',placeholder:"请选择是否接收处理"} },
        { prop: 'deadline', label: '要求处理时间', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请选择要求处理时间"} },
        { prop: 'attachment', label: '附件', align: 'center',search:{prop:'',type:'input',placeholder:"请输入附件"} },
        { prop: 'state', label: '信息状态', align: 'center',sort:true,sortProp:"",search:{prop:'',type:'input',placeholder:"请输入信息状态"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const historyPlateSendTable = () => {
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
export const historyPlateReceiveTable = () => {
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