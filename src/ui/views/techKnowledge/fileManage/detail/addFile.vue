<template>
	<div class="addSysParameter">
		<div class="top-content">
			<div class="top-content-title">
				<span>文件-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
			</div>
			<div class="top-toolbar">
				<div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''" v-if="type!=='info'">
					<icon iconClass="save"></icon>
					保存
				</div>
				<div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''" v-if="type!=='info'">
					<icon iconClass="reset"></icon>
					重置
				</div>
			</div>
		</div>
		<div class="upload_box" v-if="type!='info'">
			<el-upload
					class="upload_demo"
					ref="upload"
					:on-success='fileUploadSuccessFn'
					:on-remove='fileRemoveFn'
					:before-upload='beforeUploadFn'
					drag
					:action='$ip+"/mms-file/upload2"'
			>
				<i class="el-icon-upload"></i>
				<div class="el-upload__text">点击或将文件拖拽到这里上传</div>
				<div class="el-upload__tip" slot="tip">支持扩展名：.rar .zip .doc .docx .pdf .jpg...</div>
			</el-upload>
		</div>

		<div :class=" type=='info'?'G_form G_formInfo':'G_form'">
			<el-form label-position="right" :model="form" :rules="rules" ref="form" :inline="true">
				<div class="row_one">
					<el-form-item label="文档名称：" prop="fileName">
						<span v-if="type=='info'">{{form.fileName}}</span>
						<el-input v-else v-model="form.fileName" readonly
								  placeholder="自动获取上传文件的名称，同文件夹下不可重复"></el-input>
					</el-form-item>
				</div>
				<div class="row_one">
					<el-form-item label="文档编号：" prop="number">
						<span v-if="type=='info'">{{form.number}}</span>
						<el-input :disabled="type=='edit'" v-else v-model="form.number" placeholder="请输入文档编号"></el-input>
					</el-form-item>
				</div>
				<div class="row_one">
					<el-form-item label="是否公开：" prop="open">
						<span v-if="type=='info'">{{form.open?'公开':'不公开'}}</span>
						<el-radio-group v-model="form.open" @change="openC">
							<el-radio :label="false">不公开</el-radio>
							<el-radio :label="true">公开</el-radio>
						</el-radio-group>
					</el-form-item>
				</div>
				<div class="row_one">
					<el-form-item label="发行单位：" prop="issueDeptId">
						<span v-if="type=='info'">{{form.issueDept}}</span>
						<el-select v-else clearable v-model="form.issueDeptId" placeholder="请选择发行单位">
							<el-option v-for='item in issueDeptArr' :key='item.valCode' :label="item.valData"
									   :value="item.valCode"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div class="row_one">
					<el-form-item label="所属岗位：" prop="position">
						<span v-if="type=='info'">{{form.position}}</span>
						<el-select v-else clearable v-model="form.position" placeholder="请输入所属岗位" >
							<el-option v-for='item in positionArr' :key='item.valCode' :label="item.valData"
									   :value="item.valData"></el-option>
						</el-select>
					</el-form-item>
				</div>
				<div :class="this.type=='add'?'row_one aRow_custom':'row_one'">
					<el-form-item label="有效日期：" prop="time">
						<span v-if="type=='info'">{{form.startTime | formatDate}}-{{form.endTime | formatDate}}</span>
						<el-date-picker
								v-else
								v-model="form.time"
								type="daterange"
								range-separator="至"
								start-placeholder="开始日期"
								end-placeholder="结束日期"
						style="width: 100%">
						</el-date-picker>
					</el-form-item>
				</div>
				<div class="row_one" v-if='type=="add"'>
					<el-form-item label="阅读推送：">
						<el-input v-model="form.description" readonly type="textarea" :rows="3"
								  placeholder="请输入阅读推送"></el-input>
					</el-form-item>
				</div>
				<div class="row_tow" v-if='type=="add"'>
					<el-form-item label=" ">
						<el-button :disabled="form.open" type="primary" @click="choiceSelectFn">对象选择({{selectedPersonList.length}})
						</el-button>
					</el-form-item>
				</div>
			</el-form>
		</div>
		<br>
		<!--        <div class="list2"  v-if='type=="add"'>-->
		<!--            <span class="text">已选{{selectedPersonList.length}}对象</span><el-button type="primary" @click="choiceSelectFn">对象选择</el-button>-->
		<!--        </div>-->
		<userTree ref="userBox" @onSelected="handleUserSelected"></userTree>
	</div>
</template>
<script>
	import userTree from '@components/userTree/index';
	import Icon from "@components/Icon-svg/index";
	import request from "@lib/axios.js";
	import moment from 'moment'

	export default {
		components: {
			Icon,
			userTree
		},
		filters: {
			formatDate(val, format = 'YYYY-MM-DD') {
				var val = Number(val);
				if (!isNaN(val)) {
					return moment(val).format(format)
				} else {
					return ''
				}

			}
		},
		name: "",
		data() {
            const checkNumber = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('文档编号不能为空'));
                } else {
                    request({
                        url:`${this.$ip}/mms-knowledge/file/numberExists`,
                        method: 'post',
						data:{
                            fileName:this.form.fileName,
                            issueDeptId:this.form.issueDeptId,
                            number:this.form.number,
                            folderId:this.$route.query.folderId,
						}
                    }).then(response => {
                        console.log(response,10);
                        if (!response.data) {
                            callback();
                        } else {
                            callback("该文档编号已存在");
                        }
                    });
                }
            };
			return {
				oldForm: {},
				form: {
				    open:false,
					fileName: '',
					description: '',
					issueDept: '',
					position: '',
					folderId: '',
					fileUrl: '',
					issueDeptId: '',
					startTime: '',
					endTime: '',
					formats: '',
					size: '',
					time: []
				},
				issueDeptArr: [],
				positionArr: [],
				rules: {  // 维修部 - 维修- 放行     勤务部 -> 勤务
                    number: [{ validator:checkNumber, trigger: "blur",required:true }],
                    issueDeptId: [{required: true, message: '请选择发行单位', trigger: "change"}],
					position: [{required: true, message: '请输入所属岗位', trigger: "change"}],
					fileName: [{required: true, message: '请上传文件名称', trigger: "change"}],
					time: [{required: true, message: '请选择时间', trigger: "change"}],
					description: [{required: true, message: '请输入阅读推送', trigger: "change"}]
				},
				type: "add",
				selectedPersonList: [],
				deptList: [],
				users: []
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
				if (this.type != 'add') {
					// let row=JSON.parse( this.$route.query.data)
					// this.form={...row}
					this.getFileInfo()
				}
			}
			request({
				url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
				method: 'post',
				data: ["issueDept", "position",]
			}).then(d => {
				if (d.code == 200) {
					this.issueDeptArr = d.data.issueDept
					this.positionArr = d.data.position
				} else {
					this.issueDeptArr = []
					this.positionArr = []
				}
			})
		},
		methods: {
            openC(val){
                this.selectedPersonList = []
				this.$set(this.form,'description','')
             },
			getFileInfo() {
				request({
					url: `${this.$ip}/mms-knowledge/file/getById/${this.$route.query.id}`,
					method: 'get'
				}).then(d => {
					console.log(d)
					if (d.code == 200) {
						let data = d.data
						this.form = {
							...data,
							time: [data.startTime, data.endTime]
						}
					} else {
						this.$message({
							showClose: true,
							message: '获取文件信息错误',
							type: 'error'
						});
						return
					}

				})
			},


			choiceSelectFn() {
				this.$refs.userBox.open(this.users, '选择推送对象', true);
			},
			handleUserSelected(selectedPersonList, deptList) {
				this.selectedPersonList = selectedPersonList
				this.deptList = deptList
				this.form.description = this.selectedPersonList.map(item => item.name).join(",")
			},
			resetForm() {
				if (this.form.id) {
					this.form = {id: this.form.id,time: [],open:false,number:this.form.number};
				} else {
					this.form = {open:false,time: []};
				}
			},
            fileExists(){
               return new Promise((resolve,reject)=>{
                    request({
                        url: `${this.$ip}/mms-knowledge/file/fileExists`,
                        method: 'post',
                        data: {
                            fileName:this.form.fileName,
                            issueDeptId:this.form.issueDeptId,
                            number:this.form.number,
                            folderId:this.$route.query.folderId,
                        },
                    }).then((d)=>{
                        resolve(d.data)
                    })
				})

			},
				saveRequest(){
                    let url
                    let data
                    if (this.type == 'add') {
                        url = '/file/save'
                        let select = this.selectedPersonList.map(item => {
                            return {
                                userId: item.id,
                                userName: item.name
                            }
                        })
                        this.form.startTime = this.form.time[0]
                        this.form.endTime = this.form.time[1]
                        this.form.issueDept = this.issueDeptArr.find(item => item.valCode == this.form.issueDeptId).valData
                        data = {
                            fileParam: {
                                ...this.form,
                                folderId: this.$route.query.folderId,
                            },
                            userVOList: select
                        }
                    } else {
                        url = '/file/update'
                        this.form.startTime = this.form.time[0]
                        this.form.endTime = this.form.time[1]
                        this.form.issueDept = this.issueDeptArr.find(item => item.valCode == this.form.issueDeptId).valData
                        data = {
                            id: this.$route.query.id,
                            ...this.form,

                        }
                    }
                    delete data.time
                    request({
                        url: `${this.$ip}/mms-knowledge${url}`,
                        method: 'post',
                        data: data,
                    }).then((data) => {
                        if (data.code == 200) {
                            this.$message.success("保存成功！");
                            this.$router.go(-1)
                        } else {
                            this.$message({
                                showClose: true,
                                message: '文件保存失败',
                                type: 'error'
                            });
                            return
                        }
                    })
				},
			  saveForm(form) {
				  this.$refs[form].validate(valid => {
						if (valid) {
						    if(this.type=='edit'){
                                this.saveRequest()
							}else if(this.type=='add'){
                                this.fileExists().then((d)=>{
                                    if(d){
                                        this.$confirm('该文件重复，是否把该文件设为新版本？', '提示', {
                                            confirmButtonText: '确定',
                                            cancelButtonText: '取消',
                                            type: 'warning',
                                        }).then((d)=>{
                                            this.saveRequest()
                                        }).catch((d)=>{
                                        })
                                    }else{
                                        this.saveRequest()
                                    }
                                })
							}

						}
					});
			},
			fileExistsFn(fileName) {
				return new Promise((resolve, reject) => {
					request({
						url: `${this.$ip}/mms-knowledge/file/nameExists`,
						method: 'post',
						data: {
							fileName,
							folderId: this.$route.query.folderId
						}
					}).then(d => {
						if (d.code == 200 && !d.data) {
							resolve()
						} else {
							this.$confirm('文件名字重复，是否继续?', '提示', {
								confirmButtonText: '确定',
								cancelButtonText: '取消',
								type: 'warning'
							}).then(() => {
								resolve()
							}).catch(() => {
								this.$message({
									type: 'info',
									message: '已取消成功'
								});
								reject()
							});
							return

						}
					})
				})
			},
			fileUploadSuccessFn(response, file, fileList) {
				if (response.code == 200) {
				
					this.form={
						...this.form,
                        fileName:response.data.fileName,
                        formats:response.data.fileSuffix,
                        fileUrl:response.data.filePath,
                        size:file.size,
					}
				} else {
					this.$message({
						showClose: true,
						message: '文件上传失败',
						type: 'error'
					});
				}
			},
			fileRemoveFn(file, fileList) {
				this.form.fileName = ''
				this.form.formats = ''
				this.form.folderId = ''
				this.form.fileUrl = ''
				this.form.size = ''
			},
			async beforeUploadFn(file) {
				// await this.fileExistsFn(file.name)
			}
		}
	};
</script>
<style scoped lang="scss">
	@import "@/ui/styles/common_form.scss";

	.main-content {
		overflow-y: auto;
		margin-top: 30px !important;
		.aRow_custom {
			text-align: left;
		}
	}

	.addSysParameter {
		width: 1200px;
		margin: 14px auto 0;
		text-align: center;

		.upload_box {
			width: 600px;
			text-align: center;
			margin: 15px auto;
			.upload_demo {
 				margin: 0 auto;
				text-align: center;
			}
		}
	}

	/deep/ .el-upload-dragger {
		width: 600px;
		height: 200px;
	}

	/deep/ .G_form {
		margin-top: 20px;
		.el-form {
			width: 600px;
			padding: 0;
			.el-form-item__label{
				padding: 0 ;
			}
			.el-form-item__label {
				width: 110px !important;
			}
			.el-form-item__content {
				text-align: left;
				width: calc(100% - 110px) !important;

			}
		}
	}
</style>
