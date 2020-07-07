let timeInfo=(row)=>{
        if(row.infTime){
            return row.infTime.split(' ')[0]
        }else {
                return ''
        }

}
export const trainManageUserConfig = (obj) => {
    return [
        { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
         { prop: 'paperName', label: '类别',sortProp:"paperName", align: 'center',sort:true,search:{type:'select', prop:'paperName',placeholder:"请输入",selectProp:['valData','valData'],data:obj.trainType} },
        { prop: 'totalTime', label: '培训项目',sortProp:"totalTime", align: 'center',sort:true,search:{type:'input', prop:'totalTime',placeholder:"请输入"} },
        { prop: 'startTime', label: '开始时间',sortProp:"startTime", align: 'center',sort:true,search:{type:'date', prop:'startTime', placeholder:"请选择"}},
        { prop: 'endTime', label: '结束时间',sortProp:"endTime", align: 'center' ,sort:true,search:{type:'date', prop:'endTime' ,placeholder:"请选择"}},
        { prop: 'qualificationType', label: '学时',sortProp:"qualificationType", align: 'center' ,sort:true,search:{type:'input', prop:'qualificationType', placeholder:"请输入"}},
         { prop: 'suitableUser', label: '地点',sortProp:"suitableUser", align: 'center',sort:true,search:{type:'input', prop:'suitableUser', placeholder:"请输入", } },
        { prop: 'description', label: '考核成绩', sortProp:"description", align: 'center',sort:true,search:{type:'input', prop:'description', placeholder:"请输入", } },
        { prop: 'description1', label: '证书编号', sortProp:"description1", align: 'center',sort:true,search:{type:'input', prop:'description1', placeholder:"请输入", } },
        { prop: 'description1', label: '备注', sortProp:"description1", align: 'center',sort:true,search:{type:'input', prop:'description1', placeholder:"请输入",extendType:'search' } },
     ]
};
