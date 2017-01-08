<template>
  <div class="clearfix">
    <article class='con-module vote-list' v-for="list in lists">
      <img class='post-user-pic' src='http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg' alt=''>
      <h3 class='post-user-name'>{{list.originater}}</h3>
      <form :name="myfrom">
        <h2 class="votelist_title">{{list.title}}</h2>
        <table>
          <tr>
            <td><label>{{list.item1_name}}：</label></td>
            <td><label>{{list.item1_num}} 票</label></td>
          </tr>
          <tr>
            <td><label>{{list.item2_name}}：</label></td>
            <td><label>{{list.item2_num}} 票</label></td>
          </tr>
          <tr>
            <td><label>{{list.item3_name}}：</label></td>
            <td><label>{{list.item3_num}} 票</label></td>
          </tr>
          <tr>
            <td><label>{{list.item4_name}}：</label></td>
            <td><label>{{list.item4_num}} 票</label></td>
          </tr>
        </table>
        <p>截止时间：{{list.end_time}}</p>
      </form>
      <button v-if=" isModule " class='delete' href='#' @click.prevent="delvote(list.id)"></button>
    </article>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'
  export default {
    data() {
      return {
        isModule: 0
      }
    },
    //props: ['myfrom',"lists"],
    computed: {
      ...mapState(['curPage', 'lists', 'loginUser'])
    },
    created() {
      if (this.$route.name == 'votelistsend') {
        this.getList({})
        this.getVoteListsEnd()
      } else if (this.$route.name == 'colvotelists') {
        this.getList({})
        this.getColVoteLists()
        setTimeout(() => { this.isModule = 1 }, 100)
      }
    },
    methods: {
      ...mapActions(['getColVoteLists', 'getVoteListsEnd', 'getList', 'delVote']),
      changeCurPage() {
        if (this.$route.name == 'votelistsend') {
          this.getVoteListsEnd()
        } else if (this.$route.name == 'colvotelists') {
          this.getColVoteLists()
        }
      },
      delvote(data) {
        if (this.delVote(data)) {
          this.getColVoteLists()
        }

      }
    },
    components: {
    },
    watch: {
      curPage: 'changeCurPage'
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