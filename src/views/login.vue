<template>
    <div id="login">
        <div class="login_container">
            <div class="project_title">天府机场GHMS管理系统</div>
            <div class="logo_box">

            </div>
            <div class="form_container">
                <div class="form_box">
                    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                        <el-form-item prop="username">
                            <el-input type="text" placeholder="请输入用户名" v-model="ruleForm.username" autocomplete="off">
                                <i slot="prefix" class="el-icon-user"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" placeholder="请输入密码" @keyup.enter.native="login('ruleForm')" v-model="ruleForm.password" autocomplete="off">
                                <i slot="prefix" class="el-icon-lock"></i>
                            </el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="login('ruleForm')">
                                登 录 <i class="el-icon-right"></i>
                            </el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        var validateUsername = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入用户名'));
            } else {
                callback();
            }
        };
        var validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                callback();
            }
        };
        return {
            ruleForm: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    { validator: validateUsername, trigger: 'blur' }
                ],
                password: [
                    { validator: validatePassword, trigger: 'blur' }
                ],
            }
        }
    },
    beforeMount () {
        
    },
    mounted(){
        
    },
    methods: {
        login(formName){
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    
                    this.$axios.post("http://173.100.1.30/fpms/sso/login/login",{
                        username:this.ruleForm.username,
                        password:this.ruleForm.password
                    })
                    .then((res)=>{
                        if(res.responseCode==1000&&res.data){//登录成功
                            this.$store.commit("setUserMsg",res.data)
                            sessionStorage.setItem("token",res.data.token)
                            this.$router.push("/flight_monitor")
                        }
                    })
                } else {
                    this.$alert('请检查用户名和密码是否按要求填写', '提示', {
                        type: 'error',
                        center: true
                    })
                    return false;
                }
            });

            

        }
    },
}
</script>
<style lang="scss" scoped>
#login{width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;background:url("../assets/img/login_bg.png");background-size: 100% 100%;background-repeat: no-repeat;;
    .login_container{width:920px;height:500px;border-radius: 10px 0 10px 10px;position: relative;;display: flex;background: url("../assets/img/login_box_bg.png");background-size: 100% 100%;background-repeat: no-repeat;
        .project_title{width:294px;height:68px;position: absolute;top:-34px;right:6px;color:#fff;font-size: 18px;line-height:68px;text-align: center;background:"../assets/img/project_bg.png";background-size: 100% 100%;background-repeat: no-repeat;}
        .logo_box{width:50% }
        .form_container{width:50%;display: flex;justify-content: center;align-items: center;;
            .form_box{width: 280px;}
        }
    }
}
</style>
<style lang="scss">
#login{
    .el-form-item__content{
        .el-button{width: 100%;margin-top:20px;background:linear-gradient(90deg,#0ACFFE 0%,#495AFF 100%);}
    }
}
</style>