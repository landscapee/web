import moment from "moment";

let timeInfo=(row)=>{
        if(row.startTime){
         return  moment(row.startTime).format('YYYY-MM-DD')
        }else {
                return ''
        }
}
let timeInfo1=(row)=>{
        if(row.endTime){
         return  moment(row.endTime).format('YYYY-MM-DD')
        }else {
                return ''
        }
}
export const inOfficeInfoConfig = ( obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search1:{ type:'text',label:'过滤'}},
                { prop: 'workType', label: '工作类型', sortProp:"examName", align: 'center',sort:false,search1:{type:'input', prop:'examName',placeholder:"请输入"} },
                { prop: 'startTime', label: '起始日期',formatter:timeInfo,sortProp:"endTime", align: 'center',sort:false,search1:{type:'select', prop:'examMode',placeholder:"请选择",selectProp:['valData','valData'],data:obj.testType} },
                { prop: 'endTime', label: '结束日期',formatter:timeInfo1,sortProp:"examTime", align: 'center',sort:false,search1:{type:'date', prop:'examTime',placeholder:"请选择"} },
                { prop: 'dept', label: '任职部门',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
                { prop: 'station', label: '任职岗位',sortProp:"station", align: 'center' ,sort:false,search1:{type:'input', prop:'examSite',placeholder:"请输入"}},
                { prop: 'stationLevel', label: '岗位等级',sortProp:"stationLevel", align: 'center' ,sort:false,search1:{type:'select', prop:'paperId',placeholder:"请选择",selectProp:['paperName','id'],data:obj.testList}},
                { prop: 'stationSequence', label: '岗位序列',sortProp:"stationSequence", align: 'center' ,sort:false,search1:{type:'select', prop:'examType',placeholder:"请选择",data:obj.testCategory1,selectProp:['valData','valData'],}},
                { prop: 'post', label: '职务',sortProp:"post", align: 'center',sort:false,search1:{type:'select', prop:'qualificationType',placeholder:"请选择",selectProp:['valData','valData'],data:obj.zizhiType,} },
                 // { slot: 'option', label: '操作',width:'230', align: 'center', search1:{type:'btn',label:'搜索',icon:"table_search1" } },
         ]
};
export const testRuConfig = (testList ,obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search1:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'employeeName', label: '员工姓名',  sortProp:"employeeName", align: 'center',sort:false ,search1:{type:'input', prop:'employeeName',placeholder:"请输入"} },
                { prop: 'employeeId', label: '员工编号',  sortProp:"employeeId", align: 'center',sort:false ,search1:{type:'input', prop:'employeeId',placeholder:"请输入"} },
                { prop: 'examName', label: '考试名称',  sortProp:"examName", align: 'center',sort:false ,search1:{type:'input', prop:'examName',placeholder:"请输入"} },
                { prop: 'score', label: '分数', sortProp:"score", align: 'center',sort:false ,search1:{type:'input', prop:'score',placeholder:"请输入"}},
            { prop: 'examTime', label: '时间',formatter:timeInfo,sortProp:"examTime", align: 'center',sort:false,search1:{type:'date', prop:'examTime',placeholder:"请选择"} },
            { prop: 'totalTime', label: '时长(分)',sortProp:"totalTime", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请输入"}},
            { prop: 'examSite', label: '地点',sortProp:"examSite", align: 'center' ,sort:false,search1:{type:'input', prop:'examSite',placeholder:"请输入"}},
            { prop: 'examType', label: '类型',sortProp:"examType", align: 'center' ,sort:false,search1:{type:'select', prop:'examType',placeholder:"请选择",data:obj.testCategory1,selectProp:['valData','valData'],}},
            { prop: 'qualificationType', label: '资质类型',sortProp:"qualificationType", align: 'center',sort:false,search1:{type:'select', prop:'qualificationType',placeholder:"请选择",selectProp:['valData','valData'],data:obj.zizhiType,} },
            { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center',sort:false,search1:{type:'select', prop:'businessType',placeholder:"请选择",selectProp:['valData','valData'],data:obj.businessType,} },
            { prop: 'paperName', label: '试卷',sortProp:"paperName", align: 'center' ,sort:false,search1:{type:'select', prop:'paperId',placeholder:"请选择",selectProp:['paperName','id'],data:testList}},
            { slot: 'employeeFileId', label: '纸质试卷',sortProp:"employeeFileId", align: 'center' ,sort:false,/*search1:{type:'input', prop:'employeeFileId',placeholder:"请输入"}*/},

            // { prop: 'place', label: '纸质试卷',  sortProp:"examTime", align: 'center',sort:false ,search1:{type:'input', prop:'place',placeholder:"请输入"}},
                  { slot: 'option', label: '操作',width:'210',  align: 'center', search1:{type:'btn',label:'搜索',icon:"table_search1"} },
         ]
};
 