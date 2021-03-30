import moment from 'moment';

let time = (row, v, key) => {
    return row.checkTime ? moment(row.checkTime).format('YYYY-MM-DD') : ''
}
export const workCardConfig = (obj, arr) => {
    return [
        {type: 'selection', label: '选择', width: '50', search: {type: 'allSelected', label: '全选'}},

        {
            prop: 'issuingUnit',
            label: '发行单位',
            sortProp: "issuingUnit",
            align: 'center',
            sort: true,
            search: {type: 'input', prop: 'issuingUnit', placeholder: "请输入"}
        },
        {
            prop: 'checkContent',
            label: '审核内容',
            sortProp: "checkContent",
            align: 'center',
            sort: true,
            search: {type: 'input', prop: 'checkContent', placeholder: "请输入"}
        },
        {
            prop: 'checkMode',
            label: '核对形式',
            sortProp: "checkMode",
            align: 'center',
            sort: true,
            search: {type: 'input', prop: 'checkMode', placeholder: "请输入"}
        },
        {
            prop: 'checkTime',
            label: '核对时间',
            formatter: time,
            sortProp: "checkTime",
            align: 'center',
            sort: true,
            search: {type: 'date',  prop: 'checkTime', placeholder: "请选择",}
        },
        {slot: 'enclosure',width:90, label: '附件',   align: 'center',  },
        {
            prop: 'remark',
            label: '备注',
            sortProp: "remark",
            align: 'center',
            sort: true,
            search: {type: 'input', prop: 'remark', placeholder: "请输入"}
        },
    ]
};

