import { createRouter, createWebHistory } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import Welcome from '../views/Welcome'
import Course from '../views/Course'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiredAuth: true }
  },
  {
    path: '/welcome',
    name: 'Welcome',
    component: Welcome,
    meta: { requiredAuth: false }
  },
  {
    path:"/course/:courseID",
    name: Course,
    component: Course
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import('../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  let isAuthenticated = false
  if (store.state.user != null) isAuthenticated = true
  if (isAuthenticated || to.meta.requiredAuth == false) {
    next()
  } else {
    next('/welcome')
  }
})

export default router
