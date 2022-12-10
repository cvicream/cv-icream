import { defineStore } from 'pinia'
import _ from 'lodash'
import { omitArray } from '~/utils'

export const useUndoStore = defineStore('undo', {
  state: () => ({
    list: [],
  }),
  getters: {
    isEmpty: state => state.list.length <= 1, // exclude first element because it is current state
  },
  actions: {
    push(data) {
      const ignoreFields = [
        'toolbar.dropdownMenu',
        // 'toolbar.isCVPreviewVisible',
        'user.about.isEditing',
        'user.summary.isEditing',
        'user.experience.isEditing',
        'user.timestamp',
        'user.path',
        'user.action',
        'isEditing',
      ]

      const list = this.list
      if (list.length) {
        let lastState = list[list.length - 1]
        lastState = _.omit(lastState, ignoreFields)
        omitArray(lastState, ignoreFields)
        const newState = _.omit(data, ignoreFields)
        omitArray(newState, ignoreFields)
        if (_.isEqual(lastState, newState))
          return
      }

      list.push(data)
    },
    pop() {
      return this.list.pop()
    },
  },
})
