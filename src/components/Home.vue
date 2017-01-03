<template>
    <div class="main clearfix">
        <aside class="main-left">
            <div class="user" >
                <router-link v-if=" loginUser=='游客' " to="/" >
                    <img  class="user-pic" src="http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg" alt="">
                </router-link>
                <router-link v-else to="/module" >
                    <img  class="user-pic" src="http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg" alt="">
                </router-link>
                <h2 class="user-name">{{loginUser}}</h2>
            </div>
            <form  name="myform" action="index.php?c=Index&p=front&a=post" method="post" >
                <textarea v-model="userPost" id="userpost" class="userpost" name="userpost" value="userPost"></textarea>
                <button class="submit" @click.prevent="postLY(userPost)" >添加</button>
            </form>
        </aside>
        <div class="main-right">
            <section id="message" class="main-content">
                <module></module>
                <page></page>
            </section>
        </div>
    </div>
</template>
<style>
@import '../css/index.css'
</style>
<script>
import page from './page'
import module from './module'
import {mapState,mapActions} from 'vuex'
export default{
 computed: {
   ...mapState(['loginUser'])
 },
 data(){
     return{
        userPost: ''
     }
 },
 mounted () {
    this.getpl()
 },
 methods: {
     ...mapActions(['getpl','postly']),
     postLY: function (data) {
        if(this.postly(data)){
          this.getpl()
        }
        this.userPost = ''
     }
 },
 components:{
     page,
     module
 }
}
</script>
