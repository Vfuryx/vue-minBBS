<template>
    <div class="content ">
        <form class="con-login-mess clearfix" name="myform" >
            <div class="clearfix">
                <label for="user" >用户名:</label>
                <input id="user" type="text" name="user" >
            </div>
            <div class="clearfix">
                <label for="passw">密码:</label>
                <input id="passw" type="password" name="passw">
            </div>
            <a class="forgot" href="#">忘记密码？</a>
            <input class="submit" type="submit" @click.prevent="login()"  value="登录">
            <!--<input type="button" @click.prevent="yes()"  value="yes">-->
        </form>
    </div>
</template>
<style>
@import '../css/login.css';
</style>
<script>
import Axios from 'axios'
import {mapActions} from 'vuex'
export default{
  data(){
    return{
    }
  },
  methods: {
    ...mapActions(['getlu']),
    login () {
      if (myform.user.value==""||myform.passw.value=="") {
			alert("用户或码不能为空");
			return false;
	  }else{
	    let user = myform.user.value
	    let passw = myform.passw.value

	    Axios.post(
	    'index.php?c=Login&p=front&a=signin',{
	    user: myform.user.value,
	    passw: myform.passw.value
	    }).then((response) => {
	         if(response.data){
	           this.getlu(user)
  	           //alert('登录成功')
  	           this.$router.replace({ path: '/home' })
  	         }else{
  	           alert('登录失败')
  	         }
	    })
	  }
    }
  },
  components:{
  }

}
</script>
