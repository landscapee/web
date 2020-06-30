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
                <span >{{this.receivingUnit}}</span>
            </el-form-item>
        </div>
        <div class="row_item_row row_item">
            <el-form-item :label="this.parentType=='send'?'接收人：':'发送人：'"  label-width="164px">
                <span >{{this.receiver}}</span>
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
             <span >{{form.require?'是':form.require==false?'否':''}}</span>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="附件：" label-width="164px">
             <el-button @click="downloadFile" size="mini">下载</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
     <Download ref="downloadFile"></Download>
  </div>
</template>
<script>
import Download from '@/ui/components/download';
import Icon from "@components/Icon-svg/index";
import request from "@lib/axios.js";
import { extend } from "lodash";

export default {
  components: {
    Icon,
     Download
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
            if(this.form.state){
              if(this.parentType=='send'){
                this.form.state = this.form.state==0?'未发布':'已发布';
              }else{
                this.form.state = this.form.state==0?'未处理':this.form.state==1?'已处理':this.form.state==-1?'已关闭':'';
              }
            }
            if(this.form.receiptDepartment){
               let arr = [];
              this.form.receiptDepartment.map(item=>{
                  arr.push(item.name);
              })
              this.receivingUnit =  arr.join(",");
            }
            if(this.form.receiptPerson){
              let arr1 = [];
              this.form.receiptPerson.map(item=>{
                  arr1.push(item.name);
              })
              this.receiver =  arr1.join(",");
            }
            if(this.form.sendDepartment){
              this.receivingUnit = this.form.sendDepartment;
            }
            if(this.form.sendPerson){
              this.receiver =  this.form.sendPerson;
            }
        })
        .catch(error => {
            this.$message.success(error);
        });
    }
  },
  methods: {
    downloadFile(){
      if(this.form.fileInfoList){
         this.$refs.downloadFile.open( this.form.fileInfoList);
      }else{
        this.$message.warning("暂无文件可以下载");
      }
       
    },
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
