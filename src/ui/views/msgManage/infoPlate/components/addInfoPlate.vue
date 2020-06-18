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
        <div class="row_custom">
          <el-form-item label="信息类型" prop="sysParamName">
            <span v-if="type=='info'">{{form.sysParamComment}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="请选择信息类型"></el-input>
          </el-form-item>
          <el-form-item label="发送时间" prop="sysParamValue">
            <span v-if="type=='info'">{{form.sysParamValue}}</span>
            <el-select v-else  v-model="value1" multiple placeholder="请选择发送时间">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="发送内容" prop="sysParamComment">
            <span v-if="type=='info'">{{form.sysParamComment}}</span>
            <el-input v-else type="textarea" v-model="form.sysParamComment" placeholder="请输入消息模板"></el-input>
          </el-form-item>
        </div>
        <div class="row_custom2">
          <el-form-item label="接收单位" prop="sysParamName">
            <span v-if="type=='info'">{{form.sysParamComment}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="请选择接收单位"></el-input>
          </el-form-item>
          <el-form-item label="接收人" prop="sysParamValue">
            <span v-if="type=='info'">{{form.sysParamValue}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="请选择接收人"></el-input>
          </el-form-item>
          <el-button @click="handleSelectUser('subscribe')">按订阅方式</el-button>
          <el-button @click="handleSelectUser('object')">接收对象选择</el-button>
        </div>
        <div class="row_custom3">
          <el-form-item label="是否要求处理" prop="sysParamValue">
            <el-radio v-model="radio" label="1">是</el-radio>
            <el-radio v-model="radio" label="2">否</el-radio>
           </el-form-item>
        </div>
        <div class="row_custom4">
          <el-form-item label="要求处理时间" prop="sysParamName">
            <span v-if="type=='info'">{{form.sysParamComment}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="请选择接收单位"></el-input>
          </el-form-item>
          <el-form-item label="处理人" prop="sysParamValue">
            <span v-if="type=='info'">{{form.sysParamValue}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="请选择接收人"></el-input>
          </el-form-item>
          <el-button>处理人选择</el-button>
        </div>
        <div class="row_custom5">
          <el-form-item label="附件" prop="sysParamName">
            <span v-if="type=='info'">{{form.sysParamComment}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="支持多个附件上传"></el-input>
          </el-form-item>
          <el-button>上传</el-button>
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
      rules: {
        sysParamCode: [{ required: true, message: "请输入系统参数编码", trigger: "change" }],
        sysParamName: [{ required: true, message: "请输入系统参数", trigger: "change" }],
        sysParamValue: [{ required: true, message: "请输入系统参数值", trigger: "change" }],
        sysParamComment: [{ required: true, message: "请输入系统参数说明", trigger: "change" }]
      },
      type: "add"
    };
  },
  mounted(){
   
  },
  created() {
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
                url:`${this.$ip}/parameter/rest-api/sysParam/info`,
                method: "post",
                data: {id:this.$route.query.id}
              })
              .then(data => {
                this.form = data.data[0];
              })
              .catch(error => {
                this.$message.success(error);
              });
          }
    }
  },
  methods: {
    handleUserSelected(users) {
			let data = users.map((item) => ({ userId: item.id, userName: item.name }));
		},
    handleSelectUser(currentDept) {
			
		},
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/parameter/rest-api/sysParam/add`:`${this.$ip}/parameter/rest-api/sysParam/update`
            request({
              url,
              method: "post",
              data: this.type == "edit"?{...this.form,id:this.$route.query.id}:this.form
            })
            .then(data => {
              this.$message.success("保存成功！");
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
      /deep/ .el-form-item__label {
        width: 120px;
      }
      /deep/ .el-form-item__content {
        margin-left: 120px;
      }
      .row_custom5{
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
            width: 310px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom3{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 870px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom2{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 245px;
            text-align: left;
        }
        @include common-input;
      }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 350px;
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
          width: calc(100% - 120px);
        }
      }
  }
}
</style>
