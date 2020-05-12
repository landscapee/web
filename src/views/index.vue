<template>
    <div>
        <com-glob-head :path="'/index'"></com-glob-head>
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

</style>