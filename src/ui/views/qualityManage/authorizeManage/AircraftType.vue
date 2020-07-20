<template>
    <div>
        <el-dialog title="机型范围选择"    :close-on-click-modal="false" center  :visible.sync="dialogFormVisible" :before-close="close">
            <div style=" ">
                <div>
                    <el-input
                            placeholder="输入关键字进行过滤"
                            v-model="filterText">
                    </el-input>
                    <!--:check-on-click-node="true"-->

                    <el-tree
                            @check="check"
v                            show-checkbox
                            node-key="id"
                             class="filter-tree"
                            :data="dataTree"
                            :props="defaultProps"
                            default-expand-all
                             :filter-node-method="filterNode"
                            ref="tree">
                          <span class="custom-tree-node" slot-scope="{ node, data ,q,w}">
                            <span >{{ node.label }}{{node.select}} {{data.select}} <span style="margin-left: 10px">【IATA：{{data.iata}}，MODUL：{{data.model}}】</span></span>

                                  <el-select  v-if="checkArr.indexOf(data.id)>-1"  multiple collapse-tags size="mini" v-model="data.models" placeholder="请选择发动机号">
                                     <el-option v-for="(opt,index) in EngineNo " :key="index" :value="opt.valData" :label="opt.valData"></el-option>
                                 </el-select>
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
                checkArr:[],
                filterText:'',
                dataTreeObj:{},
                EngineNo:[],
                 dataTree:[],
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
            check(node,node1){
                console.log(node1);
                this.checkArr=node1.checkedKeys
                // console.log(this.$refs.tree.getCurrentNode());
                console.log(this.$refs.tree.getCheckedNodes());
            },
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
                            let arr=value.map((k,l)=>{
                                this.$set(this.dataTreeObj[k.id],'models',k.models)

                                return k.id
                            })
                            this.$refs.tree.setCheckedKeys(arr);

                        }
                    }
                });
                request({
                    url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params:{delete:false},
                    data:["EngineNo"]
                }).then(d => {
                    this.EngineNo=d.data.EngineNo||[]

                });
                 this.dialogFormVisible=true


            },

            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },
            submit() {
                console.log(this.$refs.tree.getCheckedNodes(),123,1,1);
                 let data1=[...this.$refs.tree.getCheckedNodes()]
                this.$emit('getAircratType',data1)
                this.close()
            },
            close(){
                 this.dataTree=[]
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