<template>
    <div class="clearfix">
        <VoteLists v-for="(item,index) in lists"  :myfrom="'myfrom'+index" :lists="item"></VoteLists>
    </div>
</template>

<script>
import VoteLists from './VoteLists'
import {mapState,mapActions} from 'vuex'
export default{
  data () {
    return{
    }
  },
  computed: {
     ...mapState(['curPage','lists','loginUser'])
  },
  created() {
    if(this.$route.name == 'votelist'&&this.loginUser!='游客'){
      this.getList({})
      this.getVoteList()
    }
  },
  methods: {
     ...mapActions(['getVoteList','getList']),
     changeCurPage () {
          if(this.$route.name == 'votelist'){
               this.getVoteList()
          }
      },
  },
  components: {
    VoteLists:VoteLists
  },
    watch: {
      curPage: 'changeCurPage'
  }
}
</script>


<style>

</style>