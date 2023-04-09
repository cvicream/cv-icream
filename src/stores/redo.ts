import { defineStore } from 'pinia'

export const useRedoStore = defineStore('redo', {
  state: () => ({
    list: [],
    maxRestore: 0,
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
    reset() {
      this.list.splice(0, this.list.length)
    },
    updateMaxRestore(num) {
      this.maxRestore = num
    },
  },
})
