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
                { prop: 'examName', label: '考试名称', sortProp:"examName", align: 'center',sort:true,search:{type:'input', prop:'examName',placeholder:"请输入"} },
                 { prop: 'examTime', label: '截止时间',sortProp:"examTime", align: 'center',sort:true,search:{type:'date', prop:'examTime',placeholder:"请选择"} },
                { prop: 'totalTime', label: '时长(分)',sortProp:"totalTime", align: 'center',sort:true,search:{type:'select', prop:'totalTime',placeholder:"请选择"}},
                 { prop: 'examType', label: '类型',sortProp:"examType", align: 'center' ,sort:true,search:{type:'select', prop:'examType',placeholder:"请选择"}},
                { prop: 'qualificationType', label: '资质类型',sortProp:"qualificationType", align: 'center',sort:true,search:{type:'select', prop:'qualificationType',placeholder:"请选择",data:[ ],} },
                { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center',sort:true,search:{type:'select', prop:'businessType',placeholder:"请选择",data:[ ],} },
                 { prop: 'description', label: '简介',sortProp:"description", align: 'center',sort:true,search:{type:'input', prop:'description',placeholder:"请输入",data:[ ],} },
                { slot: 'option', label: '操作',width:'120', align: 'center', search:{type:'btn',label:'搜索',icon:"table_search" } },
         ]
};
