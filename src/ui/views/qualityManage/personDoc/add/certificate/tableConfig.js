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
            { prop: 'name', label: '证书名称', sortProp:"examName", align: 'center',sort:false,search1:{type:'input', prop:'examName',placeholder:"请输入"} },
            { prop: 'number', label: '证书编号', sortProp:"examName", align: 'center',sort:false,search1:{type:'input', prop:'examName',placeholder:"请输入"} },

            { prop: 'startTime', label: '颁发日期',formatter:timeInfo,sortProp:"endTime", align: 'center',sort:false,search1:{type:'select', prop:'examMode',placeholder:"请选择",selectProp:['valData','valData'],data:obj.testType} },
                { prop: 'endTime', label: '作废日期',formatter:timeInfo1,sortProp:"examTime", align: 'center',sort:false,search1:{type:'date', prop:'examTime',placeholder:"请选择"} },
            { prop: 'type', label: '证书类型',sortProp:"station", align: 'center' ,sort:false,search1:{type:'input', prop:'examSite',placeholder:"请输入"}},

            { prop: 'major', label: '专业',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
                     // { slot: 'option', label: '操作',width:'230', align: 'center', search1:{type:'btn',label:'搜索',icon:"table_search1" } },
         ]
};
