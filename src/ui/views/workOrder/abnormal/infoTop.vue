<template>
    <div class="seeConfig"  >
        <div class="seeTitle">

         </div>
        <div class="order">
            <div class="head">

                <table class="nomTable nomTable0"  >
                    <tr class="trimg" v-if="get(form.typeVO,'airlineCompany')||form.photoPath">
                        <td> <div  ><img :src="form.photoPath" alt=""></div></td>
                        <td>{{get(form.typeVO,'airlineCompany')}}</td>
                    </tr>
                    <tr v-if="get(form.typeVO,'title')">
                        <td   colspan="2" ><span class="titleColoe">{{get(form.typeVO,'title')}}</span> </td>
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
                            <img v-if="opt1.type==4"   :src="opt1.value" alt="加载失败">

                            <template v-else-if="opt1.type==2">
                                {{opt1.value}}
                            </template>
                            <div v-else-if="opt1.type==1" >


                            </div>
                            <div v-else-if="opt1.type==3" >
                                <input type="text" :name="opt1.placeholder" ></input>
                             </div>
                            <div v-else-if="opt1.type==5" >
                                <div>
                                    <div v-for="(k,l) in opt1.value.split(';')" :key="l">
                                        <input type="checkbox" :name="opt1.placeholder.split(';')[l]" class="Wtui-checkbox" ></input>{{k}}

                                    </div>


                                </div>
                                <div> </div>
                            </div>
                            <div v-else-if="opt1.type==6" >


                            </div>
                        </el-col>
                    </el-row>

                </div>

            </div>
            <div class="instruction"  v-if="get(form.templateRemarkVO,'beforeWarning')">
                <p v-html="getInstruction('beforeWarning')"> </p>
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
         },
        methods:{


            getInfo(  ){
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${this.$route.query.id}`,
                    method: 'get',
                }).then((data) => {
                    this.form = extend({}, {...data.data});
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

        },
        created() {
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