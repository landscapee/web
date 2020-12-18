<template>
    <div :class="type=='info'?'info':'cursor1'">
        <div v-if="item.notApplicable " >
            <img :src="na" v-if="isActive('na')" alt="" @click="changeActiveFn('na',true,'na')" style="width:34px">
            <img :src="na_active" v-else @click="changeActiveFn('na_active',false,'na')" alt="" style="width:34px">
        </div>
        <div v-if="item.cycle ">
            <img :src="quan" v-if="isActive('cycle') " alt="" @click="changeActiveFn('quan',true,'cycle')"
                 style="width:34px">
            <img :src="quan_active" v-else alt="" @click="changeActiveFn('quan_active',false,'cycle')"
                 style="width:34px">
        </div>
        <div v-if="item.hook ">
            <img :src="gou" v-if="isActive('gou')" alt="" @click="changeActiveFn('gou',true,'gou')" style="width:34px">
            <img :src="gou_active" v-else alt="" @click="changeActiveFn('gou_active',false,'gou')" style="width:34px">
        </div>

    </div>
</template>

<script>

    import quan from '../../assets/img/quanUncheck.svg'
    import quan_active from '../../assets/img/quanCheck.svg'

    import gou from '../../assets/img/gou.svg'
    import gou_active from '../../assets/img/gou_active.svg'
    import na from '../../assets/img/na.svg'
    import na_active from '../../assets/img/na_active.svg'

    export default {
        props: {
            width: {
                type: String,
                default: "34"
            },
            item: {
                type: Object,
                default: {}
            },
            newMap: {
                type: Array,
            },
            type: {
                type: String,
            },
            serialNumber: {
                type: String,
            }
        },
        data() {
            return {
                quan_active,
                quan,
                gou,
                gou_active,
                na,
                na_active
            }
        },
        computed: {
            isActive() {
                return (s) => {
                    let b = this.newMap.some((k, l) => {
                        return k.key == s + '_' + this.serialNumber && k.value === 'true'
                    })
                    return !b
                }
            }
        },
        methods: {
            changeActiveFn(s, v, kn) {
                if (this.type == 'info') {
                    return false
                }
                this.$emit('changeActiveFn', {name: s, value: v, key: kn})
            }
        },
        created() {
         }


    };
</script>

<style scoped lang="scss">
    .cursor1:hover {
        cursor: pointer;
    }
</style>
