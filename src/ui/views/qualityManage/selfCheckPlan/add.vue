<template>
	<div class="addSysParameter">
		<div class="top-content">
			<div class="top-content-title">
				<span>法定自查检查计划-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
			</div>
			<div v-if="type!='info'" class="top-toolbar">
				<div @click="type!='info'?saveForm('form'):()=>{}" :class="type=='info'?'isDisabled':''">
					<icon iconClass="save"></icon>
					保存
				</div>
				<div @click="type!='info'?resetForm():()=>{}" :class="type=='info'?'isDisabled':''">
					<icon iconClass="reset"></icon>
					重置
				</div>
			</div>
		</div>
 		<div :class=" type=='info'?'main-content main-info G_formInfo':'main-content'">
			<el-form :model="form" :rules="rules" ref="form">
				<div></div>
				<div class="row_custom">
					<el-form-item label="计划年度：" prop="year1">
						<span v-if="type=='info'">{{form.year}}</span>
						<el-date-picker required @change="year1" v-else v-model="form.year1" placeholder="请选择计划年度"
										type="year"></el-date-picker>
						<!--:disabled="type=='edit'"-->
					</el-form-item>
					<el-form-item label="部门/项目：" prop="deptId">
						<span v-if="type=='info'">{{form.deptId}}</span>
						<el-select @change="deptNameChange" clearable v-else v-model="form.deptId"
								   placeholder="请选择部门/项目">
							<el-option v-for="(opt,index) in options.dept" :key="index" :label="opt.valData"
									   :value="opt.valCode"></el-option>
						</el-select>
					</el-form-item>

				</div>
				<div class="row_custom">
					<el-form-item label="审批人：" prop="reviewerName">
						<span v-if="type=='info'">{{form.reviewerName}}</span>
						<el-input v-else v-model="form.reviewerName" placeholder="请输入审批人"></el-input>
					</el-form-item>
					<el-form-item label="审批日期：" prop="reviewerTime">
						<span v-if="type=='info'">{{form.reviewerTime? this.$moment(form.reviewerTime).format('YYYY-MM-DD'):''}}</span>
						<el-date-picker v-else v-model="form.reviewerTime" placeholder="请选择审批日期"></el-date-picker>
					</el-form-item>
				</div>
				<div class="row_custom aRow_custom">
					<el-form-item label="计划版本：" prop="version">
						<span v-if="type=='info'">{{form.version}}</span>
						<el-input v-else v-model="form.version" placeholder="请输入计划版本"></el-input>
					</el-form-item>

				</div>
			</el-form>
		</div>
	</div>
</template>
<script>
	import {eleDateShow,inputLength} from '@lib/tools'
    import moment from "moment";
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import {extend} from "lodash";

    export default {
        components: {
            Icon,

        },
        name: "selfAdd",
        data() {
            return {

                form: {},
                options: {},
                rules: {
                    year1: [{required: true, message: "请选择", trigger: "blur"}],
                    // system: [{ required: true, message: "请输入", trigger: "blur" }],
                },
                type: "add"
            };
        },
        created() {
            let num=  this.$route.path.substring(1,4)=='add'?4:5;
            this.type = this.$route.path.substring(1,num);
            request({
                url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                method: 'post',
                data: ["dept",]
            }).then(d => {
                this.options = d.data
            });
            if (this.$route.query) {
                 this.$route.meta.title =
                    this.type == "add"
                        ? "法定自查检查计划新增"
                        : this.type == "edit"
                        ? "法定自查检查计划编辑"
                        : this.type == "info"
                            ? "法定自查检查计划详情"
                            : "";
                if (this.type == "edit" || this.type == "info") {
                    let id = this.$route.query.id
                    request({
                        url: `${this.$ip}/mms-qualification/examination/getById/${id}`,
                        method: "get",
                    }).then(d => {

                        this.form = {...d.data, year1: new Date(d.data.year)}
                    })
                }
            }
        },
        mounted() {
            eleDateShow()
            inputLength(this)
        },
        methods: {

            year1(val) {
                if (val) {
                    this.form.year = Number(val.getFullYear())
                }
            },
            deptNameChange(val) {
                let data
                this.options.dept.map((k, l) => {
                    if (val == k.valCode) {
                        data = k.valData
                    }
                })
                this.$set(this.form, 'deptName', data)
            },
            resetForm() {
                if (this.type == 'edit') {
                    for (let key in this.form) {
                        if (key !== 'id') {
                            if (typeof(this.form[key]) === 'string') {
                                this.form[key] = "";
                            } else if (typeof(this.form[key]) === 'number') {
                                this.form[key] = null;
                            }
                        }
                    }
                    this.form.year1 = null;
                } else {
                    this.form = {};
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                            if (this.type == "add") {
                                url = `${this.$ip}/mms-qualification/examination/save`
                            } else {
                                url = `${this.$ip}/mms-qualification/examination/update`
                            }
                            request({
                                url,
                                method: "post",
                                data: this.form
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

	.main-content {
		overflow-y: auto;
		height: calc(100vh - 260px);
		/*margin-top: 80px!important;*/
		.aRow_custom {
			text-align: left;
		}
	}

	.main-info {
		span {
			/*font-weight: bold!important;*/
			/*margin: 0!important;*/
		}
		/deep/ .el-form-item__label {
			/*padding: 0!important;*/
			text-align: left;
		}
		.aRow_custom {
			span {

			}
		}
	}

	.addSysParameter {
		margin-top: 36px;
		.el-form {
			width: 1000px;
			/deep/ .el-form-item__label {
				width: 165px;
				padding-left: 60px;
			}
			/deep/ .el-form-item__content {
				margin-left: 165px;
			}
			.row_item_row, .row_item {
				/deep/ .el-input {
					/*width:600px!important;*/
				}
			}
			.row_custom {
				/deep/ .el-form-item__content {
					/*height: 40px;*/
					width: 332px;
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
			.row_item_row {
				.el-form-item {
					width: calc(100% - 165px);
				}
			}
		}
	}
</style>
