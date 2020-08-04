<template>
    <div class="seeConfig"  >
        <div class="seeTitle">实时预览：</div>
        <div class="order">
            <div class="head">

            <table class="nomTable nomTable0" v-if="form.typeVO">
                <tr class="trimg">
                    <td> <div  ><img :src="form.photoPath" alt=""></div></td>
                    <td>{{get(form.typeVO,'airlineCompany')}}</td>
                </tr>
                <tr v-if="get(form.typeVO,'title')">
                    <td   colspan="2" ><span class="titleColoe">{{get(form.typeVO,'title')}}</span> </td>
                </tr>
            </table>
            </div>
            <div class="info" v-if="form.baseItemVOList&&form.baseItemVOList.length>0">
               <div class="lastRow" v-for="(opt) in Math.ceil(form.baseItemVOList.length/3)" :key="opt" >
                   <el-row    >
                       <el-col class="colCenter" :span="8" v-for="(opt1,index) in getArr(opt)" :key="index"    v-if="opt1.enable||!opt1.type">
                           <div>{{opt1.nameCn}}</div>
                           <div>{{opt1.nameEn}}</div>
                       </el-col>
                   </el-row>
                   <el-row  >
                       <el-col :span="8" v-for="(opt1,index) in getArr(opt)" :key="index"    v-if="opt1.enable||!opt1.type">

                               <img v-if="opt1.type==4"   :src="opt1.value" alt="加载失败">
                               <div v-if="opt1.type==4" > {{ '${'+opt1.placeholder+'}'}}</div>

                           <template v-else-if="opt1.type==2">
                               {{opt1.value}}
                           </template>
                           <div v-else-if="opt1.type==1" >


                           </div>
                           <div v-else-if="opt1.type==3" >
                               <input type="text" :name="opt1.placeholder" ></input>
                               <div> {{ '${'+opt1.placeholder+'}'}}</div>
                           </div>
                           <div v-else-if="opt1.type==5" >
                               <div>
                                   <div v-for="(k,l) in opt1.value.split(';')" :key="l">
                                       <input type="radio" :name="opt1.placeholder" ></input>{{k}}
                                   </div>
                                   {{ '${'+opt1.placeholder+'}'}}
                               </div>
                               <div> </div>
                           </div>
                           <div v-else-if="opt1.type==6" >
                               <div> {{ '${'+opt1.placeholder+'}'}}</div>

                           </div>
                       </el-col>
                   </el-row>

               </div>

            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'beforeWarning')">
                <p v-html="get(form.templateRemarkVO,'beforeWarning')"> </p>
            </div>
            <div class="item" >
                <table class="one" border="0" width="100%">
                    <tr height="45px">

                        <td  width="17%">
                            <div>{{get(form.labelVO,'itemLabel')}}</div>
                            <div>{{get(form.labelVO,'itemLabelEnglish')}}</div>
                        </td>
                        <td  :width="get(form.labelVO,'contentLayout')=='C4（四列）'?'50%':get(form.labelVO,'contentLayout')=='C3（三列）'?'66%':'83%'">
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
                        <tr  v-if="form.contentVOList&&form.contentVOList.length" v-for="(opt,index) in form.contentVOList" :key="index" :class="(opt.itemType==1||opt.itemType==3)&&opt.contentDetails&&opt.contentDetails.length?'none':''">
                            <template v-if="(opt.itemType==1||opt.itemType==3)">
                                <template v-if="opt.contentDetails&&opt.contentDetails.length"></template>
                                <template v-else>
                                    <td   width="17%"  >
                                        <div style="margin-right: 10px"  v-if="opt.hookImport||opt.notApplicable||opt.cycle"  class="logo" >
                                            <div v-if="opt.hookImport">✔</div>
                                            <div v-if="opt.notApplicable">N/A</div>
                                            <div v-if="opt.cycle">○</div>
                                        </div>
                                        <div>{{opt.number}}</div>
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
                                    <div style="margin-right: 10px"  v-if="opt.hookImport||opt.notApplicable||opt.cycle"  class="logo" >
                                        <div v-if="opt.hookImport">✔</div>
                                        <div v-if="opt.notApplicable">N/A</div>
                                        <div v-if="opt.cycle">○</div>
                                    </div>
                                    <div>{{opt.p.number}}</div>
                                </td>

                                <td v-html="opt.content" :width="get(form.labelVO,'contentLayout')=='C4（四列）'?'50%':get(form.labelVO,'contentLayout')=='C3（三列）'?'66%':'83%'">

                                </td>
                                <td width="17%"  v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'" :class="opt.workerLabel?'':'duijiao'">
                                    <div  >

                                    </div>
                                </td>
                                <td  width="17%" v-if="get(form.labelVO,'contentLayout')=='C4（四列）'"  :class="opt.commanderLabel?'':'duijiao'">
                                    <div >

                                    </div>
                                </td>
                            </template>
                        </tr>
                </table>
            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'afterExplain')">
                <p v-html="get(form.templateRemarkVO,'afterExplain')"> </p>
            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'afterSchedule')">
                <p v-html="get(form.templateRemarkVO,'afterSchedule')"> </p>
            </div>
        </div>
    </div>
</template>

<script>
    import request from '@lib/axios.js';
    import { extend ,map,get} from "lodash";
    export default {
        name: "see",
         components: {},
        props:['seeIndex'],
        data() {
            return {
                get:get,
                form:{},
            }
        },
        computed:{
          getArr(){
              return (opt)=>{
                    let num=opt*3
                  let arr= this.form.baseItemVOList.slice((opt-1)*3,num)
                  if(opt*3>this.form.baseItemVOList.length){
                       num=this.form.baseItemVOList.length+1
                      arr= this.form.baseItemVOList.slice((opt-1)*3,num)
                      num==1?
                      arr.push({}): arr.push({},{})
                  }
                  return arr
              }
          }
        },
        methods:{
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
            getInfo(  ){
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
                                  let reg=/(name\s{0,}=\s{0,}\")(.+?)(\"\s{0,}\/>)/g
                                  o.content=o.content.replace(reg,"$1$2$3${$2}" )
                                  console.log( o.content,reg,12,1,1);
                                  let obj={
                                       ...o,
                                       p:k,
                                       paId:k.id,
                                       index:p   ,
                                        itemType:2,  //大项内容
                                       name:`工作内容${p+1}`
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
                                           let reg=/(name\s{0,}=\s{0,}\")(.+?)(\"\s{0,}\/>)/g
                                           o1.content=o1.content.replace(reg,"$1$2$3${$2}" )
                                           let obj1={
                                               ...o1,
                                               p:o,
                                               padId:o.id,
                                               index:p1 ,
                                                itemType:4,  //小项内容
                                               name:`工作内容${p1+1}`
                                           }
                                           arr.push(obj1)
                                       })
                                   }

                               })
                           }
                       }

                   })
                    this.form.contentVOList=[...arr]
               }
            },
        },
        created() {
            console.log(this.form);
       this.getInfo()
        },
    }
</script>

<style lang="scss" scoped>
.seeConfig{
    width:100%;
    height:calc(100vh - 89px);
    overflow-y: auto; padding: 20px 30px;

    .seeTitle{
        line-height: 20px;
        margin-bottom: 6px;
        color:#222222;
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
                    height:45px;
                    text-align: center;
                    border:1px #979797 solid;
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
    td{width:270px!important;}
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
}
p{
    /*text-indent:2em;*/
}
</style>