import { acceptHMRUpdate, defineStore } from 'pinia'
import { DEFAULT_TEMPLATE, TEMPLATES } from '~/constants'

const initialState = {
  ...DEFAULT_TEMPLATE,
  template: 1,
  timestamp: new Date().getTime(), // use it as an key to update `Sidebar.vue` due to `Editor.vue` initial value bug
}

export const useUserStore = defineStore('user', {
  state: () => {
    const template = TEMPLATES.find(item => item.template === initialState.template)
    const state = { ...initialState, ...template }
    return state
  },
  actions: {
    updateTimestamp() {
      this.timestamp = new Date().getTime()
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
