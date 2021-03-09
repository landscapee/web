<template>
    <div>
        <el-dialog title="航班信息选择"    :visible.sync="dialogTableVisible" class="dialog">
          <div class="banner"> 查询到航班信息过多，请选择一条</div>
          <el-radio-group v-model="form.info">
            <div  class="item" v-for="(opt,index) in radioList" :key="index">
              <el-radio :label="opt">
                  <span class=" ">航空公司：{{opt.airline}} </span>
                 <span class="ITone">机型：{{opt.aircraftType}} </span>
                 <span class="ITone">机号：{{opt.aircraftNo}} </span>
              </el-radio>
            </div>
          </el-radio-group>
          <div slot="footer" class="bottom">
            <el-button @click='closeFn'>取消</el-button>
            <el-button @click='submitFn("form")' type='primary'>提交</el-button>
          </div>
        </el-dialog>
     </div>
</template>
<script>
    import {getUserInfo} from '@lib/auth.js';
      export default {

    data() {
        return {
          radioList:[],
          dialogTableVisible: false,
          form:{ },

         }
    },
    mounted(){

     },

    methods:{
        open(data){
             this.radioList=[...data ]
            this.dialogTableVisible = true

        },
        closeFn(){
          this.form={ }
          this.radioList=[]
            this.dialogTableVisible = false
         },
        submitFn(form){
          if(this.form.info){
            this.$emit('getFlightINfo',{...this.form.info})
            this.closeFn()
          }else{
            this.$message.warning('请选择一条信息')
          }
          // this.$refs[form].validate(valid => {
          //   if (valid) {
          //
          //   }
          // });

        },

    }
}
</script>
<style scoped lang='scss'>
    /deep/ .el-dialog{
        width: 550px;
    }
    .dialog {
      .banner{
        margin-left: 15px;
      }
      .item{
        margin: 15px ;
        .ITone{
          margin: 0 10px;
        }
      }
      /deep/ .el-dialog__footer{
        text-align: center;
        button{
          padding:10px 30px
        }
      }

      /deep/ .el-dialog__header{
        text-align: center;
      }
      /deep/ .el-radio-group{
        height:200px;
        overflow-y: auto;
      }
      /deep/ .el-dialog__body {
        padding:20px;
        font-size: 20px;
        height: 260px;
        overflow-y: auto;

        /deep/ .el-dialog__footer {
          text-align: center;
          .el-button:nth-child(2) {
            background: #3280e7;
            color: #fff;
          }
        }

      }
    }
</style>
