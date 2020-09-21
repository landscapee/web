<template>
	<div style="display: flex;flex-direction:column;justify-content: center;align-items: center">
		<div class="divOpt" v-for="(opt,index) in data" :key="index">
			<p :class="'p'+index">
				<span>{{index+1}}</span>
				<span>{{opt.name}}</span>
				<input :type="opt.type" :name="opt.name">
				<input :class="'button'+index" type="button" value="签字"  >
			</p>
		</div>
	</div>
</template>

<script>
    import $ from 'jquery'
    import request from '@lib/axios.js';

     import {SignatureInit} from '@/ui/lib/Signature.js'
    import {initParam} from './basicData'
    export default {
        name: "index",
        components: {},
        data() {
            return {
                data:[
                    {id:1,type:'input',name:'input1',zw:'input1',},
                    {id:2,type:'text',name:'text1',zw:'text1',},
                    {id:3,type:'radio',name:'radio1',zw:'radio1',},
                    {id:4,type:'radio',name:'radio1',zw:'radio2',},
                    {id:5,type:'checkbox',name:'checkbox1',zw:'checkbox1',},
                    {id:6,type:'checkbox',name:'checkbox2',zw:'checkbox2',},
                    ]
			}
        },
        methods: {},
        created() {
        },
		mounted(){
            let _this=this
            window.onload = function(){
                //Signature.loadSignatures(signs);
                Signature.bind({
                    remove:function(fn){//签章数据撤销时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,
                        console.log('获取删除的签章ID：'+this.getSignatureid());
                        fn(true);//保存成功后必须回调fn(true/false)传入true/false分别表示保存成功和失败

                    },
                    update:function(fn){//签章数据有变动时，将回调此方法，需要实现签章数据持久化（保存数据到后台数据库）,执行后必须回调fn(true/false)，传入true/false分别表示保存成功和失败
                        /* if(Signature.options.sealType == 'client' && Signature.options.moveable_self && this.signatureData.keysn == this.keysn){
							console.log('获取更新的签章ID：'+this.getSignatureid());
							console.log('获取更新的签章数据：'+this.getSignatureData());
						} */
                        console.log('获取更新的签章ID：'+this.getSignatureid());
                        console.log('获取更新的签章数据：'+this.getSignatureData());
                        fn(true);
                        var signatureCreator = Signature.create();
                        signatureCreator.removeSignature(this.documentid, this.getSignatureid());
                        signatureCreator.saveSignature(this.documentid,  this.getSignatureid(), this.getSignatureData(), function(data){
                            console.log(data.result);
                        });
                    }
                });

                ////////////////////////////////////
                var signatureCreator = Signature.create();
                signatureCreator.getSaveSignatures("KG2016093001", function(signs){
                    var signdata = new Array();
                    var jsonList = eval("("+signs+")");
                    for(var i=0;i<jsonList.length;i++){
                        var map = {};
                        map.signatureid = jsonList[i]["signatureId"];
                        map.signatureData = jsonList[i]["signature"];
                        signdata.push(map);
                    }

                    Signature.loadSignatures(signdata);
                });
            }
		}
    }
</script>

<style lang="scss" scoped>
.divOpt{
	width: 400px;
	padding: 15px;
	border: #ffa430 1px solid;
	margin-top: 15px;
}
</style>