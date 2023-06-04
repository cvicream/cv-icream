import { defineStore } from 'pinia'

export const useRedoStore = defineStore('redo', {
  state: () => ({
    list: [],
    maxRestore: 0, // the maximum number of operation for redo/undo, the value will be assigned as a constant once the first undo happened.
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
