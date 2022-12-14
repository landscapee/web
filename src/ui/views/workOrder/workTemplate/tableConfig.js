
import moment from "moment";

let timeInfo=(row)=>{
    if(row.enableTime){
        return  moment(row.enableTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
};
let timeInfo1=(row)=>{
    if(row.publishTime){
        return  moment(row.publishTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
};

let timeInfo3=(row)=>{
    if(row.invalidTime){
        return  moment(row.invalidTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
};



export const workOrderConfig = (obj,arr) => {
    let stateObj={}
    obj.W_versionState&& obj.W_versionState.map((k,l)=>{
        stateObj[k.valCode]=k.valData
    })
    let state=(row)=>{
        return stateObj[row.state]
    }
        return [
            { slot: 'radio' , label: '选择',width:49,search:{type:'text',label:'过滤'}},
            { prop: 'version', label: '工单模板版本号',sortProp:"version", align: 'center',sort:false },
            { slot: 'check', label: '最新版本标识',width:120, align: 'center', sort:false  },
            { prop: 'code', label: '工单模板编码',sortProp:"code", align: 'center',sort:true,search:{type:'input', prop:'code',placeholder:"请输入"} },
            { prop: 'title', label: '工单标题',sortProp:"title", align: 'center',sort:true,search:{type:'input', prop:'title',placeholder:"请输入"} },
            // { prop: 'enableTime', label: '模板启用日期',formatter:timeInfo,sortProp:"enableTime", align: 'center',sort:true,search:{type:'date', prop:'enableTime',placeholder:"请选择", } },
            { prop: 'createUserName', label: '模板编制人',sortProp:"createUserName", align: 'center',sort:true,search:{type:'input', prop:'createUserName',placeholder:"请输入"} },
            { prop: 'publishTime', label: '版本发布日期',formatter:timeInfo1,sortProp:"publishTime", align: 'center',sort:true,search:{type:'date', prop:'publishTime',placeholder:"请选择" } },
            { prop: 'enableTime', label: '版本生效日期',formatter:timeInfo,sortProp:"enableTime", align: 'center',sort:true,search:{type:'date', prop:'enableTime',placeholder:"请选择" } },
            { prop: 'invalidTime', label: '版本失效日期',formatter:timeInfo3,sortProp:"invalidTime", align: 'center',sort:true,search:{type:'date', prop:'invalidTime',placeholder:"请选择" } },
            { prop: 'state', label: '版本状态',formatter:state, sortProp:"state", align: 'center',sort:true,search:{type:'select', prop:'state',placeholder:"请选择",data:obj.W_versionState,selectProp:['valData','valCode']} },
            { slot: 'option', label: '操作' ,width:'100',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
              ]
};
export const twoConfig = (obj,arr) => {
        return [
            { slot: 'radio' , label: '选择',width:'49', },

            { slot: 'nameCn', label: '信息项标题',sortProp:"userNumber", align: 'center',sort:false },
            { slot: 'nameEn', label: '信息项英文标题',sortProp:"userName", align: 'center',sort:false  },
            { slot: 'type', label: '信息项值类型',sortProp:"dept", align: 'center',sort:false,  },
            { slot: 'value', label: '值',sortProp:"post", align: 'center',sort:false,  },
            { slot: 'enable',width:'90', label: '是否启用',sortProp:"authorizationType", align: 'center',sort:false,  },
            // { slot: 'checked', label: '是否启用' ,width:'90' }
              ]
};

