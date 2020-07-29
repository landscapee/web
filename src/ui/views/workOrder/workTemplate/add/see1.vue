<template>
    <div class="seeConfig">
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
                 <table class="nomTable nomTable1">
                     <tbody>
                         <div  v-for="(opt) in Math.ceil(form.baseItemVOList.length/3)" :key="opt"  >
                             <tr   >
                                 <td  v-for="(opt1,index) in getArr(opt)" :key="index" valign="middle">
                                     <div>{{opt1.nameCn}}</div>
                                     <div>{{opt1.nameEn}}</div>
                                 </td>
                             </tr>
                             <tr  >
                                 <td  v-for="(opt1,index) in getArr(opt)" :key="index" valign="middle" class="trimg">

                                     <div v-if="opt1.type==4"  >
                                         <img   :src="opt1.value" alt="请上传图片">
                                     </div>
                                     <template v-else-if="opt1.type==2">
                                         {{opt1.value}}
                                     </template>
                                     <div v-else >
                                     </div>
                                 </td>
                             </tr>
                         </div>

                     </tbody>
                </table>
            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'beforeWarning')">
                <p v-html="get(form.templateRemarkVO,'beforeWarning')"> </p>
            </div>
            <div class="item" v-if="form.templateRemarkVO">
                <table class="nomTable nomTable2">

                    <tbody v-if="get(form.labelVO,'contentLayout')">
                    <tr class="th">
                        <td valign="middle">
                            <div>{{get(form.labelVO,'itemLabel')}}</div>
                            <div>{{get(form.labelVO,'itemLabelEnglish')}}</div>
                        </td>
                        <td valign="middle">
                            <div>{{get(form.labelVO,'contentLabel')}}</div>
                            <div>{{get(form.labelVO,'contentLabelEnglish')}}</div>
                        </td>
                        <td valign="middle" v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'">
                            <div>{{get(form.labelVO,'workerLabel')}}</div>
                            <div>{{get(form.labelVO,'workerLabelEnglish')}}</div>
                        </td>
                        <td valign="middle" v-if="get(form.labelVO,'contentLayout')=='C4（四列）'">
                            <div>{{get(form.labelVO,'commanderLabel')}}</div>
                            <div>{{get(form.labelVO,'commanderLabelEnglish')}}</div>
                        </td>
                    </tr>


                    <tr v-if="form.contentVOList&&form.contentVOList.length" v-for="(opt,index) in form.contentVOList" :key="index">
                                <div >
                                    <td valign="middle">
                                        {{opt.index}}
                                    </td>
                                    <td valign="middle">
                                     <span v-if="opt.itemType==1||opt.itemType==3">
                                         {{opt.name}}
                                     </span>
                                        <span v-else v-html="opt.content"></span>
                                    </td>
                                    <td valign="middle" v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'">

                                    </td>
                                    <td valign="middle" v-if="get(form.labelVO,'contentLayout')=='C4（四列）'">

                                    </td>
                                </div>
                            </tr>


                    </tbody>
                </table>
                <el-row class="th">
                <el-col  >
                    <div>{{get(form.labelVO,'itemLabel')}}</div>
                    <div>{{get(form.labelVO,'itemLabelEnglish')}}</div>
                </el-col>
                <el-col  >
                    <div>{{get(form.labelVO,'contentLabel')}}</div>
                    <div>{{get(form.labelVO,'contentLabelEnglish')}}</div>
                </el-col>
                <el-col   v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'">
                    <div>{{get(form.labelVO,'workerLabel')}}</div>
                    <div>{{get(form.labelVO,'workerLabelEnglish')}}</div>
                </el-col>
                <el-col   v-if="get(form.labelVO,'contentLayout')=='C4（四列）'">
                    <div>{{get(form.labelVO,'commanderLabel')}}</div>
                    <div>{{get(form.labelVO,'commanderLabelEnglish')}}</div>
                </el-col>
            </el-row>

                <el-row  v-if="form.contentVOList&&form.contentVOList.length" v-for="(opt,index) in form.contentVOList" :key="index" >
                    <el-col   :span="4">
                        {{opt.index}}
                    </el-col>
                    <el-col  :span="12">
                                     <span v-if="opt.itemType==1||opt.itemType==3">
                                         {{opt.name}}
                                     </span>
                        <span v-else v-html="opt.content"></span>
                    </el-col>
                    <el-col   v-if="get(form.labelVO,'contentLayout')=='C3（三列）'||get(form.labelVO,'contentLayout')=='C4（四列）'">

                    </el-col>
                    <el-col  v-if="get(form.labelVO,'contentLayout')=='C4（四列）'">

                    </el-col>
                </el-row>
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
                               k.children=k.contentDetails.map((o,p)=>{
                                   let obj={
                                       ...o,
                                       paId:k.id,
                                       index:k.index + '.'+(p+1) ,
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
                                       o.children=o.contentDetails.map((o1,p1)=>{
                                           let obj1={
                                               ...o1,
                                               padId:o.id,
                                               index:o.index+'.'+(p1+1),
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
        }
    }

}
.nomTable1{
    td{
        width:180px!important;
    }

}
.nomTable0{
    td{
        width:270px!important;
    }

}.nomTable2{
    td{
       width:100px!important;
    }
     tr td:nth-child(1){
         width: 120px!important;
    }
     tr td:nth-child(2){
         width: 300px!important;
    }

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
           height: 45px !important;
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


       } th{
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
    /*display: flex;*/
    /*justify-content: center;*/
    /*align-items: center;*/
    img{
         max-width: 120px;
        height:38px;
    }
}
</style>