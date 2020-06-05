<template>
  <div class="editBusinessData">
    <div class="top-content">
      <div class="top-content-title">
        <span>业务数据类型-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
      </div>
      <div class="top-toolbar">
        <div @click="saveQualifications">
          <icon iconClass="save"></icon>保存
        </div>
        <div @click="resetForm">
          <icon iconClass="reset"></icon>重置
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" >
        <div class="row_item">
          <el-form-item label="类型" prop="dicType">
            <span v-if="type=='info'">{{form.dicType}}</span>
            <el-input v-else v-model="form.dicType" placeholder="请输入类型"></el-input>
          </el-form-item>
          <el-form-item label="类型编码" prop="dicCode">
            <span v-if="type=='info'">{{form.dicCode}}</span>
            <el-input v-else v-model="form.dicCode" placeholder="请输入类型编码"></el-input>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="类型说明" prop="dicSummary">
            <span v-if="type=='info'">{{form.dicSummary}}</span>
            <el-input v-else v-model="form.dicSummary" placeholder="请输入类型说明"></el-input>
          </el-form-item>
        </div>
        <div class="row_item row_item_row">
          <el-form-item label="允许维护" prop="enableMaintain">
            <span v-if="type=='info'">{{form.enableMaintain==1?"是":"否"}}</span>
            <el-select v-else v-model="form.enableMaintain" placeholder="请选择是否允许维护">
              <el-option label="是" :value="1"></el-option>
              <el-option label="否" :value="0"></el-option>
            </el-select>
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
        dicType: [{ required: true, message: "请输入类型", trigger: "change" }],
        dicCode: [{ required: true, message: "请输入类型编码", trigger: "change" }],
        dicSummary: [{ required: true, message: "请输入类型说明", trigger: "change" }],
        enableMaintain: [
          { required: true, message: "请选择是否允许维护", trigger: "change" }
        ]
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
          if(this.type == "edit"){
              request({
                url:`${this.$ip}/rest-api/businessDictionary/info`,
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
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/rest-api/businessDictionary/add`:`${this.$ip}/rest-api/businessDictionary/update`
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
.editBusinessData {
  margin-top: 40px;
  .release_button {
    .el-button {
      margin-top: 40px;
    }
  }
  .row_item {
    display: flex;
    &:first-child {
      .el-form-item {
        &:last-child {
          margin-left: 93px;
        }
      }
    }
  }
  .el-form {
    width: 754px;
    .el-form-item {
      width: calc(100% - 90px);
    }
    /deep/ .el-form-item__label {
      width: 90px;
    }
    /deep/ .el-form-item__content {
      margin-left: 90px;
    }
  }
}
</style>
