export const selfCheckConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '计划年度',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infNumber',placeholder:"请输入计划年度"} },
                { prop: 'infRemark', label: '部门',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infRemark',placeholder:"请输入部门"} },
                { prop: 'infSources', label: '审批人',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infSources',placeholder:"请输入审批人"} },
                { prop: 'infTime', label: '审批日期',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'date', prop:'infTime',placeholder:"请选择审批日期"}},
                { prop: 'place', width:130,label: '计划版本',sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'place',placeholder:"请输入计划版本",extendType:'search'}}
              ]
};
export const selfCheckDetailsConfig = () => {
        return [
                { slot: 'radio' , label: '选择', width:49,search:{ type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '序号',  sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infNumber',placeholder:"请输入序号"} },
                { prop: 'infRemark', label: '检查项目', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'select', prop:'infRemark',placeholder:"请选择检查项目",data:[{label:'121',value:'121'}]} },
                { prop: 'infSources', label: '检查内容', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infSources',placeholder:"请输入检查内容"} },
                { prop: 'infTime', label: '检查标准', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infTime',placeholder:"请输入检查标准"}},
                // { prop: 'place', label: '符合性判定标准', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'place',placeholder:"请输入符合性判定标准"}},
                { prop: 'responsibleUnit', label: '检查方式', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'select', prop:'responsibleUnit',placeholder:"请选择检查方式"}},
                // { prop: 'deptName', label: '检查方式-局方', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'deptName',placeholder:"请输入检查方式-局方"}},
                // { prop: 'situation', label: '检查方式-公司', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'situation',placeholder:"请输入检查方式-公司"} },
                { prop: 'reason', label: '检查对象', sortProp:"parkingNo", align: 'center',sort:true,search:{type:'select', prop:'reason',placeholder:"请选择检查对象",data:[{label:'qq',value:1212}]} },
                // { prop: 'measures', label: '检查频次', sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'measures',placeholder:"请输入检查频次"}},
                {  prop: 'controlSate', label: '检查时间' , sortProp:"parkingNo", search:{type:'date', prop:'controlSate', placeholder:"请选择检查时间"}},
                {  prop: 'workLink', label: '检查人员' , sortProp:"parkingNo", search:{type:'input', prop:'workLink', placeholder:"请输入检查人员"}},
                // {  prop: 'keyWord', label: '检查类别' , sortProp:"parkingNo", search:{type:'select',extendType:'search', prop:'keyWord', placeholder:"请选择检查类别",data:[{label:'qq',value:1212}]}},
              ]
};
 