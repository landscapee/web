<template>
    <div>

 
        <div v-if="this.$router.history.current.path == '/queryIndex'" :key="$route.path" class="queryIndex">
            <div class="top-content">
                <div class="top-content-title">
                    <span>综合查询</span>
                </div>

            </div>
            <div class="main-content">
                <ButtonList :buttonList="buttonList" @getButton="getButton"></ButtonList>
                <SearchTable  scrollHeight="370" ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49"  >
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <!--:show-overflow-tooltip="true"-->



                </SearchTable>
            </div>
        </div>
    </div>
</template>
<script>
    import ButtonList from "../component/buttonList"
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { qiaozaiConfig,qinwuConfig,weixiuConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable,ButtonList
	},
    name: 'queryIndex',
    data() {
        return {
            buttonList:[

                {name:'勤务工单查询',id:'1',api:'/mms-report/query/service'},
                {name:'维修工单查询',id:'2',api:'/mms-report/query/maintenance'},
                // {name:'桥载工单查询',id:'3'},
            ],
            buttonObj:{},
            configObj:{
                '1':qinwuConfig,
                '2':weixiuConfig,
                '3':qiaozaiConfig,
            },
            tableData:{records:[]},
            tableConfig:weixiuConfig({}),
            params:{
				current: 1,
				size: 15,
            },
            filePath:'#',
            form:{},
            row:{},
            sort:{},
            options:{},
            selectId:null
        };
    },
   created() {
        this.buttonObj=this.buttonList[0]
        if(this.$router.history.current.path == '/queryIndex'){
            this.getList(this.buttonObj);
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["isUse", "loadPermission","CourseBusinessType",'coursewareType','applyObject' ]
            }).then(d => {
                this.options=d.data
                 this.tableConfig=this.configObj[this.buttonObj.id](this.options)
                console.log(this.tableConfig,73,2);
            });

        }

    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {
        getButton(obj){
            this.params={
                current: 1,
                size: 15,
            }
            this.sort={}
            this.form={}
            this.buttonObj=obj
            this.tableConfig=this.configObj[this.buttonObj.id]( this.options)
            this.getList();
        },
        fileDown(row){

         },

        requestTable(searchData){
            this.form = searchData;
            this.selectId=null;
            this.tableData={records:[]};
            this.params.current = 1;
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.getList();
        },
        headerSort(column){
            this.sort={}
            let num =null
            if(column.order=='desc'){
                num=0
            }else if(column.order=='asc'){
                num=1
            }else{
                num=2
            }
            if(num!=2){
                this.sort['order'] = column.property+','+num;
            }
            this.$refs.searchTable.$refs.body_table.setCurrentRow();
            this.params.current = 1;
             this.getList();
        },
        listenToCheckedChange(row, column, event){
            let select = row.selected;
            this.tableData.records.map(r =>{
                if(r.selected){
                    r.selected = false;
                }
            })
            row.selected  = !select;
            if(row.selected ){

                this.row = row;
                this.selectId = row.id;
            }else {
                this.selectId   = null;
                this.row = null;

            }

            this.params.current = 1;
            console.log(row, column, event,199);
            this.$set(this.tableData.records,row.index,row);
        },

        getList( ){
            let data={...this.form}
            map(data,((k,l)=>{
                if(!k){
                    data[l]=null
                }
            }))
           request({
                url:`${this.$ip}${this.buttonObj.api}`,
                  method: 'post',
                data:{...this.sort,...data},
               params:{...this.params,}
            })
            .then((data) => {
                  this.tableData = extend({}, {...data.data});
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
		handleCheckedChange() {},
		handleSelectionChange() {},
    },
};
</script>
<style scoped lang="scss">
@import "@/ui/styles/common_list.scss"; 
.queryIndex{
    margin-top:14px;
    /deep/ .mainTable{
        height:calc(100vh - 410px);

    }
    /deep/ .cell> div{
        line-height: 20px!important;
    }
}

</style>
