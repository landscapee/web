<template>
<div id="com_getlist"> 
    <slot v-bind="list"></slot>
</div>
</template>
<script>
export default{
	data(){
		return {
            list:{}
		}
	},
	props: ["lists","name","value"],
	mounted () {
		if(this.lists&&this.lists.length>0){
			this.list = _.find(this.lists, { 'processCode': this.name})||{}
		}
	},
	methods:{
        
	}
}
</script>

<style lang="scss" scoped>
#com_getlist{width: 100%;height: 100%;}
</style>
