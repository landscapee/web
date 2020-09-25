<template>
  <div class="addElectronicFence">
    <div class="top-content">
      <div class="top-content-title">
        <span>机位电子围栏-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
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
        <div class="row_item_row row_item">
          <el-form-item label="机位号：" prop="parkingNo">
            <span v-if="type=='info'">{{form.parkingNo}}</span>
            <el-input v-else v-model="form.parkingNo" placeholder="请输入机位号"></el-input>
          </el-form-item>
        </div>
        <div class="row_custom">
          <el-form-item label="定点经度：" prop="longitude">
            <span v-if="type=='info'">{{form.longitude}}</span>
            <el-input v-else v-model.number="form.longitude" placeholder="请输入定点经度"></el-input>
          </el-form-item>
          <el-form-item label="定点纬度：" prop="latitude">
            <span v-if="type=='info'">{{form.latitude}}</span>
            <el-input v-else v-model.number="form.latitude" placeholder="请输入定点纬度"></el-input>
          </el-form-item>
        </div>
        <div class="row_custom">
          <el-form-item label="定点半径：" prop="radius">
            <span v-if="type=='info'">{{form.radius}}</span>
            <el-input v-else v-model.number="form.radius" placeholder="请输入定点半径"></el-input>
          </el-form-item>
          <el-form-item label="允许最大误差值：" prop="maxError">
            <span v-if="type=='info'">{{form.maxError}}</span>
            <el-input v-else v-model.number="form.maxError" placeholder="请输入允许最大误差值"></el-input>
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
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/mms-parameter/rest-api/electronicFence/add`:`${this.$ip}/mms-parameter/rest-api/electronicFence/update`
            request({
              url,
              method: "post",
              data: this.type == "edit"?{...this.form,id:this.$route.query.id}:this.form
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
.addElectronicFence {
  margin-top: 40px;
   .el-form {
      width: 1000px;
      /deep/ .el-form-item__label {
        width: 155px;
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
