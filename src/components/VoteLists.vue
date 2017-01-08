<template>
  <div class=" vote-list">
    <article class='con-module '>
      <img class='post-user-pic' src='http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg' alt=''>
      <h3 class='post-user-name'>{{lists.originater}}</h3>
      <form :name="myfrom">
        <h2 class="votelist_title">{{lists.title}}</h2>
        <table>
          <tr>
            <td><input id='vote_option1' type="radio" value="1" name="vote_option"></td>
            <td><label for="vote_option1">{{lists.item1_name}}</label></td>
          </tr>
          <tr>
            <td><input id='vote_option2' type="radio" value="2" name="vote_option"></td>
            <td><label for="vote_option2">{{lists.item2_name}}</label></td>
          </tr>
          <tr>
            <td><input id='vote_option3' type="radio" value="3" name="vote_option"></td>
            <td><label for="vote_option3">{{lists.item3_name}}</label><br /></td>
          </tr>
          <tr>
            <td><input id='vote_option4' type="radio" value="4" name="vote_option"></td>
            <td><label for="vote_option4">{{lists.item4_name}}</label><br /></td>
          </tr>
        </table>
        <p>截止时间：{{lists.end_time}}</p>
        <input @click.prevent="voteOption" class="tvote_sub" type="submit" value="提交">
      </form>
    </article>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
      }
    },
    props: ['myfrom', "lists"],
    computed: {
      // ...mapState(['curPage','lists','loginUser'])
    },
    created() {

    },
    methods: {
      ...mapActions(['sendVoteOption', 'getVoteList', 'getList']),

      voteOption() {
        let data;
        eval("data=" + this.myfrom + ".vote_option.value")
        if (data != '') {
          if (this.sendVoteOption({ vote_id: this.lists.id, item_name: data })) {
            this.getVoteList()
          }
        }
      }
    },
    components: {
    },
    watch: {
      //curPage: 'changeCurPage'
    }
  }
</script>


<style>
.vote-list{
  box-sizing: border-box;
  float: left;
  width: 48%;
  margin-left:8px; 
}

.vote-list table{
  margin-top: 10px; 
}

.vote-list table tr td{
  padding: 8px 0 ;
}

.tvote_sub{
    background: #ffabab none repeat scroll 0 0;
    border: 0 none;
    border-radius: 5px;
    color: #fff;
    display: block;
    font-size: 20px;
    font-weight: 700;
    line-height: 1.5;
    margin: 15px auto;
    padding: 5px 5px 8px;
    text-align: center;
    width: 40%;
},
.votelist_title{
  margin-top:8px 
}
</style>