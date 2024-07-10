import { acceptHMRUpdate, defineStore } from 'pinia'
import type { Notification } from '~/types'

export const useNotificationStore = defineStore('notification', {
  state: () => ({
    notification: null as Notification | null,
  }),
  actions: {
    set(notification: Notification | null) {
      this.notification = notification
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useNotificationStore, import.meta.hot))
