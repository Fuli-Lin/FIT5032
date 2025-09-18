import { createRouter, createWebHistory } from 'vue-router'
import AboutView from '../views/AboutView.vue'
import HomeView from '@/views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import AccessDenied from '../views/AccessDenied.vue'
import { useAuthStore } from '../stores/auth'
import FirebaseSigninView from '@/views/FirebaseSigninView.vue'
import FirebaseRegisterView from '@/views/FirebaseRegisterView.vue'
import FirebaseLogoutView from '@/views/FirebaseLogoutView.vue'
import AddBookView from '@/views/AddBookView.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  { path: '/login', name: 'login', component: LoginView },
  { path: '/access-denied', name: 'denied', component: AccessDenied },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
    meta: { requiresAuth: true },
  },
  {
    path: '/addbook',
    name: 'AddBook',
    component: AddBookView,
  },
  {
    path: '/FireLogin',
    name: 'FireLogin',
    component: FirebaseSigninView,
  },
  {
    path: '/FireRegister',
    name: 'FireRegister',
    component: FirebaseRegisterView,
  },
  {
    path: '/FireLogout',
    name: 'FireLogout',
    component: FirebaseLogoutView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return '/access-denied'
  }
})

export default router
