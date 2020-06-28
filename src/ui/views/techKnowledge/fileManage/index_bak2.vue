<template>
    <div class='index'>
        <router-view v-if="this.$router.history.current.path == '/detail'" :key="$route.path"></router-view>
        <div class='inner' v-else>
            <div class='top_content'>
                <div class='header'><span>文件管理</span></div>
                <div class='i_main'>
                    <div class="list" :class='orders.isClickEd?"isClickEd":""' @dblclick="openFile(orders)" @click.prevent='showClickFn($event,orders)' @contextmenu.prevent="openMenu($event,orders)" >
                        <div class='icon'>
                            <icon :iconClass="orders.icon" ></icon>
                        </div>
                        <div class='label'>
                            {{orders.label}}
                        </div>
                    </div>
                     <div class="list" :class='others.isClickEd?"isClickEd":""' @dblclick="openFile(orders)" @click.prevent='showClickFn($event,others)' @contextmenu.prevent="openMenu($event,others)" >
                        <div class='icon'>
                            <icon :iconClass="others.icon" ></icon>
                        </div>
                        <div class='label'>
                            {{others.label}}
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ul v-show="visible" :style="{left:left+'px',top:top+'px'}" class="contextmenu">
            <li>打开</li>
            <li>重命名</li>
            <li>删除</li>
        </ul>
    </div>
</template>
<script>
import request from '@lib/axios.js';
import {  extend ,map} from 'lodash';
import Icon from '@components/Icon-svg/index';
export default {
    components: {
       Icon
	},
    name: '',
    data() {
        return {
            orders:{
                id:1,
                label: '工单',
                icon: 'wenjianjia',
                isClickEd:false
            },
            others:{
                id:2,
                label: '其他',
                icon: 'wenjianjia',
                isClickEd:false
            },
            visible: false,
            top: 0,
            left: 0,
            isClickEd: false,
        };
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
                console.log(data)
                // this.$message({type: 'success',message: '删除成功'});
                // this.getList();
            })
        },
        openMenu(e) {
            console.log(e)
            const left = e.clientX// - offsetLeft // 15: margin right
            this.left = left
            this.top = e.clientY// - 60 // fix 位置bug
            this.visible = true
        },
        closeMenu() {
            this.visible = false
        },
        showClickFn(e, item){
            console.log("1")
            item.isClickEd = true
        },
        closeOrdersClickFn(){
            console.log("remove")
            this.orders.isClickEd = false
        },
        closeOthersClickFn(){
            console.log("remove")
            this.others.isClickEd = false
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
        'orders.isClickEd': {
        　　handler(value) {
                setTimeout(()=>{
                    if (value) {
                        document.body.addEventListener('click', this.closeOrdersClickFn)
                        // this.$once('hooks:beforeDestory', () => {
                        //     document.body.removeEventListener('click', this.closeClickFn)
                        // })
                    } else {
                        console.log("删除orders.isClickEd")
                        document.body.removeEventListener('click', this.closeOrdersClickFn)
                    }
                },0)
        　　}
        },
        'others.isClickEd': {
        　　handler(value) {
                console.log(value)
        　　    setTimeout(()=>{
                    if (value) {
                        document.body.addEventListener('click', this.closeOthersClickFn)
                        // this.$once('hooks:beforeDestory', () => {
                        //     document.body.removeEventListener('click', this.closeClickFn)
                        // })
                    } else {
                        console.log("删除others.isClickEd")
                        document.body.removeEventListener('click', this.closeOthersClickFn)
                    }
                },0)
        　　}
        },
        // fileList(value){
        //     console.log(value)
            
        //     setTimeout(()=>{
        //         if (value) {
        //             document.body.addEventListener('click', this.closeClickFn)
        //             // this.$once('hooks:beforeDestory', () => {
        //             //     document.body.removeEventListener('click', this.closeClickFn)
        //             // })
        //         } else {
        //             console.log("删除click")
        //             document.body.removeEventListener('click', this.closeClickFn)
        //         }
        //     },0)
        // }
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
                    overflow: hidden;
                    display: flex;
                    .list{
                        margin-left:30px;
                        width: 160px;
                        height: 160px;
                      
                        display:flex;
                        flex-direction: column;
                        justify-content: center;
                        align-items: center;
                        &.isClickEd{
                            border:1px solid #ccc;
                            background: rgba(0,0,0,0.1);
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
