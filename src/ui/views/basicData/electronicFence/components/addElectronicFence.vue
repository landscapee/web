<template>
  <div class="addElectronicFence">
    <div class="top-content">
      <div class="top-content-title">
        <span>机位电子围栏-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
      </div>
      <div class="top-toolbar">
        <div @click="type!='info'?saveQualifications():()=>{}" :class="type=='info'?'isDisabled':''" v-if="type!=='info'">
          <icon iconClass="save"></icon>保存
        </div>
        <div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''" v-if="type!=='info'">
          <icon iconClass="reset"></icon>重置
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" >
        <div class="row_custom">
          <el-form-item label="机位号：" prop="parkingNo">
            <span v-if="type=='info'">{{form.parkingNo}}</span>
            <el-input v-else v-model="form.parkingNo" placeholder="请输入机位号"  :disabled="type=='add'?false:true"></el-input>
          </el-form-item>
          <el-form-item label="允许最大误差值：" prop="maxError">
            <span v-if="type=='info'">{{form.maxError}}</span>
            <el-input v-else v-model.number="form.maxError" placeholder="请输入允许最大误差值" maxlength="3"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
import Icon from "@components/Icon-svg/index";
import request from "@lib/axios.js";
import  { debounce } from '@lib/tools.js';
import { extend ,cloneDeep} from "lodash";
export default {
  components: {
    Icon
  },
  name: "",
  data() {
    return {
      form: {},
      cloneForm:{},
      rules: {
        parkingNo: [{ required: true, message: "请输入机位号", trigger: "change" },
          // {
					// 	validator: (rule, value, callback) => {
          //     if(value != this.cloneForm.parkingNo){
          //        debounce(() => {
          //         request({
          //           url:`${this.$ip}/mms-parameter/rest-api/electronicFence/only`,
          //           method: "post",
          //           data: {parkingNo:value}
          //         })
          //         .then(data => {
          //           if(data.data.length!=0){
          //             callback(new Error('当前机位号已存在'));
          //           } else {
          //             callback();
          //           }
          //         })
          //         .catch(error => {
          //           this.$message.success(error);
          //         });
          //       })();
          //     }else{
          //         callback();
          //     }
					// 	},
					// 	trigger: 'change',
          // }
        ],
        longitude: [{ required: true, message: "请输入定点经度", trigger: "change" }],
        latitude: [{ required: true, message: "请输入定点纬度", trigger: "change" }],
        radius: [{ required: true, message: "请输入定点半径", trigger: "change" }],
        maxError: [{ required: true, message: "请输入允许最大误差值", trigger: "change" }]
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
                url:`${this.$ip}/mms-parameter/rest-api/electronicFence/info`,
                method: "post",
                data: {id:this.$route.query.id}
              })
              .then(data => {
                this.form = data.data[0];
                this.cloneForm  = cloneDeep(data.data[0]);
              })
              .catch(error => {
                this.$message.success(error);
              });
          }
    }
  },
  methods: {
    changeCode(key){
      // 先把非数字的都替换掉(空)，除了数字和.
      this.$set(this.form,key,this.form[key].replace(/[^\d.]/g, ""));
      // 必须保证第一个为数字而不是.
      this.$set(this.form,key,this.form[key].replace(/^\./g, ""));
      // 保证只有出现一个.而没有多个.
      this.$set(this.form,key,this.form[key].replace(/\.{2,}/g, "."));
      //保证.只出现一次，而不能出现两次以上
      this.$set(this.form,key,this.form[key].replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
      //小数只能输入后两位
      this.$set(this.form,key,this.form[key].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
    },
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
              //如果是添加操作，验证机位唯一性
              if(this.type == 'add'){
                request({
                url:'/mms-parameter/rest-api/electronicFence/queryByParkingNo',
                method: "post",
                data: {parkingNo : this.form.parkingNo}
              }).then(data=>{
                if(data.code===200 && data.data.length > 0){
                  this.$message.warning('机位已配置!')
                  return false;
                }
                let url = `${this.$ip}/mms-parameter/rest-api/electronicFence/add`
                request({
                  url,
                  method: "post",
                  data: this.form
                }).then(data => {
                  this.$message.success("保存成功！");
                  this.$parent.selectId = null;
                  this.$router.go(-1);
                })
                .catch(error => {
                  this.$message.success(error);
                });
              });
            }else if(this.type == 'edit'){
              let url = `${this.$ip}/mms-parameter/rest-api/electronicFence/update`
              request({
                url,
                method: "post",
                data: {...this.form,id:this.$route.query.id}
              }).then(data => {
                if(data.code == 200){
                  this.$message.success("保存成功！");
                  this.$parent.selectId = null;
                  this.$router.go(-1);
                }
              }).catch(error => {
                this.$message.success(error);
              });
            }
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
.addElectronicFence {
  margin-top: 40px;
   .el-form {
      width: 1000px;
      /deep/ .el-form-item__label {
        width: 155px;
        text-align: right !important;
      }
      /deep/ .el-form-item__content {
        margin-left: 155px;
      }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 336px;
            text-align: left;
        }
        @include common-input;

        /deep/ .el-form-item {
            &:last-child {
              margin-left:10px;
            }
        }

      }
      .row_item_row{
        .el-form-item {
          width: calc(100% - 155px);
        }
      }
  }
}
</style>
