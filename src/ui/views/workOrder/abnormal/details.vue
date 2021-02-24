<template>
    <div class="index" style="display: flex;flex-direction: column;align-items: center">
        <div style="width: 60%;">
            <div style="text-align: center;font-size: 20px;padding: 20px ">工单分派信息</div>
            <div class="top-toolbar">
                <div @click="onPreview()">
                    <icon iconClass="imgPre"></icon>
                    黄页预览
                </div>
            </div>
            <el-image-viewer v-if="showViewer" :url-list="urlList" :on-close="closeViewer"></el-image-viewer>
            <InfoTop ref="InfoTop" :form="orderModule" :workorder="workorder"></InfoTop>
        </div>
        <div style="width: 60%;">
            <div style="text-align: center;font-size: 20px;padding: 20px 20px 0px 20px ">工单签署信息</div>

            <div class="base_item" style="margin: 20px 0">
                <div :class=" type=='info' ?'base_i_inner flex flex_wrap lists1':'base_i_inner flex flex_wrap'">
                    <div class="lists" v-for='(item, index) in getbaseItemVOList' :key='index'>
                        <div class="label">
                            <div>{{item.nameCn}}</div>
                            <div>{{item.nameEn}}</div>
                        </div>
                        <div v-if='item.type==1' :id='item.placeholder' class="value1 value">
                            {{workorder[value5Type[item.value]]}}
                        </div>
                        <div v-if='item.type==2' class="value2 value">{{item.value}}</div>
                        <div v-if='item.type==3' class="value3 value">
                            <input type="text" :disabled="type=='info'"
                                   :name="item.placeholder" :id="item.placeholder">
                        </div>
                        <div v-if='item.type==7' class="value3 value">
                            <input type="date" :disabled="type=='info'"
                                   :name="item.placeholder" :id="item.placeholder">
                        </div>
                        <div v-if='item.type==4' class="value4 value">

                            <img :src="$workImgIp+item.value.split('$')[1]">
                        </div>
                        <div v-if='item.type==5'
                             class="value5  value flex flex_wrap align_center">
                            <div v-for="(k,l) in item.value.split(';')" :key="l"
                                 class="flex align_center">
                                <input type="checkbox" :disabled="type=='info'"
                                       :name="item.placeholder.split(';')[l]"
                                       class="Wtui-checkbox">{{k}}&nbsp;
                                <!-- <div style="width: 100%" >
                                    {{'${'+item.placeholder.split(';')[l]+'}'}}
                                </div> -->
                            </div>
                        </div>
                        <div v-if='item.type==6||item.type==8' class="value6  value"
                             style="position:relative">
                            <!-- <el-button type='primary' @click='signOthFn("sign_"+index)'>签章</el-button> -->
                            <el-button v-if="type!='info'"
                                       @click="signOthMsgBoxFn(item.placeholder,$event,item.type)"
                                       type="primary"
                                       style="padding: 7px 15px">签字
                            </el-button>
                            <div style="width:50px;height:50px;position:absolute;left:200px;top:10px">
                                <div :pos="item.placeholder" :id="item.placeholder"></div>
                            </div>
                        </div>
                    </div>
                    <div class=" base_i_inner_btn flex justify_center align_center"
                         v-if="type!='info'">
                        <el-button type="primary" @click="saveBasicFn('isActiveSave')"><i
                                v-show='!isActiveSave'
                                class="el-icon-loading"></i>保存
                        </el-button>
                        <el-button type="primary" @click="BasicUpdateFn('isActiveReset')"><i
                                v-show='!isActiveReset'
                                class="el-icon-loading"></i>重置
                        </el-button>
                    </div>
                </div>
            </div>

            <div class="order_content">
                <div class="order_c_main">
                    <div class="item1 flex">
                        <div style="width:12%;">
                            <div>{{labelVO.itemLabel}}</div>
                            <div>{{labelVO.itemLabelEnglish}}</div>
                        </div>
                        <div :style="{width: col==3 ? '70%': col==2?'88%' : '55%'}">
                            <div>{{labelVO.contentLabel}}</div>
                            <div>{{labelVO.contentLabelEnglish}}</div>
                        </div>
                        <div style="width:18%" v-if='col==3||col==4'>
                            <div>{{labelVO.workerLabel}}</div>
                            <div>{{labelVO.workerLabelEnglish}}</div>
                        </div>
                        <div style="width:16.5%" v-if='col==4'>
                            <div>{{labelVO.commanderLabel}}</div>
                            <div>{{labelVO.commanderLabelEnglish}}</div>
                        </div>
                    </div>
                    <div class="order_c_b">
                        <div v-for='(item, index) in contentVOListMap' :key='item.id'>

                            <div class="flex">
                                <div class="item flex align_start"
                                     style="min-height:120px;width:12%;padding:4px;box-sizing:border-box;text-align: center;display: inline-block">

                                    {{item.reduceIndex}}
                                    <NaTemp :type="type" :serialNumber="item.serialNumber" :newMap="newMap" :item='item'
                                            @changeActiveFn='changeActiveFn($event,item)'></NaTemp>

                                </div>

                                <div style="width:88%;"
                                     v-if='item.contentDetails&&item.contentDetails.length'>
                                    <div v-for='itemChild in item.contentDetails'
                                         :key='itemChild.key' class="flex">
                                        <div class="item"
                                             style="min-height:120px;"
                                             v-if :style="{width: col==3 ? '79.8%':col==2?'100%' : '62.5%'}">
                                            <!--style="width:63.4%;"="item.reduceIndex.includes('.')" -->
                                            <div class="textContent"
                                                 :class="itemChild.id"
                                                 :contentId="itemChild.id"
                                                 v-html='itemChild.content'
                                                 style="text-align: left;padding: 10px 10px;min-height: 70px"></div>
                                            <div v-if="type!='info'"
                                                 class='checkbox_group'>
                                                <el-button
                                                        @click="editContent($event,itemChild)"
                                                        type="primary"
                                                        style="padding: 7px 20px">
                                                    更正
                                                </el-button>
                                            </div>
                                        </div>
                                        <div style="min-height:120px;width:20.2%"
                                             v-if='col==3||col==4'
                                             :class="itemChild.workerLabel?'item itemSign':'item itemSign duijiao'"
                                        >
                                            <el-button
                                                    v-if="type!='info'&&itemChild.workerLabel"
                                                    @click="showMsgBoxFn(itemChild,'fix_sign_'+itemChild._reduceIndex, $event, 'fixedSignFn')"
                                                    type="primary"
                                                    style="padding: 7px 15px">
                                                签字
                                            </el-button>
                                            <div style="width:100%;position:absolute;left:0;top:40px;"
                                                 v-if='itemChild.workerLabel'>
                                                <div class="sign_box"
                                                     :id='"fix_sign_"+itemChild._reduceIndex'
                                                     :pos='"fix_sign_"+itemChild._reduceIndex'
                                                     style="width:100%;height:30px;width:100%"></div>
                                            </div>
                                        </div>
                                        <div style="min-height:120px;width:18.75%"
                                             :class="itemChild.commanderLabel?'item itemSign':'item itemSign duijiao'"

                                             v-if='col==4'>
                                            <el-button v-if="type!='info'&&itemChild.commanderLabel"
                                                       @click="showMsgBoxFn(itemChild,'travel_sign_'+itemChild._reduceIndex, $event, 'travelSignFn')"
                                                       type="primary" style="padding: 7px 15px">
                                                签字
                                            </el-button>
                                            <div style="width:100%;position:absolute;left:0;top:40px;"
                                                 v-if="itemChild.commanderLabel">
                                                <div class="sign_box" :id="'travel_sign_'+itemChild._reduceIndex"
                                                     :pos='"travel_sign_"+itemChild._reduceIndex'
                                                     style="width:100%;height:30px;width:100%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class='flex' style="width:88%">
                                    <div class="item"
                                         v-if :style="{width: col==3 ? '79.8%':col==2?'100%' : '62.5%'}">
                                        <div class="textContent"
                                             v-html='item.name'></div>
                                    </div>
                                    <div class="item"
                                         v-if='col==3||col==4'
                                         style="width:20.2%"></div>
                                    <div v-if='col==4' class="item"
                                         style="width:18.75%"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div style="text-align: right;margin-top: 20px" v-if="needSubmit">
                <el-button type="primary" @click="submit">提交</el-button>
            </div>
        </div>
        <!--<div id="kg-img-div-postil1">-->
        <!--<img src="" alt="">-->
        <!--</div>-->
    </div>
</template>
<script>
    import {eleDateShow,bindInputFn, inputLength} from '@lib/tools'

    import $ from 'jquery'
    import request from '@lib/axios.js';
    import InfoTop from './infoTop'
    import NaTemp from '@/ui/components/naTemp'
    import {SignatureInit} from '@/ui/lib/Signature.js'
    import {initParam} from './basicData'
    import ElImageViewer from "element-ui/packages/image/src/image-viewer";
    import Icon from '@components/Icon-svg/index';
    // import '../../../../../static/kinggrid/jquery-1.8.3.min.js'
    // import '../../../../../static/kinggrid/all'
    export default {
        components: {
            ElImageViewer, Icon,
            NaTemp, InfoTop
        },
        data() {
            return {
                type: '',
                newMap: [],
                contentVOListMap: [],
                contentVOList: [],
                workorder: {},
                orderModule: {},
                workerCompleteData: [],
                template: {},
                templateSignObj: {},
                baseItemVOList: [],
                labelVO: {},
                id: '',
                airInfo: {
                    'filePath': ''
                },
                value5Type: {
                    '$flightNo': 'flightNo',
                    '$flightRegisterNo': 'flightRegisterNo'
                },
                isActiveSave: true,
                isActiveReset: true,
                needSubmit: false,
                showViewer: false,
                urlList: [],
            }
        },
        beforeCreate() {
            // location.reload();
        },
        created() {

            if (this.$route.query) {
                this.id = this.$route.query.id
                this.type = this.$route.query.type;
                this.$route.meta.title =
                    this.type == "edit"
                        ? "异常更改"
                        : this.type == "info"
                        ? "工单详情"
                        : "";
                this.needSubmit = this.$route.query.needSubmit;
            }
            if (localStorage.getItem('refresh') == 'true') {
                localStorage.removeItem('refresh')
                location.reload()
            }
        },
        mounted() {
            inputLength(this)
            // SignatureInit('0002','123456',false,1,this.type!=='info')
            let _this = this
            //SignatureInit()
            this.init()
            Signature.bind({
                remove: function (fn) {//签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,
                    console.log('获取删除的签章ID：' + this.getSignatureid());
                    _this.deleteSignFn(this.getSignatureid(), this.getSignatureData())
                    //key,
                    //contentDetailId
                    fn(true);//保存成功后必须回调fn(true/false)传入true/false分别表示保存成功和失败

                },
                update: function (fn) {//签章数据有变动时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,执行后必须回调fn(true/false)，传入true/false分别表示保存成功和失败
                    console.log('获取更新的签章ID：' + this.getSignatureid());
                    //console.log('获取更新的签章数据：'+this.getSignatureData());
                    fn(true);
                }
            });


        },
        computed: {
            getbaseItemVOList() {
                let l = this.baseItemVOList.length % 3
                let obj = {
                    0: [],
                    1: [{type: 2}, {type: 2}],
                    2: [{type: 2}],
                }
                let arr = [...this.baseItemVOList]
                arr.push(...obj[l])
                console.log(arr, 3, 45, 6,);
                return arr
            },

            col: { // 列数
                get: function () {
                    let s = ''
                    if (this.labelVO.contentLayout == 'R2（二列）') {
                        s = '2'
                    } else if (this.labelVO.contentLayout == 'C3（三列）') {
                        s = '3'
                    } else {
                        s = '4'
                    }
                    return s
                },

            },
        },

        methods: {
            onPreview() {
                if (!this.workorder.pageFile) {
                    this.$message.info("该工单暂无黄页图片")
                } else {
                    this.showViewer = true;
                    request({
                        url: `${this.$ip}/mms-file/get-files-by-ids/`,
                        method: 'post',
                        params: {
                            fileIds: this.workorder.pageFile,
                        }
                    }).then((data) => {
                        if (data.code === 200) {
                            for (let i = 0; i < data.data.length; i++) {
                                this.urlList.push(data.data[i].filePath);
                            }
                        } else {
                            this.$message.error(data.message);
                        }
                    }).catch((error) => {
                        this.$message.error(error);
                    });
                }
            },
            // 关闭查看器
            closeViewer() {
                this.showViewer = false
            },
            editContent($event, item) {
                if (!item.editState) {
                    $($event.target).text('保存')
                    // item.buttonName='保存'
                    item.editState = true
                    // let reg=/(<input\s{0,}|<button\s{0,})disabled(.+?)(\/>|\/button>)/g
                    // item.content=item.content.replace(reg,"$1$2$3" )
                    let inputText = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input")
                    let button = $($event.target).parents('.checkbox_group').siblings('.textContent').find("button")
                    for (let i = 0; i < inputText.length; i++) {
                        inputText.eq(i).removeAttr("disabled")
                    }
                    for (let i = 0; i < button.length; i++) {
                        button.eq(i).removeAttr("disabled")
                    }
                    return false
                }
                let map = {}
                if ($($event.target).parents('.checkbox_group').siblings('.textContent').find("input")) {
                    let inputArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='checkBox']")
                    for (let i = 0; i < inputArr.length; i++) {
                        map[inputArr.eq(i).attr("name")] = inputArr.eq(i).is(':checked')
                    }
                    let inputNa = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='NA']")
                    for (let i = 0; i < inputNa.length; i++) {
                        map[inputNa.eq(i).attr("name")] = inputNa.eq(i).is(':checked')
                    }
                    let RchaArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='ycha']")
                    for (let i = 0; i < RchaArr.length; i++) {
                        map[RchaArr.eq(i).attr("name")] = RchaArr.eq(i).is(':checked')
                    }
                    let CchaArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='fcha']")
                    for (let i = 0; i < CchaArr.length; i++) {
                        map[CchaArr.eq(i).attr("name")] = CchaArr.eq(i).is(':checked')
                    }
                    let inputText = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='input']")
                    for (let i = 0; i < inputText.length; i++) {
                        map[inputText.eq(i).attr("name")] = inputText.eq(i).val()
                    }

                    let inputRadioArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='radio']")
                    for (let i = 0; i < inputRadioArr.length; i++) {
                        map[inputRadioArr.eq(i).attr("name")] = inputRadioArr.eq(i).is(':checked')
                    }
                }
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/exceptionUpdate`,
                    method: 'post',
                    data: {
                        contentDetailId: item.id, //内容id
                        serialNo: this.workorder.serialNo, // 工单流水号
                        map
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            $($event.target).text('更正')
                            if ($($event.target).parents('.checkbox_group').siblings('.textContent').find("input")) {
                                let inputButton = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input")
                                let button = $($event.target).parents('.checkbox_group').siblings('.textContent').find("button")
                                for (let i = 0; i < inputButton.length; i++) {
                                    inputButton.eq(i).attr("disabled", '')
                                }
                                for (let i = 0; i < button.length; i++) {
                                    button.eq(i).attr("disabled", '')
                                }
                            }

                            this.init(true)
                            this.$message({type: 'success', message: '保存成功'})
                        }

                    })

            },
            BasicUpdateFn(type) {
                this['isActiveReset'] = false
                this.init(true, true)
            },
            getVOListMap(arr) {
                const result = [];
                arr.forEach((item, index) => {
                    const map = (item) => {
                        result.push(item)
                        if (item.children && item.children.length) {
                            item.children.forEach(item1 => {
                                result.push(item1)

                            })
                        }
                    }
                    map(item)
                })
                let reduceIndex = 0
                let _reduceIndex = 0
                let itemNumber = 0
                let _itemNumber = 0
                result.forEach((item, index) => {
                    if (item.number) {
                        reduceIndex = 0
                        _reduceIndex = 0
                        itemNumber = item.number
                        _itemNumber = item.serialNumber
                        item.reduceIndex = itemNumber
                        item._reduceIndex = _itemNumber
                    } else {
                        reduceIndex++
                        item.reduceIndex = itemNumber + '.' + (reduceIndex)
                        item._reduceIndex = _itemNumber + '_' + (reduceIndex)
                    }
                    if (item.contentDetails && item.contentDetails.length) {
                        item.contentDetails.forEach((itemChild, indexChild) => {
                            let reg = /(<input\s{0,}|<button\s{0,})(.+?)(\/>|\/button>)/g
                            if (itemChild.content) itemChild.content = itemChild.content.replace(reg, "$1 disabled $2$3");
                            itemChild.reduceIndex = item.reduceIndex + '.' + (indexChild + 1)
                            itemChild._reduceIndex = item._reduceIndex + '_' + (indexChild + 1)
                            // itemChild['buttonName'] = '更正'
                        })
                    }
                    //this.$set(item,'active',true)
                })
                console.log(result)
                return result
            },
            async init(isClearAll = false, BasicUpdateLimit = false) {
                await this.getTemplateById()
                await this.getBySerialNoFn(isClearAll, BasicUpdateLimit)

            },
            getTemplateById() {
                let _this = this
                return new Promise((resolve, reject) => {
                    request({
                        url: `${this.$ip}/mms-workorder/workorder/refresh?workorderId=${this.id}`,
                        method: 'get',
                    })
                        .then((data) => {
                            if (data.code == 200) {
                                this.contentVOListMap = this.getVOListMap(data.data.template.contentVOList)
                                this.contentVOList = data.data.template.contentVOList
                                this.workorder = data.data.workorder
                                this.orderModule = data.data.template
                                this.baseItemVOList = data.data.template.baseItemVOList.filter(i => i.enable)
                                if (this.baseItemVOList.length % 3 != 0) {
                                    this.baseItemVOList.push({})
                                    if (this.baseItemVOList % 3 != 0) {
                                        this.baseItemVOList.push({})
                                    }
                                }
                                this.template = data.data.template.typeVO
                                this.labelVO = data.data.template.labelVO
                                this.getFileByIdFn(this.template.airlineCompanyLogo)
                                let _this = this

                                this.$nextTick(() => {
                                    bindInputFn(this)
                                    //if($(".textContent button").innerText ==='签章'){
                                    $(".textContent button").on('click', function () {
                                        let contentId = $(this).parents(".textContent").attr("contentId")
                                        $(this).siblings("input").attr("pos", $(this).siblings("input").attr("id"))
                                        _this.signMsgBoxFn($(this).siblings("input").attr("id"), contentId)
                                    })
                                    $(".textContent input[type='checkbox']").on('change', function () {
                                        if ($(this).is(":checked")) {
                                            $(this).val('on')
                                        } else {
                                            $(this).val('off')
                                        }
                                        // if(_this.editMap.find(i=>i.key==$(this).attr("id"))){
                                        //     _this.editMap.find(i=>i.key==$(this).attr("id")).value = $(this).is(":checked").toString()
                                        // }else{
                                        //     _this.editMap.push({
                                        //         key: $(this).attr("id"),
                                        //         value: $(this).is(":checked").toString(),
                                        //     })
                                        // }
                                        //$(this).attr("id") // 1_1_152114913_radio5
                                    })
                                    // $(".textContent input[type='text']").on('input', function(){
                                    //     if(_this.editMap.find(i=>i.key==$(this).attr("id"))){
                                    //         _this.editMap.find(i=>i.key==$(this).attr("id")).value = $(this).val()
                                    //     }else{
                                    //         _this.editMap.push({
                                    //             key: $(this).attr("id"),
                                    //             value: $(this).val(),
                                    //         })
                                    //     }
                                    // })
                                })
                                this.$refs["InfoTop"].getimg(this.template.airlineCompanyLogo);
                                resolve()
                            } else {
                                this.$message({type: 'error', message: '新增失败，请重试'});
                            }
                        })
                })
            },
            inputTypeBlur(type,e){
                if(e.target.value===''){
                    return false
                }
                let value= e.target.value
                let reg=/^((-\d+)|(\d+))(\.?\d+)?$/g
                let blo=reg.test(e.target.value)
                if(!blo){

                }
                if(value.split('.').length>1&&value.split('.')[1]===''){
                    e.target.value= value.split('.')[0]
                    this.$message.warning('以为您自动过滤尾部‘.’')
                }
                if(value.split('-').length>1&&value.split('-')[1]===''){
                    e.target.value= null
                    this.$message.warning('请输入正确的数字')
                }


            },
            inputTypeC(type,e){
                if(e.target.value===''){
                    return false
                }
                let value= e.target.value
                let reg = /([^(\d|\-)])?(-)?([^\d])?(\d{0,})?([^(\.|\d)]+)?(\.)?([^(\.|\d)]+)?(\d{0,})?([^\d]{0,})?/g;
                // let reg = /([^(\d)])?(\-\d+|\-\d+\.|\d+|\d+\.)?([^\d])?(\d)?([^\d])?/g;
                console.log(reg.test(value));
                let reg1=/^(-|\d)(\d{0,})(\.?)?(\d+)?$/g
                let blo=reg1.test( value)
                e.target.value= value.replace(reg,'$2$4$6$8')
                if(!blo){
                    debounce(()=>{
                        this.$message.warning('只能输入数字')
                    },300)()
                }
            },
            findByUserFn(user = {}) {
                console.log(user)
                if (user.userName && user.password) {
                    return new Promise((resolve, reject) => {
                        request({
                            url: `${this.$ip}/sys/user/findByUser`,
                            method: 'get',
                            params: {
                                user
                            }
                        }).then((result) => {
                            console.log(result)
                            if (result.responseCode === 1000) {
                                if (result.data.length > 0) {
                                    resolve('1')
                                } else {
                                    resolve('0')
                                }
                            } else {
                                resolve('0')
                            }
                        })
                    })
                }
                // let a = {
                //     "userName":"admin",
                //     "password":"air123456"
                // }
            },
            // sign
            async showMsgBoxFn(item, type, $event, fnName) {
                let _this = this
                // 判断是否是强身份认证还是弱身份认证
                if (this.workorder.type.startsWith("WX")) {
                    // 强身份

                    // http://192.168.4.222:8081/jitGW/random
                    let original = await _this.jitGWRandomFn()
                    let result = await this.doDataProcess(initParam, original)
                    if (result.code == 200) {
                        let user = result.data['_saml_pki_cert_subject']
                        if (user) {
                            user = user.split(",").filter(i => i.startsWith("T="))[0].split("=")[1]
                        }
                        this.$msgBox.showMsgBox({
                            isShowPsd: true
                        }).then(async (data) => {
                            if (data.psd) {
                                let judegUser = await this.findByUserFn({userName: user, password: data.psd})
                                if (judegUser == '1') {
                                    _this[fnName](item, type, $event, user)
                                } else {
                                    this.$message({type: 'error', message: '密码错误，请重新输入'});
                                }
                            }
                        }).catch(() => {
                            // ...
                        });
                    }
                } else {
                    // 弱身份
                    this.$msgBox.showMsgBox({
                        isShowInput: true,
                        isShowPsd: true
                    }).then(async (data) => {
                        if (data.val && data.psd) {
                            let judegUser = await this.findByUserFn({userName: data.val, password: data.psd})
                            if (judegUser == '1') {
                                _this['_' + fnName](item, type, $event, data.val, data.psd)
                            } else {
                                _this.$message({type: 'error', message: '密码错误，请重新输入'});
                            }
                        }
                    }).catch(() => {
                        // ...
                    });
                }
            },
            // 3sign
            fixedSignFn(item, type, $event, val, psd) {
                // if(!$('#1'+item.id).is(':checked')){
                //     this.$message({type: 'warning', message: '请先点击维修已完成'})
                //     return
                // }

                SignatureInit(val, psd, this.labelVO.noSignTime, 1.5)

                var signatureCreator = Signature.create()
                var that = this
                /* 保护项 */
                let inputArr = $($event.target).parents('.item').siblings(".item").find(".textContent").find('input')
                let protectedItems = []
                inputArr.each((index, item) => {
                    if (!($(item).attr("id") && $(item).attr("id").includes("sign"))) {
                        protectedItems.push($(item).attr("id"))
                    }
                })
                protectedItems = protectedItems.filter(i => i)

                // 判断签章高度 start
                let offsetY = 1
                $('.kg-img-div-' + type).each((ind, ele) => {
                    offsetY += $(ele).height() + 10
                })
                // 判断签章高度 end

                signatureCreator.run({

                    offsetX: 1,
                    offsetY: offsetY,
                    protectedItems: protectedItems, //设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                    position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                    okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                        console.log("盖章ID：" + this.getSignatureid());
                        console.log("盖章数据：" + this.getSignatureData());
                        fn(true);
                        let _this = this

                        that.$nextTick(() => {
                            signatureCreator.getBase64Image(
                                this.getSignatureid(),
                                this.getSignatureData(),
                                type,
                                function (fn, imgdata, signid, sdata) {
                                    $('#kg-img-div-postil1').find('img').attr('src', imgdata);


                                    that.postSignFn(
                                        item,
                                        type,
                                        _this.getSignatureid() + '------' + _this.getSignatureData() + '------' +
                                        imgdata[1]
                                    )
                                }
                            )
                        })
                    },
                    cancelCall: function () {//点击取消后的回调方法
                        console.log("取消！")
                    }
                });
            },
            _fixedSignFn(item, type, $event, val, psd) {

                SignatureInit(val, undefined, this.labelVO.noSignTime)
                var signatureCreator = Signature.create()
                var that = this
                /* 保护项 */
                let inputArr = $($event.target).parents('.item').siblings(".item").find(".textContent").find('input')
                let protectedItems = []
                inputArr.each((index, item) => {
                    if (!($(item).attr("id") && $(item).attr("id").includes("sign"))) {
                        protectedItems.push($(item).attr("id"))
                    }
                })
                protectedItems = protectedItems.filter(i => i)
                // 判断签章高度 start
                console.log(protectedItems)
                // 判断签章高度 end
                signatureCreator.handWriteDlg({
                    image_height: "1.5",
                    image_width: "3",
                    canvas_width: "600",
                    canvas_height: "300",
                    onBegin: function () {
                        console.log('onbegin');
                    },
                    onEnd: function () {
                        console.log('onEnd');
                    }
                }, function (param) {
                    let offsetY = 1
                    $('.kg-img-div-' + type).each((ind, ele) => {
                        offsetY += $(ele).height() + 10
                    })
                    signatureCreator.runHW(param, {
                        offsetX: 5,
                        offsetY: offsetY,
                        protectedItems: protectedItems,
                        //设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            // console.log("盖章ID："+this.getSignatureid());
                            // console.log("盖章数据："+this.getSignatureData());

                            fn(true);
                            let _this = this
                            signatureCreator.getBase64Image(
                                this.getSignatureid(),
                                this.getSignatureData(),
                                $($event.target).parents('.item').find(".sign_box").attr("pos"),
                                function (fn, imgdata, signid, sdata) {
                                    // this.src=imgdata
                                    $('#kg-img-div-postil1').find('img').attr('src', imgdata);
                                    that.postSignFn(
                                        item,
                                        type,
                                        _this.getSignatureid() + '------' + _this.getSignatureData() + '------' +
                                        imgdata[1]
                                    )
                                }
                            )

                        },
                        cancelCall: function () {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    });
                });
            },
            // 4sign
            travelSignFn(item, type, $event, val, psd) {
                // if(!$('#2'+item.id).is(':checked')){
                //     this.$message({type: 'warning', message: '请先点击放行已完成'})
                //     return
                // }
                SignatureInit(val, psd, this.labelVO.noSignTime, 1.5)
                var signatureCreator = Signature.create();
                var that = this;
                /* 保护项 */
                let inputArr = $($event.target).parents('.item').siblings(".item").find(".textContent").find('input')
                let protectedItems = []
                inputArr.each((index, item) => {
                    if ($(item).attr("name").includes("sign")) {

                    } else {
                        protectedItems.push($(item).attr("id"))
                    }
                })
                /* 保护项 */
                protectedItems = protectedItems.filter(i => i)
                // 判断签章高度 start
                let offsetY = 1
                $('.kg-img-div-' + type).each((ind, ele) => {
                    offsetY += $(ele).height() + 10
                })
                // 判断签章高度 end
                signatureCreator.run({
                    offsetX: 1,
                    offsetY: offsetY,
                    protectedItems: protectedItems,
                    // protectedItems:[ 'item1', 'item2', 'item3','item4',
                    //                 'item5', 'item6','item7', 'item8',
                    //                 'item9','item10', 'item11', 'item12',
                    //                 'item13','item14', 'item15', 'item16',
                    //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                    position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                    okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                        console.log("盖章ID：" + this.getSignatureid());
                        console.log("盖章数据：" + this.getSignatureData());
                        fn(true);
                        let _this = this
                        signatureCreator.getBase64Image(
                            this.getSignatureid(),
                            this.getSignatureData(),
                            type,
                            function (fn, imgdata, signid, sdata) {
                                that.postSignFn(
                                    item,
                                    type,
                                    _this.getSignatureid() + '------' + _this.getSignatureData() + '------' +
                                    imgdata[1]
                                )
                            }
                        )
                        // if(type==='pos3'){
                        //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                        // }else if(type==='pos4'){
                        //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                        // }
                        // console.log(that.workerSignatureData)
                        // console.log(that.customerSignatureData)

                    },
                    cancelCall: function () {//点击取消后的回调方法
                        console.log("取消！")
                    }
                });
            },
            _travelSignFn(item, type, $event, val, psd) {
                SignatureInit(val, undefined, this.labelVO.noSignTime)
                var signatureCreator = Signature.create();
                var that = this;
                /* 保护项 */
                let inputArr = $($event.target).parents('.item').siblings(".item").find(".textContent").find('input')
                let protectedItems = []
                inputArr.each((index, item) => {
                    if ($(item).attr("name").includes("sign")) {

                    } else {
                        protectedItems.push($(item).attr("id"))
                    }
                })
                /* 保护项 */
                protectedItems = protectedItems.filter(i => i)

                // 判断签章高度 start
                signatureCreator.handWriteDlg({
                    image_height: "2",
                    image_width: "4",
                    canvas_width: "100",
                    canvas_height: "50",
                    onBegin: function () {
                        console.log('onbegin');
                    },
                    onEnd: function () {
                        console.log('onEnd');
                    }
                }, function (param) {
                    let offsetY = 1
                    $('.kg-img-div-' + type).each((ind, ele) => {
                        offsetY += $(ele).height() + 10
                    })
                    signatureCreator.runHW(param, {
                        offsetX: 1,
                        offsetY: offsetY,
                        protectedItems: protectedItems,
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID：" + this.getSignatureid());
                            console.log("盖章数据：" + this.getSignatureData());
                            fn(true);
                            let _this = this
                            signatureCreator.getBase64Image(
                                this.getSignatureid(),
                                this.getSignatureData(),
                                $($event.target).parents('.item').find(".sign_box").attr("pos"),
                                function (fn, imgdata, signid, sdata) {
                                    that.postSignFn(
                                        item,
                                        type,
                                        _this.getSignatureid() + '------' + _this.getSignatureData() + '------' +
                                        imgdata[1]
                                    )
                                }
                            )
                        },
                        cancelCall: function () { //点击取消后的回调方法
                            console.log("取消！")
                        }
                    });
                });
            },
            async doDataProcess(initParam, original) {
                // 证书版本者主题
                var signSubject = ""; //document.getElementById("rootCADN").value;
                // 验证认证原文是否为空
                let f1 = () => {
                    this.$message.info('操作已取消')
                }
                let f2 = () => {
                    this.$message.info('没有找到有效的证书，如果使用的是KEY，请确认已经插入key')
                }
                if (original == "") {
                    alert("认证原文不能为空!");
                    return false;
                } else {
                    // VCTK初始化参数，数据可从网关系统：认证管理->Key类型管理中导出
                    //var initParam = "<\?xml version=\"1.0\" encoding=\"gb2312\"\?><authinfo><liblist><lib type=\"CSP\" version=\"1.0\" dllname=\"\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"SERfR01DQUlTLmRsbA==\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"U2h1dHRsZUNzcDExXzMwMDBHTS5kbGw=\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib><lib type=\"SKF\" version=\"1.1\" dllname=\"U0tGQVBJLmRsbA==\" ><algid val=\"SHA1\" sm2_hashalg=\"sm3\"/></lib></liblist></authinfo>";
                    // 调用网关工具脚本中的detachSignStr方法进行签名，返回签名结果
                    // 参数说明：initParam：vctk控件初始化参数，authContent：认证原文，signSubject：证书版本者主题
                    signResult = detachSignStr(initParam, original, f1, f2);
                    if (signResult) {
                        return new Promise((resolve, reject) => {
                            this.jitGWAuthFn(undefined, original, signResult).then(res => {
                                console.log(res)
                                resolve(res)
                            })
                        })

                    } else {
                        return false;
                    }
                }
            },
            jitGWRandomFn() {
                let qrCodeAuth = 'false';
                let original = '';
                return new Promise((resolve, reject) => {
                    request({
                        url: `${this.$ip}/mms-workorder/jitGW/random`,
                        method: 'get',
                    }).then((result) => {
                        if (result.code == 200) {
                            if (result.data.QRCodeAuth == "false") {
                                resolve(result.data.original)
                            } else {
                                qrCodeAuth = result.data.QRCodeAuth;
                                generateQRCode();
                                //document.getElementById("qr_div").style.display="";
                            }
                        } else {
                            this.$message({type: 'error', message: result.message});
                        }
                    })
                })
            },
            jitGWAuthFn(authMode = 'cert', original, signed_data) {
                return new Promise((resolve, reject) => {
                    request({
                        url: `${this.$ip}/mms-workorder/jitGW/auth`,
                        method: 'post',
                        data: {
                            authMode,
                            original,
                            signed_data
                        }
                    }).then((result) => {
                        resolve(result)
                    })
                })
            },

            signMsgBoxFn(type, id) {
                let _this = this
                this.$msgBox.showMsgBox({
                    isShowInput: true,
                    isShowPsd: true
                }).then(async (data) => {
                    if (data.val && data.psd) {
                        let judegUser = await this.findByUserFn({userName: data.val, password: data.psd})
                        if (judegUser == '1') {
                            _this.signFn(type, data.val, data.psd, id)

                        } else {
                            _this.$message({type: 'error', message: judegUser});
                        }
                    }
                })
            },
            // 内容签章
            signFn(type, val, psd, id) {
                SignatureInit(val, undefined, this.labelVO.noSignTime)
                var signatureCreator = Signature.create()
                var that = this
                signatureCreator.handWriteDlg({
                    image_height: "2",
                    image_width: "4",
                    canvas_width: "100",
                    canvas_height: "50",
                    onBegin: function () {
                        console.log('onbegin');
                    },
                    onEnd: function () {
                        console.log('onEnd');
                    }
                }, function (param) {
                    signatureCreator.runHW(param, {
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID：" + this.getSignatureid());
                            console.log("盖章数据：" + this.getSignatureData());
                            let _this = this
                            that.templateSignObj[this.getSignatureid().toString()] = this.getSignatureData()
                            fn(true)
                            signatureCreator.getBase64Image(
                                this.getSignatureid(),
                                this.getSignatureData(),
                                type,
                                // $($event.target).parents('.item').find(".sign_box").attr("pos"),
                                function (fn1, imgdata, signid, sdata) {
                                    $('#kg-img-div-postil1').find('img').attr('src', imgdata);

                                    that.postSignFn(
                                        {id},
                                        type,
                                        _this.getSignatureid() + '------' + _this.getSignatureData() + '------' +
                                        imgdata[1],
                                        true
                                    )
                                }
                            )
                        },
                        cancelCall: function () {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    })
                })
            },

            getBySerialNoFn(isClearAll, BasicUpdateLimit) {
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/getBySerialNo/${this.workorder.serialNo}`,
                    method: 'get',
                })
                    .then((data) => {

                        if (data.code == 200) {
                            let infList = data.data.infList
                            this.workerCompleteData = data.data.infList
                            let map = data.data.dataList
                           this.newMap = data.data.dataList


                            // 删除签章
                            this.$nextTick(() => {
                                if (isClearAll) {
                                    var aDom = $(".kg-img-div")
                                } else {
                                    var aDom = $(".itemSign .kg-img-div")
                                }
                                aDom.each((ind, ele) => {
                                    //if(!Reflect.has(map, $(ele).attr("elemid"))){
                                    $(ele)[0].remove()
                                    //}
                                    //signatureCreator.removeSignature('KG2016093001333', $(ele).attr('signatureid'))
                                })
                            })

                            // for(let i in this.deepMap){
                            //     if((!Reflect.has(map, i))&& Reflect.get(this.deepMap, i)&& Reflect.get(this.deepMap, i).includes('------')){
                            //         this.removeSignatureFn(Reflect.get(this.deepMap, i).split('------')[0])
                            //     }
                            // }

                            // this.deepMap = JSON.parse(JSON.stringify(map))
                            let blo = this.type == 'edit'

                            SignatureInit('0002', '123456', false, 1, blo)
                            var signatureCreator = Signature.create()
                            //let signData = $(".kg-img-div")  // signatureid

                            //var that = this
                            if (BasicUpdateLimit) {

                            } else {
                                $(".checkbox_group").find('input[type="checkbox"]').each((it, ele) => {
                                    $(ele).prop("checked", false).prop("disabled", false)
                                })
                                $(".textContent").find('input[type="checkbox"]').each((ite, ele) => {
                                    $(ele).prop("checked", false)
                                })
                                $(".textContent").find('input[type="text"]').each((ite, ele) => {
                                    $(ele).val("")
                                })
                            }
                            if (infList && infList.length) {
                                infList.forEach(item => {
                                    $("." + item.contentDetailId).siblings(".checkbox_group").find("#1" + item.contentDetailId).prop("checked", item.workerCompleted).prop("disabled", item.workerCompleted)
                                    $("." + item.contentDetailId).siblings(".checkbox_group").find("#2" + item.contentDetailId).prop("checked", item.commanderCompleted).prop("disabled", item.commanderCompleted)
                                    $("." + item.contentDetailId).siblings(".checkbox_group").find("#3" + item.contentDetailId).prop("checked", item.invalid).prop("disabled", item.invalid)
                                })
                            }

                            if (map.length) {
                                let signs = []
                                map.forEach(mapItem => {
                                    if (mapItem.key.includes("sign") &&
                                        mapItem.value.includes("------") &&
                                        mapItem.value.split("------")[0] &&
                                        mapItem.value.split("------")[1]
                                    ) {
                                        mapItem.value.split(",").forEach(item => {
                                            if (item) {
                                                if ("undefined" === item.split('------')[1]) {
                                                    console.log('key', mapItem);
                                                }
                                                else {
                                                    console.log('keytrue', mapItem);
                                                }
                                                signs.push(
                                                    {
                                                        signatureid: item.split('------')[0],
                                                        signatureData: item.split('------')[1],
                                                        version: mapItem.version
                                                    }
                                                )
                                            }

                                        })
                                    } else if (mapItem.key.includes("input") || mapItem.key.includes("date")) {
                                        if (BasicUpdateLimit) {
                                            $(".base_item input[name='" + mapItem.key + "']").val(mapItem.value)
                                            this['isActiveReset'] = true
                                        } else {
                                            $("input[name='" + mapItem.key + "']").val(mapItem.value)
                                        }
                                    } else {
                                        if (BasicUpdateLimit) {
                                            $(".base_item input[name='" + mapItem.key + "']").prop('checked', mapItem.value == 'true' ? true : false)
                                            this['isActiveReset'] = true
                                        } else {
                                            $("input[name='" + mapItem.key + "']").prop('checked', mapItem.value == 'true' ? true : false)
                                        }
                                    }
                                })
                                Signature.loadSignatures(signs)
                            }
                        } else {
                            this.$message({type: 'error', message: '数据加载失败，请重试'});
                        }
                    })
            },

            async signOthMsgBoxFn(type, $event,qr) {

                let _this = this

                if(qr==6){
                    let original = await _this.jitGWRandomFn()
                    let result = await this.doDataProcess(initParam, original)
                    if (result.code == 200) {
                        let user = result.data['_saml_pki_cert_subject']
                        if (user) {
                            user = user.split(",").filter(i => i.startsWith("T="))[0].split("=")[1]
                        }
                        this.$msgBox.showMsgBox({
                            isShowPsd: true
                        }).then(async (data) => {
                            if (data.psd) {
                                let judegUser = await this.findByUserFn({userName: user, password: data.psd})
                                if (judegUser == '1') {
                                    _this.signOthFn(type, $event, user)
                                } else {
                                    this.$message({type: 'error', message: '密码错误，请重新输入'});
                                }
                            }
                        }).catch(() => {
                            // ...
                        });
                    }
                }else if(qr==8){
                    this.$msgBox.showMsgBox({
                        isShowInput: true,
                        isShowPsd: true
                    }).then(async (data) => {
                        if (data.val && data.psd) {
                            let judegUser = await this.findByUserFn({userName: data.val, password: data.psd})
                            if (judegUser == '1') {
                                this.signOthFnR(type, $event, data.val)
                            } else {
                                _this.$message({type: 'error', message: judegUser});
                            }
                        }
                    })

                }


            },
            signOthFnR(type, $event, val, psd) {
                SignatureInit(val, undefined, this.labelVO.noSignTime)
                var signatureCreator = Signature.create()
                var that = this
                signatureCreator.handWriteDlg({
                    image_height: "1",
                    image_width: "3",
                    canvas_width: "100",
                    canvas_height: "50",
                    onBegin: function () {
                        console.log('onbegin');
                    },
                    onEnd: function () {
                        console.log('onEnd');
                    }
                }, function (param) {
                    let offsetX = 1
                    $('.kg-img-div-' + type).each((ind, ele) => {
                        offsetX += $(ele).width() + 10
                    })
                    signatureCreator.runHW(param, {
                        offsetX: offsetX,
                        // offsetX:1,
                        offsetY: 1,
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            // console.log("盖章ID："+this.getSignatureid());
                            // console.log("盖章数据："+this.getSignatureData());
                            let _this = this
                            that.templateSignObj[this.getSignatureid().toString()] = this.getSignatureData()
                            fn(true)
                            signatureCreator.getBase64Image(
                                this.getSignatureid(),
                                this.getSignatureData(),
                                type,
                                // $($event.target).parents('.item').find(".sign_box").attr("pos"),
                                function (fn1, imgdata, signid, sdata) {
                                    that.signBasicFn({
                                        key: type,
                                        value: _this.getSignatureid().toString() + '------' + _this.getSignatureData() + '------' +
                                            imgdata[1]
                                    })
                                }
                            )
                        },
                        cancelCall: function () {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    })
                })

            },
            signOthFn(type, $event, val, psd) {
                if (!this.signBasicActiveFn()) {
                    this.$message({type: 'warning', message: '请先完成所有的放行已完成'})
                    return
                }
                SignatureInit(val, psd, this.labelVO.noSignTime, 1.5)
                var signatureCreator = Signature.create()
                var that = this
                signatureCreator.run({
                    //protectedItems: protectedItems,
                    // protectedItems:[ 'item1', 'item2', 'item3','item4',
                    //                 'item5', 'item6','item7', 'item8',
                    //                 'item9','item10', 'item11', 'item12',
                    //                 'item13','item14', 'item15', 'item16',
                    //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                    position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                    okCall: function (fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                        console.log("盖章ID：" + this.getSignatureid());
                        console.log("盖章数据：" + this.getSignatureData());
                        fn(true)
                        let _this = this
                        signatureCreator.getBase64Image(
                            this.getSignatureid(),
                            this.getSignatureData(),
                            type,
                            function (fn, imgdata, signid, sdata) {
                                that.signBasicFn({
                                    key: type,
                                    value: _this.getSignatureid().toString() + '------' + _this.getSignatureData() + '------' +
                                        imgdata[1]
                                })
                            }
                        )
                    },
                    cancelCall: function () {//点击取消后的回调方法
                        console.log("取消！")
                    }
                })
            },
            // 保存签名数据
            postSignFn(item, type, getSignatureid) {
                request({
                    // url: `${this.$ip}/mms-workorder/operationInf/sign`,
                    url: `${this.$ip}/mms-workorder/operationInf/exceptionSign`,
                    method: 'post',
                    data: {
                        contentDetailId: item.id, //'42b51712b93254d2ede69d6ef251c68c', //item.id,
                        serialNo: this.workorder.serialNo,
                        key: type,
                        value: getSignatureid
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                        } else {
                            //this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            fixCompleteFn(item, $event) {
                let map = {}
                if ($($event.target).parents('.checkbox_group').siblings('.textContent').find("input")) {
                    let inputArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='checkBox']")
                    console.log(inputArr)
                    for (let i = 0; i < inputArr.length; i++) {
                        map[inputArr.eq(i).attr("name")] = inputArr.eq(i).is(':checked')
                    }
                    let inputNa = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='NA']")
                    for (let i = 0; i < inputNa.length; i++) {
                        map[inputNa.eq(i).attr("name")] = inputNa.eq(i).is(':checked')
                    }


                    let inputSign = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='sign']")
                    console.log(inputSign)
                    for (let i = 0; i < inputSign.length; i++) {
                        console.log(inputSign.eq(i))
                        if ($("div[elemid=" + inputSign.eq(i).attr("id") + "]")) {
                            let signatureid = $("div[elemid=" + inputSign.eq(i).attr("id") + "]").attr("signatureid")
                            if (signatureid) {
                                map[inputSign.eq(i).attr("name")] = signatureid + '------' + this.templateSignObj[signatureid] + '------' +
                                    document.querySelector('#kg-img-' + signatureid).src.split("base64,")[1]
                            }
                        }
                    }
                    let inputText = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='input']")
                    for (let i = 0; i < inputText.length; i++) {
                        map[inputText.eq(i).attr("name")] = inputText.eq(i).val()
                    }
                }
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/workerComplete`,
                    method: 'post',
                    data: {
                        contentDetailId: item.id, //内容id
                        serialNo: this.workorder.serialNo, // 工单流水号
                        signingTime: '', //签章时间
                        map
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                            //this.workerCompleteData = data.data
                        } else {
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init(true)
                    })
            },
            commanderCompleteFn(item, $event) {
                let inObj = this.workerCompleteData.find(i => i.contentDetailId === item.id)
                if (!inObj) {
                    this.$message({type: 'error', message: '操作有误，请检查'})
                    this.init()
                    return
                }
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/commanderComplete`,
                    method: 'post',
                    data: {
                        id: inObj.id
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                        } else {
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init(true)
                    })

            },
            invalidFn(item, $event) {
                let inObj = this.workerCompleteData.find(i => i.contentDetailId === item.id)
                if (!inObj) {
                    this.$message({type: 'error', message: '操作有误，请检查'})
                    this.init()
                    return
                }
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/invalid`,
                    method: 'post',
                    data: {
                        id: inObj.id
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                        } else {
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init(true)
                    })
            },
            backFn() {
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/back`,
                    method: 'post',
                    data: {
                        serialNo: this.workorder.serialNo
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                        } else {
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init(true)
                    })
            },
            cleanFn() {
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/clean`,
                    method: 'post',
                    data: {
                        serialNo: this.workorder.serialNo
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                        } else {
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init(true)
                    })
            },
            submitFn() {
                request({
                    url: `${this.$ip}/mms-workorder/workorder/submit/${this.workorder.id}`,
                    method: 'get',
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '提交成功'})
                        } else {
                            this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            questionUploadFn() {
                this.$refs.questionUpload.open(this.workorder)
            },

            routerPushFn(path, query = {}) {
                this.$router.push({path, query})
            },
            changeActiveFn(e,item){
                let obj={}
                // contentDetailId 项次ID
                obj={
                    contentDetailId:item.id,
                    serialNo:this.workorder.serialNo,
                    value:e.value.toString(),
                    key:e.key+'_'+item.serialNumber,
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/active`,
                    method: 'post',
                    data:{
                        ...obj
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '修改成功'})
                            this.getBySerialNoFn('clean')
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            templateContentUpdateFn(item) {
                request({
                    url: `${this.$ip}/mms-workorder/templateContent/update`,
                    method: 'post',
                    data: {
                        id: item.id,
                        active: item.active
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            this.$message({type: 'success', message: '修改成功'})
                        } else {
                            //this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            saveBasicFn(type) {
                if (!this[type]) {
                    return false
                }
                this[type] = false
                let map = {}
                if (type === 'isActiveSave') {
                    let textArr = $(".base_i_inner").find("input[type='text']");
                    textArr.each((index, ele) => {
                        map[$(ele).attr("name")] = $(ele).val()
                    })
                    let checkBoxArr = $(".base_i_inner").find("input[type='checkbox']")
                    checkBoxArr.each((index, ele) => {
                        map[$(ele).attr("name")] = $(ele).is(':checked')
                    })
                    let dateArr = $(".base_i_inner").find("input[type='date']")
                    dateArr.each((index, ele) => {
                        map[$(ele).attr("name")] = $(ele).val()
                    })
                    let value1Arr = $(".base_i_inner").find(".value1")
                    value1Arr.each((index, ele) => {
                        map[$(ele).attr("id")] = $(ele).text()
                    })
                    console.log(map)
                } else {
                    let textArr = $(".base_i_inner").find("input[type='text']");
                    textArr.each((index, ele) => {
                        $(ele).val('')
                    })
                    let checkBoxArr = $(".base_i_inner").find("input[type='checkbox']")
                    checkBoxArr.each((index, ele) => {
                        $(ele).prop('checked', false)
                    })
                    let dateArr = $(".base_i_inner").find("input[type='date']")
                    dateArr.each((index, ele) => {
                        map[$(ele).attr("name")] = $(ele).val()
                    })
                    this[type] = true
                    return false

                }
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/saveBasic`,
                    method: 'post',
                    data: {
                        serialNo: this.workorder.serialNo,  // 工单流水号
                        map
                    }
                })
                    .then((data) => {
                        setTimeout(() => {
                            if (data.code == 200) {
                                this.$message({type: 'success', message: '保存成功'})
                            } else {
                                this.$message({type: 'error', message: data.message})
                            }
                            this[type] = true
                            this.init(true)
                        }, 500)
                    })
            },
            signBasicFn(obj) {
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/signBasic`,
                    method: 'post',
                    data: {
                        serialNo: this.workorder.serialNo,  // 工单流水号
                        ...obj
                    }
                }).then((data) => {
                    if (data.code == 200) {
                        //this.airInfo = data.
                        this.$message({type: 'success', message: '保存成功'})
                    } else {
                        // this.$message({type: 'error', message: data.message})
                    }
                })  // http://173.100.1.5:8011/mms-file/get-file-by-id/ee899e8629ab71c00c8609b43382336d
            },
            getFileByIdFn(id) {
                request({
                    url: `${this.$ip}/mms-file/get-file-by-id/${id}`,
                    method: 'get',
                })
                    .then((data) => {
                        console.log(data)
                        if (data.code == 200) {
                            this.airInfo['filePath'] = data.data.filePath
                            //this.$message({type: 'success', message: '保存成功'})
                        } else {
                            //this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            signBasicActiveFn() {
                return Array.from($(".commanderComplete")).every(i => $(i).is(":checked"))
            },

            deleteSignFn(getSignatureid, getSignatureData) {
                console.log(this.contentId);
                let key = $(`div[signatureid='${getSignatureid}']`).attr("elemid")
                let contentDetailId = ''
                let value = getSignatureid
                request({
                    url: `${this.$ip}/mms-workorder/operationInf/cancelSign`,
                    method: 'post',
                    data: {
                        serialNo: this.workorder.serialNo,
                        key,
                        contentDetailId,
                        value
                    }
                })
                    .then((data) => {
                        if (data.code == 200) {
                            //this.$message({type: 'success', message: '保存成功'})
                        } else {
                            //this.$message({type: 'error', message: data.message})
                        }
                    })
            },

            removeSignatureFn(signatureid) {
                if (signatureid) {
                    $(`[signatureid=${signatureid}]`)[0].remove();
                } else {
                    $(".kg-img-div").each((index, ele) => {
                        console.log(ele)
                        //$(`[signatureid=${signatureid}]`)[0].remove();
                        $(ele)[0].remove()
                        //signatureCreator.removeSignature('KG2016093001333', $(ele).attr("signatureid"));
                    })
                }
            },
            submit() {
                request({
                    url: `${this.$ip}/mms-workorder/workorder/submit/${this.id}`,
                    method: 'get',
                }).then((data) => {
                    if (data.code === 200) {
                        this.$message({type: 'success', message: '提交成功'});
                        this.$router.push({path: '/myWorkOrder'});
                    }
                })
            }
        }
    }

</script>
<style scoped lang='scss'>

    .clear:after {
        content: '';
        visibility: hidden;
        height: 0;
        display: block;
        clear: both;
    }

    .lists1:last-child {
        border-bottom: 1px solid #979797;
    }

    .flex {
        display: flex;
    }

    .flex_wrap {
        flex-wrap: wrap;
    }

    .justify_around {
        justify-content: space-around;
    }

    .justify_end {
        justify-content: flex-end;
    }

    .align_center {
        align-items: center;
    }

    .index {
        padding: 30px;
        padding: 30px;
        height: calc(100vh - 110px);
        overflow-y: auto;
        .sign {
            width: 70px;
            height: 25px;
            line-height: 25px;
            border: 1px solid #333;
            background: #3280e7;
            color: #fff;
            font-size: 14px;
        }
        .top_header {
            line-height: 68px;
            height: 68px;
            position: fixed;
            font-size: 24px;
            left: 0;
            top: 0;
            right: 0;
            background: #2D4157;
            color: #fff;
            padding: 0 10px;
            z-index: 99;
        }
        .base_air {
            width: 100%;
            overflow: hidden;
            .base_air_inner {

                .lists {
                    font-size: 20px;
                    height: 60px;
                    line-height: 60px;
                    border-left: 1px solid #333;
                    border-top: 1px solid #333;
                    box-sizing: border-box;
                    text-align: center;
                    > div {
                        border-right: 1px solid #333;
                    }
                    img {
                        width: 128px;
                    }
                }
            }
        }
        .base_item {
            width: 100%;
            overflow: hidden;
            .base_i_inner {
                border-right: 1px solid #979797;
                font-size: 20px;

                .lists {
                    width: 33.333%;
                    box-sizing: border-box;
                    border-left: 1px solid #979797;
                    border-top: 1px solid #979797;
                    .label {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        flex-direction: column;
                        height: 45px;
                        border-bottom: 1px solid #979797;
                    }
                    .value {
                        padding: 5px;
                        height: 45px;
                        display: flex;
                        align-items: center;
                        justify-content: center;

                    }
                    .value3 {
                        input {
                            width: 96%;
                        }
                    }
                    .value6 {
                        height: 80px;
                        justify-content: right;
                    }
                    .value4 {
                        img {
                            height: 96%;
                            display: block;
                            margin: 0 auto;
                        }
                    }
                }
                .base_i_inner_btn {
                    width: 100%;
                    height: 45px;

                    justify-content: center;
                    border-left: 1px solid #979797;
                    border-top: 1px solid #979797;
                    border-bottom: 1px solid #979797;
                    /deep/ .el-button {
                        padding: 7px 20px
                    }
                    /deep/ .el-button:first-child {
                        margin-right: 40px;
                    }

                }
            }
        }
        .order_content {
            font-size: 20px;
            .order_c_main {
                .order_c_b {
                    border-right: 1px solid #333;

                }
                .textContentParent {
                    position: relative;
                }
                .item1 > div {
                    border-left: 1px solid #333;
                    border-top: 1px solid #333;
                    border-bottom: 1px solid #333;
                    text-align: center;
                    padding: 10px 0;
                    vertical-align: top;
                    &:last-child {
                        border-right: 1px solid #333;
                    }
                }
                .item {
                    border-left: 1px solid #333;
                    border-bottom: 1px solid #333;
                    text-align: center;

                    vertical-align: top;
                    position: relative;
                    .checkbox_group {
                        font-size: 16px;
                        height: 40px;
                        line-height: 40px;
                        border-top: 1px solid #979797;
                        border-bottom: 1px solid #979797;
                        &:nth-last-child(1) {
                            border-bottom: none;
                        }
                        input[type='checkbox'] {
                            width: 24px;
                            height: 24px;
                            margin: 0 6px;
                        }
                    }
                    .textContent {
                        position: relative;
                        padding: 10px 0;
                        // position: absolute;
                        // left:0;
                        // top:0;
                        // height: 50px;
                    }
                }
            }
            .table {
                width: 100%;
                thead {
                    tr {
                        th {
                            padding: 5px;
                            text-align: center;
                        }
                    }
                }
                tbody {
                    tr {
                        td {
                            text-align: center;
                            padding: 10px 0;
                            vertical-align: top;
                            .sign {
                                width: 70px;
                                height: 25px;
                                line-height: 25px;
                                border: 1px solid #333;
                                background: #3280e7;
                                color: #fff;
                                font-size: 14px;
                            }
                        }
                    }
                }
                .checkbox_group {
                    font-size: 16px;
                    height: 40px;
                    line-height: 40px;
                    border-top: 1px solid #979797;
                    border-bottom: 1px solid #979797;
                    &:nth-last-child(1) {
                        border-bottom: none;
                    }
                    input[type='checkbox'] {
                        width: 24px;
                        height: 24px;
                        margin: 0 6px;
                    }
                }
            }
        }
        .page_t {
            line-height: 40px;
            font-size: 24px;
        }
        .bottom_fix {
            position: fixed;
            left: 0;
            bottom: 68px;
            z-index: 100;
            background: #fff;
            height: 60px;
            line-height: 60px;
            width: 100%;
            border-top: 1px solid #979797;
            button {
                width: 100px;
                height: 44px;
                line-height: 44px;
                outline: none;
                border: 1px solid #979797;
                font-size: 16px;
                color: #222222;
                letter-spacing: 2px;
                border-radius: 3px;
            }
            .active {
                background: #3280e7;
                color: #fff;
            }
        }
    }

    .duijiao {

        background: linear-gradient(
                        to top right,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(0, 0, 0, 0) calc(50% - 1.5px),
                        rgba(0, 0, 0, 0) 50%,
                        rgba(0, 0, 0, 0) calc(50% + 1.5px),
                        rgba(0, 0, 0, 0) 100%
        ), linear-gradient(
                        to bottom right,
                        rgba(0, 0, 0, 0) 0%,
                        rgba(0, 0, 0, 0) calc(50% - 1.5px),
                        rgba(0, 0, 0, 1) 50%,
                        rgba(0, 0, 0, 0) calc(50% + 1.5px),
                        rgba(0, 0, 0, 0) 100%
        ) !important;
    }

    /deep/ .el-icon-circle-close:before {
        font-size: 32px;
        content: "\e79d";
    }

    .top-toolbar {
        text-align: right;
        right: 0px;
        margin-bottom: 10px;
        .isDisabled {
            background: rgba(208, 208, 208, 1);
            color: #6A7785;
            cursor: not-allowed;
            .svg-icon {
                // fill: rgba(208,208,208,1);
            }
        }
        div {
            user-select: none;
            cursor: pointer;
            display: inline-flex;
            justify-content: center;
            align-items: center;
            height: 32px;
            line-height: 32px;
            padding: 7px;
            border-radius: 2px;
            border: 1px solid rgba(208, 208, 208, 1);
            color: #3D568E;
            .svg-icon {
                height: 18px;
                width: 18px;
                margin-right: 4px;
                vertical-align: text-top;
            }
        }
    }
</style>
