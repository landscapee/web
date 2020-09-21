<template>
    <div class='index'>
        <div class='inner'>
            <div class='top_content'>
                <div class='header'><span>文件管理</span></div>
                <div class='i_main'>
                    <div class="list" v-for="item in fileList" :key='item.id' :class='item.isClickEd?"isClickEd":""' @click.prevent='showClickFn($event,item)' @contextmenu.prevent="openMenu($event,item)" >
                        <div class='icon'>
                            <icon :iconClass="item.icon" ></icon>
                        </div>
                        <div class='label'>
                            {{item.label}}
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
            fileList:[
                {
                    id:1,
                    label: '工单',
                    icon: 'wenjianjia',
                    isClickEd:false
                },
                {
                    id:2,
                    label: '其他',
                    icon: 'wenjianjia',
                    isClickEd:false
                }
            ],
            visible: false,
            top: 0,
            left: 0,
            isClickEd: false,
        };
    },
    methods:{
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
            this.isClickEd = true
        },
        closeClickFn(){
            console.log("remove")
            this.isClickEd = false
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
        isClickEd(value){
            console.log(value)
            setTimeout(()=>{
                if (value) {
                    document.body.addEventListener('click', this.closeClickFn)
                    // this.$once('hooks:beforeDestory', () => {
                    //     document.body.removeEventListener('click', this.closeClickFn)
                    // })
                } else {
                    console.log("删除click")
                    document.body.removeEventListener('click', this.closeClickFn)
                    this.fileList.forEach(item=>item.isClickEd=false)
                }
            },0)
        }
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
