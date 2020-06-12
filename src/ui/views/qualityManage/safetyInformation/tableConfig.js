let timeInfo=(row)=>{
        if(row.infTime){
            return row.infTime.split(' ')[0]
        }else {
                return ''
        }

}
export const sadetyInfoConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'infNumber', label: '信息编号', width:'148',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infNumber',placeholder:"请输入信息编号"} },
                { prop: 'infRemark', label: '信息描述',width:'148',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infRemark',placeholder:"请输入信息描述"} },
                { prop: 'infSources', label: '信息来源',width:'148',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'infSources',placeholder:"请输入信息来源"} },
                { prop: 'infTime', label: '时间',formatter:timeInfo,width:'148',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'date', prop:'infTime',placeholder:"请选择时间"}},
                { prop: 'place', label: '地点',width:'148',sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'place',placeholder:"请输入地点"}},
                { prop: 'responsibleUnit', label: '负责人/单位',width:'148',sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'responsibleUnit',placeholder:"请输入负责人/单位"}},
                { prop: 'deptName', label: '所属系统',width:'148',sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'deptName',placeholder:"请输入所属系统"}},
                { prop: 'situation', label: '违规/差错',width:'148',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'select', prop:'situation',placeholder:"请选择违规/差错",data:[{label:"违规",value:"违规"},{label:"差错",value:"差错"}],} },
                { prop: 'reason', label: '原因分析',width:'148',sortProp:"parkingNo", align: 'center',sort:true,search:{type:'input', prop:'reason',placeholder:"请输入原因分析"} },
                { prop: 'measures', label: '整改措施',width:'148',sortProp:"parkingNo", align: 'center' ,sort:true,search:{type:'input', prop:'measures',placeholder:"请输入整改措施"}},
                {  prop: 'controlSate', label: '控制状态' ,width:'148',sortProp:"parkingNo", search:{type:'input', prop:'controlSate', placeholder:"请输入控制状态"}},
                {  prop: 'workLink', label: '工作环节' ,width:'148',sortProp:"parkingNo", search:{type:'input', prop:'workLink', placeholder:"请输入工作环节"}},
                {  prop: 'keyWord', label: '关键词' ,width:'148',sortProp:"parkingNo", search:{type:'input', prop:'keyWord', placeholder:"请输入关键词"}},
                {  prop: 'serviceEvents', label: '是否安全/服务事件' ,width:'148',sortProp:"parkingNo", search:{type:'select',prop:'serviceEvents', placeholder:"请选择是否安全/服务事件", data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}],}},
                 {  slot:'remark',label: '备注' ,width:'190',sortProp:"parkingNo",search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
        ]
};
 