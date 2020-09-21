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
                { prop: 'flightRegisterNo', label: '机尾号', sortProp:"flightRegisterNo", align: 'center',sort:true,search:{type:'input', prop:'flightRegisterNo',placeholder:"请输入信息编号"} },
                { prop: 'icao', label: '机型', sortProp:"icao", align: 'center',sort:true,search:{type:'input', prop:'icao',placeholder:"请输入信息描述"} },
                { prop: 'engineNo', label: '发动机号', sortProp:"engineNo", align: 'center',sort:true,search:{type:'input', prop:'engineNo',placeholder:"请输入信息来源"} },
               ]
};
 