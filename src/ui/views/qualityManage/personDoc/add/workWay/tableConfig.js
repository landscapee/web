import moment from "moment";

let timeInfo = (row) => {
    if (row.styleTime) {
        return moment(row.styleTime).format('YYYY-MM-DD')
    } else {
        return ''
    }
}

export const workWayConfig = (obj) => {
    return [
        {slot: 'radio', label: '选择', width: '49', search1: {type: 'text', label: '过滤'}},
        {prop: 'index', align: 'center', label: '序号', width: '49',},
        {prop: 'deductPoints', label: '扣分项代码', sortProp: "deductPoints", align: 'center', sort: false,},
        {prop: 'styleTime', label: '时间', formatter: timeInfo, sortProp: "styleTime", align: 'center', sort: false,},
        {prop: 'place', label: '地点', sortProp: "place", align: 'center', sort: false,},
        {prop: 'pointsDesc', label: '扣分行为描述', sortProp: "pointsDesc", align: 'center', sort: false,},
        {prop: 'measures', label: '采取的处理措施', sortProp: "measures", align: 'center', sort: false,},

    ]
};
