

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

                 { slot: 'option', label: '关联信息查看' ,width:'140',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
export const studyLogConfig = (issueDeptArr, positionArr, folderArr) => {
    return [
        { prop: 'fileName', label: '文档名称', align: 'center',sort:true,sortProp:"fileName"},
        { prop: 'number', label: '文档编号', align: 'center',sort:true,sortProp:"number"},
        { prop: 'folderName', label: '所属主题', align: 'center', sort:true,sortProp:"folderName"},
        { prop: 'issueDept', label: '发行单位', align: 'center', sort:true,sortProp:"issueDept"},
        { prop: 'position', label: '所属岗位', align: 'center', sort:true,sortProp:"position"},
        { prop: 'version', label: '版本', align: 'center',sort:true,sortProp:"version"},
        {
            prop: 'startTime', label: '生效日期', align: 'center', width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
        },
        {
            prop: 'endTime', label: '有效期至', align: 'center',sort:true,sortProp:"endTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
        },
        {
            prop: 'pushTime', label: '推送时间', align: 'center',sort:true,sortProp:"pushTime", width:'120',
            formatter: (row, column, cellValue) => {
                return formatDate(cellValue, 'YYYY-MM-DD', '--');
            },
        },
        { prop: 'read', label: '是否阅读', align: 'center',sort:true,sortProp:"read",
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
            formatter: (row, column, cellValue) => {
                return timeMinuteFormat(row.readingTime)
            },
        },
     ]
};
