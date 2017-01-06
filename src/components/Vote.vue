<template>
    <div class="main clearfix">
        <aside class="main-left">
            <div class="user">
                <img class="user-pic" src="http://7xr3sq.com1.z0.glb.clouddn.com/photo.jpg" alt="">
                <h2 class="user-name">{{ loginUser }}</h2>
                <section class="info">
                    <p v-show="userInfo.score" class="score" :title="userInfo.score">{{userInfo.score}}</p>
                    <p v-show="userInfo.email" class="email" :title="userInfo.email">{{userInfo.email}}</p>
                    <p v-show="userInfo.tele" class="tele" :title="userInfo.tele">{{userInfo.tele}}</p>
                    <div v-show="userInfo.intro" class="intro" :title="userInfo.intro">{{userInfo.intro}}</div>
                </section>
                <router-link class="powersub" to="/vote/votelist" >
                    未投票
                </router-link>
                <router-link class="powersub" to="/vote/inputvote" >
                    发表投票
                </router-link>
                <router-link class="powersub" to="/vote/votelistsend" >
                    已投票
                </router-link>
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
        }
    },
    mounted () {
     if(this.loginUser=='游客'){
        alert('请登录')
        this.$router.replace({ path: '/login' })
     }
    },
    computed: {
        ...mapState(['curPage','loginUser','userInfo'])
    },
    methods: {
       ...mapActions(['getuserinfo','getMyPrivateLetter','getuserly']),
       changeCurPage () {
        //    if(this.$route.name == 'module'){
        //        this.getuserly()
        //    }else if(this.$route.name == 'privateletter'){
        //        this.getMyPrivateLetter()
        //    }
       }
    },
    components:{
       page
       //module
    },
    watch: {
      curPage: 'changeCurPage'
    }
}
</script>
