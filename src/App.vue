<template>
  <div>
    <header>
      <nav class="top-nav">
        <ul class="clearfix">
          <li class="float-l top-index">
            <router-link  to="/home" >主页</router-link>
            <router-link  to="/vote" >投票</router-link>
          </li>
          <li v-if=" loginUser=='游客' " class="float-r top-login">

            <router-link  to="/register" >注册</router-link>
            <router-link  to="/login" >登录</router-link>
          </li>
          <li v-else class="float-r top-login">
            <p class='welcom'>欢迎 {{loginUser}}</p>
            <a href='#'  @click.prevent="logOut">注销</a>
          </li>
        </ul>
      </nav>
      <div class="banner"></div>
    </header>
    <router-view></router-view>

  </div>
</template>

<script>
import {mapState,mapActions} from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapState(['loginUser'])
  },
  methods: {
    ...mapActions(['logout']),
    logOut: function () {
      this.logout()
      this.$router.replace({ path: '/login' })
    }
  }
}
</script>

<style>
@import './css/public.css'

</style>
