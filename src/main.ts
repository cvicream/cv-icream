import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import generatedRoutes from 'virtual:generated-pages'
import { setupLayouts } from 'virtual:generated-layouts'
import VueDatePicker from '@vuepic/vue-datepicker'
import App from './App.vue'
import { useUserStore } from '~/stores/user'

import '@vuepic/vue-datepicker/dist/main.css'

import '@unocss/reset/tailwind.css'
import './styles/main.css'
import 'uno.css'

const app = createApp(App)

app.component('VueDatePicker', VueDatePicker)

// setup up pages with layouts
const routes = setupLayouts(generatedRoutes)
const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  const user = useUserStore()
  user.setRoutePath(to.path)
  next()
})

app.use(router)

// install all modules under `modules/`
Object.values(import.meta.globEager('./modules/*.ts')).map(i => i.install?.({ app, router, routes }))

app.mount('#app')
