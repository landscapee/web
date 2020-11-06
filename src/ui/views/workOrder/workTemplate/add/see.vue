<template>
    <div class="seeConfig"  >
        <div class="seeTitle">
            实时预览：
            <div v-if="!show" @click="showZ">显示占位符</div>
            <div v-else  @click="showZ">隐藏占位符</div>
        </div>
        <div class="order">
            <div class="head" style="width: 100%">

            <table class="nomTable nomTable0" style="width: 100%" >
                <tr class="trimg" v-if="get(form.typeVO,'airlineCompany')||form.photoPath">
                    <td> <div  ><img :src="form.photoPath" alt=""></div></td>
                    <td>{{get(form.typeVO,'airlineCompany')}}</td>
                </tr>
                <tr v-if="get(form.typeVO,'title')">
                    <td   colspan="2" >
                        <div v-if="get(form.typeVO,'title')">
                            <div class="titleColoe">{{get(form.typeVO,'title').split('$')[0]}}</div>
                            <div class="titleColoe">{{get(form.typeVO,'title').split('$')[1]||''}}</div>
                        </div>
                    </td>
                </tr>
            </table>
            </div>
            <div class="info" v-if="getbaseItemVOList&&getbaseItemVOList.length>0">
               <div class="lastRow" v-for="(opt) in Math.ceil(getbaseItemVOList.length/3)" :key="opt" >
                   <el-row    >
                       <el-col class="colCenter" :span="8" v-for="(opt1,index) in getArr(opt)" :key="index"    v-if="opt1.enable||!opt1.type">
                           <div>{{opt1.nameCn}}</div>
                           <div>{{opt1.nameEn}}</div>
                       </el-col>
                   </el-row>
                   <el-row  >
                       <el-col :span="8" v-for="(opt1,index) in getArr(opt)" :key="index"    v-if="opt1.enable||!opt1.type">
                               <img v-if="opt1.type==4"   :src="$workImgIp+opt1.value.split('$')[1]" alt="加载失败">
                           <!--{{getimg(opt1)}}-->
                               <!--<div v-if="opt1.type==4&&show" style="word-wrap: break-word" > {{ '${'+opt1.placeholder+'}'}}</div>-->
                           <template v-else-if="opt1.type==2">
                               {{opt1.value}}
                           </template>
                           <div v-else-if="opt1.type==1" >

                               <div v-if="show"> {{ '${'+opt1.placeholder+'}'}}</div>
                           </div>
                           <div v-else-if="opt1.type==3" style="width: 99%">
                               <input type="text" :name="opt1.placeholder" style="width: 99%" ></input>
                               <div v-if="show"> {{ '${'+opt1.placeholder+'}'}}</div>
                           </div>
                           <div v-else-if="opt1.type==7" style="width: 99%">
                               <input type="date" :name="opt1.placeholder" style="width: 99%" ></input>
                               <div v-if="show"> {{ '${'+opt1.placeholder+'}'}}</div>
                           </div>
                           <div v-else-if="opt1.type==5"  style="width:100%">
                               <div>
                                   <div v-for="(k,l) in opt1.value.split(';')" :key="l" style="width:100%;word-wrap: break-word;margin-top: 5px">
                                       <input type="checkbox" :name="opt1.placeholder.split(';')[l]" class="Wtui-checkbox" ></input>{{k}}
                                       <div v-if="show" style="width: 100%" >
                                            {{ '${'+opt1.placeholder.split(';')[l]+'}'}}
                                       </div>
                                   </div>


                               </div>
                               <div> </div>
                           </div>
                           <div v-else-if="opt1.type==6"  style="width: 99%">
                               <div v-if="show" style="width: 99%">  {{ '${'+opt1.placeholder+'}'}}</div>

                           </div>
                       </el-col>
                   </el-row>

               </div>

            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'beforeWarning')">
                <p v-html="getInstruction('beforeWarning')"> </p>
            </div>
            <div class="item" >
                <table class="one" border="0" width="100%">
                    <tr height="45px">

                        <td  width="17%"  v-if="form.labelVO">
                            <div>{{get(form.labelVO,'itemLabel')}}</div>
                            <div>{{get(form.labelVO,'itemLabelEnglish')}}</div>
                        </td>
                        <td v-if="form.labelVO"  :width="get(form.labelVO,'contentLayout')=='C4（四列）'?'50%':get(form.labelVO,'contentLayout')=='C3（三列）'?'66%':'83%'">
                            <div>{{get(form.labelVO,'contentLabel')}}</div>
                            <div>{{get(form.labelVO,'contentLabelEnglish')}}</div>
                        </td>
                        <td width="17%"  v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'">
                            <div>{{get(form.labelVO,'workerLabel')}}</div>
                            <div>{{get(form.labelVO,'workerLabelEnglish')}}</div>
                        </td>
                        <td width="17%"  v-if="get(form.labelVO,'contentLayout')=='C4（四列）'">
                            <div>{{get(form.labelVO,'commanderLabel')}}</div>
                            <div>{{get(form.labelVO,'commanderLabelEnglish')}}</div>
                        </td>
                    </tr>
                    <tr  v-if="contentVOList&&contentVOList.length" v-for="(opt,index) in contentVOList" :key="index" :class="(opt.itemType==1||opt.itemType==3)&&opt.contentDetails&&opt.contentDetails.length?'none':''">
                            <template v-if="(opt.itemType==1||opt.itemType==3)">
                                <template v-if="opt.contentDetails&&opt.contentDetails.length"></template>
                                <template v-else>
                                    <td   width="17%"  >
                                       <div style="display: flex;justify-content: space-between;padding: auto 30px"  >
                                           <div style="margin-right: 10px"    class="logo" >
                                               <div v-if="opt.hook">
                                                   <icon-svg iconClass="gouUncheck" style="height:20px;width:30px"></icon-svg>
                                                   <div v-if="show" style="width:60px;word-wrap: break-word" >
                                                       {{ '${gou_'+opt.serialNumber+'}'}}
                                                   </div>
                                               </div>
                                               <div v-if="opt.notApplicable">
                                                   <icon-svg iconClass="naUncheck" style="height:20px;width:30px"></icon-svg>
                                                   <div v-if="show" style="width:60px;word-wrap: break-word" >
                                                       {{ '${na_'+opt.serialNumber+'}'}}
                                                   </div>
                                               </div>
                                               <div v-if="opt.cycle">

                                                   <icon-svg iconClass="quanUncheck" style="height:20px;width:30px"></icon-svg>
                                                   <div v-if="show" style="width:60px;word-wrap: break-word" >
                                                       {{ '${cycle_'+opt.serialNumber+'}'}}
                                                   </div>
                                               </div>
                                           </div>
                                           <div>{{opt.number}}</div>
                                       </div>
                                    </td>
                                    <td :width="get(form.labelVO,'contentLayout')=='C4（四列）'?'50%':get(form.labelVO,'contentLayout')=='C3（三列）'?'66%':'83%'">
                                        {{opt.name}}
                                    </td>
                                    <td width="17%"  v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'"></td>
                                    <td  width="17%" v-if="get(form.labelVO,'contentLayout')=='C4（四列）'"  >

                                    </td>

                                </template>
                            </template>
                            <template v-else>
                                <td   width="17%" :rowspan="opt.p.contentDetails.length" v-if="opt.index==0">

                                    <div style="display: flex;justify-content: space-between;padding: auto 30px"  >
                                        <div style="margin-right: 10px"    class="logo" >
                                            <div v-if="opt.p.hook">
                                                <icon-svg iconClass="gouUncheck" style="height:20px;width:30px"></icon-svg>
                                                <div v-if="show" style="width:60px;word-wrap: break-word" >
                                                    {{ '${gou_'+opt.p.serialNumber+'}'}}
                                                </div>
                                            </div>
                                            <div v-if="opt.p.notApplicable">
                                                <icon-svg iconClass="naUncheck" style="height:20px;width:30px"></icon-svg>
                                                <div v-if="show" style="width:60px;word-wrap: break-word" >
                                                    {{ '${na_'+opt.p.serialNumber+'}'}}
                                                </div>
                                            </div>
                                            <div v-if="opt.p.cycle">
                                                <icon-svg iconClass="quanUncheck" style="height:20px;width:30px"></icon-svg>
                                                <div v-if="show" style="width:60px;word-wrap: break-word" >
                                                    {{ '${cycle_'+opt.p.serialNumber+'}'}}
                                                </div>
                                            </div>
                                        </div>
                                        <div>{{opt.p.number}}</div>
                                    </div>
                                </td>

                                <td class="contenttable" v-html="opt.content" :width="get(form.labelVO,'contentLayout')=='C4（四列）'?'50%':get(form.labelVO,'contentLayout')=='C3（三列）'?'66%':'83%'" style="text-align: left;">

                                </td>
                                <td width="17%"  v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'" :class="opt.workerLabel?'':'duijiao'" >
                                    <div v-if="opt.workerLabel" >
                                        <div > {{opt[get(form.labelVO,'contentLayout')=='C3（三列）'?'c3Remark':'c4WorkerRemark']}}</div>
                                        <el-button type="primary" style="padding:5px 15px">签署</el-button>
                                        <div v-if="show" style="width:60px;word-wrap: break-word" >
                                             {{ '${fix_sign_'+opt.p.serialNumber+'_'+(opt.index+1)+'}'}}
                                        </div>
                                    </div>
                                </td>
                                <td  width="17%" v-if="get(form.labelVO,'contentLayout')=='C4（四列）'"  :class="opt.commanderLabel?'':'duijiao'">
                                    <div v-if="opt.commanderLabel">
                                        <div>{{opt.c4CommanderRemark}}</div>
                                        <el-button type="primary" style="padding:5px 15px">签署</el-button>
                                        <div v-if="show" style="width:60px;word-wrap: break-word" >

                                            {{ '${travel_sign_'+opt.p.serialNumber+'_'+ (opt.index+1) +'}'}}
                                        </div>
                                    </div>
                                </td>
                            </template>
                        </tr>
                </table>
            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'afterExplain')">
                <p v-html="getInstruction('afterExplain')"> </p>
            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'afterSchedule')">
                <p v-html="getInstruction('afterSchedule')"> </p>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '@lib/axios.js';
    import { extend ,map,get,filter} from "lodash";
    export default {
        name: "see",
         components: {},
        props:['seeIndex'],
        data() {
            return {
                formContent:{},
                get:get,
                form:{},
                contentVOList:[],
                show:true,
            }
        },
        computed:{
            getbaseItemVOList(){
                let arr=this.form.baseItemVOList&&this.form.baseItemVOList.filter((k)=>k.enable)
                return arr
            },

          getArr(){
              return (opt)=>{
                     let num=opt*3
                  let fArr=this.form.baseItemVOList.filter((k)=>k.enable)

                  let arr= fArr.slice((opt-1)*3,num)
                  if(opt*3>fArr.length){
                       num=arr.length
                       num==1?
                      arr.push({},{}): arr.push({})
                  }
                  return arr
              }
          },
            getInstruction(){
                return (key)=>{
                    let reg=/(name\s{0,}=\s{0,}\")(.+?)(\"\s{0,}\/>)/g
                    if(this.show){
                        return this.get(this.form.templateRemarkVO,key).replace(reg,"$1$2$3${$2}" )

                    }else{
                        return this.get(this.form.templateRemarkVO,key)
                    }
                }

            },
        },
        methods:{
            getimg(row){
                if(row.value&&!row.value1){
                    request({
                        header:{'Content-Type':'multipart/form-data'},
                        url:`${this.$ip}/mms-file/get-file-by-id/${row.value }`,
                        method:'GET',
                    }).then((d)=>{
                        this.$set(row,'value1', d.data.filePath)
                    })
                }

            },
            showZ(){
                this.show=!this.show
                this.trans()
            },
            upLogoPho(){
                this.$refs.UploadFile.$refs.buttonClick.$el.click()
            },

            getFile(file){
                console.log(file.id);
                // this.$set(this.form,'airlineCompanyLogo',file.id)
                request({
                    header:{
                        'Content-Type':'multipart/form-data'
                    },
                    url:`${this.$ip}/mms-file/get-file-by-id/${file.id }`,
                    method:'GET',

                }).then((d) => {
                    this.$set(this.form,'photoPath',d.data.filePath)
                });

            },
            getInfo(){
                 if(!this.$route.query.id) return false
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                }).then((data) => {
                     this.form = extend({}, {...data.data});
                     this.trans()
                    if(this.form.typeVO.airlineCompanyLogo){
                        request({
                            header:{
                                'Content-Type':'multipart/form-data'
                            },
                            url:`${this.$ip}/mms-file/get-file-by-id/${this.form.typeVO.airlineCompanyLogo }`,
                            method:'GET',
                        }).then((d) => {
                            this.$set(this.form,'photoPath',d.data.filePath)
                        });
                    }

                })
            },
            trans( ){
                let arr=[]

               if(this.form.contentVOList&&this.form.contentVOList.length){
                   this.form.contentVOList.map((k,l)=>{
                       k.itemType=1
                       k.index=l+1//大项
                       arr.push(k)
                       if(k.noSmallItem){
                           if(k.contentDetails){
                              k.contentDetails.map((o,p)=>{
                                  let obj={
                                       ...o,
                                       p:k,
                                       paId:k.id,
                                       index:p   ,
                                        itemType:2,  //大项内容
                                       name:`工作内容${p+1}`
                                   }
                                  if(this.show&&obj.content){
                                      let reg=/(name\s{0,}=\s{0,}\")(.+?)(\"\s{0,}\/>)/g
                                      obj.content=o.content.replace(reg,"$1$2$3${$2}" )
                                  }
                                   arr.push(obj)
                               })
                           }
                       }else{
                           if(k.children){
                               k.children.map((o,p)=>{
                                   o.paId=k.id
                                   o.index=k.index+'.'+(p+1)
                                   o.itemType=3 //小项
                                   arr.push(o)
                                    if(o.contentDetails){
                                       o.contentDetails.map((o1,p1)=>{

                                           let obj1={
                                               ...o1,
                                               p:o,
                                               padId:o.id,
                                               index:p1 ,
                                                itemType:4,  //小项内容
                                               name:`工作内容${p1+1}`
                                           }
                                           if(this.show&&obj1.content){
                                               let reg=/(name\s{0,}=\s{0,}\")(.+?)(\"\s{0,}\/>)/g
                                               obj1.content=o1.content.replace(reg,"$1$2$3${$2}" )
                                           }
                                           arr.push(obj1)
                                       })
                                   }

                               })
                           }
                       }

                   })
                    this.contentVOList=[...arr]
               }
            },
        },
        created() {
            if(this.$route.query.id){
                this.getInfo()
            }
            console.log(this.form);

        },
    }
</script>

<style lang="scss" scoped>
    .contenttable{
        /deep/ table{
            width: 100%!important;
        }
    }
.seeConfig{
    width:100%;
    height:calc(100vh - 100px);
    overflow-y: auto;
    padding: 20px 20px;

    .seeTitle{
        line-height: 20px;
        margin-bottom: 6px;
        color:#222222;
        display: flex;
        justify-content: space-between;
        div{
            color:#3280E7
        }
        div:hover{
            cursor: pointer;
        }
    }

    .order{

        .head{

        }
        .info{
            margin-top: 20px;
            img{
                max-width: 270px;
                border: 1px #979797 dashed;
                height:39px;
                margin:  auto
            }
            /deep/ .el-col{
                flex-direction: column;

            }
            .lastRow:last-child{
                /deep/  .el-row:last-child{
                    border-bottom: 1px #979797 solid;
                }
            }
        }
        .item{
            margin-top: 20px;
            table.one {
                table-layout: automatic;
                border-collapse:collapse; border-spacing:0;
                tr{
                    height:45px;
                }
                .duijiao{

                    background: linear-gradient(
                                    to top right,
                                    rgba(0, 0, 0, 0) 0%,
                                    rgba(0, 0, 0, 0) calc(50% - 1.5px),
                                    rgba(0, 0, 0, 0) 50%,
                                    rgba(0, 0, 0, 0) calc(50% + 1.5px),
                                    rgba(0, 0, 0, 0) 100%
                    ), linear-gradient(
                                    to bottom right,
                                    rgba(0, 0, 0, 0) 0%,
                                    rgba(0, 0, 0, 0) calc(50% - 1.5px),
                                    rgba(0, 0, 0, 1) 50%,
                                    rgba(0, 0, 0, 0) calc(50% + 1.5px),
                                    rgba(0, 0, 0, 0) 100%
                    )!important;
                }
                td{
                    padding: 5px;
                    height:45px;
                    text-align: center;
                    border:1px #979797 solid;
                }
                tr{
                    td:first-child{
                        /*padding: 5px 15px;*/
                    }
                }
            }
        }
    }

}

/deep/ .el-row{
    border: 1px #979797 solid;
    border-bottom: 0;
    justify-content: left;display: flex;
    .colCenter{
        min-height:45px;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }

    .el-col{
        min-height:45px;
        border-left: 1px #979797 solid;
        display: flex;
        justify-content: center;
         align-items: center;

    }
    .colContent{
        justify-content: left;
        .borderTop{
            border-top:1px #979797 solid ;
        }
        &>div{
            width:100%;
        }
        &>div>div>div{
            padding: 2px 15px;
        }
    }
    .logo{
        justify-content: left;
    }
    .el-col:first-child{
        border-left: 0px #979797 solid;
    }


}

.nomTable0{
    /*td{width:270px!important;}*/
}
.nomTable{
       width: 100%;
       table-layout:fixed;
       border-collapse:collapse;
        border:none;
    tbody {
        width: 100%;
        display: table-row-group;
        vertical-align: middle;
        border-color: inherit;
    }
       tr{
           width: 100%;
           /*height: 45px !important;*/
       }
       .trimg{
           div{
                display: flex;
               justify-content: center;
               align-items: center;
           }
           img{
               max-width: 270px;
               border: 1px #979797 dashed;
               height:39px;
               margin:  auto
           }
       }
       td{
           text-align: center;
           height: 43px !important;
           border:1px solid #979797;
           font-size:14px;
           color:#222222;


       }
       .titleColoe{
           font-size:16px!important;
           font-weight: bold;
       }
   }
.upUser{
    height:43px;

    img{
         max-width: 120px;
        height:38px;
    }
}


.none{
    display: none;
    overflow: hidden;
}
p{
    /*text-indent:2em;*/
}
</style>