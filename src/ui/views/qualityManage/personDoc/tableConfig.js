


export const personDocTable = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'筛选'}},
                { prop: 'userNumber', label: '员工编号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入 ", prop:'userNumber'} },
                { prop: 'userName', label: '员工姓名', align: 'center',sort:true,search:{type:'input',placeholder:"请输入", prop:'userName'} },
                { prop: 'idCard', label: '身份证号', align: 'center',sort:true,search:{type:'input',placeholder:"请输入", prop:'idCard'} },
                { prop: 'sex', label: '性别', align: 'center',sort:true,search:{type:'select',placeholder:"请选择", prop:'sex',data:obj.xingbie,selectProp:['valData','valData']},},
                 { prop: 'contactInformation', label: '联系方式', align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入", prop:'contactInformation'}},

                 { slot: 'option', label: '关联信息查看' ,width:'200',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
