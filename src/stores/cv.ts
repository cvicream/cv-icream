import { defineStore } from 'pinia'
import type { CV, CreateCV } from '../types'
import { createCV, deleteCV, getCV, getCVs, updateCV } from '~/api'

export const useCVStore = defineStore('cv', {
  state: () => ({
    cvs: null as CV[] | null,
    cv: null as CV | null,
  }),
  actions: {
    async getAll() {
      this.cvs = await getCVs()
      return this.cvs
    },
    async get(id: string) {
      this.cv = await getCV(id)
      return this.cv
    },
    async create(cv: CreateCV) {
      return await createCV(cv)
    },
    async update(cv: CV) {
      return await updateCV(cv)
    },
    async delete(id: string) {
      return await deleteCV(id)
    },
  },
})
