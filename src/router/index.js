import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: "Home - Users",
      public: false
    }
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
    meta: {
      title: "Login",
      public: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const isPublicRoute = to.matched.some(record => record.meta.public);
  let loggedUser = store.getters['users/loggedUser'];

  document.title = to.meta.title + ' | Account App';

  if (isPublicRoute === false && loggedUser === null) {
    router.replace("/login");
  } else {
    next();
  }
});

export default router
