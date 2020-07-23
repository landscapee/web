<template>
    <div >
        <div style="position: relative;height:40px">
            <div class="QheadRight">
                <div @click="addList('add')"><icon iconClass="add" ></icon>新增</div>
                <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>

            </div>
        </div>

        <SearchTable :noSearch="true" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable"  @listenToCheckedChange="listenToCheckedChange"    :showHeader="false" :showPage="true" >
            <el-table-column slot="radio" label="选择" :width="49"  >
                <template slot-scope="{ row }">
                    <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                    <icon  iconClass="ky" class="tab_radio" v-else></icon>
                </template>
            </el-table-column>
            <el-table-column slot="nameCn" label="信息项标题"   align="center" >
                <template slot-scope="{ row }">
                    <el-input v-model="row.nameCn"  placeholder="请输入信息项标题" >  </el-input>
                </template>
            </el-table-column>
            <el-table-column slot="nameEn" label="信息项英文标题"   align="center" >
                <template slot-scope="{ row }">
                    <el-input v-model="row.nameEn"    placeholder="请输入信息项英文标题">  </el-input>
                </template>
            </el-table-column>
            <el-table-column slot="type" label="信息项值类型"  align="center" >
                <template slot-scope="{ row }">
                    <el-select v-model="row.type"  placeholder="请选择信息项值类型" >
                        <el-option v-for="(opt,index) in infoValueType" :key="index" :label="opt.valData" :value="opt.valData"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column slot="value" label="值"   align="center" >
                <template slot-scope="{ row }">
                    <el-input v-model="row.value"  placeholder="请输入值" >  </el-input>

                </template>
            </el-table-column>
            <el-table-column slot="enable" label="是否启用" :width="90" align="center" >
                <template slot-scope="{ row }">
                    <el-checkbox v-model="row.enable" :label="true">  </el-checkbox>
                </template>
            </el-table-column>

        </SearchTable>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { twoConfig } from '../tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable
        },
        name: 'two',
        props:{
            type:String,
        },
        data() {
            return {
                form:{tableData:[]},
                tableData:[],
                tableConfig:twoConfig({}),
                infoValueType:[],
                selectId:null,
                rowT:{},
            };
        },
        created() {
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:[ 'infoValueType' ]
            }).then(d => {
                let obj=d.data
                this.infoValueType=obj.infoValueType

            });
            this.getInfo()
        },

        methods: {
            addList(){
                this.tableData.unshift({templateId:this.$route.query.id})
            },
            listenToCheckedChange(row, column, event){
                let select = row.selected;
                this.tableData.map(r =>{
                    if(r.selected){
                        r.selected = false;
                    }
                })
                row.selected  = !select;
                if(row.selected ){
                    this.rowT = row;
                    this.selectId = row.index;
                }else {
                    this.selectId   = null;
                    this.rowT = null;

                }

                this.$set(this.tableData,row.index,row);
            },
             delData(){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                    this.$confirm('此操作将删除该信息, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning',
                    }).then(() => {
                            this.tableData.splice(this.selectId,1)
                            this.selectId   = null;
                            this.rowT   = {};
                            this.$message({type: 'success',message: '删除成功,保存后生效'});
                        }).catch(() => {
                            this.$message({
                                type: 'info',
                                message: '已取消删除',
                            });
                        });
                }

            },
                save(form){
                    return new Promise((resolve, reject)=>{

                        request({
                                url:`${this.$ip}/mms-workorder/templateBaseItem/save`,
                                method: 'post',
                                data:this.tableData
                            }).then((d) => {
                                if(d.code==200){
                                    resolve(true)
                                    this.$message.success('操作成功')
                                }

                            })
                    })

                },
            getInfo( ){
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                }).then((d) => {
                    if(d.code==200){
                        this.tableData=d.data.contentVOList
                    }


                })
            }

        },
    };
</script>
<style scoped lang="scss">
    /*@import "@/ui/styles/common_list.scss";*/

    /deep/ .mainTable{
        height: 300px;
        overflow: auto;
         .current-row > td {
            background-color: inherit!important;
        }
        .el-checkbox__label{
            display: none;
        }
        .el-select,.el-input{
            width: 100%;
        }
        .el-input__inner{
            border: 0;
        }
    }

</style>
