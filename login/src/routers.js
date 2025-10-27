import { createRouter, createWebHistory } from 'vue-router'

const HomePage = () => import('./components/HomePage.vue')
const SignUp = () => import('./components/SignUp.vue')
const Login = () => import('./components/Login.vue')
const UpdateEntity = () => import('./components/UpdateEntity.vue')
const AddEntity = () => import('./components/AddEntity.vue')
const ReadEntity = () => import('./components/ReadEntity.vue')
const AccessDenied = () => import('./components/AccessDenied.vue')
const NotFound = () => import('./components/NotFound.vue') // catch-all page

const routes = [
  { name: 'HomePage', path: '/', component: HomePage },
  { name: 'SignUp', path: '/sign-up', component: SignUp },
  { name: 'LoginPage', path: '/login', component: Login },
  { name: 'UpdateEntityPage', path: '/UpdateEntity/:id', component: UpdateEntity },
  { name: 'AddEntity', path: '/AddEntity', component: AddEntity },
  { name: 'ReadEntity', path: '/ReadEntity', component: ReadEntity },
  { name: 'AccessDenied', path: '/access-denied', component: AccessDenied },


  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('jwt-token')


  const publicPages = ['/login', '/sign-up', '/access-denied']
  const authRequired = !publicPages.includes(to.path)


  if (authRequired && !token) {
    return next('/access-denied')
  }

 
  if ((to.path === '/login' || to.path === '/sign-up') && token) {
    return next('/')
  }

  next()
})

export default router
