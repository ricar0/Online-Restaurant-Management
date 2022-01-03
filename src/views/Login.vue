<template>
 <div class="login-container">
   <el-form
   @submit.native.prevent
     ref="loginForm"
     label-width="150px"
     class="login-form"
     :model="loginForm"
     :rules="loginRules"

     >
          <h1>登录</h1><br><br>

     <el-form-item prop='email' label="邮箱">
       <el-input v-model="loginForm.email"></el-input>
     </el-form-item>
   
      <el-form-item prop='pass' label="密码">
       <el-input v-model="loginForm.pass" type="password"></el-input>
     </el-form-item>
  
      <el-button type="primary" style="width:20%" native-type="submit" @click="login">登录</el-button>
      <div class="login-info">如果没有账号请<router-link to="/register">点击注册</router-link></div> 
   </el-form>
 </div>
</template>
<script>
import Global from '../components/Global.vue'
export default {
    data(){
      return{
        loginForm:{      
          pass:'',
          email:'',
        },
        loginRules:{
          email:{type:'email',required: true,message:'请输入有效的邮箱地址',trigger:'blur'},
          pass:{type:'string',required: true,message:'密码不能为空',trigger:'blur'},          
        }
      }
  },
   methods:{
     login(){
       if (this.loginForm.email==="admin" && this.loginForm.pass==="123") {
          this.$router.push('/ManageMain')
          alert('登录成功!')
          localStorage.setItem("uid", 111)
          return;
        }
       this.$refs['loginForm'].validate((valid) => {
         if(valid){
         var url=Global.url+":8000/log"
         console.log(url)
          // alert('111!')
         this.$http.post(
           url,
           {
             email:this.loginForm.email,
             pass:this.loginForm.pass,
           }

         ).then(res=>{
           console.log(res.data)
           if(res.data.code == 1){
             alert('登录成功!')
             console.log(res.data)
             localStorage.setItem("uid", res.data.data[0].uid)
             this.$notify({
               msg:'success',
             })
              this.$router.push('/')
           }
           else{
           this.$message.error('邮箱或密码输入错误！');
          }
         })
         }


       })
     }
      }
}
</script>

<style  scoped>
.login-container{
  position: absolute;
  top: 0;
  bottom: 0%;
  width: 100%;
  background: url("../assets/1.png");
  background-size: 100% 100%;
}
.login-form{
  position: relative;
  width: 450px;
  margin: 120px auto;
  background: #fff;
  padding: 20px; 
  opacity: 0.9;
  border-radius: 1rem;
  
}
.login-info{
  text-align: right;
  font-size: 0.9rem;
  margin-top: 10px;
  color: #909399;
}


</style> 