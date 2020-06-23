let timeInfo=(row)=>{
        if(row.infTime){
            return row.infTime.split(' ')[0]
        }else {
                return ''
        }

}
export const testMainConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'paperName', label: '试卷名称', sortProp:"paperName", align: 'center',sort:true,search:{type:'input', prop:'paperName',placeholder:"请输入"} },
                { prop: 'paperCode', label: '试卷编码',sortProp:"paperCode", align: 'center',sort:true,search:{type:'input', prop:'paperCode',placeholder:"请输入"} },
                { prop: 'totalTime', label: '考试时长(分)',sortProp:"totalTime", align: 'center',sort:true,search:{type:'input', prop:'totalTime',placeholder:"请输入"} },
                { prop: 'paperType', label: '试卷类别',sortProp:"paperType", align: 'center',sort:true,search:{type:'select', prop:'paperType',placeholder:"请选择"}},
                { prop: 'testType', label: '考试类型',sortProp:"testType", align: 'center' ,sort:true,search:{type:'select', prop:'testType',placeholder:"请选择"}},
                { prop: 'qualificationType', label: '考试资质类型',sortProp:"qualificationType", align: 'center' ,sort:true,search:{type:'select', prop:'qualificationType',placeholder:"请选择"}},
                { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center' ,sort:true,search:{type:'select', prop:'businessType',placeholder:"请选择"}},
                { prop: 'suitableUser', label: '适用对象',sortProp:"suitableUser", align: 'center',sort:true,search:{type:'select', prop:'suitableUser',placeholder:"请选择",data:[{label:"违规",value:"违规"}],} },
                { prop: 'description', label: '试题简介',width:'200',sortProp:"description", align: 'center',sort:true,search:{type:'input', prop:'description',placeholder:"请输入",extendType:'search',} },
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
 