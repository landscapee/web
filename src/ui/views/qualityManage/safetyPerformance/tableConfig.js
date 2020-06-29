import moment from "moment";

let timeInfo=(row)=>{
    if(row.reviewerTime){
        return  moment(row.reviewerTime).format('YYYY-MM-DD')

        // return row.reviewerTime.split(' ')[0]
    }else {
        return ''
    }

}
export const safetyConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
                { prop: 'year', label: '年份',width:60,sortProp:"year", align: 'center',sort:true,search:{type:'input', prop:'year',placeholder:"请输入年份",clear:false} },
                { prop: 'month', label: '月份',width:60,sortProp:"month", align: 'center',sort:true,search:{type:'input', prop:'month',placeholder:"请输入月份",clear:false} },
                { prop: 'deptName', label: '部门',sortProp:"deptName", align: 'center', search:{type:'select', prop:'deptName',placeholder:"请选择",selectProp:['valData','valCode'],data:obj.dept} },
                { prop: 'reviewerName', label: '批准人',sortProp:"reviewerName", align: 'center', search:{type:'input', prop:'reviewerName',placeholder:"请输入批准人"} },
                { prop: 'reviewerTime', label: '审批日期',formatter:timeInfo, sortProp:"reviewerTime", align: 'center',sort:true,search:{type:'date', prop:'reviewerTime',placeholder:"请选择审批日期"}},
                { slot:'option', width:130,label: '操作',  align: 'center' , search:{type:'btn', label:'搜索',icon:"table_search"}}
              ]
};
export const safetyDetailsConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择', width:49,search:{ type:'text',label:'过滤'}},
                { prop: 'number', label: '编号',  sortProp:"number", align: 'center',sort:true,search:{type:'input', prop:'number',placeholder:"请输入编号"} },
                { prop: 'quota', label: '指标', sortProp:"quota", align: 'center',sort:true,search:{type:'input', prop:'quota',placeholder:"请输入指标"} },
                { prop: 'quotaType', label: '指标类型', sortProp:"quotaType", align: 'center',sort:true,search:{type:'select', prop:'quotaType',placeholder:"请输入指标类型",selectProp:['valCode','valCode'],data:obj.indicateType} },
                { prop: 'sources', label: '监控信息来源', sortProp:"sources", align: 'center',sort:true,search:{type:'input', prop:'sources',placeholder:"请输入监控信息来源"}},
                // { prop: 'formulas', label: '计算公式', sortProp:"formulas", align: 'center' ,sort:true,search:{type:'input', prop:'formulas',placeholder:"请输入计算公式"}},
                // { prop: 'targetValue', label: '目标值', sortProp:"targetValue", align: 'center' ,sort:true,search:{type:'input', prop:'targetValue',placeholder:"请输入目标值"}},
                { prop: 'warningWules', label: '预警规则', sortProp:"warningWules", align: 'center' ,sort:true,search:{type:'input', prop:'warningWules',placeholder:"请输入预警规则"}},
                { prop: 'content', label: '内容', sortProp:"content", align: 'center',sort:true,search:{type:'input', prop:'content',placeholder:"请输入内容"} },
                { prop: 'project', label: '责任人/项目', sortProp:"project", align: 'center',sort:true,search:{type:'input', prop:'project',placeholder:"请输入责任人/项目"} },
                { prop: 'implementation', label: '落实情况', sortProp:"implementation", align: 'center' ,sort:true,search:{type:'input', prop:'implementation',placeholder:"请输入落实情况"}},
                 {  prop: 'monitorState', width:130, label: '状态监控（绩效）' , sortProp:"monitor_state", search:{type:'input',extendType:'search', prop:'monitor_state', placeholder:"请输入状态监控（绩效）"}},
              ]
};
export const safetyYearConfig = () => {
        return [

            { prop: 'month', label: '月', width:49,   align: 'center', },
                 { prop: 'number', label: '编号',    align: 'center',  },
                { prop: 'quota', label: '指标',  align: 'center',  },
                { prop: 'quotaType', label: '指标类型',   align: 'center',  },
                { prop: 'sources', label: '监控信息来源',   align: 'center', },
                { prop: 'formulas', label: '计算公式',   align: 'center' , },
                { prop: 'targetValue', label: '目标值',   align: 'center' , },
                { prop: 'warningWules', label: '预警规则',   align: 'center' , },
                { prop: 'content', label: '内容',   align: 'center',  },
                { prop: 'project', label: '责任人/项目',   align: 'center',  },
                { prop: 'implementation', label: '落实情况',   align: 'center' , },
                 {  prop: 'monitorState',  label: '状态监控（绩效）' ,  },
              ]
};
 