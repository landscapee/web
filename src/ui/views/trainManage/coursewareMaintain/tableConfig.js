let timeInfo=(row)=>{
        if(row.infTime){
            return this.$moment(row.infTime).format('YYYY-MM-DD')
        }else {
                return ''
        }

}

export const coursewareConfig = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49',search:{ type:'text',label:'过滤'}},
                { prop: 'courseCode', label: '课件编号', sortProp:"courseCode", align: 'center',sort:true,search:{type:'input', prop:'courseCode',placeholder:"请输入"} },
                { prop: 'courseName', label: '课件名称',sortProp:"courseName", align: 'center',sort:true,search:{type:'input', prop:'courseName',placeholder:"请输入"} },
                { prop: 'courseFileName', label: '课件文件',sortProp:"courseFileName", align: 'center',sort:true,search:{type:'input', prop:'courseFileName',placeholder:"请输入"} },
                { prop: 'description', label: '课件简介',sortProp:"description", align: 'center',sort:true,search:{type:'input', prop:'description', placeholder:"请输入"}},
                { prop: 'courseType', label: '课件类别',sortProp:"courseType", align: 'center' ,sort:true,search:{type:'select', prop:'courseType',selectProp:['valData','valData'],data:obj.coursewareType,placeholder:"请选择"}},
                { prop: 'businessType', label: '业务类型',sortProp:"businessType", align: 'center' ,sort:true,search:{type:'select', prop:'businessType',selectProp:['valData','valData'],data:obj.CourseBusinessType,placeholder:"请选择"}},
                { prop: 'suitableUser', label: '适合对象',sortProp:"suitableUser", align: 'center' ,sort:true,search:{type:'select', prop:'suitableUser',selectProp:['valData','valData'],data:obj.applyObject ,placeholder:"请选择"}},
                { prop: 'downloadPermission', label: '下载权限',sortProp:"downloadPermission", align: 'center',sort:true,search:{type:'select', prop:'downloadPermission',selectProp:['valData','valData'],data:obj.loadPermission ,placeholder:"请选择", } },
                { prop: 'active',width:100, label: '是否启用', sortProp:"active", align: 'center',sort:true,search:{type:'select', prop:'active',selectProp:['valData','valData'],data:obj.isUse ,placeholder:"请选择", } },
                { slot: 'fileDown', label: '操作',width:'60',sortProp:"description", align: 'center',sort:false,search:{type:'btn',label:'搜索',icon:"table_search"} },
         ]
};
