<template>
    <div id="filghtTrend">
        <com-glob-head :path="'flight_dynamics'"></com-glob-head>
        <div class="iframe_box">
            <iframe id="trendIframe" src="http://173.100.1.137/flightList/index.html#/flight" frameborder="0"></iframe>

        </div>
    </div>
</template>
<script>

export default {
    data(){
        return {
            
        }
    },
    components: {
		"com-glob-head":r =>require.ensure([], () => r(require('../components/com-glob-head')),"com-globHead"),
    },
    mounted(){
        
        
    },
    methods: {
    },
}
</script>
<style lang="scss" scoped>
#filghtTrend{height: 100%;width:100%;
    .iframe_box{height:calc(100% - 40px);width:100%;
        #trendIframe{height: 100%;width:100%;}
    }
}
</style>