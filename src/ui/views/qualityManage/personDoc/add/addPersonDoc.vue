<template>
	<div>
  		<router-view v-if="getUrlBlo('inOfficeInfoAdd')" :key="$route.path"></router-view>
  		<router-view v-else-if="getUrlBlo('workExperienceAdd')" :key="$route.path"></router-view>
  		<router-view v-else-if="getUrlBlo('certificateAdd')" :key="$route.path"></router-view>
		<router-view v-else-if="getUrlBlo('unsafeAdd')" :key="$route.path"></router-view>
		<router-view v-else-if="getUrlBlo('workStyle')" :key="$route.path"></router-view>
		<div class="addPersonDoc" ref="export" style="width: 100%;" v-else>
			<div class="QCenterRight" style="margin-right: 30px">
				<div class="QHead">
					{{type!=='add'?form.userName:''}}人员档案-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
				</div>
				<div v-if="type!='info'" class="QheadRight">

					<div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''">
						<icon iconClass="save"></icon>
						保存
					</div>
					<div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
						<icon iconClass="reset"></icon>
						重置
					</div>
				</div>
				<div class="QheadRight" v-if="type=='info'">
					<div @click="exportWord">
						<icon iconClass="export"></icon>
						导出Word
					</div>
				</div>

			</div>

			<div class="G_form1" style="overflow: auto ; height:calc(100vh - 270px);">
				<el-form ref="form" label-position="right" :model="form" :rules="rules" :inline="true">
					<table class="nomTable">
						<tr>
							<td class="fTd ">员工编号</td>
							<td class="tTd">
								<el-form-item prop=" ">
                                    <span v-if="type=='info'">
                                        	<el-tooltip v-if="form.userNumber" class="item" effect="dark" :enterable="false"
														:content="form.userNumber" placement="top-start">
												<div>{{ form.userNumber }}</div>
											</el-tooltip>
                                     </span>
									<el-select @change="userNameC" filterable :disabled="type=='edit'" v-else
											   v-model="form.userNumber" placeholder="请选择员工编号">
										<el-option v-for="(opt,index) in userArr" :key="index" :label="opt.workNumber"
												   :value="opt.id">
											<span>{{opt.workNumber||'[无编号]'}}({{opt.name}})</span>
											<span></span>
										</el-option>
									</el-select>
								</el-form-item>

							</td>
							<td class="fTd is-required1">员工姓名</td>
							<td class="tTd">
								<el-form-item prop="userName">
                                    <span v-if="type=='info'">
                                     <el-tooltip v-if="form.userName" class="item" effect="dark" :enterable="false"
												 :content="form.userName" placement="top-start">
                                        <div>{{ form.userName }}</div>
                                    </el-tooltip>
                                    </span>
									<el-select @change="userNameC" :disabled="type=='edit'" filterable v-else
											   v-model="form.userName" placeholder="请选择员工姓名">
										<el-option v-for="(opt,index) in userArr" :key="index" :label="opt.name"
												   :value="opt.id">
											<span>{{opt.name}}({{opt.workNumber||'[无编号]'}})</span>

										</el-option>
									</el-select>
								</el-form-item>


							</td>
							<td class="fTd">民族</td>
							<td class="tTd">
                                <span v-if="type=='info'">
                                    <!--{{form.nation}}-->
                                 <el-tooltip v-if="form.nation" class="item" effect="dark" :enterable="false" :content="form.nation"
											 placement="top-start">
												<div>{{ form.nation }}</div>
                                    </el-tooltip>
                                </span>
								<el-input v-else v-model="form.nation" placeholder="请输入民族"></el-input>
							</td>
							<td class="sTd" rowspan="3" style="width: 130px">
								<div v-if="type=='info'" class="upUser  ">
                                    <span v-if="!form.photo">
                                     相片上传
                                </span>
									<img id="myimg" v-else :src=" form.photoPath" alt="">
								</div>
								<div v-else class="upUser G_cursor" @click="upUserPho">
                                <span v-if="!form.photo">
                                     相片上传
                                </span>
									<img v-else :src=" form.photoPath" alt="">

								</div>
								<UploadFile style="display:none"
											accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf,image/png,image/jpg,image/jpeg"
											ref="upUserPho" @getFile="getFile"></UploadFile>


							</td>
						</tr>
						<tr>
							<td class="fTd">身份证号</td>
							<td class="tTd">
								<span >{{form.idCard}}</span>
								<!--<el-form-item v-else prop="idCard">-->
									<!--<el-input v-model="form.idCard" placeholder="请输入身份证号"></el-input>-->
								<!--</el-form-item>-->
							</td>
							<td class="fTd">性别</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.sex}}</span>
								<!--                                <el-input v-else v-model="form.sex" placeholder="请输入性别"></el-input>-->
								<el-select v-else v-model="form.sex" clearable placeholder="请选择性别">
									<el-option v-for="item in sexOptions" :key="item.value" :value="item.value"
											   :label="item.label"></el-option>
								</el-select>
							</td>
							<td class="fTd">籍贯</td>
							<td class="sTd">
								<span v-if="type=='info'">{{form.nativePlace}}</span>
								<el-input v-else v-model="form.nativePlace" placeholder="请输入籍贯"></el-input>
							</td>

						</tr>
						<tr>
							<td class="fTd">入党日期</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.membershipTime?this.$moment(form.membershipTime).format('YYYY-MM-DD'):''}}</span>
								<el-date-picker type="date" v-else v-model="form.membershipTime"
												placeholder="请选择入党日期"></el-date-picker>

							</td>
							<td class="fTd">入职日期</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.entryTime?this.$moment(form.entryTime).format('YYYY-MM-DD'):''}}</span>
								<el-date-picker type="date" v-else v-model="form.entryTime"
												placeholder="请选择入职日期"></el-date-picker>

							</td>
							<td class="fTd">政治面貌</td>
							<td class="sTd">
								<span v-if="type=='info'">{{form.politicalOrientation}}</span>
								<el-input v-else v-model="form.politicalOrientation" placeholder="请输入政治面貌"></el-input>
							</td>

						</tr>
						<tr>
							<td class="fTd">文化程度</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.education}}</span>
								<el-input v-else v-model="form.education" placeholder="请输入文化程度"></el-input>

							</td>
							<td class="fTd">毕业院校</td>
							<td class="tTd">
                                <span v-if="type=='info'">
                                    <el-tooltip v-if="form.university" class="item" effect="dark" :enterable="false"
												:content="form.university" placement="top-start">
												<div>{{ form.university }}</div>
                                    </el-tooltip>
									<!--{{form.university}}-->
                                </span>
								<el-input v-else v-model="form.university" placeholder="请输入毕业院校"></el-input>

							</td>
							<td class="fTd">专业</td>
							<td class="sTd" colspan="2">
                                <span v-if="type=='info'">
                                    <!--{{form.major}}-->
                                <el-tooltip v-if="form.major" class="item" effect="dark" :enterable="false" :content="form.major"
											placement="top-start">
												<div>{{ form.major }}</div>
                                    </el-tooltip>
                                </span>
								<el-input v-else v-model="form.major" placeholder="请输入专业"></el-input>
							</td>

						</tr>
						<tr>
							<td class="fTd">毕业日期</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.graduationTime?this.$moment(form.graduationTime).format('YYYY-MM-DD'):''}}</span>
								<el-date-picker type="date" v-else v-model="form.graduationTime"
												placeholder="请选择毕业日期"></el-date-picker>

							</td>
							<td class="fTd">维修专业学历</td>
							<td class="tTd">
                                <span v-if="type=='info'">
                                    <!--{{form.maintenanceEducation}}-->
                                <el-tooltip v-if="form.maintenanceEducation" class="item" effect="dark" :enterable="false"
											:content="form.maintenanceEducation" placement="top-start">
												<div>{{ form.maintenanceEducation }}</div>
                                    </el-tooltip>
                                </span>
								<el-input v-else v-model="form.maintenanceEducation" placeholder="请输入维修专业学历"></el-input>

							</td>
							<td class="fTd">维修毕业院校</td>
							<td class="sTd" colspan="2">
                                <span v-if="type=='info'">
                                      <el-tooltip v-if="form.maintenanceUniversity" class="item" effect="dark" :enterable="false"
												  :content="form.maintenanceUniversity" placement="top-start">
												<div>{{ form.maintenanceUniversity }}</div>
                                    </el-tooltip>
									<!--{{form.maintenanceUniversity}}-->
                                </span>
								<el-input v-else v-model="form.maintenanceUniversity"
										  placeholder="请输入维修毕业院校"></el-input>
							</td>

						</tr>
						<tr>
							<td class="fTd">维修毕业日期</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.maintenanceTime?this.$moment(form.maintenanceTime).format('YYYY-MM-DD'):''}}</span>
								<el-date-picker type="date" v-else v-model="form.maintenanceTime"
												placeholder="请选择维修毕业日期"></el-date-picker>

							</td>
							<td class="fTd">外语程度</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.foreignLevel}}</span>
								<el-input v-else v-model="form.foreignLevel" placeholder="请输入外语程度"></el-input>

							</td>
							<td class="fTd">联系方式</td>
							<td class="sTd" colspan="2">
								<span v-if="type=='info'">{{form.contactInformation}}</span>
								<el-input v-else v-model="form.contactInformation" placeholder="请输入联系方式"></el-input>
							</td>

						</tr>
						<tr>
							<td class="fTd">档案失效日期</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.invalidTime?this.$moment(form.invalidTime).format('YYYY-MM-DD'):''}}</span>
								<el-date-picker type="date" v-else v-model="form.invalidTime"
												placeholder="请选择档案失效日期"></el-date-picker>

							</td>
							<td class="fTd">在岗状态</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.onDuty}}</span>
								<el-input v-else v-model="form.onDuty" placeholder="请输入在岗状态"></el-input>

							</td>
							<td class="fTd">学历证书附件</td>
							<td class="tTd" colspan="2">
								<div v-if=" type=='info'">
									<div v-if="form.enclosure" @click="fileDownload(form.enclosure,'学历证书附件查看')"
										 class="hoverSpanFile" @mouseenter="enter(form.enclosure,'学历证书附件查看')"
										 @mouseleave="leave()">
										<a>学历证书附件</a>
										<i class="el-icon-download iClass"></i>
									</div>
								</div>
								<div v-else style="display: flex;justify-content: left" class="fileUp">
									<div class="hoverSpanFile" style="width: 240px;height:39px;line-height: 39px"
										 @mouseenter="enter(form.enclosure,'学历证书附件查看')" @mouseleave="leave()">
										<a @click="fileDownload(form.enclosure,'学历证书附件查看')" v-if="form.enclosure"
										   class="G_cursor">学历证书附件 <i class="el-icon-download iClass"></i></a>
										<span v-else>请上传学历证书附件</span>
									</div>
									<UploadFile accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf" ref="UploadFile"
												@getFile="getFile2"></UploadFile>
								</div>
							</td>
						</tr>
						<tr>
							<td class="fTd">上级姓名</td>
							<td class="tTd">
								<span v-if="type=='info'">{{form.userSuperiorName}}</span>
								<el-input v-else v-model="form.userSuperiorName" placeholder="请输入上级姓名"></el-input>

							</td>
							<td class="fTd">上级员工编号</td>
							<td class="tTd">
                                <span v-if="type=='info'" style="">
                                    <el-tooltip v-if="form.userSuperiorNumber" class="item" effect="dark" :enterable="false"
												:content="form.userSuperiorNumber" placement="top-start">
												<div>{{ form.userSuperiorNumber }}</div>
                                    </el-tooltip>
									<!--{{form.userSuperiorNumber}}-->
                                </span>
								<el-input v-else v-model="form.userSuperiorNumber" placeholder="请输入上级员工编号"></el-input>

							</td>
							<td class="fTd">学位证书附件</td>
							<td class="sTd" colspan="2">
								<div v-if="type=='info'">
									<div ref="diploma" @click="fileDownload(form.diploma,'学位证书附件查看')"
										 class="hoverSpanFile" v-if="form.diploma"
										 @mouseenter="enter(form.diploma,'学位证书附件查看')" @mouseleave="leave()">
										<a href="#">学位证书附件</a> <i class="el-icon-download iClass"></i>
									</div>
								</div>
								<div v-else style="display: flex;justify-content: left;" class="fileUp">
									<div ref="diploma" class="hoverSpanFile  "
										 style="width: 240px;height:39px;line-height: 39px"
										 @mouseenter="enter(form.diploma,'学位证书附件查看')" @mouseleave="leave()">
										<a @click="fileDownload(form.diploma,'学位证书附件查看')" v-if="form.diploma"
										   class="G_cursor">学位证书附件 <i class="el-icon-download iClass"></i></a>
										<span v-else>请上传学位证书附件</span>
									</div>
									<UploadFile accept=".jpg,.png,.gif,.jpeg,.pcd,.pdf" ref="UploadFile"
												@getFile="getFile3"></UploadFile>
								</div>
							</td>
						</tr>
						<tr>
							<td class="fTd is-required1">部门/项目</td>
							<td class="tTd">
								<el-form-item prop="deptCode">
									<span v-if="type=='info'">{{deptObj[form.deptCode]}}</span>
									<el-select v-else v-model="form.deptCode" placeholder="请选择" clearable>
										<el-option v-for="(opt,index) in deptData" :key="index" :value="opt.valCode"
												   :label="opt.valData"></el-option>
									</el-select>
								</el-form-item>
							</td>
							<td colspan="5"></td>
						</tr>
					</table>
					<div style="width:1160px">
						<InOfficeInfo @getInfo="getInfo" :type="type" :userId="this.form.userId" :tableData="form.positionInfList||[]"
									  :id="this.$route.query.id"></InOfficeInfo>
						<WorkExperience @getInfo="getInfo" :type="type" :userId="this.form.userId" :tableData="form.workInfList||[]"
										:id="this.$route.query.id"></WorkExperience>
						<Certificate @getInfo="getInfo" :type="type" :userId="this.form.userId" :tableData="form.certificateInfList||[]"
									 :id="this.$route.query.id"></Certificate>
						<Unsafe @getInfo="getInfo" :type="type" :userId="this.form.userId" :tableData="form.sincerityInfList||[]"
								:id="this.$route.query.id"></Unsafe>
						<WorkWay @getInfo="getInfo" :type="type" :tableData="form.styleInfList||[]"
								:id="this.$route.query.id" :userId="this.form.userId"></WorkWay>

					</div>
				</el-form>
			</div>
		</div>
		<SeeImg ref="SeeImg" :fileObj="fileObj"></SeeImg>

	</div>

</template>

<script>
    import {encryptedData,decrypt} from '@/ui/lib/des-coder.js';

    import {eleDateShow,inputLength} from '@lib/tools'

	import moment from "moment";
	import InOfficeInfo from './inOfficeInfo/index';
	import WorkExperience from './workExperience/index';
	import Certificate from './certificate/index';
	import Unsafe from './unsafe/index';
	import WorkWay from './workWay/index';
	import Icon from "@components/Icon-svg/index";
	import request from "@lib/axios.js";
	import {extend, map, clone} from "lodash";

	export default {
		components: {
			Icon, WorkWay,InOfficeInfo, WorkExperience, Certificate, Unsafe
		},
		name: "",
		data() {
			return {
				moment: moment,
				oldForm: {},
				base64: '',
				form: {courseFileName: '', courseFileId: '', suitableUser: []},
				fileObj: {style: 'display:none'},
				deptData: [],
				deptObj: {},
				userArrObj: {},
				userArr: [],
				rules: {
					userName: [{required: true, message: '请选择员工姓名'}],
					deptCode: [{required: true, message: '请选择部门/项目'}],
					idCard: [
						{
							pattern: /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/,
							message: '身份证号格式错误！',
							trigger: 'blur'
						}
					]
 				},
				type: "add",
				sexOptions: [{value: "男", label: "男"}, {value: "女", label: "女"}]
			};
		},
		computed:{
		    getType(){
				return this.type
			},

            getUrlBlo(){
                return (p)=>{
                    let blo= this.$route.path=='/Z'+p|| this.$route.path=='/S'+p|| this.$route.path=='/'+p+'/add'|| this.$route.path=='/'+p+'/edit'|| this.$route.path=='/info'+p|| this.$route.path=='/info'+p+'1'
                    return blo
                }
            },
		},
		mounted() {
            eleDateShow()
            inputLength(this)
         },
		created() {
            if (this.$route.path.match(/\/.*?addPersonDoc\/?.*/)||this.$route.path == '/SuserDoc'||this.$route.path == '/ZuserDoc'){
                this.initPage()
                request({
                    url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params: {delete: false},
                    data: ['dept']
                }).then(d => {
                    if (d.code == 200) {
                        this.deptData = d.data.dept
                        d.data.dept.map((k, l) => {
                            this.$set(this.deptObj,k.valCode,k.valData);
                        })
                    }
                });
			}

		},

		methods: {
			exportWord() {
				request({
					header: {
						'Content-Type': 'multipart/form-data'
					},
					url: `${this.$ip}/mms-qualification/download/userRecord/${this.$route.query.id}`,
					method: 'get',
					responseType: 'blob'
				}).then(d => {
					let arr = []
					if (d.headers['content-disposition'] && d.headers['content-disposition'].split('=')) {
						arr = d.headers['content-disposition'].split('=')[1].split('.')
					}
					let content = d;
					let blob = new Blob([content], {type: 'application/msword'})
					const fileName = `${decodeURI(arr[0])}`
					if ('download' in document.createElement('a')) { // 非IE下载
						const elink = document.createElement('a')
						elink.download = fileName
						elink.style.display = 'none'
						elink.href = URL.createObjectURL(blob)
						document.body.appendChild(elink)
						elink.click()
						URL.revokeObjectURL(elink.href) // 释放URL 对象
						document.body.removeChild(elink)
					} else { // IE10+下载
						navigator.msSaveBlob(blob, fileName)
					}
				});

			},


			enter(id, title) {
				this.fileDownload(id, title, 1)
			},
			leave() {
				this.fileObj = {
					style: 'display:none'
				}
			},
			userNameC(val) {
				let data = this.userArrObj[val].userExt
				this.form = {
					...this.form,
					userNumber: this.userArrObj[val].workNumber,
					userId: val,
					userName: this.userArrObj[val].name,
					contactInformation:decrypt(this.userArrObj[val].phone)  || null,
				}
				if (data) {
					this.form = {
						...this.form,
						nation: data.nationId || null,
						idCard: decrypt(data.idCard),
						sex: data.gender == 1 ? '男' : '女',
						entryTime: data.entryDate ? this.$moment(data.entryDate).format('YYYY-MM-DD') : null,
						politicalOrientation: data.facePoliticsId || null,
						education: data.education || null,
					}
				}
			},

			upUserPho() {
				this.$refs.upUserPho.$refs.buttonClick.$el.click()

			},
			getFile(file) {
				console.log(file.id);
				this.$set(this.form, 'photo', file.id)
				request({
					header: {
						'Content-Type': 'multipart/form-data'
					},
					url: `${this.$ip}/mms-file/get-file-by-id/${file.id}`,
					method: 'GET',

				}).then((d) => {
					this.$set(this.form, 'photoPath', d.data.filePath)
				});

			}, getFile2(file) {
				this.$set(this.form, 'enclosure', file.id)
				// this.$set(this.form,'enclosureName',file.name)
			}, getFile3(file) {
				this.$set(this.form, 'diploma', file.id)
				// this.$set(this.form,'diplomaName',file.name)

			},
			fileDownload(id, title, num) {
				if (id) {
					request({
						header: {
							'Content-Type': 'multipart/form-data'
						},
						url: `${this.$ip}/mms-file/get-file-by-id/${id}`,
						method: 'GET',

					}).then((d) => {
						if (d.data) {
							this.fileObj = {
								...d.data,
								title: title || '',
								style: 'display:block'
							}
							if (num != 1) {
								window.open(d.data.filePath, title)
							}
						}
					});
				} else {
					if (num != 1) {
						this.$message.info('暂无附件')
					}
				}
			},

			resetForm() {
				if (this.form.id) {
					for (let key in this.form) {
						if (!(key === 'id' || key === 'userName' || key === 'userNumber' || key === 'userId') ) {
							if (typeof(this.form[key]) ==='string'){
								this.form[key] = "";
							} else if (typeof(this.form[key]) ==='number'){
								this.form[key] = null;
							}
						}
					}
				} else {
					this.form = {};
				}
			},
			getInfo() {
				request({
                    url:`${this.$ip}/mms-qualification/userRecord/getByUserNumber/${this.$route.query.userId}`,

                    // url: `${this.$ip}/mms-qualification/userRecord/getById/${this.$route.query.id}`,
					method: "get",
				}).then(d => {
					this.form = {...d.data}
					if (this.form.photo) {
						request({
							header: {
								'Content-Type': 'multipart/form-data'
							},
							url: `${this.$ip}/mms-file/get-file-by-id/${this.form.photo}`,
							method: 'GET',
						}).then((d) => {
							this.$set(this.form, 'photoPath', d.data.filePath)
						});
						// request({
						//     header: {
						//         'Content-Type': 'multipart/form-data'
						//     },
						//     url: `${this.$ip}/mms-file/get-file-stream-by-id/${this.form.photo }`,
						//     method: 'GET',
						// }).then((file) => {
						//     let that=this
						//     let blob=new Blob([file],{type:'image/png'})
						//     const reader = new FileReader();
						//     reader.addEventListener("load", function () {
						//         // convert image file to base64 string
						//         that.base64 = reader.result;
						//     }, false);
						//     if (blob) {
						//         reader.readAsDataURL(blob);
						//     }
						// });
					}
				})
			},
			initPage() {
				if (this.$route.query  ) {
					let arr = this.$route.path.split('/');
                    this.type = arr[arr.length-1];
                    console.log(111111111,this.$route.path.substring(1, 5) );
                    if(this.$route.path == '/SuserDoc'||this.$route.path == '/ZuserDoc'||this.$route.path.substring(1,5)==='info'){
					    this.type='info'
					}

                     if (this.$route.query.userId) {
 						this.$route.meta.paramsId = {id: this.$route.query.id,userId:this.$route.query.userId, type: this.$route.query.type}
					}
					this.$route.meta.title =
						this.type == "add"
							? "人员档案新增"
							: this.type == "edit"
							? "人员档案编辑"
							: this.type == "info"
								? "人员档案详情"
								: "";

					request({
						// headers: {'Content-Type': 'text/plain'},
						url: `/sys/user/getUsersByOrgId`,
						method: 'get',
						params: {
							// pageNum: 1, pageSize: 99999,
							orgId: this.$store.state.user.userInfo.orgId,
							deptRelation: false,
							needRole: false
						}
					}).then((d) => {
						if (d.responseCode === 1000 && d.data) {

                            this.userArr = [...d.data]
							d.data.map((k, l) => {
								this.userArrObj[k.id] = k
							})
						} else {
							this.$message.error(d.responseMessage);
						}
					});
					if (this.type != 'add') {
						this.getInfo()

					}
				}
			},
			saveForm(form) {
				if (this.type == "add" || this.type == "edit") {
					this.$refs[form].validate(valid => {
						if (valid) {
							let url
							if (this.type == 'add') {
								url = '/userRecord/save'
							} else {
								url = '/userRecord/update'
							}
							let obj = {
							    ...this.form,

							}

							request({
								url: `${this.$ip}/mms-qualification${url}`,
								method: 'post',
								data: {...obj},
							}).then((d) => {
								if (d.code == 200) {
									this.$message.success("保存成功！");
									if (this.type == "add") {
										this.$router.push({path: '/addPersonDoc/edit', query: { id: d.data.id ,userId: d.data.userId}})
										this.$set(this.form, 'id', d.data.id)
										this.initPage()
									}
								}

							})

						} else {
							// this.$message.warning('等待文件上传成功后在提交')
						}
					});
				}
			},

		}
	};
</script>
<style scoped lang="scss">
	.addPersonDoc {
		.hoverSpanFile {
			& > span {
				padding: 15px;
				font-size: 16px;
				color: #888888
			}

			& > a {
				padding: 15px;
				font-size: 16px;
				color: #222222
			}
		}

		.G_form1 {
			margin-top: 80px;
			display: flex;
			justify-content: center;

			/deep/ .el-upload {
				.el-button {

					height: 30px;
					padding: 5px 15px !important;
				}
			}

			height: calc(100vh - 270px);

			.nomTable {
				border-collapse: collapse;
				border: none;

				.fTd {
					width: 140px;
					text-align: center;
				}
				.tTd {
					span{
						vertical-align: middle;
						font-size: 16px;
					}
				}

				td {
					height: 40px;
					border: 1px solid rgba(151, 151, 151, 1);
					font-size: 16px;
					color: #222222;

					.fileUp {
						.el-input {
							width: 300px;
							margin-right: 10px;
						}

						display: flex;
						align-items: center;
						justify-content: space-between;

					}

					.upUser {
						overflow: hidden;
						text-align: center;

						img {
							width: 128px;
						}
					}

					& > span {
						padding: 0 10px 0 15px;
						width: 200px;
						display: inline-block;
						white-space: nowrap;
						overflow: hidden;
						text-overflow: ellipsis;
					}

					/deep/ .el-form-item__content {
						height: 39px;

						& > span {
							div {
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;

								width: 170px;
							}

							padding: 0 10px 0 15px;
							width: 200px;
							display: inline-block;
							/*white-space: nowrap;overflow: hidden;text-overflow: ellipsis;*/
						}
					}
				}
			}

			/deep/ .el-form {

				.el-form-item {
					margin: 0;
				}

				.el-input {
					width: 200px;
				}

				.el-select {
					width: 200px;
				}

				.el-form-item__error {
					top: 25px
				}

				.el-textarea__inner, .el-input__inner {
					border: 0px solid rgba(151, 151, 151, 1);
					font-size: 16px;
					color: #222222
				}

				input::-webkit-input-placeholder {
					font-size: 16px;
					font-family: SourceHanSansCN-Regular, SourceHanSansCN;
					font-weight: 400;
					color: #888888
				}
			}
		}
	}


</style>
