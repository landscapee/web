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
                { prop: 'startTime', label: '起始日期',formatter:timeInfo,sortProp:"endTime", align: 'center',sort:false,search1:{type:'select', prop:'examMode',placeholder:"请选择",selectProp:['valData','valData'],data:obj.testType} },
                { prop: 'endTime', label: '结束日期',formatter:timeInfo1,sortProp:"examTime", align: 'center',sort:false,search1:{type:'date', prop:'examTime',placeholder:"请选择"} },
            { prop: 'unit', label: '工作单位', sortProp:"examName", align: 'center',sort:false,search1:{type:'input', prop:'examName',placeholder:"请输入"} },
            { prop: 'workPlace', label: '工作地点',sortProp:"station", align: 'center' ,sort:false,search1:{type:'input', prop:'examSite',placeholder:"请输入"}},

            { prop: 'workType', label: '工作类型',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
            { prop: 'post', label: '职务',sortProp:"post", align: 'center',sort:false,search1:{type:'select', prop:'qualificationType',placeholder:"请选择",selectProp:['valData','valData'],data:obj.zizhiType,} },

            { prop: 'station', label: '岗位',sortProp:"stationLevel", align: 'center' ,sort:false,search1:{type:'select', prop:'paperId',placeholder:"请选择",selectProp:['paperName','id'],data:obj.testList}},
                  // { slot: 'option', label: '操作',width:'230', align: 'center', search1:{type:'btn',label:'搜索',icon:"table_search1" } },
         ]
};
