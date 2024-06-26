import type { App } from 'vue'
import type { RouteRecordRaw, Router } from 'vue-router'
import type { HeadClient } from '@vueuse/head'

interface AppContext<HasRouter extends boolean = true> {
  app: App<Element>
  router: HasRouter extends true ? Router : undefined
  routes: HasRouter extends true ? RouteRecordRaw[] : undefined
  head: HeadClient | undefined
}

export type UserModule = (ctx: AppContext) => void

export interface Option {
  value: string
  label: string
}

export interface Note {
  id: number
  location: {
    left: number
    top: number
  }
  value: string
}

export interface Notification {
  message: string
  duration?: number
}
