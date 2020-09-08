import moment from "moment";

let timeInfo=(row)=>{
        if(row.occurTime){
         return  moment(row.occurTime).format('YYYY-MM-DD')
        }else {
                return ''
        }
}
let timeInfo1=(row)=>{
        if(row.confirmTime){
         return  moment(row.confirmTime).format('YYYY-MM-DD')
        }else {
                return ''
        }
}
export const inOfficeInfoConfig = ( obj,objobj) => {
     let type=(row)=>{
        return objobj[row.type]
    }
        return [
                { slot: 'radio' , label: '选择',width:'49',search1:{ type:'text',label:'过滤'}},
            { prop: 'type', label: '类型',formatter:type, sortProp:"type", align: 'center',sort:false,search1:{type:'select', prop:'type',placeholder:"请选择"} },
            { prop: 'nature', label: '事件性质', sortProp:"examName", align: 'center',sort:false,search1:{type:'input', prop:'examName',placeholder:"请输入"} },

            { prop: 'occurTime', label: '时间',formatter:timeInfo,sortProp:"endTime", align: 'center',sort:false,search1:{type:'select', prop:'examMode',placeholder:"请选择",selectProp:['valData','valData'],data:obj.testType} },
             { prop: 'place', label: '地点',sortProp:"station", align: 'center' ,sort:false,search1:{type:'input', prop:'examSite',placeholder:"请输入"}},

            { prop: 'involvePerson', label: '涉及人员',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
            { prop: 'courseEvents', label: '事件经过',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
            { prop: 'result', label: '后果',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
            { prop: 'conclusion', label: '调查结论',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
            { prop: 'confirmTime',width:160, formatter:timeInfo1,label: '质量经理签字确认时间',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
          ]
};
