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
                <router-link class="powersub" v-if="userInfo.power<=1" to="/info/power" >
                    权限管理
                </router-link>
                <router-link class="powersub" to="/info/module" >
                    留言管理
                </router-link>
                <router-link class="powersub" to="/info/privateletter" >
                    私信管理
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
      this.getuserinfo()
      //this.getuserly()
    },
    computed: {
        ...mapState(['curPage','loginUser','userInfo'])
    },
    methods: {
       ...mapActions(['getuserinfo','getpl'])
    },
    components:{
       page,
       module
    },
    watch: {
      curPage: 'getpl'
    }
}
</script>
