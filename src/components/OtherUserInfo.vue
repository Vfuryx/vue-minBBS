<template>
    <div class="main clearfix">
        <aside class="main-left">
            <div class="user">
                <img class="user-pic" src="http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg" alt="">
                <h2 class="user-name">{{ this.$route.params.othuser }}</h2>
                <section class="info">
                    <p v-show="userInfo.score" class="score" :title="userInfo.score">{{userInfo.score}}</p>
                    <p v-show="userInfo.email" class="email" :title="userInfo.email">{{userInfo.email}}</p>
                    <p v-show="userInfo.tele" class="tele" :title="userInfo.tele">{{userInfo.tele}}</p>
                    <div v-show="userInfo.intro" class="intro" :title="userInfo.intro">{{userInfo.intro}}</div>
                </section>
                <form  name="myform" action="" method="post" >
                <textarea v-model="send" id="userpost" class="userpost" name="send" value="send"></textarea>
                <button class="submit" @click.prevent="setSend(send)" >发送私信</button>
            </form>
            </div>
        </aside>
        <div class="main-right">
            <section  class="main-content">
                <router-view></router-view>
                <page></page>
            </section>
        </div>
    </div>
</template>

<style>
    @import '../css/info.css';
</style>

<script>
import page from './page'
import {mapState,mapActions} from 'vuex'
export default{
    data(){
        return{
            send: ''
        }
    },
    mounted () {
        //alert('121212')
      this.getotheruserinfo(this.$route.params.othuser)
      //this.getuserly()
    },
    computed: {
        ...mapState(['loginUser','userInfo','curPage'])
    },
    methods: {
       ...mapActions(['getotheruserinfo','sendPrivateLetter','getPrivateLetter','sendPrivateLetter']),
       changeCurPage () {
           this.getPrivateLetter(this.$route.params.othuser) 
       },
       setSend (data){
            if(this.sendPrivateLetter({ othuser : this.$route.params.othuser , privateletter : data})){
                this.getPrivateLetter(this.$route.params.othuser) 
            }
            this.send = ''
       }
    },
    components:{
       page,
       module
    },
    watch: {
      curPage: "changeCurPage"
    }
}
</script>
