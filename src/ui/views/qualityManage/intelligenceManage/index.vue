<template>
    <div class="intelligenceManage">
        <div class="top-content">
            <span>资质管理</span>
            <div class="toolbar">
                <div>新增</div>
                <div>编辑</div>
                <div>删除</div>
                <div>详情</div>
                <div>导出Excel</div>
                <div>保存</div>
                <div>重置</div>
            </div>
        </div>
        <div class="main-content">
            <!-- <AdvTable id="demo_plan_list" :tab-data="tabData" :pagination="pagination" @viewsRow="viewsRow" @submit="submit"></AdvTable> -->
        </div>
    </div>
</template>
<script>
import AdvTable from '@components/AdvTable/advTable';

export default {
    components: {
		AdvTable,
	},
    name: '',
    data() {
        return {
            tabData: [
                { waybillCode: '217-00000000', des: 'bkk', number: 5, weight: 10, specialCode: 'RLI', flightDate: 1589341428610, remark: '' }
            ],
            pagination: {
                page: 1,
                size: 20,
                map: [20, 50, 80],
                total: 0,
                layout: 'total, sizes, prev, pager, next, jumper'
            }
        };
    },
    created() {
    
    },
    methods: {
        viewsRow(row){
            alert(row.row.waybillCode)
        },
        submit(row){
            alert('运单号 ' + row.row.waybillCode + ' 提交成功')
        }
    },
};
</script>
<style scoped lang="scss">

</style>
