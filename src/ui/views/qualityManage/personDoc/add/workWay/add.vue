<template>
    <div class="indexAdd">
        <div class="QCenterRight">
            <div class="QHead">
                作风建设量化考核记录-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}
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
        </div>

        <div :class=" type=='info'?'G_form G_formInfo':'G_form'">
            <el-form label-position="right" :model="form" :rules="rules" :inline="true" ref="form">
                <div></div>
                <div class="row_tow">

                    <el-form-item label="扣分项代码：" prop="deductPoints">
                        <span v-if="type=='info'">{{  form.deductPoints }}</span>
                        <el-input v-else v-model="form.deductPoints" placeholder="请输入扣分项代码	"></el-input>

                    </el-form-item>
                    <el-form-item label="时间：" prop="styleTime">
                        <span v-if="type=='info'">{{ form.styleTime?moment(form.styleTime).format('YYYY-MM-DD'):'' }}</span>
                         <el-date-picker    type="date" v-else v-model="form.styleTime" placeholder="请选择时间"></el-date-picker>

                    </el-form-item>

                </div>

                <div class="row_one">
                    <el-form-item label="地点：" prop="place">
                        <span v-if="type=='info'">{{ form.place }}</span>
                        <el-input v-else v-model="form.place" placeholder="请输入地点"></el-input>
                    </el-form-item>
                </div>
                <div class="row_one">
                    <el-form-item label="扣分行为描述：" prop="pointsDesc">
                        <span v-if="type=='info'">{{  form.pointsDesc }}</span>
                        <el-input v-else v-model="form.pointsDesc" type="textarea" placeholder="请输入扣分行为描述"></el-input>

                    </el-form-item>
                </div>
                <div class="row_one">
                    <el-form-item label=" 处理措施：" prop="measures">
                        <span v-if="type=='info'">{{form.measures}}</span>
                        <el-input v-else type="textarea" v-model="form.measures" placeholder="请输入处理措施"></el-input>
                    </el-form-item>
                </div>


            </el-form>
        </div>
    </div>
</template>
<script>
    import {eleDateShow, inputLength} from '@lib/tools'

    import moment from "moment";
    import Icon from "@components/Icon-svg/index";
    import request from "@lib/axios.js";
    import {extend} from "lodash";

    export default {
        components: {
            Icon
        },
        name: "",
        data() {
            return {
                pickerOptions: {},
                pickerOptions1: {},
                moment: moment,
                oldForm: {},
                form: {},
                options: {},
                rules: {
                    deductPoints: [{required: true, message: '请输入扣分项代码', trigger: "blur"}],
                    styleTime: [{required: true, message: '请选择时间', trigger: "blur"}],
                    place: [{required: true, message: '请输入地点', trigger: "blur"}],
                    pointsDesc: [{required: true, message: '请输入扣分行为描述 ', trigger: "blur"}],
                    measures: [{required: true, message: '请输入采取的处理措施 ', trigger: "blur"}],
                },
                type: "add"
            };
        },
        created() {
             if (this.$route.query) {
                let arr=this.$route.query.rId.split(',')
                 console.log('sdfsd',this.$router.currentRoute.matched[2]);
                 this.$router.currentRoute.matched[2].meta.paramsId = {
                    id: arr[0],
                    type: arr[1],
                    userId: arr[2]
                }
                  if(this.$router.currentRoute.matched[2].path=='/addPersonDoc/:id'){
                    this.$router.currentRoute.matched[2].path='/addPersonDoc/'+arr[1]

                }
                 this.$router.currentRoute.matched[2].meta.title =
                    this.$route.query.rId.split(',')[1] == "add"
                        ? "人员档案新增"
                        : this.$route.query.rId.split(',')[1] == "edit"
                        ? "人员档案编辑"
                        : this.$route.query.rId.split(',')[1] == "info"
                            ? "人员档案详情"
                            : "";
                 let arrpath=this.$route.path.split('/')
                this.type = arrpath[arrpath.length-1];
                 if(this.$route.path.substring(1,5)=='info'||this.$route.path.match(/[Z|S].*/) ){
                     this.type='info'
                 }
                request({
                    url: `${this.$ip}/mms-parameter/businessDictionaryValue/listByCodes`,
                    method: 'post',
                    params: {delete: false},
                    data: ["Z_workType"]
                }).then(d => {
                    let obj = d.data
                    this.options = obj

                });
                this.$route.meta.title =
                    this.type == "add"
                        ? "作风建设量化考核记录新增"
                        : this.type == "edit"
                        ? "作风建设量化考核记录编辑"
                        : this.type == "info"
                            ? "作风建设量化考核记录详情" : ''

                if (this.type != 'add') {
                    request({
                        url: `${this.$ip}/mms-qualification/styleInf/getById/${this.$route.query.id}`,
                        method: "get",
                    }).then(d => {

                        this.form = {...d.data}
                    }).catch(error => {
                        this.$message.error(error);
                    });

                }
            }


        },
        mounted() {
            eleDateShow()
            inputLength(this)
        },
        methods: {

            resetForm() {
                if (this.form.id) {
                    this.form = {id: this.form.id};
                } else {
                    this.form = {};
                }
            },
            saveForm(form) {
                if (this.type == "add" || this.type == "edit") {
                    this.$refs[form].validate(valid => {
                        if (valid) {
                            let url
                            if (this.type == 'add') {
                                url = '/styleInf/save'
                            } else {
                                url = '/styleInf/update'
                            }
                            request({
                                url: `${this.$ip}/mms-qualification${url}`,
                                method: 'post',
                                data: {...this.form, userRecordId: this.$route.query.rId.split(',')[0]},
                            }).then((data) => {
                                this.$message.success("保存成功！");
                                this.$router.go(-1)
                            })
                        }
                    });
                }
            },
            focus(val) {
                let e = new Date(this.form.endTime)
                let s = new Date(this.form.startTime)
                let t = new Date()

                this.pickerOptions = {
                    disabledDate(time) {
                        if (e) {
                            return time.getTime() >= e.getTime();
                            // return time.getTime() > e.getTime()||time.getTime() > t.getTime();
                        }
                    },
                };
            },
            focus1(val) {
                let e = new Date(this.form.endTime)
                let s = new Date(this.form.startTime)
                let t = new Date()
                this.pickerOptions1 = {
                    disabledDate(time) {
                        // console.log(1, 8);
                        if (s) {
                            return time.getTime() <= s.getTime();
                            // return time.getTime() < s.getTime()|| time.getTime() > t.getTime() ;
                        }
                    },
                };
            },
        }
    };
</script>
<style scoped lang="scss">
    .indexAdd {
        padding: 0 30px;
    }

    /deep/ .el-form {
        .el-form-item__label {
            width: 140px !important;

        }
        .el-form-item__content {
            width: calc(100% - 180px);
        }
    }
</style>
