import { acceptHMRUpdate, defineStore } from 'pinia'
import { DEFAULT_TEMPLATE, TEMPLATES } from '~/constants'

const initialState = {
  ...DEFAULT_TEMPLATE,
  template: 1,
}

export const useUserStore = defineStore('user', {
  state: () => {
    const template = TEMPLATES.find(item => item.template === initialState.template)
    const state = { ...initialState, ...template }
    state.isEditing = false
    return state
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
