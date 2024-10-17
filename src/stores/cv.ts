import { defineStore } from 'pinia'
import type { CV } from '../types'
import { createCV, deleteCV, getCV, getCVs, updateCV } from '~/api'

export const useCVStore = defineStore('cv', {
  state: () => ({
    cvs: null as CV[] | null,
    cv: null as CV | null,
  }),
  actions: {
    async getAll() {
      this.cvs = await getCVs()
    },
    async get(id: string) {
      this.cv = await getCV(id)
    },
    async create(cv: CV) {
      await createCV(cv)
    },
    async update(cv: CV) {
      await updateCV(cv)
    },
    async delete(id: string) {
      await deleteCV(id)
    },
  },
})
