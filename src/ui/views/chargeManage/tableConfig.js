import { formatDate } from '@lib/tools.js';
export const sysParameterTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'workDate', label: '日期', align: 'center',sort:true,sortProp:"dicCodeMode",
            search:{type:'input',placeholder:"请输入编码",prop:'dicCode'},
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }
        },
        { prop: 'airLine', label: '航空公司', align: 'center',sort:true,sortProp:"dicTypeMode",search:{type:'input',placeholder:"请输入类型",selectProp:["aaa","bbb"],data:[{aaa:"类型1",bbb:"1"},{aaa:"类型2",bbb:"2"}],prop:'dicType'} },
        { prop: 'subsidiary', label: '分(子)公司', align: 'center',sort:true,sortProp:"dicSummaryMode",search:{type:'input',placeholder:"请输入说明",prop:'dicSummary'} },
        { prop: 'aircraftType', label: '飞机型号', align: 'center',sort:true,sortProp:"enableMaintainMode",search:{type:'select',placeholder:"请选择是否运行维护类型",data:[{label:"是",value:1},{label:"否",value:0}],prop:'enableMaintain'}},
        { prop: 'aircraftReg', label: '机号', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { prop: 'flightNo', label: '航班号', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { prop: 'arrivalAirport', label: '起降机场', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { prop: 'approveUserName', label: '审核人', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { prop: 'approveState', label: '审核时间', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { prop: 'dicCode', label: '审核状态', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { prop: 'sendFinance', label: '是否发送财务',width:'140', align: 'center',sort:true,sortProp:"dicCodeMode",search:{type:'input',placeholder:"请输入编码",prop:'dicCode'} },
        { slot: 'option', label: '操作',width:'230', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};

// 1 审核成功
// 2 失败
// 0 未审核

// 1 发送
// 0 未发送