import { defineStore } from 'pinia'
import type { User } from '../types'
import { deleteUser, getAuthUser, updateUser } from '~/api'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: null as User | null,
  }),
  getters: {
    displayName: (state) => {
      if (!state.user)
        return ''
      const res: string[] = []
      if (state.user.firstName)
        res.push(state.user.firstName)
      if (state.user.lastName)
        res.push(state.user.lastName)
      return res.join(' ')
    },
  },
  actions: {
    async setAuthUser() {
      this.user = await getAuthUser()
    },
    async updateUser(user: User) {
      this.user = await updateUser(user)
    },
    async deleteUser() {
      this.user = await deleteUser()
    },
    logout() {
      localStorage.removeItem('token')
      this.token = ''
      this.user = null
    },
  },
})
