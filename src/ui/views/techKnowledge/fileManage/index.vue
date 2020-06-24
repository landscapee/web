<template>
    <div class='index'>
        <router-view v-if="this.$router.history.current.path == '/detail'" :key="$route.path"></router-view>
        <div class='inner' v-else>
            <div class='top_content'>
                <div class='header'><span>文件管理</span></div>
                <div class='i_main'  @contextmenu.prevent.stop="openMainMenuFn($event)">
                    <div class="list" v-for="item in fileList" :key='item.id' :class='item.isClickEd?"isClickEd":""'  @dblclick="openFile(item)" @click.prevent='showClickFn($event,item)' @contextmenu.prevent.stop="openMenu($event,item)" >
                        <div class='icon'>
                            <icon :iconClass="item.icon" ></icon>
                        </div>
                        <div class='label'>
                            {{item.label}}
                        </div>
                        <div v-show='item.isClickEd&&item.fileUpdateTime' class='time'>修改日期:{{item.fileUpdateTime}}</div>
                    </div>
                </div>
                
            </div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li>打开</li>
            <li>重命名</li>
            <li>删除</li>
        </ul>
        <ul v-show="mainVisible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li>新建文件夹</li>
            <li>刷新</li>
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
    data() {
        return {
            fileList:[
                // {
                //     id:1,
                //     label: '工单',
                //     icon: 'wenjianjia',
                //     isClickEd:false
                // },
                // {
                //     id:2,
                //     label: '其他',
                //     icon: 'wenjianjia',
                //     isClickEd:false
                // }
            ],
            visible: false,
            top: 0,
            left: 0,
            mainVisible:false
        }
    },
    mounted(){
        this.init()
    },
    methods:{
        init(){
            this.getFileList()
        },
        getFileList(){
            request({
                url:`${this.$ip}/mms-knowledge/folder/list`, 
                method: 'post',
            })
            .then((data) => {
                if(data.code==200){
                    this.fileList = data.data
                    this.fileList = this.fileList.map((item,index)=>{
                        return {
                            label: item.name,
                            icon: 'wenjianjia',
                            isClickEd: false,
                            id: index+1,
                            fileUpdateTime: item.fileUpdateTime?moment(parseInt(item.fileUpdateTime)).format('YYYY-MM-DD HH:mm:ss'):'',
                            clickFn:(item)=>{
                                item.isClickEd = true
                            }
                        }
                    })
                    console.log(this.fileList)
                }else{
                    this.fileList = []
                }
            })
        },
        openMenu(e) {
            console.log(e)
            const left = e.clientX// - offsetLeft // 15: margin right
            this.left = left
            this.top = e.clientY// - 60 // fix 位置bug
            this.visible = true
            this.mainVisible = false
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
            console.log("remove")
            console.log(item)
            //this.fileList.forEach(item=>item.isClickEd=false)
            item.isClickEd = false
            // document.body.removeEventListener('click',()=>{
            //     this.closeOrdersClickFn(item)
            // })
        },
        openFile(item){
            this.$router.push({path:'/detail',query:{type:item.id}});
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
                            background: rgba(255,255,255, 0.44);
                            font-size:12px;
                            border: 1px solid #d9d9d9;
                            line-height: 34px;
                            padding: 4px;
                            border-radius: 4px;
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
