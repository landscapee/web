<template>
    <div>

         <router-view v-if="this.$router.history.current.path == '/trainManageUserAdd'" :key="$route.path"></router-view>

        <div v-else-if="this.$router.history.current.path == '/trainManageUser'" :key="$route.path" class="QCenterRight G_listOne">
            <div >
                <div class="QHead">
                    我的培训
                </div>
                <div class="QheadRight">

                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                 </div>
            </div>
            <div class="tableOneBox">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <!--<el-table-column :show-overflow-tooltip="true" slot="remark" label="备注" :width="190" fixed="right">-->
                        <!--<template  slot-scope="{ row }">-->
                            <!--<span>{{row.remark}}</span>-->
                        <!--</template>-->
                    <!--</el-table-column>-->

                </SearchTable>
            </div>
        </div>
    </div>
</template>
<script>
import SearchTable from '@/ui/components/SearchTable';
import Icon from '@components/Icon-svg/index';
import { trainManageUserConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
export default {
    components: {
        Icon,
        SearchTable
	},
    name: 'textMindex',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:trainManageUserConfig({}),
            params:{
				current: 1,
				size: 15,
            },
            form:{},
            row:{},
            sort:{},
            selectId:null
        };
    },
   created() {
        if(this.$router.history.current.path == '/trainManageUser'){
            this.getList();
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["trainType",  ]
            }).then(d => {
                let obj=d.data
                this.tableConfig=trainManageUserConfig(obj)

            });

        }

    },
    watch:{
        '$route':function(val,nm){
            console.log(1,val,nm);

        }
    },
    methods: {

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
            console.log(column.property,column.order, this.sort,11);
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
                this.selectId = row.id;
            }else {
                this.selectId   = null;
            }
             this.row = row;
            this.params.current = 1;
            console.log(row, column, event,199);
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
             if(tag=='add'){
                this.$router.push({path:'/trainManageUserAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/trainManageUserAdd',query:{type:tag,id:this.row.id}});
                }
            }
        },

        getList(){
            let data={...this.form}
            map(data,((k,l)=>{
                if(!k){
                    data[l]=null
                }
            }))
           request({
               url: `${this.$ip}/mms-training/trainingResult/user/list`,
               method: 'post',
               data: {...this.sort, ...data, employeeId: this.$store.state.user.userInfo.id},
               params: {...this.params,}
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
.sysParameter{
    margin-top:14px;
    
}
/deep/ .mainTable{
    height: 600px;

}
</style>
