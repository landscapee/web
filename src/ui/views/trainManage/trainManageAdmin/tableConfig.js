  import moment from 'moment'
let  timeInfo=(row)=>{
        if(row.startTime){
             return moment(row.startTime).format('YYYY-MM-DD HH:mm')
        }else {
                return ''
        }
}
let  timeInfo1=(row)=>{
        if(row.endTime){
             return moment(row.endTime).format('YYYY-MM-DD HH:mm')
        }else {
                return ''
        }
}
export const trainManageAdminConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
                { prop: 'index', label: '序号',width:'49',   align: 'center',  },
                { prop: 'trainingType', label: '类别',sortProp:"trainingType", align: 'center',sort:true,search:{type:'select', prop:'trainingType',placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainType} },
                { prop: 'trainingName', label: '培训项目',sortProp:"trainingName", align: 'center',sort:true,search:{type:'input', prop:'trainingName',placeholder:"请输入"} },
                { prop: 'startTime', label: '开始时间',formatter:  timeInfo,sortProp:"startTime", align: 'center',sort:true,search:{type:'date', prop:'startTime', placeholder:"请选择"}},
                { prop: 'endTime', label: '结束时间',formatter:  timeInfo1,sortProp:"endTime", align: 'center' ,sort:true,search:{type:'date', prop:'endTime' ,placeholder:"请选择"}},
                { prop: 'classHour', label: '课时',sortProp:"classHour", align: 'center' ,sort:true,search:{type:'input', prop:'classHour', placeholder:"请输入"}},
                { prop: 'personCount', label: '人数',sortProp:"personCount", align: 'center' ,sort:true,search:{type:'input', prop:'personCount', placeholder:"请输入"}},
                { prop: 'trainingPlace', label: '地点',sortProp:"trainingPlace", align: 'center',sort:true,search:{type:'input', prop:'trainingPlace', placeholder:"请输入", } },
                { prop: 'teacherName', label: '讲师', sortProp:"teacherName", align: 'center',sort:true,search:{type:'input', prop:'teacherName', placeholder:"请输入", } },
                { prop: 'trainingStatus', label: '状态', sortProp:"teacherName1", align: 'center',sort:true,search:{type:'input', prop:'teacherName1', placeholder:"请输入", } },
                { slot: 'option', label: '操作',width:'190',  align: 'center', search:{type:'btn',label:'搜索',icon:"table_search"} },
         ]
};
export const trainAdminResultsConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},

                 { prop: 'employeeName', label: '员工姓名',sortProp:"employeeName", align: 'center',sort:true,search:{type:'input', prop:'employeeName',placeholder:"请输入", } },
                 { prop: 'employeeNo', label: '员工编号',sortProp:"employeeNo", align: 'center',sort:true,search:{type:'input', prop:'employeeNo',placeholder:"请输入", } },
            { prop: 'trainingName', label: '培训项目',sortProp:"trainingName", align: 'center', },
                 { prop: 'trainingType', label: '培训类别',sortProp:"trainingType", align: 'center', },
               { prop: 'classHour', label: '学时',sortProp:"classHour", align: 'center' , },
                { prop: 'qualifiedStatus', label: '考核成绩',sortProp:"qualifiedStatus", align: 'center' ,sort:true,search:{type:'input', prop:'qualifiedStatus', placeholder:"请输入"}},
                { prop: 'certificateNo', label: '证书编号',sortProp:"certificateNo", align: 'center',sort:true,search:{type:'input', prop:'certificateNo', placeholder:"请输入", } },
                { slot: 'remark', label: '备注',width:'200',  sortProp:"remark", align: 'center',sort:true,search:{type:'input', prop:'remark', placeholder:"请输入", } },
                 { slot: 'option', label: '操作',width:'260',  align: 'center', search:{type:'btn',label:'搜索',icon:"table_search"} },
         ]
};
