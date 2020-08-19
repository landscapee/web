<template>
    <div>

        <router-view v-if="this.$router.history.current.path == '/WorkAbnormalDetails'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/WorkAbnormalAdd'" :key="$route.path"></router-view>
          <div v-else-if="this.$router.history.current.path == '/WorkAbnormal'" :key="$route.path" class="abnormal">
            <div class="top-content"  >
                <div class="top-content-title">
                    <span>工单异常管理</span>
                </div>
                <div class="top-toolbar">
                    <div @click="seeOther(null,'WorkAbnormalAdd')"><icon iconClass="info" ></icon>纸制填报工单导入</div>
                </div>
            </div>
              <div class="main-content" style="display: flex;justify-content: center;flex-direction: column;align-items: center">

                  <div   >
                      <div class=" formdiv">
                          <el-form :model="form" :inline="true">
                              <div style="display: flex;justify-content: space-between">
                                  <el-form-item label="工单编号：">
                                      <el-input @keyup.enter.native="getList" v-model="form.serialNo" clearable placeholder="请输入"></el-input>
                                  </el-form-item>
                                  <el-form-item label="工单日期：">
                                      <el-date-picker @change="getList" v-model="form.submitTime" clearable placeholder="请选择"></el-date-picker>
                                  </el-form-item>
                                  <el-form-item label="航班号：">
                                      <el-input @keyup.enter.native="getList" v-model="form.flightNo" clearable placeholder="请输入"></el-input>
                                  </el-form-item>
                                  <el-form-item  >
                                    <div class="button ">
                                        <el-button @click="getList" type="primary">查询</el-button>
                                        <el-button @click="resetForm"  >重置</el-button>
                                    </div>
                                  </el-form-item>
                              </div>

                          </el-form>
                      </div>

                        <div style="font-size: 20px;text-align: center;margin-bottom: 20px" >查询结果</div>
                      <SearchTable :noSearch="true"  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"       :showHeader="false" :showPage="true" >


                          <el-table-column align="center" slot="option" label="操作" :width="140" >
                              <template  slot-scope="scope">
                                  <div >
                                      <el-button class="QoptionButton" @click="seeOther(scope.row,'WorkAbnormalDetails')"  >详情</el-button>
                                   </div>
                              </template>
                          </el-table-column>

                      </SearchTable>

                  </div>
             </div>
        </div>
    </div>
</template>
<script>
    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import { authorizeConfig } from './tableConfig.js';
    import request from '@lib/axios.js';
    import {  extend ,map} from 'lodash';
    export default {
        components: {
            Icon,
            SearchTable
        },
        name: 'authorizeManage',
        data() {
            return {
                tableData:[],
                tableConfig:authorizeConfig({}),
                form:{},
                params:{
                    size:15,
                    current:1,
                }
            };
        },
        created() {

        },

        methods: {
            resetForm(){
                this.form={};
                this.getList()
            },
            seeOther(row,path){
                this.$router.push({path:path,query:{ id:row&&row.id}});

            },
             getList(){
                let data={...this.form}
                request({
                    url:`${this.$ip}/mms-workorder/workorder/list`,
                    method: 'post',
                    data:{ ...data},
                    params:{...this.params}
                 })
                    .then((d) => {
                        if(d.code==200){
                            this.tableData ={...d.data};
                        }
                    })
            },
            handleSizeChange(size) {
                this.params.current = 1;
                this.params.size = size;
                this.getList();
            },
            handleCurrentChange(current) {
                this.params.current = current;
                this.getList();
            },

        },
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";

    .abnormal{
        margin-top:14px;
        /deep/ .mainTable{
            height:calc(100vh - 470px);
            overflow-y: auto;
        }
        .button{
            /deep/ .el-button{
                padding: auto 20px;
            }
        }
        .formdiv{
            margin: 20px 0;
            border-bottom: 1px #bcbcbc solid;
        }
        /deep/ .el-form-item{
            margin-right: 0;
        }
    }

</style>
