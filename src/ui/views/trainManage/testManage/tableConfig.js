import moment from "moment";

let timeInfo=(row)=>{
        if(row.examTime){
         return  moment(row.infTime).format('YYYY-MM-DD')

        }else {
                return ''
        }

}
export const testConfig = (testList,obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'examName', label: '考试名称', sortProp:"examName", align: 'center',sort:true,search:{type:'input', prop:'examName',placeholder:"请输入"} },
                { prop: 'examMode', label: '方式',sortProp:"examMode", align: 'center',sort:true,search:{type:'select', prop:'examMode',placeholder:"请选择"} },
                { prop: 'examTime', label: '时间',formatter:timeInfo,sortProp:"examTime", align: 'center',sort:true,search:{type:'date', prop:'examTime',placeholder:"请选择"} },
                { prop: 'totalTime', label: '时长(分)',sortProp:"totalTime", align: 'center',sort:true,search:{type:'select', prop:'totalTime',placeholder:"请选择"}},
                { prop: 'examSite', label: '地点',sortProp:"examSite", align: 'center' ,sort:true,search:{type:'input', prop:'examSite',placeholder:"请输入"}},
                { prop: 'paperName', label: '试卷',sortProp:"paperName", align: 'center' ,sort:true,search:{type:'select', prop:'paperId',placeholder:"请选择",selectProp:['paperName','id'],data:testList}},
                { prop: 'examType', label: '类型',sortProp:"examType", align: 'center' ,sort:true,search:{type:'select', prop:'examType',placeholder:"请选择"}},
                { prop: 'qualificationType', label: '资质类型',sortProp:"qualificationType", align: 'center',sort:true,search:{type:'select', prop:'qualificationType',placeholder:"请选择",data:[ ],} },
                { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center',sort:true,search:{type:'select', prop:'businessType',placeholder:"请选择",data:[ ],} },
                { prop: 'examStatus', label: '考试状态',sortProp:"examStatus", align: 'center',sort:true,search:{type:'select', prop:'examStatus',placeholder:"请选择",data:[ ],} },
                { prop: 'description', label: '简介',sortProp:"description", align: 'center',sort:true,search:{type:'input', prop:'description',placeholder:"请输入",data:[ ],} },
                { slot: 'option', label: '操作',width:'230', align: 'center', search:{type:'btn',label:'搜索',icon:"table_search" } },
         ]
};
export const testRuConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'employeeName', label: '员工姓名',  sortProp:"employeeName", align: 'center',sort:true ,search:{type:'input', prop:'employeeName',placeholder:"请输入"} },
                { prop: 'employeeId', label: '员工编号',  sortProp:"employeeId", align: 'center',sort:true ,search:{type:'select', prop:'employeeId',placeholder:"请选择"} },
                { prop: 'examName', label: '考试名称',  sortProp:"examName", align: 'center',sort:true ,search:{type:'input', prop:'examName',placeholder:"请输入"} },
                { prop: 'score', label: '分数', sortProp:"score", align: 'center',sort:true ,search:{type:'input', prop:'score',placeholder:"请输入"}},
            { prop: 'examTime', label: '时间',sortProp:"examTime", align: 'center',sort:true,search:{type:'date', prop:'examTime',placeholder:"请选择"} },
            { prop: 'totalTime', label: '时长(分)',sortProp:"totalTime", align: 'center',sort:true,search:{type:'select', prop:'totalTime',placeholder:"请选择"}},
            { prop: 'examSite', label: '地点',sortProp:"examSite", align: 'center' ,sort:true,search:{type:'input', prop:'examSite',placeholder:"请输入"}},
            { prop: 'examType', label: '类型',sortProp:"examType", align: 'center' ,sort:true,search:{type:'select', prop:'examType',placeholder:"请选择"}},
            { prop: 'qualificationType', label: '资质类型',sortProp:"qualificationType", align: 'center',sort:true,search:{type:'select', prop:'qualificationType',placeholder:"请选择",data:[ ],} },
            { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center',sort:true,search:{type:'select', prop:'businessType',placeholder:"请选择",data:[ ],} },
            { prop: 'paperName', label: '试卷名称',sortProp:"paperName", align: 'center' ,sort:true,search:{type:'select', prop:'paperName',placeholder:"请选择"}},
            { slot: 'employeeFileId', label: '纸质试卷',sortProp:"employeeFileId", align: 'center' ,sort:true,/*search:{type:'input', prop:'employeeFileId',placeholder:"请输入"}*/},

            // { prop: 'place', label: '纸质试卷',  sortProp:"examTime", align: 'center',sort:true ,search:{type:'input', prop:'place',placeholder:"请输入"}},
                  { slot: 'option', label: '操作',width:'210',  align: 'center', search:{type:'btn',label:'搜索',icon:"table_search"} },
         ]
};
 