import moment from 'moment'
let timeInfo=(row)=>{
        if(row.infTime){

            return  moment(row.infTime).format('YYYY-MM-DD')
        }else {
                return ''
        }

}
export const  Config = (obj) => {
        return [
                { slot: 'radio' , label: '选择',width:'49', },
                { prop: 'flightRegisterNo', label: '机尾号', sortProp:"flightRegisterNoMode", align: 'center',sort:true,search:{type:'input', prop:'flightRegisterNo',placeholder:"请输入机尾号"} },
                { prop: 'icao', label: '机型', sortProp:"icaoMode", align: 'center',sort:true,search:{type:'input', prop:'icao',placeholder:"请输入机型"} },
                { prop: 'engineNo', label: '发动机号', sortProp:"engineNoMode", align: 'center',sort:true,search:{type:'input', prop:'engineNo',placeholder:"请输入发动机号"} },
               ]
};
