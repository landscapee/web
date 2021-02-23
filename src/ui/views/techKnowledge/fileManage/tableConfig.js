import { formatDate } from '@lib/tools.js';
const open=(row)=>{
    return row.open?'公开':row.open===false?'不公开':'--'
}
export const sysParameterTable = (issueDeptArr, positionArr) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',fixed:"left",label:'筛选'}},
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName",search:{prop:'fileName',type:'input',placeholder:"请输入"} },
        { prop: 'number', label: '文档编号', align: 'center',sort:true,sortProp:"number",search:{prop:'number',type:'input',placeholder:"请输入"} },
        { prop: 'open', label: '是否公开',formatter:open, align: 'center',sort:true,sortProp:"open",search:{prop:'open',type:'select',placeholder:"请选择",selectProp:["label","value"], data: [{label:'公开',value:true},{label:'不公开',value:false}]} },
        { prop: 'issueDept', label: '发行单位', align: 'center',sort:true,sortProp:"issueDept",search:{prop:'issueDept',type:'select',selectProp:["valData","valData"], data: issueDeptArr, placeholder:"请选择"} },
        { prop: 'position', label: '所属岗位', align: 'center',sort:true,sortProp:"position",search:{prop:'position', type:'select',selectProp:["valData","valData"], data: positionArr, placeholder:"请选择"} },
        {
            prop: 'startTime', label: '生效日期', align: 'center',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'startTime',type:'date',placeholder:"请选择"}
        },
        {
            prop: 'endTime', label: '有效期至', align: 'center',sort:true,sortProp:"endTime",
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'endTime',type:'date',placeholder:"请选择"}
        },
        { prop: 'userName', label: '上传人', align: 'center',sort:true,sortProp:"userName",search:{prop:'userName',type:'input',placeholder:"请输入"} },
        {
            prop: 'createTime', label: '上传时间', align: 'center',sort:true,sortProp:"createTime",
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD HH:mm', '--');
            },
            search:{prop:'createTimeQuery',type:'date',placeholder:"请选择"}
        },
        { prop: 'formats', label: '格式', align: 'center',search:{prop:'formats',type:'input',placeholder:"请输入"}},
        { prop: 'version', label: '最新版本', align: 'center',sort:true,sortProp:"version",search:{prop:'version',type:'input',placeholder:"请输入最"} },
        { prop: 'size', label: '大小(kb)', align: 'center',sort:true,sortProp:"size",
            search:{prop:'sizeQuery',type:'input',placeholder:"请输入",isNumber:true},
            formatter:(row, column, cellValue) => {
                if(row.size&&!isNaN(parseInt(row.size))){
                    return (row.size/1024).toFixed(1)
                }else{
                    return 'size is not number!'
                }
            }
        },
        // { prop: 'sysParamComment', label: '操作', align: 'center',search:{prop:'sysParamComment',extendType:'search',type:'btn',label:"历史版本"}},
        { slot: 'option', label: '操作',width:'100', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
