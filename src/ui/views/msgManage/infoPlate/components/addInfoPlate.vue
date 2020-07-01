<template>
  <div class="addSysParameter">
    <div class="top-content">
      <div class="top-content-title">
        <span>信息平台-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
      </div>
      <div class="top-toolbar">
        <div @click="type!='info'?saveQualifications():()=>{}" :class="type=='info'?'isDisabled':''">
          <icon iconClass="save"></icon>保存
        </div>
        <div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
          <icon iconClass="reset"></icon>重置
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" >
        <div class="row_custom6">
          <el-form-item label="信息类型：" prop="type">
            <span v-if="type=='info'">{{form.type}}</span>
            <el-select v-else  v-model="form.type"  placeholder="请选择信息类型">
                <el-option v-for="item in infoType" :key="item.valCode" :label="item.valData" :value="item.valData"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="发送内容：" prop="content">
            <span v-if="type=='info'">{{form.content}}</span>
            <el-input v-else type="textarea" v-model="form.content" placeholder="请输入消息模板"></el-input>
          </el-form-item>
        </div>
        <div class="row_custom2">
          <el-form-item label="接收人和单位：" >
							<div class="tagBox">
								<el-scrollbar style="height:100px">
									<el-tag :key="tag.id" v-for="tag in userList" closable :disable-transitions="false" @close="handleClose(tag)">
										{{ tag.name }}
									</el-tag>
								</el-scrollbar>
							</div>
          </el-form-item>
          <el-button @click="handleSelectUser('subscribe')">按订阅方式</el-button>
          <el-button @click="handleSelectUser('object')">接收对象选择</el-button>
        </div>
        <div class="row_custom3">
          <el-form-item label="是否要求处理：" prop="require">
            <el-radio v-model="form.require" :label="true">是</el-radio>
            <el-radio v-model="form.require" :label="false">否</el-radio>
           </el-form-item>
           <el-form-item label="要求处理时间：" prop="deadline">
            <span v-if="type=='info'">{{form.deadline}}</span>
            <el-date-picker v-model="form.deadline" type="date" placeholder="请选择要求处理时间"></el-date-picker>
          </el-form-item>
        </div>
        <div class="row_custom5">
          <el-form-item label="附件：" >
            <span v-if="type=='info'">{{filename}}</span>
            <el-input v-else v-model="filename" placeholder="支持多个附件上传"></el-input>
          </el-form-item>
          <el-upload
              :multiple="true"
              class="upload-demo"
              ref="file"
              :http-request="handleSubmit"
              :on-change="handleChange"
              accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg"
              action=""
              :before-upload="beforeAvatarUpload"
              :auto-upload="true"
              :show-file-list="false">
            <el-button slot="trigger" >上传</el-button>
          </el-upload>
        </div>
      </el-form>
    </div>
    <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
    <selectSubscribe ref="selectSubscribe" @handleSelectSubscribe="handleSelectSubscribe" ></selectSubscribe>
  </div>
</template>
<script>
import Icon from "@components/Icon-svg/index";
import request from "@lib/axios.js";
import { extend } from "lodash";
import userTree from '@components/userTree/index';
import selectSubscribe from './selectSubscribe';
export default {
  components: {
    Icon,
    userTree,
    selectSubscribe
  },
  name: "",
  data() {
    return {
      form: {},
      rules: {
        type: [{ required: true, message: "请选择信息类型", trigger: "change" }],
        content: [{ required: true, message: "请输入发送内容", trigger: "change" }],
        require: [{ required: true, message: "请选择是否要求处理", trigger: "change" }],
        deadline: [{ required: true, message: "请选择要求处理时间", trigger: "change" }],
      },
      receivingUnit:'',
      receiver:'',
      infoType:[],
      fileList: [],
      userList:[],
      receiptDepartment:[],
      receiptPerson:[],
      filename:'',
      type: "add"
    };
  },
  mounted(){
   
  },
  created() {
    this.findDataDictionary();
    if (this.$route.query) {
      this.type = this.$route.query.type;
      this.$route.meta.title =
        this.type == "add"
          ? "新增"
          : this.type == "edit"
          ? "编辑"
          : this.type == "info"
          ? "详情"
          : "";
         if(this.type == "edit" || this.type == "info"){
              request({
                url:`${this.$ip}/mms-notice/notificationPublish/getById/${this.$route.query.id}`,
                method: "get",
              })
              .then(data => {
               this.form = data.data;
               this.filename =  data.data.fileInfoList.map(item=>
                  item.fileName
              ).join(",");
               this.userList =  data.data.receiptDepartment.concat(data.data.receiptPerson);
              })
              .catch(error => {
                this.$message.success(error);
              });
          }
    }
  },
  methods: {
    handleClose(tag) {
			this.userList = without(this.userList, tag);
		},
    handleUserSelected(users,deptList) {
      this.receiptPerson = users.map((item) => ({ id: item.id, name: item.name }));
      // 数组去重
      let hash = {};
       this.receiptDepartment  = deptList.reduce(function(item, next) {
        if (!hash[next.id]) {
          hash[next.id] = true;
          item.push(next);
        }
        return item;
      }, []);
      let list =  this.receiptDepartment.concat( this.receiptPerson).map((item) => ({ id: item.id, name: item.name }));
      this.userList = [];
      list.map((item,index)=>{
        this.$set(this.userList, index, item);
      })
    },
    handleSelectSubscribe(row){
      this.receiptDepartment = row.receiptDepartment;
      this.receiptPerson =  row.receiptPerson;
      let list =  this.receiptDepartment.concat( this.receiptPerson).map((item) => ({ id: item.id, name: item.name }));
      this.userList = [];
      list.map((item,index)=>{
        this.$set(this.userList, index, item);
      })
    },
     handleChange(file, fileList) {
        if (fileList.length > 0) {
            this.fileList = [fileList[fileList.length - 1]]  // 这一步，是 展示最后一次选择的csv文件
        }
        this.filename = fileList.map(item=>
            item.name
        ).join(",");
        console.log( this.filename );
    },
    beforeAvatarUpload(file) {
        const isLt2M = file.size / 1024 / 1024 < 5;
        if (!isLt2M) {
            this.$message.error('上传图片大小不能超过 5MB!');
        }
        return isLt2M;
    },
    handleSubmit(files,q) {
        let data=new FormData()
        data.append("file",files.file);
          console.log(data,files,q,111);
        request.defaults.headers.post['Content-Type'] = 'multipart/form-data'
        request({
            header:{
                'Content-Type':'multipart/form-data'
            },
              url:`${this.$ip}/mms-file/upload`,
            method:'post',

            data:data,
        }).then((d) => {
            if(d){

                this.form.attachment=d.data

                this.$message({
                    message: '上传成功',
                    type: 'success',
                });
            }else {
                this.$message({
                    message: '上传失败',
                    type: 'info',
                });
            }

        });
    },
    close(d){
        this.form={file:null}
        this.dialogFormVisible=false
        this.$refs.file.clearFiles()
        if(d&&this.form.file){
            request({
                // application/x-www-form-urlencoded
                header:{
                    'Content-Type':'multipart/form-data'
                },
                url:`${this.$ip}/mms-file/${this.form.file}`,
                method:'delete',

            }).then((d) => {

            });
        }
    },
    findDataDictionary(){
        request({
          url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
          method: "post",
          data: ["infoType"]
        })
        .then(data => {
          this.infoType = data.data["infoType"];
        })
        .catch(error => {
          this.$message.success(error);
        });
    },
    handleSelectUser(tag) {
			if(tag=='subscribe'){
        this.$refs.selectSubscribe.open();
      }else{
        this.$refs.userBox.open(this.users, '选择人员', true);
      }
		},
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/mms-notice/notificationPublish/save`:`${this.$ip}/mms-notice/notificationPublish/update`
            request({
              url,
              method: "post",
              data: this.type == "edit"?{...this.form,id:this.$route.query.id,receiptDepartment:this.receiptDepartment,receiptPerson:this.receiptPerson}:{...this.form,receiptDepartment:this.receiptDepartment,receiptPerson:this.receiptPerson}
            })
            .then(data => {
              this.$message.success("保存成功！");
              this.$parent.selectId = null;
              this.$router.go(-1);
            })
            .catch(error => {
              this.$message.success(error);
            });
          } else {
            console.log("error submit!!");
            return false;
          }
        });
      }
    }
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
        width: 130px;
      }
      /deep/ .el-form-item__content {
        margin-left: 130px;
      }
       .row_custom6{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 870px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom5{
        /deep/ .el-button{
          position: relative;
          top: -2px;
        }
        /deep/ .el-form-item__content{
            height: 40px;
            width: 788px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom4{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 300px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom3{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 365px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom2{
        /deep/ .el-button{
          position: relative;
          top: -85px;
        }
        /deep/ .el-form-item__content{
            height: 40px;
            width: 610px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 340px;
            text-align: left;
        }
        @include common-input;
        &:first-child {
          .el-form-item {
            &:last-child {
              margin-left: 55px;
            }
          }
        }
      }
      .row_item_row{
        .el-form-item {
          width: calc(100% - 130px);
        }
      }
  }
}
</style>
