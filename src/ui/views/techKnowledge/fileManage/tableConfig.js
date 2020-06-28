export const sysParameterTable = () => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{type:'text',label:'筛选'}},
        { prop: 'sysParamCode', label: '文档名称', align: 'center',sort:true,sortProp:"sysParamCodeMode",search:{prop:'sysParamCode',type:'input',placeholder:"请输入文档名称"} },
        { prop: 'sysParamName', label: '发行单位', align: 'center',sort:true,sortProp:"sysParamNameMode",search:{prop:'sysParamName',type:'input',placeholder:"请输入发行单位"} },
        { prop: 'sysParamValue', label: '所属岗位', align: 'center',sort:true,sortProp:"sysParamValueMode",search:{prop:'sysParamValue',type:'input',placeholder:"请输入所属岗位"} },
        { prop: 'sysParamComment', label: '生效日期', align: 'center',search:{prop:'sysParamComment',type:'date',placeholder:"请输入生效日期"}},
        { prop: 'sysParamCode', label: '有效期至', align: 'center',sort:true,sortProp:"sysParamCodeMode",search:{prop:'sysParamCode',type:'date',placeholder:"请输入有效期至"} },
        { prop: 'sysParamName', label: '上传人', align: 'center',sort:true,sortProp:"sysParamNameMode",search:{prop:'sysParamName',type:'input',placeholder:"请输入上传人"} },
        { prop: 'sysParamValue', label: '上传时间', align: 'center',sort:true,sortProp:"sysParamValueMode",search:{prop:'sysParamValue',type:'date',placeholder:"请输入上传时间"} },
        { prop: 'sysParamComment', label: '格式', align: 'center',search:{prop:'sysParamComment',type:'input',placeholder:"请输入格式"}},
        { prop: 'sysParamName', label: '最新版本', align: 'center',sort:true,sortProp:"sysParamNameMode",search:{prop:'sysParamName',type:'input',placeholder:"请输入最新版本"} },
        { prop: 'sysParamValue', label: '大小', align: 'center',sort:true,sortProp:"sysParamValueMode",search:{prop:'sysParamValue',type:'input',placeholder:"请输入大小"} },
        { prop: 'sysParamComment', label: '操作', align: 'center',search:{prop:'sysParamComment',type:'input',extendType:'search',placeholder:"请输入格式"}},
    ]
};
