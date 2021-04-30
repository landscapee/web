<template>
    <div class="wscn-http404-container">
        <div class="content">
            <img :src="newimg404" alt="">
            <div>您暂无访问权限！<span>请联系管理员</span></div>
            <div @click="fanhui">返回上一级</div>
        </div>
    </div>
</template>

<script>
    import newimg404 from './assets/img/new404.png'

    export default {
        name: 'Page404',
        data() {
            return {

                newimg404
            }
        },

        methods: {
            fanhui() {
                this.$router.go(-1)
            }
        },
    };
</script>

<style lang="scss" scoped>
    .wscn-http404-container {
        position: relative;
        height:calc(100% - 40px);
        .content{
            transform: translate(-50%, -50%);
            position: absolute;
            top: 40%;
            left: 50%;
            display: flex;
            flex-direction: column;
             align-items: center;
            img{
                width:365px;
            }
            &>div:nth-child(2){
                font-family: AlibabaPuHuiTiR;
                margin:32px;
                font-size: 18px;
                span{
                    font-size: 18px;
                    color:#4181e9;
                }
            }
            &>div:nth-child(3){
                cursor: pointer;
                padding: 9px 42px;
                font-size: 18px;
                color:#4181e9;
                border: 1px solid #4181e9;
                border-radius: 22px;
                width: 178px;
                /*height: 42px;*/
            }
        }

    }


</style>
