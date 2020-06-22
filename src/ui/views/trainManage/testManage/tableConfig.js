let timeInfo=(row)=>{
        if(row.infTime){
            return row.infTime.split(' ')[0]
        }else {
                return ''
        }

}
export const testConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '考试名称', sortProp:"infNumber", align: 'center',sort:true,search:{type:'input', prop:'infNumber',placeholder:"请输入"} },
                { prop: 'infRemark', label: '方式',sortProp:"infRemark", align: 'center',sort:true,search:{type:'select', prop:'infRemark',placeholder:"请选择"} },
                { prop: 'infSources', label: '时间',sortProp:"infSources", align: 'center',sort:true,search:{type:'date', prop:'infSources',placeholder:"请选择"} },
                { prop: 'infTime', label: '时长(分)',sortProp:"infTime", align: 'center',sort:true,search:{type:'select', prop:'infTime',placeholder:"请选择"}},
                { prop: 'place', label: '地点',sortProp:"place", align: 'center' ,sort:true,search:{type:'input', prop:'place',placeholder:"请输入"}},
                { prop: 'responsibleUnit', label: '试卷',sortProp:"responsibleUnit", align: 'center' ,sort:true,search:{type:'select', prop:'responsibleUnit',placeholder:"请选择"}},
                { prop: 'deptName', label: '类型',sortProp:"deptName", align: 'center' ,sort:true,search:{type:'select', prop:'deptName',placeholder:"请选择"}},
                { prop: 'situation', label: '资质类型',sortProp:"situation", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择",data:[ ],} },
                { prop: 'situation', label: '业务类型',sortProp:"situation", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择",data:[ ],} },
                { prop: 'situation', label: '考试状态',sortProp:"situation", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择",data:[ ],} },
                { prop: 'situation', label: '简介',sortProp:"situation", align: 'center',sort:true,search:{type:'input', prop:'situation',placeholder:"请输入",data:[ ],} },
                { slot: 'option', label: '操作',width:'230', align: 'center', search:{type:'btn',label:'搜索',icon:"table_search" } },
         ]
};
export const testRuConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '员工姓名',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'infNumber',placeholder:"请输入"} },
                { prop: 'infRemark', label: '员工编号',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'select', prop:'infRemark',placeholder:"请选择"} },
                { prop: 'infSources', label: '考试名称',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'infSources',placeholder:"请输入"} },
                { prop: 'infTime', label: '分数', sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'infTime',placeholder:"请输入"}},
                { prop: 'place', label: '时间',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'place',placeholder:"请输入"}},
                { prop: 'responsibleUnit', label: '时长',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'responsibleUnit',placeholder:"请输入"}},
                { prop: 'deptName', label: '地点',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'deptName',placeholder:"请输入"}},
                { prop: 'situation', label: '方式',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'situation',placeholder:"请输入"} },
                { prop: 'situation', label: '类型',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'situation',placeholder:"请输入"} },
                { prop: 'reason', label: '资质类型',  sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'reason',placeholder:"请输入",} },
                { prop: 'reason', label: '业务类型', sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'reason',placeholder:"请输入", } },
                { prop: 'reason', label: '试卷名称',   sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'reason',placeholder:"请输入", } },
                { prop: 'reason', label: '纸质试卷',   sortProp:"infNumber", align: 'center',sort:true, search:{type:'input', prop:'reason',placeholder:"请输入", } },
            { slot: 'option', label: '操作',width:'210', align: 'center', search:{type:'btn',label:'搜索',icon:"table_search" } },
         ]
};
 