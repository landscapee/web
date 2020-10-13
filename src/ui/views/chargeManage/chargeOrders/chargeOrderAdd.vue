<template>
	<div>
		<div class="sysParameter">
			<div class="top-content">
				<div class="top-content-title">
					<span>收费单-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
				</div>
				<div class="top-toolbar">
					<!-- <div @click='sendFinanceFn'><icon iconClass="add"></icon>发送财务</div>
					<div><icon iconClass="add" ></icon>导出收费单</div>
					<div><icon iconClass="add" ></icon>新增</div>
					<div><icon iconClass="edit" ></icon>编辑</div>
					<div><icon iconClass="remove" ></icon>删除</div>
					<div><icon iconClass="info" ></icon>详情</div>
					<div><icon iconClass="info" ></icon>导出Excel</div> -->
					<div @click="type!='info'?submitForm('ruleForm'):()=>{}" :class="type=='info'?'isDisabled':''">
						<icon iconClass="save"></icon>
						保存
					</div>
					<div @click="type!='info'?resetForm('ruleForm'):()=>{}" :class="type=='info'?'isDisabled':''">
						<icon iconClass="reset"></icon>
						重置
					</div>
				</div>
			</div>
			<div class="main-content">
				<div class="header">机务服务非例行工作结算清单{{ruleForm.number?`(NO ${ruleForm.number})`:''}}</div>
				<el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
						 class="demo-ruleForm" style=" width:1400px;">
					<el-row>
						<el-col :span="12">
							<el-form-item label="航班号/Flight No" prop="flightNo" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:320px;'>{{ruleForm.flightNo}}</span>
								<el-input v-else v-model="ruleForm.flightNo" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="日期/Date" prop="workDate" :label-width='labelWidth'>
								<!-- <el-input v-model="ruleForm.workDate"  style='width:320px;'></el-input> -->
								<span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.workDate | formatDate}}</span>
								<el-date-picker
										v-else
										v-model="ruleForm.workDate"
										type="date"
										style='width:320px;'
										placeholder="选择日期">
								</el-date-picker>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="分(子)公司/Subsidiary" prop="subsidiary" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:320px;'>{{ruleForm.subsidiary}}</span>
								<el-input v-else v-model="ruleForm.subsidiary" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="飞机型号/Aircraft Type" prop="aircraftType" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.aircraftType}}</span>
								<el-input v-else v-model="ruleForm.aircraftType" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="机号/Aircraft Reg" prop="aircraftReg" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:320px;'>{{ruleForm.aircraftReg}}</span>
								<el-input v-else v-model="ruleForm.aircraftReg" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="航空公司/Airline" prop="airLine" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:320px;'>{{ruleForm.airLine}}</span>
								<el-input v-else v-model="ruleForm.airLine" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="起降机场/Departure/Arrival Airport" prop="arrivalAirport"
										  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.arrivalAirport}}</span>
								<el-input v-else v-model="ruleForm.arrivalAirport" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="非例行工作内容/Nonroutine Work" prop="nonroutineWork"
										  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.nonroutineWork}}</span>
								<el-input v-else v-model="ruleForm.nonroutineWork" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<div class='form-item-l' style="display:none;">
						<!-- <el-form-item label="人工时/Man hour" :label-width='labelWidth'>
							<span v-if="isInfo" class='form_inlne_val' style='width:54px;'>{{ruleForm.people}}</span>
							<el-input v-else type='number' v-model="ruleForm.people" style='width:116px;'></el-input>
							人/Man
							<span v-if="isInfo" class='form_inlne_val' style='width:54px;'>{{ruleForm.hours}}</span>
							<el-input v-else type='number' v-model="ruleForm.hours" style='width:116px;'></el-input>
							小时/Hour
						</el-form-item> -->
						<el-form-item label="" prop="name" style='width:600px;' :label-width='labelWidth'>
							<!-- <el-input v-model="ruleForm.name"  style='width:320px;'></el-input> -->
						</el-form-item>
					</div>
					<el-row>
						<el-col :span="12">
							<el-form-item label="除冰车/Aircraft Deicing System" prop="aircraftDeicingSystem"
										  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:250px;'>{{ruleForm.aircraftDeicingSystem}}</span>
								<el-input v-else v-model="ruleForm.aircraftDeicingSystem" @input="changeCode('aircraftDeicingSystem','hours')"
										  style='width:250px;'></el-input>
								<span class='form_inlne_val1'>小时/Hour</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="高/低压氮气/High/Low pressure Nitrogen" prop="pressureNitrogen"
										  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:250px;'>{{ruleForm.pressureNitrogen}}</span>
								<el-input v-else v-model="ruleForm.pressureNitrogen" @input="changeCode('pressureNitrogen','number')"
										  style='width:250px;'></el-input>
								<span class='form_inlne_val1'>次/Operation</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="加液压油/Hydraulic" prop="hydraulic" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:250px;'>{{ruleForm.hydraulic}}</span>
								<el-input v-else v-model="ruleForm.hydraulic" @input="changeCode('hydraulic','gallon')"
										  style='width:250px;'></el-input>
								<span class='form_inlne_val1'>加仑/Gallon</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="充氧气/瓶/Oxygcn Cart/Bottle" prop="oxygenBottle"
										  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:250px;'>{{ruleForm.oxygenBottle}}</span>
								<el-input v-else v-model="ruleForm.oxygenBottle" @input="changeCode('oxygenBottle','number')"
										  style='width:250px;'></el-input>
								<span class='form_inlne_val1'>次/Bottle</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="加滑油/Oil" prop="oil" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val' style='width:250px;'>{{ruleForm.oil}}</span>
								<el-input v-else v-model="ruleForm.oil" @input="changeCode('oil','quart')"
										  style='width:250px;'></el-input>
								<span class='form_inlne_val1'>夸脱/Quart</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="飞机除冰液 (原液)/DF Plus" prop="dfPlus" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:178px;'>{{ruleForm.dfPlus}}</span>
								<el-input v-else v-model="ruleForm.dfPlus" @input="changeCode('dfPlus','kilogram')"
										  style='width:178px;'></el-input>
								<span class='form_inlne_val1'>公斤(公升)/Kilogram(Litre)</span>
							</el-form-item>
						</el-col>
					</el-row>
					<el-row>
						<el-col :span="12">
							<el-form-item label="人工时/Man hour" prop="people" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:95px;'>{{ruleForm.people}}</span>
								<el-input v-else v-model="ruleForm.people" @input="changeCode('people','number')"
										  style='width:100px;'></el-input>
								<span class='form_inlne_val1'>人/Man</span>
							</el-form-item>
							<el-form-item >
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:95px;'>{{ruleForm.hours}}</span>
								<el-input v-else v-model="ruleForm.hours" @input="changeCode('hours','hours')"
										  style='width:90px;'></el-input>
								<span class='form_inlne_val1'>小时/Hour</span>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="其他" prop="others" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
									  style='width:320px;'>{{ruleForm.others}}</span>
								<el-input v-else v-model="ruleForm.others" style='width:320px;'></el-input>
							</el-form-item>
						</el-col>
					</el-row>

					<!--                    </div>-->
					<!--                    <div class='form-item-l' style='justify-content:flex-start'>-->
					<el-row>
						<el-col :span="12">
							<el-form-item label="上传纸质收费单" :label-width='labelWidth'>
								<el-upload
										v-if="type!='info'"
										style='display:flex'
										class="upload_demo"
										ref="upload"
										:limit='1'
										accept='.jpg,.jpeg,.png,.gif,.bmp,.JPG,.JPEG,.PBG,.GIF,.BMP'
										:on-success='fileUploadSuccessFn'
										:on-exceed="handleExceedFn"
										:on-remove='fileRemoveFn'
										:action='$ip+"/mms-file/upload2"'
										:file-list="fileList"
								>
									<el-button size="small" type="primary">{{type=='edit'?'重新上传':'上传'}}</el-button>
								</el-upload>
								<span v-if="type=='info'" class='hoverSpanFile'  @click="preImg">{{fileList.map(i=>i.name).toString()}}</span>
							</el-form-item>
						</el-col>
						<el-col :span="12"></el-col>
					</el-row>

					<!--                    </div>-->
				</el-form>
			</div>
		</div>
		<SeeImg ref="SeeImg"></SeeImg>
	</div>
</template>
<script>
	import moment from 'moment'
	import SearchTable from '@/ui/components/SearchTable';
	import Icon from '@components/Icon-svg/index';
	import {sysParameterTable} from '../tableConfig.js';
	import request from '@lib/axios.js';
	import {extend} from 'lodash';

	export default {
		components: {
			Icon,
			SearchTable
		},
		filters: {
			formatDate(val, format = 'YYYY-MM-DD') {
				var val = Number(val);
				if (!isNaN(val)) {
					return moment(val).format(format)
				} else {
					return '-' // /file//recovery/{id}
				}
			}
		},
		computed: {
			isInfo: {
				get: function () {
					return this.type === 'info'
				},
				set: function () {
				}
			}
		},
		name: '',
		data() {
			// var validateNumber = (rule, value, callback) => {
			// 	if (value === '' || value === undefined || (Number(value) > 0 && Number(value) < 10000000)) {
			// 		callback();
			// 	}else {
			// 		callback(new Error('请输入不超过8位数的正数'));
			// 	}
			// };
			return {
				ruleForm: {
					airLine: '',  // 航空公司
					workDate: '', // 日期
					subsidiary: '', // 分(子)公司
					aircraftType: '', // 飞机型号
					aircraftReg: '', // 机号
					flightNo: '', // 航班号
					arrivalAirport: 'TFU',  // 起降机场
					nonroutineWork: '', //非例行工作内容
					people: '', // 人
					hours: '',  // 小时
					aircraftDeicingSystem: '', //除冰车
					pressureNitrogen: '', // 高/低压氮气
					hydraulic: '', // 加液压油
					oxygenBottle: '', //充氧气/瓶
					oil: '', // 加滑油
					dfPlus: '', // 飞机除冰液 (原液)
					others: '',
					picture: '' // 模板路径
				},
				labelWidth: '300px',
				rules: {
					flightNo: [
						{required: true, message: '请输入航班号', trigger: 'change'},
					],
					workDate: [
						{required: true, message: '请选择时间', trigger: 'change'}
					],
					// aircraftDeicingSystem:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// pressureNitrogen:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// hydraulic:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// oxygenBottle:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// oil:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// dfPlus:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// people:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ],
					// hours:[
					// 	{required: false,validator: validateNumber, trigger: 'blur'}
					// ]
				},
				type: 'add',
				fileList: []
			}
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
					this.getChargeInfo()
				}
			}
		},
		methods: {
			changeCode(key,type){
				if (type !== 'number') {
					// 先把非数字的都替换掉(空)，除了数字和.
					this.$set(this.ruleForm,key,this.ruleForm[key].replace(/[^\d.]/g, ""));
					// 必须保证第一个为数字而不是.
					this.$set(this.ruleForm,key,this.ruleForm[key].replace(/^\./g, ""));
					// 保证只有出现一个.而没有多个.
					this.$set(this.ruleForm,key,this.ruleForm[key].replace(/\.{2,}/g, "."));
					//保证.只出现一次，而不能出现两次以上
					this.$set(this.ruleForm,key,this.ruleForm[key].replace(".", "$#$").replace(/\./g, "").replace("$#$", "."));
					//小数只能输入后两位
					this.$set(this.ruleForm,key,this.ruleForm[key].replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'));
				}else {
					//只能输入数字
					this.$set(this.ruleForm,key,this.ruleForm[key].replace(/[^\d]/g, ""));
				}
				if (this.ruleForm[key] > 10000000) {
					this.$message.warning('最大输入8位数！');
					this.$set(this.ruleForm,key,10000000);
				}
			},
			fileUploadSuccessFn(response, file, fileList) {
				console.log(response)
				if (response.code == 200) {
					this.ruleForm.picture = response.data.filePath
				} else {
					this.$message({
						showClose: true,
						message: '文件上传失败',
						type: 'error'
					});
				}
			},
			handleExceedFn(files, fileList) {
				this.$message({type: 'warning', message: '只能上传一个文件，请将源文件删除后再上传'});
			},
			fileRemoveFn(file, fileList) {
				this.ruleForm.picture = ''
				// this.form = {}
				// this.form.fileName = ''
				// this.form.formats = ''
				// this.form.folderId = ''
				// this.form.fileUrl = ''
				// this.form.size = ''
			},
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						let typeObj = {
							'add': this.chargeSaveFn,
							'edit': this.chargeUpdateFn
						}
						typeObj[this.type].call(this)
					} else {
						console.log('error submit!!');
						return false;
					}
				})
			},
			undefinedToNullFn(obj) {
				let newObj = {}
				if (Object.prototype.toString.call(obj) === "[object Object]" && Object.keys(obj).length) {
					Object.keys(obj).forEach(item => {
						if (Reflect.get(obj, item) === '') {
							Reflect.set(newObj, item, null)
						} else {
							Reflect.set(newObj, item, Reflect.get(obj, item))
						}
					})
					return newObj
				} else {
					throw new Error("ruleForm is not Object")
				}
			},
			chargeSaveFn() {
				let ruleForm = this.undefinedToNullFn(this.ruleForm)
				request({
					url: `${this.$ip}/mms-charge/chargeBillFlxgz/save`,
					method: 'post',
					data: ruleForm
				})
					.then((data) => {
						if (data.code == 200) {
							this.$message({type: 'success', message: '新增成功'});
							this.$router.go(-1)
						} else {
							this.$message({type: 'error', message: '新增失败，请重试'});
						}
					})
			},
			chargeUpdateFn() {
				let ruleForm = this.undefinedToNullFn(this.ruleForm)
				request({
					url: `${this.$ip}/mms-charge/chargeBillFlxgz/update`,
					method: 'post',
					data: ruleForm
				})
					.then((data) => {
						if (data.code == 200) {
							this.$message({type: 'success', message: '新增成功'});
							this.$router.go(-1)
						} else {
							this.$message({type: 'error', message: '新增失败，请重试'});
						}
					})
			},
			resetForm(formName) {
				this.ruleForm = {
					airLine: '',  // 航空公司
					workDate: '', // 日期
					subsidiary: '', // 分(子)公司
					aircraftType: '', // 飞机型号
					aircraftReg: '', // 机号
					flightNo: '', // 航班号
					arrivalAirport: '',  // 起降机场
					nonroutineWork: '', //非例行工作内容
					people: '', // 人
					hours: '',  // 小时
					aircraftDeicingSystem: '', //除冰车
					pressureNitrogen: '', // 高/低压氮气
					hydraulic: '', // 加液压油
					oxygenBottle: '', //充氧气/瓶
					oil: '', // 加滑油
					dfPlus: '', // 飞机除冰液 (原液)
					others: '',
					picture: '' // 模板路径
				}
			},
			getChargeInfo() {
				request({
					url: `${this.$ip}/mms-charge/chargeBillFlxgz/getById/${this.$route.query.id}`,
					method: 'get',
				}).then(data => {
					console.log(data)
					if (data.code == 200 && Object.prototype.toString.call(data.data) === "[object Object]") {
						this.ruleForm = data.data
						this.getFileByFilePathFn(this.ruleForm.picture)
					}
				})
			},
			getFileByFilePathFn(path) {
				if (!path) {
					return false
				}
				request({
					url: `${this.$ip}/mms-file/get-file-by-file-path`,
					method: 'get',
					params: {
						path
					}
				})
					.then((data) => {
						console.log(data)
						if (data.code == 200) {
							this.fileList = [data.data]
							this.fileList.forEach(i => {
								i.name = i.fileName
							})
						}
					})
			},
			preImg(){
				this.$refs.SeeImg.open(this.fileList[0],'纸质收费单')
			}
		},
	};
</script>
<style scoped lang="scss">
	@import "@/ui/styles/common_list.scss";

	.sysParameter {
		.main-content {
			.header {
				text-align: center;
				font-size: 24px;
				color: #222;
			}

			.demo-ruleForm {
				margin: 30px auto 0
			}

			.form-item-l {
				display: flex;
				flex-direction: row;
				justify-content: center;

				.form_inlne_val {
					display: inline-block;
					width: 320px;
				}

				.form_inlne_val1 {
					display: inline-block;
					font-size: 1rem;
				}
			}
			.form_inlne_val1 {
				display: inline-block;
				font-size: 1rem;
			}
		}
	}
	.hoverSpanFile:hover  {
		color: #5cb6ff;
		cursor: pointer;
	}
</style>
