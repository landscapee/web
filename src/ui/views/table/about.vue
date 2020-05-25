<!--
 * @Descripttion: 
 * @version: 
 * @Author: xdh.ss
 * @Date: 2020-05-13 09:50:30
 * @LastEditors: xdh.ss
 * @LastEditTime: 2020-05-13 17:38:44
 -->
<template>
    <div class="about">
        <AdvTable id="demo_plan_list" :tab-data="tabData" :pagination="pagination" @viewsRow="viewsRow" @submit="submit"></AdvTable>
    </div>
</template>
<script>
export default {
    data(){
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
        }
    },
    beforeMount () {},
    mounted(){
        // this.$store.dispatch('setTabColumns', intelligenceManageTable);
    },
    methods: {
        viewsRow(row){
            alert(row.row.waybillCode)
        },
        submit(row){
            alert('运单号 ' + row.row.waybillCode + ' 提交成功')
        }
    },
}
</script>
<style lang="scss" scoped>
    .about{
        position: relative;
        height: 600px;
        width: 100%;
    }
</style>