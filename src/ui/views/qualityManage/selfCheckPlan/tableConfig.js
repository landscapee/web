import moment from "moment";

let timeInfo=(row)=>{
    if(row.reviewerTime){

        return  moment(row.reviewerTime).format('YYYY-MM-DD')


    }else {
        return ''
    }

}
export const selfCheckConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
                { prop: 'year', label: '计划年度',sortProp:"year", align: 'center',sort:true,search:{type:'input', prop:'year',placeholder:"请输入计划年度"} },
                { prop: 'deptName', label: '部门',sortProp:"deptName", align: 'center',sort:true,search:{type:'input', prop:'deptName',placeholder:"请输入部门"} },
                { prop: 'reviewerName', label: '审批人',sortProp:"reviewerName", align: 'center',sort:true,search:{type:'input', prop:'reviewerName',placeholder:"请输入审批人"} },
                { prop: 'reviewerTime', label: '审批日期',formatter:timeInfo, sortProp:"reviewerTime", align: 'center',sort:true,search:{type:'date', prop:'reviewerTime',placeholder:"请选择审批日期"}},
                { prop: 'version', width:130,label: '计划版本',sortProp:"version", align: 'center' ,sort:true,search:{type:'input', prop:'version',placeholder:"请输入计划版本",extendType:'search'}}
              ]
};
export const selfCheckDetailsConfig = (obj) => {
    console.log(obj,11);
    return [
                { slot: 'radio' , label: '选择', width:49,search:{ type:'text',label:'过滤'}},
                { prop: 'number', label: '序号',  sortProp:"number", align: 'center',sort:true,search:{type:'input', prop:'number',placeholder:"请输入序号"} },
                { prop: 'checkProject', label: '检查项目', sortProp:"checkProject", align: 'center',sort:true,search:{type:'select', prop:'checkProject',placeholder:"请选择检查项目",data:obj.checkProject} },
                { prop: 'checkContents', label: '检查内容', sortProp:"checkContents", align: 'center',sort:true,search:{type:'input', prop:'checkContents',placeholder:"请输入检查内容"} },
                { prop: 'checkStandard', label: '检查标准', sortProp:"checkStandard", align: 'center',sort:true,search:{type:'input', prop:'checkStandard',placeholder:"请输入检查标准"}},
                // { prop: 'judgeStandard', label: '符合性判定标准', sortProp:"judgeStandard", align: 'center' ,sort:true,search:{type:'input', prop:'judgeStandard',placeholder:"请输入符合性判定标准"}},
                { prop: 'checkMethod', label: '检查方式', sortProp:"checkMethod", align: 'center' ,sort:true,search:{type:'select', prop:'checkMethod',multiple:true,placeholder:"请选择检查方式",data:obj.checkType}},
                // { prop: 'checkBasisOfficial', label: '检查依据-局方', sortProp:"checkBasisOfficial", align: 'center' ,sort:true,search:{type:'input', prop:'checkBasisOfficial',placeholder:"请输入检查依据-局方"}},
                // { prop: 'checkBasisCompany', label: '检查依据-公司', sortProp:"checkBasisCompany", align: 'center',sort:true,search:{type:'input', prop:'checkBasisCompany',placeholder:"请输入检查依据-公司"} },
                { prop: 'checkObject', label: '检查对象', sortProp:"checkObject", align: 'center',sort:true,search:{type:'select', prop:'checkObject',placeholder:"请选择检查对象",data:obj.checkObject} },
                // { prop: 'checkFrequency', label: '检查频次', sortProp:"checkFrequency", align: 'center' ,sort:true,search:{type:'input', prop:'checkFrequency',placeholder:"请输入检查频次"}},
                {  prop: 'checkTime', label: '检查时间' , sortProp:"checkTime", search:{type:'date', prop:'checkTime', placeholder:"请选择检查时间"}},
                {  prop: 'checkUser', label: '检查人员' , sortProp:"checkUser", search:{type:'input', prop:'checkUser', placeholder:"请输入检查人员",extendType:'search', }},
                // {  prop: 'checkType', label: '检查类别' , sortProp:"checkType", search:{type:'select',extendType:'search', prop:'checkType', placeholder:"请选择检查类别",data:obj.checkCategory]}},
              ]
};
 