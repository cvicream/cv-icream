import { createApp } from 'vue'
import { storeToRefs } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import App from './App.vue'
import { useAuthStore } from '~/stores/auth'
import { useUserStore } from '~/stores/user'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

// setup up pages with layouts
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async(to, from, next) => {
  const user = useUserStore()
  user.setRoutePath(to.path)

  // callback path from oauth provider
  const token = to.query.token
  if (token) {
    localStorage.setItem('token', token as string)
    if (to.path === '/dashboard') next()
  }

  // check if route requires authentication
  const tokenFromStorage = localStorage.getItem('token')
  if (tokenFromStorage) {
    const auth = useAuthStore()
    const { user } = storeToRefs(auth)
    if (!user.value) await auth.setAuthUser()
  }
  if (to.meta.requiresAuth) {
    if (tokenFromStorage) next()
    else next('/sign-in')
  }
  else if (['/sign-in', '/sign-up'].includes(to.path) && tokenFromStorage) {
    next('/dashboard')
  }
  else {
    next()
  }
})

app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, router, routes }))

app.mount('#app')
