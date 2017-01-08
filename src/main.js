import Vue from 'vue'                  //生产环境需要注释
import VueRouter from 'vue-router'     
import App from './App'
import Home from './components/Home'
import module from './components/module'
//import Login from './components/Login'
//import Register from './components/Register'
//import Info from './components/Info'
//import PrivateLetter from './components/PrivateLetter'
//import OtherUserInfo from './components/OtherUserInfo'
//import Power from './components/Power'
//import Vote from './components/Vote'
//import InputVote from './components/InputVote'
//import VoteList from './components/VoteList'
//import VoteListsEnd from './components/VoteListsEnd'
import store from './store'

Vue.use(VueRouter)  //生产环境需要注释


const routes = [{
  path: '/home',
  component: Home,
  name: 'home'
}, {
  path: '/login',
  meta: { auth: false },
  //增加懒加载
  component: resolve => require(['./components/Login.vue'], resolve),
  //component: Login
}, {
  path: '/',
  meta: { auth: false },
  redirect: { name: 'home' },
  component: Home
}, {
  path: '/register',
  component: resolve => require(['./components/Register.vue'], resolve),
  //component: Register
}, {
  path: '/otheruserinfo',
  name: 'otheruserinfo',
  component: resolve => require(['./components/OtherUserInfo.vue'], resolve),
  //component: OtherUserInfo,
  children: [{
    path: 'sendprivateletter/:othuser',
    name: 'sendprivateletter',
    component: resolve => require(['./components/PrivateLetter.vue'], resolve),
    //component: PrivateLetter
  }]
}, {
  path: '/info',
  name: 'info',
  component: resolve => require(['./components/Info.vue'], resolve),
  //component: Info,
  children: [{
    path: 'power',
    component: resolve => require(['./components/Power.vue'], resolve),
    //component: Power,
    name: 'power'
  }, {
    path: 'module',
    component: module,
    name: 'module'
  }, {
    path: 'privateletter',
    name: 'privateletter',
    component: resolve => require(['./components/PrivateLetter.vue'], resolve),
    //component: PrivateLetter
  }, {
    path: 'colvotelists',
    name: 'colvotelists',
    component: resolve => require(['./components/VoteListsEnd.vue'], resolve),
    //component: VoteListsEnd
  }]
}, {
  path: '/vote',
  name: 'vote',
  component: resolve => require(['./components/Vote.vue'], resolve),
  //component: Vote,
  children: [{
    path: 'inputvote',
    name: 'inputvote',
    component: resolve => require(['./components/InputVote.vue'], resolve),
    //component: InputVote
  }, {
    path: 'votelist',
    name: 'votelist',
    component: resolve => require(['./components/votelist.vue'], resolve),
    //component: VoteList
  }, {
    path: 'votelistsend',
    name: 'votelistsend',
    component: resolve => require(['./components/VoteListsEnd.vue'], resolve),
    //component: VoteListsEnd
  }]
}
]
//component: (resolve) => require(['./components/login/login.vue'], resolve)
//component : resolve => require(['./components/LogTime.vue'],resolve),

const router = new VueRouter({
  //mode: 'history',
  //base: __dirname,
  routes
})

router.beforeEach((to, from, next) => {
  if (to.name == 'votelist' && store.state.loginUser == '游客') {
    alert('请先登录')
    next({ path: '/login' })
  }
  document.title = to.name
  next()
})


const app = new Vue({
  //el: '#app',
  router,
  store,
  ...App
  //render: h => h(App)
}).$mount('#app')



// new Vue({
//     render: h => h(App),
//     router
// }).$mount('#app')