<template>
    <div class='index'>
        <router-view v-if="this.$router.history.current.path == '/detail'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/addFile'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/batchPush'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/fileHistory'" :key="$route.path"></router-view>
        <router-view v-else-if="this.$router.history.current.path == '/readTrack'" :key="$route.path"></router-view>
        <div class='inner' v-else>
            <div class='top_content'>
                <div class='header'><span>文件管理</span></div>
                <div class='i_main'  @contextmenu.prevent.stop="openMainMenuFn($event)">
                    <div class="list" v-for="(item,index) in fileList" :key='index' :class='item.isClickEd?"isClickEd":""'  @dblclick="openFile(item)" @click.prevent='showClickFn($event,item)' @contextmenu.prevent.stop="openMenu($event,item)" >
                        <div class='icon'>
                            <icon :iconClass="item.icon" ></icon>
                        </div>
                        <div class='label'>
                            <span class='text' v-if='!item.nameEditing' :title='item.label'>{{item.label}}</span>
                            <span v-else><el-input v-focus :ref="item.icon+index" type='textarea' rows='1' v-model="item.label" placeholder="请输入文件名" @blur="onBlurFn(item)"></el-input></span>
                        </div>
                        <div v-show='item.isClickEd&&item.fileUpdateTime' class='time'>修改日期:{{item.fileUpdateTime}}</div>
                    </div>
                </div>
                
            </div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click='contextmenuOpenFileFn'>打开</li>
            <li @click='contextmenuEditNameFn'>重命名</li>
            <li @click='contextmenuDeleteFn'>删除</li>
        </ul>
        <ul v-show="mainVisible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li @click="createFileFn">新建文件夹</li>
            <li @click="updateFn">刷新</li>
        </ul>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
import Icon from '@components/Icon-svg/index';
import moment from 'moment'
export default {
    components: {
       Icon
	},
    name: '',
    directives: {
	    //注册一个局部的自定义指令 v-focus
	    focus: {
	        // 指令的定义
	        inserted: function (el) {
                // 聚焦元素
                console.log(el);
	            el.querySelector('textarea').focus()
	        }
	    }
	},
    data() {
        return {
            fileList:[],
            visible: false,
            top: 0,
            left: 0,
            mainVisible:false,
            activeItem: {}
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getFileList()
        },
        updateFn(){
            this.getFileList(()=>{
                this.$message({
                    showClose: true,
                    message: '刷新成功',
                    type: 'success'
                });
                return
            })
        },
        getFileList(fn){
            request({
                url:`${this.$ip}/mms-knowledge/folder/list`, 
                method: 'post',
            })
            .then((data) => {
                if(data.code==200){
                    this.fileList = data.data
                    this.fileList = this.fileList.map((item,index)=>{
                        return {
                            index: index,
                            label: item.name,
                            icon: 'wenjianjia',
                            isClickEd: false,
                            id: item.id,
                            fileUpdateTime: item.fileUpdateTime?moment(parseInt(item.fileUpdateTime)).format('YYYY-MM-DD HH:mm:ss'):'',
                            nameEditing:false,
                        }
                    })
                    console.log(this.fileList)
                }else{
                    this.fileList = []
                }
                fn&&fn()
            })
        },
        openMenu(e, item) {
            console.log(e)
            const left = e.clientX// - offsetLeft // 15: margin right
            this.left = left
            this.top = e.clientY// - 60 // fix 位置bug
            this.visible = true
            this.mainVisible = false
            this.activeItem = item
        },
        openMainMenuFn(e){
            const left = e.clientX// - offsetLeft // 15: margin right
            this.left = left
            this.top = e.clientY// - 60 // fix 位置bug
            this.mainVisible = true
            this.visible = false
        },
        closeMenu() {
            this.visible = false
        },
        closeMainMenu() {
            this.mainVisible = false
        },
        showClickFn(e, item){
            console.log("1")
            item.isClickEd = true
            // document.body.addEventListener('click', ()=>{
            //     this.closeOrdersClickFn(item)
            // })
        },
        closeOrdersClickFn(item){
            //this.fileList.forEach(item=>item.isClickEd=false)
            item.isClickEd = false
            // document.body.removeEventListener('click',()=>{
            //     this.closeOrdersClickFn(item)
            // })
        },
        openFile(item){
            if(item.id){
                this.$router.push({path:'/detail',query:{folderId:item.id}});
            }else{
                this.$message({
                    showClose: true,
                    message: '文件夹出现错误',
                    type: 'error'
                });
                return
            }
        },
        createFileFn(){
            this.fileList.push({
                index: this.fileList.length,
                label: '',
                icon: 'wenjianjia',
                isClickEd: false,
                id: null,
                fileUpdateTime:null,
                nameEditing:true
            })
        },
        deleteFileFn(item){
            request({
                url:`${this.$ip}/mms-knowledge/folder/delete/${item.id}`, 
                method: 'delete',
            })
            .then((data) => {
                if(data.code==200){
                    this.$message({
                        showClose: true,
                        message: '删除成功',
                        type: 'success'
                    });
                    this.init()
                }else{
                    // this.$message({
                    //     showClose: true,
                    //     message: '保存文件夹错误'+data.code,
                    //     type: 'error'
                    // });
                }
            })
        },
        fileSaveFn(item){
            request({
                url:`${this.$ip}/mms-knowledge/folder/save`, 
                method: 'post',
                data:{
                    name:item.label
                }
            })
            .then((data) => {
                if(data.code==200){
                    this.$message({
                        showClose: true,
                        message: '保存成功',
                        type: 'success'
                    });
                    this.init()
                    item.nameEditing = false
                }else{
                    this.$message({
                        showClose: true,
                        message: '保存文件夹错误'+data.code,
                        type: 'error'
                    });
                }
            })
        },
        fileUpdateFn(item){
            request({
                url:`${this.$ip}/mms-knowledge/folder/update`, 
                method: 'post',
                data:{
                    name:item.label,
                    id:item.id
                }
            })
            .then((data) => {
                if(data.code==200){
                    this.$message({
                        showClose: true,
                        message: '修改成功',
                        type: 'success'
                    });
                    this.init()
                    item.nameEditing = false
                }else{
                    this.$message({
                        showClose: true,
                        message: '保存文件夹错误'+data.code,
                        type: 'error'
                    });
                }
            })
        },
        async onBlurFn(item){
            if(!item.label){
                this.$message({
                    showClose: true,
                    message: '文件夹名字不能为空',
                    type: 'error'
                })
                this.getFileList()
                return
            }
            let isExist = await this.judgeNameExistsFn(item)
            if(isExist){
                this.$message({
                    showClose: true,
                    message: '该文件名已存在',
                    type: 'error'
                });
                return
            }
            if(item.id){ // 文件价有id表示编辑，
                this.fileUpdateFn(item)
            }else{
                this.fileSaveFn(item)  // 没有id表示新建
            }
            
            
        },
        judgeNameExistsFn(item){
            return new Promise((resolve,reject)=>{
                request({
                    url:`${this.$ip}/mms-knowledge/folder/nameExists`, 
                    method: 'post',
                    data:{
                        name: item.label,
                        id: item.id
                    }
                })
                .then((data) => {
                    if(data.code==200){
                        resolve(data.data) // 为true表示名称已存在
                    }else{
                        this.$message({
                            showClose: true,
                            message: '文件夹判断重名错误'+data.code,
                            type: 'error'
                        });
                    }
                })
            })
        },
        contextmenuOpenFileFn(){
            if(this.activeItem.id){
                this.openFile(this.activeItem)
            }else{
                this.$message({
                    showClose: true,
                    message: '文件夹出现错误',
                    type: 'error'
                });
            }
        },
        contextmenuEditNameFn(){
            if(this.activeItem.id){
                this.activeItem.nameEditing = true
            }else{
                this.$message({
                    showClose: true,
                    message: '文件夹出现错误',
                    type: 'error'
                });
            }
        },
        contextmenuDeleteFn(){
            if(this.activeItem.id){
                this.deleteFileFn(this.activeItem)
            }else{
                this.$message({
                    showClose: true,
                    message: '文件夹出现错误',
                    type: 'error'
                });
            }
        }
    },
    watch: {
        visible(value) {
            console.log(value)
            if (value) {
                document.body.addEventListener('click', this.closeMenu)
                // this.$once('hooks:beforeDestory', () => {
                //     document.body.removeEventListener('click', this.closeMenu)
                // })
            } else {
                console.log("删除contentMenu")
                document.body.removeEventListener('click', this.closeMenu)
            }
        },
        mainVisible(value) {
            if (value) {
                document.body.addEventListener('click', this.closeMainMenu)
                // this.$once('hooks:beforeDestory', () => {
                //     document.body.removeEventListener('click', this.closeMainMenu)
                // })
            } else {
                console.log("删除contentMenu")
                document.body.removeEventListener('click', this.closeMainMenu)
            }
        },
        fileList: {
        　　handler(value) {
                let changeValue = value.find(item=>item.isClickEd)
                console.log("监听次数")
                setTimeout(()=>{
                    if (changeValue) {
                        console.log("监听添加")
                        console.log(changeValue)
                        //document.body.addEventListener('click', this.closeOrdersClickFn)
                        document.body.addEventListener('click', this.closeOrdersClickFn.bind(this, changeValue), true)
                        // this.$once('hooks:beforeDestory', () => {
                        //     document.body.removeEventListener('click', this.closeClickFn)
                        // })
                    } else {
                        console.log("删除orders.isClickEd")
                        console.log(changeValue)
                        document.body.removeEventListener('click', this.closeOrdersClickFn)
                    }
                },0)
        　　},
            deep:true
        },
    },
   
}
</script>
<style scoped lang="scss">
    .index{
        margin-top: 32px;   
        .inner{
            .top_content{
                padding-top: 20px;
                position: relative;
                .header {
                    margin: 0 auto;
                    margin-bottom: 30px;
                    width: 271px;
                    font-family:SourceHanSansCN-Medium,SourceHanSansCN;
                    font-weight:500;
                    color:rgba(34,34,34,1);
                    height:24px;
                    line-height:24px;
                    span{
                        font-size:24px ;
                    }
                }
                .i_main{
                    width:100%;
                    height:700px;
                    display: flex;
                    align-content:flex-start;
                    flex-wrap: wrap;
                    .list{
                        margin-left:30px;
                        width: 160px;
                        height: 160px;
                        position: relative;
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        &.isClickEd{
                            border:1px solid #ccc;
                            background: rgba(0,0,0,0.1);
                        }
                        .time{
                            position: absolute;
                            bottom:-42px;
                            left:50%;
                            width: 300px;
                            background: rgba(255,255,255, 0.9);
                            font-size:14px;
                            border: 1px solid #d9d9d9;
                            line-height: 34px;
                            padding: 4px;
                            border-radius: 4px;
                            z-index: 100;
                        }
                        .icon{
                            .svg-icon{
                                width:136px;
                                height:136px;
                            }
                        }
                        .label{
                            width:136px;
                            line-height: 34px;
                            text-align: center;
                            .text{
                                display: block;
                                width:100%;
                                overflow: hidden;
                                text-overflow: ellipsis;
                                white-space:nowrap;
                            }
                        }
                    }
                }
            }
        }
        .contextmenu{
            list-style:none;
            position: absolute;
            width:300px;
            background: #fff;
            border-radius: 4px;
            margin:0;
            padding:0;
            border: 1px solid #d9d9d9;
            z-index: 110;
            li{
                list-style:none;
                text-indent: 2em;
                width:100%;
                line-height: 44px;
                text-align: left;
                padding:3px;
                border-bottom:1px solid #d9d9d9;
                &:hover{
                    background:#ccc;
                    cursor:pointer;
                }
                &:last-child{
                    border:none;
                }
            }
        }
    }
</style>
