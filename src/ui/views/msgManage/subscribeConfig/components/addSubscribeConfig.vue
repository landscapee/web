<template>
  <div class="addSysParameter">
    <div class="top-content">
      <div class="top-content-title">
        <span>信息订阅配置-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
      </div>
      <div class="top-toolbar">
        <div v-if="type!='info'"  @click="type!='info'?saveQualifications():()=>{}" :class="type=='info'?'isDisabled':''">
          <icon iconClass="save"></icon>保存
        </div>
        <div v-if="type!='info'"  @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
          <icon iconClass="reset"></icon>重置
        </div>
      </div>
    </div>
    <div class="main-content">
      <el-form label-position="right" :model="form" :rules="rules" ref="form" >
        <div class="row_custom3">
           <el-form-item label="订阅名称：" prop="name">
            <span v-if="type=='info'">{{form.name}}</span>
            <el-input v-else v-model="form.name" placeholder="请输入订阅名称"></el-input>
          </el-form-item>
        </div>
        <div class="row_custom">
          <el-form-item label="信息类型：" prop="type">
            <span v-if="type=='info'">{{form.type}}</span>
            <el-select v-else  v-model="form.type"  placeholder="请选择信息类型">
                <el-option v-for="item in infoType" :key="item.valCode" :label="item.valData" :value="item.valData"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="是否启用：" prop="enable">
            <span v-if="type=='info'">{{form.enable?'是':'否'}}</span>
            <el-select v-else  v-model="form.enable"  placeholder="请选择是否启用">
                <el-option v-for="item in [{label:'是',value:true},{label:'否',value:false}]" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_custom2">
          <el-form-item label="人员：" >
              <el-button @click="userOpen()" size="mini" icon="el-icon-plus">选择人员</el-button>
							<div class="tagBox">
								<el-scrollbar style="height:100px">
									<el-tag :key="tag.id" v-for="tag in userList" closable :disable-transitions="false" @close="handleClose('userList',tag)">
										{{ tag.name }}
									</el-tag>
								</el-scrollbar>
							</div>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
  </div>
</template>
<script>
    import {eleDateShow,inputLength} from '@lib/tools'

    import Icon from "@components/Icon-svg/index";
import request from "@lib/axios.js";
import userTree from '@components/userTree/index';
import { extend, without} from "lodash";
export default {
  components: {
    Icon,
    userTree,
  },
  name: "",
  data() {
    return {
      form: {},
      rules: {
        name: [{ required: true, message: "请输入订阅名称", trigger: "change" },
          {
            validator: (rule, value, callback) => {
              let flag = false;
               request({
                url:`${this.$ip}/mms-notice/notificationSubscribe/checkName`,
                method: "get",
                params:{name:value}
              })
              .then(data => {
                if(data.data){
                   flag = false;
                }else{
                   flag = true;
                }
              }).catch(error => {
                this.$message.error(error);
              });
              if (this.nowValue == value) {
								callback();
							} else if (flag) {
								callback(new Error('该名称已存在'));
							} else {
								callback();
							}
            },
            trigger: 'change',
					},
        ],
        type: [{ required: true, message: "请选择信息类型", trigger: "change" }],
        enable: [{ required: true, message: "请选择是否启用", trigger: "change" }],
      },
      type: "add",
      userList:[],
      infoType:[],
      deptList:[],
      nowValue: null,
    };
  },
  created() {
     this.findDataDictionary();
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
                url:`${this.$ip}/mms-notice/notificationSubscribe/getById/${this.$route.query.id}`,
                method: "get",
              })
              .then(data => {
                 this.nowValue = data.data.name;
                 this.form = {type:data.data.type,enable:data.data.enable,name:data.data.name} ;
                 this.userList = data.data.receiptPerson;
                 this.deptList = data.data.receiptDepartment;
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
    findDataDictionary(){
        request({
          url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
          method: "post",
          data: ["infoTypeCode"]
        })
        .then(data => {
          this.infoType = data.data["infoTypeCode"];
        })
        .catch(error => {
          this.$message.success(error);
        });
    },
    handleUserSelected(users,deptList) {
        console.log(users, deptList,12);
        this.userList = users.map((item) => ({ id: item.id, name: item.name }));
      // 数组去重
      let hash = {};
      this.deptList = deptList.reduce(function(item, next) {
        if (!hash[next.id]) {
          hash[next.id] = true;
          item.push(next);
        }
        return item;
      }, []);
		},
    handleClose(list,tag) {
			this[list] = without(this[list], tag);
		},
    userOpen(){
      this.$refs.userBox.open(this.userList, '选择人员', true);
    },
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
            let url = this.type == "add"?`${this.$ip}/mms-notice/notificationSubscribe/save`:`${this.$ip}/mms-notice/notificationSubscribe/update`
            request({
              url,
              method: "post",
              data: this.type == "edit"?{...this.form,id:this.$route.query.id,receiptPerson:this.userList,receiptDepartment: this.deptList}:{...this.form,receiptPerson:this.userList,receiptDepartment: this.deptList}
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
      /deep/ .el-form-item__label {
        width: 110px;
      }
      /deep/ .el-form-item__content {
        margin-left: 110px;
      }
      .row_custom3{
         /deep/ .el-form-item__content{
            height: 40px;
            width: 900px;
            text-align: left;
        }
        @include common-input;
        /deep/ span{
          font-size:12px!important;
          margin-left: 5px!important;
        }
      }
      .row_custom2{
        height: 166px;
        /deep/ .el-form-item__content{
            height: 40px;
            width: 900px;
            text-align: left;
        }
        @include common-input;
        /deep/ span{
          font-size:12px!important;
          margin-left: 5px!important;
        }
      }
      .row_custom{
        /deep/ .el-form-item__content{
            height: 40px;
            width: 387px;
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
          width: calc(100% - 110px);
        }
      }
  }
}
</style>
