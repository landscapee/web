<template lang="html">
    <el-dialog :close-on-click-modal="false" class="users-dialog" :title="title" center append-to-body
               :visible.sync="dialogVisible" width="700px" :before-close="handleClose">
        <userPage></userPage>
        <div class="Qfooter" style="margin-top: 15px">
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="handleSave">确定</el-button>
        </div>
    </el-dialog>
</template>

<script>
    import request from '@lib/axios.js';
    import {map} from 'lodash';
    import userPage from '@/ui/components/userTree/page'

    export default {
        name: 'exStudyLog',
        data() {
            return {
                title:'wwwww',
                dialogVisible: false,
                form: {},
            };
        },
        components: {
            userPage,
        },
        props: {
            dataRequire: {
                type: Boolean,
                default: false
            }
        },
        methods: {
            handleSave() {

            },
            handleClose() {
                this.form = {}
                this.dialogVisible = false;
            },
            open() {
                this.dialogVisible = true;

            },
        },

    };
</script>

<style scoped lang="scss">

</style>
