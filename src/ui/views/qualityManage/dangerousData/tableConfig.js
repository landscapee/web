export const dangerousConfig = () => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{fixed:"left",type:'text',label:'过滤'}},
                { prop: 'number', label: '编号', width:'148',sortProp:"number", align: 'center',sort:true,search:{type:'input',placeholder:"请输入编号", prop:'number'} },
                { prop: 'system', label: '系统',width:'148',sortProp:"system", align: 'center',sort:true,search:{type:'input',placeholder:"请输入系统", prop:'system'} },
                { prop: 'childSystem', label: '子系统',width:'148',sortProp:"childSystem", align: 'center',sort:true,search:{type:'input',placeholder:"请输入子系统", prop:'childSystem'} },
                { prop: 'firstProcess', label: '一级流程',width:'148',sortProp:"firstProcess", align: 'center',sort:true,search:{type:'input',placeholder:"请输入一级流程", prop:'firstProcess'}},
                { prop: 'secondProcess', label: '二级流程',width:'148',sortProp:"secondProcess", align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入二级流程", prop:'secondProcess'}},
                { prop: 'place', label: '场所',width:'148',sortProp:"place", align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入场所", prop:'place'}},
                { prop: 'project', label: '责任部门/项目',width:'148',sortProp:"project", align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入责任部门/项目", prop:'project'}},
                { prop: 'process', label: '设备/活动/过程',width:'148',sortProp:"process", align: 'center',sort:true,search:{type:'input',placeholder:"请输入设备/活动/过程", prop:'process'} },
                { prop: 'dangerRemark', label: '危险源描述',width:'148',sortProp:"dangerRemark", align: 'center',sort:true,search:{type:'input',placeholder:"请输入危险源描述", prop:'dangerRemark'} },
                { prop: 'securityNumber', label: '安全信息编号',width:'148',sortProp:"securityNumber", align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入安全信息编号", prop:'securityNumber'}},
                {  prop: 'consequence', label: '可能产生后果' ,width:'148',sortProp:"consequence", search:{type:'input', placeholder:"请输入可能产生后果", prop:'consequence'}},
                {  prop: 'possibility', label: '可能性' ,width:'148',sortProp:"possibility", search:{type:'input', placeholder:"请输入可能性", prop:'possibility'}},
                {  prop: 'seriousness', label: '严重性' ,width:'148',sortProp:"seriousness", search:{type:'input', placeholder:"请输入严重性", prop:'seriousness'}},
                {  prop: 'riskLevel', label: '风险等级' ,width:'148',sortProp:"riskLevel", search:{type:'input', placeholder:"请输入风险等级", prop:'riskLevel'}},
                {  prop: 'acceptability', label: '可接受程度' ,width:'148',sortProp:"acceptability", search:{type:'input', placeholder:"请输入可接受程度", prop:'acceptability'}},
                {  prop: 'causeAnalysis', label: '根本原因分析' ,width:'148',sortProp:"causeAnalysis", search:{type:'input', placeholder:"请输入根本原因分析", prop:'causeAnalysis'}},
                {  prop: 'measures', label: '措施' , width:'148',sortProp:"measures",search:{type:'input', placeholder:"请输入措施", prop:'measures'}},
                {  prop: 'residuaPossibility', label: '剩余可能性' ,width:'148',sortProp:"residuaPossibility", search:{type:'input', placeholder:"请输入剩余可能性", prop:'residuaPossibility'}},
                {  prop: 'residualSeverity', label: '剩余严重性' ,width:'148',sortProp:"residualSeverity", search:{type:'input', placeholder:"请输入剩余严重性", prop:'residualSeverity'}},
                {  prop: 'residualRiskLevel', label: '剩余风险等级' ,width:'148',sortProp:"residualRiskLevel", search:{type:'input', placeholder:"请输入剩余风险等级", prop:'residualRiskLevel'}},
                {  prop: 'controlState', label: '控制状态' ,width:'148',sortProp:"controlState", search:{type:'select', placeholder:"请选择控制状态", prop:'controlState',data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}]}},
                 {  slot:'evaluationResults',label: '评定结果' ,width:'190',sortProp:"evaluationResults",search:{fixed:"right",type:'select', placeholder:"请选择评定结果",extendType:'search', prop:'evaluationResults',data:[{label:"类型1",value:"1"},{label:"类型2",value:"2"}]}}
        ]
};
 