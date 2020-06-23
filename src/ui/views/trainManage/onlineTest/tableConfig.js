let timeInfo=(row)=>{
        if(row.infTime){
            return row.infTime.split(' ')[0]
        }else {
                return ''
        }

}
export const lineTestConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '考试名称', sortProp:"infNumber", align: 'center',sort:true,search:{type:'input', prop:'infNumber',placeholder:"请输入"} },
                 { prop: 'infSources', label: '截止时间',sortProp:"infSources", align: 'center',sort:true,search:{type:'date', prop:'infSources',placeholder:"请选择"} },
                { prop: 'infTime', label: '时长(分)',sortProp:"infTime", align: 'center',sort:true,search:{type:'select', prop:'infTime',placeholder:"请选择"}},
                 { prop: 'deptName', label: '类型',sortProp:"deptName", align: 'center' ,sort:true,search:{type:'select', prop:'deptName',placeholder:"请选择"}},
                { prop: 'situation', label: '资质类型',sortProp:"situation", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择",data:[ ],} },
                { prop: 'situation', label: '业务类型',sortProp:"situation", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择",data:[ ],} },
                 { prop: 'situation', label: '简介',sortProp:"situation", align: 'center',sort:true,search:{type:'input', prop:'situation',placeholder:"请输入",data:[ ],} },
                { slot: 'option', label: '操作',width:'160', align: 'center', search:{type:'btn',label:'搜索',icon:"table_search" } },
         ]
};
