import { formatDate, timeMinuteFormat } from '@lib/tools.js';
const open=(row)=>{
    return row.open?'公开':row.open===false?'不公开':'--'
}
export const sysParameterTable = (airline, positionArr, folderArr) => {
    return [
        { type: 'selection' , label: '选择',width:'50',search:{type:'allSelected',label:'全选'}},

        // { slot: 'radio' , label: '选择',width:'49',search:{type:'text',fixed:"left",label:'筛选'}},
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName",search:{prop:'fileName',type:'input',placeholder:"请输入文档名称"} },
        { prop: 'number', label: '文档编号', align: 'center',sort:true,sortProp:"number",search:{prop:'number',type:'input',placeholder:"请输入"} },
        { prop: 'open', label: '是否公开',formatter:open, align: 'center',sort:true,sortProp:"open",search:{prop:'open',type:'select',placeholder:"请选择",selectProp:["label","value"], data: [{label:'公开',value:true},{label:'不公开',value:false}]} },

        { prop: 'size', label: '大小(kb)', align: 'center', sort:true,sortProp:"size",
            search:{prop:'sizeQuery',type:'input',placeholder:"请输入大小",isNumber:true},
            formatter:(row, column, cellValue) => {
                if(row.size&&!isNaN(parseInt(row.size))){
                    return (row.size/1024).toFixed(1)
                }else{
                    return 'size is not number!'
                }
            }
        },
        { prop: 'folder.name', label: '所属主题', align: 'center', sort:true,sortProp:"folderId",search:{prop:'folderId',type:'select',selectProp:["label","id"], data: folderArr,placeholder:"请选择所属主题"} },
        { prop: 'issueDept', label: '发行单位', align: 'center', sort:true,sortProp:"issueDept",search:{prop:'issueDept',type:'select',selectProp:["fullname","fullname"], data: airline,placeholder:"请选择发行单位"} },
        { prop: 'position', label: '所属岗位', align: 'center', sort:true,sortProp:"position",search:{prop:'position',type:'select',selectProp:["valData","valData"], data: positionArr,placeholder:"请选择所属岗位"} },
        { prop: 'version', label: '版本', align: 'center',sort:true,sortProp:"version",search:{prop:'version',type:'input',placeholder:"请输入版本"} },
        {
            prop: 'startTime', label: '生效日期', align: 'center', width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'startTime',type:'date',placeholder:"请选择生效日期"}
        },
        {
            prop: 'endTime', label: '有效期至', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'endTime',type:'date',placeholder:"请选择有效期至"}
        },
        {
            prop: 'pushTime', label: '推送时间', align: 'center',sort:true,sortProp:"pushTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'pushTimeQuery',type:'date',placeholder:"请选择推送时间"}
        },
        { slot: 'downloadRate', label: '下载率', align: 'center',sort:true,sortProp:"downloadRate",
            search:{prop:'downloadRate',type:'input',isNumber:true,placeholder:"请输入下载率"},
            // formatter: (row, column, cellValue) => {
            //     return row.downloadRate?row.downloadRate+'%':'0%'
            // }
        },
        { slot: 'readingRate', label: '阅读率', align: 'center',sort:true,sortProp:"readingRate",
            search:{prop:'readingRate',type:'input',isNumber:true,placeholder:"请输入阅读率", },
            // formatter: (row, column, cellValue) => {
            //     return row.readingRate?row.readingRate+'%':'0%'
            // }
        },
        { prop: 'averageReadingTime',width:'170', label: '平均阅读时长(分)', align: 'center',sort:true,sortProp:"averageReadingTime",
            search:{prop:'arTime',type:'input',placeholder:"请输入平均阅读时长(分)",extendType:'search',isMinute:true},
            formatter: (row, column, cellValue) => {
                return timeMinuteFormat(row.averageReadingTime)
            }
        },
    ]
};
export const userParameterTable = (airline=[], positionArr, folderArr) => {
    return [
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName",search:{prop:'fileName',type:'input',placeholder:"请输入文档名称"} },
        { prop: 'number', label: '文档编号', align: 'center',sort:true,sortProp:"number",search:{prop:'number',type:'input',placeholder:"请输入"} },
        { prop: 'size', label: '大小(kb)', align: 'center', sort:true,sortProp:"size",
            search:{prop:'sizeQuery',type:'input',placeholder:"请输入大小",isNumber:true},
            formatter:(row, column, cellValue) => {
                if(row.size&&!isNaN(parseInt(row.size))){
                    return (row.size/1024).toFixed(1)
                }else{
                    return 'size is not number!'
                }
            }
        },
        { prop: 'folderName', label: '所属主题', align: 'center', sort:true,sortProp:"folderName",search:{prop:'folderId',type:'select',selectProp:["label","id"], data: folderArr,placeholder:"请选择所属主题"} },
        { prop: 'issueDept', label: '发行单位', align: 'center', sort:true,sortProp:"issueDept",search:{prop:'issueDept',type:'select',selectProp:["fullname","fullname"], data: airline,placeholder:"请选择发行单位"} },
        { prop: 'position', label: '所属岗位', align: 'center', sort:true,sortProp:"position",search:{prop:'position',type:'select',selectProp:["valData","valData"], data: positionArr,placeholder:"请选择所属岗位"} },
        { prop: 'version', label: '版本', align: 'center',sort:true,sortProp:"version",search:{prop:'version',type:'input',placeholder:"请输入版本"} },
        {
            prop: 'startTime', label: '生效日期', align: 'center', width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'startTime',type:'date',placeholder:"请选择生效日期"}
        },
        {
            prop: 'endTime', label: '有效期至', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'endTime',type:'date',placeholder:"请选择有效期至"}
        },
        {
            prop: 'pushTime', label: '推送时间', align: 'center',sort:true,sortProp:"pushTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
            search:{prop:'pushTime',type:'date',placeholder:"请选择推送时间"}
        },
        { prop: 'read', label: '是否阅读', align: 'center',sort:true,sortProp:"read",
            search:{prop:'read',type:'select',placeholder:"请选择", selectProp:["label","id"],
            data: [{label:"未阅读",id:"0"},{label:"阅读中",id:"1"},{label:"已阅读",id:"2"}]  },
            formatter: (row, column, cellValue) => {
                let readStatus = {
                    '0': '未阅读',
                    '1': '阅读中',
                    '2': '已阅读'
                }
                return readStatus[row.read]
            },

         },
        { prop: 'readingTime', label: '阅读时长', align: 'center',sort:true,sortProp:"readingTime",
            search:{prop:'readingTime',type:'input',placeholder:"请输入阅读时长",isNumber:true},
            formatter: (row, column, cellValue) => {
                return timeMinuteFormat(row.readingTime)
            },
        },
        { slot: 'option', label: '操作',width:'100', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};
