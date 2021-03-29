export const dangerousConfig = (obj) => {
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
                { slot: 'securityNumber', label: '安全信息编号',width:'148',sortProp:"securityNumber", align: 'center' ,sort:true,search:{type:'input',placeholder:"请输入安全信息编号", prop:'securityNumber'}},
                {  prop: 'consequence', label: '可能产生后果' ,width:'148',sortProp:"consequence",align: 'center' , search:{type:'input', placeholder:"请输入可能产生后果", prop:'consequence'}},
                {  prop: 'possibility', label: '可能性' ,width:'148',sortProp:"possibility",sort:true, align: 'center' ,search:{type:'input', placeholder:"请输入可能性", prop:'possibility'}},
                {  prop: 'seriousness', label: '严重性' ,width:'148',sortProp:"seriousness",sort:true,align: 'center' , search:{type:'input', placeholder:"请输入严重性", prop:'seriousness'}},
                {  prop: 'riskLevel', label: '风险等级' ,width:'148',sortProp:"riskLevel",sort:true,align: 'center' , search:{type:'input', placeholder:"请输入风险等级", prop:'riskLevel'}},
                {  prop: 'acceptability', label: '可接受程度' ,width:'148',sortProp:"acceptability",align: 'center' , search:{type:'input', placeholder:"请输入可接受程度", prop:'acceptability'}},
                {  prop: 'causeAnalysis', label: '根本原因分析' ,width:'148',sortProp:"causeAnalysis", align: 'center' ,search:{type:'input', placeholder:"请输入根本原因分析", prop:'causeAnalysis'}},
                {  prop: 'measures', label: '措施' , width:'148',sortProp:"measures",search:{type:'input',align: 'center' , placeholder:"请输入措施", prop:'measures'}},
                {  prop: 'residualPossibility', label: '剩余可能性' ,width:'148',sortProp:"residualPossibility",align: 'center' , search:{type:'input', placeholder:"请输入剩余可能性", prop:'residualPossibility'}},
                {  prop: 'residualSeverity', label: '剩余严重性' ,width:'148',sortProp:"residualSeverity",align: 'center' , search:{type:'input', placeholder:"请输入剩余严重性", prop:'residualSeverity'}},
                {  prop: 'residualRiskLevel', label: '剩余风险等级' ,width:'148',sortProp:"residualRiskLevel",align: 'center' , search:{type:'input', placeholder:"请输入剩余风险等级", prop:'residualRiskLevel'}},
                {  prop: 'controlState', label: '控制状态' ,width:'148',sortProp:"controlState",sort:true,align: 'center' , search:{type:'select', placeholder:"请选择控制状态", prop:'controlStateTemp',selectProp:['valData','valData'],data:obj.commentResults}},
                 {  prop:'evaluationResults',label: '评定结果' ,width:'190',sortProp:"evaluationResults",align: 'center' ,search:{fixed:"right",type:'select', placeholder:"请选择评定结果",extendType:'search', prop:'evaluationResultsTemp',selectProp:['valData','valData'],data:obj.controlState}}
        ]
};
export const safetyInfoListConfig = (obj) => {
        return [
            // { slot: 'radio' , label: '选择',width:'49' },
            {  prop:'infNumber',label: '信息编号'  ,align: 'center'  },
            {  prop:'infRemark',label: '信息描述'  ,align: 'center'  },
            {  prop:'infSources',label: '信息来源'  ,align: 'center'  },
            {  slot:'option',label: '操作'  ,width:'90',align: 'center'  },
              ]
};
 