<template>
    <div class="three">
         <div class="threeBan">
            <div class="threeBanFirst  " @contextmenu.prevent.stop="openMainMenuFn($event,null)">

                <el-tree
                        :highlight-current="true"
                        node-key="id"
                        class="filter-tree"
                        :data="dataTree"
                        :props="defaultProps"
                        default-expand-all
                        :filter-node-method="filterNode"
                        ref="tree">
                    <div class="custom-tree-node" slot-scope="{ node, data,$index,index}">
                        <div @click.prevent.stop="editItem(data,node)" @contextmenu.prevent.stop="openMainMenuFn($event,data)" style="width:100%">
                            {{ node.label }}
                            <i v-if="data.children&&data.children.length" class="el-icon-caret-bottom"></i>
                        </div>
                    </div>
                </el-tree>
            </div>
            <div class="threeBanSecond G_form">
                <el-form ref="form" label-position="left" :model="formItem" :rules="rules"  :inline="true"  >

                    <div class="row_one widthOne1">
                        <el-form-item  label="项次编号：" prop="number">
                            <el-input   v-model="formItem.number" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="工作大项名称：" prop="name">
                            <el-input   v-model="formItem.name" placeholder="请输入中文 "></el-input>

                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="courseCode1">
                            <el-checkbox v-model="formItem.addLogo" :label="true">添加标识：</el-checkbox>
                            <el-checkbox :disabled="!formItem.addLogo" v-model="formItem.notApplicable" :label="true">N/A</el-checkbox>
                            <el-checkbox :disabled="!formItem.notApplicable" v-model="formItem.notApplicableImport" :label="true">导出显示</el-checkbox>
                            <i></i>
                            <el-checkbox :disabled="!formItem.addLogo" v-model="formItem.cycle" :label="true">○</el-checkbox>
                            <el-checkbox :disabled="!formItem.cycle" v-model="formItem.cycleImport" :label="true">导出显示○</el-checkbox>
                            <i></i>
                            <el-checkbox :disabled="!formItem.addLogo" v-model="formItem.hook" :label="true"> ✔</el-checkbox>
                            <el-checkbox :disabled="!formItem.hook" v-model="formItem.hookImport" :label="true">导出显示✔</el-checkbox>
                            <i></i>
                        </el-form-item>
                    </div>
                    <div class="row_one">
                    <el-form-item  label="" prop="noSignTime">
                        <el-checkbox   v-model="formItem.noSignTime"  :label="true">不显示签署时间</el-checkbox>

                    </el-form-item>
                </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="hsSchedule">
                            <!--航司附件项-->
                            <el-checkbox    v-model="formItem.hsSchedule"  :label="true">非航司附加表 航司附件项</el-checkbox>
                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="" prop="noSmallItem">
                            <el-checkbox @change="noSmallItemC"  v-model="formItem.noSmallItem"  :label="true">无工作小项</el-checkbox>
                        </el-form-item>
                    </div>

                    <div class="row_one widthOne" v-if="formItem.noSmallItem">
                        <el-form-item  label="角色权限控制：" prop="role">
                            <el-select    multiple=""  v-model="formItem.role" placeholder="请选择角色权限控制">
                                <el-option v-for="(opt,index) in options.roleControl" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                            </el-select>
                        </el-form-item>
                    </div>
                    <div class="row_one widthOne" v-if="formItem.noSmallItem">
                        <div v-for="(item,index) in Limmit" :key="index">
                            <el-form-item  label="适用范围类型：" prop="type">
                                <el-select  @change="limmitTypeC(index)" v-model="item.type" placeholder="请选择适用范围类型">
                                    <el-option v-for="(opt,index) in options.applyRangeType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                </el-select>
                                <el-select multiple filterable v-if="item.type=='适用机型范围'"  v-model="item.values" placeholder="请选择机型">
                                    <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.name" :value="opt.name"> </el-option>
                                </el-select>
                                <el-select v-else multiple  v-model="item.values" placeholder="请选择发动机">
                                    <el-option v-for="(opt,index) in options.EngineNo" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                </el-select>
                                <el-button v-if="Limmit.length>1" class="QoptionButton" @click="delLimmit(index)"><i class="el-icon-delete"></i> </el-button>

                            </el-form-item>
                        </div>
                        <div style="text-align: right ;margin-right: 40px" >
                            <el-button class="QoptionButton" @click="addLimmit"><i class="el-icon-circle-plus-outline"></i>添加适用范围</el-button>
                        </div>
                    </div>
                </el-form>


            </div>
        </div>
        <ul v-show="visible" :style="{left:styleObj.left+'px',top:styleObj.top+'px'}" class="contextmenu">
            <li ref="addLi" v-if="showFileItem.add" >
                新增
                <i class="el-icon-caret-right"></i>
                <ul>
                    <li @click ='addBigItem' v-if="showFileItem.bigItem">工作大项</li>
                    <li @click ='addChildItem' v-if="showFileItem.ChildItem">工作小项</li>
                    <li @click ='addChildContent' v-if="showFileItem.content">工作内容</li>
                    <li @click ="addInstrction('beforeWarning')" v-if="showFileItem.instructionA&&!Instruction.beforeWarning"> 事前警告</li>
                    <li @click ="addInstrction('afterExplain')"  v-if="showFileItem.instructionB&&!Instruction.afterExplain">事后说明</li>
                    <li @click ="addInstrction('afterSchedule')"  v-if="showFileItem.AfterTable&&!Instruction.afterSchedule">事后附表</li>
                </ul>

            </li>
            <li @click ='delData' v-if="showFileItem.del">删除</li>

        </ul>

    </div>
</template>

<script>
    import {  extend ,map} from 'lodash';

    import request from '@lib/axios.js';
    export default {
        name: "three",
        props:{
            type:String,
        },
        components: { },
        data() {
            return {
                Limmit:[{type:'',values:[]}],
                formItem:{addLogo:true,noSmallItem:true,noSignTime:true,},
                filterText:'',
                dataTreeObj:{},
                dataTree:[],
                Instruction:{},
                dataItem:[],
                dataItemObj:{},
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                options:{},
                AircraftTypeObj:{},
                AircraftType:[],
                addItemObj:null,
                showFileItem:{},
                visible:false,
                styleObj:{left:1,top:1},
                rules:{},
                formItemNum:0,
            }
        },
        computed:{
            dataTreeUp (){
                 return {
                     a:this.dataItem ,
                     a1: this.Instruction,
                 }
            },

        },
        watch: {

            filterText(val) {
                this.$refs.tree.filter(val);
            },
            visible(value) {
                 if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                     document.body.removeEventListener('click', this.closeMenu)
                }
            },
            formItem: {
                handler(n){
                   this.formItemNum++
                    console.log(this.formItemNum,'this.formItemNum');
                },
                deep:true,
            },
            dataTreeUp(){
                 let arr= this.dataItem
                 map(this.Instruction,(k,l)=>{
                    let obj={val:k,name:'',realId:k.id,id:l+Math.random()}
                    if(l=='beforeWarning'){
                        obj.name='事前警告'
                        arr.unshift(obj)
                    }else if(l=='afterExplain'){
                        obj.name='事后说明'
                        arr.push(obj)
                    }else if(l=='afterSchedule'){
                        obj.name='事后附表'
                        arr.push(obj)
                    }

                })
                 this.dataTree=arr
            },

        },
        methods: {


            noSmallItemC(val){
                if(val){
                    this.Limmit=[{type:'',values:[]}]
                }else{
                    if(this.formItem.role){
                        this.formItem.role=null
                    }
                    this.Limmit=[]
                }
            },
            limmitTypeC(index){
                this.Limmit[index].values=[]
            },
            delLimmit(index){
              this.Limmit.splice(index,1)
            },
            addLimmit(){
              this.Limmit.push({type:'',values:[]})
            },
            filterNode(value, data) {
                if (!value) return true;
                return data.name.indexOf(value) !== -1;
            },

            addBigItem(){
               this.addItem()
            },
            addChildItem(){
                this.addItem()
            },
            addInstrction(key){
                let obj={name:'',
                    templateBaseId:this.$route.query.id,
                    contentId:this.addItemObj&&this.addItemObj.id,
                }
                if(key=='beforeWarning'){
                    obj.name='事前警告'
                    this.dataTree.unshift(obj)
                }else if(key=='afterExplain'){
                    obj.name='事后说明'
                    this.dataTree.push(obj)
                }else if(key=='afterSchedule'){
                    obj.name='事后附表'
                    this.dataTree.push(obj)
                }
                this.formItemNum++

                //  let obj={templateBaseId:this.$route.query.id}
                // obj[key]=' '
                // request({
                //     url:`${this.$ip}/mms-workorder/templateRemark/save`,
                //     method: 'post',
                //     data:obj
                // }).then((d)=>{
                //     this.getInstruction()
                // })
            },
            addChildContent(){
                let obj={name:`内容${this.addItemObj.children.length}`,
                    templateBaseId:this.$route.query.id,
                    contentId:this.addItemObj&&this.addItemObj.id,

                }
                this.dataItem.push(obj)
                this.formItemNum++
                //  request({
                //     url:`${this.$ip}/mms-workorder/contentDetail/save`,
                //     method: 'post',
                //     data:{
                //         contentId:this.addItemObj&&this.addItemObj.id,
                //         content:null,
                //                             templateBaseId:this.$route.query.id,

                //     },
                // }).then((d) => {
                //     if(d.code==200){
                //         this.getItem()
                //     }
                // })
            },
            addItem( ){
                // console.log(this.addItemObj && this.addItemObj.id);
                let name=`项次${this.dataTree.length+1}【工作大项】`
                if(this.addItemObj.itemType!=1){
                    name=`项次${this.dataTree.children.length}【工作小项】`
                }
                let obj={
                    parentId:this.addItemObj&&this.addItemObj.id||null,
                    name:name,
                    templateBaseId:this.$route.query.id,
                }
                this.dataTree.push(obj)
                this.formItemNum++

                // request({
                //     url:`${this.$ip}/mms-workorder/templateContent/save`,
                //     method: 'post',
                //     data:{
                //         parentId:this.addItemObj&&this.addItemObj.id,
                //         name:`项次${this.dataItem.length+1}${this.addItemObj?'【工作小项】':'【工作大项】'}`,
                //                             templateBaseId:this.$route.query.id,

                //         noSignTime:true,
                //         noSmallItem:true,
                //     },
                // }).then((d) => {
                //     if(d.code==200){
                //         this.getItem(3)
                //     }
                // })
            },

            getInstruction(){
                request({
                    url:`${this.$ip}/mms-workorder/templateRemark/selectByTemplateId/${this.$route.query.id}`,
                    method: 'get',
                }).then((d) => {
                    if(d.code==200){
                        this.Instruction=d.data
                    }
                })
            },
            editItem(data,node,index,index1){
                console.log( this.formItemNum,data, node,index,index1);
                this.switchPrompt().then((d)=>{
                    if(d==1){
                        this.save('form').then(()=>{
                            this.formItem={...data}
                             this.$nextTick(()=>{
                                this.formItemNum=0
                            })
                        })
                    }else{
                        this.formItem={...data}
                        this.$nextTick(()=>{
                            this.formItemNum=0
                        })
                    }

                })
                 this.visible = false
            },
            openMainMenuFnOption(e,obj){

                this.addItemObj=obj
                const left = e.clientX// - offsetLeft // 15: margin right
                this.styleObj.left = left
                this.styleObj.top = e.clientY// - 60 // fix 位置bug
                this.showFileItem = {
                    add: !obj||obj.itemType==1||obj.itemType==3,
                    del: obj,
                    content: obj&&(obj.itemType==1||obj.itemType==3)&&obj.noSmallItem,
                    bigItem: !obj,
                    ChildItem: obj&&obj.itemType==1&&!obj.noSmallItem,
                    instructionA:  !obj,
                    instructionB:  !obj,
                    AfterTable: !obj,
                };
                this.visible = true
            },
            openMainMenuFn(e,obj){
                console.log(obj);
                this.switchPrompt( ).then((d)=>{
                     if(d==1){
                        this.save('form').then(()=>{
                            this.openMainMenuFnOption(e,obj)
                        })
                    }else{
                        this.openMainMenuFnOption(e,obj)
                    }

                })
            },
            switchPrompt( ){
                return new Promise((resolve ,reject)=>{
                    if(this.formItemNum>0){
                        this.$confirm('是否保存之前编辑内容', '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning',
                        }).then(() => {
                            resolve(1)
                        }).catch(() => {
                            resolve(2)
                        });
                    }else{
                        resolve(2)
                    }
                })

            },
            closeMenu(el) {
                 if(el.path[0]!=this.$refs.addLi){
                     this.visible = false
                }
            },
            delData(){
                this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning',
                }).then(() => {
                      let type=this.addItemObj.itemType
                     let url=type==2||type==4?'/contentDetail/delete/':'/templateContent/delete/'
                         request({
                            url:`${this.$ip}/mms-workorder${url}${this.addItemObj.id}`,
                            method: 'delete',
                        }).then((d) => {
                            if(d.code==200){
                                this.getItem(1)
                                this.$message({type: 'success',message: '删除成功'});
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除',
                        });
                    });
            },
            trans(data){
                data.map((k,l)=>{

                    k.itemType=1   //大项
                    k.index=l  //大项
                    this.dataItemObj[k.id]={...k}
                    if(k.noSmallItem){
                        if(k.contentDetails){
                            k.children=k.contentDetails.map((o,p)=>{
                                let obj={
                                    ...o,
                                    paId:k.id,
                                    index:p,
                                    itemType:2,  //大项内容
                                    name:`工作内容${p+1}`
                                }
                                this.dataItemObj[k.id][o.id]={...obj}
                                return obj
                            })
                        }
                    }else{
                        if(k.children){
                            k.children.map((o,p)=>{

                                o.paId=k.id
                                o.itemType=3 //小项
                                o.ibdex=p //小项
                                this.dataItemObj[k.id][o.id]={...o}
                                if(o.contentDetails){
                                    o.children=k.contentDetails.map((o1,p1)=>{
                                        let obj1={
                                            ...o1,
                                            padId:o.id,
                                            index:p1,
                                            itemType:4,  //小项内容
                                            name:`工作内容${p1+1}`
                                        }
                                        this.dataItemObj[k.id][o.id][o1.id]={...obj1}
                                        return obj1
                                    })
                                }

                            })
                        }
                    }

                })
            },
            getItem(num){
                request({
                    url:`${this.$ip}/mms-workorder/templateContent/list/${this.$route.query.id}`,
                    method: 'get',
                }).then((d) => {
                    if(d.code==200){
                        let arr=d.data;
                        this.trans(arr);
                        this.dataItem=[...arr];
                          if(num==1){
                            this.formItem={...arr[0]}
                        }else if(num==3){
                            this.formItem={...arr[arr.length-1]}
                        }else{
                            if(this.formItem.paId){
                                if(this.formItem.papId){
                                    this.formItem= this.dataItemObj[this.formItem.paId][this.formItem.papId][this.formItem.id]
                                }else{
                                    this.formItem= this.dataItemObj[this.formItem.paId][this.formItem.id]
                                }
                            }else {
                                this.formItem= this.dataItemObj[this.formItem.id]
                            }
                        }
                        this.$nextTick(()=>{
                            this.formItemNum=0
                        })
                    }
                })
            },
            save (form,num){
                return new Promise((resolve, reject)=>{
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            request({
                                url:`${this.$ip}/mms-workorder/templateContent/update`,
                                method: 'post',
                                data:{
                                    ...this.formItem,
                                    // parentId:obj.id,
                                    templateBaseId:this.$route.query.id,
                                },
                            }).then((d) => {
                                if(d.code==200){
                                    resolve(true)
                                    this.getItem()
                                 }
                            })
                        }
                    });
                })
            },

        },
        created() {
            this.getItem(1)
            this.getInstruction()
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['roleControl','applyRangeType','EngineNo']
            }).then(d => {
                let obj=d.data
                this.options=obj
            });
            request({
                url:`${this.$ip}/config-client-mms/config/findConfigs?configName=AircraftType`,
                method: 'get',
            }).then(d => {
                if( d.data&&d.data.length){
                    this.AircraftType=d.data
                    d.data.map((k,l)=>{
                        this.AircraftTypeObj[k.id]=k
                    })
                }
            });
        },
    }
</script>

<style lang="scss" scoped>

    .threeBan{
        margin-top: 30px;

        display: flex;
        justify-content: left;
        height:calc(100vh - 400px);
        border: 1px black solid;
        .threeBanFirst{
            border-right: 1px black solid;
            height:calc(100vh - 402px);
            width: 320px;
            padding: 15px;
        }
        .threeBanSecond{
            padding: 15px;
            margin: 0;
            width: calc(100% - 320px);
            overflow-y: auto;
            /deep/ .el-form{
                height:auto;
                text-align: left;
                width: 100%;
                margin: 0;
                padding: 0px;
                .widthOne{

                    .el-select:first-child{
                        width: 260px;
                    }
                    .el-select:nth-child(2){
                        width: calc(100% - 306px);
                    }
                }
                .widthOne1{
                    .el-input:first-child{
                        width: 260px;
                    }
                }
                .row_one{
                    .el-form-item__label{
                        width: 120px;
                        text-align: left;
                        padding: 0;
                    }
                    .el-form-item__content{
                        width: calc(100% - 120px);
                    }
                }
            };
        }
    }
/deep/ .el-tree{
    height:calc(100vh - 430px)!important;
        overflow-y: auto;
    .el-tree-node__expand-icon{
        display: none;
    }

    .custom-tree-node{
        width:100%;
        height:30px;
        line-height: 30px;
    }
}
    .contextmenu{
        list-style:none;
        position: absolute;
        width:100px;
         background: #fff;
        border-radius: 4px;
        margin:0;
        padding:0;
        border: 1px solid #d9d9d9;
        z-index: 110;
        li{
            position: relative;
            list-style:none;
             width:100%;
            line-height: 40px;
             padding:3px;
            text-align: center;
            border-bottom:1px solid #d9d9d9;
            &:hover{
                background:#ccc;
                cursor:pointer;
                ul{
                    display: block;
                }
            }
            &:last-child{
                border:none;
            }
            i{
                position: absolute;
                right:5px;
                top:calc(50% - 7px)
            }
            ul{
                display: none;
                list-style:none;
                position: absolute;
                width:200px;
                 background: #fff;
                border-radius: 4px;
                margin:0;
                padding:0;
                border: 1px solid #d9d9d9;
                z-index: 110;
                left:99px;
                top:0;

            }
        }
    }

</style>