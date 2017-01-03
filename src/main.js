//import Vue from 'vue'                  //生产环境需要注释
//import VueRouter from 'vue-router'     //生产环境需要注释
import App from './App'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import Info from './components/Info'
import module from './components/module'
import Power from './components/Power'
import store from './store'

Vue.use(VueRouter)

const routes = [{
  path : '/home',
  component: Home,
  name: 'home'
},{
  path : '/login',
  meta: { auth: false },
  name:'login',
  component: Login
},{
  path : '/register',
  name:'register',
  component: Register
},{
  path : '/info',
  name: 'info',
  component: Info,
  children: [{
    path: '/power',
    component: Power,
    name: 'power'
  },{
    path: '/module',
    component: module,
    name: 'module'
  }]
}
,{
  path : '/',
  redirect: { name: 'home' }
},
]



const router = new VueRouter({
  //mode: 'history',
  //base: __dirname,
  routes
})

router.afterEach((to, from, next) => {
  document.title = to.name
})

const app = new Vue({
  el: '#app',
  router,
  store,
  ...App
})
