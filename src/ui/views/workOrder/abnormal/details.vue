
<template>
    <div class="index"  style="display: flex;flex-direction: column;align-items: center">
        <div style="width: 80%;margin-bottom: 20px">
            <div style="text-align: center;font-size: 20px;padding: 20px " >工单分派信息</div>
            <InfoTop ref="InfoTop" :form="orderModule" :workorder="workorder"></InfoTop>
        </div>
        <div style="width: 80%;">
            <div style="text-align: center;font-size: 20px;padding: 20px " >工单签署信息</div>
            <div class="order_content">
                <div class="order_c_main">
                    <div class="item1 flex">
                        <div style="width:18%;">{{labelVO.itemLabel}}</div>
                        <div :style="{width: col==3 ? '67%' : '52%'}">{{labelVO.contentLabel}}</div>
                        <div :style="{width: col==3 ? '15%' : '15%'}">{{labelVO.workerLabel}}</div>
                        <div :style="{width: col==3 ? '15%' : '15%'}" v-if='col==4'>{{labelVO.commanderLabel}}</div>
                    </div>
                    <div class="order_c_b">
                        <div v-for='(item, index) in contentVOListMap' :key='item.id'>
                            <div class="flex">
                                <div class="item flex align_start" style="width:18%;padding:4px;box-sizing:border-box">
                                    <na-temp v-if='item.notApplicable' :active='item.active' @changeActiveFn='changeActiveFn(item)'></na-temp>
                                    {{item.reduceIndex}}
                                </div>
                                <div style="width:82%;" v-if='item.contentDetails&&item.contentDetails.length'>
                                    <div v-for='itemChild in item.contentDetails' :key='itemChild.key' class="flex">
                                        <div  class="item" :style="{width: col==3 ? '81.7%' : '63.4%'}"> <!--style="width:63.4%;"-->
                                            <div v-if="item.reduceIndex.includes('.')" class="textContent textContentLeft"
                                                 :class="itemChild.id" v-html='itemChild.content'>
                                            </div>
                                            <div v-else class="textContent" v-html='item.name'></div>
                                            <div class='checkbox_group  '>
                                                <el-button @click="editContent($event,itemChild)" type="primary"  style="padding: 7px 20px">更正</el-button>
                                            </div>
                                        </div>
                                        <div  class="item" :style="{width: col==3 ? '18.3%' : '18.3%'}">
                                            <button class='sign' @click="fixedSignFn(itemChild,'fix_sign_'+itemChild.reduceIndex, $event)">签字</button>
                                            <div style="width:100%;position:absolute;left:0;top:40px;">
                                                <div :id='"fix_sign_"+itemChild.reduceIndex' :pos='"fix_sign_"+itemChild.reduceIndex' style="width:100%;height:30px;width:100%"></div>
                                            </div>
                                        </div>
                                        <div  class="item" :style="{width: col==3 ? '18.3%' : '18.3%'}"  v-if='col==4'>
                                            <button class='sign' @click="travelSignFn(itemChild,'travel_sign_'+itemChild.reduceIndex, $event)">签字</button>
                                            <div style="width:100%;position:absolute;left:0;top:40px;">
                                                <div :id="'travel_sign_'+itemChild.reduceIndex" :pos='"travel_sign_"+itemChild.reduceIndex' style="width:100%;height:30px;width:100%"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div v-else class='flex' style="width:82%;">
                                    <div class="item" :style="{width: col==3 ? '81.7%' : '63.4%'}">
                                        <div class="textContent" v-html='item.name'></div>
                                    </div>
                                    <div class="item" :style="{width: col==3 ? '18.3%' : '18.3%'}"></div>
                                    <div v-if='col==4' class="item" :style="{width: col==3 ? '18.3%' : '18.3%'}"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>

     </div>
</template>
<script>
    import $ from 'jquery'
    import InfoTop from './infoTop'
    import request from '../../../../../lib/axios.js';
    let  Signature={
            verify:function () {
                return []
        },  bind:function () {

        },  create :function () {

        }, loadSignatures  :function () {

        },
        init:function () {

        }, alert :function () {

        },
    }
    export default {
        components:{
              InfoTop
        },
        data(){
            return{
                contentVOListMap:[],
                contentVOList:[],
                workorder:{},
                workerCompleteData:[],
                template:{},
                templateSignObj:{},
                baseItemVOList:{},
                orderModule:{},
                labelVO:{},
                id:'',
                airInfo:{
                    'filePath':''
                },
                value5Type:{
                    '$flightno':'flightNo',
                    '$REGno':'tailNo'
                },
                isActiveSave:true,
                isActiveReset:true,
            }
        },
        created(){
            if(this.$route.query){
                this.id = this.$route.query.id
            }
        },
        mounted(){
            let _this = this
            this.init()
            window.onload = function(){
                Signature.bind({
                    remove : function(fn) {//签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,
                        console.log('获取删除的签章ID：' + this.getSignatureid());
                        _this.deleteSignFn(this.getSignatureid(),this.getSignatureData())
                        //key,
                        //contentDetailId
                        fn(true);//保存成功后必须回调fn(true/false)传入true/false分别表示保存成功和失败

                    },
                    update : function(fn) {//签章数据有变动时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,执行后必须回调fn(true/false)，传入true/false分别表示保存成功和失败
                        console.log('获取更新的签章ID：' + this.getSignatureid());
                        //console.log('获取更新的签章数据：'+this.getSignatureData());
                        fn(true);
                    }
                });
                var invalidSignatureArray = Signature.verify();//返回无效签章
                console.log(invalidSignatureArray)
                if (invalidSignatureArray.length > 0) {
                    for (var i = 0; i < invalidSignatureArray.length; i++) {
                        var signature = invalidSignatureArray[i];
                        //console.log(signature.modifiedItems);//获取修改的保护项
                    }
                }else{
                    Signature.alert("当前文档所有签章有效");
                }
            }
        },
        computed:{
            col:{ // 列数
                get:function(){
                    return this.labelVO.contentLayout == "C3（三列）" ? '3' : '4'
                }
            }
        },
        methods:{
            editContent($event,item){
                if(!item.editState){
                    $($event.target).text('保存')
                    let reg=/(<input\s{0,}|<button\s{0,})disabled(.+?)(\/>|\/button>)/g
                    item.editState=true
                    item.content=item.content.replace(reg,"$1$2$3" )
                    return false
                }
                 let map = {}
                if($($event.target).parents('.checkbox_group').siblings('.textContent').find("input")){
                    let inputArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='checkBox']")
                    console.log(inputArr,12,3)
                    for(let i=0;i<inputArr.length;i++){
                        map[inputArr.eq(i).attr("name")] = inputArr.eq(i).is(':checked')
                    }
                    let inputNa = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='NA']")
                    for(let i=0;i<inputNa.length;i++){
                        map[inputNa.eq(i).attr("name")] = inputNa.eq(i).is(':checked')
                    }


                    let inputSign = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='sign']")
                    console.log(inputSign)
                    for(let i=0;i<inputSign.length;i++){
                        console.log(inputSign.eq(i))
                        if($("div[elemid="+inputSign.eq(i).attr("id")+"]")){
                            let signatureid = $("div[elemid="+inputSign.eq(i).attr("id")+"]").attr("signatureid")
                            if(signatureid){
                                map[inputSign.eq(i).attr("name")] = signatureid+'------'+this.templateSignObj[signatureid]
                            }
                        }
                    }
                    let inputText = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='input']")
                    for(let i=0;i<inputText.length;i++){
                        map[inputText.eq(i).attr("name")] = inputText.eq(i).val()
                    }
                }
                console.log(map,1,2);
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/exceptionUpdate`,
                    method: 'post',
                    data:{
                        contentDetailId: item.id, //内容id
                        serialNo: this.workorder.serialNo, // 工单流水号
                         map
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '保存成功'})
                         }else{
                            this.$message({type: 'error', message: '保存失败，请重试'})
                        }
                        this.init()
                    })

             },
            async init(){
                await this.getTemplateById()
                this.getBySerialNoFn()
            },
            getVOListMap(){
                const result = [];
                this.contentVOList.forEach((item,index) => {
                    const map = (item)=>{
                        result.push(item)
                        if(item.children && item.children.length){
                            item.children.forEach(item1=>{
                                result.push(item1)

                            })
                        }
                    }
                    map(item)
                })
                let reduceIndex= 0
                let itemNumber = 0
                result.forEach((item, index)=>{
                    if(item.number){
                        reduceIndex = 0
                        itemNumber = item.number
                        item.reduceIndex = itemNumber
                    }else{
                        reduceIndex++
                        item.reduceIndex = itemNumber+ '.' +(reduceIndex)
                    }
                     if(item.contentDetails && item.contentDetails.length){
                        item.contentDetails.forEach((itemChild,indexChild)=>{
                            let reg=/(<input\s{0,}|<button\s{0,})(.+?)(\/>|\/button>)/g
                            itemChild.content=itemChild.content.replace(reg,"$1 disabled $2$3" )
                            itemChild.reduceIndex = item.reduceIndex+ '.' +(indexChild+1)
                        })
                    }
                    //this.$set(item,'active',true)
                })
                console.log(result)
                return result
            },
            getTemplateById(){
                let _this = this
                return new Promise((resolve,reject)=>{
                    request({
                        url:`${this.$ip}/mms-workorder/workorder/execute/${this.id}`,
                        method: 'get',
                    })
                        .then((data) => {
                            if(data.code==200){
                                this.contentVOList = data.data.template.contentVOList
                                this.contentVOListMap=this.getVOListMap()
                                this.workorder = data.data.workorder
                                this.orderModule= data.data.template
                                this.baseItemVOList = data.data.template.baseItemVOList
                                this.template = data.data.template.typeVO
                                this.labelVO = data.data.template.labelVO
                                this.getFileByIdFn(this.template.airlineCompanyLogo)
                                this.$nextTick(()=>{
                                    //if($(".textContent button").innerText ==='签章'){
                                    $(".textContent button").on('click', function(){
                                        $(this).siblings("input").attr("pos", $(this).siblings("input").attr("id"))
                                        _this.signFn($(this).siblings("input").attr("id"))
                                    })
                                    //}
                                })
                                resolve()
                            }else{
                                this.$message({type: 'error', message: '新增失败，请重试'});
                            }
                        })
                })
            },
            signFn(type){
                var signatureCreator = Signature.create()
                var that = this
                signatureCreator.handWriteDlg({
                    image_height: "2",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin')
                    },
                    onEnd: function() {
                        console.log('onEnd')
                    }
                }, function(param){
                    signatureCreator.runHW(param, {
                        //protectedItems: protectedItems,
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)

                            that.templateSignObj[this.getSignatureid().toString()] = this.getSignatureData()
                            fn(true)
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    })
                })
            },
            getBySerialNoFn(){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/getBySerialNo/${this.workorder.serialNo}`,
                    method: 'get',
                })
                    .then((data) => {
                        if(data.code==200){
                            let infList = data.data.infList
                            this.workerCompleteData = data.data.infList
                            let map = data.data.map

                            $(".checkbox_group").find('input[type="checkbox"]').each((it,ele)=>{
                                $(ele).prop("checked",false).prop("disabled",false)
                            })
                            $(".textContent").find('input[type="checkbox"]').each((ite,ele)=>{
                                $(ele).prop("checked",false)
                            })
                            $(".textContent").find('input[type="text"]').each((ite,ele)=>{
                                $(ele).val("")
                            })
                            if(infList && infList.length){
                                infList.forEach(item=>{
                                    $("."+item.contentDetailId).siblings(".checkbox_group").find("#1"+item.contentDetailId).prop("checked", item.workerCompleted).prop("disabled",item.workerCompleted)
                                    $("."+item.contentDetailId).siblings(".checkbox_group").find("#2"+item.contentDetailId).prop("checked", item.commanderCompleted).prop("disabled",item.commanderCompleted)
                                    $("."+item.contentDetailId).siblings(".checkbox_group").find("#3"+item.contentDetailId).prop("checked", item.invalid).prop("disabled",item.invalid)
                                })
                            }
                            if(Object.keys(map).length){
                                let signs = []
                                for(let i in map){
                                    if(i.includes("sign") &&
                                        map[i].includes("------") &&
                                        map[i].split("------")[0] &&
                                        map[i].split("------")[1]
                                    ){
                                        signs.push(
                                            {
                                                // extra : {
                                                //     icon_move : function() {
                                                //         //alert('禁止移动');
                                                //         return false;
                                                //     }
                                                // },
                                                signatureid : map[i].split('------')[0],//'147683973060447728',
                                                //signatureid : '14768397306',
                                                signatureData : map[i].split('------')[1]
                                            }
                                        )
                                    }else if(i.includes("input")){
                                        $("input[name='"+i+"']").val(map[i])
                                    }else{
                                        $("input[name='"+i+"']").prop('checked',map[i]=='true'?true:false)
                                    }
                                }
                                /**
                                 * 此处需要修改
                                 * **/
                                this.removeSignatureFn()
                                console.log('清空签字')
                                //Signature.hide()
                                Signature.loadSignatures(signs)
                            }
                        }else{
                            this.$message({type: 'error', message: '新增失败，请重试'});
                        }
                    })
            },
            fixedSignFn(item,type, $event){
                if(!$('#1'+item.id).is(':checked')){
                    this.$message({type: 'warning', message: '请先点击维修已完成'})
                    return
                }
                var signatureCreator = Signature.create()
                var that = this
                /* 保护项 */
                let inputArr = $($event.target).parent('.item').siblings(".item").find(".textContent").find('input')
                let protectedItems = []
                inputArr.each((index, item)=>{
                    if( !($(item).attr("id")&&$(item).attr("id").includes("sign")) ){
                        protectedItems.push($(item).attr("id"))
                    }
                })
                protectedItems = protectedItems.filter(i=>i)
                console.log(protectedItems)
                /* 保护项 */
                signatureCreator.handWriteDlg({
                    image_height: "6.7",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin')
                    },
                    onEnd: function() {
                        console.log('onEnd')
                    }
                }, function(param){
                    //alert(param.imageData)
                    signatureCreator.runHW(param, {
                        protectedItems: protectedItems,
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            that.postSignFn(item, type,this.getSignatureid()+'------'+this.getSignatureData())
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)
                            fn(true);
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    });
                });
            },
            travelSignFn(item,type, $event){
                if(!$('#2'+item.id).is(':checked')){
                    this.$message({type: 'warning', message: '请先点击放行已完成'})
                    return
                }
                var signatureCreator = Signature.create();
                var that = this;

                /* 保护项 */
                let inputArr = $($event.target).parent('.item').siblings(".item").find(".textContent").find('input')
                let protectedItems = []
                inputArr.each((index, item)=>{
                    if($(item).attr("name").includes("sign")){

                    }else{
                        protectedItems.push($(item).attr("name"))
                    }
                })
                /* 保护项 */

                signatureCreator.handWriteDlg({
                    image_height: "6.7",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin');
                    },
                    onEnd: function() {
                        console.log('onEnd');
                    }
                }, function(param){
                    //alert(param.imageData);
                    signatureCreator.runHW(param, {
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            that.postSignFn(item, type,this.getSignatureid()+'------'+this.getSignatureData())
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)
                            fn(true);
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    });
                });
            },
            signOthFn(type){
                if(!this.signBasicActiveFn()){
                    this.$message({type: 'warning', message: '请先完成所有的放行已完成'})
                    return
                }

                var signatureCreator = Signature.create()
                var that = this
                signatureCreator.handWriteDlg({
                    image_height: "5",
                    image_width: "5",
                    onBegin: function() {
                        console.log('onbegin')
                    },
                    onEnd: function() {
                        console.log('onEnd')
                    }
                }, function(param){
                    signatureCreator.runHW(param, {
                        //protectedItems: protectedItems,
                        // protectedItems:[ 'item1', 'item2', 'item3','item4',
                        //                 'item5', 'item6','item7', 'item8',
                        //                 'item9','item10', 'item11', 'item12',
                        //                 'item13','item14', 'item15', 'item16',
                        //                 'item17'],//设置定位页面DOM的id，自动查找ID，自动获取保护DOM的kg-desc属性作为保护项描述，value属性为保护数据。不设置，表示不保护数据，签章永远有效。
                        position: type, //'pos3',//$("#pos3").attr('pos'),//设置盖章定位dom的ID，必须设置
                        okCall: function(fn) {//点击确定后的回调方法，this为签章对象 ,签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,保存成功后必须回调fn(true/false)渲染签章到页面上
                            console.log("盖章ID："+this.getSignatureid());
                            console.log("盖章数据："+this.getSignatureData());
                            // if(type==='pos3'){
                            //     that.workerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }else if(type==='pos4'){
                            //     that.customerSignatureData[this.getSignatureid()] = this.getSignatureData()
                            // }
                            // console.log(that.workerSignatureData)
                            // console.log(that.customerSignatureData)

                            //that.templateSignObj[this.getSignatureid().toString()] = this.getSignatureData()
                            that.signBasicFn({
                                key:type,
                                value: this.getSignatureid().toString()+'------'+this.getSignatureData()
                            })
                            fn(true)
                        },
                        cancelCall : function() {//点击取消后的回调方法
                            console.log("取消！")
                        }
                    })
                })
            },
            postSignFn(item,type,getSignatureid){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/sign`,
                    method: 'post',
                    data:{
                        contentDetailId: item.id, //'42b51712b93254d2ede69d6ef251c68c', //item.id,
                        serialNo:this.workorder.serialNo,
                        key:type,
                        value:getSignatureid
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            fixCompleteFn(item,$event){
                let map = {}
                if($($event.target).parents('.checkbox_group').siblings('.textContent').find("input")){
                    let inputArr = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='checkBox']")
                    console.log(inputArr)
                    for(let i=0;i<inputArr.length;i++){
                        map[inputArr.eq(i).attr("name")] = inputArr.eq(i).is(':checked')
                    }
                    let inputNa = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='NA']")
                    for(let i=0;i<inputNa.length;i++){
                        map[inputNa.eq(i).attr("name")] = inputNa.eq(i).is(':checked')
                    }


                    let inputSign = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='sign']")
                    console.log(inputSign)
                    for(let i=0;i<inputSign.length;i++){
                        console.log(inputSign.eq(i))
                        if($("div[elemid="+inputSign.eq(i).attr("id")+"]")){
                            let signatureid = $("div[elemid="+inputSign.eq(i).attr("id")+"]").attr("signatureid")
                            if(signatureid){
                                map[inputSign.eq(i).attr("name")] = signatureid+'------'+this.templateSignObj[signatureid]
                            }
                        }
                    }
                    let inputText = $($event.target).parents('.checkbox_group').siblings('.textContent').find("input[name*='input']")
                    for(let i=0;i<inputText.length;i++){
                        map[inputText.eq(i).attr("name")] = inputText.eq(i).val()
                    }
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/workerComplete`,
                    method: 'post',
                    data:{
                        contentDetailId: item.id, //内容id
                        serialNo: this.workorder.serialNo, // 工单流水号
                        signingTime: '', //签章时间
                        map
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                            //this.workerCompleteData = data.data
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            commanderCompleteFn(item, $event){
                let inObj = this.workerCompleteData.find(i=>i.contentDetailId===item.id)
                if(!inObj){
                    this.$message({type: 'error', message: '操作有误，请检查'})
                    this.init()
                    return
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/commanderComplete`,
                    method: 'post',
                    data:{
                        id: inObj.id
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })

            },
            invalidFn(item, $event){
                let inObj = this.workerCompleteData.find(i=>i.contentDetailId === item.id)
                if(!inObj){
                    this.$message({type: 'error', message: '操作有误，请检查'})
                    this.init()
                    return
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/invalid`,
                    method: 'post',
                    data:{
                        id: inObj.id
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            backFn(){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/back`,
                    method: 'post',
                    data:{
                        serialNo: this.workorder.serialNo
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            cleanFn(){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/clean`,
                    method: 'post',
                    data:{
                        serialNo: this.workorder.serialNo
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: '接口调用失败，请重试'})
                        }
                        this.init()
                    })
            },
            submitFn(){
                request({
                    url:`${this.$ip}/mms-workorder/workorder/submit/${this.workorder.id}`,
                    method: 'get',
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '提交成功'})
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            questionUploadFn(){
                this.$refs.questionUpload.open(  this.workorder)
            },
            routerPushFn(path,query={}){
                this.$router.push({ path,query})
            },
            changeActiveFn(item){
                console.log(item)
                item.active = !item.active
                this.templateContentUpdateFn(item)
            },
            templateContentUpdateFn(item){
                request({
                    url:`${this.$ip}/mms-workorder/templateContent/update`,
                    method: 'post',
                    data:{
                        id:item.id,
                        active:item.active
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            this.$message({type: 'success', message: '修改成功'})
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })

            },
            saveBasicFn(type){
                if(!this[type]){
                    return false
                }
                this[type] = false
                let map = {}
                if(type === 'isActiveSave'){
                    let textArr = $(".base_i_inner").find("input[type='text']");
                    textArr.each((index, ele)=>{
                        map[$(ele).attr("name")] = $(ele).val()
                    })
                    let checkBoxArr = $(".base_i_inner").find("input[type='checkbox']")
                    checkBoxArr.each((index,ele)=>{
                        map[$(ele).attr("name")] = $(ele).is(':checked')
                    })
                }else{
                    let textArr = $(".base_i_inner").find("input[type='text']");
                    textArr.each((index, ele)=>{
                        map[$(ele).attr("name")] = ''
                    })
                    let checkBoxArr = $(".base_i_inner").find("input[type='checkbox']")
                    checkBoxArr.each((index,ele)=>{
                        map[$(ele).attr("name")] = false
                    })
                }
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/saveBasic`,
                    method: 'post',
                    data:{
                        serialNo:this.workorder.serialNo,  // 工单流水号
                        map
                    }
                })
                    .then((data) => {
                        setTimeout(()=>{
                            if(data.code == 200){
                                this.$message({type: 'success', message: '保存成功'})
                            }else{
                                this.$message({type: 'error', message: data.message})
                            }
                            this[type] = true
                            this.init()
                        },500)
                    })
            },
            signBasicFn(obj){
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/signBasic`,
                    method: 'post',
                    data:{
                        serialNo:this.workorder.serialNo,  // 工单流水号
                        ...obj
                    }
                })
                    .then((data) => {
                        if(data.code == 200){
                            //this.airInfo = data.
                            this.$message({type: 'success', message: '保存成功'})
                        }else{
                            this.$message({type: 'error', message: data.message})
                        }
                    })  // http://173.100.1.5:8011/mms-file/get-file-by-id/ee899e8629ab71c00c8609b43382336d
            },
            getFileByIdFn(id){
                request({
                    url:`${this.$ip}/mms-file/get-file-by-id/${id}`,
                    method: 'get',
                })
                    .then((data) => {
                        console.log(data)
                        if(data.code == 200){
                            this.airInfo['filePath'] = data.data.filePath
                            //this.$message({type: 'success', message: '保存成功'})
                        }else{
                            //this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            signBasicActiveFn(){
                return Array.from($(".commanderComplete")).every(i=>$(i).is(":checked"))
            },
            deleteSignFn(getSignatureid, getSignatureData){
                let key = $(`div[signatureid='${getSignatureid}']`).attr("elemid")
                //let contentDetailId = getSignatureid + '------' + getSignatureData
                //key,
                //contentDetailId
                request({
                    url:`${this.$ip}/mms-workorder/operationInf/deleteSign`,
                    method: 'post',
                    data:{
                        serialNo: this.workorder.serialNo,
                        key
                    }
                })
                    .then((data) => {
                        console.log(data)
                        if(data.code == 200){
                            //this.$message({type: 'success', message: '保存成功'})
                        }else{
                            //this.$message({type: 'error', message: data.message})
                        }
                    })
            },
            removeSignatureFn(signatureid){
                var signatureCreator = Signature.create();
                if(signatureid){
                    signatureCreator.removeSignature('KG2016093001333', signatureid);
                }else{
                    $(".kg-img-div").each((index,ele)=>{
                        signatureCreator.removeSignature('KG2016093001333', $(ele).attr("signatureid"));
                    })
                }
            }
        }
    }

</script>
<style scoped lang='scss'>
    .flex{
        display: flex;
    }
    .index{
        padding:30px;
        height:calc(100vh - 110px);
overflow-y: auto;
        .sign{
            width:70px;
            height:25px;
            line-height: 25px;
            border:1px solid #979797;
            background: #3280e7;
            color:#fff;
            font-size:14px;
        }
        .top_header{
            line-height: 68px;
            height:68px;
            position: fixed;
            font-size: 24px;
            left:0;
            top:0;
            right:0;
            background: #2D4157;
            color:#fff;
            padding:0 10px;
            z-index: 99;
        }
        .base_air{
            width:100%;
            overflow: hidden;
            .base_air_inner{
                .lists{
                    font-size:20px;
                    height:60px;
                    line-height: 60px;
                    border-left:1px solid #979797;
                    border-top:1px solid #979797;
                    box-sizing: border-box;
                    text-align: center;
                    >div{
                        border-right:1px solid #979797;
                    }
                    img{
                        width: 128px;
                    }
                }
            }
        }
        .base_item{
            width:100%;
            overflow: hidden;
            .base_i_inner{
                border-right:1px solid #979797;
                font-size: 20px;
                .lists{

                    width: 33.333%;
                    box-sizing: border-box;
                    line-height: 36px;
                    border-left:1px solid #979797;
                    border-top:1px solid #979797;
                    border-bottom:1px solid #979797;
                    .label{
                        text-align: center;
                        border-bottom:1px solid #979797;
                    }
                    .value1{
                        line-height: 72px;
                        text-align: center;
                    }
                    .value2{
                        line-height: 72px;
                        text-align: center;
                    }
                    .value3{
                        line-height: 72px;
                        text-align: center;
                        input{
                            width:96%;
                        }
                    }
                    .value4{
                        img{
                            height:96%;
                            display: block;
                            margin:0 auto;
                        }
                    }
                    .value5{
                        line-height: 72px;
                        .Wtui-checkbox:checked {
                            background:#1673ff;
                            border:solid 0px #888888;
                            top:2px;
                        }
                        .Wtui-checkbox:focus{
                            -webkit-appearance:none;
                            -webkit-user-select:none;
                            outline: none;
                        }
                        .Wtui-checkbox {
                            width:14px;
                            height:14px;
                            background-color:#ffffff;
                            border:solid 1px #888888;
                            -webkit-border-radius:50%;
                            border-radius:50%;

                            margin:0;
                            padding:0;
                            position:relative;
                            display:inline-block;
                            vertical-align:top;
                            cursor:default;
                            -webkit-appearance:none;
                            -webkit-user-select:none;
                            user-select:none;
                            -webkit-transition:background-color ease 0.1s;
                            transition:background-color ease 0.1s;
                        }
                        .Wtui-checkbox:checked::after {
                            content:'';
                            top:3px;
                            left:2px;
                            position:absolute;
                            background:transparent;
                            border:#fff solid 2px;
                            border-top:none;
                            border-right:none;
                            height:3px;
                            width:8px;
                            -moz-transform:rotate(-45deg);
                            -ms-transform:rotate(-45deg);
                            -webkit-transform:rotate(-45deg);
                            transform:rotate(-45deg);
                        }
                    }
                    .value6{
                        padding:10px;
                    }
                }
                .base_i_inner_btn{
                    width:100%;
                    height:68px;
                    border-left:1px solid #979797;
                    border-bottom:1px solid #979797;
                    >button{
                        width:100px;
                        height:40px;
                        background:#409eff;
                        border-radius:4px;
                        line-height:40px;
                        text-align:center;
                        color:#fff;
                        outline: none;
                        border:none;
                    }
                }
            }
        }
        .order_content{
            font-size:20px;
            .order_c_main{
                .order_c_b{
                    border-right: 1px solid #979797;
                }
                .textContentParent{
                    position: relative;
                }
                .item1 > div{
                    border-left:1px solid #979797;
                    border-top:1px solid #979797;
                    border-bottom:1px solid #979797;
                    text-align: center;
                    padding:10px 0;
                    vertical-align: top;
                    &:last-child{
                        border-right:1px solid #979797;
                    }
                }
                .item{
                    border-left:1px solid #979797;
                    border-bottom:1px solid #979797;
                    text-align: center;

                    vertical-align: top;
                    position: relative;
                    .checkbox_group{
                        font-size:16px;
                        height: 40px;
                        line-height: 40px;
                        border-top:1px solid #979797;
                        /*border-bottom:1px solid #979797;*/

                    }
                    .textContent{
                        position: relative;
                        padding:10px 0;
                        // position: absolute;
                        // left:0;
                        // top:0;
                        // height: 50px;
                    }
                    .textContentLeft{
                        padding: 5px 10px;
                        text-align: left;
                    }
                }
            }
            .table{
                width:100%;
                thead{
                    tr{
                        th{
                            padding:5px;
                            text-align: center;
                        }
                    }
                }
                tbody{
                    tr{
                        td{
                            text-align: center;
                            padding:10px 0;
                            vertical-align: top;
                            .sign{
                                width:70px;
                                height:25px;
                                line-height: 25px;
                                border:1px solid #979797;
                                background: #3280e7;
                                color:#fff;
                                font-size:14px;
                            }
                        }
                    }
                }
                .checkbox_group{
                    font-size:16px;
                    height: 40px;
                    line-height: 40px;
                    border-top:1px solid #979797;
                    border-bottom:1px solid #979797;

                    &:nth-last-child(1){
                        border-bottom:none;
                    }
                    input[type='checkbox']{
                        width: 24px;
                        height: 24px;
                        margin: 0 6px;
                    }
                }
            }
        }
        .page_t{
            line-height: 40px;
            font-size: 24px;
        }
        .bottom_fix{
            position: fixed;
            left: 0;
            bottom:68px;
            z-index: 100;
            background: #fff;
            height: 60px;
            line-height: 60px;
            width:100%;
            border-top: 1px solid #979797;
            button{
                width:100px;
                height: 44px;
                line-height: 44px;
                outline: none;
                border:1px solid #979797;
                font-size:16px;
                color:#222222;
                letter-spacing: 2px;
                border-radius: 3px;
            }
            .active{
                background: #3280e7;
                color:#fff;
            }
        }
    }
</style>

