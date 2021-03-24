<template>
    <div>
        <div class="sysParameter">
            <div class="top-content">
                <div class="top-content-title">
                    <span>收费单（{{ruleForm.inOrOut?'国内':'国际'}}）-{{type=='add'?'新增':type=='edit'?'编辑':type=='info'?'详情':''}}</span>
                </div>
                <div class="top-toolbar">

                    <div @click="type!='info'?submitForm('ruleForm'):()=>{}" :class="type=='info'?'isDisabled':''"
                         v-if="type!=='info'">
                        <icon iconClass="save"></icon>
                        保存
                    </div>
                    <div @click="type!='info'?resetForm('ruleForm'):()=>{}" :class="type=='info'?'isDisabled':''"
                         v-if="type!=='info'">
                        <icon iconClass="reset"></icon>
                        重置
                    </div>
                </div>
            </div>
            <div class="main-content">
                <div class="header">机务服务非例行工作结算清单{{ruleForm.number?`(NO ${ruleForm.number})`:''}}</div>
                <el-form :inline="true" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px"
                         class="demo-ruleForm" style=" width:1280px;">
                    <el-row>

                        <el-col :span="12">
                            <!--/Date-->
                            <el-form-item label="日期" prop="workDate" :label-width='labelWidth'>
                                <!-- <el-input v-model="ruleForm.workDate"  style='width:320px;'></el-input> -->
                                <span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.workDate | formatDate}}</span>
                                <el-date-picker
                                        @change="clearFlightInfo"
                                        v-else
                                        v-model="ruleForm.workDate"
                                        type="date"
                                        style='width:320px;'
                                        placeholder="选择日期">
                                </el-date-picker>
                            </el-form-item>

                        </el-col>
                        <el-col :span="12">
                            <!--/Flight No-->
                            <el-form-item label="航班号" prop="flightNo" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:320px;'>{{ruleForm.flightNo}}</span>
                                <el-input @input="clearFlightInfo" v-else v-model="ruleForm.flightNo"
                                          style='width:244px;'></el-input>
                                <el-button v-if="!isInfo" class="" type="primary" @click="queryFlightInfo">查询
                                </el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <!--/Airline-->
                            <el-form-item label="航空公司" prop="airLine" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:320px;'>{{ruleForm.airLine}}</span>
                                <el-input :disabled="true" v-else v-model="ruleForm.airLine" style='width:320px;'
                                          placeholder="点击查询按钮获取"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <!--/Aircraft Type-->
                            <el-form-item label="飞机型号" prop="aircraftType" :label-width='labelWidth'>
                                <span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.aircraftType}}</span>
                                <el-input :disabled="true" v-else v-model="ruleForm.aircraftType" style='width:320px;'
                                          placeholder="点击查询按钮获取"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <!--/Aircraft Reg-->
                            <el-form-item label="机号" prop="aircraftReg" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:320px;'>{{ruleForm.aircraftReg}}</span>
                                <el-input :disabled="true" v-else v-model="ruleForm.aircraftReg" style='width:320px;'
                                          placeholder="点击查询按钮获取"></el-input>
                            </el-form-item>
                        </el-col>

                        <el-col :span="12">
                            <!--/Subsidiary-->
                            <el-form-item label="分(子)公司" prop="subsidiary" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:320px;'>{{ruleForm.subsidiary}}</span>
                                <el-input v-else v-model="ruleForm.subsidiary" style='width:320px;'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <!--/Departure/Arrival Airport-->
                            <el-form-item label="起降机场" prop="arrivalAirport"
                                          :label-width='labelWidth'>
                                <span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.arrivalAirport}}</span>
                                <el-input v-else v-model="ruleForm.arrivalAirport" style='width:320px;'></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <!--/Nonroutine Work-->
                            <el-form-item label="非例行工作内容" prop="nonroutineWork"
                                          :label-width='labelWidth'>
                                <span v-if="isInfo" class='form_inlne_val' style='width:320px;'>{{ruleForm.nonroutineWork}}</span>
                                <el-input v-else v-model="ruleForm.nonroutineWork" style='width:320px;'></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <div>
                        <el-row>
                            <el-col :span="12" v-if="ruleForm.inOrOut">
                                <el-form-item label="人工时" prop="people" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.people}}</span>
                                    <el-input v-else v-model="ruleForm.people" @input="changeCode('people','number')"
                                              style='width:119px;'></el-input>
                                    <span class='form_inlne_val1' style="margin-right: 10px">人</span>
                                </el-form-item>
                                <el-form-item>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.hours}}</span>
                                    <el-input v-else v-model="ruleForm.hours" @input="changeCode('hours','hours')"
                                              style='width:118px;'></el-input>
                                    <span class='form_inlne_val1'>小时</span>
                                </el-form-item>
                            </el-col>
                            <template v-else>
                                <el-col :span="12">
                                    <!--/Man hour-->
                                    <el-form-item label="非例行维护服务技术人员" prop="nonroutineServiceTechnicians"
                                                  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.nonroutineServiceTechnicians}}</span>
                                        <el-input v-else v-model="ruleForm.nonroutineServiceTechnicians"
                                                  @input="changeCode('nonroutineServiceTechnicians','number')"
                                                  style='width:119px;'></el-input>
                                        <!--/Man--><span class='form_inlne_val1' style="margin-right: 10px">人</span>
                                    </el-form-item>
                                    <el-form-item>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.nonroutineServiceTechniciansTime}}</span>
                                        <el-input v-else v-model="ruleForm.nonroutineServiceTechniciansTime"
                                                  @input="changeCode('nonroutineServiceTechniciansTime','hours',$event)"
                                                  style='width:118px;'></el-input>
                                        <span class='form_inlne_val1'>小时</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <!--/Man hour-->
                                    <el-form-item label="非例行维护服务工程人员" prop="nonroutineServicePersons"
                                                  :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.nonroutineServicePersons}}</span>
                                        <el-input v-else v-model="ruleForm.nonroutineServicePersons"
                                                  @input="changeCode('nonroutineServicePersons','number')"
                                                  style='width:119px;'></el-input>
                                        <!--/Man--><span class='form_inlne_val1' style="margin-right: 10px">人</span>
                                    </el-form-item>
                                    <el-form-item>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.nonroutineServicePersonsTime}}</span>
                                        <el-input v-else v-model="ruleForm.nonroutineServicePersonsTime"
                                                  @input="changeCode('nonroutineServicePersonsTime','hours')"
                                                  style='width:118px;'></el-input>
                                        <span class='form_inlne_val1'>小时</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <!--/Man hour-->
                                    <el-form-item label="非例行除冰工程人员" prop="deicingPersons" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.deicingPersons}}</span>
                                        <el-input v-else v-model="ruleForm.deicingPersons"
                                                  @input="changeCode('deicingPersons','number')"
                                                  style='width:119px;'></el-input>
                                        <!--/Man--><span class='form_inlne_val1' style="margin-right: 10px">人</span>
                                    </el-form-item>
                                    <el-form-item>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:95px;'>{{ruleForm.deicingPersonsTime}}</span>
                                        <el-input v-else v-model="ruleForm.deicingPersonsTime"
                                                  @input="changeCode('deicingPersonsTime','hours')"
                                                  style='width:118px;'></el-input>
                                        <span class='form_inlne_val1'>小时</span>
                                    </el-form-item>
                                </el-col>
                            </template>

                            <el-col :span="12">
                                <!--/Aircraft Deicing System-->
                                <el-form-item label="除冰车" prop="aircraftDeicingSystem"
                                              :label-width='labelWidth'>
                                    <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.aircraftDeicingSystem}}</span>
                                    <el-input v-else v-model="ruleForm.aircraftDeicingSystem"
                                              @input="changeCode('aircraftDeicingSystem','hours')"
                                              style='width:280px;'></el-input>
                                    <!--/Hour-->
                                    <span class='form_inlne_val1'>台/小时</span>
                                </el-form-item>
                            </el-col>
                        </el-row>
                        <el-row>

                            <el-col :span="12" v-if="ruleForm.inOrOut">
                                <!--/High/Low pressure Nitrogen-->
                                <el-form-item label="轮胎充气(高/低压氮气)" prop="pressureNitrogen"
                                              :label-width='labelWidth'>
                                    <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.pressureNitrogen}}</span>
                                    <el-input v-else v-model="ruleForm.pressureNitrogen"
                                              @input="changeCode('pressureNitrogen','number')"
                                              style='width:280px;'></el-input>
                                    <span class='form_inlne_val1'>次</span>
                                </el-form-item>
                            </el-col>
                            <template v-else>
                                <el-col :span="12">
                                    <el-form-item label="充氮、冷气（减震栓系统）" prop="damperSystemsTimes"
                                                  :label-width='labelWidth'>
                                        <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.damperSystemsTimes}}</span>
                                        <el-input v-else v-model="ruleForm.damperSystemsTimes"
                                                  @input="changeCode('damperSystemsTimes','number')"
                                                  style='width:280px;'></el-input>
                                        <span class='form_inlne_val1'>每减震栓/每次</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="轮胎充气(高/低压氮气)" prop="tyreTimes"
                                                  :label-width='labelWidth'>
                                        <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.pressureNitrogen}}</span>
                                        <el-input v-else v-model="ruleForm.pressureNitrogen"
                                                  @input="changeCode('pressureNitrogen','number')"
                                                  style='width:280px;'></el-input>
                                        <span class='form_inlne_val1'>每轮胎/每次</span>
                                    </el-form-item>
                                </el-col>
                            </template>
                            <el-col :span="12">
                                <!--/Hydraulic-->
                                <el-form-item label="除冰剂" prop="dfPlus" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:280px;'>{{ruleForm.dfPlus}}</span>
                                    <el-input v-else v-model="ruleForm.dfPlus" @input="changeCode('dfPlus','gallon')"
                                              style='width:280px;'></el-input>
                                    <!--/Gallon-->
                                    <span class='form_inlne_val1'>公升</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <!--/Hydraulic-->
                                <el-form-item label="液压油" prop="hydraulic" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:280px;'>{{ruleForm.hydraulic}}</span>
                                    <el-input v-else v-model="ruleForm.hydraulic"
                                              @input="changeCode('hydraulic','gallon')"
                                              style='width:280px;'></el-input>
                                    <!--/Gallon-->
                                    <span class='form_inlne_val1'>加仑</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <!--/Oxygcn Cart/Bottle-->
                                <el-form-item label="充氧气/瓶" prop="oxygenBottle"
                                              :label-width='labelWidth'>
                                    <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.oxygenBottle}}</span>
                                    <el-input v-else v-model="ruleForm.oxygenBottle"
                                              @input="changeCode('oxygenBottle','number')"
                                              style='width:280px;'></el-input>
                                    <!--/Bottle-->
                                    <span class='form_inlne_val1'>次</span>
                                </el-form-item>
                            </el-col>

                            <el-col :span="12">
                                <el-form-item label="轮轴千斤顶" prop="jack" :label-width='labelWidth'>
                                    <span v-if="isInfo" class='form_inlne_val'
                                          style='width:280px;'>{{ruleForm.jack}}</span>
                                    <el-input v-else v-model="ruleForm.jack" @input="changeCode('jack','number')"
                                              style='width:280px;'></el-input>
                                    <span class='form_inlne_val1'>次</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="12">
                                <el-form-item label="金属胶带" prop="metalTape" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:280px;'>{{ruleForm.metalTape}}</span>
                                    <el-input v-else v-model="ruleForm.metalTape"
                                              @input="changeCode('metalTape',ruleForm.inOrOut?'number':'number1')"
                                              style='width:280px;'></el-input>
                                    <span class='form_inlne_val1'>{{ruleForm.inOrOut?'次':'米'}}</span>
                                </el-form-item>
                            </el-col>
                            <template v-if="ruleForm.inOrOut">
                                <el-col :span="12">
                                    <el-form-item label="滑油（飞马2号）" prop="oil2" :label-width='labelWidth'>
                                        <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.oil2}}</span>
                                        <el-input v-else v-model="ruleForm.oil2" @input="changeCode('oil2','quart')"
                                                  style='width:280px;'></el-input>
                                        <span class='form_inlne_val1'>夸脱</span>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="12">
                                    <el-form-item label="滑油（2197）" prop="oil2197" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:280px;'>{{ruleForm.oil2197}}</span>
                                        <el-input v-else v-model="ruleForm.oil2197"
                                                  @input="changeCode('oil2197','kilogram')"
                                                  style='width:280px;'></el-input>
                                        <span class='form_inlne_val1'>夸脱</span>
                                    </el-form-item>
                                </el-col>
                            </template>
                            <el-col :span="12" v-else>
                                <el-form-item label="滑油" prop="oil" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:280px;'>{{ruleForm.oil}}</span>
                                    <el-input v-else v-model="ruleForm.oil" @input="changeCode('oil','number1')"
                                              style='width:280px;'></el-input>
                                    <span class='form_inlne_val1'>夸脱</span>
                                </el-form-item>
                            </el-col>


                            <el-col :span="12">
                                <el-form-item label="工作梯" prop="workLadder" :label-width='labelWidth'>
                                    <span v-if="isInfo" class='form_inlne_val' style='width:280px;'>{{ruleForm.workLadder}}</span>
                                    <el-input v-else v-model="ruleForm.workLadder"
                                              @input="changeCode('workLadder','number')"
                                              style='width:280px;'></el-input>
                                    <span class='form_inlne_val1'>次</span>
                                </el-form-item>
                            </el-col>


                            <el-col :span="12" v-if="ruleForm.inOrOut">
                                <el-form-item label="拖把" prop="mop" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                      style='width:280px;'>{{ruleForm.mop}}</span>
                                    <el-input v-else v-model="ruleForm.mop" @input="changeCode('mop','number')"
                                              style='width:280px;'></el-input>
                                    <span class='form_inlne_val1'>次</span>

                                </el-form-item>
                            </el-col>
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
                                        <el-button size="small" type="primary" class="rowSvg">
                                            <icon iconClass="upload"></icon>
                                            {{type=='edit'?'重新上传':'上传'}}
                                        </el-button>
                                    </el-upload>
                                    <span v-if="type=='info'" class='hoverSpanFile' @click="preImg">{{fileList.map(i=>i.name).toString()}}</span>
                                </el-form-item>
                            </el-col>
                            <el-col :span="24" class="other">
                                <el-form-item label="其他" prop="others" :label-width='labelWidth'>
								<span v-if="isInfo" class='form_inlne_val'
                                >{{ruleForm.others}}</span>
                                    <el-input v-else v-model="ruleForm.others" type="textarea"></el-input>
                                </el-form-item>
                            </el-col>
                        </el-row>


                        <div v-if="type=='info'">
                            <!--/Worker Signature-->
                            <el-form-item label="工作者签字" :label-width='labelWidth'>
                                <div class="signShow">
								<span v-for="(k,l) in getSign(ruleForm.workerSignature)" :key="l">
									<img :src="k" alt="请刷新" v-if="k">
								</span>
                                    <span v-if="!getSign(ruleForm.workerSignature).length">--</span>

                                </div>
                            </el-form-item>

                        </div>
                        <div class="moreLine" v-if="type=='info'">
                            <!--/Crew Or Customer  Representative Signature-->
                            <el-form-item label="机组或客户代表签字" :label-width='labelWidth'>
                                <div class="signShow">
							<span v-for="(k,l) in getSign(ruleForm.customerSignature)" :key="l">
								<img :src="k" alt="请刷新" v-if="k">
							</span>
                                    <span v-if="!getSign(ruleForm.customerSignature).length">--</span>
                                </div>
                            </el-form-item>
                        </div>
                    </div>

                </el-form>
            </div>
        </div>
        <SeeImg ref="SeeImg"></SeeImg>
        <SelectFilghtInfo ref="SelectFilghtInfo" @getFlightINfo="getFlightInfo"></SelectFilghtInfo>
    </div>
</template>
<script>
    import moment from 'moment'
    import {getToken} from '@lib/auth';

    import SearchTable from '@/ui/components/SearchTable';
    import Icon from '@components/Icon-svg/index';
    import request from '@lib/axios.js';
    import {extend} from 'lodash';
    import {eleDateShow} from '@lib/tools'
    import SelectFilghtInfo from "./selectFlightInfo"

    export default {
        components: {
            Icon,
            SearchTable,
            SelectFilghtInfo
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
            getSign: function () {
                return (data) => {
                    if (!data) {
                        return []
                    }
                    let arr = data.split(',').map((k, l) => {
                        console.log();
                        if (!k) {
                            return ''
                        }
                        let arrC = k.split('------')
                        return 'data:image/png;base64,' + arrC[arrC.length - 1]
                    })
                    return arr
                }
            },
            isInfo: {
                get: function () {
                    return this.type === 'info'
                },
                set: function () {
                }
            }
        },
        name: 'chargeAdd',
        data() {

            return {
                ruleForm: {
                    arrivalAirport: 'TFU',  // 起降机场
                },
                airlineStatus: '',
                AirlineObj: {},
                labelWidth: '200px',
                rules: {
                    flightNo: [
                        {required: true, message: '请输入航班号', trigger: 'change'},
                    ],
                    workDate: [
                        {required: true, message: '请选择时间', trigger: 'change'}
                    ],

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

                    this.getChargeInfo()
                } else {
                    this.$set(this.ruleForm, 'inOrOut', !this.$route.query.inOrOut)
                }
                this.airlineStatus = this.getAirline()

            }

        },
        mounted() {
            eleDateShow()
        },
        methods: {
            getAirline() {
                return new Promise((resolve, reject) => {
                    request({
                        url: `${this.$ip}/config-client-mms/config/findConfigs?configName=Airline`,
                        method: 'get',
                    }).then(d => {
                        if (d.data && d.data.length) {
                            d.data.map((k, l) => {
                                if (!k.parentCode) {
                                    this.AirlineObj[k.iata] = k.fullname
                                }
                            })
                            resolve()
                        } else {
                            reject()
                        }
                    }).catch(() => {
                        reject()
                    });
                })
            },
            clearFlightInfo() {
                this.ruleForm = {
                    ...this.ruleForm,
                    airLine: null,
                    aircraftType: null,
                    aircraftReg: null,
                    flightId: null,
                }
            },
            setFlightInfo(data) {
                this.ruleForm = {
                    ...this.ruleForm,
                    airLine: data.airline || this.AirlineObj[data.airlineCode],
                    aircraftType: data.aircraftType,
                    aircraftReg: data.aircraftNo,
                    flightId: data.flightId,
                    // flightNo:data.flightNo,
                }
                this.$message({message: '已为您填充查询到的航班信息', type: 'success', duration: 1000})

            },
            getFlightInfo(data) {
                if (data.airline) {
                    this.setFlightInfo(data)
                    return
                }
                this.airlineStatus.then((d) => {
                    this.setFlightInfo(data)
                }).catch(() => {
                    // this.$confirm('未获取到航司列表信息，将不能为您匹配航空公司项，是否重新获取', '提示', {
                    //     confirmButtonText: '确定',
                    //     cancelButtonText: '取消',
                    //     type: 'warning',
                    // }).then((d)=>{
                    //     this.getAirline().then(()=>{
                    //         this.setFlightInfo()
                    //     })
                    // }).catch(()=>{
                    //
                    // })
                })

            },
            queryFlightInfo() {
                if (this.ruleForm.workDate && this.ruleForm.flightNo) {
                    let params = {
                        flightNo: this.ruleForm.flightNo,
                        date: moment(this.ruleForm.workDate).format('YYYY-MM-DD'),
                    }
                    request({
                        url: `${this.$OMSip}/omms-tf-comm-web/oflight/getFlightByFlightNoAndDate`,
                        method: 'get',
                        params
                    }).then((d) => {
                        if (d.data && d.data.length > 0) {
                            if (d.data.length > 1) {
                                this.$refs.SelectFilghtInfo.open(d.data, this.AirlineObj)
                            } else {
                                this.getFlightInfo(d.data[0])
                            }
                        } else {
                            this.$message.warning('未查询到航班信息')
                        }
                    })
                } else {
                    this.$message.warning('日期和航班号不能为空')
                }

            },
            changeCode(key, type,e) {
                let value = this.ruleForm[key]
                let s
                let old=e
                console.log('ov',value,old);
                if (type !== 'number') {
                    let reg = /^(([1-9]\d{0,5})|([1-9]\d{0,7}\.)|(0\.))(\d{0,2})$/g;
                     s = value.replace(/[^\d|\.]/g, '')
                    s = s.replace(/(\d{0,8})(\d*)(.*)/g, '$1$3')
                     let obj = reg.test(s)
                    console.log('s',s);
                    if (!obj) {
                         let arr=s.split('.')
                        if(arr.length>1){
                            console.log(arr[arr.length - 1].length);
                            if(arr[0]!=='0'&&!arr[0]||(arr[1]!=='0'&&!arr[1])){
                                console.log('q');
                                s = s.replace(/\./, '')
                            }else if(arr[arr.length-1]&&arr[arr.length-1].length>=3){
                                console.log('q1');
                                s = s.slice(0, s.length - 1)
                            }else if(arr[2]!=='0'&&!arr[2]){
                                console.log('q2',arr[2]);
                                s = s.slice(0, s.length - 1)
                            }else if(arr[0]&&arr[0].length==8){
                                console.log('q3');
                                // s = s.replace(/\./, '')
                                s=s.split('').reverse().join('').replace(/\./, '').split('').reverse().join('')
                            }else{
                                console.log('q4');
                                s = s.replace(/\./, '')
                            }
                            // s=arr[0]+'.'+arr[1].slice(0,2)
                        }else{
                            if(arr[0]!=='0'){
                                s = s.slice(0, s.length - 1)
                            }
                        }
                    }
                    console.log(s, obj);
                    // s= value.replace(reg,'$2$3')
                } else {
                    //只能输入正整数
                    let reg = /([^\d]*)/g
                    let reg1 = /(0*)([1-9](\d{0,7}))?(\d*)/g
                    s = value.replace(reg, '')
                    s = s.replace(reg1, '$2') || null

                }
                this.$set(this.ruleForm, key, s);
            },
            fileUploadSuccessFn(response) {
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
            handleExceedFn() {
                this.$message({type: 'warning', message: '只能上传一个文件，请将源文件删除后再上传'});
            },
            fileRemoveFn() {
                this.ruleForm.picture = ''

            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (!this.ruleForm.flightId) {
                            this.$message.warning('请先点击查询按钮获取航班信息')
                            return
                        }
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
                            this.$message({type: 'success', message: '编辑成功'});
                            this.$router.go(-1)
                        } else {
                            this.$message({type: 'error', message: '新增失败，请重试'});
                        }
                    })
            },
            resetForm() {
                this.ruleForm = {
                    id: this.ruleForm.id,
                    inOrOut: this.ruleForm.inOrOut
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
            preImg() {
                this.$refs.SeeImg.open(this.fileList[0], '纸质收费单')
            }
        },
    };
</script>
<style scoped lang="scss">
    @import "@/ui/styles/common_list.scss";

    .other {
        /deep/ .el-form-item {
            width: 100%;
        }
        /deep/ .el-form-item__content {
            width: calc(100% - 361px);
        }
    }

    .rowSvg {
        .svg-icon {
            fill: #fff;
        }
        .svg-icon:hover {
            fill: #fff;
        }
    }

    .sysParameter {
        overflow-y: auto;
        height: calc(100vh - 110px);
        .moreLine {
            /deep/ .el-form-item__label {
                line-height: 20px;

            }
        }
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

    .hoverSpanFile:hover {
        color: #5cb6ff;
        cursor: pointer;
    }
</style>
