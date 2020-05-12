<template>
<div id="layer-set-milepost">
    <el-dialog  @open="openMilepost"  :visible.sync="nodeDialogShow" class="nodeDialog milepostDialog" :show-close="false" center width="1600px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">里程碑进程全节配置</div>
            <div class="blankDiv"></div>
        </template>
        <div class="milepostNodeBox">
			<div class="title">
				进程节点名称:
				<el-select v-model="activeNode" @change="nodeChange" filterable placeholder="请选择" :style="'width:auto'">
					<el-option v-for="item in nodeLists" :key="item.id" :label="item.name"  :value="item.id"></el-option>
				</el-select>
				<el-button type="primary" plain @click="nodeSet">配置</el-button>
			</div>
		</div>
		<div class="main-content" >
			<div class="left-node-content" id="left-node-content">
				<div class="select-node" v-for="(item,index) in nodeLists" :key="index" :id="'node'+item.id" :data-id="item.id">
					<div class="nodeName" >
						<div class="nodeName-text" :title="item.name">
							{{item.name}}
						</div>
					</div>
					<div class="nodeCode">
						{{item.code}}
					</div>
					<div class="nodeChecked" v-show="false">
						<input type="checkbox" :checked="item.checked">
					</div>
            	</div>
			</div>
			<div class="milepostImgBox" id="main-box-content"></div>
		</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="nodeDialogShow = false">取 消</el-button>
            <el-button @click="saveMilepost" type="primary" >保 存</el-button>
        </div>
    </el-dialog>
	<el-dialog  width="500px" :append-to-body="true"  :rules="nodeRules"  :visible.sync="updateNodeVisible" class="nodeDialog milepostDialog" :show-close="false" center>
		<template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">修改节点名称</div>
            <div class="blankDiv"></div>
        </template>
		<el-form :model="nodeForm" ref="nodeForm" style=" height: 50px;">
			<el-form-item label="节点名称"  prop="name" :rules="nodeRules.name"  label-width="120px">
				<el-input v-model="nodeForm.name" autocomplete="off" clearable></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="cancelNodeForm">取 消</el-button>
			<el-button type="primary" @click="submitNodeForm">确 定</el-button>
		</div>
	</el-dialog>
	<el-dialog :visible.sync="milepostNodeDialogShow" class="nodeDialog milepostNodeDialog" :show-close="false" center width="800px" :append-to-body="true">
        <template slot="title">
            <div class="blankDiv"></div>
            <div class="el-dialog_header_step">里程碑节点配置</div>
            <div class="blankDiv"></div>
        </template>
		<div class="milepostNodeBox">
			<div class="title">
				里程碑节点名称:
				<el-select v-model="activeNode" @change="nodeChange" filterable placeholder="请选择" :style="'width:auto'">
					<el-option v-for="item in nodeLists" :key="item.id" :label="item.name"  :value="item.id"></el-option>
				</el-select>
			</div>
			<div class="body">
				<div>
					<div class="textTile sansM">时间显示</div>
					<el-checkbox-group v-model="NodeTime" >
						<el-checkbox label="0" >时间计划</el-checkbox>
						<el-checkbox label="1" >实际时间</el-checkbox>
					</el-checkbox-group>
				</div>
				<div>
					<div class="textTile sansM">警示阀值设置</div>
					<label>预计时间</label>
					<el-input placeholder="预计到达时间" prefix-icon="el-icon-time" :style="'width:auto'"></el-input>
					<el-checkbox v-model="proM">提前预警(分钟)</el-checkbox>
					<el-input placeholder="请输入" :style="'width:auto'"></el-input>
					<el-checkbox v-model="appendM">延后预警(分钟)</el-checkbox>
					<el-input placeholder="请输入" :style="'width:auto'"> </el-input>
				</div>
				<div class="border0">
					<div class="textTile sansMs">发送偏离警示信息对象设置</div>
					<el-checkbox-group v-model="nodeUser" >
						<el-checkbox label="0" >时间计划</el-checkbox>
						<el-checkbox label="1" >实际时间</el-checkbox>
					</el-checkbox-group>
				</div>
				
			</div>
		</div>
        <div slot="footer" class="dialog-footer">
            <el-button @click="milepostNodeDialogShow = false">取 消</el-button>
            <el-button type="primary" @click="nodesetSave">保 存</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import {flattenDeep,find,cloneDeep,pullAllBy,pullAll,compact} from 'lodash';
export default {
	data(){
		return {
			nodeDialogShow:false,
			milepostNodeDialogShow:false,
			setMilepostNodeDialogShow:false,
			updateNodeVisible:false,
			NodeTime:['0','1'],
			proM:null,
			appendM:null,
			nodeUser:['0','1'],
			nowValue: null,
			nodeForm:{name:""},
			nodeRules:{
				name: [
				    { required: true, message: '请输入节点名称', trigger: 'change' },
					{
						validator: (rule, value, callback) => {
							let flag = false;
							this.nodeListsClone.map((array, index) => {
								if (this.nodeListsClone.length != 1) {
									if (array.name == value) {
										flag = true;
									}
								}
							});
							if (this.nowValue == value) {
								callback();
							} else if (flag) {
								callback(new Error('节点名称已存在！'));
							} else {
								callback();
							}
						},
						trigger: 'change',
					}
				]
			},
			nodeLists:[
				{id:0, pId:"", name: "节点0", code: "dfafd",type:0,checked:true},
				{id: 1, pId: 0, name: "节点1",code: "dfafd",type:0,checked:true},
				{id: 101, pId: 1, name: "节点101", position:'top',type:0, code: "dfafd",checked:true},
				{id: 10101, pId: 101, name: "节点10101",position:'top',type:0, code: "dfafd",checked:true},
				{id: 10102, pId: 101, name: "节点10102",position:'top',type:0, code: "dfafd",checked:true},
				{id: 2, pId: 0, name: "节点2", open: false,type:0, code: "dfafd",checked:true},
				{id: 201, pId: 2, name: "节点201", file: "excheck/checkbox",type:0, code: "dfafd",checked:true},
				{id: 206, pId: 2, name: "节点206", file: "excheck/checkbox_nocheck",type:0, code: "dfafd",checked:true},
				{id: 2011, pId: 201, name: "节点2011", file: "excheck/checkbox",type:0, code: "dfafd",checked:true},
				{id: 2061, pId: 206, name: "节点2061", file: "excheck/checkbox_nocheck",type:0, code: "dfafd",checked:true},
				{id: 3, pId: 0, name: "节点3", open: false,type:0, code: "dfafd",checked:true},
				{id: 301, pId: 3, name: "节点301", file: "exedit/drag",type:0, code: "dfafd",checked:true},
				{id: 302, pId: 3, name: "节点302", file: "exedit/drag_super",type:0, code: "dfafd",checked:true},
				{id: 4, pId: 0, name: "节点4", open: false,type:0, code: "dfafd",checked:true},
				{id: 401, pId: 4, name: "节点401", file: "bigdata/common",type:0, code: "dfafd",checked:true},
			],
			saveNodeLists:{
				connections:[],
				nodes:[]
			},
			nodeListsClone:[
				{id:0, pId:"", name: "节点0", code: "dfafd",type:0,checked:true},
				{id: 1, pId: 0, name: "节点1",code: "dfafd",type:0,checked:true},
				{id: 101, pId: 1, name: "节点101", position:'top',type:0, code: "dfafd",checked:true},
				{id: 10101, pId: 101, name: "节点10101",position:'top',type:0, code: "dfafd",checked:true},
				{id: 10102, pId: 101, name: "节点10102",position:'top',type:0, code: "dfafd",checked:true},
				{id: 2, pId: 0, name: "节点2", open: false,type:0, code: "dfafd",checked:true},
				{id: 201, pId: 2, name: "节点201", file: "excheck/checkbox",type:0, code: "dfafd",checked:true},
				{id: 206, pId: 2, name: "节点206", file: "excheck/checkbox_nocheck",type:0, code: "dfafd",checked:true},
				{id: 2011, pId: 201, name: "节点2011", file: "excheck/checkbox",type:0, code: "dfafd",checked:true},
				{id: 2061, pId: 206, name: "节点2061", file: "excheck/checkbox_nocheck",type:0, code: "dfafd",checked:true},
				{id: 3, pId: 0, name: "节点3", open: false,type:0, code: "dfafd",checked:true},
				{id: 301, pId: 3, name: "节点301", file: "exedit/drag",type:0, code: "dfafd",checked:true},
				{id: 302, pId: 3, name: "节点302", file: "exedit/drag_super",type:0, code: "dfafd",checked:true},
				{id: 4, pId: 0, name: "节点4", open: false,type:0, code: "dfafd",checked:true},
				{id: 401, pId: 4, name: "节点401", file: "bigdata/common",type:0, code: "dfafd",checked:true},
			],
			activeNode:1,
			zTreeObj:null,
			childrenList:[],
			ztreeList:[],
			nodeDomId:'',
			connectState:1,
			isInit:"",
			waitDelete:[]
		}
	},
	props: ["colNameLists"],
	mounted () {
		// this.getNodeListsTree()
		
	},
	watch: {
		nodeLists: {
			handler(newName, oldName) {
				this.$nextTick(()=>{
					$("#left-node-content").children().draggable({
						helper: "clone",
						scope: "zlg",
					});
				})
				if(this.isInit=="" && localStorage.getItem("nodeList")){
					pullAllBy(this.nodeLists,JSON.parse(localStorage.getItem("nodeList")).nodes, 'id');
				}
			},
			// 代表在wacth里声明了firstName这个方法之后立即先去执行handler方法
			immediate: true
		},
		
	},
	components: {
		"milepost-chart" : () => import(/*webpackChunkName:"com-milepostChart"*/ './com-milepost-chart')
	},
	methods:{
		updateNodeName(item){
			Object.values(this.$refs['ref_milepostChart1'].nodeByLevelList).forEach((listItem,index) => {
				let findObj = find(listItem, function(o) { return item.id === o.id; });
				if(findObj){
					findObj.name = item.name;
				}
			});
		},
		milepostComplete(ref){
			this.$refs[ref].getNodeListsTree();
		},
		saveMilepost(){
			this.nodeDialogShow = false;
			localStorage.setItem("nodeList",JSON.stringify(this.saveNodeLists));
		},
		setNode(){
			this.setMilepostNodeDialogShow=true
		},
		initOpenData(instance,sourceEndpoint){
			let _this = this;
			this.saveNodeLists.nodes.map(function(item,index){
					let name = item.name;
					let code = item.code;
					let checked = item.checked;
					let left = item.nodeStyle.left;
					let top = item.nodeStyle.top;
					var dataId =  item.id;
					var id = "node_drop_" + dataId;
					if(_this.isInit==id){
						throw "jsPlumb的bug";
					}else{
						let flag = false;
						try {
							instance.draggable(id);
						} catch (e) {
							flag = true;
						}
						if(!flag){
							$("#main-box-content").append('<div  class="node-content" style="position: absolute" id="' + id + '" data-id="'+ dataId+ '">' 
							+'<div class="select-node"  >' 
								+'<div class="nodeName" >'
									+'<div class="nodeName-text" title="' + name + '">'
										+name
									+'</div>'
								+'</div>'
								+'<div class="nodeCode">"' + code + '"</div>'
								+'<div class="nodeChecked">'
									+'<input type="checkbox"' + (checked?'checked="checked"':'') + '">'
								+'</div>'
							+'</div>'
							+'</div>');
							$("#" + id).css("left", left).css("top", top);
							instance.addEndpoint(id, sourceEndpoint, { anchor: "TopCenter" , uuid: id+'t'});
							instance.addEndpoint(id, sourceEndpoint, { anchor: "RightMiddle" ,uuid: id+'r' });
							instance.addEndpoint(id, sourceEndpoint, { anchor: "BottomCenter"  ,uuid: id+'b'});
							instance.addEndpoint(id, sourceEndpoint, { anchor: "LeftMiddle" , uuid: id+'l'});
							instance.draggable(id,{
								stop (params) {
									_this.$nextTick(() => {
										let top = params.el.style.top
										let left = params.el.style.left
										_this.saveNodeLists.nodes.forEach(item => {
											if (item.id === dataId) {
												item.nodeStyle.left = left;
												item.nodeStyle.top = top;
											}
										});
									})
								}
							});
							$("#" + id).draggable({ containment: "parent" });
							_this.clickNode("#" + id);
						}
					}
				if(index==0){
					_this.isInit = id;
				}
			});
		
			this.saveNodeLists.connections.map(function(item){
				if(item.isParallel){
					instance.connect({
						source: "node_drop_" +item.sourceId,
						target: "node_drop_" +item.targetId,
						type: "parallel",
						anchors: item.anchor
					});
				}else{
					instance.connect({
						source: "node_drop_" +item.sourceId,
						target: "node_drop_" +item.targetId,
						type: "seriesconn",
						anchors: item.anchor
					});
				}
			});
		},
		realPx(px){//获取真实px
            let lealpx = px
            let bili = Number(_.split($("html")[0].style.fontSize,"p")[0])/100
            
            lealpx = px*bili
            return lealpx
        },
		openMilepost(){
			let _this = this;
		
			if(localStorage.getItem("nodeList")){
				this.saveNodeLists =  JSON.parse(localStorage.getItem("nodeList"));
			}
			setTimeout(() => {
			 jsPlumb.ready(function() {
				var	connectionOverlays = [
					["Custom", {
						create: function (component) {
							if(_this.connectState==1){
								return $("<div style='z-index:99999999;background: #fff;'><select class='myDropDown'>" +
								"<option value='1'>串联</option>" +
								"<option value='2'>并联</option>" +
								"</select></div>");
							}else{
								return $("<div style='z-index:99999999;background: #fff;'><select class='myDropDown'>" +
								"<option value='2'>并联</option>" +
								"<option value='1'>串联</option>" +
								"</select></div>");
							}
							
						},
						location: 0.5,
						id: "customOverlay",
					}],
				],
				// the definition of source endpoints (the small blue ones)
				sourceEndpoint = {
					isSource: true,
					isTarget: true,
					maxConnections: -1,    // 设置连接点最多可以连接几条线
					connectorOverlays: connectionOverlays
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
							fill: '#ff5722'
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
						["Custom", {
								create: function (component) {
									return $("<div style='z-index:99999999;background: #fff;'><select class='myDropDown'>" +
									"<option value='2'>并联</option>" +
									"<option value='1'>串联</option>" +
									"</select></div>");
								},
								location: 0.5,
								id: "customOverlay",
						}],
					],
				};
				 var seriesconnType = {
					overlays: [
						["Custom", {
								create: function (component) {
										return $("<div style='z-index:99999999;background: #fff;'><select class='myDropDown'>" +
										"<option value='1'>串联</option>" +
										"<option value='2'>并联</option>" +
										"</select></div>");
								},
								location: 0.5,
								id: "customOverlay",
						}],
					],
				};
				instance.registerConnectionType("seriesconn", seriesconnType);
				instance.registerConnectionType("parallel", parallelType);
				
				//设置左侧为可复制的
				$("#left-node-content").children().draggable({
					helper: "clone",
					scope: "zlg",
				});
				//初始化数据
					_this.initOpenData(instance,sourceEndpoint);
						//设置右侧为拖拽存放区
					$("#main-box-content").droppable({
						scope: "zlg",
						drop: function (event, ui) {
							var left = parseInt(ui.offset.left - _this.realPx(14));
							var top = parseInt(ui.offset.top + _this.realPx(6));
							var dataId = parseInt($(ui.draggable[0]).attr("data-id"));
							var id = "node_drop_" + dataId ;
							if($("#" +id).length == 0) {
								_this.nodeLists.map((item,index)=>{
									if(item.id == parseInt($(ui.draggable[0]).attr("data-id"))){
										_this.nodeLists.splice( index, 1 );
									}
								});
								let item = {
									id: parseInt($(ui.draggable[0]).attr("data-id")),
									name: $(ui.draggable[0]).find(".nodeName-text")[0].innerText,
									code: $(ui.draggable[0]).find(".nodeCode")[0].innerText,
									checked:true,
									nodeStyle: {
										top: top + "px",
										left: left + "px"
									}
								};
								_this.saveNodeLists.nodes.push(item);
								//dom渲染
								$(this).append('<div  class="node-content" style="position: absolute" id="' + id + '" data-id="' + $(ui.draggable[0]).attr("data-id") + '">' + ui.draggable[0].outerHTML + '</div>');
								 $("#"+id).find("input[type='checkbox']").attr("checked", 'checked');
								$("#"+id).find(".nodeChecked").show();
								$("#" + id).css("left", left).css("top", top);
								_this.$nextTick(() => {
									instance.addEndpoint(id, sourceEndpoint, { anchor: "TopCenter" , uuid: id+'t' });
									instance.addEndpoint(id, sourceEndpoint, { anchor: "RightMiddle" ,uuid: id+'r' });
									instance.addEndpoint(id, sourceEndpoint, { anchor: "BottomCenter"  ,uuid: id+'b'});
									instance.addEndpoint(id, sourceEndpoint, { anchor: "LeftMiddle" , uuid: id+'l'});
									instance.draggable(id, {
										stop (params) {
											_this.$nextTick(() => {
												let top = params.el.style.top
												let left = params.el.style.left
												_this.saveNodeLists.nodes.forEach(item => {
													if (item.id === dataId) {
														item.nodeStyle.left = left;
														item.nodeStyle.top = top;
													}
												});
											})
										}
									});
									$("#" + id).draggable({ containment: "parent" });
									_this.clickNode("#" + id);
								})
								
							}
						}
					});
					//鼠标进入增加一个删除的小图标
					$("#main-box-content").on("mouseenter", ".node-content", function () {
						$(this).append('<img src="/static/img/close2.png"  style="position: absolute;" />');
							$("img").css("left", 44).css("top", -7);
					});
					//鼠标离开小图标消失
					$("#main-box-content").on("mouseleave", ".node-content", function () {
						$("img").remove();
					});
					//节点小图标的单击事件
					$("#main-box-content").on("click", "img", function () {
						var name = $(this).parent().find(".nodeName-text")[0].innerText;
						if (confirm("确定要删除"+name+"吗?")) {
								let id = $(this).parent().attr("id");
								let dataId = parseInt($(this).parent().attr("data-id"))
								_this.nodeListsClone.map((item,index)=>{
								   if(item.id == dataId){
										item.name = name;
										_this.nodeLists.unshift(item);
									}
								})
								//删除node节点
								instance.remove(id);//移除节点
								//删除node数据
								_this.saveNodeLists.nodes = _this.saveNodeLists.nodes.filter((obj,index) => {
									if(obj.id != dataId){
										return obj;
									}
								});
								//删除连线
								_this.saveNodeLists.connections = _this.saveNodeLists.connections.filter((obj,index) => {
									if(obj.targetId!=dataId && obj.sourceId!=dataId){
										return obj;
									}
								});
						}
					});
					//连接线的单击事件
					instance.bind("click", function (conn, originalEvent) {  
						//下拉框选择事件
						$('.myDropDown').change(() => {
							var state = parseInt($(originalEvent.target).find("option:selected").val());
							_this.saveNodeLists.connections.map(function(item){
								if(parseInt($(conn.target).attr("data-id"))===item.targetId && parseInt($(conn.source).attr("data-id"))===item.sourceId && state===1){
									item.isParallel = false;
									conn.setType("seriesconn");
								}else if(parseInt($(conn.target).attr("data-id"))===item.targetId && parseInt($(conn.source).attr("data-id"))===item.sourceId && state===2){
									item.isParallel = true;
									conn.setType("parallel");
								}
							})
						});
					});
					//连接线的双击事件
					instance.bind("dblclick", function (conn, originalEvent) {
						if (confirm("确定删除此连线吗？"))
								instance.deleteConnection(conn);
					});
					//连接
					instance.bind("connection", function (connInfo, originalEvent) {
						console.log("连接"+connInfo.connection.sourceId+"==="+connInfo.connection.targetId);      
					});
					// // 监听拖动connection 事件，判断是否有重复链接
					// instance.bind("beforeDrop", function (info) {
						
					// });
					//连接完成
					instance.bind("connectionDragStop", function (info) {
						let flag = true;
						_this.saveNodeLists.connections.forEach(item => {
							if (
								('node_drop_'+item.targetId === info.targetId &&
								'node_drop_'+item.sourceId === info.sourceId) ||
								('node_drop_'+item.targetId === info.sourceId && 'node_drop_'+item.sourceId === info.targetId)
							) {
								flag = false;
							}
						});
						if (info.sourceId === info.targetId) { 
								instance.deleteConnection(info);
							_this.$message.error('不能连接自己！');
						}else if (flag) {
							_this.saveNodeLists.connections.push({
								targetId: parseInt($(info.target).attr("data-id")),
								sourceId:  parseInt($(info.source).attr("data-id")),
								anchor:[info.endpoints[0].anchor.type,info.endpoints[1].anchor.type],
								isParallel:false
							});
						} else{
								instance.deleteConnection(info);
							_this.$message.error("不允许重复连接！");
						}
						return flag;	
					});
				});
		}, 0)
		},
		init(){
				this.nodeDialogShow=true;
		},
		clickNode(id) {
			let _this  = this;
				//双击节点内容区域时的事件
				$(id).dblclick(function () {
					_this.nowValue = $(this).find(".nodeName-text")[0].innerText;
					_this.nodeForm.name = $(this).find(".nodeName-text")[0].innerText;
					_this.nodeDomId = id;
					_this.updateNodeVisible = true;
				});
				//选中事件
				$(id).find('input:checkbox').click(function (e) {
					_this.saveNodeLists.nodes.map(function(item){
						if(parseInt($(id).attr("data-id"))==item.id){
							item.checked = $(e.target).is(':checked');
						}
					})
				});
		},
		submitNodeForm(){
			this.$refs.nodeForm.validate((valid) => {
				if (valid) {
					this.updateNodeVisible = false;
					$(this.nodeDomId).find(".nodeName-text").text(this.nodeForm.name) ;
					$(this.nodeDomId).find(".nodeName-text").attr("title",this.nodeForm.name) ;
				} else {
					console.log('error submit!!');
					return false;
				}
			});
			
		},
		cancelNodeForm(){
			this.updateNodeVisible = false;
			this.$refs['nodeForm'].clearValidate();
		},
		nodesetSave(){

		},
		nodeSet(){
			this.milepostNodeDialogShow=true
		},
        
		getNewList(lists){
			var data = []
			// lists.forEach((list,idx)=>{
			// 	if(da)
			// })
		},


		getNode(){
			if(!this.zTreeObj){
				return []
			}
			var nodes = this.zTreeObj.getNodesByParam("id", this.activeNode, null);
			return nodes[0].children?nodes[0].children:[]
		},
		nodeChange(data,tag){
			if(tag && tag=='click'){
				this.activeNode = data;
			}
			this.childrenList=this.nodeLists.filter(list=>{
				return list.pId === data
			})
			// this.loadNodeImg()
		},
		loadNodeImg(){
			var nodes = this.zTreeObj.getNodesByParam("id", this.activeNode, null);
		}
	}
}
</script>

<style lang="scss" scoped>
.milepostDialog,.setMilepostNodeDialog{
	.milepostNodeBox{
		.title{margin-bottom: 15px;}
		.body{border: 1px solid rgba(151,151,151,1);border-radius: 5px;padding: 20px;;
			table{width: 100%;}

		}
	}
	.main-content{
			width: 100%;
		    height: 80vh;
			display: flex;
			justify-content: space-between;
		.left-node-content{
			border: 2px solid darkgray;
			width: 243px;
			height: 100%;
			box-sizing: border-box;
			display: flex;
			flex-flow: column;
			align-items: center;
			overflow-y: auto;
			margin-right: 10px;
			.select-node{
				margin-top: 20px;
			}
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
		.milepostImgBox{
			background:rgba(239,242,243,1);
			border-radius:10px;
			width: calc(100% - 243px);
			height: 100%;
			box-sizing: border-box;
		}
	}
	
}
.milepostNodeDialog{
	.milepostNodeBox{
		.title{margin-bottom: 15px;}
		.body{border: 1px solid rgba(151,151,151,1);border-radius: 5px;
			&>div{padding:20px 30px ;border-bottom:1px dashed #979797;
				.textTile{font-size: 16px;margin-bottom: 20px;font-weight:500;;}
				label{margin:0 10px 0 30px;}
			}

			&>div:nth-last-of-type(){border-bottom:none;}

		}
	}
}
</style>
