let timeInfo=(row)=>{
    if(row.reviewer_time){
         return row.reviewer_time.split(' ')[0]
    }else {
        return ''
    }

}
export const selfCheckConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
                { prop: 'year', label: '年份',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'year',placeholder:"请输入计划年度"} },
                { prop: 'dept_name', label: '月份',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'dept_name',placeholder:"请输入部门"} },
                { prop: 'reviewer_name', label: '部门',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'reviewer_name',placeholder:"请输入审批人"} },
                { prop: 'reviewer_name', label: '批准人',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'reviewer_name',placeholder:"请输入审批人"} },
                { prop: 'reviewer_time', label: '审批日期',formatter:timeInfo, sortProp:"parkingNo", align: 'center',sort:true,search:{type:'date', prop:'reviewer_time',placeholder:"请选择审批日期"}},
                { prop: 'version', width:130,label: '计划版本',sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'version',placeholder:"请输入计划版本",extendType:'search'}}
              ]
};
export const selfCheckDetailsConfig = () => {
        return [
                { slot: 'radio' , label: '选择', width:49,search:{ type:'text',label:'过滤'}},
                { prop: 'number', label: '序号',  sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'number',placeholder:"请输入序号"} },
                { prop: 'check_project', label: '检查项目', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'select', prop:'check_project',placeholder:"请选择检查项目",data:[{label:'121',value:'121'}]} },
                { prop: 'check_contents', label: '检查内容', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'check_contents',placeholder:"请输入检查内容"} },
                { prop: 'check_standard', label: '检查标准', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'check_standard',placeholder:"请输入检查标准"}},
                // { prop: 'judge_standard', label: '符合性判定标准', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'judge_standard',placeholder:"请输入符合性判定标准"}},
                { prop: 'check_method', label: '检查方式', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'select', prop:'check_method',placeholder:"请选择检查方式"}},
                // { prop: 'check_basis_official', label: '检查依据-局方', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'check_basis_official',placeholder:"请输入检查依据-局方"}},
                // { prop: 'check_basis_company', label: '检查依据-公司', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'check_basis_company',placeholder:"请输入检查依据-公司"} },
                { prop: 'check_object', label: '检查对象', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'select', prop:'check_object',placeholder:"请选择检查对象",data:[{label:'qq',value:1212}]} },
                // { prop: 'check_frequency', label: '检查频次', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'check_frequency',placeholder:"请输入检查频次"}},
                {  prop: 'check_time', label: '检查时间' , sortProp:"parkingNo", search:{type:'date', prop:'check_time', placeholder:"请选择检查时间"}},
                {  prop: 'check_user', label: '检查人员' , sortProp:"parkingNo", search:{type:'input', prop:'check_user', placeholder:"请输入检查人员"}},
                // {  prop: 'check_type', label: '检查类别' , sortProp:"parkingNo", search:{type:'select',extendType:'search', prop:'check_type', placeholder:"请选择检查类别",data:[{label:'qq',value:1212}]}},
              ]
};
 