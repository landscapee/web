

import { formatDate, timeMinuteFormat } from '@lib/tools.js';

export const personDocTable = (obj,deptObj) => {
    let dept=(row)=>{
        if(row.deptCode&&deptObj){
            return deptObj[row.deptCode]
        }
        return ''
    }
        return [
                { slot: 'radio' , label: '选择',width:'49', search:{fixed:"left",type:'text',label:'筛选'}},
                 { prop: 'userNumber', label: '员工编号',sortProp:"userNumber", align: 'center',sort:true,search:{type:'input',placeholder:"请输入 ", prop:'userNumber'} },
                { prop: 'userName', label: '员工姓名',sortProp:"userName", align: 'center',sort:true,search:{type:'input',placeholder:"请输入", prop:'userName'} },
                { prop: 'deptCode', label: '部门/项目',formatter:dept,sortProp:"deptCode", align: 'center',sort:true,search:{type:'select',placeholder:"请选择", prop:'deptCode',data:obj.dept,selectProp:['valData','valCode']} },
                { prop: 'idCard', label: '身份证号',sortProp:"idCard", align: 'center',sort:true,/*search:{type:'input',placeholder:"请输入", prop:'idCard'} */},
                { prop: 'sex', label: '性别',sortProp:"sex", align: 'center',sort:true,search:{type:'select',placeholder:"请选择", prop:'sex',data:obj.xingbie,selectProp:['valData','valData']},},
                 { prop: 'contactInformation',sortProp:"contactInformation", label: '联系方式', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入", prop:'contactInformation'}},

                 { slot: 'option', label: '关联信息查看' ,width:'120',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const studyLogConfig = (issueDeptArr, positionArr, folderArr) => {
    return [
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName",
            search:{prop:'fileName',type:'input',placeholder:"请输入文档名称"}
            },
        { prop: 'number', label: '文档编号', align: 'center',sort:true,sortProp:"number",
            search:{prop:'number',type:'input',placeholder:"请输入"}
            },

        { prop: 'folderName', label: '所属主题', align: 'center', sort:true,sortProp:"folderName",search:{prop:'folderId',type:'select',selectProp:["label","id"], data: folderArr,placeholder:"请选择所属主题"} },
        { prop: 'issueDept', label: '发行单位', align: 'center', sort:true,sortProp:"issueDept",search:{prop:'issueDept',type:'select',selectProp:["valData","valData"], data: issueDeptArr,placeholder:"请选择发行单位"} },
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
     ]
};
