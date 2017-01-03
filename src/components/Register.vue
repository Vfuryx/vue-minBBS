<template>
    <div class="content register">
        <section class="register-from">
            <form   name="myform"  >
                <table>
                    <tr>
                        <td><label for="user" >用户名:</label></td>
                        <td><input class="register-input-text" id="user" type="text" name="user" @blur="checkUseName"></td>
                        <span id="checkuser" class="checkuser"></span>
                    </tr>
                    <tr>
                        <td><label  for="passw1">密码:</label></td>
                        <td><input class="register-input-text" id="passw1" type="password" name="passw"></td>
                    <tr>
                        <td><label  for="passw2">密码:</label></td>
                        <td><input class="register-input-text" id="passw2" type="password" name="passw"></td>
                    </tr>
                    <tr>
                        <td><label  for="email">e-mail:</label></td>
                        <td><input class="register-input-text" id="email" type="email" name="email"></td>
                    </tr>
                    <tr>
                        <td><label  for="tele">Tele:</label></td>
                        <td><input class="register-input-text" id="tele" type="text" name="tele"></td>
                    </tr>
                    <tr>
                        <td><label  for="intro">介绍:</label></td>
                        <td><input class="register-input-text" id="intro" type="text" name="intro"></td>
                    </tr>
                </table>
                <input class="submit" type="submit" name="submit" value="注册" @click.prevent="checken()">
            </form>
        </section>
    </div>
</template>
<style>
@import '../css/register.css'
</style>
<script>
import Axios from 'axios'
export default{
  data(){
      return{
      }
  },
  methods: {
    checken() {
  	  if (myform.user.value==""||myform.passw1.value==""||myform.passw2.value==""||myform.email.value=="") {
  	  	alert("输入错误");
  	  	return false;
  	  }else if(!(myform.passw1.value == myform.passw2.value)) {
  	  	alert("密码不一样");
  	  	return false;
  	  }

  	  let user = myform.user.value

      let passw = myform.passw1.value

      let email = myform.email.value

      let tele = myform.tele.value

      let intro = myform.intro.value


  	  Axios.post('index.php?c=Register&p=front&a=signin',{
		user: user ,
		passw: passw ,
		email: email,
		tele: tele,
		intro: intro
  	  }).then((response) => {
  	       if(response.data){
  	         alert('注册成功')
  	         myform.user.value = ''
             myform.tele.value = ''
             myform.email.value = ''
             myform.tele.value = ''
             myform.passw1.value =''
             myform.passw2.value =''
             myform.intro.value = ''
             this.$router.replace({ path: '/login' })
  	       }else{
  	         alert('注册失败')
  	       }
		})
    },
    checkUseName() {
      if (!myform.user.value=="") {
			var username = myform.user.value;
			Axios.get("index.php",{
				params: {
					c: "Register" ,
					p: "front" ,
					a: "checkUseName",
					usename: username
				}
			}).then(function (response) {
				if(response.data=='用户名未注册'){
					document.getElementById("checkuser").innerHTML = response.data;
					document.getElementById("checkuser").style.color= "#B021E9";
				}else {
					document.getElementById("checkuser").innerHTML = response.data;
					document.getElementById("checkuser").style.color= "#ff881f";
				}

			});
		}else {
			document.getElementById("checkuser").innerHTML = "";
		}
    }
  },
  components:{

  }
}
</script>
