import { formatDate } from '@lib/tools.js';
export const warningConfigTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'subject', label: '预警名称', align: 'center',sort:true,sortProp:"subject",search:{prop:'subject',type:'input',placeholder:"请输入预警名称"} },
        { prop: 'contentTemplate', label: '预警模板', align: 'center',sort:true,sortProp:"contentTemplate",search:{prop:'contentTemplate',type:'input',placeholder:"请输入预警模板"} },
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
        search:{prop: 'recipientType',type:'input',extendType:'search',placeholder:"请输入推送对象"}},
    ]
};
export const warningSearchTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'sendDate', label: '日期',
        formatter: (row, column, cellValue) => {
            return formatDate(cellValue, 'YYYY-MM-DD', '--');

        },align: 'center',sort:true,sortProp:"sendDate",search:{prop:'sendDate',type:'date',placeholder:"请选择日期"} },
        { prop: 'source', label: '来源', align: 'center',sort:true,sortProp:"source",search:{prop:'source',type:'input',placeholder:"请输入来源"} },
        { prop: 'content', label: '内容', align: 'center',search:{prop:'content',type:'input',placeholder:"请输入内容"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const warningSearchHistoryTable = () => {
    return [
        { prop: 'sendDate', label: '日期',
        formatter: (row, column, cellValue) => {
            return formatDate(cellValue, 'YYYY-MM-DD', '--');

        },align: 'center',sort:true,sortProp:"sendDate",search:{prop:'sendDate',type:'date',placeholder:"请选择日期"} },
        { prop: 'source', label: '来源', align: 'center',sort:true,sortProp:"source",search:{prop:'source',type:'input',placeholder:"请输入来源"} },
        { prop: 'content', label: '内容', align: 'center',search:{prop:'content',type:'input',placeholder:"请输入内容"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const subscribeConfigTable = (infoSelect) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'name', label: '订阅名称', align: 'center',search:{prop:'name',type:'input',placeholder:"请输入订阅名称"} },
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"type",search:{prop:'type',type:'select',selectProp:["valData","valData"],data:infoSelect,placeholder:"请选择信息类型"} },
        { prop: 'enable', label: '是否启用', formatter: (row, column, cellValue) => {
            return cellValue?'是':'否';
        },align: 'center',sort:true,sortProp:"enable",search:{prop:'enable',type:'select',data:[{label:"是",value:true},{label:"否",value:false}],placeholder:"请选择是否启用"} },
        { prop: '',formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptDepartment){
                row.receiptDepartment.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }

        }, label: '接收单位', align: 'center',search:{prop:'receiptDepartment',type:'input',placeholder:"请输入接收单位"} },
        { prop: '', formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptPerson){
                row.receiptPerson.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }
        },label: '接收人',width:'540', align: 'center',search:{prop:'receiptPerson',type:'input',extendType:'search',placeholder:"请输入接收人"}},
    ]
};
export const infoPlateSendTable = (infoSelect) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"type",search:{prop:'type',type:'select',selectProp:["valData","valData"],data:infoSelect,placeholder:"请选择信息类型"} },
        { prop: 'sendDate', label: '发送时间', align: 'center',
        formatter: (row, column, cellValue) => {
            return formatDate(cellValue, 'YYYY-MM-DD', '--');
        },
        sort:true,sortProp:"sendDate",search:{prop:'sendDate',type:'date',placeholder:"请选择发送时间"} },
        { prop: 'content', label: '发送内容', align: 'center',search:{prop:'content',type:'input',placeholder:"请输入发送内容"} },
        { prop: '', label: '接收单位',
        formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptDepartment){
                row.receiptDepartment.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }
        },
        align: 'center',search:{prop:'receiptDepartment',type:'input',placeholder:"请输入接收单位"} },
        { prop: '', label: '接收人',
        formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptPerson){
                row.receiptPerson.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }
        },
         align: 'center',search:{prop:'receiptPerson',type:'input',placeholder:"请输入接收人"} },
        { prop: 'require', label: '是否接收处理',
        formatter: (row, column, cellValue) => {
            return cellValue?'是':'否';
        },
         align: 'center',search:{prop:'require',type:'select',data:[{label:"是",value:true},{label:"否",value:false}],placeholder:"请选择是否接收处理"} },
        { prop: 'deadline', label: '要求处理时间',
        formatter: (row, column, cellValue) => {
            return formatDate(cellValue, 'YYYY-MM-DD', '--');
        },
         align: 'center',sort:true,sortProp:"deadline",search:{prop:'deadline',type:'date',placeholder:"请选择要求处理时间"} },
        { slot: 'attachment', label: '附件',width:'70', align: 'center',sort:false},
        { prop: 'state', label: '信息状态',
        formatter: (row, column, cellValue) => {
            return cellValue==0?'未发布':cellValue==1?'已发布':cellValue==-1?'已关闭':'';
        },align: 'center',sort:true,sortProp:"state",search:{prop:'state',type:'select',data:[{'label':'未发布',value:0},{'label':'已发布',value:1}],placeholder:"请选择信息状态"} },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const infoPlateReceiveTable = (infoSelect) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"type",search:{prop:'type',type:'select',selectProp:["valData","valData"],data:infoSelect,placeholder:"请选择信息类型"} },
        { prop: 'sendDate', label: '发送时间',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            align: 'center',sort:true,sortProp:"sendDate",search:{prop:'sendDate',type:'date',placeholder:"请选择发送时间"}
        },
        { prop: 'sendDepartment', label: '发送单位',
            formatter: (row, column, cellValue) => {
                return cellValue;
            },
            align: 'center',search:{prop:'sendDepartment',type:'input',placeholder:"请输入发送单位"} },
        { prop: 'sendPerson', label: '发送人',
            formatter: (row, column, cellValue) => {
                return cellValue;
            },
            align: 'center',search:{prop:'sendPerson',type:'input',placeholder:"请输入发送人"} },
        { prop: 'content', label: '发送内容',
            formatter: (row, column, cellValue) => {
                return cellValue;
            },
            align: 'center',search:{prop:'content',type:'input',placeholder:"请输入发送内容"} },
        { prop: 'require', label: '是否接收处理',
            formatter: (row, column, cellValue) => {
                return cellValue?'是':'否';
            },
            align: 'center',search:{prop:'require',type:'select',data:[{label:"是",value:true},{label:"否",value:false}],placeholder:"请选择是否接收处理"}
        },
        { prop: 'deadline', label: '要求处理时间',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            align: 'center',sort:true,sortProp:"deadline",search:{prop:'deadline',type:'date',placeholder:"请选择要求处理时间"}
        },
        { slot: 'attachment', label: '附件',width:'70', align: 'center',sort:false},
        { prop: 'state', label: '信息状态',
            formatter: (row, column, cellValue) => {
                return cellValue==0?'未处理':cellValue==1?'已处理':cellValue==-1?'已关闭':'';
            },
            align: 'center',sort:true,sortProp:"state",search:{prop:'state',type:'select',data:[{'label':'未处理','value':0},{'label':'已处理','value':1}],placeholder:"请输入信息状态"}
        },
        { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const historyPlateReceiveTable = (infoSelect) => {
    return [
        { prop: 'type', label: '信息类型', align: 'center',sort:true,sortProp:"type",search:{prop:'type',type:'select',selectProp:["valData","valData"],data:infoSelect,placeholder:"请选择信息类型"} },
        { prop: 'sendDate', label: '发送时间',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
         align: 'center',sort:true,sortProp:"sendDate",search:{prop:'sendDate',type:'date',placeholder:"请选择发送时间"} },
        { prop: 'content', label: '发送内容', width:300,align: 'center',search:{prop:'content',type:'input',placeholder:"请输入发送内容"} },
        { prop: 'sendDepartment', label: '发送单位', align: 'center',search:{prop:'sendDepartment',type:'input',placeholder:"请输入接收单位"} },
        { prop: 'sendPerson', label: '发送人', align: 'center',search:{prop:'sendPerson',type:'input',placeholder:"请输入接收人"} },
        { prop: 'require', label: '是否接收处理',
            formatter: (row, column, cellValue) => {
                return cellValue?'是':'否';
            },
            align: 'center',search:{prop:'require',type:'select',data:[{label:"是",value:true},{label:"否",value:false}],placeholder:"请选择是否接收处理"}
        },
        { prop: 'deadline', label: '要求处理时间',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            align: 'center',sort:true,sortProp:"deadline",search:{prop:'deadline',type:'date',placeholder:"请选择要求处理时间"}
        },
        { prop: 'state', label: '信息状态',
            formatter: (row, column, cellValue) => {
                return cellValue==0?'未处理':cellValue==1?'已处理':cellValue==-1?'已关闭':'';
            },
            align: 'center',sort:false,sortProp:"state"
        },
        { slot: 'attachment', label: '附件',width:'70', align: 'center',sort:false},
        // { slot: 'relationInfo', label: '操作' ,width:'148',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
export const selectSubscribeTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'name', label: '订阅名称', align: 'center',search:{prop:'',type:'input',placeholder:""} },
        { prop: '',formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptDepartment){
                row.receiptDepartment.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }

        }, label: '接收单位', align: 'center',search:{prop:'receiptDepartment',type:'input',placeholder:"请输入接收单位"} },
        { prop: '', formatter: (row, column, cellValue) => {
            let arr = [];
            if(row.receiptPerson){
                row.receiptPerson.map(item=>{
                    arr.push(item.name);
                })
                return arr.join(",");
            }else{
                return '';
            }
        },label: '接收人',width:'540', align: 'center',search:{prop:'receiptPerson',type:'input',extendType:'search',placeholder:"请输入接收人"}},
    ]
};
