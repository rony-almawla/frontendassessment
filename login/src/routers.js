import { createRouter, createWebHistory } from 'vue-router'



const HomePage = () => import('./components/HomePage.vue')
const SignUp = () => import('./components/SignUp.vue')
const Login = () => import('./components/Login.vue')
const UpdateEntity = () => import('./components/UpdateEntity.vue')
const AddEntity = () => import('./components/AddEntity.vue')

const routes = [
  { name: 'HomePage', component: HomePage, path: '/' },
  { name: 'SignUp', component: SignUp, path: '/sign-up' },
  { name: 'LoginPage', component: Login, path: '/login' },
  { name: 'UpdateEntityPage', component: UpdateEntity, path: '/UpdateEntity' },
  { name: 'AddEntity', component: AddEntity, path: '/AddEntity' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
