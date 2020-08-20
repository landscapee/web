<template>
    <div class="flex" @click="changeActiveFn">
        <img :src="na" alt="" :style="{'display':active?'block':'none' ,'width':width+'px'}">
        <img :src="gou_active" alt="" :style="{'display':active?'block':'none' ,'width':width+'px'}">
        <img :src="na_active" alt="" :style="{'display':!active?'block':'none' ,'width':width+'px'}">
        <img :src="gou" alt="" :style="{'display':!active?'block':'none' ,'width':width+'px'}">
    </div>
</template>

<script>
import gou from '@/assets/img/gou.svg'
import gou_active from '@/assets/img/gou_active.svg'
import na from '@/assets/img/na.svg'
import na_active from '@/assets/img/na_active.svg'
export default {
    props:{
        width:{
            type: String,
            default:"34"
        },
        active:{
            type: Boolean,
            default:false
        }
    },
	data() {
		return {
            gou,
            gou_active,
            na,
            na_active
		}
	},
	methods: {
        changeActiveFn(){
            this.$emit('changeActiveFn')
        }
    }

	
};
</script>

<style scoped lang="less">

</style>
