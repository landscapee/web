<template>
<div id="com_time_line">
    <div class="time_container">
        <div class="time_container_box" :style="'transform:translate(-'+translateX+'%,0)'">
            <div class="time_hour flexDC" v-for="(item,idx) in hourList" :key="idx">
                <div class="hour">{{item}}</div>
                <div class="getMinutesBox">
                    <div style="height:.1rem;"></div>
                    <div style="height:.14rem"></div>
                    <div style="height:.1rem;"></div>
                    <div class="border0"></div>
                </div>
            </div>
        </div>
    </div>
    
</div>
</template>
<script>
export default{
	data(){
        return{
            translateX:3.8,
            hourList:[],
            timer:null
        }

    },
    beforeMount(){
        
    },
	mounted () {
        this.getHourList(new Date(new Date()-6*60*60*1000),"control")
	},
	methods:{
        getHourList(startTime,type){
            let startHours = startTime.getHours()
            let startMinute = startTime.getMinutes()
            let endTime = new Date(new Date(startTime).getTime()+26*60*60*1000)

            this.hourList = []
            for(let i=startHours;i<startHours+26;i++){
                this.hourList.push(this.geIndexHour(i))
            }

            this.translateX = startMinute*3.84/60

            this.$emit("getFilghtData",startTime,endTime)


            if(this.timer){
                clearInterval(this.timer)
            }
            if(type=="control"){
                this.timer=setInterval(()=>{
                    this.reloadData()
                },1000*60)
            }
        },

        geIndexHour(idx){
            let result = idx
            if(result>=24){
                result-=24
            }
            if(result<0){
                result+=24
            }
            return result+":00"
        },  
        reloadData(){
            if(this.translateX>=3.84){
                this.getHourList(new Date(new Date()-6*60*60*1000),"control")
            }
            this.translateX=this.translateX+ 0.064
            this.$emit("updateTime")
        },
        
	}
	
}
</script>
<style lang="scss" scoped>
#com_time_line{height: 100%;width: 100%;color:#fff;
    .time_container{height: 100%;width:100%;overflow: hidden;;
        .time_container_box{width:108.4%;}
        .time_hour{border-right: 1px solid #fff;width:3.84%;display: inline-block;word-break:break-all;white-space:nowrap;
            .hour{font-size: 12px;height: 14px;padding-left:4px;}
            .getMinutesBox{height: 16px;display: flex;align-items: flex-end;;
                div{border-right: 1px solid #fff;width: 25%;;}
            }
        
        }
    }
    
}
</style>
