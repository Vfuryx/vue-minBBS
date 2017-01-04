<template>
    <div>
        <article class='con-module' v-for="list in lists">
            <img class='post-user-pic' src='http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg' alt=''>
            <h3 class='post-user-name'>{{list.usernameid}}</h3>
            <p class='post-user-mess'>{{list.mess}}</p>
            <h5 class='post-user-time'>{{list.posttime}}</h5>
            <button v-if="loginUser != '游客' && isModule " class='delete' href='#' @click.prevent="deletely(list.id)" ></button>
        </article>
        <div>111</div>
    </div>
</template>
<style>
</style>
<script>
import {mapState,mapActions} from 'vuex'
export default{
  data () {
    return{
        isModule:0
    }
  },
  computed: {
    ...mapState(['totalRecords','curPage','lists','loginUser'])
  },
  created() {
    if(this.$route.name == 'module'){
      this.getuserly()
      setTimeout(()=>{this.isModule=1},100)
    }
  },
  methods: {
    ...mapActions(['delly','getuserly']),
    deletely: function (id) {
        if(this.delly(id)){
          this.getuserly()
        }
    }
  },
  components: {
  }
}
</script>
