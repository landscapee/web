<template>
    <div>
        <div class="DivBox">
            <div class="item">
                <div class="left">任务日期：</div>
                <div class="right">{{form.workTime? moment(form.workTime).format('YYYY-MM-DD'):'--'}}</div>
            </div>
            <div class="item">
                <div class="left">任务号：</div>
                <div class="right">{{form.ommsJobNo}}</div>
            </div>
            <div class="item">
                <div class="left">工单编号：</div>
                <div class="right">{{form.serialNo}}</div>
            </div>
            <div class="item">
                <div class="left">工单模板编码：</div>
                <div class="right">{{get(form.template,'code')}}</div>
            </div>
            <div class="item">
                <div class="left">模板名称：</div>
                <div class="right">{{get(form.template,'title')}}</div>
            </div>
            <div class="item">
                <div class="left">模板版本号：</div>
                <div class="right">{{get(form.template,'version')}}werwerwerwerwerwerew</div>
            </div>
        </div>
    </div>
</template>

<script>
    import moment from 'moment'

    import {map,get} from 'lodash'
    export default {
        name: "info",
        props:['form'],
        components: {},
        data() {
            return {
                get:get,
                moment:moment
            }
        },
        methods: {},
        created() {
        },
    }
</script>

<style lang="scss" scoped>
    .DivBox {
        .item{
            display: flex;
            height:30px;
            justify-content: left;
            align-items: center;
            .left{
                width:140px;
            }
            .right{
                width:calc(100% - 140px)
            }
        }
    }
</style>