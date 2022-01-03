<template>
 <div class="register-container">
   <el-form
   @submit.native.prevent
     ref="registerForm"
     label-width="150px"
     class="register-form"
     :model="registerForm"
     :rules="registerRules" >
     <h1>注册</h1><br><br>
     <el-form-item prop='email' label="邮箱">
       <el-input v-model="registerForm.email"></el-input>
              <el-button @click="sendEmail" style="height:35px; margin-top:10px;">获取验证码</el-button>

     </el-form-item>
     <el-form-item prop='tmp' label="验证码">
       <el-input v-model="registerForm.tmp"></el-input>
     </el-form-item>
      <el-form-item prop='pass' label="密码">
       <el-input v-model="registerForm.pass" type="password"></el-input>
     </el-form-item>
      <el-form-item prop='comparePassword' label="确认密码">
       <el-input v-model="registerForm.comparePassword" type="password"></el-input>
     </el-form-item>
      <el-button type="primary" style="width:20%;" native-type="submit" @click="register">注册</el-button>
      <div class="register-info">如果已注册账号请<router-link to="/login">点击登录</router-link></div>
   </el-form>


 </div>
</template>


<script>
import Global from '../components/Global.vue'
export default {
    data(){
      return{
        registerForm:{
          pass:'',
          comparePassword:'',
          email:'',
          tmp:'',
          

        },
        registerRules:{
          email:{type:'email',required: true,message:'请输入有效的邮箱地址',trigger:'blur'},
          pass:{type:'string',required: true,message:'密码不能为空',trigger:'blur'},
          tmp:{type:'string',required: true,message:'验证码不能为空',trigger:'blur'
          },
          comparePassword:{type:'string',required: true,trigger:'blur',
          validator:function(rule,value,callback){
            if(value ==""){callback(new Error('请再次输入密码'))}
            else if(value !=this.registerForm.pass){
              callback(new Error('两次密码输入不一致'))
    
            }else{
              callback()
            }
          }.bind(this)
          }

        }


      }


  },
   methods:{
     sendEmail(){
            //var url1='101.35.202.198:8000/sentEmail/{email}';

           var url1=Global.url+":8000/sentEmail/"+this.registerForm.email;
        console.log(this.registerForm.email)
        this.$http.get(
           url1
         
          ).then(res=>{
            if (res.data.code === 1) {
              this.$notify({
                title: '提示',
                message: '邮箱发送成功',
                offset: 100,
                type: "success"
              })
            }
          })


      

     },
     register(){
       this.$refs['registerForm'].validate((valid) => {
         console.log(valid)
         if(valid){
           //var url='101.35.202.198:8000/reg';
         var url2=Global.url+":8000/reg";
          console.log(url2)
         this.$http.post(
           url2,
           {
             email:this.registerForm.email,
             pass:this.registerForm.pass,
             tmp:this.registerForm.tmp,
           }

         ).then(res=>{
           console.log(res)
           if(res.data.code === 1){
             alert('注册成功!')
             this.$notify({
                msg:'success',

             })
             this.$router.push('/Login')
           }

         })
         }


       })
     }

      }
}
</script>

<style  scoped>
.register-container{
  position: absolute;
  top: 0;
  bottom: 0%;
  width: 100%;
  background: url("../assets/1.png");
  background-size: 100% 100%;
  }
.register-form{
  position: relative;
  width: 450px;
  margin: 120px auto;
  background: #fff;
  padding: 20px; 
  opacity: 0.9;
  border-radius: 1rem;
  box-shadow: 10px 10px 5px #888888;

}
.register-info{
  text-align: right;
  font-size: 0.9rem;
  margin-top: 10px;
  color: #909399;
}


</style> 