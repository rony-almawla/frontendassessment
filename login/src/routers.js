import { createRouter, createWebHistory } from 'vue-router'

const HomePage = ()=>import('./components/HomePage.vue')
const SignUp = ()=>import('./components/SignUp.vue')
const Login = ()=>import('./components/Login.vue')
const UpdateEntity = ()=>import('./components/UpdateEntity.vue')
const AddEntity = ()=>import('./components/AddEntity.vue')
const ReadEntity = ()=>import('./components/ReadEntity.vue')

const routes=[
  { name:'HomePage', path:'/', component:HomePage },
  { name:'SignUp', path:'/sign-up', component:SignUp },
  { name:'LoginPage', path:'/login', component:Login },
  { name:'UpdateEntityPage', path:'/UpdateEntity/:id', component:UpdateEntity },
  { name:'AddEntity', path:'/AddEntity', component:AddEntity },
  { name:'ReadEntity', path:'/ReadEntity', component:ReadEntity }
]

const router=createRouter({ history:createWebHistory(), routes })
export default router
