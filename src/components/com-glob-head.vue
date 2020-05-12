<template>
<div id="com_glob_head"> 
    <div class="logo_left">
		<img src="" alt="">
		<span class="sansB">地服生产保障系统</span>
	</div>
	<ul class="nav_middle">
		<li v-for="(item,idx) in navList" :key="idx" :class="navFlag==idx?'active':''" @click="navHandle(item.code)">
			<div>
				<icon-svg :iconClass="item.icon" iconColor="#fff"/>
				<span class="sansN">{{item.name}}</span>
			</div>
		</li>
	</ul>
	<div class="user_right">
		<div>
			<i class="el-icon-date" style="color:#fff;"></i>
			<span class="oneR">{{date.date}}</span>
		</div>
		<div>
			<i class="el-icon-time" style="color:#fff;"></i>
			<span class="oneR">{{date.time}}</span>
		</div>
		<div>
			<i class="el-icon-user-solid" style="color:#fff;"></i>
			<span class="sansM">{{this.userData&&this.userData.name?this.userData.name:''}}</span>
		</div>
		<!-- <div class="setBox" title="设置">  
			<com-set></com-set>
		</div> -->
		<div class="logoutBox" title="退出" @click="$router.push('/')">
			<i class="el-icon-switch-button" style="color:#fff;"></i>
		</div>
	</div>


</div>
</template>
<script>
export default{
	data(){
		return {
			navList:[
				// {name:'航班监控',icon:'fenxi'},
				// {name:'航班动态',icon:'fenxi'},
				// {name:'作业保障监控',icon:'fenxi'},
				
			],
			navFlag:0,
			date:{
				time:null,
				date:null
			},
			userData:{}
		}
	},
	props: ["path"],
	components: {
		// "com-set":r =>require.ensure([], () => r(require('../components/com-set')),"com-set"),
	},
	beforeMounte(){
		
	},
	mounted () {
		
		this.getTime()
		
		this.userData = this.$store.getters.getUserMsg || {}
		this.getNavList()
	},
	methods:{
		getNavList(){
			let menus = this.userData.menus || []
			menus.map(list=>{
				if(list.code=="flight_monitor"){//航班监控
					list.icon = 'fenxi'
					this.navList.push(list)
				}
				if(list.code=="support_monitor"){//作业保障监控
					list.icon = 'fenxi'
					this.navList.push(list)
				}
				if(list.code=="flight_dynamics"){//航班动态
					list.icon = 'fenxi'
					this.navList.push(list)
				}

			})
			this.setNavFlag()
		},
		setNavFlag(){
			this.navList.forEach((list,index)=>{
				if(list.code==this.path){
					this.navFlag = index
				}	
			})
		},
		navHandle(path){
			this.$router.push("/"+path)
		},
        getTime(){
			setInterval(()=>{
				let nowDate = new Date()
				let year = nowDate.getFullYear()
				let month = (nowDate.getMonth()+1).toString().length>1?(nowDate.getMonth()+1):'0'+(nowDate.getMonth()+1)
				let day = nowDate.getDate().toString().length>1?nowDate.getDate():'0'+nowDate.getDate()
				let hours = nowDate.getHours().toString().length>1?nowDate.getHours():'0'+nowDate.getHours()
				let minutes = nowDate.getMinutes().toString().length>1?nowDate.getMinutes():'0'+nowDate.getMinutes()
				let seconds = nowDate.getSeconds().toString().length>1?nowDate.getSeconds():'0'+nowDate.getSeconds()
				var date = year +'-'+ month +'-'+ day
				var time = hours +':'+ minutes +':'+ seconds
				this.date={
					time:time,
					date:date
				}
			},1000)
		}
	}
}
</script>

<style lang="scss" scoped>
#com_glob_head{height: 40px;width: 100%;background:linear-gradient(90deg,rgba(23,40,63,1) 0%,rgba(1,114,207,1) 100%);display: flex;align-items: center;justify-content: space-between;;
	.logo_left{width: 260px;height: 40px;;display: flex;justify-content:space-around;align-items: center;background:linear-gradient(270deg,rgba(46,103,246,1) 0%,rgba(0,75,205,0.35) 100%);box-shadow:0px 0px 6px 0px rgba(47,61,142,1);border-radius:0px 100px 100px 0px;color: #fff;
		span{font-size: 18px;}
	}
	.nav_middle{display: flex;align-items: center;margin-left: 22px;flex: 1;;
		li{display: flex;justify-content: center;align-items: center;height: 40px;cursor: pointer;;

			div{height: 20px;width: 100%;padding: 0 20px;;border-left: 1px solid rgba(255,255,255,.3);display: flex;justify-content: center;align-items: center;
				
				span{font-size: 16px;color: #fff;margin-left:8px;	}
			}
		}
		li.active{background:linear-gradient(180deg,rgba(0,0,0,0) 0%,rgba(61,132,255,1) 100%);

		}
	}
	.user_right{display: flex;align-items: center;
		&>div{margin-left:20px ;height: 40px;display: flex;justify-content: center;align-items: center;;
			span{color:#fff;font-size:16px;margin-left:5px;}
		}
		.logoutBox,.setBox{width:40px;height:40px;background:rgba(14,52,113,1);opacity:0.6;cursor: pointer;
			
		}
		.logoutBox{margin-left:10px;border-left: 1px solid rgba(255,255,255,.3);}
	}
}
</style>
