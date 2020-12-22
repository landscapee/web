<template>
    <div>

         <router-view v-if="this.$route.path== '/dangerousDataAdd'" :key="$route.path"></router-view>
        <div v-else-if="this.$route.path== '/dangerousDataIndex'" :key="$route.path"  class="QCenterRight G_listOne">
            <div  >
                <div class="QHead">
                    危险数据
                </div>
                <div class="QheadRight">
                    <div @click="addOrEditOrInfo('add')"><icon iconClass="add" ></icon>新增</div>
                    <div @click="addOrEditOrInfo('edit')"><icon iconClass="edit" ></icon>编辑</div>
                    <div @click="delData()"><icon iconClass="remove" ></icon>删除</div>
                    <div @click="addOrEditOrInfo('info')"><icon iconClass="info" ></icon>详情</div>
                    <div @click="exportExcel"><icon iconClass="export" ></icon>
                        <!--<a ref="a" :href="`${this.$ip}/mms-qualification/download/dangerData`"></a>-->
                        导出
                    </div>
                    <div @click="upDocInfo('info')"><icon iconClass="upload" ></icon>危险数据上传</div>

                </div>
            </div>
            <div class="tableOneBox " ref="mainContent">
                <SearchTable ref="searchTable" :data="tableData" :tableConfig="tableConfig"  refTag="searchTable" @requestTable="requestTable(arguments[0])"   @listenToCheckedChange="listenToCheckedChange" @headerSort="headerSort" @handleSizeChange="handleSizeChange" @handleCurrentChange="handleCurrentChange"   :showHeader="false" :showPage="true" >
                    <el-table-column slot="radio" label="选择" :width="49" fixed="left">
                        <template slot-scope="{ row }">
                            <icon iconClass="sy" class="tab_radio" v-if="row.selected"></icon>
                            <icon  iconClass="ky" class="tab_radio" v-else></icon>
                        </template>
                    </el-table-column>
                    <template  v-slot:radio1="{opt}" >
                        <template  >
                            11   {{opt.name}}
                        </template>
                    </template>
                    <template  v-slot:radio2="{opt}" >
                        <template  >
                            22   {{opt.name}}
                        </template>
                    </template>


                </SearchTable>
            </div>
        </div>
        <UpDocInfo ref="UpDocInfo" @getTableData="getList1"></UpDocInfo>

    </div>
</template>
<script>
    import UpDocInfo from '../components/uploadDocInfo'

    import SearchTable from '@/ui/components/SearchTable/index';
import Icon from '@components/Icon-svg/index';
import { dangerousConfig } from './tableConfig.js';
import request from '@lib/axios.js';
import {  extend,map } from 'lodash';
export default {
    components: {
        Icon,
        UpDocInfo,
        SearchTable
	},
    name: '',
    data() {
        return {
            tableData:{records:[]},
            tableConfig:dangerousConfig({}),
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
       this.getList();
       request({
           url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
           method: 'post',
           params:{delete:false},
           data:["commentResults", "controlState",]
       }).then(d => {
           let obj=d.data
           this.tableConfig=dangerousConfig(obj)
       });
    },
    mounted(){
        if( this.$refs.mainContent){
            this.$refs.mainContent.addEventListener('scroll', this.handleScroll,true);//监听函数
        }
    },

    methods: {
        handleScroll($event){
            // 获取滚动条的dom
            var bady = $event.target;
            // 获取距离顶部的距离
            var scrollTop = bady.scrollTop;
            // 获取可视区的高度
            var windowHeight = bady.clientHeight;
            // 获取滚动条的总高度
            var scrollHeight = bady.scrollHeight;
            //获取滚动元素标识
            var tag = bady.parentElement.__vue__.$parent.refTag;
            console.log(scrollTop + windowHeight,scrollHeight);
            if(scrollTop+windowHeight>=scrollHeight){


            }
        },

        getList1(){
            this.row={}
            this.selectId=null
            this.form={}
            this.getList()
        },
        upDocInfo(){
            this.$refs.UpDocInfo.open({api:'mms-qualification/dangerData/uploadExcel',title:'危险数据上传'})
        },
        exportExcel(){
            request({
                headers: {
                    'Content-Type': 'application/vnd.ms-excel',
                },
                 url: `${this.$ip}/mms-qualification/download/dangerData`,
                method: 'get',
                responseType: 'blob',
             }).then((d)=>{
                const content = d
                const blob = new Blob([content],{type:'application/vnd.ms-excel'})
                const fileName = '危险数据'
                if ('download' in document.createElement('a')) { // 非IE下载
                    const elink = document.createElement('a')
                    elink.download = fileName
                    elink.style.display = 'none'
                    elink.href = URL.createObjectURL(blob)
                    document.body.appendChild(elink)
                    elink.click()
                    URL.revokeObjectURL(elink.href) // 释放URL 对象
                    document.body.removeChild(elink)
                }
            })
        },
        requestTable(searchData){
            this.form = searchData;
            this.selectId=null,
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
                this.selectId = row.id;
            }else {
                this.selectId   = null;
            }
            this.row = row;
            this.params.current = 1;
            this.$set(this.tableData.records,row.index,row);
        },
        addOrEditOrInfo(tag){
            console.log(this.$route.path);
            let data=JSON.stringify(this.row)
            if(tag=='add'){
                this.$router.push({path:'/dangerousDataAdd',query:{type:'add'}});
            }else if(tag == 'edit' || tag == 'info'){
                if(this.selectId==null){
                    this.$message.error('请先选中一行数据');
                }else{
                     this.$router.push({path:'/dangerousDataAdd',query:{type:tag,id:this.row.id}});
                }
            }
        },
        delData(){
            if(this.selectId==null){
                this.$message.error('请先选中一行数据');
            }else{
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                })
                    .then(() => {
                        request({
                            // url:`http://173.100.1.126:3000/mock/639/dangerData/delete`,
                            url:`${this.$ip}/mms-qualification/dangerData/delete/${this.selectId}`,
                            method: 'delete',
                         })
                            .then((data) => {
                               if(data.code==200){
                                   this.getList();
                                   this.selectId   = null;
                                   this.$message({type: 'success',message: '删除成功'});
                               }
                            })
                    })
                    .catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });            }

        },
        getList(){
            map(this.form,((k,l)=>{
                console.log(k, l);
                if(!k){
                    this.form[l]=null
                }
            }))
           request({
                url:`${this.$ip}/mms-qualification/dangerData/list`,
                method: 'post',
                data:{...this.sort,...this.form},
               params:{...this.params,}

           })
            .then((data) => {
                // this.tableData = extend({}, this.tableData, data.data);
                 this.tableData = extend({},{...data.data});
                console.log(this.tableData);
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
.coursewareMaintain{
    margin-top:14px;
    /deep/ .mainTable{
        height:calc(100vh - 370px);
    }
}

</style>
