let timeInfo=(row)=>{
        if(row.infTime){
            return row.infTime.split(' ')[0]
        }else {
                return ''
        }

}
export const testMainConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'paperName', label: '试卷名称', sortProp:"paperName", align: 'center',sort:true,search:{type:'input', prop:'paperName',placeholder:"请输入"} },
                { prop: 'paperCode', label: '试卷编码',sortProp:"paperCode", align: 'center',sort:true,search:{type:'input', prop:'paperCode',placeholder:"请输入"} },
                { prop: 'totalTime', label: '考试时长(分)',sortProp:"totalTime", align: 'center',sort:true,search:{type:'input', prop:'totalTime',placeholder:"请输入"} },
                { prop: 'paperType', label: '试卷类别',sortProp:"paperType", align: 'center',sort:true,search:{type:'select', prop:'paperType',selectProp:['valueData','valueData'],data:obj.paperCategory||[],placeholder:"请选择"}},
                { prop: 'testType', label: '考试类型',sortProp:"testType", align: 'center' ,sort:true,search:{type:'select', prop:'testType',selectProp:['valueData','valueData'],data:obj.testCategory||[],placeholder:"请选择"}},
                { prop: 'qualificationType', label: '考试资质类型',sortProp:"qualificationType", align: 'center' ,sort:true,search:{type:'select', prop:'qualificationType',selectProp:['valueData','valueData'],data:obj.qualificationType||[],placeholder:"请选择"}},
                { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center' ,sort:true,search:{type:'select', prop:'businessType',selectProp:['valueData','valueData'],data:obj.businessType||[],placeholder:"请选择"}},
                { prop: 'suitableUser', label: '适用对象',sortProp:"suitableUser", align: 'center',sort:true,search:{type:'select', prop:'suitableUser',selectProp:['valueData','valueData'],data:obj.applyObject||[],placeholder:"请选择", } },
                { prop: 'description', label: '试题简介',width:'200',sortProp:"description", align: 'center',sort:true,search:{type:'input', prop:'description',placeholder:"请输入",extendType:'search',} },
         ]
};
export const testMainAddConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'questionNo', label: '试题序号',  sortProp:"questionNo", align: 'center',sort:true, search:{type:'input', prop:'questionNo',placeholder:"请输入"} },
                { prop: 'optionType', label: '选择类型', sortProp:"optionType", align: 'center',sort:true, search:{type:'select', prop:'optionType',selectProp:['valueData','valueData'],data:obj.selectType||[],placeholder:"请选择"} },
                { prop: 'questionName', label: '题目',  sortProp:"questionName", align: 'center',sort:true, search:{type:'input', prop:'questionName',placeholder:"请输入"} },
                { prop: 'optionA', label: '选项A', align: 'center', search:{type:'input', prop:'optionA',placeholder:"请输入"}},
                { prop: 'optionB', label: '选项B',  align: 'center' , search:{type:'input', prop:'optionB',placeholder:"请输入"}},
                { prop: 'optionC', label: '选项C',  align: 'center' , search:{type:'input', prop:'optionC',placeholder:"请输入"}},
                { prop: 'optionD', label: '选项D',  align: 'center' , search:{type:'input', prop:'optionD',placeholder:"请输入"}},
                { prop: 'optionE', label: '选项E',  align: 'center', search:{type:'input', prop:'optionE',placeholder:"请输入"} },
                { prop: 'optionF', label: '选项F',  align: 'center', search:{type:'input', prop:'optionF',placeholder:"请输入"} },
                { prop: 'answer', label: '正确答案',  align: 'center', search:{type:'input', prop:'answer',placeholder:"请输入",} },
                { prop: 'score', label: '分值', sortProp:"score", align: 'center',sort:true, search:{type:'input', prop:'score',placeholder:"请输入",extendType:'search',} },
         ]
};
 