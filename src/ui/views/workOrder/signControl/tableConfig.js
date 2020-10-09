import moment from 'moment'
import {map} from 'lodash'


let  timeInfo1=(row)=>{
    if(row.workTime){
        return moment(row.workTime).format('YYYY-MM-DD')
    }else {
        return ''
    }
}

let obj1={
    0:'待执行',
    1:'上报中',
    2:'作业中',
    3:'完成',
    4:'无效',
}
let arrstate=[
    {valData:'待执行',valCode:0},
    {valData:'上报中',valCode:1},
    {valData:'作业中',valCode:2},
    {valData:'完成',valCode:3},
    {valData:'无效',valCode:4},
 ]
let state=(row)=>{

    return obj1[row.state]
}
let etopEnable=(row)=>{
    if(row.template.etopEnable===true){
        return '适用'
    }else if(row.template.etopEnable===false){
        return '不适用'
    }else{
        return ''
    }

}
let xiansxx=(row)=>{
    return row.offlineFile?'线下':'线上'
}
let worldorderTypeObj={}

export const  Config = (obj,arr,arr1,arr2,arr3) => {
    map(obj.worldorderType,(k,l)=>{
        worldorderTypeObj[k.valCode]=k.valData
    })
    let worktype=(row)=>{
        if(row.template&&row.template.type){
            return worldorderTypeObj[row.template.type]
        }else{
            return ''
        }
    }
    return [
        { slot: 'checkbox' , label: '选择',width:'50',search:{type:'text',label:'过滤'}},
        { prop: 'workTime',width:'120', label: '任务日期',formatter:timeInfo1, sortProp:"workTime", align: 'center',sort:true ,search:{type:'date', prop:'workTime',placeholder:"请选择"} },
        { prop: 'isOffline',width:'90', label: '线上/线下', sortProp:"isOffline", align: 'center',sort:true,search:{type:'input', prop:'isOffline',placeholder:"请输入"}},
        { prop: 'serialNo', label: '工单流水号',sortProp:"serialNo", align: 'center',sort:true,search:{type:'input', prop:'serialNo',placeholder:"请输入"} },

        { prop: 'template.code',label: '工单模板编码',sortProp:"code", align: 'center',sort:true,search:{type:'input', prop:'code',placeholder:"请输入"} },
        { prop: 'template.title', label: '工单名称',sortProp:"title", align: 'center',sort:true,search:{type:'input', prop:'title',placeholder:"请输入"} },
         { prop: 'template.type',width:'150',  formatter:worktype,label: '工单类型',sortProp:"type", align: 'center',sort:true,search:{type:'select', prop:'type',placeholder:"请输入",data:obj.worldorderType,selectProp:['valData','valCode'] } },

        { prop: 'airlineCompanyCode',width:'110',  label: '航司代码',sortProp:"airlineCompanyCode", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyCode',placeholder:"请输入",data:arr,selectProp:['name','id'] } },
        { prop: 'airlineCompanyName',width:'110',  label: '航司名称',sortProp:"airlineCompanyName", align: 'center',sort:true,search:{type:'input', prop:'airlineCompanyName',placeholder:"请输入" ,data:arr1,selectProp:['name','id']} },
        { prop: 'airplaneIcao',width:'80',  label: '机型',sortProp:"airplaneIcao", align: 'center',sort:true,search:{type:'input', prop:'airplaneIcao',placeholder:"请输入",data:arr2,selectProp:['name','id'] } },
        { prop: 'flightState', width:'110', label: '航班类型', sortProp:"flightState", align: 'center',sort:true,search:{type:'select', prop:'flightState',placeholder:"请选择",data:obj.W_flightType,selectProp:['valData','valData']} },
        { prop: 'template.jobType',width:'110',  label: '作业类型', sortProp:"jobType", align: 'center',sort:true,search:{type:'select', prop:'jobType',placeholder:"请选择",data:obj.W_workType,selectProp:['valData','valCode']} },
        { prop: 'template.personType',width:'110',  label: '作业员类型', sortProp:"personType", align: 'center',sort:true,search:{type:'select', prop:'personType',placeholder:"请选择",data:obj.workUserType,selectProp:['valData','valCode']} },
        { prop: 'template.etopEnable',width:'90', formatter:etopEnable,label: '是否适用ETOPS运行', sortProp:"etopEnable", align: 'center',sort:true,search:{type:'select', prop:'etopEnable',placeholder:"请选择",data:obj.applyETOP,selectProp:['valData','valCode']} },
        { prop: 'state',width:'100',  label: '工单状态',formatter:state, sortProp:"state", align: 'center',sort:true,search:{type:'select', prop:'state',placeholder:"请选择",data:arrstate,selectProp:['valData','valCode']} },
        { slot: 'option', label: '操作' ,width:'80',search:{fixed:"right",type:'btn',label:'搜索',icon:"table_search"}}
    ]
};

