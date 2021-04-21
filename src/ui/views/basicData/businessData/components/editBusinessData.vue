<template>
  <div class="editBusinessData">
    <div class="top-content">
      <div class="top-content-title">
        <span>业务数据类型-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
          <el-form-item label="类型：" prop="dicType">
            <span v-if="type=='info'">{{form.dicType}}</span>
            <el-input v-else v-model="form.dicType" placeholder="请输入类型"></el-input>
          </el-form-item>
          <el-form-item label="类型编码：" prop="dicCode">
            <span v-if="type=='info'">{{form.dicCode}}</span>
            <el-input v-else v-model="form.dicCode" placeholder="请输入类型编码"></el-input>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="类型说明：" prop="dicSummary">
            <span v-if="type=='info'">{{form.dicSummary}}</span>
            <el-input v-else v-model="form.dicSummary" placeholder="请输入类型说明"></el-input>
          </el-form-item>
        </div>
        <div class="row_item row_item_row">
          <el-form-item label="允许维护：" prop="enableMaintain">
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
    import {eleDateShow,inputLength} from '@lib/tools'

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
      form: {deleted:false},
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
      let num=  this.$route.path.substring(1,4)=='add'?4:5;
      this.type = this.$route.path.substring(1,num);

      if (this.$route.query) {
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
                url:`${this.$ip}/mms-parameter/rest-api/businessDictionary/info`,
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
    mounted(){
        inputLength(this)
    },
  methods: {
    resetForm(){
      this.form={deleted:false};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/mms-parameter/rest-api/businessDictionary/add`:`${this.$ip}/mms-parameter/rest-api/businessDictionary/update`
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
   .el-form {
      width: 1000px;
      /deep/ .el-form-item__label {
        width: 110px;
      }
      /deep/ .el-form-item__content {
        margin-left: 110px;
      }
      .el-form-item__label {
       width: 110px;
     }
      .el-form-item__content {
       margin-left: 110px;
     }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 340px;
            text-align: left;
        }
         .el-form-item__content{
            height: 40px;
            width: 340px;
            text-align: left;
        }
        @include common-input;
        &:first-child {
          .el-form-item {
            &:last-child {
              margin-left: 93px;
            }
          }
        }
      }
      .row_item_row{
        .el-form-item {
          width: calc(100% - 110px);
        }
      }
  }
}
</style>
