import Vue from 'vue'
import Router from 'vue-router'
import HOME from '../NKOJ'
import NKPC from "../NKPC"
import componentProblems from '../components/problem/problemsPage'
import componentHome from '../components/home/home'
import componentB from '../components/componentB'
import componentContest from '../components/componentContest'
import problemsPage from '../components/problem/problemPage'
import statusPage from '../components/statuspage/statusPage'
import discussPage from '../components/discussPage'
import postPage from '../components/discuss/post'
import userPage from '../components/userPage'
import allContest from '../components/contestpage/allContest'
import contest from '../components/contestpage/contest'
//import codePage from '../components/codePage'
import detailsPage from '../components/detailspage/details'
import rankPage from '../components/ranklist/rankPage'
import signupPage from '../components/signupPage'
import adminPage from '../components/admin/admin'
import adminProblemPage from '../components/admin/adminProblem'
import adminContest from '../components/admin/adminContest'
import test from '../components/wallpaper/wallpaper'
Vue.use(Router)
console.log(window.noPointHost)
const router = new Router({
  mode: 'history',
  routes: [{
    path: '/',
    component: HOME,
    children: [
      { path: '/admin',
        component: adminPage,
        children: [
          { path: '/admin/problem', component: adminProblemPage },
          { path: '/admin', component: adminProblemPage },
          { path: '/admin/contest', component: adminContest }
        ]
      },
      { path: '/home', component: componentHome },
      { path: '/problems', component: componentProblems },
      { path: '/notFound', component: componentB },
      { path: '/', redirect: '/home' },
      { path: '/problem/:problemId', component: problemsPage },
      {
        path: '/status',
        component: statusPage,
        props: {
          isInfinite: true,
          isBtn: false,
          apiUrl: window.noPointHost + '/api/status/list'
        }
      },
      { path: '/discuss', component: discussPage },
      { path: '/discuss/:id', component: postPage },
      { path: '/ranklist', component: rankPage },
      { path: '/user/:id', component: userPage },
      { path: '/details/:solution_id', component: detailsPage },
      {
        path: '/contest',
        component: componentContest,
        children: [
          {
            path: '/contest/allContest',
            component: allContest
          },
          {
            path: '/contest',
            component: contest
          }
        ]
      },
      { path: '/sign_up', component: signupPage}
      ,{
        path: '/test',
        component: test
      }
    ]
  }, {
    path: '/NKPC',
    component: NKPC
  }
  ]
})
router.beforeEach((to, from, next) => {
  let store = router.app.$options.store
  let userinfo = store.state.userData
  if(userinfo.check===false){
    checkUser(store)
    store.commit({
      type: 'setuserDate',
      check:true
    })
  }
  next()
})

function checkUser(store) {
  Vue.http
    .get(
      `${noPointHost}/api/user`,
      {
        crossDomain: true,
        xhrFields: { withCredentials: true },
        timeout: "8000",
        cache: true,
        credentials: true
      }
    )
    .then(
      res => {
        if (res.body.code === 0) {
          store.commit({
            type: 'setuserDate',
            isLogin: true,
            id: res.body.data.user_id,
            nickname: res.body.data.nickname,
            lastLogin: res.body.data.last_login,
            perm: res.body.data.perm
          })
        }
        else {
          vue.userData = undefined;
        }
        console.log(vue.userData)
      },
      res => {
        /*
        //wait to code
        var vue = this;
        console.log(res)
        */
      }
    )
    .catch(function (response) {
      //wait to code
      var vue = this;
    });
}

export default router
