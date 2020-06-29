<template>
  <div class="addSysParameter">
    <div class="top-content">
      <div class="top-content-title">
        <span>信息平台-详情</span>
      </div>
      <div class="top-toolbar">
        <div  class="isDisabled">
          <icon iconClass="save"></icon>保存
        </div>
        <div  class="isDisabled">
          <icon iconClass="reset"></icon>重置
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-form label-position="right" :model="form"  ref="form" >
        <div class="row_custom">
            <el-form-item label="发送时间"  >
                <span >{{form.sendDate}}</span>
            </el-form-item>
            <el-form-item :label="this.parentType=='send'?'接收单位':'发送单位'"  >
                <span >{{form.receiptDepartment}}</span>
            </el-form-item>
        </div>
        <div class="row_custom2">
            <el-form-item :label="this.parentType=='send'?'接收人':'发送人'"  >
                <span >{{form.receiptPerson}}</span>
            </el-form-item>
        </div>
        <div class="row_custom2">
            <el-form-item label="发送内容"  >
                <span >{{form.content}}</span>
            </el-form-item>
        </div>
        <div class="row_custom">
          <el-form-item label="信息类型" >
            <span >{{form.type}}</span>
          </el-form-item>
          <el-form-item label="信息状态" >
             <span >{{form.state}}</span>
          </el-form-item>
        </div>
       <div class="row_custom2">
          <el-form-item label="要求处理时间" >
            <span >{{form.deadline}}</span>
          </el-form-item>
        </div>
        <div class="row_custom">
          <el-form-item label="实际处理时间" >
            <span >{{form.type}}</span>
          </el-form-item>
          <el-form-item label="是否要求接收处理" >
             <span >{{form.require}}</span>
          </el-form-item>
        </div>
        <div class="row_custom2">
          <el-form-item label="附件" >
            <span >{{filename}}</span>
            <el-button>下载</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Icon from "@components/Icon-svg/index";
import request from "@lib/axios.js";
import { extend } from "lodash";

export default {
  components: {
    Icon,
  },
  name: "",
  data() {
    return {
      form: {},
      receivingUnit:'',
      receiver:'',
      infoType:[],
      fileList: [],
      filename:'',
      type: "info",
      parentType:''
    };
  },
  mounted(){
   
  },
  created() {
    if (this.$route.query) {
        if(this.$route.query.tag=='send'){
            this.parentType = 'send';
        }else{
            this.parentType = 'receive';
        }
      this.type = this.$route.query.type;
      this.$route.meta.title ="详情";
        request({
            url:`${this.$ip}/mms-notice/notificationPublish/getById/${this.$route.query.id}`,
            method: "post",
        })
        .then(data => {
            this.form = data.data;
        })
        .catch(error => {
            this.$message.success(error);
        });
    }
  },
  methods: {
    
  }
};
</script>
<style scoped lang="scss">
@import "@/ui/styles/common_form.scss";
.addSysParameter {
  margin-top: 40px;
   .el-form {
      width: 1000px;
      /deep/ .upload-demo{
        display: inline-block;
      }
      /deep/ .el-form-item__label {
        width: 140px;
      }
      /deep/ .el-form-item__content {
        margin-left: 140px;
      }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 340px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom2{
        /deep/ .el-form-item__content{
            height: 40px;
            width:800px;
            text-align: left;
        }
        @include common-input;
      }
      .row_item_row{
        .el-form-item {
          width: calc(100% - 140px);
        }
      }
  }
}
</style>
