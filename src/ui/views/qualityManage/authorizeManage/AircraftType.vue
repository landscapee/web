<template>
    <div>
        <el-dialog title="机型范围选择"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <div style=" ">
                <div>
                    <el-input
                            placeholder="输入关键字进行过滤"
                            v-model="filterText">
                    </el-input>

                    <el-tree
                            @check="checkNode"
                            show-checkbox
                            node-key="id"
                             class="filter-tree"
                            :data="dataTree"
                            :props="defaultProps"
                            default-expand-all
                            :default-checked-keys="valueArr"
                            :filter-node-method="filterNode"
                            ref="tree">
                          <span class="custom-tree-node" slot-scope="{ node, data }">
                            <span >{{ node.label }} <span style="margin-left: 10px">【iata：{{data.iata}}，model：{{data.model}}】</span></span>
                                 <el-input   size="mini" v-model="data.models" placeholder="请输入发动机号"></el-input>
                          </span>

                    </el-tree>

                </div>
                <div class="Qfooter">
                    <el-button @click="close">取消</el-button>
                    <el-button type="primary" @click="submit('form')">确认</el-button>
                </div>
            </div>

        </el-dialog>


    </div>
</template>

<script>
    import { map } from "lodash";

    import request from '@lib/axios.js';
    export default {
        name: "copyDetails",
        components: {},
        data() {
            return {
                selectData:[],
                filterText:'',
                dataTreeObj:{},
                oldlength:0,
                dataTree:[],
                valueArr:[],
                 defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                dialogFormVisible:false,
            }
        },
        watch: {
            filterText(val) {
                this.$refs.tree.filter(val);
            }
        },
        methods: {
            open(value){
                this.selectData=[...value]
                request({
                    url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                    method: 'get',
                }).then(d => {
                    if( d.data&&d.data.length){
                        this.dataTree=d.data
                        d.data.map((k,l)=>{
                            this.dataTreeObj[k.id]=k
                        })
                        if( value.length){
                            this.valueArr=value.map((k,l)=>{
                                this.$set(this.dataTreeObj[k.id],'models',k.models)

                                return k.id
                            })
                        }
                    }
                });

                 this.dialogFormVisible=true


            },
            checkNode(checkedNodes,checkedKeys,halfCheckedNodes,halfCheckedKeys ){
                // if(checkedKeys.checkedKeys.length>this.oldlength){
                //     checkedNodes.selected=true
                // }else{
                //     checkedNodes.selected=false
                // }
                // this.oldlength=checkedKeys.checkedKeys.length
                this.selectData=checkedKeys.checkedNodes
             },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            submit() {
                console.log(this.selectData,12,3);
                let data1=[...this.selectData]
                this.$emit('getAircratType',data1)
                this.close()
            },
            close(){

                 this.dataTree=[]
                this.valueArr=[]
                this.dialogFormVisible=false
            }
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
    /deep/ .el-dialog{
        width: 950px;

        .el-dialog__body{
            padding: 32px 61px 28px 61px;
            height:70vh;

            .el-tree{
                margin-bottom: 20px;
                height:calc(70vh - 150px);
                overflow: auto;
                .el-tree-node__expand-icon{
                    display: none;
                }
                .el-tree-node__content{
                    height:40px;
                }
            }
        }

    }




    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
        /deep/ .el-input{
            width: 300px;
         }
    }
</style>