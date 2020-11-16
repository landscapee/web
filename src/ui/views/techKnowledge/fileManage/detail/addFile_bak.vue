<template>
    <div class="index">
        <div class='inner'>
            <div class='top_content'>
                <div class='header'><span>文件-新增</span></div>
                <div class="top-toolbar">
                    <div >
                        <icon iconClass="save"></icon>保存
                    </div>
                    <div >
                        <icon iconClass="reset"></icon>重置
                    </div>
                </div>
                <div class="upload_box">
                    <el-upload
                        class="upload_demo"
                        ref="upload"
                        drag
                        action="https://jsonplaceholder.typicode.com/posts/"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">点击或将文件拖拽到这里上传</div>
                        <div class="el-upload__tip" slot="tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
                    </el-upload>
                </div>
                <div class="form_content">
                        <div class="list1">
                            <div class="item">
                                <div class="label">
                                    文档名称:
                                </div>
                                <div class="label_value">
                                    <el-input readonly placeholder="自动获取上传文件的名称，同文件夹下不可重复" style="width:700px;" v-model="ruleForm.fileName"></el-input>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="list1">
                            <div class="item">
                                <div class="label">发行单位:</div>
                                <div class="label_value">
                                    <el-select v-model="ruleForm.issueDept" placeholder="请选择发行单位" style='width:310px'>
                                        <el-option label="维修部" value="1"></el-option>
                                    </el-select>
                                </div>
                            </div>
                            <div class="item">
                                <div class="label">所属岗位:</div>
                                <div class="label_value">
                                    <el-select v-model="ruleForm.issueDept" placeholder="请选择发行单位" style='width:310px'>
                                        <el-option label="维修部" value="1"></el-option>
                                    </el-select>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="list1">
                            <div class="item">
                                <div class="label">
                                    <div class="label">所属岗位:</div>
                                </div>
                                <div class="label_value">
                                    <el-date-picker
                                        style="width:310px"
                                        v-model="ruleForm.time"
                                        type="daterange"
                                        range-separator="至"
                                        start-placeholder="开始日期"
                                        end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>

                            </div>

                        </div>
                        <br>
                        <div class="list1">
                            <div class="item">
                                <div class="label">
                                    文档名称:
                                </div>
                                <div class="label_value">
                                    <el-input type='textarea' rows='3' style="width:700px;" v-model="ruleForm.fileName"></el-input>
                                </div>
                            </div>
                        </div>
                        <br>
                        <div class="list2">
                            <span class="text">已选{{selectedPersonList.length}}对象</span><el-button type="primary" @click="choiceSelectFn">对象选择</el-button>
                        </div>
                </div>

            </div>
        </div>
        <userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
    </div>
</template>
<script>
    import userTree from '@components/userTree/index';
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import { extend } from "lodash";
    export default {
        components: {
            Icon,
            userTree
        },
        data() {
            return {
                ruleForm: {
                    fileName: '',
                    issueDept: '',
                    startTime: '',
                    endTime: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: '',
                    time:'',
                    users:[],
                },
                selectedPersonList:[],
                deptList:[]
            };
        },
        mounted(){

        },
        methods: {
            choiceSelectFn(){
                this.$refs.userBox.open(this.users, '选择推送对象', true);
            },
            handleUserSelected(selectedPersonList,deptList){
                this.selectedPersonList = selectedPersonList
                this.deptList = deptList
                console.log(selectedPersonList)
                console.log(deptList)
            },
            submitForm() {

            },
        }
    };
</script>
<style scoped lang="scss">
@import "@/ui/styles/common_form.scss";
    .inner{
        .top_content{
            padding-top: 20px;
            position: relative;
            padding-bottom: 20px;
            .header{
                margin: 0 auto;
                margin-bottom: 30px;
                text-align: center;
                width: 271px;
                font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                font-weight:500;
                color:rgba(34,34,34,1);
                height:24px;
                line-height:24px;
                span{
                    font-size:24px ;
                }
            }
            .top-toolbar{
                position: absolute;
                right: 0px;
                .isDisabled{
                    background: rgba(208,208,208,1);
                    color: #6A7785;
                    cursor: not-allowed;
                    .svg-icon{
                        fill: rgba(208,208,208,1);
                    }
                }
                div{
                    user-select: none;
                    cursor: pointer;
                    display: inline-flex;
                    justify-content: center;
                    align-items: center;
                    height: 32px;
                    line-height: 32px;
                    padding: 7px;
                    border-radius:2px;
                    border:1px solid rgba(208,208,208,1);
                    margin-right: 12px;
                    color: #3D568E;
                    &:last-child{
                        margin-right: 30px;
                    }
                    .svg-icon{
                        height:18px;
                        width:18px;
                        margin-right: 4px;
                        vertical-align: text-top;
                        fill: #3D568E;
                    }
                }
            }
            .upload_box{
                width:100%;
                .upload_demo{
                    width:300px;
                    margin:0 auto;
                    text-align:center;
                }
            }
            .form_content{
                margin:30px auto;
                width:975px;
                .list1{
                    display:flex;
                   .item{
                       display:flex;
                       align-items: center;
                        .label{
                            width:100px;
                            text-indent: 1em;
                        }
                        .label_value{
                            flex:1;
                        }
                   }
                }
                .list2{
                    display:flex;
                    align-items: center;
                    justify-content: flex-end;
                    .text{
                        margin-right:10px;
                    }
                }

            }
        }
    }
</style>


