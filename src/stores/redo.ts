import { defineStore } from 'pinia'

export const useRedoStore = defineStore('redo', {
  state: () => ({
    list: [],
  }),
  getters: {
    isEmpty: state => state.list.length === 0,
  },
  actions: {
    push(data) {
      this.list.push(data)
    },
    pop() {
      return this.list.pop()
    },
  },
})
