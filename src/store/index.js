import Vue from 'vue' //生产环境需要注释
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

const state = {
    // 登录信息
    loginUser: sessionStorage.getItem("loguser") || '游客',

    //登录用户信息
    userInfo: '',
    userPowerInfos:'',

    //留言
    lists: [],

    // 分页
    totalRecords: 1,//总页数
    curPage: 1 //当前页
}

const mutations = {
    getTotalRecord: (state,i) => {state.totalRecords = i},
    getCurPage: (state,i) => {state.curPage = i},
    getPublicList: (state,i) => {state.lists = i},
    getloginUser: (state,i) => {state.loginUser = i},
    getUserInfo: (state,i) => {state.userInfo = i},
    getUserPowerInfos: (state,i) => {state.userPowerInfos = i}

}


const actions = {
  getList ({ commit }, i) {
      commit('getPublicList', i)
  },
  getlu ({ commit }, i) {
      sessionStorage.setItem("loguser", i );
      commit('getloginUser', i)
  },
  gettr ({ commit }, i) {
      commit('getTotalRecord', i)
  },
  getcp ({ commit }, i) {
      commit('getCurPage', i)
  },
    //获取留言
  getpl ({ commit , state }) {
    Axios.get('index.php',{
      params: {
        c: "Index" ,p: "front" ,a: "getPage",
      }
    }).then((response) => {
      commit('getTotalRecord',response.data)
      Axios.get('index.php',{
        params: {
          c: "Index" ,
          p: "front" ,
          a: "getly" ,
          totalRecord: response.data,
          cur: state.curPage
        }
      }).then((re) => {
        commit('getPublicList', re.data)
        //console.log(state.lists)
      })
    })
  },
    //创建留言
  postly ({ commit , state }, param){
      Axios.post(
          'index.php?c=Index&p=front&a=post',{
              user: state.loginUser,
              userpost: param
          }).then((response) => {
          if(response.data){
              //alert('成功')
              return 1
          }else{
              //alert('失败')
              return 0
          }
      })
  },
    //获取登陆用户信息
  getuserinfo ({ commit , state }){
      Axios.get(
        'index.php',{
            params: {
                c: "UserInfo" ,
                p: "front" ,
                a: "show" ,
                user: state.loginUser
            }
        }
      ).then((response) => {
          if(response.data){
              state.userInfo = response.data
              //alert('成功')
          }else{
              alert('失败')
          }
      })
  },
    //获取登陆用户留言
  getuserly ({ commit , state }){
      Axios.get('index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "getPage",
              user: state.loginUser
          }
      }).then((response) => {
          commit('getTotalRecord',response.data)
          Axios.get('index.php',{
              params: {
                  c: "UserInfo" ,
                  p: "front" ,
                  a: "getuserly" ,
                  user: state.loginUser,
                  totalRecord: response.data,
                  cur: state.curPage
              }
          }).then((re) => {
              commit('getPublicList', re.data)
              //console.log(state.lists)
          })
      })
  },
    //删除留言
  delly ({ commit , state }, param){
      //index.php?c=UserInfo&p=front&a=delete&id=".$values['id']
      Axios.get(
          'index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "delete",
              id: param
          }
      }).then((response) => {
          if(response.data){
              //alert('成功')
          }else{
              alert('失败')
          }
      })
  },
    //获取会员权限 param用户名
  getpower ({ commit , state }){
      Axios.get('index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "getPowerPage",
              loginuser: state.loginUser
          }
      }).then((response) => {
            commit('getTotalRecord',response.data)
            Axios.get(
                'index.php',{
                params: {
                    c: "UserInfo" ,
                    p: "front" ,
                    a: "getpower",
                    loginuser: state.loginUser,
                    totalRecord: response.data,
                    cur: state.curPage
                }
            }).then((response) => {
                if(response.data){
                    commit('getUserPowerInfos',response.data)
                    //alert('成功')
                }else{
                    //alert('失败')
                }
            })
      })
  },
    //设置会员权限 param 设置用户名和等级
  setpower ({ commit , state }, param){
      Axios.get(
          'index.php',{
          params: {
              c: "UserInfo" ,
              p: "front" ,
              a: "setpower",
              loginuser: state.loginUser,
              username: param.username,
              powernum: param.powernum
          }
      }).then((response) => {
          if(response.data){
              //alert('成功')
              return 1
          }else{
              alert('失败')
              return 0
          }
      })
  },
  logout ({ commit , state }){
      Axios.get(
          'index.php',{
              params: {
                  c: "Index" ,
                  p: "front" ,
                  a: "logout",
                  user: state.loginUser
              }
          }).then((response) => {
          if(response.data){
              commit('getloginUser', '游客')
              sessionStorage.removeItem("loguser");
              commit('getUserPowerInfos', '')
              commit('getUserInfo', '')
              commit('getPublicList', '')
              //alert('成功')
          }else{
              alert('失败')
          }
      })
  },
  getPrivateLetter ({ commit , state }, param) {
    //先获取分页数
    Axios.get('index.php',{
      params: {
        c: "Send" ,
        p: "front" ,
        a: "getPrivateLetterPage",
        user: state.loginUser,
        othuser: param
      }
    }).then((response) => {
        commit('getTotalRecord',response.data)
              //再获取数据
        Axios.get('index.php', {
        params: {
           c: "Send",
           p: "front",
           a: "getPrivateLetter",
           totalRecord: response.data,
           user: state.loginUser,
           othuser: param,
           cur: state.curPage
         }
         }).then((response) => {
           if (response.data) {
               //alert('ok')
               commit('getPublicList', response.data)
           } else {
             alert('失败')
          }
      })
    })
  },
  getMyPrivateLetter ({ commit , state }) {
    //先获取分页数
    Axios.get('index.php',{
      params: {
        c: "Send" ,
        p: "front" ,
        a: "getMyPrivateLetterPage",
        user: state.loginUser,
      }
    }).then((response) => {
        commit('getTotalRecord',response.data)
              //再获取数据
        Axios.get('index.php', {
        params: {
           c: "Send",
           p: "front",
           a: "getMyPrivateLetter",
           totalRecord: response.data,
           user: state.loginUser,
           cur: state.curPage
         }
         }).then((response) => {
           if (response.data) {
               //alert('ok')
               commit('getPublicList', response.data)
           } else {
             alert('失败')
          }
      })
    })
  },
  sendPrivateLetter ({commit , state }, param){
    Axios.post(
      'index.php?c=Send&p=front&a=setsend',{
        otheruser: param.othuser,
        user: state.loginUser,
        privateletter: param.privateletter
      }
    ).then((response) => {
      if(response.data){
        alert('成功')
      }else {
        alert('失败')
      }
    })
  },
  getotheruserinfo ({commit , state }, param ){
       Axios.get(
        'index.php',{
            params: {
                c: "UserInfo" ,
                p: "front" ,
                a: "getotheruserinfo" ,
                user: state.loginUser,
                othuser: param
            }
        }
      ).then((response) => {
          if(response.data){
              state.userInfo = response.data
              //alert('成功')
          }else{
              alert('失败')
          }
      })

  },
    //删除私信
  delSPL ({ commit , state }, param){
      Axios.get(
          'index.php',{
          params: {
             c: "Send",
             p: "front",
             a: "delSPL",
             user: state.loginUser,
             id: param
          }
      }).then((response) => {
          if(response.data){
              alert('成功')
          }else{
              alert('失败')
          }
      })
  },
  inputVote ({ commit , state }, param) {
      Axios.post(
      'index.php?c=Vote&p=front&a=inputVote',{
        user: state.loginUser,
        title: param.title,
        vote_option1: param.vote_option1,
        vote_option2: param.vote_option2,
        vote_option3: param.vote_option3,
        vote_option4: param.vote_option4,
        vote_option5: param.vote_option5,
      }
    ).then((response) => {
      if(response.data){
        //alert('成功')
        return 1
      }else {
        alert('失败')
        return 0
      }
    })
  },
  getVoteList ({ commit , state }){
       //先获取分页数
    Axios.get('index.php',{
      params: {
        c: "Vote" ,
        p: "front" ,
        a: "getVoteListPage",
        user: state.loginUser,
      }
    }).then((response) => {
        commit('getTotalRecord',response.data)
              //再获取数据
        Axios.get('index.php', {
        params: {
           c: "Vote",
           p: "front",
           a: "getVoteList",
           totalRecord: response.data,
           user: state.loginUser,
           cur: state.curPage
         }
         }).then((response) => {
           if (response.data) {
               //alert('ok')
               commit('getPublicList', response.data)
           } else {
             alert('失败')
          }
      })
    })
  },
  sendVoteOption ({ commit , state }, param) {
      Axios.post(
      'index.php?c=Vote&p=front&a=sendVoteOption',{
        user: state.loginUser,
        vote_id: param.vote_id,
        item_name: param.item_name
      }
    ).then((response) => {
      if(response.data){
          return 1
      }else {
        alert('失败')
        return 0
      }
    })
  },
  getVoteListsEnd ({ commit , state }){
       //先获取分页数
    Axios.get('index.php',{
      params: {
        c: "Vote" ,
        p: "front" ,
        a: "getVoteListsEndPage",
        user: state.loginUser,
      }
    }).then((response) => {
        commit('getTotalRecord',response.data)
              //再获取数据
        Axios.get('index.php', {
        params: {
           c: "Vote",
           p: "front",
           a: "getVoteListsEnd",
           totalRecord: response.data,
           user: state.loginUser,
           cur: state.curPage
         }
         }).then((response) => {
           if (response.data) {
               //alert('ok')
               commit('getPublicList', response.data)
           } else {
             alert('失败')
          }
      })
    })
  },
  getColVoteLists ({ commit , state }) {
   //先获取分页数
    Axios.get('index.php',{
      params: {
        c: "Vote" ,
        p: "front" ,
        a: "getColVoteListsPage",
        user: state.loginUser,
      }
    }).then((response) => {
        commit('getTotalRecord',response.data)
              //再获取数据
        Axios.get('index.php', {
        params: {
           c: "Vote",
           p: "front",
           a: "getColVoteLists",
           totalRecord: response.data,
           user: state.loginUser,
           cur: state.curPage
         }
         }).then((response) => {
           if (response.data) {
               //alert('ok')
               commit('getPublicList', response.data)
           } else {
             alert('失败')
          }
      })
    })
  },
    //删除私信
  delVote ({ commit , state }, param){
      Axios.get(
          'index.php',{
          params: {
             c: "Vote",
             p: "front",
             a: "delVote",
             user: state.loginUser,
             id: param
          }
      }).then((response) => {
          if(response.data){
              alert('成功')
              return 1
          }else{
              alert('失败')
              return 0
          }
      })
  },

}


export default new Vuex.Store({
    state,
    mutations,
    actions
})
