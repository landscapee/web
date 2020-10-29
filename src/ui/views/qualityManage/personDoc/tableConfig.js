


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
                { prop: 'deptCode', label: '部门',formatter:dept,sortProp:"deptCode", align: 'center',sort:true,search:{type:'select',placeholder:"请选择", prop:'deptCode',data:obj.dept,selectProp:['valData','valCode']} },
                { prop: 'idCard', label: '身份证号',sortProp:"idCard", align: 'center',sort:true,/*search:{type:'input',placeholder:"请输入", prop:'idCard'} */},
                { prop: 'sex', label: '性别',sortProp:"sex", align: 'center',sort:true,search:{type:'select',placeholder:"请选择", prop:'sex',data:obj.xingbie,selectProp:['valData','valData']},},
                 { prop: 'contactInformation',sortProp:"contactInformation", label: '联系方式', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入", prop:'contactInformation'}},

                 { slot: 'option', label: '关联信息查看' ,width:'120',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
