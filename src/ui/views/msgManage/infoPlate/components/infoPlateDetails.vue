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
        <div class="row_item">   
            <el-form-item label="发送时间：" label-width="164px" >
                <span >{{form.sendDate}}</span>
            </el-form-item>
            <el-form-item :label="this.parentType=='send'?'接收单位：':'发送单位：'"  label-width="164px">
                <span >{{form.receiptDepartment}}</span>
            </el-form-item>
        </div>
        <div class="row_item_row row_item">
            <el-form-item :label="this.parentType=='send'?'接收人：':'发送人：'"  label-width="164px">
                <span >{{form.receiptPerson}}</span>
            </el-form-item>
        </div>
        <div class="row_item_row row_item">
            <el-form-item label="发送内容："  label-width="164px">
                <span >{{form.content}}</span>
            </el-form-item>
        </div>
        <div class="row_item">   
          <el-form-item label="信息类型：" label-width="164px">
            <span >{{form.type}}</span>
          </el-form-item>
          <el-form-item label="信息状态：" label-width="164px">
             <span >{{form.state}}</span>
          </el-form-item>
        </div>
       <div class="row_item_row row_item">
          <el-form-item label="要求处理时间：" label-width="164px">
            <span >{{form.deadline}}</span>
          </el-form-item>
        </div>
         <div class="row_item">   
          <el-form-item label="实际处理时间：" label-width="164px">
            <span >{{form.type}}</span>
          </el-form-item>
          <el-form-item label="是否要求接收处理：" label-width="164px">
             <span >{{form.require}}</span>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="附件：" label-width="164px">
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
            method: "get",
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
   .row_item{
        display: flex;
    }
   .el-form {
        width: 796px;
      /deep/ .upload-demo{
        display: inline-block;
      }
  }
}
</style>
