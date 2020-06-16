<template>
  <div class="addSysParameter">
    <div class="top-content">
      <div class="top-content-title">
        <span>预警推送配置-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
          <el-form-item label="消息名称" prop="sysParamName">
            <span v-if="type=='info' || type=='edit' ">{{form.sysParamCode}}</span>
            <el-input v-if="type=='add'" v-model="form.sysParamCode" placeholder="请输入消息名称"></el-input>
          </el-form-item>
          <el-form-item label="推送对象" prop="sysParamValue">
            <span v-if="type=='info'">{{form.sysParamValue}}</span>
            <el-select v-else  v-model="value1" multiple placeholder="请选择推送对象">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="消息模板" prop="sysParamComment">
            <span v-if="type=='info'">{{form.sysParamComment}}</span>
            <el-input v-else v-model="form.sysParamComment" placeholder="请输入消息模板"></el-input>
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
    Icon
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
                url:`${this.$ip}/mms-warning/warningTemplate/getById`,
                method: "get",
                params: {id:this.$route.query.id}
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
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/mms-warning/warningTemplate/save`:`${this.$ip}/mms-warning/warningTemplate/update`
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
        width: 90px;
      }
      /deep/ .el-form-item__content {
        margin-left: 90px;
      }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 377px;
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
          width: calc(100% - 90px);
        }
      }
  }
}
</style>
