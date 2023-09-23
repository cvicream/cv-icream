import { createPinia } from 'pinia'
import _ from 'lodash'
import type { UserModule } from '~/types'
import { isEditing, setStorage } from '~/utils'
import { useUndoStore } from '~/stores/undo'
import { useRedoStore } from '~/stores/redo'

// Setup Pinia
// https://pinia.esm.dev/
export const install: UserModule = ({ app }) => {
  const pinia = createPinia()

  watch(
    pinia.state,
    (state) => {
      // persist the whole state to the local storage whenever it changes
      if (isEditing()) {
        // exclude `undo` and `redo`
        const savedState = _.cloneDeep(_.omit(state, ['undo', 'redo']))
        const undoStore = useUndoStore()
        const redoStore = useRedoStore()
        setStorage(savedState)

        if (['undo', 'redo'].includes(state.user.action)) {
          state.user.action = ''
          if (redoStore.list.length === 1 && redoStore.maxRestore === 0)
            redoStore.updateMaxRestore(undoStore.list.length + redoStore.list.length)
        }
        else {
          undoStore.push(savedState)
          // new operation is added after undo operation, then reset undo buffer
          if (redoStore.maxRestore !== 0
              && (redoStore.list.length + undoStore.list.length) !== redoStore.maxRestore) {
            redoStore.reset()
            redoStore.updateMaxRestore(0)
          }
        }
      }
    },
    { deep: true },
  )
  app.use(pinia)
}
