<template>
    <div>
        <article class='con-module' v-for="list in userPowerInfos">
            <img class='post-user-pic' src='http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg' alt=''>
            <h3 class='power-user-name'>{{list.username}}</h3>
            <button
                    :class="'power-user-set leaguer '+[list.power==2 ? 'isleaguer' : '']"
                    @click.prevent="list.power==2 ? '' : setPower( {username : list.username , powernum : 2})"
            >普通会员</button>
            <button
                    :class="'power-user-set admin '+[list.power==1 ? 'isadmin' : '']"
                    @click.prevent="list.power==1 ? '' : setPower({username : list.username , powernum : 1})"
            >超级管理员</button>
        </article>
    </div>
</template>
<style>
@import '../css/power.css'
</style>
<script>
import {mapState,mapActions} from 'vuex'
export default{
  mounted () {
    this.getpower()
  },
  data(){
    return{
    }
  },
  computed: {
     ...mapState(['userPowerInfos'])
  },
  methods: {
    ...mapActions(['setpower','getpower']),
    setPower (data) {
        if(this.setpower(data)){
            this.getpower()
        }
    }
  },
  components:{
  }
}
</script>
