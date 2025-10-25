import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./components/HomePage.vue')
const SignUp = () => import('./components/SignUp.vue')
const Login = () => import('./components/Login.vue')

const routes = [
  { name: 'HomePage', component: HomePage, path: '/' },
  { name: 'SignUp', component: SignUp, path: '/sign-up' },
  { name: 'LoginPage', component: Login, path: '/login' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
