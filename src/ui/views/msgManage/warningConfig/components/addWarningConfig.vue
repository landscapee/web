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
          <el-form-item label="消息名称：" prop="subject">
            <span v-if="type=='info' || type=='edit' ">{{form.subject}}</span>
            <el-input v-if="type=='add'" v-model="form.subject" placeholder="请输入消息名称"></el-input>
          </el-form-item>
          <el-form-item label="推送对象：" >
            <span v-if="type=='info'">{{selectPushObject.join(",")}}</span>
            <el-select v-else  v-model="selectPushObject" multiple placeholder="请选择推送对象">
                <el-option v-for="item in pushObject" :key="item.valCode" :label="item.valData" :value="item.valCode"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="row_item_row row_item">
          <el-form-item label="消息模板：" prop="contentTemplate">
            <span v-if="type=='info'">{{form.contentTemplate}}</span>
            <el-input v-else v-model="form.contentTemplate" placeholder="请输入消息模板"></el-input>
          </el-form-item>
        </div>
        <div class="row_custom2">
          <el-form-item label="人员：" >
              <el-button @click="userOpen('user')" size="mini" icon="el-icon-plus">选择人员</el-button>
							<div class="tagBox">
								<el-scrollbar style="height:100px">
									<el-tag :key="tag.id" v-for="tag in userList" closable :disable-transitions="false" @close="handleClose('userList',tag)">
										{{ tag.name }}
									</el-tag>
								</el-scrollbar>
							</div>
          </el-form-item>
          <el-form-item label="岗位：" >
            <el-button @click="userOpen('station')" size="mini" icon="el-icon-plus">选择岗位</el-button>
							<div class="tagBox">
								<el-scrollbar style="height:100px">
									<el-tag :key="tag.id" v-for="tag in stationList" closable :disable-transitions="false" @close="handleClose('stationList',tag)">
										{{ tag.name }}
									</el-tag>
								</el-scrollbar>
							</div>
          </el-form-item>
        </div>
        <div class="row_custom2">
           <el-form-item label="角色：" >
              <el-button @click="userOpen('role')" size="mini" icon="el-icon-plus">选择岗位</el-button>
							<div class="tagBox">
								<el-scrollbar style="height:100px">
									<el-tag :key="tag.id" v-for="tag in roleList" closable :disable-transitions="false" @close="handleClose('roleList',tag)">
										{{ tag.name }}
									</el-tag>
								</el-scrollbar>
							</div>
           </el-form-item>
           <el-form-item label="部门：" >
              <el-button @click="userOpen('dept')" size="mini" icon="el-icon-plus">选择岗位</el-button>
							<div class="tagBox">
								<el-scrollbar style="height:100px">
									<el-tag :key="tag.id" v-for="tag in deptList" closable :disable-transitions="false" @close="handleClose('deptList',tag)">
										{{ tag.name }}
									</el-tag>
								</el-scrollbar>
							</div>
           </el-form-item>
        </div>
      </el-form>
    </div>
    <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
    <stationTree ref="stationBox" @onSelected="handleStationSelected"></stationTree>
    <roleTree ref="roleBox" @onSelected="handleRoleSelected"></roleTree>
    <deptTree ref="deptBox" @onSelected="handleDeptSelected"></deptTree>
  </div>
</template>
<script>
import roleTree from '@components/roleTree/index';
import stationTree from '@components/stationTree/index';
import deptTree from '@components/deptTree/index';
import userTree from '@components/userTree/index';
import Icon from "@components/Icon-svg/index";
import request from "@lib/axios.js";
import { extend,without } from "lodash";
export default {
  components: {
    Icon,
    userTree,
    deptTree,
    roleTree,
    stationTree
  },
  name: "",
  data() {
    return {
      form: {},
      recipients:[],
      rules: {
        subject: [{ required: true, message: "请输入消息名称", trigger: "change" }],
        contentTemplate: [{ required: true, message: "请输入消息模板", trigger: "change" }],
      },
      type: "add",
      users:[],
      userList:[],
      stationList:[],
      deptList:[],
      roleList:[],
      relationList:[],
      pushObject:[],
      selectPushObject:[]
    };
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
                url:`${this.$ip}/mms-warning/warningTemplate/getById/${this.$route.query.id}`,
                method: "get",
              })
              .then(data => {
                this.form = {subject:data.data.subject,contentTemplate:data.data.contentTemplate} ;
                this.selectPushObject = data.data.recipientType.find((item) =>item.type==='relation').value.map(item=>item.name);
                this.userList = data.data.recipientType.find((item) =>item.type==='selected').value;
                this.stationList = data.data.recipientType.find((item) =>item.type==='job').value;
                this.deptList = data.data.recipientType.find((item) =>item.type==='department').value;
                this.roleList = data.data.recipientType.find((item) =>item.type==='role').value;
              })
              .catch(error => {
                this.$message.success(error);
              });
          }
    }
  },
  methods: {
    findDataDictionary(){
        request({
          url:`${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
          method: "post",
          data: ["pushObject"]
        })
        .then(data => {
          this.pushObject = data.data["pushObject"];
        })
        .catch(error => {
          this.$message.success(error);
        });
    },
    handleClose(list,tag) {
			this[list] = without(this[list], tag);
		},
    userOpen(tag){
      if(tag=='user'){
         this.$refs.userBox.open(this.users, '选择人员', true);
      }else if(tag=='dept'){
         this.$refs.deptBox.open({id:this.$store.getters.userInfo.id});
      }else if(tag=='role'){
         this.$refs.roleBox.open({id:this.$store.getters.userInfo.id});
      }else if(tag=='station'){
        //  this.$refs.stationBox.open({id:this.$store.getters.userInfo.id});
      }
    },
    handleDeptSelected(depts){
      this.deptList = depts.map((item) => ({ id: item.id, name: item.name }));
    },
    handleStationSelected(stations){
       this.stationList = stations.map((item) => ({ id: item.id, name: item.name }));
    },
    handleRoleSelected(roles){
       this.roleList = roles.map((item) => ({ id: item.id, name: item.name }));
    },
    handleUserSelected(users) {
      this.userList = users.map((item) => ({ id: item.id, name: item.name }));
		},
    resetForm(){
      this.form={};
    },
    saveQualifications() {
      if (this.type == "add" || this.type == "edit") {
        this.$refs.form.validate(valid => {
          if (valid) {
           let url = this.type == "add"?`${this.$ip}/mms-warning/warningTemplate/save`:`${this.$ip}/mms-warning/warningTemplate/update`
           let pushObject = [];
           this.pushObject.map((item,index)=>{
             this.selectPushObject.map((item2,index2)=>{
               if(this.pushObject[index].valCode==this.selectPushObject[index2]){
                 pushObject[index] = {id:this.pushObject[index].valCode,name:this.pushObject[index].valData}
               }
             })
           });
           let content = {recipientType:[{type:"department",value:this.deptList},{type:"job",value:this.stationList},{type:"role",value:this.roleList},{type:"selected",value:this.userList},{type:"relation",value:pushObject}]} 
           request({
              url,
              method: "post",
              data: this.type == "edit"?{...this.form,id:this.$route.query.id,...content}:{...this.form,...content}
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
        width: 100px;
      }
      /deep/ .el-form-item__content {
        margin-left: 100px;
      }
      .row_custom2{
        height: 166px;
        /deep/ .el-form-item__content{
            height: 40px;
            width:395px;
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
            width: 369px;
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
          width: calc(100% - 100px);
        }
      }
  }
}
</style>