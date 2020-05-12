<template>
        <div class="milepostChartBox">
            <div v-for="item in nodeLists.nodes" :key="item.id" class="node-content" :style="'position: absolute;left:'+item.nodeStyle.left+';top:'+item.nodeStyle.top" :id="'node_drop_'+item.id" :data-id="item.id">
                <div class="select-node"  :id="'node'+item.id" >
                    <div class="nodeName" >
                        <div class="nodeName-text" :title="item.name">
                            {{item.name}}
                        </div>
                    </div>
                    <div class="nodeCode">
                        {{item.code}}
                    </div>
                    <div class="nodeChecked" >
                        <input type="checkbox" :checked="item.checked" disabled="true">
                    </div>
                </div>
            </div> 
        </div> 
</template>
<script>
export default {
	data(){
		return {
           nodeLists:{
				connections:[],
				nodes:[]
			},
		}
    },
    props:["nodeData"],
     
	mounted () {
        let tempArr = JSON.parse(localStorage.getItem("nodeList"));
        //修正偏移量
        tempArr.nodes.map(item=>{
            item.nodeStyle.left = (item.nodeStyle.left.replace("px","")-250)+'px';
            item.nodeStyle.top = (item.nodeStyle.top.replace("px","")-80)+'px';
        });
        this.nodeLists = tempArr;
        let _this = this;
        jsPlumb.ready(function() {
            var sourceEndpoint = {
                maxConnections: -1,    // 设置连接点最多可以连接几条线
                connectorOverlays: []
            };
            var instance = (window.jsp = jsPlumb.getInstance({
                DragOptions: { cursor: "pointer", zIndex: 2000 },
                Connector: ['Flowchart', {
                    gap: 0,
                    cornerRadius: 5,
                    alwaysRespectStubs: true
                }],  
                PaintStyle: { stroke:"#42B261", strokeWidth:3,"dashstyle": "2 4" },
                HoverPaintStyle: { stroke: "red" },
                Endpoint:  ['Dot', {
                    radius: 8,
                    cssClass: "hideEndpoint"
                }],
                EndpointStyle: {
                    fill: "#4caf50",
                    radius: 6,
                },
            }));
            var arrowCommon = { foldback: 0.7, fill: '#42B261', width: 14 };
            var parallelType = {
                overlays: [
                    ["Arrow", { location: 0.8 }, arrowCommon],
                    ["Arrow", { location: 0.2, direction: -1 }, arrowCommon],
                ],
            };
            instance.registerConnectionType("parallel", parallelType);
            _this.nodeLists.connections.map(function(item){
                if(item.isParallel){
                        _this.$nextTick(() => {
                        instance.makeSource('node_drop_'+item.sourceId, {
                            filter: ".ep",
                            anchor: ["Perimeter", { shape: "Rectangle" }],
                            extract: {
                                action: "the-action"
                            }
                        });
                        instance.makeTarget('node_drop_'+item.targetId, {
                            anchor: ["Perimeter", { shape: "Rectangle" }],
                            allowLoopback: false
                        });
                        instance.connect({
                            source: "node_drop_" +item.sourceId,
                            target: "node_drop_" +item.targetId,
                            type: "parallel",
                            anchors: item.anchor
                        });
                    });
                }else{
                    _this.$nextTick(() => {
                        instance.makeSource('node_drop_'+item.sourceId, {
                            filter: ".ep",
                            anchor: ["Perimeter", { shape: "Rectangle" }],
                            extract: {
                                action: "the-action"
                            }
                        });
                        instance.makeTarget('node_drop_'+item.targetId, {
                            anchor: ["Perimeter", { shape: "Rectangle" }],
                            allowLoopback: false
                        });
                        instance.connect({
                            source: "node_drop_" +item.sourceId,
                            target: "node_drop_" +item.targetId,
                            type: "",
                            anchors: item.anchor
                        });
                    });
                }
            });
        });
    },
	methods:{
        
	}
}
</script>
<style lang="scss">
    .milepostChartBox { 
         height:800px;width:100%; position: relative;
            /deep/ .hideEndpoint{
                display:none;
            }
            /deep/ .select-node{
                cursor: pointer;
                height: 110px;
                .nodeName{
                    width:80px;
                    height:80px;
                    background:linear-gradient(315deg,rgba(97,133,251,1) 0%,rgba(19,164,212,1) 100%);
                    border-radius: 4px;color: #fff;font-size: 12px;
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    padding: 2px;
                    .nodeName-text{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                .nodeCode{
                    width:80px;
                    background:rgba(0,0,0,1);
                    border-radius:4px;opacity:0.3;
                    color: #fff;
                    font-size: 12px;
                    display: flex;
                    justify-content:center;
                    align-items: center;
                    margin-top:5px;
                    }
                .nodeChecked{
                    position: relative;
                    top:-85%;
                    left: 40%;
                    height:20px;
                    width:20px;
                    input{
                        height: 20px;
                        width: 20px;
                        border:1px solid red;
                    }
                }
            }
}
</style>
