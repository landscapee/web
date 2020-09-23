<template>
    <div class="three">
         <div class="threeBan"  >
            <div class="threeBanFirst  " @contextmenu.prevent.stop="openMainMenuFn($event,null)">

                <el-tree
                        :highlight-current="true"
                        node-key="id"
                        class="filter-tree"
                        :data="dataTree"
                        :props="defaultProps"
                        default-expand-all
                         ref="tree">
                    <div class="custom-tree-node" slot-scope="{ node, data,$index,index}">
                        <div @click.prevent.stop="editItem(data,node)" @contextmenu.prevent.stop="openMainMenuFn($event,data)" style="width:100%" :class="formItem.id==data.id?'backColor':''">
                            {{ node.label }}
                            <!--<i v-if="data.children&&data.children.length" class="el-icon-caret-bottom"></i>-->
                        </div>
                    </div>
                </el-tree>
            </div>
            <div class="threeBanSecond  ">

                <el-form v-if="formItem&&(formItem.itemType==1||formItem.itemType==3)" ref="form" label-position="left" :model="formItem" :rules="rules"  :inline="true"  >
                    <div class="row_one widthOne1">
                        <el-form-item  label="项次编号：" prop="number">
                            <el-input   v-model="formItem.number" placeholder="请输入项次编号 "></el-input>
                        </el-form-item>
                    </div>
                    <div class="row_one" v-if="formItem.itemType==1">
                        <el-form-item  label="工作大项名称：" prop="name">
                            <el-input   v-model="formItem.name" placeholder="请输入工作大项名称 "></el-input>
                        </el-form-item>
                    </div>
                    <div class="row_one" v-if="formItem.itemType==3">
                        <el-form-item  label="工作小项名称：" prop="name">
                            <el-input   v-model="formItem.name" placeholder="请输入工作小项名称 "></el-input>
                        </el-form-item>
                    </div>
                    <div class="row_one">
                        <el-form-item  label="添加标识：" prop="courseCode1">
                            <!--<icon-svg iconClass="naUncheck" style="height:20px;width:30px"></icon-svg>-->

                            <el-checkbox @change="logoChange($event,'notApplicableImport')"  v-model="formItem.notApplicable" :label="true" style="margin-right: 10px">N/A </el-checkbox>
                            <el-checkbox :disabled="!formItem.notApplicable" v-model="formItem.notApplicableImport" :label="true"  >导出显示</el-checkbox>
                            <i style="border-left:1px #979797 solid;margin-right: 30px"></i>

                            <el-checkbox  @change="logoChange($event,'cycleImport')"   v-model="formItem.cycle" :label="true" style="margin-right: 10px">
                                <icon-svg iconClass="quanUncheck" style="height:20px;width:30px"></icon-svg>
                            </el-checkbox>
                            <el-checkbox :disabled="!formItem.cycle" v-model="formItem.cycleImport" :label="true"  >导出显示
                             </el-checkbox>
                            <i style="border-left:1px #979797 solid;margin-right: 30px"></i>

                            <el-checkbox  @change="logoChange($event,'hookImport')"   v-model="formItem.hook" :label="true" style="margin-right: 10px">
                                <icon-svg iconClass="gouUncheck" style="height:20px;width:30px"></icon-svg>

                            </el-checkbox>
                            <el-checkbox :disabled="!formItem.hook" v-model="formItem.hookImport" :label="true"  >导出显示
                             </el-checkbox>

                        </el-form-item>
                    </div>
                    <div class="row_one" v-if="formItem.itemType==1">
                        <el-form-item  label="" prop="noSmallItem">
                            <el-checkbox  @change="noSmallItemC"  v-model="formItem.noSmallItem"  :label="true" :disabled="formItem.contentDetails&&formItem.contentDetails.length" :title="formItem.contentDetails&&formItem.contentDetails.length?'删除内容后可操作':''">
                                无工作小项
                            </el-checkbox>
                        </el-form-item>
                    </div>
                     <div class="row_one" v-if="formItem.itemType==3&&(formOne.type=='QWSJGD'||formOne.type=='QWJJGD')">
                        <el-form-item  label="工序：" prop="">
                            <el-select      v-model="formItem.pickAirType" placeholder="请选择工序">
                                <el-option v-for="(opt,index) in options[formOne.type=='QWSJGD'?'W_sjType':'W_PickUpType']" :key="index" :label="opt.valData" :value="Number(opt.valSummary)"> </el-option>
                            </el-select>
                        </el-form-item>
                    </div>

                    <div class="row_one" v-if="formItem.noSmallItem">
                        <el-form-item  label="" prop="hsSchedule">
                            <el-checkbox    v-model="formItem.hsSchedule"  :label="true">非航司附加表  </el-checkbox>
                        </el-form-item>
                    </div>


                    </el-form>
                <el-form v-else-if="editTrue" ref="form" label-position="left" :model="formItem" :rules="rules"  :inline="true"  >
                   <div v-if="formItem.itemType==2||formItem.itemType==4">
                       <div class="row_two " v-if=" (formThree.contentLayout=='C3（三列）'||formThree.contentLayout=='C4（四列）')">
                           <el-form-item  label="" prop="c3WorkerTask">
                               <el-checkbox  @change="c3WorkerTaskC"  v-model="formItem[formThree.contentLayout=='C3（三列）'?'c3WorkerTask':'c4WorkerTask']"  :label="true">
                                   工作者必做任务
                               </el-checkbox>
                           </el-form-item>
                           <el-form-item  label="备注" prop="hsSchedule" style="width:300px">
                               <el-input    v-model="formItem[formThree.contentLayout=='C3（三列）'?'c3Remark':'c4WorkerRemark']"  :disabled="!formItem[formThree.contentLayout=='C3（三列）'?'c3WorkerTask':'c4WorkerTask']" ></el-input>
                           </el-form-item>
                       </div>
                       <div class="row_two " v-if="formThree.contentLayout=='C4（四列）'">
                           <el-form-item  label="" prop="hsSchedule">
                               <el-checkbox  @change="c4CommanderTask"   v-model="formItem.c4CommanderTask"  :label="true">指挥者必做任务  </el-checkbox>
                           </el-form-item>
                           <el-form-item  label="备注" prop="hsSchedule" style="width:300px">
                               <el-input   v-model="formItem.c4CommanderRemark" :disabled="!formItem.c4CommanderTask"></el-input>
                           </el-form-item>
                       </div>
                       <div class="row_one " >
                           <el-form-item  label="工作者权限控制：" prop="rolePermissions"  v-if=" (formThree.contentLayout=='C3（三列）'||formThree.contentLayout=='C4（四列）')">
                               <el-select    :disabled="formOne.type!='WXGD'"  multiple=""  v-model="formItem.rolePermissions" placeholder="请选择角色权限控制">
                                   <el-option  v-for="(opt,index) in options.roleControl" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                               </el-select>
                           </el-form-item>
                           <el-form-item  label="指挥者权限控制：" prop="commanderRolePermissions"  v-if="  formThree.contentLayout=='C4（四列）'">
                               <el-select   :disabled="formOne.type!='WXGD'"   multiple=""  v-model="formItem.commanderRolePermissions" placeholder="请选择角色权限控制">
                                   <el-option v-for="(opt,index) in options.roleControl" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                               </el-select>
                           </el-form-item>
                       </div>
                       <div class="row_one " >
                           <div v-for="(item,index) in formItem.suitableRange" :key="index">
                               <el-form-item  label="适用范围类型：" prop="type">
                                   <el-select    @change="limmitTypeC(index)" v-model="item.type" placeholder="请选择适用范围类型">
                                       <el-option v-for="(opt,index) in options.applyRangeType" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                   </el-select>
                                   <el-select    multiple filterable v-if="item.type=='适用机型范围'"  v-model="item.values" placeholder="请选择机型">
                                       <el-option v-for="(opt,index) in AircraftType" :key="index" :label="opt.name" :value="opt.name"> </el-option>
                                   </el-select>
                                   <el-select    v-else multiple  v-model="item.values" placeholder="请选择发动机">
                                       <el-option v-for="(opt,index) in options.EngineNo" :key="index" :label="opt.valData" :value="opt.valData"> </el-option>
                                   </el-select>
                                   <el-button  type="primary" @click="addLimmit"><i class="el-icon-circle-plus-outline"></i>添加</el-button>
                                   <el-button v-if="formItem.suitableRange.length>1"  @click="delLimmit(index)"><i class="el-icon-delete"></i>删除 </el-button>

                               </el-form-item>
                           </div>

                       </div>

                       <div class="row_one">
                           <el-form-item  label="" prop="c3WorkerTask"   v-if=" (formThree.contentLayout=='C3（三列）'||formThree.contentLayout=='C4（四列）')">
                               <el-checkbox    v-model="formItem.workerLabel"  :label="true" :disabled="formItem[formThree.contentLayout=='C3（三列）'?'c3WorkerTask':'c4WorkerTask']">
                                   适用工作者标签
                               </el-checkbox>
                           </el-form-item>
                       </div>
                       <div class="row_one">
                           <el-form-item  label="" prop="hsSchedule"   v-if=" formThree.contentLayout=='C4（四列）'">
                               <el-checkbox    v-model="formItem.commanderLabel"  :label="true" :disabled="formItem.c4CommanderTask">适用指挥者标签  </el-checkbox>
                           </el-form-item>
                       </div>
                   </div>
                    <order-editor
                            id="editor_id" height="400px" width="100%"
                            :content.sync="formItem[key]"
                            :loadStyleMode="false"
                            @on-content-change="onContentChange"
                    ></order-editor>

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
    import orderEditor from '@components/orderEditor/index.vue';
    import request from '@lib/axios.js';
    export default {
        name: "three",
        props:{
            type:String,
            formOne:Object,
         },
        components: {orderEditor },
        data() {
            return {
                  formThree:{},
                 formItem:{addLogo:true,noSmallItem:true,noSignTime:true,},
                 dataTree:[],
                dataTreeY:[],
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
                idEditor:0,
            }
        },
        computed:{
             key(){
                 let key

                 if(this.formItem.itemType==2||this.formItem.itemType==4){
                     key='content'
                 }else{
                     if(this.formItem.itemType==5){
                         key='beforeWarning'
                     }else  if(this.formItem.itemType==6){
                         key='afterExplain'
                     }else  if(this.formItem.itemType==7){
                         key='afterSchedule'
                     }
                 }
                 return key
             },
            editTrue(){
                 if( this.formItem.itemType==2||this.formItem.itemType==4||this.formItem.itemType==5||this.formItem.itemType==6||this.formItem.itemType==7){
                    return true
                }
                return false
            },
            // logoChange(){
            //      return this.formItem.notApplicable+this.formItem.cycle+this.formItem.notApplicable
            // }

        },
        watch: {

            visible(value) {
                 if (value) {
                    document.body.addEventListener('click', this.closeMenu)
                } else {
                     document.body.removeEventListener('click', this.closeMenu)
                }
            },
            formItem: {
                handler(n){
                   this.idEditor++
                    console.log(this.idEditor,'this.idEditor');
                },
                deep:true,
            },

        },
        methods: {
            c4CommanderTask(val){
                this.$set(this.formItem,'commanderLabel',val)
                if(!val){
                    this.$set(this.formItem,'c4CommanderRemark','')
                }

            },
            c3WorkerTaskC(val){
                this.$set(this.formItem,'workerLabel',val)
                if(!val){
                    this.$set(this.formItem,formThree.contentLayout=='C3（三列）'?'c3Remark':'c4WorkerRemark','')
                }
            },
            logoChange(val,key){
                console.log(val, key);
                if(!val){
                    this.$set(this.formItem,key,false)
                }else{

                    if(key=='notApplicableImport'){
                        this.$set(this.formItem,'cycle',false)
                        this.$set(this.formItem,'cycleImport',false)

                    }else if(key=='cycleImport'){
                        this.$set(this.formItem,'notApplicable',false)
                        this.$set(this.formItem,'notApplicableImport',false)

                    }
                }
            },
            onContentChange (val) {


            },
            noSmallItemC(val){
                if(val){
                    // this.formItem.suitableRange=[{type:'',values:[]}]
                }else{
                    //     this.formItem.rolePermissions=[]

                    // this.formItem.suitableRange=[]
                }
            },
            limmitTypeC(index){
                this.formItem.suitableRange[index].values=[]
            },
            delLimmit(index){
              this.formItem.suitableRange.splice(index,1)
            },
            addLimmit(){
              this.formItem.suitableRange.push({type:'',values:[]})
            },
            addBigItem(){
               this.addItem()
            },
            addChildItem(){
                this.addItem(1)
            },
            addInstrction(key){
                let obj={name:'',
                    templateBaseId:this.$route.query.id,
                    contentId:this.addItemObj&&this.addItemObj.id,
                    itemType:'',
                    id:this.Instruction.id||null
                }
                 if(key=='beforeWarning'){
                    obj.name='事前警告'
                    obj.itemType=5
                    this.dataTree.unshift(obj)
                }else if(key=='afterExplain'){
                    obj.itemType=6
                    obj.name='事后说明'
                    this.dataTree.push(obj)
                }else if(key=='afterSchedule'){
                    obj.itemType=7
                    obj.name='事后附表'
                    this.dataTree.push(obj)
                }
                this.formItem={...obj}
             },
            addChildContent(){
                let num=0
                if(this.addItemObj.paId){
                   num=1
                }
                  let obj={
                    name:` 工作内容${this.addItemObj.children.length+1}`,
                    serialNumber:this.addItemObj.serialNumber,
                    itemType:num==0?2:4,
                    paId:num==0?this.addItemObj.id:num==1?this.addItemObj.paId:null,
                    papId:num==1?this.addItemObj.id:null,
                    templateBaseId:this.$route.query.id,
                    contentId:this.addItemObj&&this.addItemObj.id,
                    rolePermissions:[],
                      workerLabel :true,
                      commanderLabel:true,
                    commanderRolePermissions:[],
                    suitableRange: [{type:'',values:[]}],
                    noSignTime:true,
                }
                this.formItem={...obj}
                this.addItemObj.children.push(obj)

             },
            addItem( num){
                 let name=`${this.dataItem.length+1}【工作大项】`
                if(num==1){
                    name=`${this.addItemObj.number}.${this.addItemObj.children.length+1}【工作小项】`
                }
                let obj={
                    parentId:this.addItemObj&&this.addItemObj.id||null,
                    name:name,
                    paId:num==1?this.addItemObj.id:null,
                    itemType:num==1?3:1,
                    noSmallItem:true,
                    templateBaseId:this.$route.query.id,
                }
                this.formItem={...obj}
                if(num==1){
                    this.addItemObj.children.push(obj)
                }else{
                    this.dataTree.push(obj)
                }
                // this.idEditor++
            },


            editItem(data,node,index,index1){
                 if(data.id){
                    this.switchPrompt().then((d)=>{
                        if(d==1){
                            this.dataTree=  this.tranDataY(this.dataTreeY)
                            this.formItem={...data}
                            this.$nextTick(()=>{
                                this.idEditor=0
                            })
                        }else if(d==3){
                            this.formItem={...data}
                            this.$nextTick(()=>{
                                this.idEditor=0
                            })
                        }

                    })
                }
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
                 this.switchPrompt( ).then((d)=>{
                    if(d==1){
                        this.dataTree=  this.tranDataY(this.dataTreeY)
                        this.openMainMenuFnOption(e,obj)
                        this.$nextTick(()=>{
                            this.idEditor=0
                        })
                    }else if(d==2){
                        this.visible = false
                    }else{
                        this.openMainMenuFnOption(e,obj)
                    }

                })
            },
            switchPrompt(){
                return new Promise((resolve ,reject)=>{
                    if(this.idEditor>0){
                        this.$confirm(`有${this.formItem.id?'修改':'新增'}未保存，是否离开？`, '提示', {
                            confirmButtonText: '是',
                            cancelButtonText: '否',
                            type: 'warning',
                        }).then(() => {
                            resolve(1)
                        }).catch(() => {
                            resolve(2)
                        });
                    }else{
                        resolve(3)
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
                     let url=type==2||type==4?'/contentDetail/delete/'+this.addItemObj.id:'/templateContent/delete/'+this.addItemObj.id
                   let obj={...this.Instruction}
                    if(type>4){
                        url='/templateRemark/update'
                        if(type==5){
                            delete obj.beforeWarning
                        }else if(type==6){
                            delete obj.afterExplain
                        }else if(type==7){
                            delete obj.afterSchedule
                        }
                    }
                          request({
                            url:`${this.$ip}/mms-workorder${url}`,
                            method: type>4?'post':'delete',
                              data:type>4?obj:null
                        }).then((d) => {
                            if(d.code==200){
                                if(type>4){
                                    this.getInstruction(1)
                                }else{
                                    this.getItem(1)
                                }
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
                    k.itemType=1
                    this.dataItemObj[k.id]={...k}
                    // k.rolePermissions=k.rolePermissions?k.rolePermissions.split(';'):[]
                    // k.suitableRange=k.suitableRange&&k.suitableRange.length?k.suitableRange:[{type:'',values:[]}] //小项

                    if(k.noSmallItem){
                        if(k.contentDetails){
                            k.children=k.contentDetails.map((o,p)=>{
                                 let obj={
                                    ...o,
                                    paId:k.id,
                                     rolePermissions:o.rolePermissions?o.rolePermissions.split(';'):[],
                                     commanderRolePermissions:o.commanderRolePermissions?o.commanderRolePermissions.split(';'):[],
                                suitableRange:o.suitableRange&&o.suitableRange.length?o.suitableRange:[{type:'',values:[]}] ,
                                serialNumber:k.serialNumber,
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
                                // o.rolePermissions=o.rolePermissions?o.rolePermissions.split(';'):[]
                                // o.suitableRange=o.suitableRange&&o.suitableRange.length?o.suitableRange:[{type:'',values:[]}] //小项
                                this.dataItemObj[k.id][o.id]={...o}
                                 if(o.contentDetails){
                                    o.children=o.contentDetails.map((o1,p1)=>{
                                        let obj1={
                                            ...o1,
                                            paId:k.id,
                                            papId:o.id,
                                            rolePermissions:o1.rolePermissions?o1.rolePermissions.split(';'):[],
                                            commanderRolePermissions:o1.commanderRolePermissions?o1.commanderRolePermissions.split(';'):[],
                                            suitableRange:o1.suitableRange&&o1.suitableRange.length?o1.suitableRange:[{type:'',values:[]}] ,
                                            serialNumber:o.serialNumber,
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
            positionItem(num){
                let obj={}
                   if(num==1){
                       obj={...this.dataTree[0]}
                }else{
                     if(this.formItem.paId){
                        if(this.formItem.papId){
                            obj=this.dataItemObj[this.formItem.paId][this.formItem.papId][this.formItem.id]
                        }else{
                            obj=this.dataItemObj[this.formItem.paId][this.formItem.id]
                        }
                    }else {
                         obj=this.dataItemObj[this.formItem.id]
                    }
                }

                if((obj.itemType==2||obj.itemType==4)&&obj.suitableRange&&!obj.suitableRange.length){
                    obj.suitableRange=[{type:'适用机型范围',values:[]}]
                }
                this.formItem={...obj}
                this.$nextTick(()=>{
                    this.idEditor=0
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
                        this.dataTreeY=this.tranDataY(arr)

                        this.dataTreeUp()
                        this.positionItem(num)
                    }
                })
            },
            getInstruction(num){
                request({
                    url:`${this.$ip}/mms-workorder/templateRemark/selectByTemplateId/${this.$route.query.id}`,
                    method: 'get',
                }).then((d) => {
                    if(d.code==200){
                        this.Instruction={...d.data}
                        this.dataTreeUp()
                        let obj={}
                       if(this.formItem.itemType==5||num==1){
                           obj= this.dataTree[0]
                       }else{
                            this.dataTree.map((k,l)=>{
                                if(k.itemType==this.formItem.itemType){
                                   obj=this.dataTree[l]
                               }
                           })
                       }
                        this.formItem={...obj}
                        this.$nextTick(()=>{
                            this.idEditor=0
                        })
                    }
                })
            },
            dataTreeUp(){
                let arr= [...this.dataItem]
                map(this.Instruction,(k,l)=>{
                    let obj={val:k,name:'',
                        itemType:'',
                        realId:this.Instruction.id,
                        id:l+Math.random()
                    }
                    if(l=='beforeWarning'){
                        obj.name='事前警告'
                        obj.itemType=5
                        obj.beforeWarning=k
                        arr.unshift(obj)
                    }else if(l=='afterExplain'){
                        obj.name='事后说明'
                        obj.itemType=6
                        obj.afterExplain=k
                        arr.push(obj)
                    }else if(l=='afterSchedule'){
                        obj.name='事后附表'
                        obj.itemType=7
                        obj.afterSchedule=k
                        arr.push(obj)
                    }
                })
                this.dataTree=[...arr]

                 this.dataTreeY=this.tranDataY(arr)
             },
            tranDataY(arr){
               return arr.map((k,l)=>{
                    let obj={...k}
                    if(k.children){
                        obj.children=  k.children.map((o,p)=>{
                            let obj1={...o}
                            if(o.children){
                                obj1.children=  o.children.map((q,w)=>{
                                     let obj2={...q}
                                    return obj2
                                })
                            }
                            return obj1
                        })
                    }
                    return obj
                })
            },
            save (form,num){
                return new Promise((resolve, reject)=>{
                    this.$refs[form].validate(valid => {
                        if (valid) {
                             let url ='';
                            let urlL=this.formItem.id?'update':'save'
                            let type=this.formItem.itemType;
                            if(type==1||type==3){
                                url=`templateContent/${urlL}`
                            }else if(type==2||type==4){
                                url=`contentDetail/${urlL}`
                            }else if(type==5||type==6||type==7){
                                url=`templateRemark/${urlL}`
                            }
                            let obj={...this.formItem}
                            if(this.formItem.itemType>4){
                                obj={
                                    beforeWarning:this.Instruction.beforeWarning||null,
                                    afterExplain:this.Instruction.afterExplain||null,
                                    afterSchedule:this.Instruction.afterSchedule||null,
                                     ...obj,
                                    id:this.Instruction.id
                                }
                                obj[this.key]=obj[this.key].replace(/\$\$\$/g,'$'+this.key)
                            } else{
                                  if(this.formItem.itemType==2||this.formItem.itemType==4){
                                      obj.rolePermissions=obj.rolePermissions.join(';')
                                      obj.commanderRolePermissions=obj.commanderRolePermissions.join(';')
                                      if( obj[this.key]){
                                          obj[this.key]=obj[this.key].replace(/\$\$\$/g,this.formItem.serialNumber+'_')
                                      }
                                }
                            }
                            request({
                                url:`${this.$ip}/mms-workorder/${url}`,
                                method: 'post',
                                data:{
                                    ...obj,
                                    templateBaseId:this.$route.query.id,
                                },
                            }).then((d) => {
                                if(d.code==200){
                                    resolve(true)
                                    if(this.formItem.itemType<=4){
                                        if(!this.formItem.id){
                                            this.$set(this.formItem,'id',d.data.id)
                                        }
                                        this.getItem()
                                    }else{
                                        this.getInstruction()
                                    }
                                 }
                            })
                        }
                    });
                })
            },

        },
        created() {
              this.getItem(1)
            this.getInstruction(1)
            request({
                url:`${this.$ip}/mms-workorder/templateLabel/selectByParam`,
                method: 'post',
                data:{templateBaseId:this.$route.query.id}
            }).then((d) => {
                if(d.code==200){
                    this.formThree={...d.data }
                }
            })
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:['roleControl','applyRangeType','EngineNo','W_PickUpType','W_sjType']
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
.backColor{
    background:#DCDFE6 ;
}
    .threeBan{
        margin-top: 30px;

        display: flex;
        justify-content: left;
        height:calc(100vh - 300px);
        border: 1px #979797 solid;
        .threeBanFirst{
            border-right: 1px #979797 solid;
            height:calc(100vh - 302px);
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

                .el-form-item{
                    width: 100%;
                }
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
                        width: 130px;
                        text-align: left;
                        padding: 0;
                    }
                    .el-form-item__content{
                        width: calc(100% - 140px);
                    }
                }
            };
        }
    }
/deep/ .el-tree{
    height:calc(100vh - 430px)!important;
        overflow-y: auto;
    .el-tree-node__expand-icon:not(.is-leaf):before{
       color:#606266;
        font-size: 13px;
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
                left:98px;
                top:0;

            }
        }
    }
.rowTTTT{
    /deep/ .el-form-item:first-child{
        width: 30%!important;
        margin: 0!important;
    }
    /deep/ .el-form-item{
        margin: 0!important;
    }
    /deep/ .el-form-item__label{
        width:auto!important;
        padding: 0 20px 0 0!important;
     }
    /deep/ .el-input{
        width: 200px;
    }
}
.row_two{

    /deep/ .el-form-item:first-child{
       width: 200px!important;
    } /deep/ .el-form-item{
    margin-right: 0;
       width: calc(100% - 220px)!important;
    }
}
</style>