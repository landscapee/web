import { formatDate } from '@lib/tools.js';
export const sysParameterTable = (issueDeptArr, positionArr, folderArr) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',fixed:"left",label:'筛选'}},
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName",search:{prop:'fileName',type:'input',placeholder:"请输入文档名称"} },
        { prop: 'size', label: '大小', align: 'center', sort:true,sortProp:"size",search:{prop:'size',type:'input',placeholder:"请输入大小"} },
        { prop: 'folder.name', label: '所属主题', align: 'center', sort:true,sortProp:"folderId",search:{prop:'folderId',type:'select',selectProp:["label","id"], data: folderArr,placeholder:"请选择所属主题"} },
        { prop: 'issueDept', label: '发行单位', align: 'center', sort:true,sortProp:"issueDept",search:{prop:'issueDept',type:'select',selectProp:["valData","valData"], data: issueDeptArr,placeholder:"请选择发行单位"} },
        { prop: 'position', label: '所属岗位', align: 'center', sort:true,sortProp:"position",search:{prop:'position',type:'select',selectProp:["valData","valData"], data: positionArr,placeholder:"请选择所属岗位"} },
        { prop: 'version', label: '版本', align: 'center',sort:true,sortProp:"version",search:{prop:'version',type:'input',placeholder:"请输入版本"} },
        { 
            prop: 'startTime', label: '生效日期', align: 'center', width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'startTime',type:'date',placeholder:"请输入生效日期"}
        },
        { 
            prop: 'endTime', label: '有效期至', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'endTime',type:'date',placeholder:"请输入有效期至"} 
        },
        { 
            prop: 'endTime', label: '推送时间', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'endTime',type:'date',placeholder:"请输入推送时间"} 
        },
        { prop: 'downloadRate', label: '下载率', align: 'center',sort:true,sortProp:"downloadRate",
            search:{prop:'downloadRate',type:'input',placeholder:"请选择下载率"},
            formatter: (row, column, cellValue) => {
                return row.downloadRate?row.downloadRate+'%':'0%'
            }
        },
        { prop: 'readingRate', label: '阅读率', align: 'center',sort:true,sortProp:"readingRate",
            search:{prop:'readingRate',type:'input',placeholder:"请选择阅读率"},
            formatter: (row, column, cellValue) => {
                return row.readingRate?row.readingRate+'%':'0%'
            }
        },
        { prop: 'averageReadingTime',width:'170', label: '平均阅读时长(分)', align: 'center',sort:true,sortProp:"averageReadingTime",search:{prop:'averageReadingTime',type:'input',placeholder:"请选择平均阅读时长(分)",extendType:'search',} },
    ]
};
export const userParameterTable = (issueDeptArr, positionArr, folderArr) => {
    return [
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName",search:{prop:'fileName',type:'input',placeholder:"请输入文档名称"} },
        { prop: 'size', label: '大小', align: 'center', sort:true,sortProp:"size",search:{prop:'size',type:'input',placeholder:"请输入大小"} },
        { prop: 'folderName', label: '所属主题', align: 'center', sort:true,sortProp:"folderName",search:{prop:'folderId',type:'select',selectProp:["label","id"], data: folderArr,placeholder:"请选择所属主题"} },
        { prop: 'issueDept', label: '发行单位', align: 'center', sort:true,sortProp:"issueDept",search:{prop:'issueDept',type:'select',selectProp:["valData","valData"], data: issueDeptArr,placeholder:"请选择发行单位"} },
        { prop: 'position', label: '所属岗位', align: 'center', sort:true,sortProp:"position",search:{prop:'position',type:'select',selectProp:["valData","valData"], data: positionArr,placeholder:"请选择所属岗位"} },
        { prop: 'version', label: '版本', align: 'center',sort:true,sortProp:"version",search:{prop:'version',type:'input',placeholder:"请输入版本"} },
        { 
            prop: 'startTime', label: '生效日期', align: 'center', width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'startTime',type:'date',placeholder:"请输入生效日期"}
        },
        { 
            prop: 'endTime', label: '有效期至', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'endTime',type:'date',placeholder:"请输入有效期至"} 
        },
        { 
            prop: 'endTime', label: '推送时间', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            }, 
            search:{prop:'endTime',type:'date',placeholder:"请输入推送时间"} 
        },
        { prop: 'read', label: '是否阅读', align: 'center',sort:true,sortProp:"read",
            search:{prop:'read',type:'input',placeholder:"请选择"},
            formatter: (row, column, cellValue) => {
                let readStatus = {
                    '0': '未阅读',
                    '1': '阅读中',
                    '2': '已阅读'
                }
                return readStatus[row.read]
            }, 
           
         },
        { prop: 'readingTime', label: '阅读时长', align: 'center',sort:true,sortProp:"readingTime",search:{prop:'readingTime',type:'input',placeholder:"请选择阅读时长"} },
        { slot: 'option', label: '操作',width:'230', search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};