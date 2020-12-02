<template>
    <div class="buttonList">
        <el-button @click="giveData(opt)" :type="selectButton==opt.id?'primary':''" v-for="(opt,index) in buttonList" :key="index"> {{opt.name}}</el-button>
    </div>
</template>

<script>
    export default {
        name: "buttonList",
        components: {},
        props:{
          buttonList:{
              type:Array,
              default:[]
          }
        },
        data() {
            return {
                selectButton:this.buttonList.length&&this.buttonList[0].id,
            }
        },
        methods: {
            giveData(obj){
                this.selectButton=obj.id
                this.$emit('getButton',obj)
            },
        },
        created() {

        },
    }
</script>

<style lang="scss" scoped>
.buttonList{

    margin: 15px 0 ;
}
</style>