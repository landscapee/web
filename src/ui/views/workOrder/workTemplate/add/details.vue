<template>
    <div>
        <div class="QCenterRight">
            <div class="QHead">
                工单模板详情
            </div>
        </div>
        <div   class="  G_form G_formInfo " >
            <el-form ref="form" label-position="right"   :inline="true"  >
                <div class="row_tow">
                    <el-form-item  label="工单版本号："  >
                        <span  >{{form.version}}</span>
                    </el-form-item>
                    <el-form-item  label="最新版本标识：" >
                        <span  >{{form.history?'否':'是'}}</span>
                    </el-form-item>
                </div>

                <div class="row_tow">
                    <el-form-item  label="工单模板编码："   >
                        <span  >{{  form.code }}</span>
                    </el-form-item>
                    <el-form-item  label="工单标题："  >
                        <span  >{{form.title}}</span>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="模板启用日期："   >
                         <span  >{{form.enableTime?this.$moment(form.enableTime).format('YYYY-MM-DD'):'--'}}</span>

                    </el-form-item>
                    <el-form-item  label="版本状态："   >
                        <span  >{{  getState }}</span>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="模板编制人："   >
                        <span  >{{  form.createUserName }}</span>
                    </el-form-item>
                    <el-form-item  label="版本发布日期："  >
                        <span  >{{form.publishTime?this.$moment(form.publishTime).format('YYYY-MM-DD'):'--'}}</span>
                    </el-form-item>
                </div>
                <div class="row_tow">
                    <el-form-item  label="版本生效日期："   >
                         <span  >{{form.enableTime?this.$moment(form.enableTime).format('YYYY-MM-DD'):'--'}}</span>

                    </el-form-item>
                    <el-form-item  label="版本失效日期："  >
                         <span  >{{form.invalidTime?this.$moment(form.invalidTime).format('YYYY-MM-DD'):'--'}}</span>

                    </el-form-item>
                </div>
            </el-form>


        </div>

    </div>
</template>

<script>
    import request from '@lib/axios.js';
    export default {
        name: "details",
        components: {},
        data() {
            return {
                form:{},
                W_versionState:[],
            }
        },
        computed:{
            getState(){
                let s=''
               this.W_versionState.map((k)=>{
                    if(k.valCode==this.form.state){
                        s=k.valData
                    }
                })
              return s
            },
        },
        methods: {
            getInfo(id){
                request({
                    url:`${this.$ip}/mms-workorder/template/getById/${id||this.$route.query.id}`,
                    method: 'get',
                    // params:{id:id||this.$route.query.id}
                }).then((data) => {
                     this.form = {...data.data.typeVO}


                })
            },
        },
        created() {
            this.getInfo()
            request({
                url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                params:{delete:false},
                data:["W_versionState" ]
            }).then(d => {

                this.W_versionState=d.data.W_versionState||[]
            });
        },
    }
</script>

<style lang="scss" scoped>

</style>
