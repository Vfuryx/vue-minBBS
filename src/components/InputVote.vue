<template>
    <div>
        <article class='con-module' >
            <img  class='post-user-pic' src='http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg' alt=''>
            <h3 class='post-user-name'>{{loginUser}}</h3>
            <form name="myform">
                <table class="register-from inputauto">
                    <tr>
                        <td><label for="title">标题:</label></td>
                        <td><input class="register-input-text" id='title' type="text" value="" name="title" ></td>
                    </tr>
                
                    <tr>
                        <td> <label for="vote_option1">选项一:</label></td>
                        <td><input class="register-input-text" id='vote_option1' type="text" value="" name="vote_option1" > </td>
                    </tr>
                
                    <tr>
                        <td><label for="vote_option2">选项二:</label></td>
                        <td><input class="register-input-text" id='vote_option2' type="text" value="" name="vote_option2" ></td>
                    </tr>
                
                    <tr>
                        <td><label for="vote_option3">选项三:</label></td>
                        <td><input class="register-input-text" id='vote_option3' type="text" value="" name="vote_option3" ></td>
                    </tr>
                    <tr>
                        <td><label for="vote_option4">选项四:</label></td>
                        <td><input class="register-input-text" id='vote_option4' type="text" value="" name="vote_option4" ></td>
                    </tr>
                    <tr>
                        <td><label for="vote_option5">时间:</label></td>
                        <td><input  id='vote_option5' type="datetime-local" value="" name="vote_option5" ></td>
                    </tr>
                </table>
                <input @click.prevent="checken" class="inputvote_sub" type="submit" value="提交" >
            </form>
        </article>
    </div>
</template>
<script>
import {mapState,mapActions} from 'vuex'
export default{
  data () {
    return{
        //isModule:0
    }
  },
  created () {
      this.gettr(1)
      this.getcp(1)
  },
  methods: {
      ...mapActions(['inputVote','gettr','getcp']),
      checken () {
        let title = myform.title.value
        let vote_option1 = myform.vote_option1.value
        let vote_option2 = myform.vote_option2.value
        let vote_option3 = myform.vote_option3.value
        let vote_option4 = myform.vote_option4.value
        let vote_option5 = myform.vote_option5.value
        if(title==''||vote_option1==''||vote_option2==''||vote_option3==''||vote_option4==''||vote_option5==''){
            alert('输入错误')
            return false
        }
        if(this.inputVote({title: title , vote_option1: vote_option1, vote_option2: vote_option2, vote_option3: vote_option3, vote_option4: vote_option4, vote_option5: vote_option5})){
             myform.title.value = ""
             myform.vote_option1.value = ""
             myform.vote_option2.value = ""
             myform.vote_option3.value = ""
             myform.vote_option4.value = ""
             myform.vote_option5.value = ""
             this.$router.replace({ path: '/vote/votelist' })
        }
        
      }
  },
  computed: {
     ...mapState(['loginUser'])
   },
     
  components: {
  }
}
</script>

<style>
.inputauto{
    margin: 0 auto;
}
.inputauto tr td{
   padding:10px 0; 
}

.inputvote_sub{
    background: #ffabab none repeat scroll 0 0;
    border: 0 none;
    border-radius: 5px;
    color: #fff;
    display: block;
    font-size: 25px;
    font-weight: 700;
    line-height: 1.5;
    margin: 15px auto;
    padding: 5px 5px 8px;
    text-align: center;
    width: 60%;
}

</style>