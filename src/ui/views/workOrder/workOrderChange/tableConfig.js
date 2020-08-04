import { formatDate } from '@lib/tools.js';
export const sysParameterTable = () => {
    return [
        { 
            prop: 'workTime', label: '工作日期', align: 'center',sort:true,sortProp:"workTime",
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'workTime',type:'date',placeholder:"请输入"} 
        },
        { prop: 'department', label: '执行单位', align: 'center', sort:true,sortProp:"department",search:{prop:'department',type:'input',placeholder:"请输入"} },
        { prop: 'seat', label: '机位', align: 'center', sort:true,sortProp:"seat",search:{prop:'seat',type:'input',placeholder:"请输入"} },
        { prop: 'flightState', label: '航班类型', align: 'center', sort:true,sortProp:"flightState",search:{prop:'flightState',type:'input',placeholder:"请输入"} },
        { prop: 'flightNo', label: '航班号', align: 'center', sort:true,sortProp:"flightNo",search:{prop:'flightNo',type:'input',placeholder:"请输入"} },
        { prop: 'airlineCompany', label: '航空公司', align: 'center',sort:true,sortProp:"airlineCompany",search:{prop:'airlineCompany',type:'input',placeholder:"请输入"} },
        { prop: 'airplaneIcao', label: '机型', align: 'center',sort:true,sortProp:"airplaneIcao",search:{prop:'airplaneIcao',type:'input',placeholder:"请输入"} },
        { prop: 'planArrivalTime', width:'140',label: '计划进港时间', align: 'center',sort:true,
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            sortProp:"planArrivalTime",search:{prop:'planArrivalTime',type:'date',placeholder:"请选择"} 
        },
        {
            prop: 'planDepartureTime', width:'140', label: '计划出港时间', align: 'center',sort:true,sortProp:"planDepartureTime",
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'planDepartureTime',type:'date',placeholder:"请选择"} 
        },
        { prop: 'reason', label: '原因', align: 'center',sort:true,sortProp:"reason",search:{prop:'reason',type:'input',placeholder:"请输入"} },
        { prop: 'state', label: '状态', align: 'center',sort:true,sortProp:"state",
            formatter: (row, column, cellValue) => {
                let type = ['未审核', '已审核', '审核拒绝']
                return type[row.state]
            }, 
            search:{
                prop:'state',type:'select',
                selectProp:["label", "value"], 
                data: [{value:'0', label:'未审核'},{value:'1', label:'已审核'},{value:'2', label:'审核拒绝'}],placeholder:"请输入"} 
        },
        
        { prop: 'originTemplateTitle', width:'140', label: '原工单模板', align: 'center',sort:true,sortProp:"originTemplateTitle",search:{prop:'originTemplateTitle',type:'input',placeholder:"请输入"} },
        { prop: 'intendTemplateTitle', width:'140', label: '变更工单模板', align: 'center',sort:true,sortProp:"intendTemplateTitle",search:{prop:'intendTemplateTitle',type:'input',placeholder:"请输入"} },
        { slot: 'option', label: '操作',width:'150', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};