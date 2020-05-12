<template>
<div id="layer_search"> 
    <el-dialog :visible.sync="nodeDialogShow" height="400px" class="nodeDialog searchDialog" :show-close="false" center width="770px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">高级查询</div>
            <div class="blankDiv flexSC">
                <el-button round size="mini" icon="el-icon-plus" @click="addNode">增加条件</el-button>
                <i class="el-icon-circle-close" @click="milepostNodeShow = false" style="font-size:.24rem;margin-left:.1rem"></i>
            </div>
        </template>


        <el-table class="dialogTable" :data="gridData" row-class-name="layerTableRow" cell-class-name="layerTableCol" header-row-class-name="layerTableHeadRow" header-cell-class-name="layerTableHeadCol" :show-header="false">
            <el-table-column>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.value1" placeholder="请选择">
                        <el-option v-for="(list,index) in options1" :key="index" :label="list.name" :value="list.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.symbol" placeholder="请选择">
                        <el-option v-for="(list,index) in options2" :key="index" :label="list.name" :value="list.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                     <el-date-picker v-model="scope.row.time" type="date" placeholder="选择日期"></el-date-picker>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.judge" placeholder="请选择">
                        <el-option v-for="(list,index) in options3" :key="index" :label="list.name" :value="list.value"></el-option>
                    </el-select>
                </template>
            </el-table-column>
            <el-table-column>
                <template slot-scope="scope">
                    <el-select v-model="scope.row.sort" placeholder="请选择">
                            <el-option v-for="(list,index) in options4" :key="index" :label="list.name" :value="list.value"></el-option>
                        </el-select>
                </template>
            </el-table-column>
            <el-table-column width="40">
                <template slot-scope="scope">
                    <i class="el-icon-delete" @click="delList(scope)"></i>
                </template>
            </el-table-column>
        </el-table>
        <div slot="footer" class="dialog-footer">
            <el-button @click="resetNode">重置</el-button>
            <el-button @click="save">保存查询条件</el-button>
            <el-button type="primary" icon="el-icon-search" @click="search">查 询</el-button>

        </div>
    </el-dialog>
</div>
</template>
<script>
export default{
	data(){
		return {
            nodeDialogShow:false,
            gridData:[
                {value1:null,symbol:0,judge:0,sort:0,time:null},
            ],
            options1:[
                {name:'node1',value:'node1'},
                {name:'node2',value:'node2'},
                {name:'node3',value:'node3'},
                {name:'node4',value:'node4'},
            ],
            options2:[
                {name:'等于',value:0},
                {name:'大于',value:1},
                {name:'小于',value:2},
                {name:'包含',value:3},
            ],
            options3:[
                {name:'AND',value:0},
                {name:'OR',value:1},
            ],
            options4:[
                {name:'升序',value:0},
                {name:'降序',value:1},
            ]
		}
	},
	mounted () {
        

	},
	methods:{
        delList(scope){
           this.gridData.splice(scope.$index,1); 
        },
        addNode(){
            this.gridData.push({value1:null,symbol:0,judge:0,sort:0,time:null})
        },
        resetNode(){
            this.gridData=[
                {value1:null,symbol:0,judge:0,sort:0,time:null},
            ]
        },
        save(){

        },
        search(){
            
            console.log(this.gridData)
        }
	}
}
</script>

<style lang="scss" scoped>
.searchDialog{
    .blankDiv{width: 200px;
         i{color: #fff;cursor: pointer;}
    }
    
}
</style>
<style lang="scss">
.searchDialog{
    tr{height: 50px;
        td{border:none;}
    }
    
}

</style>
