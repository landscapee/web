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
export const testMainAddConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '试题序号',  align: 'center', search:{type:'input', prop:'infNumber',placeholder:"请输入"} },
                { prop: 'infRemark', label: '选择类型',  align: 'center', search:{type:'select', prop:'infRemark',placeholder:"请选择"} },
                { prop: 'infSources', label: '题目',  align: 'center', search:{type:'input', prop:'infSources',placeholder:"请输入"} },
                { prop: 'infTime', label: '选项A', align: 'center', search:{type:'input', prop:'infTime',placeholder:"请输入"}},
                { prop: 'place', label: '选项B',  align: 'center' , search:{type:'input', prop:'place',placeholder:"请输入"}},
                { prop: 'responsibleUnit', label: '选项C',  align: 'center' , search:{type:'input', prop:'responsibleUnit',placeholder:"请输入"}},
                { prop: 'deptName', label: '选项D',  align: 'center' , search:{type:'input', prop:'deptName',placeholder:"请输入"}},
                { prop: 'situation', label: '选项E',  align: 'center', search:{type:'input', prop:'situation',placeholder:"请输入"} },
                { prop: 'situation', label: '选项F',  align: 'center', search:{type:'input', prop:'situation',placeholder:"请输入"} },
                { prop: 'reason', label: '正确答案',width:'200',  align: 'center', search:{type:'input', prop:'reason',placeholder:"请输入",} },
                { prop: 'reason', label: '分值',width:'200',  align: 'center', search:{type:'input', prop:'reason',placeholder:"请输入",extendType:'search',} },
         ]
};
 