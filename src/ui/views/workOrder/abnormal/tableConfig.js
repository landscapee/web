


import moment from "moment";

let timeInfo=(row)=>{
    if(row.submitTime){
        return  moment(row.submitTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}

export const authorizeConfig = ( obj) => {
    return [
         { prop: 'serialNo', label: '工单编号', sortProp:"examName", align: 'center',sort:false,search1:{type:'input', prop:'examName',placeholder:"请输入"} },

        { prop: 'submitTime', label: '工单日期',formatter:timeInfo,sortProp:"endTime", align: 'center',sort:false,search1:{type:'select', prop:'examMode',placeholder:"请选择",selectProp:['valData','valData'],data:obj.testType} },
         { prop: 'flightNo', label: '航班号',sortProp:"station", align: 'center' ,sort:false,search1:{type:'input', prop:'examSite',placeholder:"请输入"}},

        { prop: 'airlineCompanyName', label: '所属航司',sortProp:"dept", align: 'center',sort:false,search1:{type:'input', prop:'totalTime',placeholder:"请选择", }},
        { slot: 'option', label: '操作', width:'140' },
    ]
};




