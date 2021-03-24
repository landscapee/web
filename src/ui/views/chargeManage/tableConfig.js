import { formatDate } from '@lib/tools.js';
let tranTime=(row, column, cellValue)=>{

    return row.sendFinance=='1'? cellValue&&formatDate(cellValue, 'YYYY-MM-DD', '--'):''
}
export const sysParameterTable = () => {
    return [
        { slot: 'checkbox' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'workDate',width:'100', label: '日期', align: 'center',sort:true,sortProp:"workDate",
            search:{type:'date',placeholder:"请选择",prop:'workDateQuery'},
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--')
            }
        },
        {   prop: 'inOrOut', label: '收费单类型',width:110, align: 'center',sort:false,sortProp:"inOrOut",
            formatter:(row, column, cellValue) => {
                return row.inOrOut?'国内':'国际'
            },
            search:{type:'select',placeholder:"请输入",
                selectProp:["labelData", "valData"], data: [{valData:true,labelData:'国内'},{valData:false,labelData:'国际'}],
            prop:'inOrOut'} },
        {   prop: 'airLine', label: '航空公司', align: 'center',sort:true,sortProp:"airLine",
            search:{type:'input',placeholder:"请输入",
            prop:'airLine'} },

        { prop: 'aircraftType', label: '飞机型号', align: 'center',sort:true,
            sortProp:"aircraftType",search:{type:'input',placeholder:"请输入",
            prop:'aircraftTypeQuery'}},
        { prop: 'aircraftReg', label: '机号', align: 'center',sort:true,sortProp:"aircraftReg",
        search:{type:'input',placeholder:"请输入",prop:'aircraftReg'} },
        { prop: 'flightNo', label: '航班号', align: 'center',sort:true,sortProp:"flightNo",
        search:{type:'input',placeholder:"请输入",prop:'flightNo'} },
        { prop: 'arrivalAirport', label: '起降机场', align: 'center',sort:true,sortProp:"arrivalAirport",
        search:{type:'input',placeholder:"请输入",prop:'arrivalAirport'} },
        { prop: 'approveUserName', label: '审核人', align: 'center',sort:true,
        sortProp:"approveUserName",search:{type:'input',placeholder:"请输入",prop:'approveUserName'} },
        { prop: 'approveTime',width:'140', label: '审核日期', align: 'center',sort:true,
            sortProp:"approveTime",search:{type:'date',placeholder:"请选择审核日期",prop:'approveTimeQuery'},
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD HH:mm', '--')
            }
        },
        { prop: 'approveState', label: '审核状态', align: 'center',sort:true,
            sortProp:"approveState",
            search:{
                type:'select',placeholder:"请选择",prop:'approveState',
                selectProp:["labelData", "valData"],
                data: [{valData:"0",labelData:'未审核'},{valData:"1",labelData:'审核成功'},{valData:"2",labelData:'审核失败'}],
            },
            formatter: (row, column, cellValue) => {
                let a = {
                    '0': '未审核',
                    '1': '审核成功',
                    '2': '审核失败'
                }
                return a[row.approveState]
            }
        },
        { prop: 'sendFinance', label: '发送数据中心', width:'110', align: 'center',sort:true,
            sortProp:"sendFinance",
            search:{
                type:'select',placeholder:"请选择",prop:'sendFinance',
                selectProp:["labelData", "valData"], data: [{valData:"0",labelData:'未发送'},{valData:"1",labelData:'已发送'}]
            },
            formatter: (row, column, cellValue) => {
                let a = {
                    '1': '已发送',
                    '0': '未发送'
                }
                return a[row.sendFinance]
            }
        },
        { prop: 'sendTime', label: '发送时间', formatter:tranTime, align: 'center',sort:true,
            sortProp:"sendTime",search:{type:'date',placeholder:"请选择",prop:'sendTime'} },
        { slot: 'option', label: '操作',width:'80', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
}

// 1 审核成功
// 2 失败
// 0 未审核

// 1 发送
// 0 未发送
